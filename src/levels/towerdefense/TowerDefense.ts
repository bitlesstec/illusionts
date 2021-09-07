import { Collider } from "../../lib/graphic/shape/Collider.js";
import { Sprite } from "../../lib/graphic/Sprite.js";
import { Tile } from "../../lib/graphic/Tile.js";
import { MouseControl } from "../../lib/input/MouseControl.js";
import { BaseLevel } from "../../lib/level/BaseLevel.js";
import { GameState } from "../../lib/manager/GameState.js";
import { AssetLoadable } from "../../lib/ntfc/AssetLoadable.js";
import { Initiable } from "../../lib/ntfc/Initiable.js";
import { AssetUtil } from "../../lib/util/AssetUtil.js";
import { CollisionUtil } from "../../lib/util/CollisionUtil.js";
import { TileUtil } from "../../lib/util/TileUtil.js";
import { Enemy } from "./sprites/Enemy.js";
import { Turret } from "./sprites/Turret.js";


/**
 * this is a simple tower defense game example,
 * - tilemap is loaded from an xml/tmx tiled file, you have load it, parse it
 * to get tilemap, you can also load JSON file but i simply recommed to open
 * .tmx file and just copy and paste tile maps
 * - also there are two extended sprites like Enemy and Turrent that way you can
 * create your own sprites using OOP, most of the logic for those sprites are
 * inside their update() methods.
 * - there is an usage of MouseControl objecti which encapsulates the logic of
 * mouse presed, and released points. 
 */
export class TowerDefense extends BaseLevel implements Initiable, AssetLoadable
{

    readonly MAX_TURRETS=20;
    readonly TURRET_COST=100;

    currentTurrets:number;
    curretnMoney:number;

    cols:number=16;
    rows:number=9;
    tileWidth:number=32;
    tileHeight:number=32;
    tiles:Tile[];

    tileMap:number[] = []; //must be initialized, empty but initialized
    //= [
    //     9,9,9,9,1,2,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,1,2,9,9,9,9,
    //     9,9,9,9,1,2,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,1,2,9,9,9,9,
    //     9,9,9,9,1,2,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,1,2,9,9,9,9,
    //     9,9,9,9,1,2,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,1,2,9,9,9,9,
    //     9,9,9,9,1,2,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,1,2,9,9,9,9,
    //     9,9,9,9,1,2,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,1,2,9,9,9,9,
    //     9,9,9,9,1,2,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,1,2,9,9,9,9,
    //     9,9,9,9,1,2,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,1,2,9,9,9,9,
    //     9,9,9,9,1,2,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,1,2,9,9,9,9, 
    //     9,9,9,9,1,2,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,1,2,9,9,9,9,
    //     9,9,9,9,1,2,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,1,2,9,9,9,9,
    //     9,9,9,9,1,2,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,1,2,9,9,9,9,
    //     9,9,9,9,1,2,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,1,2,9,9,9,9,
    //     9,9,9,9,1,6,3,3,3,3,3,3,3,3,3,3, 3,3,3,3,3,3,3,3,3,3,8,2,9,9,9,9,
    //     9,9,9,9,5,4,4,4,4,4,4,4,4,4,4,4, 4,4,4,4,4,4,4,4,4,4,4,7,9,9,9,9,
    //     9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,
    //     9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,
    //     9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9
    // ];

    enemy:Enemy;
    turrets:Turret[]=[];
    bullets:Sprite[]=[];

    turretHUD:Sprite;
    turretSelected:Sprite;

    mouseControl:MouseControl;

    colliderMoveRight:Collider;
    colliderMoveUp:Collider;


    constructor()
    {
        super(512,288);
        this.init();
    }


