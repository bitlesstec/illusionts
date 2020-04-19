/**
 * this class will represent a level in the game, will
 * contain sprites for player, enemies and other objects, background
 * images, etc.
 */
// export abstract 
export class Level {
    update(delta) {
    }
    render(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 640, 480);
        ctx.fillStyle = "white";
        ctx.fillText("TEST", 100, 100);
    }
} //
