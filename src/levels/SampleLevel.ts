import { BaseLevel } from "../lib/level/BaseLevel.js";
import { GameState } from "../lib/manager/GameState.js";
import { Initiable } from "../lib/ntfc/Initiable.js";


export class SampleLevel extends BaseLevel implements Initiable
{

    constructor()
    {
<<<<<<< HEAD
        super( 640, 480);
        this.init();
=======
        //setting level width and height
        super( 640, 480 );
        // this.init(); //init can be also here instead GAMESTATE.LOADING
>>>>>>> examples
    }

    init(): void {
        this.gameState = GameState.PLAYING;
    }

    render(ctx:CanvasRenderingContext2D)
    {

        switch( this.gameState )
        {
            case GameState.LOADING:
                break;
            case GameState.PLAYING:

                // set black background color and fill canvas with it
                ctx.fillStyle = "#000";
                ctx.fillRect( 0, 0, this.levelWidth, this.levelHeight );

                //set white color and print hello word in screen at 20, 20
                ctx.fillStyle = "#FFF";
                ctx.fillText( "Hello World!" ,20,20);
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
>>>>>>> examples
    }

}