import { Point } from "./Point.js";
/**
 * this class will display a background on related
 * x & y position, this class can be also used as a tile instead
 * background...
 * by default X & Y position is 0,0,
 * there is also a color property with default value to black
 * and there is a method call renderCOlor which will
 * display current color instead background image.
 */
export class Background extends Point {
    constructor(image) {
        super();
        this.w = 0;
        this.h = 0;
        this.image = image;
        this.visible = true;
        this.image.onload = () => {
            //console.log("image loaded");
            this.w = this.image.width;
            this.h = this.image.height;
            this.visible = true;
        };
        this.color = "#000000"; //black by default
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * this method will render the image at X & Y point, basically
     * is backgroundImage
     * @param ctx
     */
    render(ctx) {
        if (this.visible)
            ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }
    /**
     * this method will render a rectanle from X & Y of W & H size, of the stablished
     * color
     * @param
     */
    renderColor(ctx) {
        if (this.visible) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.w, this.h);
        }
    }
}