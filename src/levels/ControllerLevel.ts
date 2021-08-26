
import { Controller } from "../lib/input/Controller.js";
import { BaseLevel } from "../lib/level/BaseLevel.js"
import { GameState } from "../lib/manager/GameState.js";
import { Initiable } from "../lib/ntfc/Initiable.js";

/**
 * this level will show you in console data retrieved from gamepad connected
 * at index 0 ( 1 controller ), at this moment this only should work for chrome
 * based browsers
 */
export class ControllerLevel extends BaseLevel implements Initiable
{

//#DECLARE YOUR SPRITES OR OTHER OBJECTS HERE.



gpad:Controller;

counter:number;

    constructor()
    {
        super(640,480);
        this.init();

    }


    async init(): Promise<void> {
        console.log("game has done initiating...");
        // #THIS MUST CHANGE gameState after you are done loading stuff...

        this.gameState=GameState.GAMEPAD_CONNECTING;
    }


    /**
     * all updates of sprites, physics or objects goes here
     * @param delta 
     */
update( delta:number ){


    switch( this.gameState )
    {
        case GameState.GAMEPAD_CONNECTING:
            
            let pad = navigator.getGamepads()[0];
            if( pad )
            {
                this.gpad = new Controller(pad);

                console.log( this.gpad.id )
                
                this.gameState=GameState.PLAYING;
            }
            break;

        case GameState.PLAYING:

                this.gpad.poll(navigator.getGamepads());


                // this.counter++;

                // if(this.counter >= 20)
                // {
                //     this.counter = 0;

                //     for( let i = 0; i < c.length; i++ )
                //     if( this.gpad.gamePad.buttons[ i ].pressed )
                //     {
                //         console.log(`con: ${i}`);
                //         console.log(this.gpad.gamePad.buttons[i]); 
                //     }
                // }


                // for( let i in this.gpad.gamePad.buttons ){
                //     if( this.gpad.gamePad.buttons[i].pressed ){

                //         console.log( i )
                //         console.log( this.gpad.gamePad.buttons[i] )
                //     } 
                // }

                console.log( this.gpad.gamePad.axes[0] )
                // for( let gpad of this.gpad.gamePad.buttons )
                // {
                //     if( gpad.pressed)
                    // console.log(this.gpad.gamePad.buttons);
                // }

                // if( this.gpad.isButtonPressed( Controller.XBOXONE_BTN_A) )
                // {
                //     console.log("btn a pressed");
                // }

                // if( this.gpad.gamePad.buttons[6].value )
                // { 
                //     console.log(this.gpad.gamePad.buttons[6].value) 
                // }

                // let anValue = this.gpad.getAnalogButtonValue( Controller.XBOXONE_LEFT_TRIGGER );
                // console.log(`leftTrigger: ${anValue}`)

                // let xvalue = this.gpad.getAxisValue( Controller.XBOXONE_LEFTSTICK_XAXIS );
                // console.log( xvalue );
            

                // if( this.gpad.isButtonReleased( Controller.XBOXONE_BTN_A ) )
                // {
                //     console.log("button A released")
                // }


                // if( this.gpad.isAxisReleased( Controller.XBOXONE_LEFTSTICK_XAXIS ) )
                // {
                //     console.log("X AXIS released")
                // }

            break;

    }

}



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

    switch( this.gameState )
    {
        case GameState.GAMEPAD_CONNECTING:
            ctx.fillText("press any button of Connected Gamepad",20,40);
            break;

        case GameState.PLAYING:
            ctx.fillText("gamepad playing is playing WATCH THE CONSOLE!  ",20,60);
            break;
    }

}



gamePadConnected(event:GamepadEvent)
{
    console.log(event);
}

    


}