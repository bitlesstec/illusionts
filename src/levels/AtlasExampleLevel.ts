
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

export class AtlasExampleLevel extends BaseLevel
implements AssetLoadable, Initiable
{


    // changeLevelTask:Timer;
    // alphaVal:number;

    sprites:Map< string, Sprite>;

    constructor()
    {
        super(640,360); //16:9 screen
        this.init();
    }

    async init(): Promise<void>  {
        await this.loadImages();

        const jsonContent = await 
                AssetUtil.makeAsyncRequest("GET", "/assets/atlas/atlas2.json", false).then(data=>data);

        this.sprites = 
                await AssetUtil.createSpritesFromAtlas( this.imageMap.get("atlasImg"), JSON.parse( jsonContent) );

        console.log("ATLAS LEVEL sprs")
        console.log(this.sprites.get("ship"));

        this.sprites.get("ship").setPosition(100,100);
        this.sprites.get("ship").animationLoop = AnimationLoop.NONE;


        this.sprites.get("ene1").setPosition(200,100);
        this.sprites.get("ene2").setPosition(200,200);
        this.sprites.get("ene3").setPosition(200,300);
        
        this.sprites.get("shipbullet").visible = false;


        this.gameState = GameState.PLAYING;
    }

    async loadImages(): Promise<void> 
    {
        let atlasImg = await  AssetUtil.getImage("/assets/atlas/atlas2.png").then(img=>img);
        this.imageMap.set( "atlasImg", atlasImg );
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


                for (const [key, value] of this.sprites ) { 
                   
                    value.render(ctx)
                    
                    // const spr:any = this.spriteMap.get(key);
                    // spr.render( ctx );
                }
                console.log(this.sprites.get("ene1"));
                console.log("-----------");
               
            break;
        }

        

    }




}