

import {Runnable} from "../ntfc/Runnable";
import {BaseLevel} from "../level/BaseLevel";
import {Config} from "../cfg/Config";
import { AssetUtil } from "../util/AssetUtil";


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
   export class Game
                 implements Runnable
{
    private static instance:Game;
    currentLevel:BaseLevel; 
    
    //this can be used to store some persistent data in player browser 
    localStorage:Storage;

    delta: number;
    lastUpdate: number;
    targetFPS:number;
    millisPerFrame:number; // this is 1000 / fps
    fpsCounter:number;
    calculateFps:boolean;
    // step:number;
    //  currentTimestamp:number;

    
    canvas:HTMLCanvasElement;
    context2D: CanvasRenderingContext2D;
    fontName:string;

    //below vars are for enable needed controls
    //by default keyboard is enabled
    enableKeyboardControl:boolean=true;
    enableTouchControl:boolean=false;
    enableMouseControl:boolean=false;
    enableGamePadControl:boolean=false;
    // enableResizeScreen:boolean=false;

    xScale:number;
    yScale:number;

    private firstLevelLoaded:boolean;//used to add evenListeners only once in canvas


    framesCount:number=0;
    frames:number = 0;
    fps:number = 0;
    lastFPSUpdate:number = Date.now();
    
/**
 * this var is used to specify if the game should start from webContext or electron context
 * if is webContext will start normally like if it starts from the browser
 * if is electronContext will start fue an event from main process of electron
 */
    targetMode:string;

    /**
     * create a GameManager Instance, this manager starts the 
     * game loop, if width and height are not defined, it will get that
     * value from level when loaded or the view if that level has a camera
     * @param canvasId id of teh canvas to show the game if not specified id will be 'canvas' 
     */
    private constructor( canvasId:string = "canvas", width?:number, height?:number , mode:string="web")
    {


        this.targetMode = mode;

       
       

        this.delta = 0;
        this.lastUpdate = 0;
        this.targetFPS = 60;// 1000/30;  //30 fps, use 1000/60 to set it to 60 fps
        this.millisPerFrame = 1/this.targetFPS;
        //below are tho show and set FPS counter
        this.fpsCounter = 0;
        this.calculateFps = false;

        this.firstLevelLoaded=false;

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

        document.getElementById("gameTitle").innerHTML=Config.GAME_NAME;
        document.getElementById("gameDesc").setAttribute( "content", Config.GAME_DESC );
    }

    /**
     * creates and return the instance of the GameManager which
     * set and starts the game
     * @param canvasId 
     * @param width 
     * @param height 
     */
    static getInstance(canvasId:string = "canvas", width?:number, height?:number):Game
    {
        if( this.instance ==  null || undefined)
            this.instance = new Game(canvasId, width, height); 
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
        //OLD IMPLEMENTATION WORKS, BUT LOOKING A BETTER ONE
        // let now = Date.now();
        // // this.delta = now - this.lastUpdate;
        // this.delta = ( now - this.lastUpdate ) / 1000; //this will give like 0.016 which is ok for delta
        
        // this.updateFpsCounter();

        // if( this.delta >= this.millisPerFrame )
        // {
        //     if( this.currentLevel )
        //     {
        //         this.currentLevel.update( this.delta );
        //         this.currentLevel.render( this.context2D );
        //         this.lastUpdate = now;
        //     }

        // }

        let now = Date.now();
        // this.delta = now - this.lastUpdate;
        this.delta = ( now - this.lastUpdate ) / 1000; //this will give like 0.016 which is ok for delta
        
        // console.log("delta: ", this.delta)
        this.updateFpsCounter();

        if( this.delta >= 1 / this.targetFPS )
        {
            if( this.currentLevel )
            {
                this.currentLevel.update( this.delta );
                this.currentLevel.render( this.context2D );
                this.lastUpdate = now;
                this.frames++;
            }

        }

        if( this.calculateFps )
        {
            if (now - this.lastFPSUpdate >= 1000) 
            {
                
                this.fps =this.frames;
                this.frames = 0;
                this.lastFPSUpdate = now;
                // console.log("FPS: ", this.fps)
            }
        }
        

        // if(this.currentLevel)this.currentLevel.render( this.context2D );
        requestAnimationFrame( this.run.bind(this) );
    }

    /**
     * this function will update "fpsCounter" if calculateFps is true
     * or enabled
     * @param delta 
     */
    updateFpsCounter()
    {
        if( this.calculateFps )
            this.fpsCounter = Math.ceil( 1/this.delta ); 
            //console.log(`FPS: ${this.fpsCounter}`);
        
    }

    /**
     * this will resize canvas width and height to the scaled values
     * NOTE: this does not updates xScale and yScale, it is only to
     * fix the size when a canvas is resized .
     * if you want to resize canvas to windows size use "scaleToWindow"
     * 
     * !!!CAUTION USING THIS FUNCTION WILL RESET canvas.context2D state!!!
     * !!!THIS IS NOT MY FAULT THAT HOW canvas WORKS =) !!!
     * @param xNewScale 
     * @param yNewScale 
     */
    resizeCanvas( xNewScale:number, yNewScale:number)
    {
        // this.xScale= xNewScale;
        // this.yScale = yNewScale;

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
            // newWidth = Math.floor( this.canvas.width * this.xScale );
            // newHeight = Math.floor( this.canvas.height * this.yScale );
            newWidth = Math.floor( this.canvas.width * xNewScale );
            newHeight = Math.floor( this.canvas.height * yNewScale );
        }

        
        this.canvas.width = Math.floor(newWidth * xNewScale);
        this.canvas.height = Math.floor(newHeight * yNewScale);
        this.context2D.scale(xNewScale, yNewScale);

        
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

        if(!this.firstLevelLoaded)
        {
            this.firstLevelLoaded=true;
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



        }//firstLevelLoaded
      
        
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
    
    // /**
    //  * this will take original aspect ratio and will scale the canvas and will add
    //  * the appropiate widht and height for the canvas, this cannot be completly
    //  * full screen cause the aspect ratio may be different than the window measures
    //  * @deprecated
    //  */
    // setFullScreen():any
    // {
    //     console.log("resize screen")
    //    let winWidth:number = window.innerWidth;
    //    let winHeight:number = window.innerHeight;

    //    let gameAspectRatio:number = this.currentLevel.levelWidth/this.currentLevel.levelHeight;
    //    let newWidth:number = winHeight * gameAspectRatio;

    //    //get new aspect ratio to scale canvas to full screen
    //     let newXScale:number = newWidth/this.currentLevel.levelWidth//Math.floor( newWidth/this.currentLevel.levelWidth );
    //     let newYScale:number = winHeight/this.currentLevel.levelHeight//Math.floor( winHeight/this.currentLevel.levelHeight );

    //     this.canvas.width = newWidth;
    //     this.canvas.height = winHeight;

    //     console.log("CW ", newWidth)
    //     console.log("CH ", winHeight)
    //     console.log("nX ", newXScale)
    //     console.log("nY ", newYScale)


    //     //setting new scales to game manager
    //     this.xScale = newXScale; 
    //     this.yScale = newYScale;
    //     this.context2D.scale( this.xScale, this.yScale );
    // }


    /**
     * IMPORTANT! this is the most new and should be used,
     * function to scale the game to windows size keeping aspect ratio
     * note: tihs will scalate the game screen to window size but will be rounded
     * to integer values, if the screen can be scaled  4.5 times, then will
     * be scaled to 4, because if is scaled to decimal numbers, the HTML5 canvas
     * behaves oddly and soes not render properly let say, because there is no
     * half pixel to display
     * Thanks to Rex Van Der Spuy ( i am your fan! )
     * @param bgColor 
     */
    scaleToWindow( bgColor:string="#000" )
    {
        const addressBar:number=0; //experimental
        let scaleX, scaleY, scale;// center;

        scaleX = window.innerWidth / this.canvas.width;
        scaleY = (window.innerHeight-addressBar) / this.canvas.height;

        scaleX = Math.trunc(scaleX)
        scaleY = Math.trunc(scaleY)
        // console.log("scaleX:", scaleX)
        // console.log("scaleY:", scaleY)

        scale = Math.min(scaleX, scaleY);
        this.canvas.style.transformOrigin = "0 0";
        this.canvas.style.transform = "scale(" + scale + ")";

        // if (this.canvas.width > this.canvas.height) {
        //     center = "vertically";
        // }
        // else {
        //     center = "horizontally";
        // }

        // if (center === "horizontally") {
            
        //to center canvas horizontally
            let margin = ( (window.innerWidth - addressBar) - this.canvas.width * scaleY) / 2;
            this.canvas.style.marginLeft = margin + "px";
            this.canvas.style.marginRight = margin + "px";
        // }

        // if (center === "vertically") {
            //to center canvas vertically
            margin = ( (window.innerHeight-addressBar) - this.canvas.height * scaleX) / 2;
            this.canvas.style.marginTop = "0px"// margin + "px";
            // this.canvas.style.marginBottom = margin + "px";
        // }

        this.canvas.style.paddingLeft= "0";
        this.canvas.style.paddingRight = "0";
        this.canvas.style.display = "block";

        document.body.style.backgroundColor = bgColor;

        //setting proper scale after change canvas for pointers
        this.xScale = scale;
        this.yScale = scale;
        console.log(`XS:${this.xScale} - YS:${ this.yScale} - scale:${scale}`);
        // this.pointer.scale = scale;
        // scale = scale;
    }


    //     //Scale and center the game
    // g.scaleToWindow();
    // //Optionally rescale the canvas if the browser window is changed
    // window.addEventListener("resize", event => {
    // g.scaleToWindow();
    // });

    /**
     * this will scale the canvas to windows possible size every time resize event is called
     * @param enable 
     */
    scaleOnResize(enable:boolean=true)
    {
        if( enable )
            window.addEventListener( "resize", (ev) => this.scaleToWindow("#000") );
        else    
            window.removeEventListener("resize",(ev) => this.scaleToWindow("#000"));
    }


}//
