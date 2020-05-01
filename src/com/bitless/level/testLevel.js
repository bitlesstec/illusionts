import { BaseLevel } from "./baselevel.js";
import { Background } from "../graphic/background.js";
import { GameState } from "../manager/gamestate.js";
import { Sprite } from "../graphic/sprite.js";
import { CollisionUtil } from "../util/collisionutil.js";
import { Task } from "../task/task.js";
export class TestLevel extends BaseLevel {
    constructor() {
        super(640, 480);
        this.step = 0;
        this.loadImages();
        //base path should be hostname
        this.background = new Background(this.imageMap.get("bgImage"));
        this.background.w = this.levelWidth;
        this.background.h = this.levelHeight;
        // this.ev="";
        //this.keyDown.bind( this );
        this.explosionSprite = new Sprite(this.imageMap.get("exploImage"), 24, 22);
        this.explosionSprite.setPosition(100, 100);
        //    this.explosionSprite.xScale =2;
        //    this.explosionSprite.yScale =2;
        this.sqrSprite = new Sprite(this.imageMap.get("sqrImage"));
        this.sqrSprite.setPosition(100, 200);
        this.collisionUtil = CollisionUtil.getInstance();
        this.logTask = new Task();
        this.logTask.setCounter(100);
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
                        console.log(this.explosionSprite.lastFrame);
                    this.gameState = GameState.PLAYING;
                }
                break;
            case GameState.PLAYING:
                /**
                 * this will make explosion change of position every animation end
                 */
                // if( this.explosionSprite.animationEnd )
                // {
                //     this.explosionSprite.animationEnd = false;
                //     this.explosionSprite.setPosition( 
                //         Math.random() * this.levelWidth - this.explosionSprite.w ,
                //         Math.random() * this.levelHeight - this.explosionSprite.h );
                //         this.explosionSprite.currentFrame = 0;
                // }
                //moving and check collision with sqrSprite
                let col = this.collisionUtil.spriteRectangleCollision(this.sqrSprite, this.explosionSprite);
                if (col)
                    console.log("clision: " + col);
                //this task will log some text in cosole at 100 thics
                this.logTask.process(() => { console.log("this line of text comes from a task | " + this.logTask.getCounter()); });
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
                this.sqrSprite.render(ctx);
                //to draw bounding boxes of two sprites
                //    ctx.strokeStyle = "#0F0";
                //    ctx.strokeRect( this.sqrSprite.x, this.sqrSprite.y, this.sqrSprite.w, this.sqrSprite.h );
                //    ctx.strokeRect( this.explosionSprite.x, this.explosionSprite.y, 
                //                             this.explosionSprite.w, this.explosionSprite.h );
                break;
        }
    }
    /**
     * this will
     * @param event
     */
    keyDown(event) {
        // this.ev = event.key + event.keyCode;
        // console.log(event);
        switch (event.keyCode) {
            case 65: //A
                this.sqrSprite.x -= 3;
                break;
            case 68: //D
                this.sqrSprite.x += 3;
                break;
            case 83: //S
                this.sqrSprite.y += 3;
                break;
            case 87: //W
                this.sqrSprite.y -= 3;
                break;
        } //
    }
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
        let sqrImage = new Image();
        sqrImage.src = "/assets/sqr.png";
        this.imageMap.set("bgImage", bgImage);
        this.imageMap.set("exploImage", exploImage);
        this.imageMap.set("sqrImage", sqrImage);
    }
    loadSounds() {
    }
    loadData() {
    }
    /**
     * this will check if all images were loaded, if so
     * will return true so we can change the game state to PLAYING
     */
    isLoadComplete() {
        let loadedImgs = 0;
        for (let img of this.imageMap.values()) {
            if (img.complete)
                loadedImgs++;
        }
        return this.imageMap.size === loadedImgs;
    }
} //
