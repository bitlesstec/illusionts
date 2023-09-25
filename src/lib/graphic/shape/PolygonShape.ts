import { Point } from "../Point";
import { BaseShape } from "./BaseShape";


/**
 * this class is used to create regular polygon shapes
 * triangles,diamonds, pentaons, hexagons, etc
 */
export class PolygonShape extends BaseShape
{

    constructor(points:Point[])
    {
     super();
     this.points=points;
     this.label="polygon:"+this.id;
    }


    render(ctx:CanvasRenderingContext2D)
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

                this.drawPolygon( ctx );
                ctx.restore();
            }
            else
            {
                this.drawPolygon( ctx );
            }
            
        }//

    }


    drawPolygon(ctx:CanvasRenderingContext2D)
    {
        
        if(this.displayOutline)
        {
            ctx.strokeStyle = this.strokeColor;
            ctx.lineWidth=this.strokeLineWidth;
            ctx.beginPath();
            ctx.moveTo( this.points[0].x, this.points[0].y );
            for(let idx = 1; idx < this.points.length; idx++)
            {
                ctx.lineTo( this.points[idx].x, this.points[idx].y );
            }
            ctx.closePath();
            ctx.stroke();
        }

        ctx.fillStyle= this.fillColor;
        ctx.beginPath();
        ctx.moveTo( this.points[0].x, this.points[0].y );
        for(let idx = 1; idx < this.points.length; idx++)
        {
           ctx.lineTo( this.points[idx].x, this.points[idx].y );
        }
        ctx.closePath();
        ctx.fill();



        // ctx.fillStyle = '#0f0';
        // ctx.beginPath();
        // ctx.moveTo(0, 0);
        // ctx.lineTo(100,50);
        // ctx.lineTo(50, 100);
        // ctx.lineTo(0, 90);
        // ctx.closePath();
        // ctx.fill();

    }



}