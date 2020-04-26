import { TestLevel } from "../level/testLevel.js";
/**
 * gameManager will be responsible to initialize the game:
 * create the main thread, load the first level, update and
 * render the game, etc.
 */
class GameManager {
    // constructor( firstLevel: BaseLevel )
    constructor() {
        this.delta = 0;
        this.oldTimestamp = 0;
        this.fps = 1 / 30; //30 fps
        this.canvas = document.getElementById("canvas"); //canvas;
        this.context = this.canvas.getContext("2d");
        // this.loadLevel( firstLevel );
        // this.currentLevel = firstLevel; // new BaseLevel();
        //game start
        //this.run();
    }
    // constructor(canvasWidth:number, canvasHeight:number )
    // {
    // super();
    // }
    //this is the gameloop
    run() {
        let now = Date.now();
        this.delta = (now - this.oldTimestamp);
        this.currentLevel.update(this.delta);
        this.currentLevel.render(this.context);
        requestAnimationFrame(this.run.bind(this));
        this.oldTimestamp = now;
    }
    /**
     * this is the method that will load the current level events of the canvas
     *
     */
    loadLevel(level) {
        this.currentLevel = level;
        //set canvas events
        // mouse events
        this.canvas.addEventListener("mousedown", (event) => this.currentLevel.mouseDown(event));
        this.canvas.addEventListener("mousemove", (event) => this.currentLevel.mouseMove(event));
        this.canvas.addEventListener("mouseup", (event) => this.currentLevel.mouseUp(event));
        this.canvas.addEventListener("mouseout", (event) => this.currentLevel.mouseOut(event));
        this.canvas.addEventListener("mouseover", (event) => this.currentLevel.mouseOver(event));
        // touch events
        this.canvas.addEventListener("touchstart", (event) => this.currentLevel.touchStart(event));
        this.canvas.addEventListener("touchmove", (event) => this.currentLevel.touchMove(event));
        this.canvas.addEventListener("touchend", (event) => this.currentLevel.touchEnd(event));
        this.canvas.addEventListener("touchcancel", (event) => this.currentLevel.touchCancel(event));
        this.canvas.addEventListener("touchleave", (event) => this.currentLevel.touchLeave(event));
        // keyboard events
        this.canvas.addEventListener("keydown", (event) => this.currentLevel.keyDown(event));
        this.canvas.addEventListener("keyup", (event) => this.currentLevel.keyUp(event));
    }
} //
// @TODO below code must be in a separate class maybe a game.js class that will be added to the html
//set the game instance, load the first level and start the game
let game = new GameManager();
game.loadLevel(new TestLevel());
window.onload = function () { game.run(); };
// se puede usar el windows onload aqui antes de ejecutar todo
