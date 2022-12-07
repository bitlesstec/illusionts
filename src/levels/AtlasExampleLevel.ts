
import { BaseLevel } from '../lib/level/BaseLevel.js';
import { Initiable } from '../lib/ntfc/Initiable.js';
import { AssetLoadable } from '../lib/ntfc/AssetLoadable.js';
import { AssetUtil } from "../lib/util/AssetUtil.js";
import { GameState } from '../lib/manager/GameState.js';
import { Timer } from "../lib/time/Timer.js";
import { GameManager } from '../lib/manager/GameManager.js';
import { MenuLevel } from './MenuLevel.js';
import { Sprite } from '../lib/graphic/Sprite.js';
import { AnimationLoop } from '../lib/graphic/AnimationLoop.js';
import { SpriteUtil } from '../lib/util/SpriteUtil.js';
import { Point } from '../lib/graphic/Point.js';
import { MathUtil } from '../lib/util/MathUtil.js';

export class AtlasExampleLevel extends BaseLevel
implements AssetLoadable, Initiable
{


    // changeLevelTask:Timer;
    // alphaVal:number;

    sprites:Map< string, Sprite>;


    moveLeft=false;
    moveRight=false;
    moveUp=false;
    moveDown=false;

    shipSpd:number = 3;
    posHistory:Point[]=[];
    shipMoving:boolean = false;


    SEGMENT_SIZE = 10//50 //# pixels from one segment to the next
    ANGLE = 2.5 // Base direction for the tail (radians)
    PHASE_STEP = 0.3 //How much the phase differs in each tail piece (radians)
    WOBBLE_AMOUNT = 0.5 //How much of a wobble there is (radians)
    SPEED = 4.0

    time:number = 0;
    steps:number = 0;


    wormHead:Sprite;
    wormBody:Sprite[] = [];

    constructor()
    {
        super(320,180); //16:9 screen
        this.init();
    }

    async init(): Promise<void>  {
        await this.loadImages();

        const jsonContent = await 
                AssetUtil.makeAsyncRequest("GET", "/assets/atlas/atlas.json", false).then(data=>data);

        this.sprites = 
                await AssetUtil.createSpritesFromAtlas( this.imageMap.get("atlasImg"), JSON.parse(jsonContent) );

        console.log("ATLAS LEVEL sprs")
        console.log(this.sprites.get("ship"));

        this.sprites.get("ship").setPosition(100,100);
        this.sprites.get("ship").animationLoop = AnimationLoop.NONE;
        this.sprites.get("ship").currentFrame = 1;


        //green worm segments
        this.sprites.get("enemigo11").setPosition(200,100);
        this.sprites.get("enemigo12").setPosition(200,100);
        this.sprites.get("enemigo13").setPosition(200,100);
        this.sprites.get("enemigo14").setPosition(200,100);
        this.sprites.get("enemigo15").setPosition(200,100);
        this.sprites.get("enemigo16").setPosition(200,100);

        this.sprites.get("enemigo2").setPosition(200,200);
        this.sprites.get("enemigo3").setPosition(100,100);


        this.sprites.get("shipbullet").visible = false;

        this.spriteMap = this.sprites;

        for(let i=0; i<16; i++)
        {
            this.posHistory.unshift( new Point(0,0) );
        }

        // this.sprites.set( "ene11", this.makeCopy(this.sprites.get("ship")))
        // this.sprites.set( "ene12", this.makeCopy(this.sprites.get("ship")))
        // this.sprites.set( "ene13", this.makeCopy(this.sprites.get("ship")))

        // this.sprites.get("ene11").setPosition(200,120);
        // this.sprites.get("ene12").setPosition(200,140);
        // this.sprites.get("ene13").setPosition(200,160);



        this.wormHead = new Sprite( this.imageMap.get("headWormImg"));
        this.wormHead.setPosition(200,200);

        for(let i=0; i<5; i++)
        {
            this.wormBody.push( new Sprite( this.imageMap.get("bodyWormImg") ) )
        }


        this.gameState = GameState.PLAYING;
    }

    async loadImages(): Promise<void> 
    {
        let atlasImg = await  AssetUtil.getImage("/assets/atlas/atlas.png").then(img=>img);
        this.imageMap.set( "atlasImg", atlasImg );

        let headWormImg = await  AssetUtil.getImage("/assets/atlas/greenwormhead.png").then(img=>img);
        this.imageMap.set( "headWormImg", headWormImg );

        let bodyWormImg = await  AssetUtil.getImage("/assets/atlas/greenwormbody.png").then(img=>img);
        this.imageMap.set( "bodyWormImg", bodyWormImg );
    }

    loadSounds(): void {
    }

    loadData(): void {
    }


    update(delta:number)
    {

        switch( this.gameState )
        {
            case GameState.LOADING:
                //  this.init();
            break;
            case GameState.PLAYING:

                this.time += delta;
                let xx = 150//360 - this.SEGMENT_SIZE;
                let yy = 120// - this.SEGMENT_SIZE;
    
                let targetAngle = 0;


                for( let i=1; i<=6 ;i++)
                {
                    const spr = this.spriteMap.get("enemigo1"+i);

                    spr.setPosition(xx,yy);
                    
                    let ang = this.ANGLE = this.WOBBLE_AMOUNT * Math.sin( (i-1) * this.PHASE_STEP + this.time * 1 )
                    
                    //use this angle to make a waving 
                    xx-= this.SEGMENT_SIZE * Math.cos(ang); //use -X to make segments point to left,  +X point segments to right
                    yy-= this.SEGMENT_SIZE * Math.sin(ang);
                    
                    // if( targetAngle === 0)
                    // {
                    //     targetAngle = SpriteUtil.getAngle(spr, this.spriteMap.get("ship").getX(),  this.spriteMap.get("ship").getY())
                    // }

                    //use target angle to make the worm follow the target in this case SHIP
                    // xx+= this.SEGMENT_SIZE * Math.cos(targetAngle);
                    // yy+= this.SEGMENT_SIZE * Math.sin(targetAngle);
                }
            


            if( this.shipMoving )
            // if( this.posHistory.length > 0 )
            {
                const p = this.posHistory.pop(); 
                this.sprites.get("enemigo3").spdX = p.x;
                this.sprites.get("enemigo3").spdY = p.y;    
            }

            this.sprites.get("enemigo3").move();
         

            //=====  ==  ==  ==  ======
            let nPos:Point = undefined;
            if(this.moveRight )
            {   this.shipMoving = true;
                this.spriteMap.get("ship").spdX = this.shipSpd;
                this.posHistory.unshift( new Point( this.shipSpd, 0 ) );
                // nPos = new Point( this.shipSpd, 0 );
            }
            else if( this.moveLeft )
            {
                this.shipMoving = true;
                this.spriteMap.get("ship").spdX = -this.shipSpd;
                this.posHistory.unshift( new Point( -this.shipSpd, 0 ) );
                // nPos = new Point( -this.shipSpd, 0 );
            }
            else if(this.moveUp )
            {
                this.shipMoving = true;
                this.spriteMap.get("ship").spdY = -this.shipSpd;
                this.posHistory.unshift( new Point( 0, -this.shipSpd ) );
                // nPos = new Point( 0, -this.shipSpd );
            }
            else if( this.moveDown )
            {
                this.shipMoving = true;
                this.spriteMap.get("ship").spdY = this.shipSpd;
                this.posHistory.unshift( new Point( 0, this.shipSpd ) );
                // nPos = new Point( 0, this.shipSpd );
            } 
            else{
                this.shipMoving = false;
                // this.posHistory.unshift( new Point( 0, 0 ) );
                // nPos = new Point(0, 0);
                this.spriteMap.get("enemigo3").spdX = 0;
                this.spriteMap.get("enemigo3").spdY = 0;
            }

            // if( this.posHistory.length < 100 - 1)
            // this.posHistory.unshift( new Point( 0, this.shipSpd ) );
                

            this.sprites.get("ship").move();


            
            this.updateWorm(delta);


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
                //  this.init();
            break;
            case GameState.PLAYING:


                for (const [name, sprite] of this.sprites ) { 
                   
                    sprite.render(ctx)
                    
                    // const spr:any = this.spriteMap.get(key);
                    // spr.render( ctx );
                }

                this.wormHead.render(ctx);

                this.wormBody.forEach(body=>{body.render(ctx)})
                // console.log(this.sprites.get("ene1"));
                // console.log("-----------");
               
            break;
        }

        

    }


    keyDown( event:KeyboardEvent )
    {
        this.stand();
        // this.shipMoving = true;
        switch( event.keyCode )
        {
            case 87://W
                    this.moveUp=true;
                    // this.sprites.get("ship").spdY = -this.shipSpd;
                break;
            case 83: //S
                    this.moveDown=true;
                    // this.sprites.get("ship").spdY = this.shipSpd;
               break;
            case 65: //A
                    this.moveLeft=true;
                    // this.sprites.get("ship").spdX= -this.shipSpd;
            break;
            case 68: //D
                    this.moveRight=true;
                    // this.sprites.get("ship").spdX= this.shipSpd;
            break;

            case 32: //enter
            break;
        }//

    }//


    keyUp( event:KeyboardEvent )
    {
        switch( event.keyCode )
        {
            case 87:
            case 83:
            case 65: //A
            case 68: //D
            this.stand();
             break;
            case 32: //enter
            // this.androidPunch = false;
            break;
        }//

    }//


    stand()
    {
        // this.shipMoving = false;
        this.moveLeft=false;
        this.moveRight=false;
        this.moveUp=false;
        this.moveDown=false;

        this.sprites.get("ship").spdX=0;
        this.sprites.get("ship").spdY=0;
    }


    updateWorm(del:number)
    {
        //uncomment this to make the head follow ship
            // this.wormHead.setPosition(
            //     MathUtil.lerp( this.wormHead.getX(), this.spriteMap.get("ship").getX(), 0.5 * del ),
            //     MathUtil.lerp( this.wormHead.getY(), this.spriteMap.get("ship").getY(), 0.5 * del )
            // )
        

            //uncomment this to make head move top left
            this.wormHead.move( -1, -1);

            // let xxx = this.wormHead.getX();
            // let yyy = this.wormHead.getY();

            for( let i=0; i < this.wormBody.length ;i++ )
            {

                const body = this.wormBody[i];

                if( i === 0 )
                {
                    //follow the head of the worm
                    body.setPosition(
                        MathUtil.lerp( body.getX(), this.wormHead.getX(), 0.08 ),
                        MathUtil.lerp( body.getY(), this.wormHead.getY(), 0.08  )
                    )
                }
                else{
                    body.setPosition(
                        MathUtil.lerp( body.getX(), this.wormBody[i-1].getX(), 0.08 ),
                        MathUtil.lerp( body.getY(), this.wormBody[i-1].getY(), 0.08 )
                    )
                }
                
            }

    }


}