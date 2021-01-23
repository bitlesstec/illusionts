
import { Sprite } from '../lib/graphic/Sprite.js';
import { BaseLevel } from '../lib/level/BaseLevel.js';
import { GameManager } from '../lib/manager/GameManager.js';
import { GameState } from '../lib/manager/GameState.js';
import { AssetLoadable } from '../lib/ntfc/AssetLoadable.js';
import { CircleShape } from '../lib/graphic/shape/CircleShape.js';
import { ImageUtil } from '../lib/util/ImageUtil.js';
import { Initiable } from '../lib/ntfc/Initiable.js';
import { Point } from '../lib/graphic/Point.js';
import { LineShape } from '../lib/graphic/shape/LineShape.js';
import { PolygonShape } from '../lib/graphic/shape/PolygonShape.js';
import { ImageMeasures } from '../lib/graphic/ImageMeasures.js';
//import axios from 'axios';


/**
 * this is the hello world example, if this works and
 * you can see "hello world" in your page, you have all
 * set...
 */
export class SampleLevel extends BaseLevel
                         implements AssetLoadable, Initiable
{
    circle:Sprite;
    circleShape:CircleShape;
    lineShape:LineShape;
    triangle:PolygonShape;


    knightSprite:Sprite;

    angleCounter:number=0;

    constructor()
    {
       
        //setting level width and height
        super( 640, 480 );
        // this.init(); //init can be also here instead GAMESTATE.LOADING
    }

    async init()
    {
        console.log(this.gameState);
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

        this.triangle = new PolygonShape([new Point(200,200), new Point(400,200), new Point(100,160)]);
        this.triangle.fillColor="red";
        this.triangle.strokeColor="green";
        this.triangle.strokeLineWidth=3;
        this.triangle.displayOutline=true;


        // knightMeasures:ImageMeasures = 
        // {srcX:0, srcY:0, w:16, h:16, frames:3}



        this.knightSprite = new Sprite(this.imageMap.get( "tileImage" ),{srcX:0, srcY:0, w:16, h:16, frames:3});
        this.knightSprite.setPosition( 20, 200 );




        this.gameState=GameState.PLAYING;
        console.log(GameState.PLAYING);
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
                console.log( "game is in PLAYING state: " );
            let cnt = this.angleCounter++;
            this.circleShape.endAngle= cnt;
            if(this.angleCounter >= 360) this.angleCounter = 0;
            console.log( `endAngle: ${this.circleShape.endAngle} - angleCont: ${this.angleCounter}`);

            this.knightSprite.updateAnimation();

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

                //set white color and print hello word in screen at 20, 20
                ctx.fillStyle = "#FFF";
                ctx.fillText( "Hello World" ,20,20);

                //this will render the sprice in the screen
                this.circle.render(ctx);

                this.circleShape.render(ctx);

                this.lineShape.render(ctx);

                this.triangle.render(ctx);


                this.knightSprite.render(ctx);
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

        let circleImage = await ImageUtil.getImage("/assets/circle.png").then(img=>img);
        this.imageMap.set( "circleImage", circleImage );

        
        let tileImage = await ImageUtil.getImage("/assets/mazegametiles.png").then(img=>img);
        this.imageMap.set( "tileImage", tileImage );
    }

    loadSounds(): void {
        
       var soundList = new Map<string,HTMLAudioElement>();

       var bgmusic = new Audio();
       bgmusic.src = "/assets/music/tomorrow.mp3";

       var sfxSound = new Audio();
       sfxSound.src = "/assets/music/snd_gun.wav";

       soundList.set( "bgmusic", bgmusic );
       soundList.set( "sfxsound", sfxSound );

       this.audioManager.loadSounds( soundList );
    }

    loadData(): void {
        throw new Error('Method not implemented.');
    }

    isLoadComplete(): boolean {
        let loadedImgs = 0;
        let loadedSounds = 0;

        for ( let img of this.imageMap.values() ) 
        {
            if( img.complete ) loadedImgs++;
        }

        for( let snd of this.audioManager.audioList.values() )
        {
            if( snd.readyState )loadedSounds++;
        }   

        return this.imageMap.size === loadedImgs && this.audioManager.audioList.size === loadedSounds;
    }


    keyUp( event:KeyboardEvent )
    {
        switch( event.keyCode )
        {
            // case 65: //A
            case 32: //SPACE
            this.audioManager.playSfx( "sfxsound" );
            break;
        }//
    }


}//