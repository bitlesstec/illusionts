
//ntfcs
import {Runnable} from "../ntfc/runnable.js";

//classes
import {BaseLevel} from "../level/baselevel.js";
// import { TestLevel } from "../level/testLevel.js";


/**
 * gameManager will be responsible to initialize the game:
 * create the main thread, load the first level, update and 
 * render the game, etc.
 * 
 * - this is a singleton due there should be only GameManager instance per game.
 * - by default it implements press-start font, but you can change it later for
 *   something more convenient for your project.
 * 
 */
   export class  GameManager
                 implements Runnable
{
 
    

    static instance:GameManager;

    readonly DEFAULT_FONTNAME ="press-start";

     delta: number;
     lastUpdate: number;
    //  currentTimestamp:number;

     fps: number;
     step:number;
     currentLevel: BaseLevel; 
     canvas:HTMLCanvasElement;
     context: CanvasRenderingContext2D;

     fontName:string;
    
    // constructor( firstLevel: BaseLevel )
    private constructor()
    {
        this.delta = 0;
        this.lastUpdate = 0;
        this.fps = 60;// 1000/30;  //30 fps, use 1000/60 to set it to 60 fps
        this.step = 1/this.fps;
        this.fontName = this.DEFAULT_FONTNAME;
        this.setFont( this.fontName, "/src/com/bitless/font/press-start.ttf" );

        this.canvas = <HTMLCanvasElement>document.getElementById("canvas"); //canvas;
        this.context = <CanvasRenderingContext2D>this.canvas.getContext("2d");

        // this.loadLevel( firstLevel );
        // this.currentLevel = firstLevel; // new BaseLevel();
        //game start
        //this.run();
        this.context.font = "10px press-start";
    }

    static getInstance():GameManager
    {
        if( this.instance ==  null )
            this.instance = new GameManager(); 
        return this.instance;
    }

    //this is the gameloop
    run()
    {
        let now = Date.now();
        this.delta = ( now - this.lastUpdate ) / 1000;//this.fps;
        this.lastUpdate = now;
        this.currentLevel.update( this.delta );
        this.currentLevel.render( this.context );
        requestAnimationFrame( this.run.bind(this) );
    }

    // run()
    // {
        
    //     let now = Date.now();
    //     this.delta = Math.min( 1, ( now - this.lastUpdate ) / 1000 );
    //     while( this.delta > this.step )
    //     {
    //         this.delta = this.delta - this.step;
    //         this.currentLevel.update( this.delta );
            
    //     }
    //     this.currentLevel.render( this.context );
    //     this.lastUpdate = now;
    //     requestAnimationFrame( this.run.bind(this) );

    // }//

    /**
     * this is the method that will load the current level events of the canvas
     * 
     */
    loadLevel( level:BaseLevel )
    {
        this.currentLevel = level;

        //set canvas events
        
        // mouse events
        this.canvas.addEventListener("mousedown", (event) => this.currentLevel.mouseDown(event));
        this.canvas.addEventListener("mousemove", (event) => this.currentLevel.mouseMove(event));
        this.canvas.addEventListener("mouseup", (event) => this.currentLevel.mouseUp(event));
        this.canvas.addEventListener("mouseout", (event) => this.currentLevel.mouseOut(event));
        this.canvas.addEventListener("mouseover",(event) =>  this.currentLevel.mouseOver(event));

        // touch events
        this.canvas.addEventListener("touchstart",(event) =>  this.currentLevel.touchStart(event));
        this.canvas.addEventListener("touchmove", (event) => this.currentLevel.touchMove(event));
        this.canvas.addEventListener("touchend",(event) =>  this.currentLevel.touchEnd(event));
        this.canvas.addEventListener("touchcancel",(event) =>  this.currentLevel.touchCancel(event));
        this.canvas.addEventListener("touchleave",(event) =>  this.currentLevel.touchLeave(event));

        // keyboard events
        this.canvas.addEventListener("keydown", (event) => this.currentLevel.keyDown(event) );
        this.canvas.addEventListener("keyup", (event) => this.currentLevel.keyUp(event));
    }

/**
 * this function will create a new style element with the font face
 * and url where the font file ( tttf ) reside, afther that the element
 * will be added to html in header tag
 * @param fontName 
 * @param fontPath 
 */
setFont( fontName:string, fontPath:string )
{
    this.fontName = fontName;
    let styleElement = document.createElement( 'style' );

    let fontFaceNode = 
    `@font-face
    {
        font-family:'${fontName}';
        src: url( ${fontPath} );
    }`;

    styleElement.appendChild( document.createTextNode( fontFaceNode ) );

    document.head.appendChild( styleElement );
}

/**
 * this will change the current font size
 * @param size 
 */
setFontSize( size:number ):void
{
    this.context.font = `${size}px ${ this.fontName }`;
}



}//

// @TODO below code must be in a separate class maybe a game.js class that will be added to the html
//set the game instance, load the first level and start the game
// let game = new GameManager();


// game.loadLevel( new TestLevel() );

// window.onload =function(){game.run();} 

// se puede usar el windows onload aqui antes de ejecutar todo