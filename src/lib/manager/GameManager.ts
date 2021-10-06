<<<<<<< HEAD

import {Runnable} from "../ntfc/Runnable.js";
import {BaseLevel} from "../level/BaseLevel.js";
import {Config} from "../cfg/Config.js";

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
    private static instance:GameManager;
    currentLevel:BaseLevel; 
    
    //this can be used to store some persistent data in player browser 
    localStorage:Storage;

    delta: number;
    lastUpdate: number;
    //  currentTimestamp:number;

    fps:number;
    step:number;
    
    canvas:HTMLCanvasElement;
    context2D: CanvasRenderingContext2D;
    fontName:string;

    //map to save persistent data along levels
    gameData:Map<string, string>;

    //below vars are for enable needed controls
    //by default keyboard is enabled
    enableKeyboardControl:boolean=true;
    enableTouchControl:boolean=false;
    enableMouseControl:boolean=false;
    enableGamePadControl:boolean=false;

    xScale:number;
    yScale:number;

    /**
     * create a GameManager Instance, this manager starts the 
     * game loop, if width and height are not defined, it will get that
     * value from level when loaded or the view if that level has a camera
     * @param canvasId id of teh canvas to show the game if not specified id will be 'canvas' 
     */
    private constructor( canvasId:string = "canvas", width?:number, height?:number )
    {
        this.delta = 0;
        this.lastUpdate = 0;
        this.fps = 60;// 1000/30;  //30 fps, use 1000/60 to set it to 60 fps
        this.step = 1/this.fps;
        this.gameData= new Map<string, string>();

        //this will set @font-face style element
        this.configureFont( Config.DEFAULT_FONT_NAME, Config.DFLT_FNT_NAME_PATH );

        this.localStorage = <Storage>window.localStorage;
        this.canvas = <HTMLCanvasElement>document.getElementById( canvasId );
        if(width)this.canvas.width=width;
        if(height)this.canvas.height=height;
        this.canvas.focus();//get canvas focus?
        this.context2D = <CanvasRenderingContext2D>this.canvas.getContext("2d");
        this.context2D.textBaseline = "top";
        this.setFont(10, Config.DEFAULT_FONT_NAME);
        // this.context2D.font = "10px press-start";
        
        this.xScale=1;
        this.yScale=1;
        this.context2D.scale(this.xScale, this.yScale);
    }

    /**
     * creates and return the instance of the GameManager which
     * set and starts the game
     * @param canvasId 
     * @param width 
     * @param height 
     */
    static getInstance(canvasId:string = "canvas", width?:number, height?:number):GameManager
    {
        if( this.instance ==  null || undefined)
            this.instance = new GameManager(canvasId, width, height); 
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
            this.currentLevel.render( this.context2D );
        }
        requestAnimationFrame( this.run.bind(this) );
    }

    /**
     * this will resize context of canvas and will
     * set new width and height of scaled size
     * !!!CAUTION USING THIS FUNCTION WILL RESET canvas.context2D state!!!
     * !!!THIS IS NOT MY FAULT THAT HOW canvas WORKS =) !!!
     * @param xNewScale 
     * @param yNewScale 
     */
    scaleCanvas( xNewScale:number, yNewScale:number)
    {
        this.xScale= xNewScale;
        this.yScale = yNewScale;

        let newWidth:number = 1;
        let newHeight:number = 1;
        if( this.currentLevel.camera.viewWidth && this.currentLevel.camera.viewHeight )
        {
            //if there is a camera there should be a view
            newWidth = this.currentLevel.camera.viewWidth;
            newHeight = this.currentLevel.camera.viewHeight;
        }
        else if( this.currentLevel )
        {
            // if there is no camera we take level width and height
            newWidth = this.currentLevel.levelWidth;
            newHeight = this.currentLevel.levelHeight;
        }
        else
        {
            // there is no level loaded pageYOffset, then we take canvas width and height
            newWidth = Math.floor( this.canvas.width * this.xScale );
            newHeight = Math.floor( this.canvas.height * this.yScale );
        }

        
        this.canvas.width = Math.floor(newWidth * this.xScale);
        this.canvas.height = Math.floor(newHeight * this.yScale);
        this.context2D.scale(this.xScale, this.yScale);
        
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
     * become the current level ( even if there was another level previously)
     *  after that events of keyboard, mouse, touch events will be set in the canvas
     * @param level new level to load must be an implementation of BaseLevel
     * */
    loadLevel( level:BaseLevel )
    {
        this.currentLevel = level;

        // mouse events
        if(this.enableMouseControl)
        {
            this.canvas.addEventListener("mousedown", (event) => this.currentLevel.mouseDown(event));
            this.canvas.addEventListener("mousemove", (event) => this.currentLevel.mouseMove(event));
            this.canvas.addEventListener("mouseup", (event) => this.currentLevel.mouseUp(event));
            this.canvas.addEventListener("mouseout", (event) => this.currentLevel.mouseOut(event));
            this.canvas.addEventListener("mouseover",(event) =>  this.currentLevel.mouseOver(event));
        }
        
        // touch events
        if(this.enableTouchControl)
        {
            this.canvas.addEventListener("touchstart",(event) =>  this.currentLevel.touchStart(event));
            this.canvas.addEventListener("touchmove", (event) => this.currentLevel.touchMove(event));
            this.canvas.addEventListener("touchend",(event) =>  this.currentLevel.touchEnd(event));
            this.canvas.addEventListener("touchcancel",(event) =>  this.currentLevel.touchCancel(event));
            this.canvas.addEventListener("touchleave",(event) =>  this.currentLevel.touchLeave(event));    
        }

        // keyboard events
        if(this.enableKeyboardControl)
        {
            this.canvas.addEventListener("keydown", (event) => this.currentLevel.keyDown(event) );
            this.canvas.addEventListener("keyup", (event) => this.currentLevel.keyUp(event));    
        }

        //NOTE AT THIS POINT THIS NEEDS MORE TESTING
        if(this.enableGamePadControl)
        {
            window.addEventListener("gamepadconnected", (event) => this.currentLevel.gamePadConnected(event) );
            window.addEventListener("gamepaddisconnected", (event) => this.currentLevel.gamePadDisconnected(event) );
        }
        
    }

    /**
     * this function will create a new style element with the font face
     * and url where the font file ( .ttf ) reside, after that, the element
     * will be added to html in header tag
     * @param fontName 
     * @param fontPath 
     */
    configureFont( fontName:string, fontPath:string )
    {
        let styleElement = document.createElement( 'style' );
        let fontFaceNode = 
        `@font-face
        {
            font-family:"${fontName}";
            src: url(" ${fontPath} ");
        }`;

        styleElement.appendChild( document.createTextNode( fontFaceNode ) );
        document.head.appendChild( styleElement );
    }

    /**
     * this will set context2D.font property with the new values set by
     * fontSize & fontName
     * @param fontSize in pixels
     * @param fontName 
     */
    setFont( fontSize:number, fontName:string ){
        console.log(`${fontSize}px ${ fontName }`)
        this.fontName=fontName;
        this.context2D.font = `${fontSize}px ${ fontName }`;
    }

    /**
     * this will change the current font size
     * @param size 
     */
    setFontSize( size:number ):void
    {
        this.context2D.font = `${size}px ${ this.fontName }`;
    }

    /**
     * this will take an screenshot of the game and will save this in
     * user location
     */
    takeScreenshot():void
    {
        let imgUrl = GameManager.getInstance().canvas
            .toDataURL("image/png").replace("image/png", "image/octet-stream");
        window.location.href = imgUrl;
    }

    getTextWidth(txt:string)
    {
        this.context2D.measureText(txt).width;
    }

    // getTextHeight(txt:string)
    // {
    //     this.context.measureText(txt).;
    // }

}//
=======

