import { BaseShape } from "../../graphic/shape/BaseShape.js";
import { Sprite } from "../../graphic/Sprite.js";

/**
 * this interface provides methods to make a class
 * to be able to set player controller for keyboard,
 * mouse, touch, gamepads, etc
 */
export interface Controllable
{
    attachPlayer( player:BaseShape | Sprite ):void;
    processController( inputEvent: KeyboardEvent | TouchEvent | MouseEvent | GamepadEvent ):void;
}