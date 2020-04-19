
//ntfcs
import {Runnable} from "../ntfc/runnable.js";

//classes
import {Level} from "../level/level.js";


/**
 * gameManager will be responsible to initialize the game:
 * create the main thread, load the first level, update and 
 * render the game, etc.
 */
 class  gamemanager
    implements Runnable
{
    
     seconds: number;
     oldTimestamp: number;
     fps: number;
     currentLevel: Level;
     canvas:HTMLCanvasElement;
     context: CanvasRenderingContext2D;
    
    constructor(canvas: HTMLCanvasElement, currentLevel: Level )
    {
        this.seconds = 0;
        this.oldTimestamp = 1000;
        this.fps = 30;


        this.canvas = <HTMLCanvasElement>document.getElementById("canvas"); //canvas;
        this.context = <CanvasRenderingContext2D>this.canvas.getContext("2d");

        console.log( this.canvas );
        console.log( this.context );


        this.currentLevel =  new Level();


        this.run();
        //game start
        // window.onload = this.init;
    }
    
    //this is the gameloop
    run()
    {
        
        this.currentLevel.update(1);
        this.currentLevel.render( this.context );
        requestAnimationFrame( this.run.bind(this) );
    }

}//

new gamemanager(null, null);