import { BaseShape } from "../graphic/shape/BaseShape.js";
import { Sprite } from "../graphic/Sprite.js";
import { Controllable } from "../ntfc/input/Controllable.js";


/**
 * the purpose of this class is to extend this class so
 * you can create your player controller and not to be
 * writing the same every level, with this you can
 * create the instance and call processController defined method.
 * @deprecated this may not be long needed, check to remove it
 */
export abstract class BaseGameController implements Controllable
{

    private player:BaseShape | Sprite;

    constructor( player?:BaseShape | Sprite )
    {
        if(player)this.player = player;   
    }

    /**
     * this will attach the controller to specified player
     * @param player 
     */
    attachPlayer(player: BaseShape | Sprite): void {
        this.player = player;
    }

    /**
     * this will process the input events for the player attached to it
     * @param inputEvent 
     */
    processController( inputEvent: KeyboardEvent | TouchEvent | MouseEvent | GamepadEvent ): void {}
    
}