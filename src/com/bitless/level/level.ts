
import {Renderable} from "../ntfc/renderable.js";
import {Updatable} from "../ntfc/updatable.js";

/**
 * this class will represent a level in the game, will
 * contain sprites for player, enemies and other objects, background
 * images, etc.
 */
// export abstract 
export class Level
    implements Renderable, Updatable
{
    x:number = 0;

    update(delta:number)
    {
        this.x++; if( this.x >= 640) this.x=0;

    }
  
    render( ctx:CanvasRenderingContext2D ): void
    {
        ctx.fillStyle = "black";
        ctx.fillRect(0,0, 640, 480); 

        ctx.fillStyle = "white";
        ctx.fillText( "TEST", this.x, 100 );

    }
    
}//

