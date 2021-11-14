import { Config } from "../cfg/Config.js";
import { Point } from "../graphic/Point.js";
import { Sprite } from "../graphic/Sprite.js";
import { GameManager } from "../manager/GameManager.js";

/**
 * this class is an utility class to use in mouse or touch events, to know
 * wheter there is a click or touch event, it also saves point pressed coordinates (X & Y)
 * and point released coordinates, it also contains some utilities to check for swipe actions
 */
export class PointerControl
{

    pointPressed:Point;
    pointReleased:Point;

    isPressed:boolean;
    isReleased:boolean;

    //below can be used to check when is was pressed and released to get
    //elapsed time between those, i dont have a use for them right now
    startTime:number;
    endTime:number;

    constructor()
    {
        this.pointPressed = new Point();
        this.pointReleased = new Point();
    }

    pointerPressed(e:MouseEvent|TouchEvent)
    {
        this.pointPressed = this.getFixedMouseXY(e);
        this.isPressed = true;
        this.isReleased = false;
    }

    pointerReleased(e:MouseEvent|TouchEvent)
    {
        this.pointReleased = this.getFixedMouseXY(e);
        this.isPressed = false;
        this.isReleased = true;
    }

    pointerMove(e:MouseEvent|TouchEvent)
    {
        this.pointPressed = this.getFixedMouseXY(e);
        this.isPressed = true; //should it be false?
        this.isReleased = false;
    }

    /**
     * sometimes mouseX and mouseY are little different cause the canvas is in
     * a different position and those values are relative to it
     * @param e 
     */
    private getFixedMouseXY(e:MouseEvent|TouchEvent):Point
    {
        let boundingRect = GameManager.getInstance().canvas.getBoundingClientRect();
        let eX=0;
        let eY=0;
        if(e.type ==="touchend" && e instanceof TouchEvent)
        {
            eX = e.changedTouches[0].clientX; eX-=boundingRect.left;
            eY = e.changedTouches[0].clientY; eY-=boundingRect.top;
        }
        else
        {
            //getting coordinates from Mouse or Touch events
            eX = e instanceof MouseEvent? e.clientX : e.touches[0].clientX; eX-=boundingRect.left;
            eY = e instanceof MouseEvent? e.clientY : e.touches[0].clientY; eY-=boundingRect.top;
        }
          
        //if canvas is scaled i have to divide mouse corrdinates by scale
        eX = GameManager.getInstance().xScale !== 1?eX/GameManager.getInstance().xScale : eX;
        eY = GameManager.getInstance().yScale !== 1?eY/GameManager.getInstance().yScale : eY;

        return new Point(eX, eY);
    }

    /**
     * this will check distance between this.pointReleased.x and this.pointPressed.x against minDistance
     * if pointDistance is bigger than minDistance then swipe action ocurred, 
     * if pointReleased.x > pointPressed.x then is SWIPE RIGHT
     * if pointReleased.x < pointPressed.x then is SWIPE LEFT
     * @param minDistance 
     * @returns 
     */
    swipeXAxis( minDistance:number ):number
    {
        let res:number=-1;
        let dx:number = this.getPointDistance( this.pointReleased.x, this.pointPressed.x );
        if(dx > minDistance )
        {
            if( this.pointReleased.x > this.pointPressed.x) res = Config.SWIPTE_RIGHT;
            else if( this.pointReleased.x < this.pointPressed.x) res = Config.SWIPTE_LEFT;
        }

        return res;
    }

    /**
     * this will check distance between this.pointReleased.y and this.pointPressed.y against minDistance
     * if pointDistance is bigger than minDistance then swipe action ocurred, 
     * if pointReleased.y > pointPressed.y then is SWIPE DOWN
     * if pointReleased.y < pointPressed.y then is SWIPE UP
     * @param minDistance 
     * @returns 
     */
    swipeYAxis( minDistance:number ):number{
        let res:number = -1;
        let dy:number = this.getPointDistance(this.pointReleased.y, this.pointPressed.y);

        if( dy > minDistance )
        {
            if( this.pointReleased.y > this.pointPressed.y) res = Config.SWIPTE_DOWN;
            else if( this.pointReleased.y < this.pointPressed.y) res = Config.SWIPTE_UP;
        }

        return res;
    }

    /**
     * check if swipe action is ocurred in right direction
     * suggestion: this can be used in touchEnd | mouseUp
     * and touchMove | mouseMove should not be enabled
     * @param minDistance 
     * @returns 
     */
    swipeRight( minDistance:number ):boolean{
        return this.swipeXAxis( minDistance ) === Config.SWIPTE_RIGHT;
    }

    /**
     * check if swipe action is ocurred in left direction
     * suggestion: this can be used in touchEnd | mouseUp
     * and touchMove | mouseMove should not be enabled
     * @param minDistance 
     * @returns 
     */
    swipeLeft( minDistance:number ):boolean{
        return this.swipeXAxis( minDistance ) === Config.SWIPTE_LEFT;
    }

    /**
     * check if swipe action is ocurred in up direction
     * suggestion: this can be used in touchEnd | mouseUp
     * and touchMove | mouseMove should not be enabled
     * @param minDistance 
     * @returns 
     */
    swipeUp( minDistance:number ):boolean{
        return this.swipeYAxis( minDistance ) === Config.SWIPTE_UP;
    }

    /**
     * check if swipe action is ocurred in down direction
     * suggestion: this can be used in touchEnd | mouseUp
     * and touchMove | mouseMove should not be enabled
     * @param minDistance 
     * @returns 
     */
    swipeDown( minDistance:number ):boolean{
        return this.swipeYAxis( minDistance ) === Config.SWIPTE_DOWN;
    }

    /**
     * this will get the result of destination - origin
     * @param origin 
     * @param destination 
     * @returns destination - origin
     */
    getPointDistance( origin:number, destination:number ):number
    {
     return Math.abs( destination - origin );   
    }


    /**
     * this is used as a base to check if some Point is located
     * between bounds of a Rect defined by x, y, w, h
     */
    providedArea( point:Point, x:number, y:number, w:number, h:number ):boolean
    {
        return point.x >= x && point.x <= x+w && point.y >= y && point.y <= y+h;
    }


    /**
     * this will return true if some area defined by Rect (x,y,w,h) is
     * presed by pointPressed
     * @param x 
     * @param y 
     * @param w 
     * @param h 
     * @returns 
     */
    areaPressed(x:number, y:number, w:number, h:number):boolean
    {
        return this.providedArea( this.pointPressed,x, y,w,h) && this.isPressed;
    }

     /**
     * this will return true if some area defined by Rect (x,y,w,h) is
     * released by pointReleased
     * @param x 
     * @param y 
     * @param w 
     * @param h 
     * @returns 
     */
    areaReleased(x:number, y:number, w:number, h:number):boolean
    {
        return this.providedArea( this.pointReleased,x, y,w,h) && this.isReleased;
    }


    /**
     * returns true if pointPressed is inside bounding rect of an sprite
     * @param spr 
     * @returns 
     */
    spritePressed(spr:Sprite):boolean
    {
        return this.providedArea( this.pointPressed, spr.getX(), spr.getY(), spr.w, spr.w) && this.isPressed;
    }

    /**
     * returns true if pointReleased is inside bounding rect of an sprite
     * @param spr 
     * @returns 
     */
    spriteReleased(spr:Sprite):boolean
    {
        return this.providedArea( this.pointReleased, spr.getX(), spr.getY(), spr.w, spr.w) && this.isReleased;
    }


}