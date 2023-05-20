import { Point } from "../graphic/Point.js";
import { BaseShape } from "../graphic/shape/BaseShape.js";
import { Sprite } from "../graphic/Sprite.js";
import { GameManager } from "../manager/GameManager.js";
import { CollisionUtil } from "./CollisionUtil.js";

/**
 * this class provides some generic functions
 * applicable to sprites
 */
export class SpriteUtil
{

    /**
     * this is going to set the speed on spdX and spdY sprite pointing to
     * coords toX & toY
     * @note to make this work call:
     * move() or moveX() or moveY()
     * cause this method only sets the new speed to specified properties above
     * , does not move the sprite, 
     * @param spr 
     * @param toX 
     * @param toY 
     * @param spd 
     */
    static moveTo<T extends Sprite>( spr: T, toX:number, toY:number, spd:number)
    {
        if( spd <= 0 )return;

        let vx:number = toX - spr.points[0].x + spr.w/2;
        let vy:number = toY - spr.points[0].y + spr.h/2;

        let mag:number = Math.sqrt( ( vx * vx ) + ( vy * vy ) );

        spr.spdX = ( vx / mag ) * spd;
        spr.spdY = ( vy / mag ) * spd;
    }//


    /**
     * this will set sprite spdX & spdY to the angle defined, with defined speed
     * @param spr 
     * @param angle 
     * @param spd 
     * @param setAngle if this is set to true, spr:Sprite angle will be set
     */
    static moveToAngle<T extends Sprite>( spr:T, angle:number, spd:number, setAngle:boolean=false )
    {
        if( setAngle )
            spr.angle = angle;

            let spdx = spd * Math.cos( angle );
            let spdy = spd * Math.sin( angle );

            spr.spdX = spdx;
            spr.spdY = spdy;
    }//

    /**
     * gets the angle of the sprite pointing to X & Y coordinates
     * @param spr 
     * @param x 
     * @param y 
     */
    static getAngle<T extends Sprite>( spr:T, x:number, y:number ):number
    {
        let vx:number = x -( spr.points[0].x + spr.w / 2 );
        let vy:number = y -( spr.points[0].y + spr.h / 2 );
        let angle = Math.atan2( vy, vx );// * (180 / Math.PI);
        return angle;
    }//


    /**
     * gets the distance between centerX and centerY of Sprite & point
     * defined by X & Y, NOTE: this distance is not a pixel distance value
     * @param spr 
     * @param x 
     * @param y 
     */
    static pointDistance<T extends Sprite>( spr:T, x:number, y:number):number
    {
        return CollisionUtil.getInstance()
            .getMagnitude( spr.points[0].x, spr.w, spr.points[0].y, spr.h, x, 0, y, 0 );

    }//


    /**
     * it returns the distance in pixels between spr and spr2
     * @param spr 
     * @param spr2 
     * @returns 
     */
    static spritesDistance<T extends Sprite, U extends Sprite>( spr:T, spr2:U) :number
    {
        return this.pointDistance( spr, spr2.points[0].x+spr2.w/2, spr2.points[0].y+spr2.h/2 );
    }

    /**
     * this function will look what is the nearest sprite from the list related to
     * the sprite
     * @param sprFrom 
     * @param sprList 
     */
    static spriteNearest<T extends Sprite, U extends Sprite>( spr:T, sprList:U[] ):U | undefined
    {
        if( sprList.length === 0 )return;

        let minValue:number = -1;
        let pos:number = 0;

        for( let x = 0; x < sprList.length ; x++ )
        {

            let s:Sprite = sprList[ x ];

            let vx:number = (s.points[0].x+s.w / 2 ) - (spr.points[0].x + spr.w / 2 );
            let vy:number = (s.points[0].y+s.w / 2 ) - (spr.points[0].y + spr.h / 2 );
            
            let mag:number = Math.sqrt( (vx * vx) + (vy * vy) );

            if( mag < minValue || minValue === -1 )
            {
                minValue = mag;
                pos = x;
            }///

        }//

    return sprList[ pos ];
    }

    // @todo getSpriteById
    // @todo getSpriteByLabel or getSpriteGroupByLabel

    /**
     * this method will return a list of sprites containing the label specified from
     * defined spriteGroup
     * @param labelToLook 
     * @param spriteGroup 
     */
    static getSpriteGroupByLabel<T extends Sprite>( labelToLook:string, spriteGroup:T[] ): T[]
    {
        let sprites: T[] =
            spriteGroup.filter( spr => spr.label === labelToLook );

        return sprites;
    }//


    /**
     * this will return a group of sprites that are contained in
     * currentLevel.spriteMap defined by groupName
     * this will return an array of sprites wich contains
     * current label, this will kind of return your sprites
     * grouped by labels
     * @param groupName 
     * @returns 
     */
    static getSpritesByLabel<T extends Sprite>( label:string ):T[]
    {
        const sprites:T[] = [];
        for( const [name,sprite] of GameManager.getInstance().currentLevel.spriteMap )
        {
            // const s:Sprite = value;
            if(sprite.label.includes( label ) )
               sprites.push(sprite);
        } 

        return sprites;
        // return GameManager.getInstance().currentLevel.spriteMap.get( groupName );
    }

    /**
     * this function will make rotate Sprite around center point
     * @param spr 
     * @param center 
     * @param angle this must be how many angles will be updating every thick e.g: angle+= 2 * delta ( update update(delta) function)
     * @param distRad this is the radio distance between center and sprite, by default is 32
     */
    static rotateAround<T extends Sprite>( spr:T, center:Point, angle:number,distRad:number = 32)
    {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        // const xx = spr.getX() - center.x;
        // const yy = spr.getY() - center.y;

        // // const xx = center.x - spr.getX() ;
        // // const yy = center.y - spr.getY() ;

        // spr.setX( (xx * cos) - (yy * sin)  + center.x);
        // spr.setY( (xx * sin) + (yy * cos)  + center.y);

        //check for pivots in the future, to make rotate around sprite pivot
        let rotX= ( center.x - spr.w/2 )  + ( distRad * cos );
        let rotY= ( center.y - spr.h/2 )  + ( distRad * sin );

        spr.setX( rotX );
        spr.setY( rotY );
    }

     /**
     * this will create copied of the passed sprite by the number of copies defined
     * and you can name each sprite instance with the optional namePrefix argument
     * for instance if name is "enemy" and you will have 10 instances then names can be like
     * enemy0, enemy1, enemy2 and so on.
     * finally clazz argument defined the type of object to instantiate, in the case
     * you have Enemy extends Sprite, then you will want to create Enemy instances instead of Sprites
     * @param spr 
     * @param numberOfCopies 
     * @param clazz type of class to instantiate
     * @param namePrefix 
     * @returns 
     */
     static getCopies<T extends Sprite>(spr:T, numberOfCopies:number, clazz:any,namePrefix?:string ):Map<string,T>
     {
         const spriteMap:Map<string,T> = new Map();
         for( let i=0; i<numberOfCopies ;i++)
         {
             const name=namePrefix?`${namePrefix}${i}`:`${i}`;
             spriteMap.set(name, new clazz(spr.image, spr.getImgMeasures()) );
         }
         return spriteMap;
     }


     /**
     * this will merge newMap (of sprites) into currentMap  
     * in the case when we have a bunch of sprites in diferent atlasses images,
     * this will return a single map containng all sprites that we can set in
     * BaseLevel.spriteMap
     * @param sprList 
     */
    static mergeSpriteMap(currentMap:Map<string, any>, newMap:Map<string, any>):Map<string, any>
    {
        return new Map<string, any>([...currentMap,...newMap]);
    }

}//