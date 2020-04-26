
import {Renderable} from "../ntfc/renderable.js";
import {Updatable} from "../ntfc/updatable.js";
import { Touchable } from "../ntfc/input/touchable.js";
import { Mousable } from "../ntfc/input/mousable.js";
import { Keyable } from "../ntfc/input/keyable.js";
import { GameState } from "../manager/gamestate.js";

/**
 * this class will represent a level in the game, will
 * contain sprites for player, enemies and other objects, background
 * images, etc.
 */
// export abstract 
export abstract class BaseLevel
       implements Renderable, Updatable, Touchable, Mousable, Keyable
{

//used to load all images( backround / sprites ) in a level
imageList: HTMLImageElement[];

imageMap: Map< string, HTMLImageElement> = new Map<string, HTMLImageElement>();//new Map();

//@todo
//create camera

//actual gameState of the level, by default loading!
gameState:GameState=GameState.LOADING;

render( ctx:CanvasRenderingContext2D ){}
update( delta:number ){}


//Input Events, all this are eventListeners attached to canvas
touchStart( event ){}
touchMove( event ){}
touchEnd( event ){}
touchLeave( event ){}
touchCancel( event ){}

mouseDown( event ){}
mouseUp( event ){}
mouseMove( event ){}
mouseOut( event ){}
mouseOver( event ){}

keyDown( event ){}
keyUp( event ){}

}//

