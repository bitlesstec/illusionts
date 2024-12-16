

// type EasingFunction = (t: number) => number;

import { TweenOptions } from "./TweenOptions";
import { TweenResetOptions } from "./TweenResetOptions";

/**
 * this class can create different kind of interpolations,
 * it can be used to put some interesting effects in some properties like
 * alpha, x, y, w, xScale, yScale, etc.
 * USAGE:
 * 
 * moveTween:Tween; //init()
 * 
 * //moving spr x position from 50 to 600 at 240 steps, using smoothstep
 * this.moveTween = new Tween( this.spr, "x", 50, 600, 240, Tween.Easings.smoothstep  ); 
 * 
 * this.moveTween.update()//finally call this in update()
 * 
 */
export class Tween {

    static Easings: { [key: string]: (t: number) => number } =
        {
            //==linear movement
            // Linear progression with no acceleration or deceleration.
            linear: (t: number) => t,

            //==accelerations
            // Accelerates from zero velocity (starts slow, ends faster).
            easeInQuad: (t: number) => t * t,

            // Decelerates to zero velocity (starts fast, ends slow).
            easeOutQuad: (t: number) => t * (2 - t),

            // Accelerates more aggressively from zero velocity.
            acceleration: (t: number) => Math.pow(t, 2),

            // Very aggressive acceleration from zero velocity.
            accelerationCubed: (t: number) => Math.pow(t, 3),


            //==decelerations
            // Decelerates more aggressively to zero velocity.    
            deceleration: (t: number) => 1 - Math.pow(1 - t, 2),

            // Very aggressive deceleration to zero velocity.
            decelerationCubed: (t: number) => 1 - Math.pow(1 - t, 3),

            //==smooth movement
            // The velocity is highest at the midpoint.
            smoothstep: (t: number) => t * t * (3 - 2 * t),

            // A more pronounced version of smoothstep, emphasizing the midpoint.
            smoothstepSquared: (t: number) => Math.pow((t * t * (3 - 2 * t)), 2),

            // An even stronger version of smoothstep, with more extreme acceleration and deceleration.
            smoothstepCubed: (t: number) => Math.pow((t * t * (3 - 2 * t)), 3),

            //==combined
            // Starts slow, reaches maximum velocity at the midpoint, and slows down again.
            easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,

            //==sine based
            // Gradually accelerates to maximum velocity using a sine curve.
            sine: (t: number) => Math.sin(t * Math.PI / 2),

            // Sine curve with stronger acceleration and deceleration.
            sineSquared: (t: number) => Math.pow(Math.sin(t * Math.PI / 2), 2),

            // Very strong sine-based acceleration and deceleration.
            sineCubed: (t: number) => Math.pow(Math.sin(t * Math.PI / 2), 2),

            // Gradually decelerates from maximum velocity using a sine curve.
            inverseSine: (t: number) => 1 - Math.sin((1 - t) * Math.PI / 2),

            // Sine curve-based deceleration with stronger effect.
            inverseSineSquared: (t: number) => 1 - Math.pow(Math.sin((1 - t) * Math.PI / 2), 2),

            // Very strong sine-based deceleration.
            inverseSineCubed: (t: number) => 1 - Math.pow(Math.sin((1 - t) * Math.PI / 2), 3),
            // sineComplete : (t:number) => 0.5 - Math.cos(-t * Math.PI) * 0.5, it is more extensive for CPU not using it...
        };


    private object: any; //this is the object to change their properties
    private tweenOptions:TweenOptions[];
    private duration: number;
    private easing: (t: number) => number;
    private frameCounter: number;
    private onComplete: (() => void) | null;
    public active: boolean;//used to stop tweening update


    constructor(
        object: any,
        tweenOptions:TweenOptions[],
        duration:number,
        easing: (t: number) => number, // Por defecto, lineal
        onComplete: (() => void) | null = null) 
    {
        this.object = object;
        this.tweenOptions = tweenOptions;
        this.duration = duration;
        this.easing = easing;
        this.frameCounter = 0;
        this.onComplete = onComplete;
        this.active = true;
    }

    update():any
    {
        if( !this.active ) return;

        let interValue = undefined;
        
        if (this.frameCounter < this.duration) 
        {
            const normalizedTime = this.frameCounter / this.duration;
            const curvedTime = this.easing(normalizedTime); //here i can put spline

            for( const option of this.tweenOptions )
            {
                const { property, initValue, endValue } = option;
                const interValue = initValue * (1 - curvedTime) + endValue * curvedTime;
                this.object[property] = interValue;
            }
     
            this.frameCounter++;
        } 
        else 
        {
            this.active = false;

            if( this.onComplete )
            {
                this.onComplete();
            }
           
        }
        return interValue;
    }

    reset( resetOptions?: TweenOptions[]):void
    {
        if( resetOptions )
        {
        // Update tweenOptions with new values if provided
        this.tweenOptions = resetOptions;
        }

        this.frameCounter = 0;
        this.active = true;
    }

    setOnComplete( callback: () => void ): void 
    {
        this.onComplete = callback;
    }

}