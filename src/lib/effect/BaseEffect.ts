import { EffectType } from "./EffectType";
import { Tween } from "./Tween";


/**
 * this will act as base class for multiple effects in this package
 */
export abstract class BaseEffect
{

    protected tween: Tween;
    protected effectType:EffectType;
    protected durFrames: number;
    protected pingPong: boolean;
    protected repeat: boolean;
    protected initValue:number;
    protected endValue:number;
    protected property :string;


    protected handleCompletion(onComplete?: () => void): void 
    {
        if (onComplete) onComplete();
    }

}