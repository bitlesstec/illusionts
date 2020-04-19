/**
 * this class will represent a level in the game, will
 * contain sprites for player, enemies and other objects, background
 * images, etc.
 */
// export abstract 
export class Level {
    constructor() {
        this.x = 0;
    }
    update(delta) {
        this.x++;
        if (this.x >= 640)
            this.x = 0;
    }
    render(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 640, 480);
        ctx.fillStyle = "white";
        ctx.fillText("TEST", this.x, 100);
    }
} //
