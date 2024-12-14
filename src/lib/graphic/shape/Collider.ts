import { Point } from "../Point";
import { Sprite } from "../Sprite";
import { BaseShape } from "./BaseShape";


/**
 * this can be used as support on sprites when
 * the sprite can have several points/shapes 
 * where can collide
 */
export class Collider extends BaseShape
{

   w:number;
   h:number;
   dstW:number;
   dstH:number;
   
   parent:Sprite;
   //type:string;

    constructor( x:number, y:number, w:number, h:number, parent?:Sprite )
    {
    super();
    this.updateCollider(x,y,w,h,parent);
    this.dstW = w;
    this.dstH = h;
    }

    getX():number{
        const xx = this.parent?this.parent.getX():0;
        return xx+this.points[0].x;
    }

    getY():number{
        const yy = this.parent?this.parent.getY():0;
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
        this.dstW=w;
        this.dstH=h;
        //an sprite (parent) can have multiple colliders inside, if so
        //x & y coordinates will be afected by parent.x and parent.y
        this.parent=parent?parent:undefined;
     
    }


}