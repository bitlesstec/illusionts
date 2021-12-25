import { Point } from "../Point.js";
import { Sprite } from "../Sprite.js";
import { BaseShape } from "./BaseShape.js";


/**
 * this can be used as support on sprites when
 * the sprite can have several points/shapes 
 * where can collide
 */
export class Collider extends BaseShape
{

   w:number;
   h:number;
   parent:Sprite;
   //type:string;

    constructor( x:number, y:number, w:number, h:number, parent?:Sprite )
    {
    super();
    this.updateCollider(x,y,w,h,parent);
    }

    getX():number{
        let xx = this.parent?this.parent.getX():0;
        return xx+this.points[0].x;
    }

    getY():number{
        let yy = this.parent?this.parent.getY():0;
        return yy+this.points[0].y;
    }

    /**
     * this function will change collider properties
     * @param x 
     * @param y 
     * @param w 
     * @param h 
     * @param parent 
     */
    updateCollider(x:number, y:number, w:number, h:number, parent?:Sprite)
    {
        this.points[0]=new Point(x,y);
        this.w=w;
        this.h=h;
        //an sprite (parent) can have multiple colliders inside, if so
        //x & y coordinates will be afected by parent.x and parent.y
        this.parent=parent?parent:undefined;
     
    }


}