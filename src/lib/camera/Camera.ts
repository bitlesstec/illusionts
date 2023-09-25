
import { Moveable } from "../ntfc/Moveable";
import { FlashEffect } from "./FlashEffect";
import { Margin } from "./Margin";
import { Offset } from "./Offset";
import { ShakeEffect } from "./ShakeEffect";

export class Camera implements Moveable
{

    x:number;
    y:number;
    private xMin:number; //minimum x where we can move the view
    private yMin:number;
    private xMax:number; //maximun x where the view can be moved
    private yMax:number;
    private levelWidth:number;
    private levelHeight:number;
    viewWidth:number;
    viewHeight:number;

    /**
     * this is the X coordinate related to the view, even if we are moving the camera in x axis, then viewX
     * will be the same value always, often to put HUD on top of the view.
     * 
     * viewX and viewY are used to put hud at a fixed position even if the view moves
     */
    viewX: number;
    viewY: number;

    shakeEffect:ShakeEffect;
    flashEffect:FlashEffect;

    margin:Margin;
    offset:Offset;

    /**
     * this constructor will set the measures of a level , often a level can be bigger than
     * the part we can see of the game, called view, usually the view will be the same size 
     * of the canvas.
     * @todo this needs more testing and improvement
     * @param levelWidth 
     * @param levelHeight 
     * @param viewWidth 
     * @param viewHeight 
     */
    constructor( levelWidth:number, levelHeight:number, viewWidth:number = 0, viewHeight:number = 0 )
    {

        this.x = 0;
        this.y = 0;
        this.levelWidth = levelWidth;
        this.levelHeight = levelHeight;
        this.viewWidth = viewWidth;
        this.viewHeight = viewHeight;

        this.xMin = 0;
        this.xMax = -levelWidth + viewWidth;//chcek here if viewWidth doesnot exists
        this.viewX = this.x;

        this.yMin = 0;
        this.yMax = -levelHeight + viewHeight;
        this.viewY = this.y;

        /**
         * if viewWidth or viewHeight is undefined, means the view size 
         * is the same as the level size, hence camera wont be applicable
         * or at least it wont be moved.
         */
        if( viewWidth === undefined || viewHeight === undefined )
        {
            this.viewWidth = this.levelWidth;
            this.viewHeight = this.levelHeight;
            this.xMax = 0;
            this.yMax = 0;
        }

       

        //effects camera can effectuate
        this.shakeEffect = new ShakeEffect( this );
        this.flashEffect = new FlashEffect( this );

        this.margin = new Margin( this );
        this.offset = new Offset();

    }//

    /**
     * this will move the camera along X & Y axis
     * @param xspd 
     * @param yspd 
     */
    move( xspd: number, yspd: number ) 
    {
        this.moveX( xspd );
        this.moveY( yspd );
    }//

    moveX(xspd: number) 
    {
        if(this.shakeEffect.isShaking)return;//ww aren't moving camera if is shaking
        //      to move camera to right we have to substract x to camx(in negative way),
        //      at the same time x it should be added to ViewX to have the correct position
        //      in order to display some text in the same position of the view 

        this.x -= xspd;
        this.viewX += xspd;

        // console.log( `X: ${this.x} - VX: ${this.viewX}` );
            /**
             * minimum value of camx should be 0, is the starting point
             * camx is not mayor than 0
             */
        if( this.x >= this.xMin)
        {
            this.x = this.xMin;
            this.viewX = this.xMin;
        }
        else if( this.x <= this.xMax )
        {
            //this will set x of the level to -levelWidth * viewWidth
            this.x = this.xMax;
            this.viewX = this.xMax * -1;
        }


    }//

    moveY(yspd: number) 
    {

        if(this.shakeEffect.isShaking)return;//ww aren't moving camera if is shaking

        this.y -= yspd; 
        this.viewY += yspd;
            
        //establece que se muestre el room a cero
        if(this.y >= this.yMin )
        {
            this.y = this.yMin;
            this.viewY = this.yMin;
        }
        else if(this.y <= this.yMax)
        {
            //establece que se muestre el room a  -roomHeight + viewXheigth
            this.y = this.yMax;
            this.viewY = this.yMax * -1;
        }

    }//


    
   

}//