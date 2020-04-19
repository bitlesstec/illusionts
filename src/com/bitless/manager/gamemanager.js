//classes
import { Level } from "../level/level.js";
/**
 * gameManager will be responsible to initialize the game:
 * create the main thread, load the first level, update and
 * render the game, etc.
 */
class gamemanager {
    constructor() {
        //  currentTimestamp:number;
        this.fps = 0;
        this.delta = 0;
        this.oldTimestamp = 0;
        this.fps = 30;
        this.canvas = document.getElementById("canvas"); //canvas;
        this.context = this.canvas.getContext("2d");
        console.log(this.canvas);
        console.log(this.context);
        this.currentLevel = new Level();
        //game start
        this.run();
    }
    //this is the gameloop
    run() {
        let now = Date.now();
        this.delta = (now - this.oldTimestamp);
        this.currentLevel.update(this.delta);
        this.currentLevel.render(this.context);
        requestAnimationFrame(this.run.bind(this));
        console.log("::: " + this.delta);
        this.oldTimestamp = now;
    }
} //
//this will start the game
new gamemanager();
