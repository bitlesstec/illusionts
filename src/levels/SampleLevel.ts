
import { Sprite } from '../lib/graphic/Sprite.js';
import { BaseLevel } from '../lib/level/BaseLevel.js';
import { GameManager } from '../lib/manager/GameManager.js';
import { GameState } from '../lib/manager/GameState.js';
import { AssetLoadable } from '../lib/ntfc/AssetLoadable.js';
import { CircleShape } from '../lib/graphic/shape/CircleShape.js';
import { AssetUtil } from '../lib/util/AssetUtil.js';
import { Initiable } from '../lib/ntfc/Initiable.js';
import { Point } from '../lib/graphic/Point.js';
import { LineShape } from '../lib/graphic/shape/LineShape.js';
import { PolygonShape } from '../lib/graphic/shape/PolygonShape.js';
import { ImageMeasures } from '../lib/graphic/ImageMeasures.js';
import { CollisionUtil } from '../lib/util/CollisionUtil.js';
import { TileUtil } from '../lib/util/TileUtil.js';
import { TileMap } from './TileMap.js';
import { Tile } from '../lib/graphic/Tile.js';
import { HUDSprite } from '../lib/graphic/HUDSprite.js';
import { Background } from '../lib/graphic/Background.js';


/**
 * this is the hello world example, if this works and
 * you can see "hello world" in your page, you have all
 * set...
 */
