import { Sprite } from "../graphic/Sprite.js";
import { MathUtil } from "./MathUtil.js";
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
    static getangle( spr:Sprite, x:number, y:number ):number
    {
        let vx:number = x-( spr.x + spr.w / 2 );
        let vy:number = y-( spr.y + spr.h / 2 );

        let angle = Math.atan2( vy, vx );// * ( 180 / Math.PI );

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

    /**
     * this function will look for the nearest sprite from the list
     * @param sprFrom 
     * @param sprList 
     */
    static spriteNearest( spr:Sprite, sprList:Sprite[] ):Sprite
    {
        if( sprList.length === 0 )return;

        let minValue:number = -1;
        let pos:number = 0;

        for( let x = 0; x < sprList.length ; x++ )
        {

            let s:Sprite = sprList[ x ];

            let vx:number = (s.x+s.w / 2 ) - (spr.x + spr.w / 2 );
            let vy:number = (s.y+s.w / 2 ) - (spr.y + spr.h / 2 );
            
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
    // @todo getSpriteByLabel

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

}//