//classes
import { Level } from "../level/level.js";
/**
 * gameManager will be responsible to initialize the game:
 * create the main thread, load the first level, update and
 * render the game, etc.
 */
class gamemanager {
    constructor(canvas, currentLevel) {
        this.seconds = 0;
        this.oldTimestamp = 1000;
        this.fps = 30;
        this.canvas = document.getElementById("canvas"); //canvas;
        this.context = this.canvas.getContext("2d");
        console.log(this.canvas);
        console.log(this.context);
        this.currentLevel = new Level();
        this.run();
        //game start
        // window.onload = this.init;
    }
    //this is the gameloop
    run() {
        this.currentLevel.update(1);
        this.currentLevel.render(this.context);
        // this.context.fillStyle = "black";
        // this.context.fillRect(0,0,640,480);
        requestAnimationFrame(this.run.bind(this));
    }
    init() {
        window.requestAnimationFrame(this.run);
    }
} //
new gamemanager(null, null);
