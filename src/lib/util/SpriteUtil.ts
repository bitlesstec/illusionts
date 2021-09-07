import { Point } from "../graphic/Point.js";
import { BaseShape } from "../graphic/shape/BaseShape.js";
import { Sprite } from "../graphic/Sprite.js";
import { CollisionUtil } from "./CollisionUtil.js";

/**
 * this class provides some generic functions
 * applicable to sprites
 */
export class SpriteUtil
{

    /**
     * this is going to set the speed on X e Y coordinates pointing to
     * coords toX & toY
     * @note to make this work moveXSpd and moveYSpd needs to be called in update method due
     * this function only set the new speed in X & Y coordinates
     * @param spr 
     * @param toX 
     * @param toY 
     * @param spd 
     */
    static moveTo( spr: Sprite, toX:number, toY:number, spd:number)
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
    static moveToAngle( spr:Sprite, angle:number, spd:number, setAngle:boolean=false )
    {
        if( setAngle )
            spr.angle = angle;

            let spdx = spd * Math.cos( angle );
            let spdy = spd * Math.sin( angle );

            spr.spdX = spdx;
            spr.spdY = spdy;
    }//

    /**
     * this function will set the new angle of the sprite pointing to X & Y coordinates
     * @param spr 
     * @param x 
     * @param y 
     */
    static getAngle( spr:Sprite, x:number, y:number ):number
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
    static pointDistance( spr:Sprite, x:number, y:number):number
    {
        // let vx:number = CollisionUtil.getInstance().getDistance( spr.x, spr.w, x, 0 );
        // let vy:number = CollisionUtil.getInstance().getDistance( spr.y, spr.h, y, 0 );

        return CollisionUtil.getInstance()
            .getMagnitude( spr.points[0].x, spr.w, spr.points[0].y, spr.h, x, 0, y, 0 );

    }//


    /**
     * it returns the distance in pixels between spr and spr2
     * @param spr 
     * @param spr2 
     * @returns 
     */
    static spritesDistance( spr:Sprite, spr2:Sprite) :number
    {
        return this.pointDistance( spr, spr2.points[0].x+spr2.w/2, spr2.points[0].y+spr2.h/2 );
    }

    /**
     * this function will look for the nearest sprite from the list
     * @param sprFrom 
     * @param sprList 
     */
    static spriteNearest( spr:Sprite, sprList:Sprite[] ):Sprite | undefined
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
     * this method will return a list of sprites containing the label specified
     * @param labelToLook 
     * @param spriteList 
     */
    static getSpriteByLabel( labelToLook:string, spriteList:Sprite[] ): Sprite[]
    {
        let sprites: Sprite[] =
            spriteList.filter( spr => spr.label === labelToLook );

        return sprites;
    }//


    /**
     * this function will make defined sprite  rotate around point X & Y, it
     * can also work to rotate the sprite around another sprite
     * 
     * CAUTION, THIS FLIKERS
     * @param spr 
     * @param x 
     * @param y 
     * @param distance 
     * @param angle 
     */
    static rotateAround( spr:Sprite, x:number, y:number, distance:number, angle:number)
    {
        //check for pivots in the future, to make rotate around sprite pivot
        let rotX= x - spr.getX() + ( distance * Math.cos(angle) ) - spr.w/2;
        let rotY= y - spr.getY() + ( distance * Math.sin(angle) ) - spr.h/2;

        spr.setX( Math.floor(rotX) );
        spr.setY( Math.floor(rotY) );
    }

}//