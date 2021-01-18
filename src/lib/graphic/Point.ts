

/**
 * this class is the basic representation of any graphic entity image based
 * @NOTE to me: maybe can be called SpritePoint
 */
export class Point
{
    x:number;
    y:number;

    constructor(xCoord?:number, yCoord?:number )
    {
        this.x = xCoord? xCoord: 0;
        this.y = yCoord? yCoord: 0;
    }

}