import {Runnable} from "../ntfc/Runnable.js";
import {BaseLevel} from "../level/BaseLevel.js";
import {Config} from "../cfg/Config.js";

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
    private static instance:GameManager;
    currentLevel:BaseLevel; 
    
    //this can be used to store some persistent data in player browser 
    localStorage:Storage;

    delta: number;
    lastUpdate: number;
    fps:number;
    millisPerFrame:number; // this is 1000 / fps
    fpsCounter:number;
    calculateFps:boolean;
    // step:number;
    //  currentTimestamp:number;

    
    canvas:HTMLCanvasElement;
    context2D: CanvasRenderingContext2D;
    fontName:string;

    //map to save persistent data along levels
    gameData:Map<string, string>;

    //below vars are for enable needed controls
    //by default keyboard is enabled
    enableKeyboardControl:boolean=true;
    enableTouchControl:boolean=false;
    enableMouseControl:boolean=false;
    enableGamePadControl:boolean=false;

    xScale:number;
    yScale:number;

    /**
     * create a GameManager Instance, this manager starts the 
     * game loop, if width and height are not defined, it will get that
     * value from level when loaded or the view if that level has a camera
     * @param canvasId id of teh canvas to show the game if not specified id will be 'canvas' 
     */
    private constructor( canvasId:string = "canvas", width?:number, height?:number )
    {
        this.delta = 0;
        this.lastUpdate = 0;
        this.fps = 60;// 1000/30;  //30 fps, use 1000/60 to set it to 60 fps
        this.millisPerFrame = 1/this.fps;


        //below are tho show and set FPS counter
        this.fpsCounter = 0;
        this.calculateFps = false;

        this.gameData= new Map<string, string>();

        //this will set @font-face style element
        this.configureFont( Config.DEFAULT_FONT_NAME, Config.DFLT_FNT_NAME_PATH );

        this.localStorage = <Storage>window.localStorage;
        this.canvas = <HTMLCanvasElement>document.getElementById( canvasId );
        if(width)this.canvas.width=width;
        if(height)this.canvas.height=height;
        this.canvas.focus();//get canvas focus?
        this.context2D = <CanvasRenderingContext2D>this.canvas.getContext("2d");
        this.context2D.textBaseline = "top";
        this.setFont(10, Config.DEFAULT_FONT_NAME);
        // this.context2D.font = "10px press-start";
        
        this.xScale=1;
        this.yScale=1;
        this.context2D.scale(this.xScale, this.yScale);
    }

    /**
     * creates and return the instance of the GameManager which
     * set and starts the game
     * @param canvasId 
     * @param width 
     * @param height 
     */
    static getInstance(canvasId:string = "canvas", width?:number, height?:number):GameManager
    {
        if( this.instance ==  null || undefined)
            this.instance = new GameManager(canvasId, width, height); 
        return this.instance;
    }

    //this is the gameloop
    // run()
    // {
    //     //@NOTE: check if current level !== undefined
    //     let now = Date.now();
    //     this.delta = ( now - this.lastUpdate ) / 1000;//this.fps;
    //     this.lastUpdate = now;
    //     if( this.currentLevel )
    //     {
    //         this.currentLevel.update( this.delta );
    //         this.currentLevel.render( this.context2D );
    //     }
    //     requestAnimationFrame( this.run.bind(this) );
    // }


    run()
    {
        let now = Date.now();
        // this.delta = now - this.lastUpdate;
        this.delta = ( now - this.lastUpdate ) / 1000; //this will give like 0.016 which is ok for delta
        
        if( this.calculateFps )
        {
            this.fpsCounter = Math.ceil(  1/this.delta ); //29411764
            console.log(`FPS: ${this.fpsCounter}`);
        }
            

        if( this.delta >= this.millisPerFrame )
        {
            if( this.currentLevel )
            {
                this.currentLevel.update( this.delta );
                this.currentLevel.render( this.context2D );
                this.lastUpdate = now;
            }

        }

        // if(this.currentLevel)this.currentLevel.render( this.context2D );
        requestAnimationFrame( this.run.bind(this) );
    }

    /**
     * this will resize context of canvas and will
     * set new width and height of scaled size
     * !!!CAUTION USING THIS FUNCTION WILL RESET canvas.context2D state!!!
     * !!!THIS IS NOT MY FAULT THAT HOW canvas WORKS =) !!!
     * @param xNewScale 
     * @param yNewScale 
     */
    scaleCanvas( xNewScale:number, yNewScale:number)
    {
        this.xScale= xNewScale;
        this.yScale = yNewScale;

        let newWidth:number = 1;
        let newHeight:number = 1;
        if( this.currentLevel.camera.viewWidth && this.currentLevel.camera.viewHeight )
        {
            //if there is a camera there should be a view
            newWidth = this.currentLevel.camera.viewWidth;
            newHeight = this.currentLevel.camera.viewHeight;
        }
        else if( this.currentLevel )
        {
            // if there is no camera we take level width and height
            newWidth = this.currentLevel.levelWidth;
            newHeight = this.currentLevel.levelHeight;
        }
        else
        {
            // there is no level loaded pageYOffset, then we take canvas width and height
            newWidth = Math.floor( this.canvas.width * this.xScale );
            newHeight = Math.floor( this.canvas.height * this.yScale );
        }

        
        this.canvas.width = Math.floor(newWidth * this.xScale);
        this.canvas.height = Math.floor(newHeight * this.yScale);
        this.context2D.scale(this.xScale, this.yScale);
        
    }

    /**
     * this is the method that will load  level specified and will
     * become the current level ( even if there was another level previously)
     *  after that events of keyboard, mouse, touch events will be set in the canvas
     * @param level new level to load must be an implementation of BaseLevel
     * */
    loadLevel( level:BaseLevel )
    {
        this.currentLevel = level;

        // mouse events
        if(this.enableMouseControl)
        {
            this.canvas.addEventListener("mousedown", (event) => this.currentLevel.mouseDown(event));
            this.canvas.addEventListener("mousemove", (event) => this.currentLevel.mouseMove(event));
            this.canvas.addEventListener("mouseup", (event) => this.currentLevel.mouseUp(event));
            this.canvas.addEventListener("mouseout", (event) => this.currentLevel.mouseOut(event));
            this.canvas.addEventListener("mouseover",(event) =>  this.currentLevel.mouseOver(event));
        }
        
        // touch events
        if(this.enableTouchControl)
        {
            this.canvas.addEventListener("touchstart",(event) =>  this.currentLevel.touchStart(event));
            this.canvas.addEventListener("touchmove", (event) => this.currentLevel.touchMove(event));
            this.canvas.addEventListener("touchend",(event) =>  this.currentLevel.touchEnd(event));
            this.canvas.addEventListener("touchcancel",(event) =>  this.currentLevel.touchCancel(event));
            this.canvas.addEventListener("touchleave",(event) =>  this.currentLevel.touchLeave(event));    
        }

        // keyboard events
        if(this.enableKeyboardControl)
        {
            this.canvas.addEventListener("keydown", (event) => this.currentLevel.keyDown(event) );
            this.canvas.addEventListener("keyup", (event) => this.currentLevel.keyUp(event));    
        }

        //NOTE AT THIS POINT THIS NEEDS MORE TESTING
        if( this.enableGamePadControl)
        {
            this.canvas.addEventListener("gamepadconnected", (event) => this.currentLevel.keyDown(event) );
            this.canvas.addEventListener("gamepaddisconnected", (event) => this.currentLevel.keyDown(event) );
        }
        
    }

    /**
     * this function will create a new style element with the font face
     * and url where the font file ( .ttf ) reside, after that, the element
     * will be added to html in header tag
     * @param fontName 
     * @param fontPath 
     */
    configureFont( fontName:string, fontPath:string )
    {
        let styleElement = document.createElement( 'style' );
        let fontFaceNode = 
        `@font-face
        {
            font-family:"${fontName}";
            src: url(" ${fontPath} ");
        }`;

        styleElement.appendChild( document.createTextNode( fontFaceNode ) );
        document.head.appendChild( styleElement );
    }

    /**
     * this will set context2D.font property with the new values set by
     * fontSize & fontName
     * @param fontSize in pixels
     * @param fontName 
     */
    setFont( fontSize:number, fontName:string ){
        this.fontName=fontName;
        this.context2D.font = `${fontSize}px ${ fontName }`;
    }

    /**
     * this will change the current font size
     * @param size 
     */
    setFontSize( size:number ):void
    {
        this.context2D.font = `${size}px ${ this.fontName }`;
    }

    /**
     * this will take an screenshot of the game and will save this in
     * user location
     */
    takeScreenshot():void
    {
        let imgUrl = GameManager.getInstance().canvas
            .toDataURL("image/png").replace("image/png", "image/octet-stream");
        window.location.href = imgUrl;
    }

    getTextWidth(txt:string)
    {
        this.context2D.measureText(txt).width;
    }

    /**
     * this will set new fps for the game and will change,
     * millisPerFrame variable used in game loop.
     * RECOMMENDED to run this before game start and not to
     * change this while game is runnig
     * @param fps 
     */
    setFps( fps:number )
    {
        // this.millisPerFrame = 1000 / fps;
        this.millisPerFrame = 1 / fps;
    }

    /**
     * if this function is called without parameters will set
     * calculateFps to true, otherwise fpsCounter will be always 0
     * @param calculate 
     */
    setCalculateFps( calculate:boolean = true )
    {
        this.calculateFps = calculate;
    }

    //@TODO
    // getTextHeight(txt:string)
    // {
    //     this.context.measureText(txt).;
    // }

    /**
     * DO NOT USE, NEEDS MORE TESTING
     */
    setFullScreen()
    {
       let deviceWidth:number = window.innerWidth;
       let deviceHeight:number = window.innerHeight;

       let aspectRatio:number = this.currentLevel.levelWidth/this.currentLevel.levelHeight;
       console.log("AR: ", aspectRatio)

       let newWidth:number = deviceHeight * aspectRatio;

       //get new aspect ratio to scale canvas to full screen
       
        let newXScale:number = Math.floor( newWidth/this.currentLevel.levelWidth );
        let newYScale:number = Math.floor( deviceHeight/this.currentLevel.levelHeight );

        console.log(`device msrs: ${deviceWidth} - ${deviceHeight}`);
        console.log(`new msrs: ${newWidth} - ${deviceHeight}`);
        console.log(`new scale: ${newXScale.toFixed(1)} - ${newYScale.toFixed(1)}`);

        this.canvas.width=newWidth;
        this.canvas.height=deviceHeight;

        this.context2D.scale( newXScale, newYScale );

    }

}//
>>>>>>> examples
