
import { Sprite } from '../lib/graphic/Sprite.js';
import { BaseLevel } from '../lib/level/BaseLevel.js';
import { GameManager } from '../lib/manager/GameManager.js';
import { GameState } from '../lib/manager/GameState.js';
import { AssetLoadable } from '../lib/ntfc/AssetLoadable.js';
//import axios from 'axios';


/**
 * this is the hello world example, if this works and
 * you can see "hello world" in your page, you have all
 * set...
 */
export class SampleLevel extends BaseLevel
                        implements AssetLoadable
{
    circleSprite:Sprite;

    constructor()
    {
        //setting level width and height
        super( 640, 480 );
        this.loadImages();
        this.loadSounds();
       
        //create circle sprite instance
        this.circleSprite =  new Sprite( this.imageMap.get( "circleImage" ) );
        this.circleSprite.setPosition( 400, 100);
        GameManager.getInstance().localStorage.setItem( "gamecode", "ASDASD");
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
                if( this.isLoadComplete )
                {
                    this.audioManager.play( "bgmusic" );
                    this.gameState=GameState.PLAYING;
                }
                console.log( "game is in LOADING state" );
            break;
            case GameState.PLAYING:
                console.log( "game is in PLAYING state" );
            break;
        }
    }


    /**
     * function used to display sprites, words, images, shapes, etc in screen
     * @param ctx this is the context retrieved from html canvas element 
     */
    render( ctx:CanvasRenderingContext2D)
    {
        //set background to black color
        ctx.fillStyle = "#000";
        ctx.fillRect( 0, 0, this.levelWidth, this.levelHeight );

        //set white color and print hello word in screen at 20, 20
        ctx.fillStyle = "#FFF";
        ctx.fillText( "Hello World" ,20,20);

        //this will render the sprice in the screen
        this.circleSprite.render(ctx);
    }

    /**
     * this function load the images before they can be used
     */
    loadImages(): void {
       
        let circleImage =  new Image();
        circleImage.src = "/assets/circle.png";

        this.imageMap.set( "circleImage", circleImage );
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