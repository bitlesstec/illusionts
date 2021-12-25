

import { AssetLoadable } from "../lib/ntfc/AssetLoadable.js";
import { GameState } from "../lib/manager/GameState.js";
import { BaseLevel } from "../lib/level/BaseLevel.js";
import { TextSprite } from "../lib/graphic/TextSprite.js";
import { AssetUtil } from "../lib/util/AssetUtil.js";
import { Initiable } from "../lib/ntfc/Initiable.js";
import { Mousable } from "../lib/ntfc/input/Mousable.js";



/**
 * this is an example of how to load and use sound ( Audio files )
 */
export class AudioLevel extends BaseLevel
                            implements AssetLoadable, Initiable, Mousable
{
    HUD:TextSprite;
  
    constructor()
    {
        super( 640, 480 );
        this.init();
    }//
    
    async init() {
       
        await this.loadSounds();

        this.audioManager.play("bgsound");

        this.HUD =  new TextSprite( "Audio Xample" );
        this.HUD.setPosition( 262, 30 );

        this.gameState=GameState.PLAYING;
    }



    update( delta:number )
    {

        switch( this.gameState )
        {
            case GameState.LOADING:
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

                this.HUD.render(ctx);

                ctx.fillText( "gun sfx : A", 20, 60);
                ctx.fillText( "bark sfx : S",20, 80);
                ctx.fillText( "meow sfx : W",20, 100);
            break;
        }//

    }//

    async loadImages(): Promise<void>
    {}

    async loadSounds(): Promise<void> 
    {
        let bgsound = await AssetUtil.getAudioBuffer( "/assets/music/Boss-Time-David-Ruenda.mp3" );
        this.audioManager.addSound( "bgsound", bgsound, true );

        let gunSfx = await AssetUtil.getAudioBuffer( "/assets/sfx/snd_gun.wav" );
        this.audioManager.addSound("gunSfx", gunSfx);  

        let barkSfx = await AssetUtil.getAudioBuffer( "/assets/sfx/dog.wav" );
        this.audioManager.addSound("barkSfx", barkSfx);  

        let meowSfx = await AssetUtil.getAudioBuffer( "/assets/sfx/cat.wav" );
        this.audioManager.addSound("meowSfx", meowSfx);  


    }

    loadData(): void {}


    

    // move the sprite
    keyUp( event:KeyboardEvent )
    {
        switch( event.keyCode )
        {

            case 88:
                console.log("starting bgmusic")
                this.audioManager.play("bgsound", 10);
            break;
            case 67:
                console.log("stoping bgmusic")
                this.audioManager.stop("bgsound");
            break;

            case 65: //A
            this.audioManager.play("gunSfx");
            break;
            
            case 68: //D
            
            try{
                this.audioManager.resume(); 
            }catch(e)
                {console.log("error",e)}            
            // this.audioManager.audioCtx.resume();
            break;
            
            case 83: //S
            this.audioManager.play("barkSfx");
            break;
            
            case 87: //W
            this.audioManager.play("meowSfx");
            break;

            case 32: //SPACE
            console.log("calling stop all sounds" )
            this.audioManager.stopAll();
            // if(!this.audioManager.pause)
            //     this.audioManager.resume();
            // else
            //     this.audioManager.pause();
            break;
            case 90: //z
                console.log("showing message once")
            break;



        }//

    }//

}//
