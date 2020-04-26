import { GameState } from "../manager/gamestate.js";
/**
 * this class will represent a level in the game, will
 * contain sprites for player, enemies and other objects, background
 * images, etc.
 */
// export abstract 
export class BaseLevel {
    constructor() {
        this.imageMap = new Map(); //new Map();
        //@todo
        //create camera
        //actual gameState of the level, by default loading!
        this.gameState = GameState.LOADING;
    }
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
