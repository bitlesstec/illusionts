import { Sprite } from "../lib/graphic/Sprite.js";
import { Tile } from "../lib/graphic/Tile.js";
import { BaseLevel } from "../lib/level/BaseLevel.js";
import { GameState } from "../lib/manager/GameState.js";
import { AssetLoadable } from "../lib/ntfc/AssetLoadable.js";
import { Initiable } from "../lib/ntfc/Initiable.js";
import { ImageUtil } from '../lib/util/ImageUtil.js';
import { TileUtil } from "../lib/util/TileUtil.js";


/**
 * this levels shows you how to create a tile background and the use of
 * camera views
 */
export class AndroidLevel extends BaseLevel
                           implements AssetLoadable, Initiable
{

    readonly ANDOID_SPD:number=20;

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
    

    androidSpriteStand1:Sprite;
    androidSpriteStand2:Sprite;


    //those will be invisible margins that will move the view when the player passes those
    marginLeft:number;
    marginRight:number;


    //0 are empty frames, those are ignored when parsed but they should be tehre to organize other tiles,
    //like the ones at the bottom
    tileMap:any  =
        [
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0, 24, 25, 0, 0, 0,26, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 19, 0, 0, 0, 0, 0,19, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 29, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
         9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10, 10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10, 10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10
       
        ];

        colisionMap:any =
        [

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
            

            else if( this.androidPunch )
            {
                // console.log("androidPunch::",this.androidSprite.animationLoop)
                if( this.androidSprite.animationEnd )
                {
                    // console.log("removing android punch")
                    this.androidSprite.animationEnd=false;
                    this.androidPunch = false;
                    this.androidSprite.setNewAnimation( this.imageMap.get( "androidStand" ) );
                }
               
            }

            this.checkPlayerMargings(delta);

        break;
        }
    }


    async init(){
        
        await this.loadImages();

        this.tiles = TileUtil.parse( this.tileMap, this.tilesCols, this.tilesRows, 16,16 );


        this.androidSprite = new Sprite(this.imageMap.get("androidStand"));
        this.androidSprite.setPosition(20, this.levelHeight - this.androidSprite.h - 16 );
        this.androidSprite.pivotX=this.androidSprite.w/2;//uset to set xScale at this point for all animations
        this.androidSprite.animationStepLimit=6;

        this.androidSpriteStand1 = new Sprite( this.imageMap.get("androidStand") );
        this.androidSpriteStand1.setPosition( 20, 30 );

        this.androidSpriteStand2 = new Sprite( this.imageMap.get("androidStand") );
        this.androidSpriteStand2.setPosition( 20, 65 );
        this.androidSpriteStand2.xScale=-1;

        this.setMargings();
        // console.log(`tiles lenght ${this.tiles.length}`);
        // afther everything is loaded change state to playing
        this.gameState = GameState.PLAYING;
    }


    async loadImages(): Promise<void> {

        //loading the image that contains all the tiles for the bakground
        //and saving it in the imageMap to be used when needed
        let tileBackground = await ImageUtil.getImage("/assets/platform/citybg.png").then(img=>img);
        this.imageMap.set("tileBackground", tileBackground);

        let androidWalkingImg = await ImageUtil.getImage("/assets/platform/androidwalking.png").then(img=>img);
        this.imageMap.set("androidWalking", androidWalkingImg);

        let androidWeakPunchImg = await ImageUtil.getImage("/assets/platform/androidpunch.png").then(img=>img);
        this.imageMap.set("androidpunch", androidWeakPunchImg);

        let androidStandImg = await ImageUtil.getImage("/assets/platform/androidstand.png").then(img=>img);
        this.imageMap.set("androidStand", androidStandImg);

        let androidStandImg2 = await ImageUtil.getImage("/assets/platform/androidstand.png").then(img=>img);
        this.imageMap.set("androidStand2", androidStandImg2);

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

            ctx.fillText( `left: ${this.androidMoveLeft} - rigth: ${this.androidMoveRight} - punch: ${this.androidPunch}`, 20,20);

            ctx.save();
            
            ctx.translate(this.camera.x, this.camera.y);

            TileUtil.renderTiles( ctx, this.imageMap.get( "tileBackground" ), this.tiles );


            


            this.androidSprite.render( ctx );

            // this.androidSpriteStand1.render(ctx);
            // this.androidSpriteStand2.render(ctx);

            ctx.strokeStyle="white";
            // ctx.lineWidth=2;

            //uncomment to hide camera margins
            ctx.beginPath();
            ctx.moveTo( this.camera.viewX+this.marginLeft-1, this.camera.viewY );
            ctx.lineTo( this.camera.viewX+this.marginLeft-1, this.camera.viewHeight );
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo( this.camera.viewX+this.marginRight, this.camera.viewY );
            ctx.lineTo( this.camera.viewX+this.marginRight, this.camera.viewHeight );
            ctx.closePath();
            ctx.stroke();

            // ctx.strokeRect(this.androidSpriteStand1.getX(), this.androidSpriteStand1.getY(), this.androidSpriteStand1.w,this.androidSpriteStand1.h);
            // ctx.strokeRect(this.androidSpriteStand2.getX(), this.androidSpriteStand2.getY(), this.androidSpriteStand2.w,this.androidSpriteStand2.h);
            //must be after we put the tiles, otherwise it wont show
            // ctx.fillStyle ="#000";
            // ctx.fillText("use A or D to move the view", this.camera.viewX+20, this.camera.viewY+20)

            ctx.restore();
            
        break;
        }


    }//

    keyDown( event:KeyboardEvent )
    {
        switch( event.keyCode )
        {
            case 65: //A
                // if( this.androidSprite.image !== this.imageMap.get("androidWalking") )
                if(!this.androidMoveLeft && !this.androidPunch)
                {
                    this.androidMoveLeft=true;
                    this.androidSprite.setNewAnimation( this.imageMap.get("androidWalking"),{srcX:0, srcY:0, w:16, h:30, frames:6});
                    this.androidSprite.xScale = -1;
                }
                // this.androidSprite.moveX(-3);
            break;

            case 68: //D
            // if( this.androidSprite.image !== this.imageMap.get("androidWalking") )
                if(!this.androidMoveRight && !this.androidPunch )
                {
                    this.androidMoveRight=true;
                    this.androidSprite.setNewAnimation( this.imageMap.get("androidWalking"),{srcX:0, srcY:0, w:16, h:30, frames:6});
                    this.androidSprite.xScale = 1;
                }
                // this.androidSprite.moveX(3);
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
        if( this.androidSprite.getX()+8 < this.camera.viewX+this.marginLeft ) this.camera.moveX( -this.ANDOID_SPD*delta);
        if( this.androidSprite.getX()+8 > this.camera.viewX+this.marginRight ) this.camera.moveX( this.ANDOID_SPD*delta);
    }


}//