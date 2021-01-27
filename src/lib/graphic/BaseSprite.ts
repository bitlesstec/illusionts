
import { BaseShape } from "./shape/BaseShape.js";

export abstract class BaseSprite2 extends BaseShape
{

    //coordinates, x, y, width and height
    x:number;
    y:number;
    w:number;
    h:number;
   
   
    constructor()
    {
        super();
        this.x = 0;
        this.y = 0;
        this.w = 1;
        this.h = 1;
    }//

    render(ctx: CanvasRenderingContext2D): void {}

   
}//
