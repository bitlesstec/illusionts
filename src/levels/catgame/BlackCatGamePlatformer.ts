
import { BaseLevel } from '../../lib/level/BaseLevel.js';
import { Initiable } from '../../lib/ntfc/Initiable.js';
import { AssetLoadable } from '../../lib/ntfc/AssetLoadable.js';
import { AssetUtil } from "../../lib/util/AssetUtil.js";
import { GameState } from '../../lib/manager/GameState.js';
import { Task } from "../../lib/task/Task.js";
import { GameManager } from '../../lib/manager/GameManager.js';
import { Tile } from '../../lib/graphic/Tile.js';
import { TileUtil } from '../../lib/util/TileUtil.js';
import { Sprite } from '../../lib/graphic/Sprite.js';
import { AnimationLoop } from '../../lib/graphic/AnimationLoop.js';
import { CollisionUtil } from '../../lib/util/CollisionUtil.js'
import { Point } from '../../lib/graphic/Point.js';

export class BlackCatGamePlatformer extends BaseLevel
implements AssetLoadable, Initiable
{
    readonly colissionUtil:CollisionUtil= CollisionUtil.getInstance();
    // tileMap:number[]=[];
    tiles:Tile[];


    cat:Sprite;
    
    moveRight:boolean;
    moveLeft:boolean;
    readonly CAT_SPD:number=25;

    //jump related variables
    jump:boolean=true;
    onGround:boolean=true;
    grav:number=20; //9.80
    ySpd:number=0;

    updateCount:number=0;


    // tileMap:number[]=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    //                   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    //                   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    //                   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    //                   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    //                   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    //                   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    //                   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    //                   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    //                   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 
    //                   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 
    //                   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 
    //                   0, 0, 0, 0, 0, 2, 1, 3, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
    //                   0, 0, 0, 0, 2, 1, 1, 1, 3, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
    //                   1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]


    tileMap:number[]=  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 1, 1, 1, 1, 1, 1, 0, 3, 0, 0, 0, 0, 0, 2, 0, 1, 1, 1, 1, 1, 1, 
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 3, 0, 0, 0, 2, 0, 1, 1, 1, 1, 1, 1, 1, 
                        0, 0, 0, 0, 0, 2, 1, 3, 0, 0, 0, 0, 0, 0, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
                        0, 0, 0, 0, 2, 0, 1, 0, 3, 0, 0, 0, 0, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
                        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

                        

    constructor()
    {
        super( 1280, 480, 640, 480 );
        this.init();

    }

    async init(): Promise<void>  {
       
        await this.loadData();
        await this.loadImages();
        await this.loadSounds();
      

        //parse tiles here
        this.tiles = TileUtil.parse(this.tileMap, 40, 15, 32, 32 );


        this.cat = new Sprite( this.imageMap.get("catImg"), { srcX:0 , srcY:0 , w:38, h:40, frames: 3 } );
        this.cat.setPosition( 20, 200)//480-32-this.cat.h );
         
        this.cat.animationLoop = AnimationLoop.NONE;
        this.cat.anchor= new Point( this.cat.w/2, this.cat.h );
        this.cat.animationStepLimit = 5;
        this.cat.spdY=0;


        this.moveLeft=false;
        this.moveRight=false;

        this.gameState = GameState.PLAYING;
    }

    async loadImages(): Promise<void> 
    {
        let blacktileImg = await  AssetUtil.getImage("/assets/catgame/blacktile.png").then(img=>img);
        this.imageMap.set( "blacktileImg", blacktileImg );

        let catImg = await  AssetUtil.getImage("/assets/catgame/cat_walk.png").then(img=>img);
        this.imageMap.set( "catImg", catImg );

        let catIconImg = await  AssetUtil.getImage("/assets/catgame/sp_icon_cat_1.png").then(img=>img);
        this.imageMap.set( "catIconImg", catIconImg );

    }

    async loadSounds(): Promise<void> {

    }

    async loadData(): Promise<void> {

        let tileJson:any = await AssetUtil.makeAsyncRequest( "get", "/assets/catgame/black_platform_tile_map.json").then( data => data );
        tileJson = JSON.parse(tileJson);  
        console.log( tileJson.layers[0].data ) //.layers[0].data );

        // this.tileMap = tileJson.layers[0].data;
    }


    update(delta:number)
    {

        switch( this.gameState )
        {
            case GameState.LOADING:
            break;
            case GameState.PLAYING:

            if(this.moveRight)
            {
                this.cat.spdX = this.CAT_SPD * delta;
            }
            else if( this.moveLeft)
            {
                this.cat.spdX = -this.CAT_SPD * delta;
            }

            
            // console.log( this.cat.getX() +" - "+ (this.cat.getY()+this.cat.h) )
            // console.log(`enter spd ${this.cat.spdY} : ${this.jump} > ${this.onGround}`)
            //checking gravity
            if( this.jump || !this.onGround )
            {
                    this.cat.spdY += this.grav * delta;
                if( this.cat.spdY  >= 20 )this.cat.spdY = 20;
            }

            //make cat move depending spdX
            this.cat.move();
            // this.cat.moveY(this.grav);

            //check collision with tiles here
            if( this.cat.spdY > 0 || this.onGround )
            {
                let colside =  this.colissionUtil.tileCollision( this.cat, this.tiles );

                this.updateCount++;
                if( this.updateCount > 30 && colside )
                {
                    this.updateCount = 0;
                    console.log(" colside: "+colside )
                }
                    
     
                 if( colside === "bottom" )//&& this.ySpd >=0 )
                 {
                     // console.log("bottom")
                     this.onGround=true;
                     this.jump=false;
                     this.cat.spdY = 0;// - this.ySpd ;
                     // this.cat.setY( this.cat.getY() -2 )
                     // this.cat.setY( this.cat.getY() - this.cat.spdY );
                     //  break;
                 }
            }

           

            break;
        }

    }

    

    render( ctx:CanvasRenderingContext2D)
    {

        ctx.fillStyle = "#000";
        ctx.fillRect(0,0, this.levelWidth, this.levelHeight)

        switch( this.gameState )
        {
            case GameState.LOADING:
            break;
            case GameState.PLAYING:
            
            //blue sky bg
            ctx.fillStyle ="#5fcde4";
            ctx.fillRect( this.camera.viewX, 0, this.levelWidth, this.levelHeight );

            //render tiles inside camera view
            TileUtil.renderTiles( ctx, this.imageMap.get( "blacktileImg" ), this.tiles, this.camera, 32 );

            this.cat.render(ctx);

            break;
        }

    }



    keyDown( event:KeyboardEvent )
    {
        switch( event.keyCode )
        {
            case 87://W | JUMP
            if(!this.jump)
                {
                    //this.androidSprite.setNewAnimation( this.imageMap.get("androidJump") )
                    this.jump=true;
                    // this.grav=-5;
                    this.cat.spdY = -10;
                    this.onGround=false;
                }
                break;
            case 65: //A | MOVE LEFT
              this.moveLeft=true;
              this.moveRight=false;

            if( this.cat.xScale !== -1)
                this.cat.xScale =-1;

            if( this.cat.animationLoop !== AnimationLoop.FORWARD )    
                this.cat.animationLoop= AnimationLoop.FORWARD;

            break;

            case 68: //D | MOVE RIGHT
              this.moveLeft=false;
              this.moveRight=true;

              if( this.cat.xScale !== 1)
                  this.cat.xScale = 1;

              if( this.cat.animationLoop !== AnimationLoop.FORWARD )    
                  this.cat.animationLoop= AnimationLoop.FORWARD;

            break;

        }//

    }//


    keyUp( event:KeyboardEvent )
    {
        switch( event.keyCode )
        {
            case 87://W
                break;
            case 65: //A
              this.moveLeft=false;
              this.cat.animationLoop = AnimationLoop.NONE;
              this.cat.setCurrentFrame(0);
              this.cat.spdX = 0;
            break;

            case 68: //D
              this.moveRight=false;
              this.cat.setCurrentFrame(0);
              this.cat.animationLoop = AnimationLoop.NONE;
              this.cat.spdX = 0;
            break;

            case 32: //enter
            break;
        }//

    }//





}