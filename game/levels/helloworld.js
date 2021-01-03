import { BaseLevel } from '../lib/level/BaseLevel.js';
/**
 * this is the hello world example, if this works and
 * you can see "hello world" in your page, you have all
 * set...
 */
export class HelloWorld extends BaseLevel {
    constructor() {
        super(640, 480);
    }
    render(ctx) {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, this.levelWidth, this.levelHeight);
        ctx.fillStyle = "#FFF";
        ctx.fillText("Hello World", 20, 20);
    }
}
