
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
export class Background extends BaseShape
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
    }   

    /**
     * this method will render the image at X & Y point, basically
     * is backgroundImage
     * @param ctx 
     */
    render( ctx: CanvasRenderingContext2D ):void
    {
        if( this.visible )
            ctx.drawImage
            (
                this.image,
                this.srcX, this.srcY, this.w, this.h, //source image
                Math.floor( this.getX() ), Math.floor( this.getY() ), //destination
                this.dstW, this.dstH
            );
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