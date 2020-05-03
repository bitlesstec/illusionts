import { Sprite } from "../graphic/sprite.js";
import { MathUtil } from "./mathutil.js";
import { CollisionUtil } from "./collisionutil.js";

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

        let vx:number = toX - spr.x + spr.w/2;
        let vy:number = toY - spr.y +spr.h/2;

        let mag:number = Math.sqrt( ( vx * vx ) + ( vy * vy ) );

        spr.spdX = ( vx / mag ) * spd;
        spr.spdY = ( vy / mag ) * spd;
    }//


    static moveToAngle( spr:Sprite, angle:number, spd:number, setAngle:boolean )
    {
        if( setAngle )
            spr.angle = angle;

            let radAngle:number = MathUtil.toRadians( angle );
            let spdx = spd * Math.cos( radAngle );
            let spdy = spd * Math.sin( radAngle );

            spr.x = spdx;
            spr.y = spdy;
    }//


    static getangle( spr:Sprite, x:number, y:number ):number
    {
        let vx:number = x - spr.x + spr.w / 2;
        let vy:number = y - spr.y + spr.w / 2;

        let radian:number = 180 / Math.PI; 

        let angle:number = Math.atan2( vy, vx ) * radian; 

        if( angle < 0 ) angle += 360;

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

        return CollisionUtil.getInstance().getMagnitude( spr.x, spr.w, spr.y, spr.h, x, 0, y, 0 );

    }//


    static spritesDistance( spr:Sprite, spr2:Sprite) :number
    {
        return this.pointDistance( spr, spr2.x+spr2.w/2, spr2.y+spr2.h/2 );
    }

    // @todo getSpriteById
    // @todo getSpriteByLabel


}//