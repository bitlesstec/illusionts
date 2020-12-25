
import {Runnable} from "../ntfc/Runnable";
import {BaseLevel} from "../level/BaseLevel";
import { Config } from "../cfg/Config";


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

     delta: number;
     lastUpdate: number;
    //  currentTimestamp:number;

     fps: number;
     step:number;
     currentLevel: BaseLevel; 
     canvas:HTMLCanvasElement;
     context: CanvasRenderingContext2D;

     fontName:string;
    
    /**
     * create a GameManager Instance, this manager starts the 
     * game loop, it gets 
     * @param canvasId id of teh canvas to show the game if not specified id will be 'canvas' 
     */
    private constructor( canvasId:string = "canvas" )
    {
        this.delta = 0;
        this.lastUpdate = 0;
        this.fps = 60;// 1000/30;  //30 fps, use 1000/60 to set it to 60 fps
        this.step = 1/this.fps;
        this.fontName = Config.DEFAULT_FONT_NAME;
        this.setFont( this.fontName, "/src/com/bitless/font/press-start.ttf" );

        this.canvas = <HTMLCanvasElement>document.getElementById( canvasId );
        this.context = <CanvasRenderingContext2D>this.canvas.getContext("2d");

        this.context.textBaseline = "top";

        // this.loadLevel( firstLevel );
        // this.currentLevel = firstLevel; // new BaseLevel();
        //game start
        //this.run();
        this.context.font = "10px press-start";
        // this.currentLevel = new BaseLevel(640,480);
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
        //@NOTE: check if current level !== undefined
        let now = Date.now();
        this.delta = ( now - this.lastUpdate ) / 1000;//this.fps;
        this.lastUpdate = now;
        if( this.currentLevel !== undefined )
        {
            this.currentLevel.update( this.delta );
            this.currentLevel.render( this.context );
        }
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
     * this is the method that will load  level specified and will
     * become the current level ( even if there was another level oreviously)
     *  after that events of keyboard, mouse, touch events will be set in the canvas
     * @param level new level to load must be an implementation of BaseLevel
     *      
     * */
    loadLevel( level:BaseLevel )
    {
        this.currentLevel = level;

        // canvas/keyboard/touchmouse events
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
