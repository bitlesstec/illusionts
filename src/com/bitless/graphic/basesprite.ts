
import { Positionable } from "../ntfc/positionable.js";
import { Moveable } from "../ntfc/moveable.js";
import { Config } from "../cfg/config.js";

export abstract class BaseSprite 
    implements Positionable, Moveable
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
     this.angle = 0;
     this.alpha = 1;
     this.xScale = 1;
     this.yScale = 1;
     this.visible = true;


    }//



    setPosition(x: number, y: number): void 
    {
        this.x = x;
        this.y = y;
    }

    move(spdX: number, spdY: number) 
    {
       this.moveX( spdX );
       this.moveY( spdY );
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
