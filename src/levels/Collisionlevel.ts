

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




export class CollisionLevel extends BaseLevel
                            implements AssetLoadable, Initiable
{


    HUD:TextSprite;
    arrow:Sprite;
    redSprite:Sprite;
    blueSprite:Sprite;
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

        this.HUD =  new TextSprite( "Level HUD" );
        this.HUD.setPosition( this.levelWidth / 2, 30 );

        this.arrow = new Sprite ( this.imageMap.get( "arrowImage" ) );
        this.arrow.setPosition( this.levelWidth/2, this.levelHeight/2);

        this.redSprite =  new Sprite( this.imageMap.get( "sqrImage" ) )
        this.redSprite.setPosition( 50, 100 );

        this.blueSprite =  new Sprite( this.imageMap.get( "sqrImage" ) )
        this.blueSprite.animationLoop = AnimationLoop.NONE;
        this.blueSprite.currentFrame = 1;
        this.blueSprite.setPosition( 200, 100 );

        //laser will change then spinning
        this.laser = new LineShape( new Point(0, 0) , new Point(10,10) );
        this.laser.strokeColor="#F00";

        this.blueLine = new LineShape(  new Point(20, 80), new Point(400, 80) );
        this.blueLine.strokeColor="blue";
        this.blueLine.strokeLineWidth = 5;

        this.spriteList.push( this.HUD );
        this.spriteList.push( this.arrow );
        this.spriteList.push( this.redSprite );
        this.spriteList.push( this.blueSprite );
        this.spriteList.push( this.laser );
        this.spriteList.push( this.blueLine );
        
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
                this.arrow.angle += ( 1 * delta );
                // console.log( "DELTA: "+this.arrow.angle );
                
                // updating laser
                this.laser.setX( this.arrow.getX() + this.arrow.w/2 ) ;
                this.laser.setY( this.arrow.getY() + this.arrow.h/2 );

                let xxx:number=0, yyy:number=0;//, lineLenght:number=100;
                
                let i = 1;
                for( ; i < this.lineLenght &&
                    !CollisionUtil.getInstance().spritePointCollision( xxx, yyy, this.blueSprite )  ; 
                    i++ )
                {
                    //there var are used for spritePointCollisio
                    xxx = this.arrow.setX( this.arrow.getX() + MathUtil.lengthDirX( i, this.arrow.angle ) );
                    yyy = this.arrow.setY( this.arrow.getY() + MathUtil.lengthDirY( i, this.arrow.angle ) ) ;
                }
           

                this.laser.setX( this.arrow.getX() + MathUtil.lengthDirX( i, this.arrow.angle ) );
                this.laser.setX( this.arrow.getX() + MathUtil.lengthDirY( i, this.arrow.angle ) );

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
            
            this.redSprite.render( ctx)
            this.blueSprite.render(ctx);
            this.HUD.render( ctx );

            this.drawLaser( ctx );
                
            break;
        }//

    }//


    drawLaser( ctx:CanvasRenderingContext2D )
    {

        ctx.strokeStyle = "green";
        ctx.lineWidth = 2;

        let xpos = this.arrow.getX();
        let ypos = this.arrow.getY();

        let xxx = 0, yyy = 0;
        
        let i = 1;
        for( ; i < this.lineLenght &&
                    !CollisionUtil.getInstance().spritePointCollision( xxx, yyy, this.blueSprite ) ; 
                    i++ )
                {

                   xxx = this.arrow.getX() + MathUtil.lengthDirX( i, this.arrow.angle );
                   yyy = this.arrow.getY() + MathUtil.lengthDirY( i, this.arrow.angle );
                //     // console.log(` ${xxx} - ${yyy}`)
                //     console.log(`length: ${i} laser: ${this.laser.w} - ${this.laser.h}`)
                }

        ctx.beginPath();
        ctx.moveTo( this.arrow.getX() + this.arrow.w/2, this.arrow.getY() + this.arrow.h/2 );
        ctx.lineTo( this.arrow.getX() + MathUtil.lengthDirX( i, this.arrow.angle ) 
                    ,this.arrow.getY()+ MathUtil.lengthDirY( i, this.arrow.angle ) );
        ctx.stroke();

    }//

    async loadImages(): Promise<void>
    {
        let sqrImage =  await ImageUtil.getImage("/assets/sqr.png").then(img=>img);

        // let sqrImage2 =  await ImageUtil.getImage("/assets/sqr.png").then(img=>img);
        // sqrImage2.src = "/assets/sqr.png";

        let arrowImage =  await ImageUtil.getImage("/assets/arrow.png").then(img=>img);

        let bulletImage =  await ImageUtil.getImage("/assets/bullet.png").then(img=>img);
        
        let circleImage =  await ImageUtil.getImage("/assets/circle.png").then(img=>img);

        this.imageMap.set( "sqrImage", sqrImage );
        // this.imageMap.set( "sqrImage2", sqrImage2 );
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
        }//

    }//




}//