export class SampleLevel extends BaseLevel
                         implements AssetLoadable, Initiable
{

    bg:Background;


    circle:Sprite;
    circleShape:CircleShape;
    lineShape:LineShape;
    lineShape2:LineShape;
    triangle:PolygonShape;

    knightSprite:Sprite;

    animKnight:Sprite;

    angleCounter:number=0;

    collisionUtil:CollisionUtil;

    tiles:Tile[];

    score:HUDSprite;
    damageTxt:HUDSprite;

    userName:string;

    constructor()
    {
        //setting level width and height
        super( 640, 480 );
        // this.init(); //init can be also here instead GAMESTATE.LOADING
    }

    async init()
    {
        this.userName = "";
        await this.loadImages();
        this.loadSounds();
       
        //create circle sprite instance
        this.circle =  new Sprite( this.imageMap.get( "circleImage" ) );
        this.circle.setPosition( 400, 100);
        GameManager.getInstance().localStorage.setItem( "gamecode", "ASDASD");

        this.circleShape = new CircleShape( new Point(100,200), 50, "red" );
        this.circleShape.endAngle=0;
        this.circleShape.displayOutline=true;

        this.lineShape = new LineShape(new Point(30,30), new Point(100,70) );

        this.lineShape2 = new LineShape(new Point(30,100), new Point(100,100) );

        this.triangle = new PolygonShape([new Point(200,200), new Point(400,200), new Point(100,160)]);
        this.triangle.fillColor="red";
        this.triangle.strokeColor="green";
        this.triangle.strokeLineWidth=3;
        this.triangle.displayOutline=true;

        this.knightSprite = new Sprite(this.imageMap.get( "tileImage" ),{srcX:0, srcY:0, w:16, h:16, frames:3});
        this.knightSprite.setPosition( 20, 200 );

        this.animKnight = new Sprite(this.imageMap.get( "tileImage" ),{srcX:0, srcY:0, w:16, h:16, frames:3});
        this.animKnight.setPosition(20, 150);
        this.animKnight.setAnimationFrames(4,6);

        this.collisionUtil = CollisionUtil.getInstance();

        this.tiles = TileUtil.parse( TileMap.getSampleLevelMap(), 40,22, 16,16,16 );

        this.score = new HUDSprite("Lives x", 3);
        this.score.setPosition(this.levelWidth - 100, 20);

        this.damageTxt = new HUDSprite("",0);
        this.damageTxt.setPosition(this.levelWidth/2, this.levelHeight/2);
        this.damageTxt.setExpiration(100);

        this.bg = new Background( this.imageMap.get("starbg") );

        this.gameState=GameState.PLAYING;
    }
  


    /**
    * this method is used to get the input and process
    * all updates of the game, by default the game is set
    * to LOADING state, in this example, the level will check
    * if all assets are loaded, if so, then it will change the
    * state to PLAYING where the game should be processed, 
    * in fact they are more GameState that can be used 
    * @param delta 
    */
    update( delta:number )
    {
        switch( this.gameState )
        {
            case GameState.LOADING:
                this.init();
            break;
            case GameState.PLAYING:
                // let cnt = Math.floor( ++this.angleCounter*delta);
                // console.log( "game is in PLAYING state: " );

            this.bg.scrollX( 2, 640 );    
            this.bg.scrollY( 3, 480 ); 

            let cnt = this.angleCounter++;
            this.circleShape.endAngle= cnt;
            if(this.angleCounter >= 360) this.angleCounter = 0;
            
            this.knightSprite.updateAnimation();

            this.animKnight.updateAnimation();

            //checking line collision here
            if( this.lineShape2.points[0].y > 20 )
            {
                this.lineShape2.points[0].y--;
                this.lineShape2.points[1].y--;

                //if there is a collision this will print text in console
                if(this.collisionUtil.lineCollision(this.lineShape, this.lineShape2))
                {
                    console.log("::: collision true at: "+this.lineShape2.points[0].y)
                }
            }

            //pushing damageText Up then it dissapears
            this.damageTxt.expire(()=>{ this.damageTxt.moveY(-1); });

            console.log(`userName ${this.userName}`);

            break;
        }
    }


    /**
     * function used to display sprites, words, images, shapes, etc in screen
     * @param ctx this is the context retrieved from html canvas element 
     */
    render( ctx:CanvasRenderingContext2D)
    {
        switch( this.gameState )
        {
            case GameState.LOADING:
                ctx.fillStyle = "#000";
                ctx.fillRect( 0, 0, this.levelWidth, this.levelHeight );

                //set white color and print hello word in screen at 20, 20
                ctx.fillStyle = "#FFF";
                ctx.fillText( "loading" ,this.levelWidth/2,20);
            break;
            case GameState.PLAYING:
                 //set background to black color
                ctx.fillStyle = "#000";
                ctx.fillRect( 0, 0, this.levelWidth, this.levelHeight );

                this.bg.render(ctx);

                TileUtil.renderTiles( ctx, this.imageMap.get( "tileImage" ), this.tiles );

                //set white color and print hello word in screen at 20, 20
                ctx.fillStyle = "#FFF";
                ctx.fillText( "Hello World" ,20,20);

                //this will render the sprice in the screen
                this.circle.render(ctx);

                this.circleShape.render(ctx);

                this.lineShape.render(ctx);
                this.lineShape2.render(ctx);

                this.triangle.render(ctx);

                this.knightSprite.render(ctx);

                this.animKnight.render(ctx);

                this.score.render(ctx);

                this.damageTxt.render(ctx);
            break;
        }

       
    }

    /**
     * this function load the images before they can be used
     */
    async loadImages(): Promise<void> {
       
        // let circleImage =  new Image();
        // circleImage.src = "/assets/circle.png";
        // this.imageMap.set( "circleImage", circleImage );

        let circleImage = await AssetUtil.getImage("/assets/circle.png").then(img=>img);
        this.imageMap.set( "circleImage", circleImage );

        let tileImage = await AssetUtil.getImage("/assets/mazegametiles.png").then(img=>img);
        this.imageMap.set( "tileImage", tileImage );

        let bgImage = await AssetUtil.getImage("/assets/starfield.png").then(img=>img);
        this.imageMap.set( "starbg", bgImage );
    }

    loadSounds(): void {
        
       var soundList = new Map<string,HTMLAudioElement>();

       var bgmusic = new Audio();
       bgmusic.src = "/assets/music/tomorrow.mp3";

       var sfxSound = new Audio();
       sfxSound.src = "/assets/music/snd_gun.wav";

       soundList.set( "bgmusic", bgmusic );
       soundList.set( "sfxsound", sfxSound );

    //    this.audioManager.loadSounds( soundList );
    }

    loadData(): void {
    }

    // isLoadComplete(): boolean {
    //     let loadedImgs = 0;
    //     let loadedSounds = 0;

    //     for ( let img of this.imageMap.values() ) 
    //     {
    //         if( img.complete ) loadedImgs++;
    //     }

    //     for( let snd of this.audioManager.audioList.values() )
    //     {
    //         if( snd.readyState )loadedSounds++;
    //     }   

    //     return this.imageMap.size === loadedImgs && this.audioManager.audioList.size === loadedSounds;
    // }


    keyUp( event:KeyboardEvent )
    {
        switch( event.keyCode )
        {
            case 65: //A
            this.userName = prompt("Enter User Email:");
            break;
            case 32: //SPACE
            // this.audioManager.playSfx( "sfxsound" );
            GameManager.getInstance().takeScreenshot();
            break;
        }//
    }

}//