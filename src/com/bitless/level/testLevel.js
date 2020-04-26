import { BaseLevel } from "./baselevel.js";
import { Background } from "../graphic/background.js";
import { GameState } from "../manager/gamestate.js";
import { Sprite } from "../graphic/sprite.js";
export class TestLevel extends BaseLevel {
    constructor() {
        super();
        this.step = 0;
        this.loadImages();
        //base path should be hostname
        this.background = new Background(this.imageMap.get("bgImage"));
        this.background.w = 640;
        this.background.h = 480;
        // this.ev="";
        //this.keyDown.bind( this );
        this.explosionSprite = new Sprite(this.imageMap.get("exploImage"), 24, 22);
        this.explosionSprite.setPosition(100, 100);
        this.explosionSprite.xScale = 2;
        this.explosionSprite.yScale = 2;
    } //
    update(delta) {
        switch (this.gameState) {
            case GameState.LOADING:
                // let assetLoaded :boolean = true;
                // console.log( "updating in LOADIN" );
                //     this.background.image.onload = ()=> { assetLoaded = assetLoaded && true; }
                this.step++;
                if (this.step >= 60) {
                    this.step = 0;
                    //start playing the game after all assets are loaded
                    if (this.isLoadComplete())
                        this.gameState = GameState.PLAYING;
                }
                break;
            case GameState.PLAYING:
                break;
        }
    }
    render(ctx) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 640, 480);
        ctx.fillStyle = "#FFFFFF";
        switch (this.gameState) {
            case GameState.LOADING:
                ctx.fillText("Loading... ", 640 / 2, 480 / 2);
                break;
            case GameState.PLAYING:
                //display background image
                this.background.render(ctx);
                ctx.fillText("Evento que llega: " + this.ev, 20, 20);
                //draw sprite
                this.explosionSprite.render(ctx);
                break;
        }
        // this.background.renderColor( ctx );
        // if( this.background.visible )
        //     this.background.render( ctx );
        // if( this.gameState === GameState.PLAYING )
        // {
        //     ctx.fillStyle = "#FF0000";
        //     ctx.fillText( "Evento que llega: "+this.ev ,20,20);
        //     console.log("level render executed")
        // }
    }
    /**
     * this will
     * @param event
     */
    keyDown(event) {
        this.ev = event.key + event.keyCode;
        console.log(event);
    }
    // loadImages(): void {
    // }
    // loadSounds(): void {
    // }
    // loadData(): void {
    // }
    // isLoadComplete( ):boolean
    // {
    //     let assetLoaded:boolean = true;
    //         console.log( this.background.image.complete );
    //         this.background.image.onload = ()=> { assetLoaded = assetLoaded && true; }
    //         console.log( assetLoaded )
    //     if( !assetLoaded )
    //     {
    //         console.log( "recursiving" )
    //         this.isLoadComplete( );
    //     }
    //     return assetLoaded;
    // }
    /**
     * this method will load all the images used by the sprites and backgrounds
     * is better to pull all images inside an array so we can check the loaded images
     * lenght with the current array lenght and we may know if everything was loaded
     */
    loadImages() {
        let bgImage = new Image();
        bgImage.src = "/assets/_11.jpg";
        let exploImage = new Image();
        exploImage.src = "/assets/explosion.png";
        this.imageMap.set("bgImage", bgImage);
        this.imageMap.set("exploImage", exploImage);
        //    console.log( this.imageMap.get("bgImage") );
        //    console.log( this.imageMap.get("exploImage") );
        this.imageMap.get;
    }
    loadSounds() {
    }
    loadData() {
    }
    isLoadComplete() {
        let loadedImgs = 0;
        for (let img of this.imageMap.values()) {
            if (img.complete)
                loadedImgs++;
        }
        return this.imageMap.size === loadedImgs;
    }
} //
