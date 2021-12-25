import { BaseTile } from "./BaseTile.js";


export class Tile extends BaseTile
{
    srcX:number;
    srcY:number;

    constructor( x:number, y:number, w:number, h:number, srcX:number, srcY:number, index:number )
    {
        super(x,y,w,h,index);
        this.srcX = srcX;
        this.srcY = srcY?srcY:0;
    }

}//