import { Config } from "../cfg/Config.js";
import { Point } from "../graphic/Point.js";
import { Sprite } from "../graphic/Sprite.js";
import { GameManager } from "../manager/GameManager.js";


export class MouseControl
{

    pointPressed:Point;
    pointReleased:Point;

    isPressed:boolean;
    isReleased:boolean;

    constructor()
    {
        this.pointPressed = new Point();
        this.pointReleased = new Point();
    }

    mousePressed(e:MouseEvent)
    {
        this.pointPressed = this.getFixedMouseXY(e);
        this.isPressed = true;
        this.isReleased = false;
    }

    mouseReleased(e:MouseEvent)
    {
        this.pointReleased = this.getFixedMouseXY(e);
        this.isPressed = false;
        this.isReleased = true;
    }

    mouseMove(e:MouseEvent)
    {
        this.pointPressed = this.getFixedMouseXY(e);
        this.isPressed = true;
        this.isReleased = false;
    }

    /**
     * sometimes mouseX and mouseY are little different cause the canvas is in
     * a different position and those values are relative to it
     * @param e 
     */
    private getFixedMouseXY(e:MouseEvent):Point
    {
        let boundingRect = GameManager.getInstance().canvas.getBoundingClientRect();

        let eX = e.clientX - boundingRect.left;
        let eY = e.clientY - boundingRect.top;
        return new Point(eX, eY);
    }

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


    swipeRight( minDistance:number ):boolean{
        return this.swipeXAxis( minDistance ) === Config.SWIPTE_RIGHT;
    }

    swipeLeft( minDistance:number ):boolean{
        return this.swipeXAxis( minDistance ) === Config.SWIPTE_LEFT;
    }

    swipeUp( minDistance:number ):boolean{
        return this.swipeYAxis( minDistance ) === Config.SWIPTE_UP;
    }

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