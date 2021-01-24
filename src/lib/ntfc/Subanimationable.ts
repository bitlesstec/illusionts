
/**
 * this interface define methods to set subanimations
 * in sprites
 */
export interface Subanimationable
{
    updateSubanimation():void;
    setSubanimationFrames( initialFrame:number, finalFrame:number):void;
}