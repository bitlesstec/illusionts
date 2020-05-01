import { Sprite } from "../graphic/sprite.js";


/**
 * this class is a singleton that will be used in the level, 
 * if you want to use your own collision library or BOX2dJs then
 * this class wont becalled and wont be used memory that is the main
 * reason is a singleton
 */
export class CollisionUtil
{

private static instance: CollisionUtil;

private constructor(){};

public static getInstance()
{
    if( !this.instance )
    { this.instance = new CollisionUtil(); }
    return  this.instance;
}


/**
 * return the distance betwen 2 points (p1,w1) & (p2,w2)
 * @param p1 t
 * @param w1 
 * @param p2 
 * @param w2 
 */
getDistance( p1:number, w1:number, p2:number, w2:number ):number
{
return( p2 + w2/2) - (p1 + w1/2);
}

getMagnitude( x:number, w:number, y:number, h:number,
              x2:number, w2:number, y2:number, h2:number ):number
{
  let  vx:number = this.getDistance( x, w, x2, w2 );
  let  vy:number = this.getDistance( y, h, y2, h2 );
return Math.sqrt( ( vx * vx) + ( vy * vy ) );
}
/**
 * 
 * @param half1 
 * @param half2 
 */
getCombinedHalf( half1:number, half2:number ):number
{
    return( half1/2 ) + ( half2/2 );
}


/**
 * 
 * @param value1 
 * @param value2 
 */
isOverlaped( value1:number, value2:number ):boolean
{
return (  Math.abs( value1 ) < value2 );
}

/**
 * return true if the box defined (x, y,w, h) is inside or 
 * in the margin of the box defined by (x2, y2,w2, h2)
 * @param x 
 * @param y 
 * @param w 
 * @param h 
 * @param x2 
 * @param y2 
 * @param w2 
 * @param h2 
 */
isInside( x:number,  y:number ,  w:number,  h:number, 
          x2:number, y2:number , w2:number, h2:number ):boolean
{
    return ( x >= x2 && x+w <= x2+w2 && y >= y2 && y+h <= y2+h2 ); 
}







/**
 * returns true if the point defined by X & Y is inside the area
 * of x2, y2, w2, h2 ( a rectangle or square )
 * @param x 
 * @param y 
 * @param x2 
 * @param y2 
 * @param w2 
 * @param h2 
 */
pointCollision( x:number, y:number,
                x2:number,y2:number,w2:number,h2:number ):boolean
{
    return (x >= x2  && x <= x2 + w2 &&
            y >= y2 && y <= y2 + h2 );
}


/**
 * this will check if there is a collision with point defined by X & Y
 * and Sprite
 * @param x 
 * @param y 
 * @param spr 
 */
spritePointCollision( x:number, y:number, spr:Sprite):boolean
{
    return this.pointCollision( x, y, spr.x, spr.y, spr.w, spr.h );
}//


/**
 * returns true if there is a collision between 2 circles
 * @param cenx 
 * @param ceny 
 * @param rad 
 * @param cenx2 
 * @param ceny2 
 * @param rad2 
 */
circleCollision( cenx:number, ceny:number, rad:number, 
                 cenx2:number, ceny2:number, rad2:number ):boolean
{
    let magnitude:number =  this.getMagnitude( cenx, 0, ceny, 0, cenx2, 0, ceny2, 0 );
                    
    //get total radio of two circles
    let totalRadio:number = rad + rad2;
 
    return magnitude < totalRadio;
}





spriteCircleColision( spr:Sprite, cenx:number, ceny:number, rad:number, fixOverlap:boolean = true ):boolean
{
let vx:number = (spr.x + spr.w/2) - cenx;
let vy:number = (spr.y + spr.h/2) - ceny;

 //calculate distance between circles
let magnitude:number = Math.sqrt( (vx * vx) + (vy * vy) );
           
 //get total radio of two circles
 let totalRadio:number = spr.w/2 + rad;

 let res:boolean = magnitude < totalRadio;

    if( fixOverlap && res )
    {
    let overlap:number = totalRadio - magnitude;

    let dx:number = vx / magnitude;
    let dy:number = vy / magnitude;

    spr.x += overlap * dx;
    spr.y += overlap * dy;
    }

return res;
}

/**
 * this will check if there is a circle collision between 2 sprites
 * @param spr1 
 * @param spr2 
 * @param fixOverlap 
 */
spritesCircleCollision( spr1:Sprite, spr2:Sprite, fixOverlap:boolean = true):boolean
{
return this.spriteCircleColision( spr1, 
    spr2.x + spr2.w/2, spr2.y + spr2.h/2, spr2.w/2, fixOverlap);
}

/**
 *  check if there is a collision between 2 rectangles
 * @param x 
 * @param y 
 * @param w 
 * @param h 
 * @param x2 
 * @param y2 
 * @param w2 
 * @param h2 
 */
rectangleCollision( x:number,y:number,w:number,h:number,
                    x2:number,y2:number,w2:number,h2:number )
{

let combinedHalfWidth:number = (w / 2) + (w2 / 2);
let combinedHalfHeight:number =(h / 2) + (h2 / 2);

return ( Math.abs( this.getDistance( x, w, x2, w2 ) ) < combinedHalfWidth && 
         Math.abs( this.getDistance( y, h, y2, h2 ) ) < combinedHalfHeight  );
}//

/**
 * check if there is a rectangle collision (bounding boxes) between 2 sprites
 * @param spr1 
 * @param spr2 
 */
spriteRectangleCollision( spr1:Sprite, spr2:Sprite ):boolean
{
return this.rectangleCollision( spr1.x, spr1.y, spr1.w, spr1.h, 
                                spr2.x, spr2.y, spr2.w, spr2.h );
}

/**
 * this will check if there is a collision between sprite 1 and sprite 2
 * if so, and push is true, then sprite 2 will be pushed by 1px
 * if push argument is false, then this method will return the side 
 * where the collision occured
 * @param spr1 
 * @param spr2 
 * @param push 
 */
sideAndPushCollision( spr1:Sprite, spr2:Sprite, push:boolean = false ):string
{
    
let collisionSide:string = "none";

let vx:number = this.getDistance( spr2.x, spr2.w, spr1.x, spr1.w );
let vy:number = this.getDistance( spr2.y, spr2.h, spr1.y, spr1.h );

let combinedHalfWidth = this.getCombinedHalf( spr1.w, spr2.w );
let combinedHalfHeight= this.getCombinedHalf( spr1.h, spr2.h );

let vxabs = Math.abs( vx );
let vyabs = Math.abs( vy );

        if( (vxabs < combinedHalfWidth) && (vyabs < combinedHalfHeight) )
        {

        let overlapX = combinedHalfWidth  - vxabs; 
        let overlapY = combinedHalfHeight - vyabs;
            
            if( overlapX >= overlapY )
            {
                    if( vy > 0 )
                    {
                        collisionSide = "top";
                        if( push )spr2.y-=1; 
                        spr1.y+= overlapY;//   setY(s1.getY() + overlapY);
                    }
                    else
                    {
                        collisionSide = "bottom";
                        if( push )spr2.y+=1;//   .setY(spr2.getY()+1);
                        spr1.y-= overlapY;//   setY(spr1.getY() - overlapY);
                    }

            }
            else
                {

                        if( vx > 0 )
                        {
                            collisionSide = "left";
                            if( push )spr2.x-=1;//   setX(spr2.getX()-1);
                            spr1.x+=overlapX;         //  setX( spr1.getX() + overlapX );
                        }
                        else
                        {
                            collisionSide = "right";
                           if( push )spr2.x+=1;  //setX(spr2.getX()+1);
                           spr1.x-=overlapX;    //setX(spr1.getX()-overlapX);
                        }

                }//

        }
        return collisionSide;
}//


}//