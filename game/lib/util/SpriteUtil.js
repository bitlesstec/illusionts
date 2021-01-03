import { CollisionUtil } from "./CollisionUtil.js";
/**
 * this class provides some generic functions
 * applicable to sprites
 */
export class SpriteUtil {
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
    static moveTo(spr, toX, toY, spd) {
        if (spd <= 0)
            return;
        let vx = toX - spr.x + spr.w / 2;
        let vy = toY - spr.y + spr.h / 2;
        let mag = Math.sqrt((vx * vx) + (vy * vy));
        spr.spdX = (vx / mag) * spd;
        spr.spdY = (vy / mag) * spd;
    } //
    static moveToAngle(spr, angle, spd, setAngle) {
        if (setAngle)
            spr.angle = angle;
        let spdx = spd * Math.cos(angle);
        let spdy = spd * Math.sin(angle);
        spr.spdX = spdx;
        spr.spdY = spdy;
    } //
    /**
     * this function will set the new angle of the sprite pointing to X & Y coordinates
     * @param spr
     * @param x
     * @param y
     */
    static getangle(spr, x, y) {
        let vx = x - (spr.x + spr.w / 2);
        let vy = y - (spr.y + spr.h / 2);
        let angle = Math.atan2(vy, vx); // * ( 180 / Math.PI );
        return angle;
    } //
    /**
     * gets the distance between centerX and centerY of Sprite & point
     * defined by X & Y, NOTE: this distance is not a pixel distance value
     * @param spr
     * @param x
     * @param y
     */
    static pointDistance(spr, x, y) {
        // let vx:number = CollisionUtil.getInstance().getDistance( spr.x, spr.w, x, 0 );
        // let vy:number = CollisionUtil.getInstance().getDistance( spr.y, spr.h, y, 0 );
        return CollisionUtil.getInstance().getMagnitude(spr.x, spr.w, spr.y, spr.h, x, 0, y, 0);
    } //
    static spritesDistance(spr, spr2) {
        return this.pointDistance(spr, spr2.x + spr2.w / 2, spr2.y + spr2.h / 2);
    }
    /**
     * this function will look for the nearest sprite from the list
     * @param sprFrom
     * @param sprList
     */
    static spriteNearest(spr, sprList) {
        if (sprList.length === 0)
            return;
        let minValue = -1;
        let pos = 0;
        for (let x = 0; x < sprList.length; x++) {
            let s = sprList[x];
            let vx = (s.x + s.w / 2) - (spr.x + spr.w / 2);
            let vy = (s.y + s.w / 2) - (spr.y + spr.h / 2);
            let mag = Math.sqrt((vx * vx) + (vy * vy));
            if (mag < minValue || minValue === -1) {
                minValue = mag;
                pos = x;
            } ///
        } //
        return sprList[pos];
    }
    // @todo getSpriteById
    // @todo getSpriteByLabel
    /**
     * this method will return a list of sprites containing the label specified
     * @param labelToLook
     * @param spriteList
     */
    static getSpriteByLabel(labelToLook, spriteList) {
        let sprites = spriteList.filter(spr => spr.label === labelToLook);
        return sprites;
    } //
} //
