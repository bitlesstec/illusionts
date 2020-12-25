import { BaseLevel } from "../../src/com/bitless/level/baselevel.js";
import { TileUtil } from "../../src/com/bitless/util/tileutil.js";
import { GameState } from "../../src/com/bitless/manager/gamestate.js";
/**
 * this class will demonstrate the usage of the camera
 * and tilesets
 */
export class TileLevel extends BaseLevel {
    constructor() {
        super(1280, 960, 640, 480);
        this.tileMap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
        ];
        this.cols = 40;
        this.rows = 15;
        this.tileWidth = 32;
        this.tileHeight = 32;
        this.isRendering = false;
        this.loadImages();
        this.tileList = TileUtil.parse(this.tileMap, this.cols, this.rows, this.tileWidth, this.tileHeight);
    } //
    update(delta) {
        switch (this.gameState) {
            case GameState.LOADING:
                if (this.isLoadComplete())
                    this.gameState = GameState.PLAYING;
                break;
            case GameState.PLAYING:
                if (this.isRendering)
                    this.camera.moveX(2 * delta);
                break;
        } //
    } //
    render(ctx) {
        switch (this.gameState) {
            case GameState.LOADING:
                break;
            case GameState.PLAYING:
                ctx.save();
                //Math.floor is used because canvas will flicker if decimals are used
                //cause there is no 0.5 pixel width
                ctx.translate(Math.floor(this.camera.x), this.camera.y);
                //this will set a black background only on the area of the view, not
                //the whole level 
                ctx.fillStyle = "#000";
                ctx.fillRect(Math.floor(this.camera.viewX), this.camera.viewY, this.camera.viewWidth, this.camera.viewHeight);
                //render tiles
                TileUtil.renderTiles(ctx, this.imageMap.get("tileImage"), this.tileList);
                ctx.fillStyle = "#FFF";
                //@todo i have to
                //this text will be display always in the same place even if the camera/view is moving
                ctx.fillText("HUD TEXT", Math.floor(this.camera.viewX) + 20, this.camera.viewY + 100);
                ctx.restore();
                break;
        } //
    } //
    loadImages() {
        let tileImage = new Image();
        tileImage.src = "/assets/cubes.png";
        this.imageMap.set("tileImage", tileImage);
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
    } //
    keyUp(event) {
        switch (event.keyCode) {
            case 65: //A
                // this.sqrSprite.x-=3;
                break;
            case 68: //D
                // this.sqrSprite.x+=3;
                this.isRendering = true;
                // this.camera.moveX( 0.5 );
                break;
            case 83: //S
                // this.sqrSprite.y+=3;
                break;
            case 87: //W
                // this.sqrSprite.y-=3;
                break;
        } //
    }
} //
