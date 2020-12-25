
/**
 * this interface provides touchable eventHandler methods
 * 
 * Event	Description
touchstart	Fired when the user puts one or more fingers on the screen.
touchmove	Fired while the user moves the finger(s) over the screen while touching it.
touchend	Fired when the user stops touching the screen.
touchleave	Fired when the user moves their fingers outside of the area listening for touch events.
touchcancel	Fired when a touch gesture is canceled, for instance if the user moves her fingers outside of the screen itself.
 */
export interface Touchable
{
touchStart( event: TouchEvent ):void;
touchMove( event: TouchEvent ):void;
touchEnd( event: TouchEvent ):void;
touchLeave( event: TouchEvent ):void;
touchCancel( event: TouchEvent ):void;
}