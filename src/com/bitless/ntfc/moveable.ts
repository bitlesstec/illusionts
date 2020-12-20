
export interface Moveable
{
    /**
     * to move an object on both axis, arguments will be added 
     * to object X & Y positions
     * @param xspd 
     * @param yspd 
     */
    move( xspd:number, yspd:number ):void;

    /**
     * to move some object in X Axis
     * @param x 
     */
    moveX( x:number ):void;

    /**
     * to move some object in Y Axis
     * @param y 
     */
    moveY( y:number ):void;
}