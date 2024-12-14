import { Config } from "../../cfg/Config";
import { Moveable } from "../../ntfc/Moveable";
import { Positionable } from "../../ntfc/Positionable";
import { Renderable } from "../../ntfc/Renderable";
import { Point } from "../Point";


export abstract class BaseShape
    implements Positionable, Moveable, Renderable
{
    points:Point[];//these are points for figures
    fillColor:string;
    strokeColor:string;
    strokeLineWidth:number;
    displayOutline:boolean;

    //speed values
    spdX: number;
    spdY: number;

    id:number; //id for this object
    angle:number; //rotation from 0 to 360
    alpha:number; //from 0 to 1
    visible:boolean;// to know if is visible in screen
    xScale:number; // changes the scale on X axis, default 1
    yScale:number; // changes the scale on Y axis, default 1
    label:string;

    /**
     * by default true;
     * if enable = false, means update or render won't be executed
     * this will disable the instance from Game point of view used
     * for instance to disable all instances when game is paused
     * or game state changes
     */
    enable:boolean; 

    /**
     * by default true
     * if active = false, means the instance is still enabled but will be momentanly
     * inactive in the case is out of the view and is waiting to enter
     */
    active:boolean;

    /**
     * pivot is used to decide the center of the sprite
     * by default if you change angle of the sprite, center will
     * be w/2 and h/2, but if pivot is set then the center will be defined
     * x+pivot.x and y+pivot.y
     */
    pivot:Point;

    /**
     * anchor point works for collision tiles where we have slope tiles,
     * so if you gonna use CollisionUtils.tileCollision there may be 
     * solid tiles as 1
     * and slope tiles markes as 2 or 3 for left and/or right slope
     * if you don't have slope tiles you may not use this property 
     */
    anchor:Point;
    
    constructor(basePoint:Point = new Point(0,0) )
    {
        this.id = ++Config.SPRITE_ID_COUNTER;
        this.label = "";
        this.spdX = 0;
        this.spdY= 0;
        this.angle = 0;
        this.alpha = 1;
        this.xScale = 1;
        this.yScale = 1;
        this.visible = true;
        this.points = basePoint?[basePoint]:[new Point(0,0)];

        this.fillColor="#FFF";//white
        this.strokeColor="#EAE";//gray
        this.strokeLineWidth=1;
        this.displayOutline=false;

        this.enable = true;
        this.active = true;

    }

    /**
     * this function will set the sprite X & Y coordinates of the sprite
     * @param x 
     * @param y 
     */
    setPosition(x: number, y: number): void 
    {
        this.points[0].x = x;
        this.points[0].y = y;
    }
    
    /**
     * this method should be used inside LEVEL.UPDATE
     * this method will move the sprite on X and Y axis defined by spdX and spdY
     * if not args are supplied then this will use sprite.spdX and sprite.spdY ,this is
     * usefull when the sprite only have a constant speed, like a bullet or an obstacle
     * @param spdX 
     * @param spdY 
     */
    move(spdX?: number, spdY?: number) 
    {

        if( spdX !== undefined && spdY !== undefined)
        {
            this.moveX( spdX );
            this.moveY( spdY );     
        }
        else
        {
            this.moveX( this.spdX );
            this.moveY( this.spdY );
        }
       
    }
    
    moveX( spdX: number ) 
    {
        this.points[0].x += spdX;
    }

    moveY( spdY: number ) 
    {
        this.points[0].y += spdY;
    }

    render(ctx: CanvasRenderingContext2D): void {}


    getX():number
    {
        return this.points[0].x;
    }
    
    getY():number
    {
        return this.points[0].y;
    }

    setX(x:number)
    {
        return this.points[0].x = x;
    }
    
    setY(y:number)
    {
        return this.points[0].y= y;
    }

    /**
     * Getters y Setters fir x e y, that modify points[0]
     */
    get x(): number {
        return this.points[0].x;
    }

    set x(value: number) {
        this.points[0].x = value;
    }

    get y(): number {
        return this.points[0].y;
    }

    set y(value: number) {
        this.points[0].y = value;
    }
}