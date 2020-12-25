import { AssetLoadable } from "../lib/ntfc/AssetLoadable.js";
import { GameState } from "../lib/manager/GameState.js";
import { BaseLevel } from "../lib/level/BaseLevel.js";
import { TextSprite } from "../lib/graphic/TextSprite.js";
import { Sprite } from "../lib/graphic/Sprite.js";
import { AnimationLoop } from "../lib/graphic/AnimationLoop.js";
import { LineSprite } from "../lib/graphic/LineSprite.js";
import { CollisionUtil } from "../lib/util/CollisionUtil.js";
import { MathUtil } from "../lib/util/MathUtil.js";




export class CollisionLevel extends BaseLevel
                            implements AssetLoadable
{


    HUD:TextSprite;
    arrow:Sprite;
    redSprite:Sprite;
    blueSprite:Sprite;
    laser:LineSprite;
    blueLine:LineSprite;


    lineLenght = 300;


    constructor()
    {
        super( 640, 480 );

        this.loadImages();

        this.HUD =  new TextSprite( "Level HUD" );
        this.HUD.setPosition( this.levelWidth / 2, 30 );

        this.arrow = new Sprite ( this.imageMap.get( "arrowImage" ) );
        this.arrow.setPosition( this.levelWidth/2, this.levelHeight/2);

        this.redSprite =  new Sprite( this.imageMap.get( "sqrImage" ) )
        this.redSprite.setPosition( 50, 100 );

        this.blueSprite =  new Sprite( this.imageMap.get( "sqrImage2" ),32,32 )
        this.blueSprite.animationLoop = AnimationLoop.NONE;
        this.blueSprite.currentFrame = 1;
        this.blueSprite.setPosition( 200, 100 );

        //laser will change then spinning
        this.laser = new LineSprite( 0, 0, 10,10);
        this.laser.color="#F00";

        this.blueLine = new LineSprite( 20, 80, 400, 80 );
        this.blueLine.color="blue";
        this.blueLine.lineWidth = 5;

        this.spriteList.push( this.HUD );
        this.spriteList.push( this.arrow );
        this.spriteList.push( this.redSprite );
        this.spriteList.push( this.blueSprite );
        this.spriteList.push( this.laser );
        this.spriteList.push( this.blueLine );
        
        console.log( "size: "+this.spriteList.length );
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
                
                // updating laser
                this.laser.x = this.arrow.x + this.arrow.w/2;
                this.laser.y = this.arrow.y + this.arrow.h/2;

                let xxx:number=0, yyy:number=0;//, lineLenght:number=100;
                
                let i = 1;
                for( ; i < this.lineLenght &&
                    !CollisionUtil.getInstance().spritePointCollision( xxx, yyy, this.blueSprite )  ; 
                    i++ )
                {
                    //there var are used for spritePointCollisio
                    xxx = this.arrow.x + MathUtil.lengthDirX( i, this.arrow.angle );
                    yyy = this.arrow.y + MathUtil.lengthDirY( i, this.arrow.angle );
                    // console.log(` ${xxx} - ${yyy}`)
                    // console.log(`length: ${i} laser: ${this.laser.w} - ${this.laser.h}`)
                }
           

                this.laser.w = this.arrow.x + MathUtil.lengthDirX( i, this.arrow.angle );
                this.laser.h = this.arrow.y + MathUtil.lengthDirY( i, this.arrow.angle );

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
            
            // this.redSprite.render( ctx)
            // this.blueSprite.render(ctx);
            // this.HUD.render( ctx );

            // this.drawLaser( ctx );
                
            break;
        }//

    }//


    drawLaser( ctx:CanvasRenderingContext2D )
    {

        ctx.strokeStyle = "green";
        ctx.lineWidth = 2;

        let xpos = this.arrow.x;
        let ypos = this.arrow.y;

        let xxx = 0, yyy = 0;
        
        let i = 1;
        for( ; i < this.lineLenght &&
                    !CollisionUtil.getInstance().spritePointCollision( xxx, yyy, this.blueSprite ) ; 
                    i++ )
                {

                   xxx = this.arrow.x + MathUtil.lengthDirX( i, this.arrow.angle );
                   yyy = this.arrow.y + MathUtil.lengthDirY( i, this.arrow.angle );
                //     // console.log(` ${xxx} - ${yyy}`)
                //     console.log(`length: ${i} laser: ${this.laser.w} - ${this.laser.h}`)
                }

        ctx.beginPath();
        ctx.moveTo( this.arrow.x + this.arrow.w/2, this.arrow.y + this.arrow.h/2 );
        ctx.lineTo( this.arrow.x + MathUtil.lengthDirX( i, this.arrow.angle ) 
                    ,this.arrow.y + MathUtil.lengthDirY( i, this.arrow.angle ) );
        ctx.stroke();

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