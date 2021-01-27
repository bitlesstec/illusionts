
/**
 * this interface define methods to set animations
 * in sprites
 */
export interface Animationable
{
    // updateSubanimation():void;
    setAnimationFrames( initialFrame:number, finalFrame:number):void;
}