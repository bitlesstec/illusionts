import { Config } from "../cfg/config.js";
export class BaseSprite {
    constructor() {
        this.id = ++Config.SPRITE_ID_COUNTER;
        this.label = "";
        this.spdX = 0;
        this.spdY = 0;
        this.x = 0;
        this.y = 0;
        this.angle = 0;
        this.alpha = 1;
        this.xScale = 1;
        this.yScale = 1;
        this.visible = true;
    } //
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    move(spdX, spdY) {
        this.moveX(spdX);
        this.moveY(spdY);
    }
    moveX(spdX) {
        this.x += spdX;
    }
    moveY(spdY) {
        this.y += spdY;
    }
} //
