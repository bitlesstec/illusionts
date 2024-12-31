
import { BaseLevel } from '../lib/level/BaseLevel';
import { Initiable } from '../lib/ntfc/Initiable';
import { AssetLoadable } from '../lib/ntfc/AssetLoadable';
import { AssetUtil } from "../lib/util/AssetUtil";
import { GameState } from '../lib/game/GameState';
import { Timer } from "../lib/time/Timer";
import { Game } from '../lib/game/Game';
import { SampleLevel } from './SampleLevel';

export class SplashScreenLevel extends BaseLevel
implements AssetLoadable, Initiable
{


    changeLevelTask:Timer;
    alphaVal:number;
    imageMap: Map<string, HTMLImageElement>;

    constructor()
    {
        super(640,480);
        this.imageMap = new Map<string, HTMLImageElement>();
        this.init();
    }

    async init(): Promise<void>  {
        await this.loadImages();

        this.changeLevelTask = new Timer();
        this.changeLevelTask.setCounter(200);

        this.changeLevelTask.callback = ()=>
            {
                Game.getInstance().loadLevel( new SampleLevel() );
            }

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
                this.changeLevelTask.update( );
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