
import { Scrollable } from "../ntfc/Scrollable.js";
import { BaseShape } from "./shape/BaseShape.js";


/**
 * this class will display a background on related
 * x & y position, this class can be also used as a tile instead 
 * background...
 * by default X & Y position is 0,0,
 * there is also a color property with default value to black 
 * and there is a method call renderCOlor which will 
 * display current color instead background image. 
 */
export class Background extends BaseShape implements Scrollable
{

    w:number;
    h:number;
    image: HTMLImageElement;
    srcX:number;
    srcY:number;
    srcW:number;
    srcH:number;
    // dstX:number;
    // dstY:number;
    dstW:number;
    dstH:number;

    //SCROLLING VARS
    // to keep values when scrolling is used
    offsetX:number;
    offsetY:number;
    xScrollSpd:number;
    yScrollSpd:number;


    constructor( image: HTMLImageElement )
    {
        super();
        
        this.image = image;
        this.w = this.image.width;
        this.h = this.image.height;
        this.dstW = this.image.width;
        this.dstH = this.image.height;
        this.srcX = 0;
        this.srcY = 0;
        this.visible = true;
        
        this.fillColor = "#000000"; //black by default
        this.offsetX = 0;
        this.offsetY = 0;
        this.xScrollSpd = 0;
        this.yScrollSpd = 0;
    }   


   

    scrollX(xSpd:number, viewWidth:number)
    {
        this.offsetX+=xSpd;
        if(this.offsetX < -this.w || this.offsetX > this.w )this.offsetX=0;
        // this.xOffset = this.xOffset < viewWidth? this.xOffset + 2 : 0;
    }

    scrollY( ySpd:number, viewHeight:number )
    {
        this.offsetY = this.offsetY < viewHeight? this.offsetY + 2 : 0;
    }

    scroll(viewWidth: number, viewHeight: number): void {
    }


    /**
     * this method will render the image at X & Y point, basically
     * is backgroundImage
     * @param ctx 
     */
    render( ctx: CanvasRenderingContext2D ):void
    {
        // if( this.visible )
        //     ctx.drawImage( this.image, this.points[0].x, this.points[0].y, this.w, this.h );


        if(this.visible)
        {

            if( !this.offsetX && !this.offsetY )
            {
                // there is nothing to scroll, draw normal
                ctx.drawImage( this.image, this.points[0].x, this.points[0].y, this.w, this.h );
            }
            else if( this.offsetX !== 0 && this.offsetY !== 0 )
            {
                //scrolling both axis draw 4 images
                ctx.save();
                ctx.translate( this.offsetX, this.offsetY );
                ctx.drawImage( this.image, this.points[0].x, this.points[0].y );
                ctx.drawImage( this.image, this.points[0].x, this.offsetY>0?-this.h:this.h );

                ctx.drawImage( this.image, this.offsetX>0?-this.w:this.w, 0);
                ctx.drawImage( this.image, this.offsetX>0?-this.w:this.w,  this.offsetY>0?-this.h:this.h);

                ctx.restore();

            }
            else
            {
                ctx.save();
                //check scroll on X
                if( this.offsetX !== 0 )
                {
                    ctx.translate( this.offsetX, 0 );
                    ctx.drawImage( this.image, this.points[0].x, this.points[0].y );
                    ctx.drawImage( this.image, this.offsetX>0?-this.w:this.w, 0);
                }

                //check sroll on Y
                if( this.offsetY !== 0 )
                {
                    ctx.translate( 0, this.offsetY );
                    ctx.drawImage( this.image, this.points[0].x, this.points[0].y );
                    ctx.drawImage( this.image, 0, this.offsetY>0?-this.h:this.h);
                }

                ctx.restore();
            }

            // ctx.save();
            // ctx.translate( this.xOffset, this.yOffset );
            // ctx.drawImage( this.image, this.points[0].x, this.points[0].y );
            // ctx.drawImage( this.image, -this.w, 0);
            // ctx.restore();
        }


    }

    /**
     * this method will render a rectanle from X & Y of W & H size, of the stablished
     * color
     * @param
     */
    renderColor( ctx: CanvasRenderingContext2D ):void
    {
        if( this.visible )
        {
            ctx.fillStyle = this.fillColor;
            ctx.fillRect( this.points[0].x, this.points[0].y, this.w, this.h );
        }
    }


}