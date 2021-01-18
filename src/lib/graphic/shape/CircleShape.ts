import { Config } from "../../cfg/Config.js";
import { Point } from "../Point.js";
import { BaseShape } from "./BaseShape.js";

/**
 * this can be used to display a simple circle 
 * filled or stroked (circumference) or you can
 * create wedges too
 * by defaul will displa y a complete circle using
 * context2D.arc function.
 * you can also define starting and end agles of circle/circumference
 */
export class CircleShape extends BaseShape{

    radius:number;
    startAngle:number;
    endAngle:number;

    /**
     * @param x x coordinate of the center point 
     * @param y y coordinate of the center point
     * @param rad radius of the circle
     * @param color color to paint circle
     */
    constructor(centerPoint:Point, rad:number, color:string)
    {
        super();
        this.points=[centerPoint]; //this point is the middle center
        console.log("constructing circle")
        this.radius=rad;
        this.fillColor=color;
        this.startAngle=0;
        this.endAngle=360;
        this.strokeColor="gray";
        this.displayOutline=false;
        this.label="circle:"+this.id;
    }

    render( ctx:CanvasRenderingContext2D ):void
    {
        if( this.visible )
        {
            //@todo improve this 
            if( this.alpha < 1 || this.angle !== 0 || this.xScale !== 1 || this.yScale !== 1 )
            {
                ctx.save();

                ctx.globalAlpha = this.alpha;

                ctx.translate( this.points[0].x, this.points[0].y );
                ctx.rotate( this.angle );
                ctx.scale( this.xScale, this.yScale );
                ctx.translate( -( this.points[0].x ), -( this.points[0].y ) );

                this.drawCircle( ctx );

                ctx.restore();
            }
            else
            {
                this.drawCircle( ctx );
            }
            
        }//

    }

    drawCircle( ctx:CanvasRenderingContext2D ):void
    {
        if(this.displayOutline)
        {
            ctx.strokeStyle = this.strokeColor;
            ctx.lineWidth=this.strokeLineWidth;
            ctx.beginPath();
            ctx.lineTo(this.points[0].x, this.points[0].y);
            ctx.arc(this.points[0].x, this.points[0].y, this.radius, 0/Config.RADIAN, 360/Config.RADIAN);
            ctx.closePath();
            ctx.stroke();
        }

        ctx.fillStyle = this.fillColor;
        ctx.beginPath();

        ctx.lineTo(this.points[0].x,this.points[0].y);
        ctx.arc(this.points[0].x, this.points[0].y, this.radius, this.startAngle/Config.RADIAN, this.endAngle/Config.RADIAN);
        ctx.closePath();
        ctx.fill();
    }


}