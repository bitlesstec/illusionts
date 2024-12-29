import { Camera } from "../camera/Camera";
import { FlashOptions } from "./FlashOptions";
import { FlashTarget } from "./FlashTarget";
import { Tween } from "./Tween";

/**
 * it creates a flash effect usually used by the camera measures when is active 
 * ( by default is inactive so you can activate it later )
 * 
 * you can specify the color, duation, pingpong and repeat properties in options,
 * 
 * by default color is white and duration is 30 fps
 * 
 * USAGE:
 * 
 *      const flashOptions = { "duration": 30, "color":"white", "pingpong":false, "repeat":true, }
 * 
 *      this.flashEffect = new FlashEffect( this.camera, flashOptions, ()=>{ this.flashEffect.stop()} );
 *
 *      this.flashEffect.active = true; //can activate after created
 *
 *      this.flashEffect.render(ctx) //call this in render method
 *
 *      this.flashEffect.update() //call this in update method
 */
export class FlashEffect
{

    active: boolean;
    private target: Camera | FlashTarget;
    private tween: Tween;
    private alpha: number;
    private color: string;
    private duration:number;
    

    constructor(target: Camera | FlashTarget, options?:FlashOptions, onComplete?: () => void )
    {
        this.target=target
        this.alpha = 0;
        this.color="#FFF"; //white by default
        this.active = false;

        let pingPong:boolean = false;
        let repeat:boolean = false;


        if( options )
        {
            this.duration = options.duration > 0? options.duration : 30; //30 fps for flash its fine
            this.color = options.color || "#FFFFFF";
            pingPong = options.pingpong || false;
            repeat = options.repeat || false;
        }

        this.tween = new Tween(
            this,
            [
                { property: "alpha", initValue: 1, endValue: 0 } // Alpha de opaco a transparente
            ],
            this.duration,
            Tween.Easings.linear,
            () => 
            {
                if (pingPong) 
                {
                    this.tween.reset([ { property: "alpha", "initValue":1, "endValue":0 } ]);
                } 
                else if (repeat) 
                {
                    this.tween.reset(); // restarts tween
                }
                 else 
                {
                    this.active = false; // deactivate tween if there is no repetition
                }
                //always execute callback if set, it can be used to stop the flash from the callback
                //if necesary
                if (onComplete) onComplete(); // Llama al callback
            }
        );

    }

    update():void  {
        if (this.active && this.tween)
        {
            this.tween.update();
        }
    }

    /**
     * this will only draw rect at filled color the time flashing is lasting
     * @param ctx 
     */
    render(ctx: CanvasRenderingContext2D) 
    {
        if (this.active && this.alpha > 0) 
        {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;

            if( this.target instanceof Camera )
            {
                ctx.fillRect(
                    this.target.viewX, 
                    this.target.viewY, 
                    this.target.viewWidth, 
                    this.target.viewHeight 
                );
            }
            else
            {
                ctx.fillRect(
                    this.target.x, 
                    this.target.y, 
                    this.target.w, 
                    this.target.h
                );
            }
            ctx.restore();
        }
    }

    stop() 
    {
        if (this.tween) {
            this.tween.active = false;
        }
        this.active = false;
        this.alpha = 0;
    }

}