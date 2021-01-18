import { Point } from "./Point.js";

export class Tile extends Point
{
    w:number;
    h:number;
    imageIndex:number;

    constructor( x:number, y:number, w:number, h:number, imageIndex:number )
    {
        super(x,y);
        this.w = w;
        this.h = h;
        this.imageIndex = imageIndex;
    }

}//