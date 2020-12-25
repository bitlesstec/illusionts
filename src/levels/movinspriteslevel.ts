import { AssetLoadable } from "../lib/ntfc/AssetLoadable.js";
import { GameState } from "../lib/manager/GameState.js";
import { BaseLevel } from "../lib/level/BaseLevel.js";
import { TextSprite } from "../lib/graphic/TextSprite.js";
import { Sprite } from "../lib/graphic/Sprite.js";
import { AnimationLoop } from "../lib/graphic/AnimationLoop.js";
import { LineSprite } from "../lib/graphic/LineSprite.js";
import { CollisionUtil } from "../lib/util/CollisionUtil.js";
import { Task } from "../lib/task/Task.js";



export class MovingSpritesLevel extends BaseLevel
                            implements AssetLoadable
{


    HUD:TextSprite;
    arrow:Sprite;
    redSprite:Sprite;
    blueSprite:Sprite;
  shootingTask:Task;



    lineLenght = 300;


    constructor()
    {
        super( 640, 480 );

        this.loadImages();

        this.HUD = new TextSprite( "Moving Sprites Level" );
        this.HUD.setPosition( this.levelWidth / 2, 30 );

        this.arrow = new Sprite ( this.imageMap.get( "arrowImage" ) );
        this.arrow.setPosition( this.levelWidth, 0 );//outside the level

        this.redSprite =  new Sprite( this.imageMap.get( "sqrImage" ),32,32 )
        this.blueSprite.animationLoop = AnimationLoop.NONE;
        this.redSprite.setPosition( 50, 100 );

        this.blueSprite =  new Sprite( this.imageMap.get( "sqrImage2" ),32,32 )
        this.blueSprite.animationLoop = AnimationLoop.NONE;
        this.blueSprite.currentFrame = 1;
        this.blueSprite.setPosition( 200, 100 );

      

        this.spriteList.push( this.HUD );
        this.spriteList.push( this.arrow );
        this.spriteList.push( this.redSprite );
        this.spriteList.push( this.blueSprite );
        
        
        this.shootingTask = new Task();
        this.shootingTask.setCounter( 100 );


    }//



    update( delta:number )
    {

        switch( this.gameState )
        {
            case GameState.LOADING:
                if( this.isLoadComplete ) this.gameState = GameState.PLAYING;
            break;
            
            case GameState.PLAYING:
                this.arrow.angle += ( 1 * delta );
                // console.log( "DELTA: "+this.arrow.angle );
                
              
            break;
        }

    }//

    render( ctx:CanvasRenderingContext2D )
    {
        ctx.fillStyle = "#CCC";
        ctx.fillRect( 0, 0, this.levelWidth, this.levelHeight );

        ctx.fillStyle = "#FFF";
            
        switch( this.gameState )
        {
            case GameState.LOADING:
                ctx.fillText( "Loading...", 200, 200 );
            break;
            
            case GameState.PLAYING:

            this.spriteList.forEach( spr => { spr.render( ctx ); } );
           
            break;
        }//

    }//


    loadImages(): void 
    {
        let sqrImage =  new Image();
        sqrImage.src = "/assets/sqr.png";

        let sqrImage2 =  new Image();
        sqrImage2.src = "/assets/sqr.png";

        let arrowImage =  new Image();
        arrowImage.src = "/assets/arrow.png";

        let bulletImage =  new Image();
        bulletImage.src = "/assets/bullet.png";
        
        let circleImage =  new Image();
        circleImage.src = "/assets/circle.png";

        this.imageMap.set( "sqrImage", sqrImage );
        this.imageMap.set( "sqrImage2", sqrImage2 );
        this.imageMap.set( "arrowImage", arrowImage );
        this.imageMap.set( "bulletImage", bulletImage );
        this.imageMap.set( "circleImage", circleImage );

    }

    loadSounds(): void {}

    loadData(): void {}


    isLoadComplete(): boolean 
    {
        let loadedImgs = 0;
        for ( let img of this.imageMap.values() ) 
        {
            if( img.complete )
                loadedImgs++;
        }
        return this.imageMap.size === loadedImgs;
    }//

    // move the sprite
    keyUp( event:KeyboardEvent )
    {
        switch( event.keyCode )
        {
            case 65: //A
             this.redSprite.x-=5;
            break;
            
            case 68: //D
            this.redSprite.x+=5;
            break;
            
            case 83: //S
             this.redSprite.y+=5;
            break;
            
            case 87: //W
            this.redSprite.y-=5;
            break;
        }//

    }//




}//