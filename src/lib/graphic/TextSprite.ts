import { BaseSprite } from "./BaseSprite.js";
import { Renderable } from "../ntfc/Renderable.js";
import { GameManager } from "../manager/GameManager.js";



/**
 * this class creates text that can be displayed as HUD
 * you can grow and shrink as well change color of this text
 * is more usable than just put text directly in ctx.fillText.
 */
export class TextSprite extends BaseSprite
                    implements Renderable
{

    private message:string;
    color:string;
    fillText:boolean; //to know if text will be filled or stroked when rendered
    maxWidth:number;//to set the maximum width of the text


    constructor( message:string )
    {
    super();
    this.message="";
    this.setMsg( message );
    this.color = "#FFF";
    this.fillText = true;
    this.maxWidth = 0;
    }

    /**
     * method used to update the current message of this TextObject, 
     * width and height may change
     * @param message 
     */
    setMsg( message:string )
    {
        this.message = message;
        this.w = 1;
        this.h = 1;

        if( message !== "" )
        {
            let metrics = GameManager.getInstance().context.measureText( message );
            this.w = metrics.width;
            this.h = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        }

    }

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

                this.drawText( ctx );

                ctx.restore();
            }
            else
            {
                this.drawText( ctx );
            }
            
        }//

    }//


    drawText( ctx: CanvasRenderingContext2D )
    {
        if(this.fillText)
        {
            ctx.fillStyle = this.color;
            ctx.fillText( this.message, this.x, this.y );
        }
        else
        {
            ctx.strokeStyle = this.color;
            ctx.strokeText( this.message, this.x, this.y );
        }

    }


}