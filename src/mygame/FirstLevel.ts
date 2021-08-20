
import { BaseLevel } from "../lib/level/BaseLevel.js"
import { GameState } from "../lib/manager/GameState.js";
import { Initiable } from "../lib/ntfc/Initiable.js";


export class FirstLevel extends BaseLevel implements Initiable
{

//#DECLARE YOUR SPRITES OR OTHER OBJECTS HERE.



    constructor()
    {
        super(640,480);
        this.init();

    }


    async init(): Promise<void> {
        console.log("game has done initiating...");
        // #THIS MUST CHANGE gameState after you are done loading stuff...
        this.gameState=GameState.PLAYING;
    }


    /**
     * all updates of sprites, physics or objects goes here
     * @param delta 
     */
update( delta:number ){}



/**
 * all sprites must implement its render method here 
 * so they can be displayed in screen
 * @param ctx 
 */
render( ctx:CanvasRenderingContext2D )
{
    ctx.fillStyle="#000";
    ctx.fillRect(0,0,this.levelWidth, this.levelHeight );

    ctx.fillStyle="#FFF";
    ctx.fillText("Welcome to IllusionTS",20,20);
}
    


}