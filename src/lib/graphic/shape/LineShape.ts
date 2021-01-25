
import { Point } from "../Point.js";
import { BaseShape } from "./BaseShape.js";

/**
 * this will create a line that can be displayed if used in render(ctx) method, 
 * line will start from x & y to x2 & y2. <br />
 * by default line width is 1 and default color is black <br />
 * properties you can update for this class are:
 * strokeColor
 * strokeLineWidth
 */
export class LineShape extends BaseShape
{

    constructor( startPoint:Point, endPoint:Point )
    {
        super();
        this.points =[startPoint,endPoint];
        this.strokeColor = "#FFF";
        this.strokeLineWidth = 1;
        this.label="line:"+this.id;
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

                ctx.translate( this.points[0].x + this.points[1].x/2, this.points[0].y + this.points[1].y/2 );
                ctx.rotate( this.angle );
                ctx.scale( this.xScale, this.yScale );
                ctx.translate( -( this.points[0].x + this.points[1].x/2 ), -( this.points[0].y + this.points[1].y/2 ) );

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
        ctx.strokeStyle = this.fillColor;
        ctx.lineWidth = this.strokeLineWidth;

        ctx.beginPath();
        ctx.moveTo( this.points[0].x, this.points[0].y );
        ctx.lineTo( this.points[1].x, this.points[1].y );
        ctx.closePath();

        ctx.stroke();
    }//

}//