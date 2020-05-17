import { BaseSprite } from "./basesprite.js";
import { Renderable } from "../ntfc/renderable.js";

/**
 * this will create a line that can be displayed if used in render(ctx) method, 
 * line will start from x & y to x2 & y2. <br />
 * by default line width is 1 and default color is black <br />
 * w is used as x2 and h is used as h2
 */
export class LineSprite extends BaseSprite
                        implements Renderable
{


    color:string;
    lineWidth:number;

    constructor( x:number, y:number, x2:number, y2:number )
    {
        super();
        this.x = x;
        this.y = y;
        this.w = x2;
        this.h = y2;
        this.color = "#000";
        this.lineWidth = 1;
    }//

    render(ctx: CanvasRenderingContext2D): void 
    {
    
        if( this.visible )
        {

            //@todo improve this 
            if( this.alpha < 1 || this.angle !== 0 || this.xScale !== 1 || this.yScale !== 1 )
            {
                ctx.save();

                ctx.globalAlpha = this.alpha;

                ctx.translate( this.x + this.w/2  , this.y + this.h/2 );
                ctx.rotate( this.angle );
                ctx.scale( this.xScale, this.yScale );
                ctx.translate( -( this.x + this.w/2 ) , -( this.y + this.h/2 ) );

                this.drawLine( ctx );

                ctx.restore();
            }
            else
            {
                this.drawLine( ctx );
            }
            
        }//

    }//

    /**
     * this method is used internally in render( ctx ), to draw a line, basically is 
     * creating a path, setting the points of the line, etc.
     * @param ctx 
     */
    drawLine( ctx:CanvasRenderingContext2D )
    {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;

        ctx.beginPath();
        ctx.moveTo( this.x, this.y );
        ctx.lineTo( this.w, this.h );
        // ctx.closePath();

        ctx.stroke();
    }//

}//