import { Config } from "../../cfg/Config.js";
import { Moveable } from "../../ntfc/Moveable.js";
import { Positionable } from "../../ntfc/Positionable.js";
import { Renderable } from "../../ntfc/Renderable.js";
import { Point } from "../Point.js";


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

    pivot:Point;
    anchor:Point;
    
    constructor(basePoint?:Point)
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
}