import { Point } from "./Point.js";

export class Tile extends Point
{
    srcX:number;
    srcY:number;
    w:number;
    h:number;
    imageIndex:number;

    constructor( x:number, y:number, w:number, h:number, srcX:number, srcY:number, imageIndex:number )
    {
        super(x,y);
        this.w = w;
        this.h = h;
        this.srcX = srcX;
        this.srcY = srcY?srcY:0;
        this.imageIndex = imageIndex;
    }

}//