import { BaseLevel } from "../lib/level/BaseLevel.js";
import { GameState } from "../lib/manager/GameState.js";
import { Initiable } from "../lib/ntfc/Initiable.js";


export class SampleLevel extends BaseLevel implements Initiable
{

    constructor()
    {
        //setting level width and height
        super( 640, 480 );
        this.init(); //init can be also here instead GAMESTATE.LOADING
    }

    init(): void {
        this.gameState = GameState.PLAYING;
    }

    render(ctx:CanvasRenderingContext2D)
    {

        switch( this.gameState )
        {
            case GameState.LOADING:
                break;
            case GameState.PLAYING:

                // set black background color and fill canvas with it
                ctx.fillStyle = "#000";
                ctx.fillRect( 0, 0, this.levelWidth, this.levelHeight );

                //set white color and print hello word in screen at 20, 20
                ctx.fillStyle = "#FFF";
                ctx.fillText( "Hello World!" ,20,20);
                break;
        }
       
    }

    /**
     * this function load the images before they can be used
     */
    async loadImages(): Promise<void> {
    }

    loadSounds(): void {
    }

    loadData(): void {
    }


}