import { Background } from "../lib/graphic/Background.js";
import { BaseLevel } from "../lib/level/BaseLevel.js";
import { GameState } from "../lib/manager/GameState.js";
import { AssetLoadable } from "../lib/ntfc/AssetLoadable.js";
import { Initiable } from "../lib/ntfc/Initiable.js";
import { AssetUtil } from "../lib/util/AssetUtil.js";


/**
 * this shows a simple parallax example with backgrounds
 * note: the image should be the same size of the level width or level viewWidth
 */
export class ParallaxLevel extends BaseLevel implements Initiable, AssetLoadable
{

    bgBack:Background;
    bgMiddle:Background;
    bgFront:Background;

    imageMap: Map<string, HTMLImageElement>;

    constructor()
    {
        super(272, 160);
        this.imageMap = new Map<string, HTMLImageElement>();
        
        this.init();
    }


   async loadImages(): Promise<void> {

        let bgBackImg = await AssetUtil.getImage("/assets/parallax/parallax-forest-back-trees.png").then(img=>img);
        this.imageMap.set("bgBackImg", bgBackImg);

        let bgMiddleImg = await AssetUtil.getImage("/assets/parallax/parallax-forest-middle-trees.png").then(img=>img);
        this.imageMap.set("bgMiddleImg", bgMiddleImg);

        let bgFrontImg = await AssetUtil.getImage("/assets/parallax/parallax-forest-front-trees.png").then(img=>img);
        this.imageMap.set("bgFrontImg", bgFrontImg);

    }



    loadSounds(): void {
    }
    loadData(): void {
    }


    async init(): Promise<void> 
    {

        await this.loadImages();

        this.bgBack = new Background( this.imageMap.get("bgBackImg") );
        this.bgMiddle = new Background( this.imageMap.get("bgMiddleImg") );
        this.bgFront = new Background( this.imageMap.get("bgFrontImg") );

        //after you load all necesary set game state to playing
        //cause render methods is displaying the menu in this state
        this.gameState = GameState.PLAYING;
    }


    update( delta:number )
    {
        switch( this.gameState )
        {
            case GameState.LOADING:
            break;

            case GameState.PLAYING:
            
            this.bgBack.scrollX(1, 160);
            this.bgMiddle.scrollX(2, 160);
            this.bgFront.scrollX(3, 160);

            break;
        }
    }

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

                this.bgBack.render(ctx);
                this.bgMiddle.render(ctx);
                this.bgFront.render(ctx);

            break;
        }
    }


}