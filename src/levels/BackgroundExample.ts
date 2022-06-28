import { Background } from "../lib/graphic/Background.js";
import { BaseLevel } from "../lib/level/BaseLevel.js";
import { GameState } from "../lib/manager/GameState.js";
import { AssetLoadable } from "../lib/ntfc/AssetLoadable.js";
import { Initiable } from "../lib/ntfc/Initiable.js";
import { AssetUtil } from "../lib/util/AssetUtil.js";



export class BackgroundExample  extends BaseLevel implements Initiable, AssetLoadable
{

    bgColor:Background;
    bg:Background;
    // bgMiddle:Background;
    // bgFront:Background;


    constructor()
    {
        super(2048,288,512,288);
        this.init();
    }


   async loadImages(): Promise<void> {

        let bgBackImg = await AssetUtil.getImage("/assets/BackgroundExample/fg1.png").then(img=>img);
        this.imageMap.set("bgBackImg", bgBackImg);

        // let bgMiddleImg = await AssetUtil.getImage("/assets/parallax/parallax-forest-middle-trees.png").then(img=>img);
        // this.imageMap.set("bgMiddleImg", bgMiddleImg);

        // let bgFrontImg = await AssetUtil.getImage("/assets/parallax/parallax-forest-front-trees.png").then(img=>img);
        // this.imageMap.set("bgFrontImg", bgFrontImg);

    }



    loadSounds(): void {
    }
    loadData(): void {
    }


    async init(): Promise<void> 
    {

        await this.loadImages();

        // this.bgColor = new Background();
        this.bg = new Background( this.imageMap.get("bgBackImg") );

        this.bg.setFillOnX( this.levelWidth );
        this.bg.setY( this.levelHeight-this.bg.h );

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
            
            // this.bg.scrollX(1, 160);
            // this.bgMiddle.scrollX(2, 160);
            // this.bgFront.scrollX(3, 160);
            console.log("playing")
            this.camera.moveX( 4 * delta );

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

                
                ctx.save();
                ctx.translate(this.camera.x, this.camera.y);

                    ctx.fillStyle = "#fce0a8";
                    ctx.fillRect( this.camera.viewX, 0, this.levelWidth, this.levelHeight );
                    this.bg.render(ctx);
                    

                ctx.restore();
            
            break;
        }
    }


}