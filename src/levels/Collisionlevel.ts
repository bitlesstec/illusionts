

import { AssetLoadable } from "../lib/ntfc/AssetLoadable.js";
import { GameState } from "../lib/manager/GameState.js";
import { BaseLevel } from "../lib/level/BaseLevel.js";
import { TextSprite } from "../lib/graphic/TextSprite.js";
import { Sprite } from "../lib/graphic/Sprite.js";
import { AnimationLoop } from "../lib/graphic/AnimationLoop.js";
import { LineShape } from "../lib/graphic/shape/LineShape.js";
import { CollisionUtil } from "../lib/util/CollisionUtil.js";
import { MathUtil } from "../lib/util/MathUtil.js";
import { Point } from "../lib/graphic/Point.js";
import { ImageUtil } from "../lib/util/ImageUtil.js";
import { Initiable } from "../lib/ntfc/Initiable.js";
import { Mousable } from "../lib/ntfc/input/Mousable.js";
import { SpriteUtil } from "../lib/util/SpriteUtil.js";
import { GameManager } from "../lib/manager/GameManager.js";




export class CollisionLevel extends BaseLevel
                            implements AssetLoadable, Initiable, Mousable
{
    HUD:TextSprite;
    arrow:Sprite;
    arrowShooter:Sprite;
    redSprite:Sprite;
    blueSprite:Sprite;
    bulletSprite:Sprite;
    laser:LineShape;
    blueLine:LineShape;

    lineLenght = 300;

    constructor()
    {
        super( 640, 480 );
        this.init();
    }//
    
    async init() {
       
        await this.loadImages();

        this.HUD =  new TextSprite( "move sprite with AWSD, Space to shoot bullet towards mouse pointer# lasser collides with blue square" );
        this.HUD.setPosition( 0, 30 );

        this.arrow = new Sprite ( this.imageMap.get( "arrowImage" ) );
        this.arrow.setPosition( 100, 240);

        this.arrowShooter = new Sprite(this.imageMap.get( "arrowImage" ));
        this.arrowShooter.setPosition( 320, 240);

        this.redSprite =  new Sprite( this.imageMap.get( "sqrImage" ) )
        this.redSprite.setPosition( 50, 100 );

        this.blueSprite =  new Sprite( this.imageMap.get( "sqrImage" ), {srcX:0, srcY:0, w:32, h:32, frames:2} )
        this.blueSprite.animationLoop = AnimationLoop.NONE;
        this.blueSprite.setCurrentFrame(1);
        this.blueSprite.setPosition( 200, 100 );

        //laser will change when spinning
        this.laser = new LineShape( new Point(0, 0) , new Point(10,10) );
        this.laser.strokeColor="#F00";

        this.blueLine = new LineShape(  new Point(20, 80), new Point(400, 80) );
        this.blueLine.strokeColor="blue";
        this.blueLine.strokeLineWidth = 5;

        this.bulletSprite = new Sprite( this.imageMap.get( "bulletImage" ) );
        this.bulletSprite.visible=false;

        //#YOU CAN ALSO PUT ALL SPRITES INSIDE spriteList AND ITERATE IT TO RENDER ALL
        // OR USE IT FOR COLLISION CHECKING...
        // this.spriteList.push( this.HUD );
        // this.spriteList.push( this.redSprite );
        // this.spriteList.push( this.blueSprite );

        // this.spriteList.push( this.arrow );
       
        // this.spriteList.push( this.laser );
        // this.spriteList.push( this.blueLine );
        
        console.log( "size: "+this.spriteList.length );
        this.gameState=GameState.PLAYING;
    }



    update( delta:number )
    {

        switch( this.gameState )
        {
            case GameState.LOADING:
            break;
            
            case GameState.PLAYING:

            //#FIRST ARROW ROTATING
                this.arrow.angle += ( 1 * delta );
                
            //#LASER PROCESS
                // // updating laser
                this.laser.setX( this.arrow.getX() + this.arrow.w/2 ) ;
                this.laser.setY( this.arrow.getY() + this.arrow.h/2 );

                let xxx:number=0, yyy:number=0;//, lineLenght:number=100;
                
                //if the lasser collides with the blue square sprite, length
                //will be stopped then laser won't grow anymore
                let i = 1;
                for( ; i < this.lineLenght && !CollisionUtil.getInstance().spritePointCollision( xxx, yyy, this.blueSprite ) ; i++ )
                {
                    //there var are used for spritePointCollisio
                    xxx =  this.arrow.getX() + MathUtil.lengthDirX( i, this.arrow.angle );
                    yyy =  this.arrow.getY() + MathUtil.lengthDirY( i, this.arrow.angle ) ;
                }
           
                // //LASER IS A SHAPE but an SPRITE, so it only as accessors for x & y
                // //change to xxx , yyy
                this.laser.points[1].x =xxx;// this.arrow.getX() + MathUtil.lengthDirX( i, this.arrow.angle );
                this.laser.points[1].y =yyy;// this.arrow.getY() + MathUtil.lengthDirY( i, this.arrow.angle );


            //#ARROW SHOTTER CODE IN MOUSE EVENT

            //#BULLET MOVEMENT
            this.bulletSprite.move();

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

            this.HUD.render(ctx);
            this.arrow.render(ctx);
            this.arrowShooter.render(ctx);
            this.bulletSprite.render(ctx);
            this.redSprite.render(ctx);
            this.blueSprite.render(ctx);
            this.laser.render(ctx);
            this.blueLine.render(ctx);

            break;
        }//

    }//

    async loadImages(): Promise<void>
    {
        let sqrImage =  await ImageUtil.getImage("/assets/sqr.png").then(img=>img);

        let arrowImage =  await ImageUtil.getImage("/assets/arrow.png").then(img=>img);

        let bulletImage =  await ImageUtil.getImage("/assets/bullet.png").then(img=>img);
        
        let circleImage =  await ImageUtil.getImage("/assets/circle.png").then(img=>img);

        // let orangeArrowImage =  await ImageUtil.getImage("/assets/orangeArrow.png").then(img=>img);
        
        this.imageMap.set( "sqrImage", sqrImage );
        this.imageMap.set( "arrowImage", arrowImage );
        this.imageMap.set( "bulletImage", bulletImage );
        this.imageMap.set( "circleImage", circleImage );
        // this.imageMap.set( "orangeArrow", orangeArrowImage );

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
             this.redSprite.moveX(-3)
            break;
            
            case 68: //D
            this.redSprite.moveX(3)
            break;
            
            case 83: //S
             this.redSprite.moveY(3)
            break;
            
            case 87: //W
            this.redSprite.moveY(-3)
            break;

            case 32: //SPACE
            //#SHOOT BULLET
            this.bulletSprite.visible=true;
            this.bulletSprite.setPosition( this.arrowShooter.getX() + this.arrowShooter.w/2, this.arrowShooter.getY() + this.arrowShooter.h/2);
            SpriteUtil.moveToAngle(this.bulletSprite, this.arrowShooter.angle,3,false);
            break;
        }//

    }//


    mouseMove( event:MouseEvent )
    {
        let boundingRect = GameManager.getInstance().canvas.getBoundingClientRect();

        let eX = event.clientX - boundingRect.left;
        let eY = event.clientY - boundingRect.top;

        // console.log("moving mouse")
        //#ARROR SHOOTER will be changing its angle to mouse X & Y position
        // getting pointer angle every time is moved and making the arrow face that direction
        this.arrowShooter.angle = SpriteUtil.getAngle(this.arrowShooter, eX, eY);

        console.log(` x:${eX} y:${eY} - arrAngle: ${this.arrowShooter.angle}`)
    }





}//
