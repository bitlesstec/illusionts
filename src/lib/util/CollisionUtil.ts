import { BaseTile } from "../graphic/BaseTile.js";
import { Point } from "../graphic/Point.js";
import { BaseShape } from "../graphic/shape/BaseShape.js";
import { Collider } from "../graphic/shape/Collider.js";
import { LineShape } from "../graphic/shape/LineShape.js";
import { PolygonShape } from "../graphic/shape/PolygonShape.js";
import { Sprite } from "../graphic/Sprite.js";
import { Tile } from "../graphic/Tile.js";
import { GameManager } from "../manager/GameManager.js";
import { GameState } from "../manager/GameState.js";
import { DevUtil } from "./DevUtil.js";


/**
 * this class is a singleton that will be used in the level, 
 * it provides basic collision stuff...
 * if you want to use your own collision library or BOX2dJs then
 * you dont need to call this class.
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

/**
 * return the total distance (magnitude) of box1( x, y, w, h ) and box2( x2, y2, w2, h2)
 * @param x 
 * @param w 
 * @param y 
 * @param h 
 * @param x2 
 * @param w2 
 * @param y2 
 * @param h2 
 */
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
 * return true if value1 (absolute) is less than value2
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
 * inside the Sprite
 * @param x 
 * @param y 
 * @param spr 
 */
spritePointCollision( x:number, y:number, spr:Sprite | Collider ):boolean
{
    return this.pointCollision( x, y, spr.getX(), spr.getY(), spr.w, spr.h );
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


spriteCircleColision( spr:Sprite | Collider, cenx:number, ceny:number, rad:number, fixOverlap:boolean = true ):boolean
{
let vx:number = (spr.getX() + spr.w/2) - cenx;
let vy:number = (spr.getY() + spr.h/2) - ceny;

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

    spr.setX( spr.getX() + overlap * dx );  
    spr.setY( spr.getY() + overlap * dy);
    }

return res;
}

/**
 * this will check if there is a circle collision between 2 sprites
 * @param spr1 
 * @param spr2 
 * @param fixOverlap 
 */
spritesCircleCollision( spr1:Sprite| Collider, spr2:Sprite| Collider, fixOverlap:boolean = true):boolean
{
return this.spriteCircleColision( spr1, 
    spr2.getX() + spr2.w/2, spr2.getY() + spr2.h/2, spr2.w/2, fixOverlap);
}

/**
 *  check if there is a collision between 2 rectangles (bounding boxes)
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
spriteRectangleCollision( spr1:Sprite | Collider, spr2:Sprite | Collider ):boolean
{
return this.rectangleCollision( spr1.getX(), spr1.getY(), spr1.w, spr1.h, 
                                spr2.getX(), spr2.getY(), spr2.w, spr2.h );
}

/**
 * this will check if there is a bounding box collision between 2 sprites,
 * if there is collision will return an string like:
 * 'top', 'bottom', 'left', 'right' indicating the side of the collision.
 * by default push is optional and set to false, however if 'push'
 * is equal to 'true' then spr2 will be pushed/moved 1px
 * @param spr1 
 * @param spr2 
 * @param push 
 * @param movSpd this is the ammount of movement when push, by default 1
 */
sideAndPushCollision( spr1:Sprite | Collider, spr2:Sprite | Collider, push:boolean = false, movSpd:number=1 ):string
{
let collisionSide:string = "none";

let colliderParent:Sprite = undefined;
if(spr1 instanceof Collider && spr1.parent !== undefined)
{
    colliderParent = spr1.parent;
}

let vx:number = this.getDistance( spr2.getX(), spr2.w, spr1.getX(), spr1.w );
let vy:number = this.getDistance( spr2.getY(), spr2.h, spr1.getY(), spr1.h );

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
                        if( push )spr2.points[0].y-=movSpd; 
                        if( colliderParent )
                            colliderParent.points[0].y+=overlapY;
                        else 
                            spr1.points[0].y+= overlapY; 
                    }
                    else
                    {
                        collisionSide = "bottom";
                        if( push )spr2.points[0].y+=movSpd;
                        if( colliderParent )
                            colliderParent.points[0].y-=overlapY;
                        else
                            spr1.points[0].y-= overlapY;
                    }

            }
            else
            {

                        if( vx > 0 )
                        {
                            collisionSide = "left";
                            if( push )spr2.points[0].x-=movSpd;
                            if( colliderParent )
                                colliderParent.points[0].x+=overlapX;
                            else
                                spr1.points[0].x+=overlapX;
                        }
                        else
                        {
                            collisionSide = "right";
                           if( push )spr2.points[0].x+=movSpd;
                           if( colliderParent )
                               colliderParent.points[0].x-=overlapX;
                           else
                               spr1.points[0].x-=overlapX; 
                        }

            }//

        }
        return collisionSide;
}//


