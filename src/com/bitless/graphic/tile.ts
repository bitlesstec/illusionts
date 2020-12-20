import { Point } from "./Point.js";

export class Tile extends Point
{
    w:number;
    h:number;
    imageIndex:number;

constructor( x:number, y:number, w:number, h:number, imageIndex:number )
{
    super();
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.imageIndex = imageIndex;
}

}//