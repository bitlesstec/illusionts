import { Point } from "./Point";


/**
 * this is the class where Tile extends and it can be use as tile
 * collider
 */
export class BaseTile extends Point
{
    w:number;
    h:number;
    index:number;

    constructor( x:number, y:number, w:number, h:number, index:number )
    {
        super(x,y);
        this.w = w;
        this.h = h;
        this.index = index;
    }

}//