    async loadImages(): Promise<void>  
    {
       // loading images/assets of the game
       let bgtilesImg = await AssetUtil.getImage( "/assets/towerdefense/32x32tileset.png" ).then( img => img );
       this.imageMap.set( "bgtiles" , bgtilesImg );

       let enemyImg = await AssetUtil.getImage( "/assets/towerdefense/enemy.png" ).then( img => img );
       this.imageMap.set( "enemy" , enemyImg );

       let turretImg = await AssetUtil.getImage( "/assets/towerdefense/turret.png" ).then( img => img );
       this.imageMap.set( "turret" , turretImg );

       let bulletImg = await AssetUtil.getImage( "/assets/towerdefense/redBullet.png" ).then( img => img );
       this.imageMap.set( "bullet" , bulletImg )

    }

    loadSounds(): void {
    }
    async loadData(): Promise<void> {

        //LOADING XML/TMX tiled map content as XML, parsing it to extract map array to use as tiledmap
        let data = await AssetUtil.makeAsyncRequest("get", "/assets/towerdefense/tileMap.tmx").then( data => data );
        // console.log("LOADING DATA: ", data );

        let parser = new DOMParser(); 
        let xmlData = parser.parseFromString( data, "text/xml");

        console.log(" DATAnodeValue: ", xmlData.getElementsByTagName("layer")[0].getElementsByTagName("data")[0].innerHTML);

        let xmlDataArray:string = xmlData.getElementsByTagName("layer")[0].getElementsByTagName("data")[0].innerHTML;
        // console.log("xmlDataArray: ", xmlDataArray)

        //this is an string array, must be number[]
        let tileArray:string[]= xmlDataArray.split(",");
        console.log("tileArray: ", tileArray)

         for ( let i in tileArray )
         {
             this.tileMap[i] = Number.parseInt( tileArray[i] );
             this.tileMap[i]-=1;//tiled does not respect index tiles we need to fix them
         }
        
    }
    

    async init()
    {
        this.currentTurrets = 0;
        this.curretnMoney = 0;

        await this.loadImages();

        await this.loadData();

        this.tiles = TileUtil.parse( this.tileMap, this.cols, this.rows, this.tileWidth, this.tileHeight );

        this.enemy = new Enemy( this.imageMap.get("enemy") );
        this.enemy.setPosition( 64, 0 );
        this.enemy.spdY=1;
        this.spriteList.push(this.enemy);
        

        for( let i = 0; i < this.MAX_TURRETS ;i++ )
        {
            this.turrets[i] = new Turret( this.imageMap.get("turret") );   
            this.turrets[i].visible = false; 
            this.spriteList.push(this.turrets[i]);
        }

        for( let i = 0; i < 30 ;i++ )
        {
            this.bullets[i] = new Sprite( this.imageMap.get("bullet") );
            this.bullets[i].visible=false;
            this.spriteList.push(this.bullets[i]);
        }
        

        this.turretHUD = new Sprite( this.imageMap.get("turret") );
        this.turretHUD.setPosition( this.levelWidth-this.turretHUD.w, 0 );

        this.turretSelected = new Sprite( this.imageMap.get("turret") );
        this.turretSelected.visible = false;
        this.turretSelected.alpha=0.7;

        this.mouseControl = new MouseControl();


        //colliders will move enemy direction
        this.colliderMoveRight = new Collider( 2*32,7*32,32,32);
        this.colliderMoveUp = new Collider( 14*32,6*32,32,32);


        this.gameState=GameState.PLAYING;
    }

