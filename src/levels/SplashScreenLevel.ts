
import { BaseLevel } from '../lib/level/BaseLevel.js';
import { Initiable } from '../lib/ntfc/Initiable.js';
import { AssetLoadable } from '../lib/ntfc/AssetLoadable.js';
import { AssetUtil } from "../lib/util/AssetUtil.js";
import { GameState } from '../lib/manager/GameState.js';
import { Timer } from "../lib/time/Timer.js";
import { GameManager } from '../lib/manager/GameManager.js';
import { SampleLevel } from './SampleLevel.js';

export class SplashScreenLevel extends BaseLevel
implements AssetLoadable, Initiable
{


    changeLevelTask:Timer;
    alphaVal:number;


    constructor()
    {
        super(640,480);
        this.init();
    }

    async init(): Promise<void>  {
        await this.loadImages();

        this.changeLevelTask = new Timer();
        this.changeLevelTask.setCounter(200);

        this.alphaVal = 0;

        this.gameState = GameState.PLAYING;
    }

    async loadImages(): Promise<void> 
    {
        let splashImage = await  AssetUtil.getImage("/assets/splash/BitlessGamesLogo.png").then(img=>img);
        this.imageMap.set( "splashImage", splashImage );
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
                 this.init();
            break;
            case GameState.PLAYING:
                this.changeLevelTask.process( ()=>
                {
                    GameManager.getInstance().loadLevel( new SampleLevel() );
                });
            break;
        }

    }

    

    render( ctx:CanvasRenderingContext2D)
    {

        ctx.fillStyle = "#000";
        ctx.fillRect(0,0, this.levelWidth, this.levelHeight)

        ctx.save();
            if( this.alphaVal < 1)
                this.alphaVal+= 0.01;

        switch( this.gameState )
        {
            case GameState.LOADING:
            break;
            case GameState.PLAYING:
                
            

            ctx.globalAlpha = this.alphaVal;
            ctx.drawImage( this.imageMap.get( "splashImage" ),this.levelWidth/2 - this.imageMap.get( "splashImage" ).width/2, this.levelHeight/2 - this.imageMap.get( "splashImage" ).height/2 );
            ctx.restore();
            break;
        }

    }




}