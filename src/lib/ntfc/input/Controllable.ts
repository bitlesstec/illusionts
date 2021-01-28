import { BaseShape } from "../../graphic/shape/BaseShape.js";
import { Sprite } from "../../graphic/Sprite.js";

/**
 * this interface provides methods to make a class
 * to be able to set player controller
 */
export interface Controllable
{
    attach( player:BaseShape | Sprite ):void;
    processController( inputEvent: KeyboardEvent | TouchEvent | MouseEvent | GamepadEvent ):void;
}