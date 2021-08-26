import { Config } from "../lib/cfg/Config.js";
import { AnimationLoop } from "../lib/graphic/AnimationLoop.js";
import { Collider } from "../lib/graphic/shape/Collider.js";
import { Sprite } from "../lib/graphic/Sprite.js";
import { Tile } from "../lib/graphic/Tile.js";
import { BaseLevel } from "../lib/level/BaseLevel.js";
import { GameManager } from "../lib/manager/GameManager.js";
import { GameState } from "../lib/manager/GameState.js";
import { AssetLoadable } from "../lib/ntfc/AssetLoadable.js";
import { Initiable } from "../lib/ntfc/Initiable.js";
import { ColliderUtil } from "../lib/util/ColliderUtil.js";
import { CollisionUtil } from "../lib/util/CollisionUtil.js";
import { AssetUtil } from '../lib/util/AssetUtil.js';
import { TileUtil } from "../lib/util/TileUtil.js";


/**
 * this levels shows you how to create a tile background and the use of
 * camera views
 */
export class AndroidLevel extends BaseLevel
                           implements AssetLoadable, Initiable
{

    readonly ANDOID_SPD:number=20;

    readonly colissionUtil:CollisionUtil= CollisionUtil.getInstance();

    tilesRows:number = 15;
    tilesCols:number = 60;
    tileSize:number = 16;
    tiles:Tile[];
    colisionTiles:Tile[];
    

    //android/PLAYER specific variables
    androidSprite:Sprite;
    androidMoveRight:boolean=false;
    androidMoveLeft:boolean=false;
    androidPunch:boolean=false;
    

    //tanks to be destroyed
    tankList:Sprite[];
    tanksDestroyed:number=0;
    
    // androidSpriteStand1:Sprite;
    // androidSpriteStand2:Sprite;


    //those will be invisible margins that will move the view when the player passes those
    marginLeft:number;
    marginRight:number;


    //jump related variables
    jump:boolean=false;
    onGround:boolean=true;
    grav:number=2.5;
    ySpd:number=0;


    colliderList:Collider[];
    colliderRows:number=15;
    colliderCols:number=60;

    colType:string="";

    punchCollider:Collider;


    //0 are empty frames, those are ignored when parsed but they should be there to organize other tiles,
    //like the ones at the bottom
    tileMap:any  =
        [
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0,0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,24, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0,24,25, 0, 0, 0,26, 0,    0, 0, 0, 0, 0, 0, 0, 0,19, 0, 0, 0, 0, 0,19, 19, 0,0, 0, 0,  0, 0, 0, 0, 0,22,29,25, 0, 0, 0,21, 0,24, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,10,10,10, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,10, 0, 0, 0, 0,10, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0,10, 0, 0, 0, 0, 0, 0, 0,10, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,10, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,10,10, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0,10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,10,10, 0, 0, 0, 0, 0, 0, 0,  0, 0,10,10, 0, 0, 0,10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10, 10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10, 10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10
       
        ];

        colisionMap:any =
        [
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,  0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1 ,1, 1, 1, 1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1 ,1 , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1 ,1 , 1, 1, 1
        ];


    constructor()
    {
        //this will instantiate the camera
        //level is 3 times bigger than view
        super( 960, 240, 320, 240 );
        this.init();
    }


    update(delta:number)
    {
        switch( this.gameState )
        {
        case GameState.LOADING:
        break;

        case GameState.PLAYING:

            // this.camera.moveX(1);

            if(this.androidMoveLeft)
            {
                this.androidSprite.moveX(-this.ANDOID_SPD * delta );
            }

            else if(this.androidMoveRight)
            {
                this.androidSprite.moveX( this.ANDOID_SPD * delta);
            }
            

            //else 
            if( this.androidPunch )
            {
                // console.log("androidPunch::",this.androidSprite.animationLoop)
                if( this.androidSprite.animationEnd )
                {
                    // console.log("removing android punch")
                    this.androidSprite.animationEnd=false;
                    this.androidPunch = false;
                    this.punchCollider.setPosition(-16, 0);
                    this.androidSprite.setNewAnimation( this.imageMap.get( "androidStand" ) );
                }
                else if( this.androidSprite.currentFrame==1)
                {
                    switch(this.androidSprite.xScale)
                    {
                        case -1:
                            this.punchCollider.setPosition(this.androidSprite.getX()-10, this.androidSprite.getY()+8);
                            break;
                        case 1:
                            this.punchCollider.setPosition(this.androidSprite.getX()+21, this.androidSprite.getY()+8);
                            break;
                    }
                }
                //check here if current frame !=1

                //check here collision between tanks and punch
                
                for( let tank of this.tankList)
                {
                    if( this.colissionUtil.spriteRectangleCollision( this.punchCollider, tank ) )
                    {
                        if(tank.image === this.imageMap.get("tank") )
                        {
                            this.punchCollider.setPosition(-16, 0);
                            tank.setNewAnimation(this.imageMap.get("tankShattered"),{srcX:0, srcY:0, w:16, h:24, frames:9});
                            this.tanksDestroyed+=1;
                        }
                        
                        break;
                    }
                }

            }

            for( let tank of this.tankList)
            {
                if( tank.image === this.imageMap.get("tankShattered") && tank.animationEnd )
                {
                    tank.setPosition(-16,-24);
                }
            }

            this.checkPlayerMargings(delta);

            if( this.jump || !this.onGround )
            {
                this.grav += 0.3;
                if( this.grav >= 4)this.grav = 4;
            }

            // this.ySpd += this.grav;
            // if( this.ySpd >= 4)this.ySpd = 4;

            this.androidSprite.moveY(this.grav);

            let colside:string="";
            for( let col of this.colliderList )
            {
                colside = this.colissionUtil.sideAndPushCollision( this.androidSprite, col, false);
                if( colside === "bottom" && this.ySpd >=0 )
                {

                    if( (this.androidMoveLeft || this.androidMoveRight) && this.androidSprite.image !== this.imageMap.get("androidWalking") )
                    {
                        this.androidSprite.setNewAnimation( this.imageMap.get("androidWalking"),{srcX:0, srcY:0, w:16, h:30, frames:6});
                    }
                    else if( this.androidSprite.image === this.imageMap.get("androidJump") )
                    {
                        this.androidSprite.setNewAnimation( this.imageMap.get("androidStand"))
                    }

                    this.onGround=true;
                    this.jump=false;
                    this.grav-=this.grav;
                     break;
                }
                else if( colside === "top" && this.ySpd <= 0)
                {
                    this.grav = 0;break;
                }
                
            }

            if( colside !== "bottom" /*&& this.ySpd > 0 */ )
            {
                // this.jump=true;
                this.onGround = false;
            }

        break;
        }
    }//


    async init(){
        
        // GameManager.getInstance().setFont( Config.DEFAULT_FONT_NAME, Config.DFLT_FNT_NAME_PATH );

        

        await this.loadImages();

        this.tiles = TileUtil.parse( this.tileMap, this.tilesCols, this.tilesRows, 16,16 );
        this.colliderList = ColliderUtil.parse( this.colisionMap, this.colliderCols, this.colliderRows,16,16 );

        this.androidSprite = new Sprite(this.imageMap.get("androidStand"));
        this.androidSprite.setPosition(20, this.levelHeight - this.androidSprite.h - 16 );
        this.androidSprite.pivotX=this.androidSprite.w/2;//uset to set xScale at this point for all animations
        this.androidSprite.animationStepLimit=6;

        this.setMargings();


        this.tankList = [];
        for( let i=0; i < 8; i++ )
        {
            this.tankList[i] = new Sprite( this.imageMap.get("tank") );
            this.tankList[i].animationLoop = AnimationLoop.STOPATEND;
        }

        this.tankList[0].setPosition( 240 ,this.levelHeight - this.tankList[0].h - 16)
        this.tankList[1].setPosition( 320 ,this.levelHeight - this.tankList[0].h - 16)
        this.tankList[2].setPosition( 64  ,this.levelHeight - this.tankList[0].h - 16)
        this.tankList[3].setPosition( 544 ,144 - this.tankList[0].h - 16)
        this.tankList[4].setPosition( 672  ,this.levelHeight - this.tankList[0].h - 16)
        this.tankList[5].setPosition( 704  ,this.levelHeight - this.tankList[0].h - 16)
        this.tankList[6].setPosition( 736  ,this.levelHeight - this.tankList[0].h - 16)
        this.tankList[7].setPosition( 800  ,this.levelHeight - this.tankList[0].h - 16)


        this.punchCollider= new Collider(-16,0,4,8);//outside the view


        //SETTING AGAIN FONT BECAUSE resize RESETS canvas STATE
        GameManager.getInstance().setFont(5,"press-start");//  = "10px press-start";

        // console.log(`tiles lenght ${this.tiles.length}`);
        // afther everything is loaded change state to playing
        this.gameState = GameState.PLAYING;
    }


    async loadImages(): Promise<void> {

        //loading the image that contains all the tiles for the bakground
        //and saving it in the imageMap to be used when needed
        let tileBackground = await AssetUtil.getImage("/assets/platform/citybg.png").then(img=>img);
        this.imageMap.set("tileBackground", tileBackground);

        let androidWalkingImg = await AssetUtil.getImage("/assets/platform/androidwalking.png").then(img=>img);
        this.imageMap.set("androidWalking", androidWalkingImg);

        let androidWeakPunchImg = await AssetUtil.getImage("/assets/platform/androidpunch.png").then(img=>img);
        this.imageMap.set("androidpunch", androidWeakPunchImg);

        let androidJumpImg = await AssetUtil.getImage("/assets/platform/androidjump.png").then(img=>img);
        this.imageMap.set("androidJump", androidJumpImg);

        let androidStandImg = await AssetUtil.getImage("/assets/platform/androidstand.png").then(img=>img);
        this.imageMap.set("androidStand", androidStandImg);

        let tankImg = await AssetUtil.getImage("/assets/platform/tank.png").then(img=>img);
        this.imageMap.set( "tank", tankImg );

        let tankShatteredImg = await AssetUtil.getImage("/assets/platform/tank-sheet.png").then(img=>img);
        this.imageMap.set( "tankShattered", tankShatteredImg );

    }

    //those are not usable for now
    loadSounds(): void {}
    loadData(): void {}


    render( ctx:CanvasRenderingContext2D)
    {
        switch( this.gameState )
        {

        case GameState.LOADING:
        break;

        case GameState.PAUSED:
        break;
        
        case GameState.PLAYING:

            ctx.fillStyle="#0000fc";
            ctx.fillRect(0, 0, this.levelWidth, this.levelHeight/2);

            ctx.fillStyle="#000";
            ctx.fillRect(0, this.levelHeight/2 - 8, this.levelWidth, this.levelHeight/2);

            // ctx.fillText( `left: ${this.androidMoveLeft} - rigth: ${this.androidMoveRight} - punch: ${this.androidPunch}`, 20,20);
            // ctx.fillText( `Y+H: ${this.androidSprite.getY()+this.androidSprite.h} x: ${this.androidSprite.getX()}`, 20,20);
            // ctx.fillText( `colType ${this.colType}`,20, 40);

            ctx.save();
            
            ctx.translate(this.camera.x, this.camera.y);

            TileUtil.renderTiles( ctx, this.imageMap.get( "tileBackground" ), this.tiles );


            //rendering tanks
            for( let i=0; i < 8; i++ )
            {
                this.tankList[i].render(ctx)
            }

            this.androidSprite.render( ctx );
            
            // this.androidSpriteStand1.render(ctx);
            // this.androidSpriteStand2.render(ctx);

            //uncomment below to draw bounding boxes of tiles and camera margings
            ctx.strokeStyle="white";
            // ctx.lineWidth=2;

            //uncomment to show camera margins
            // ctx.beginPath();
            // ctx.moveTo( this.camera.viewX+this.marginLeft-1, this.camera.viewY );
            // ctx.lineTo( this.camera.viewX+this.marginLeft-1, this.camera.viewHeight );
            // ctx.closePath();
            // ctx.stroke();

            // ctx.beginPath();
            // ctx.moveTo( this.camera.viewX+this.marginRight, this.camera.viewY );
            // ctx.lineTo( this.camera.viewX+this.marginRight, this.camera.viewHeight );
            // ctx.closePath();
            // ctx.stroke();

            // ctx.strokeRect(this.androidSpriteStand1.getX(), this.androidSpriteStand1.getY(), this.androidSpriteStand1.w,this.androidSpriteStand1.h);
            // ctx.strokeRect(this.androidSpriteStand2.getX(), this.androidSpriteStand2.getY(), this.androidSpriteStand2.w,this.androidSpriteStand2.h);
            //must be after we put the tiles, otherwise it wont show
            // ctx.fillStyle ="#000";
            // ctx.fillText("use A or D to move the view", this.camera.viewX+20, this.camera.viewY+20)

            //uncomment to show tiles colliders
            // this.colliderList.forEach( collider =>{
            //     ctx.strokeRect( collider.getX(), collider.getY(), collider.w, collider.h );
            // });


            ctx.fillStyle ="#FFF";
            ctx.fillText(`Tanks destroyed ${this.tanksDestroyed}/${this.tankList.length}`, this.camera.viewX+20, this.camera.viewY+20)

            //uncomment to show punchCollider
            // ctx.fillRect( this.punchCollider.getX(), this.punchCollider.getY(), this.punchCollider.w, this.punchCollider.h);

            ctx.restore();
            
        break;
        }


    }//

    keyDown( event:KeyboardEvent )
    {
        switch( event.keyCode )
        {
            case 87://W
                if(!this.jump)
                {
                    this.androidSprite.setNewAnimation( this.imageMap.get("androidJump") )
                    this.jump=true;
                    this.grav=-5;
                    this.onGround=false;
                }
                break;
            case 65: //A
                // if( this.androidSprite.image !== this.imageMap.get("androidWalking") )
                if(!this.androidMoveLeft && !this.androidPunch)
                {
                    this.androidMoveLeft=true;
                    this.androidSprite.setNewAnimation( this.imageMap.get("androidWalking"),{srcX:0, srcY:0, w:16, h:30, frames:6});
                    this.androidSprite.xScale = -1;
                }
            break;

            case 68: //D
            // if( this.androidSprite.image !== this.imageMap.get("androidWalking") )
                if(!this.androidMoveRight && !this.androidPunch )
                {
                    this.androidMoveRight=true;
                    this.androidSprite.setNewAnimation( this.imageMap.get("androidWalking"),{srcX:0, srcY:0, w:16, h:30, frames:6});
                    this.androidSprite.xScale = 1;
                }
            break;

            case 32: //enter
                if(!this.androidPunch)
                {
                    this.androidPunch = true;
                    this.androidMoveLeft=false;
                    this.androidMoveRight=false;
                    this.androidSprite.setNewAnimation(this.imageMap.get("androidpunch"),{srcX:0, srcY:0, w:25, h:30, frames:4})
                }
            break;
        }//

    }//


    keyUp( event:KeyboardEvent )
    {
        switch( event.keyCode )
        {
            case 65: //A
            case 68: //D
            this.androidMoveLeft=false;
            this.androidMoveRight=false;
            this.androidPunch = false;
            this.androidSprite.setNewAnimation( this.imageMap.get( "androidStand" ) );
            break;
            case 32: //enter
            // this.androidPunch = false;
            break;
        }//

    }//

    
    setMargings()
    {
        let marginWidth = Math.ceil( this.camera.viewWidth/3 );
        this.marginLeft = marginWidth;
        this.marginRight = marginWidth*2; 
    }

    checkPlayerMargings(delta:number)
    {
        if( this.androidSprite.getX()+8 < this.camera.viewX+this.marginLeft ) this.camera.moveX( -this.ANDOID_SPD*delta );
        if( this.androidSprite.getX()+8 > this.camera.viewX+this.marginRight ) this.camera.moveX( this.ANDOID_SPD*delta );
    }


}//