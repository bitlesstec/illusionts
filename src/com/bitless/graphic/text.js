import { BaseSprite } from "./basesprite.js";
/**
 * this class creates text that can be displayed as HUD or any other
 * message, you can grow and shrink as well change color of this text
 * is more usable than just put text directly in ctx.fillText.
 */
export class Text extends BaseSprite {
    constructor(message) {
        super();
        this.message = message;
        this.color = "#FFF";
        this.fillText = true;
        this.maxWidth = 0;
    }
    render(ctx) {
        if (this.visible) {
            //@todo improve this 
            if (this.alpha < 1 || this.angle !== 0 || this.xScale !== 1 || this.yScale !== 1) {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
                ctx.rotate(this.angle);
                ctx.scale(this.xScale, this.yScale);
                ctx.translate(-(this.x + this.w / 2), -(this.y + this.h / 2));
                this.drawText(ctx);
                ctx.restore();
            }
            else {
                this.drawText(ctx);
            }
        } //
    } //
    drawText(ctx) {
        if (this.fillText) {
            ctx.fillStyle = this.color;
            ctx.fillText(this.message, this.x, this.y);
        }
        else {
            ctx.strokeStyle = this.color;
            ctx.strokeText(this.message, this.x, this.y);
        }
    }
}
