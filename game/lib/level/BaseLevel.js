import { GameState } from "../manager/GameState.js";
import { Camera } from "../camera/Camera.js";
/**
 * this class will represent a level in the game, will
 * contain sprites for player, enemies and other objects, background
 * images, etc.
 */
export class BaseLevel {
    constructor(levelWidht, levelHeight, viewWidth, viewHeight) {
        this.gameState = GameState.LOADING;
        this.imageMap = new Map();
        this.spriteList = [];
        this.levelWidth = levelWidht;
        this.levelHeight = levelHeight;
        if (viewWidth !== undefined && viewHeight !== undefined)
            this.camera = new Camera(levelWidht, levelHeight, viewWidth, viewHeight);
        else
            this.camera = new Camera(levelWidht, levelHeight);
    } //
    render(ctx) { }
    update(delta) { }
    //Input Events, all this are eventListeners attached to canvas
    //@note:if below lines are commented they will cause an issue with GameManager.loadLevel function
    touchStart(event) { }
    touchMove(event) { }
    touchEnd(event) { }
    touchLeave(event) { }
    touchCancel(event) { }
    mouseDown(event) { }
    mouseUp(event) { }
    mouseMove(event) { }
    mouseOut(event) { }
    mouseOver(event) { }
    keyDown(event) { }
    keyUp(event) { }
} //
