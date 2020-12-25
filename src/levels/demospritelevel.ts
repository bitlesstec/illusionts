import { AssetLoadable } from "../lib/ntfc/AssetLoadable.js";
import { GameState } from "../lib/manager/GameState.js";
import { BaseLevel } from "../lib/level/BaseLevel.js";
import { Sprite } from "../lib/graphic/Sprite.js";
import { AnimationLoop } from "../lib/graphic/AnimationLoop.js";
import { SpriteUtil } from "../lib/util/SpriteUtil.js";


/**
 * in this level we will use different functions of SpriteUtil class
 */
export class DemoSpriteLevel extends BaseLevel
                            implements AssetLoadable
{


    redSprite:Sprite;
    blueSprite:Sprite;
    circleSprite:Sprite;


    constructor()
    {
        super( 640, 480 );

        this.loadImages();

        this.redSprite =  new Sprite( this.imageMap.get( "sqrImage" ), 32, 32 );
        this.redSprite.setPosition( 100, 100 );
        this.redSprite.animationLoop = AnimationLoop.NONE;

        this.blueSprite =  new Sprite( this.imageMap.get( "sqrImage2" ), 32, 32 );
        this.blueSprite.setPosition( 120, 300 );
        this.blueSprite.animationLoop = AnimationLoop.NONE;
        this.blueSprite.currentFrame = 1;// to show blue square
        this.blueSprite.label="BLUE SPRITE";
        
        this.circleSprite =  new Sprite( this.imageMap.get( "circleImage" ) );
        this.circleSprite.setPosition( 300, 300 );
        this.circleSprite.animationLoop = AnimationLoop.NONE;
        this.circleSprite.label="CIRCLE SPRITE";


        this.spriteList.push( this.redSprite );
        this.spriteList.push( this.blueSprite );
        this.spriteList.push( this.circleSprite );
        // this.spriteMap.set
    }//


   

    update( delta:number )
    {

        switch( this.gameState )
        {
            case GameState.LOADING:
                if( this.isLoadComplete ) this.gameState = GameState.PLAYING;
            break;
            
            case GameState.PLAYING:

            break;
        }

    }//

    render( ctx:CanvasRenderingContext2D )
    {
        ctx.fillStyle = "#000";
        ctx.fillRect( 0, 0, this.levelWidth, this.levelHeight );

        ctx.fillStyle = "#FFF";
            
        switch( this.gameState )
        {
            case GameState.LOADING:
                ctx.fillText( "Loading...", 200, 200 );
            break;
            
            case GameState.PLAYING:

                ctx.fillText( 
                    "Instance Nearest: "+
                    SpriteUtil.spriteNearest( this.redSprite,[this.blueSprite, this.circleSprite ] ).label
                     ,200, 40 );

                // this.blueSprite.render( ctx );  
                // this.redSprite.render( ctx );
                // this.circleSprite.render( ctx );

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

    loadSounds(): void 
    {
    }
    loadData(): void 
    {
    }

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
             this.redSprite.x-=3;
            break;
            
            case 68: //D
            this.redSprite.x+=3;
            break;
            
            case 83: //S
             this.redSprite.y+=3;
            break;
            
            case 87: //W
            this.redSprite.y-=3;
            break;
        }//

    }//



}//