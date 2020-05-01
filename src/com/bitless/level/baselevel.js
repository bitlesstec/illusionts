import { GameState } from "../manager/gamestate.js";
import { Camera } from "../camera/camera.js";
/**
 * this class will represent a level in the game, will
 * contain sprites for player, enemies and other objects, background
 * images, etc.
 */
// export abstract 
export class BaseLevel {
    constructor(levelWidht, levelHeight, viewWidth, viewHeight) {
        this.gameState = GameState.LOADING;
        this.imageMap = new Map();
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