/**
 * this checks if there is a collision or intersection
 * between 2 lines
 * @param line1 
 * @param line2 
 */
lineCollision( line1:LineShape, line2:LineShape):boolean
{
    let vx1 = line1.points[1].x - line1.points[0].x;
    let vy1 = line1.points[1].y - line1.points[0].y;

    let vx2 = line2.points[1].x - line2.points[0].x;
    let vy2 = line2.points[1].y - line2.points[0].y;

    let cross = 0;

    if( (cross = vx1 * vy2 - vy1 * vx2 ) === 0 ) return false;
    
    let v3 = { x: line1.points[0].x - line2.points[0].x, y: line1.points[0].y - line2.points[0].y }
    let u2 = ( vx1 * v3.y - vy2 * v3.x ) / cross;

    if( u2 >= 0 && u2 <= 1)
    {
        let u1 = ( vx2 ^ v3.y - vy2 * v3.x ) / cross;
        return (u1 >= 0 && u1 <= 1);
    }

    return false;
}

/**
 * returns true if there is a collision between a line and a circle
 * @param line 
 * @param x 
 * @param y 
 * @param radius 
 */
lineAndCircleCollision(line:LineShape, x:number, y:number, radius:number):boolean
{
    let dx = x - line.points[0].x;
    let dy = y - line.points[0].y;

    let dxx = line.points[1].x - line.points[0].x;
    let dyy = line.points[1].y - line.points[0].y;

    let t = (dx*dxx+dy*dyy)/(dxx*dxx+dyy*dyy);

    var xx = line.points[0].x + dxx*t;
    var yy = line.points[0].y + dyy*t;

    if(t<0){x = line.points[0].x; y= line.points[0].y;}
    if(t>1){x = line.points[1].x; y= line.points[1].y;}

    return( (x-xx)*(x-xx)+(y-yy)*(y-yy) < radius*radius );
}

/**
 * check if there is intersection between a line and a collision
 * @param line 
 * @param x 
 * @param y 
 * @param w 
 * @param h 
 * @TODO needs more testing
 */
lineAndRectangleCollision( line:LineShape, x:number, y:number, w:number, h:number ):boolean
{
    let p1:Point = line.points[0];
    let p2:Point = line.points[1];

    let q:Point =  new Point(x,y);
    let q2:Point = new Point(x,y);

    //top rect line
    if( this.lineCollision( new LineShape( p1,p2 ), new LineShape( q, q2 ) ) )return true;
    
    q=q2;
    q2 = new Point( x+w, y+h );

    //right rect line
    if( this.lineCollision( new LineShape( p1,p2 ), new LineShape( q, q2 ) ) )return true;

    q=q2;
    q2 = new Point( x, y+h );

    //bottom rect line
    if( this.lineCollision( new LineShape( p1,p2 ), new LineShape( q, q2 ) ) )return true;

    q=q2;
    q2 = new Point( x, y );

    //left rect line
    if( this.lineCollision( new LineShape( p1,p2 ), new LineShape( q, q2 ) ) )return true;

    return false;
}

