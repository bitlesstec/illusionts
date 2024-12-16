import { BaseShape } from "../graphic/shape/BaseShape";
import { BaseEffect } from "./BaseEffect";
import { EffectType } from "./EffectType";
import { Tween } from "./Tween";


/**
 * this will create a FADE-IN or FADE-OUT effect, will update the alpha property of passed object
 * using a tween object
 * 
 * USAGE:
 * const fadeEffect = new FadeEffect(
    sprite,
    "fadein",
    60,
    true,  // Ping-Pong activated
    false, // without repeating
    () => console.log("Ping-Pong transition completed")
);

// in game loop update
fadeEffect.update();
 * 
 * 
 * @TODO check if i can use this as baseEffect class to create multiple effects and not just fade in out, but pulse, etc
 */
export class FadeEffect<T extends BaseShape> extends BaseEffect
{


    constructor( spr:T, effectType: EffectType , durFrames:number = 60, pingPong: boolean = false, repeat: boolean = false, onComplete?: () => void)
    {
        super();

        this.effectType = effectType;
        this.durFrames = durFrames;
        this.pingPong = pingPong;
        this.repeat = repeat;
        
       
        const initValue = effectType === EffectType.FADE_IN?0:1;
        const endValue = effectType === EffectType.FADE_IN?1:0; 


        const tweenOption = [
            { "property":"alpha", "initValue":initValue ,"endValue":endValue }
          ]

        this.tween =  new Tween( spr,tweenOption, durFrames, 
            Tween.Easings.easeInQuad,
            () => {
                this.handleCompletion(onComplete);
            } );   
    }

    protected handleCompletion(onComplete?: () => void): void 
    {
        if (onComplete) onComplete();

        if (this.pingPong) 
        {
            // alternate between fadein and fadeout
            this.effectType = this.effectType === EffectType.FADE_IN ? EffectType.FADE_OUT : EffectType.FADE_IN;
            this.resetTween();
        } 
        else if (this.repeat) 
        {
            //repeat same effect
            this.resetTween();
        }
    }

    private resetTween(): void 
    {
        const initValue = this.effectType === EffectType.FADE_IN ? 0 : 1;
        const endValue = this.effectType === EffectType.FADE_IN ? 1 : 0;

        this.tween.reset( [{ "property":"alpha", "initValue":initValue , "endValue":endValue }] );
    }


    update()
    {
        this.tween.update();
    }

    reset(): void {
        this.tween.reset();
    }

}