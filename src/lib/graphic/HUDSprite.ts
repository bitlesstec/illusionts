
import { Expirable } from "../ntfc/Expirable.js";
import { HUDDisplayType } from "./HUDDisplayType.js";
import { ImageMeasures } from "./ImageMeasures.js";
import { Point } from "./Point.js";
import { Sprite } from "./Sprite.js";

/**
 * this class represent a HUD object to display
 * text and values with differetn display types
 * like simple text or a bar, or a bars created by images, etc
 */
export class HUDSprite extends Sprite
                        implements Expirable
{

    text:string;
    value:number;
    minValue:number; //if !=0 this is the minimal value acepted
    maxValue:number; //if !=0 this is the maximun value acepted
    paddingX:number; //used to adjust x position of value when ICONTEXT used
    paddingY:number; //used to adjust y position of value when ICONTEXT used
    textColor:string;
    hudDisplayType:HUDDisplayType;


    constructor(image:HTMLImageElement, imgMeasures:ImageMeasures, type?:HUDDisplayType, text?:string, value?:number )
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
    


    render(ctx: CanvasRenderingContext2D,frame?:number, position?:Point): void 
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
            //if this was instantiated with an image then it is possible to draw at certain frame
            if( this.hudDisplayType === HUDDisplayType.IMAGE && frame !== undefined)
            {
                const xx:number = position?position.x: Math.floor( this.getX() );
                const yy:number = position?position.y: Math.floor( this.getY() );

                ctx.drawImage(
                this.image,
                this.srcX + ( frame * this.w), this.srcY, //srcX changes inside updateAnimation()
                this.w, this.h,
                xx, yy,
                this.dstW, this.dstH);
            }
            else
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
                ctx.fillText( `${this.text}${this.value}`, this.points[0].x , this.points[0].y );
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

    }//

    /**
     * this sets the ammount of steps this object will be present,
     * this will reuse sprite variables:
     * animationStep: current counter of steps 
     * animationStepLimit: maximum limit (object life in steps)
     * @param stepLimit 
     */
    setExpiration(stepLimit: number): void 
    {
        this.animationStep = 0;
        this.animationStepLimit = stepLimit;
    }//

    /**
     * to make this object dissapear after certain ammount of steps
     * passed, this method should be called in level.update
     * NOTE: this will execute meanwhile object is visible
     * executable can be a lambda that can update some properties of
     * the object, like decreasing alpha, changing text color, rotate,
     * moving left or right, etc.
     * @param executable 
     */
    expire(executer = function(){}): void {
        if(this.visible)
        {
            // console.log("ISVISIBLE: "+this.animationStep)
            if( ++this.animationStep >= this.animationStepLimit )
            {
                this.animationStep=0;
                this.visible = false;
            }
            //execute custom code in a lambda
            executer();
        }
    }//


}