    update( delta:number)
    {

        switch( this.gameState )
        {
            case GameState.LOADING:

            break;
            case GameState.PLAYING:

            //moving enemy
            if(this.enemy.visible)
            {
                this.enemy.move();

                if( CollisionUtil.getInstance().sideAndPushCollision( this.colliderMoveRight, this.enemy ) === "top"  )
                {
                    this.enemy.spdY=0;
                    this.enemy.spdX=1;
                }
    
                if( CollisionUtil.getInstance().sideAndPushCollision( this.colliderMoveUp, this.enemy ) === "left"  )
                {
                    this.enemy.spdY=-1;
                    this.enemy.spdX=0;
                }
            }
            


            //turrets waiting for enemy
            for( let tur of this.turrets)
            {
                //inside this method on its class is the logic for the update
                tur.update(delta, this.enemy, this.bullets);
            }


            for( let bul of this.bullets)
            {
                if(bul.visible)
                {
                    bul.move();
                    if( CollisionUtil.getInstance().spriteRectangleCollision(bul, this.enemy))
                    {
                        console.log("enemy hit");
                        bul.spdX=0;
                        bul.spdY=0;
                        bul.visible=false;
                        this.enemy.hp-=1;
                        if(this.enemy.hp<=0)
                        {
                            console.log("enemy killed");
                            this.enemy.visible=false;
                        }
                        break;
                    }

                    bul.visible = CollisionUtil.getInstance().isInside( bul.getX(), bul.getY(),bul.w,bul.h,0,0,this.levelWidth, this.levelHeight );
                   
                }
                
            }


            break;
        }

    }

    render(ctx: CanvasRenderingContext2D)
    {
        switch( this.gameState )
        {
            case GameState.LOADING:
            break;
            case GameState.PLAYING:

            TileUtil.renderTiles( ctx, this.imageMap.get( "bgtiles" ), this.tiles );


            for( let spr of this.spriteList )
            {
                spr.render(ctx);
            }

            this.turretSelected.render(ctx);

            // ctx.strokeStyle="red";
            // for( let tile of this.tiles)
            // {
            //     if( tile.imageIndex===1)
            //     ctx.strokeRect( tile.x, tile.y, tile.w, tile.h )
            // }
            
            // ctx.strokeStyle="blue"
            // if(this.mouseControl.isPressed && this.turretSelected.visible)
            // {
            //     let xx:number = Math.floor(this.turretSelected.getX()/32);
            //     let yy:number = Math.floor(this.turretSelected.getY()/32);
            //     ctx.strokeRect( xx,yy,32,32)
            // }

            ctx.fillStyle="black";
            ctx.fillText(`turrets: ${this.currentTurrets}/${this.MAX_TURRETS}`,20,20)
            this.turretHUD.render(ctx);

            break;
        }
    }

    mouseUp(e:MouseEvent)
    {
        this.mouseControl.mouseReleased(e);
        if(this.mouseControl.isReleased)
        {
            if(this.turretSelected.visible)
            {
                let xx:number = Math.floor(this.mouseControl.pointReleased.x/32);
                let yy:number = Math.floor(this.mouseControl.pointReleased.y/32);
                
                let pos:number = (yy*this.cols)+xx;
                pos-=1;
                console.log(`tilemap post value: ${this.tileMap[pos]}`)
    
                if(this.tileMap[pos] === 1 ) //possible deploy
                {
                    for( let spr of this.turrets )
                    {
                            if(!spr.visible)
                            {
                                 this.currentTurrets++;
                                spr.visible=true;
                                spr.setPosition( xx*32, yy*32 );
                                console.log(`deployed at: xx ${xx} - yy ${yy} | ${xx*32} ${yy*32}`)
                                break;
                            }
                    }
    
                }
                this.turretSelected.visible=false;
            }//turret visible

        }
    }

    mouseDown(e:MouseEvent)
    {
        this.mouseControl.mousePressed(e);
        if( this.mouseControl.spritePressed( this.turretHUD ) )
        {
            this.turretSelected.visible=true;
            this.turretSelected.setPosition( this.mouseControl.pointPressed.x - this.turretSelected.w/2,
                this.mouseControl.pointPressed.y - this.turretSelected.h/2);
        }


    }

    mouseMove(e:MouseEvent)
    {
        this.mouseControl.mouseMove(e);
        if( this.mouseControl.isPressed  && this.turretSelected.visible )
        {
            this.turretSelected.setPosition( this.mouseControl.pointPressed.x - this.turretSelected.w/2,
                                             this.mouseControl.pointPressed.y - this.turretSelected.h/2);
        }
    }



}