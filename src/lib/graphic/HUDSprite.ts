import { HUDDisplayType } from "./HUDDisplayType.js";
import { Sprite } from "./Sprite.js";

/**
 * this class represent a HUD object to display
 * text and values with differetn display types
 * like simple text or a bar, or a bars created by images, etc
 */
export class HUDSprite extends Sprite
{

    text:string;
    value:number;
    minValue:number;
    maxValue:number;
    paddingX:number;
    paddingY:number;
    textColor:string;
    hudDisplayType:HUDDisplayType;


    constructor( text:string, value?:number )
    {
        super(undefined, undefined);
        this.text = text?text:"";
        this.value = value?value:0;
        this.maxValue = 0;
        this.minValue = 0;
        this.paddingX = 5;
        this.paddingY = -10;
        this.textColor = "white";
        this.hudDisplayType = HUDDisplayType.TEXT;
    }


    render(ctx: CanvasRenderingContext2D): void 
    {
        if( this.visible )
        {
            ctx.save();

            if( this.alpha < 1 )
                ctx.globalAlpha = this.alpha; 

            if( this.angle != 0 || this.xScale != 1 || this.yScale != 1 )
            {
                ctx.translate( this.points[0].x + this.w/2, this.points[0].y + this.h/2 );
                ctx.rotate( this.angle );
                ctx.scale( this.xScale, this.yScale );
                ctx.translate( -( this.points[0].x + this.w/2 ), -( this.points[0].y + this.h/2 ) );
            }

            /// @TODO here check some effect updates 
            this.drawHUD(ctx);

            ctx.restore();

        }///

    }


    drawHUD(ctx: CanvasRenderingContext2D): void
    {

        switch( this.hudDisplayType )
        {

            case HUDDisplayType.TEXT:
                ctx.fillStyle = this.textColor;
                ctx.fillText( `${this.text} ${this.value}`, this.points[0].x , this.points[0].y );
            break;

            case HUDDisplayType.BAR:
                ctx.fillStyle = this.textColor;
                ctx.fillRect( this.points[0].x, this.points[0].y, this.w, this.h );
            break;

            case HUDDisplayType.ICON:
                ctx.drawImage( this.image, this.points[0].x, this.points[0].y );
            break;

            case HUDDisplayType.ICONTEXT:
                ctx.drawImage( this.image, this.points[0].x, this.points[0].y );
                ctx.fillStyle = this.textColor;
                ctx.fillText( `${this.value}`, this.points[0].x+this.image.width + this.paddingX, 
                                               this.points[0].y+this.image.height + this.paddingY );
            break;
        }

    }

}