regularPolygonCollision( polygon1:PolygonShape, polygon2:PolygonShape ):boolean
{

    let polygons:PolygonShape[] = [ polygon1, polygon2 ];
    let minA, maxA, minB, maxB, i, j, i1;


    for( let i:number = 0; i < polygons.length; i++ )
    {

        let polygon = polygons[i];
        for( i1 = 0; i1 < polygon.points.length; i1++ )
        {
            let i2 =(i1+1) % polygon.points.length;
            let p1 = polygon.points[i1];
            let p2 = polygon.points[i2];

            let normal = new Point( p2.y - p1.y, p1.x - p2.x );

            minA = maxA = undefined;

            for( j = 0; j < polygon1.points.length; j++ )
            {
                let projected = normal.x * polygon1.points[j].x + normal.y * polygon1.points[j].y;
                if( minA === undefined || projected < minA )
                    minA = projected;
                if( maxA === undefined || projected > maxA)
                    maxA = projected;
            }

            minB = maxB = undefined;

            for( j = 0; j < polygon2.points.length; j++ )
            {
                let projected = normal.x * polygon2.points[j].x + normal.y * polygon2.points[j].y;
                if( minB === undefined || projected < minB )
                    minB = projected;
                if( maxB === undefined || projected > maxB)
                    maxB = projected;
            }

            if( maxA < minB || maxB < minA)return false;
        }

    }
    return true;
}

/**
 * @todo implement this!
 * @returns 
 */
iregularPolygonCollision():boolean
{
    return false;
}

/**
 * this will check if the point is intersecting the circle
 * @param point 
 * @param x 
 * @param y 
 * @param radius 
 */
pointAndCircleCollision( point:Point, x:number, y:number, radius:number )
{
    let dx = point.x-x;
    let dy = point.y-y;
    return( dx*dx + dy*dy < radius*radius );
}


/**
 * this function will use tiles as colider, to check collisions
 * tile indexes are:
 * 1 - solid tile
 * 2 - left slope
 * 3 - right slope
 * @param spr 
 * @param tiles 
 */
tileCollision(spr:Sprite | Collider, tiles:Tile[]|BaseTile[]):string
{

    let counter = 0;
    // let collisionSide:string;
    // let solidTile:number = 0;
    // let leftSlope:number = 1;
    // let rightSlope:number = 2;

    for( let idx=0; idx < tiles.length; idx++ )
    {
        // console.log(`iterating tile: ${idx}`)
        let tile:Tile | BaseTile = tiles[idx];
        let tileIndex = tile.index;

        switch(tileIndex)
        {

            // case 2:
            // case 3:

            //     this.rectangleCollision( spr.getX(), spr.getY(), spr.w, spr.h, tile.x, tile.y, tile.w, tile.h )
            //     {
            //         // let colpos:number = 0;

            //         // if( spr instanceof Collider )
            //         // {
            //         //     colpos = 
            //         // }

            //         let colpos:number =  (spr.getX() + spr.anchor.x) - tile.x;// + tile.w)
            //         // console.log(":::entro colpos:", colpos)
            //         if( colpos > 0 && colpos <= tile.w )
            //         {
                        
            //             let yval:number = colpos;
            //             // console.log("yval", yval)
            //             if( tile.index === 3 )
            //                 yval = tile.h - colpos;
                        
            //             spr.setY( (tile.y + tile.h) - ( spr.anchor.y + yval ) )
            //             // spr.setY( ( tile.y - spr.h ) + ( tile.h - yval ) );
            //             // spr.setY( tile.y );
            //             return "bottom";
            //         }

            //     }
            // break;
            case 1:
                
                // spr1:Sprite | Collider, spr2:Sprite | Collider, push:boolean = false
                let col = new Collider( tile.x, tile.y, tile.w, tile.h );
                let colside = this.sideAndPushCollision( spr, col );

                // counter++;
                // if(counter >=30)
                // {
                //     console.log("hasparent:: ", spr)
                //     counter = 0;
                //     console.log("entro 1:: ", colside)
                // }
                if( colside !== "none")return colside;
                // else continue;
                // { spr.setY( spr.getY() - spr.spdY ) }
            break;
            

        }
        

    }
    


}


}//