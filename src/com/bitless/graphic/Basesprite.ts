
import { Positionable } from "../ntfc/Positionable.js";
import { Moveable } from "../ntfc/Moveable.js";
import { Config } from "../cfg/Config.js";
import { Renderable } from "../ntfc/Renderable.js";

export abstract class BaseSprite 
    implements Positionable, Moveable, Renderable
{

    id: number;
    label: string;
    spdX: number;
    spdY: number;

    x:number;
    y:number;
    w:number;
    h:number;
   
    angle:number; //rotation from 0 to 360
    alpha:number; //from 0 to 1
    visible:boolean;//by default true
    xScale:number; // changes the scale on X axis, default 1
    yScale:number; // changes the scale on Y axis, default 1

    constructor()
    {
        this.id = ++Config.SPRITE_ID_COUNTER;
        this.label = "";
        this.spdX = 0;
        this.spdY= 0;

        this.x = 0;
        this.y = 0;
         this.w = 1;
         this.h = 1;
        this.angle = 0;
        this.alpha = 1;
        this.xScale = 1;
        this.yScale = 1;
        this.visible = true;

    }//

    render(ctx: CanvasRenderingContext2D): void {}

    /**
     * this function will set the sprite X & Y coordinates of the sprite
     * @param x 
     * @param y 
     */
    setPosition(x: number, y: number): void 
    {
        this.x = x;
        this.y = y;
    }

    /**
     * this method should be used inside LEVEL.UPDATE
     * this method will move the sprite on X and Y axis defined by spdX and spdY
     * if not args are supplied then this will use sprite.spdX and sprite.spdY ,this is
     * usefull for when the sprite will have only a constant speed, like a bullet or an obstacle
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
        this.x += spdX;
    }

    moveY( spdY: number ) 
    {
        this.y += spdY;
    }

}//
