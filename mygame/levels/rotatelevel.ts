import { BaseLevel } from "../../src/com/bitless/level/baselevel.js";
import { AssetLoadable } from "../../src/com/bitless/ntfc/assetLoadable.js";
import { Sprite } from "../../src/com/bitless/graphic/sprite.js";
import { GameState } from "../../src/com/bitless/manager/gamestate.js";
import { MathUtil } from "../../src/com/bitless/util/mathutil.js";
import { SpriteUtil } from "../../src/com/bitless/util/spriteutil.js";
import { AnimationLoop } from "../../src/com/bitless/graphic/animationloop.js";
import { Task } from "../../src/com/bitless/task/task.js";

/**
 * this class will show you how can you rotate or scale an sprite
 * and use other functions to move towards an object, or rotate an 
 * sprite to another sprite, etc.
 * there is also a bullet shoot at mouse pointer when SPACE is pressed
 */
export class RotateLevel extends BaseLevel
                         implements AssetLoadable
{
rotatingSprite:Sprite;

arrowSprite:Sprite;

squareSprite:Sprite;

bulletSprite:Sprite;

circleSprite:Sprite;

scaleTask:Task;

    squareSpd:number;// = 3;

    constructor()
    {
        super( 640, 480 );
        this.loadImages();

        this.squareSprite =  new Sprite( this.imageMap.get( "sqrImage2" ), 32 , 32 );
        this.squareSprite.setPosition( 50, 50 );
        this.squareSpd = 3;
        this.squareSprite.animationLoop = AnimationLoop.NONE;

        this.rotatingSprite = new Sprite( this.imageMap.get( "sqrImage" ) );
        this.rotatingSprite.setPosition( 200, 200);

        this.arrowSprite = new Sprite( this.imageMap.get( "arrowImage" ) );
        this.arrowSprite.setPosition( 300, 300  );
        // this.arrowSprite.setPosition( this.levelWidth/2 + this.arrowSprite.w/2, 300  );

        this.bulletSprite = new Sprite( this.imageMap.get( "bulletImage" ) );
        this.bulletSprite.setPosition( this.arrowSprite.x+this.arrowSprite.w/2, 
            this.arrowSprite.y+this.arrowSprite.h/2 );
       
        this.circleSprite =  new Sprite( this.imageMap.get( "circleImage" ) );
        this.circleSprite.setPosition( 400, 100);

        this.scaleTask = new Task();
        this.scaleTask.setCounter( 100 );
    }//
   


    update( delta:number )
    {
        switch( this.gameState )
        {
            case GameState.LOADING:
                if( this.isLoadComplete ) this.gameState = GameState.PLAYING;
            break;
            
            case GameState.PLAYING:
                this.rotatingSprite.angle += (1*delta);

                // this.squareSprite.moveX( this.squareSpd );
                // if( this.squareSprite.x + this.squareSprite.w >= this.levelWidth || this.squareSprite.x <= 0 )
                // this.squareSpd * -1;


                // this.arrowSprite.angle = 
                // SpriteUtil.getangle( this.arrowSprite, 
                //     this.squareSprite.x + this.squareSprite.w/2,
                //     this.squareSprite.y + this.squareSprite.h/2);

                //make the bullet move depending own bullet spdX and spdY
                this.bulletSprite.move();

                // every 100 steps circle will grow ( is scaled on X & Y )
                this.scaleTask.process( ()=>
                {
                    if( this.circleSprite.xScale < 3 )
                    {
                        this.circleSprite.xScale+=.2;
                        this.circleSprite.yScale+=.2;
                    }
                    this.scaleTask.setCounter( 100 );
                });

            break;
        }//

    }//

    render( ctx: CanvasRenderingContext2D )
    {  

        switch( this.gameState )
        {
            case GameState.LOADING:
            break;
            
            case GameState.PLAYING:

            ctx.fillStyle = "#EAEAEA";
            ctx.fillRect( 0, 0, this.levelWidth, this.levelHeight );

            this.rotatingSprite.render( ctx );  
            this.squareSprite.render( ctx );
            this.arrowSprite.render( ctx );
            this.bulletSprite.render( ctx );

            this.circleSprite.render( ctx );

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

    loadSounds(): void {
    }
    loadData(): void {
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
    }

    /**
     * the arrow will point towards mouse pointer
     * @param event 
     */
mouseMove( event )
{
    // getting pointer angle every time is moved and making the arrow face that direction
    this.arrowSprite.angle = 
        SpriteUtil.getangle( this.arrowSprite, event.clientX, event.clientY);

}

keyDown( event )
{

    switch( event.keyCode )
        {
            case 32: //SPACE
            //every time you press space key, bullet will be set in the center of the arrow
            //then will move towards the mouse with a speed of 3
            this.bulletSprite.setPosition( this.arrowSprite.x+this.arrowSprite.w/2, 
                                           this.arrowSprite.y+this.arrowSprite.h/2 );

            SpriteUtil.moveToAngle( this.bulletSprite, this.arrowSprite.angle, 3, false );

            console.log( `${this.bulletSprite.spdX} - ${this.bulletSprite.spdY}`)

            break;
        }//
}



}//

