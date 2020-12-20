import {Renderable} from "../ntfc/Renderable.js";
import {Updatable} from "../ntfc/Updatable.js";
import { Touchable } from "../ntfc/input/Touchable.js";
import { Mousable } from "../ntfc/input/Mousable.js";
import { Keyable } from "../ntfc/input/Keyable.js";
import { GameState } from "../manager/GameState.js";
import { Camera } from "../camera/Camera.js";
// import { BaseSprite } from "../graphic/basesprite.js";
import { Sprite } from "../graphic/Sprite.js";
import { BaseSprite } from "../graphic/BaseSprite.js";

/**
 * this class will represent a level in the game, will
 * contain sprites for player, enemies and other objects, background
 * images, etc.
 */
export abstract class BaseLevel
       implements Renderable, Updatable, Touchable, Mousable, Keyable
{

//used to load all images that can be used to create sprites or
//set new animations for sprites 
imageMap: Map< string, HTMLImageElement>;

//used to maintain all the sprites in a single place, 
//so we can iterate this map and use render method of each sprite for example
spriteList: BaseSprite[];// | Sprite[];

camera: Camera;

//actual gameState of the level, by default loading!
gameState:GameState;

levelWidth:number;
levelHeight:number;



constructor( levelWidht:number, levelHeight:number, viewWidth?:number, viewHeight?:number )
{
this.gameState = GameState.LOADING;
this.imageMap = new Map<string, HTMLImageElement>();
this.spriteList =  [];

this.levelWidth = levelWidht; 
this.levelHeight = levelHeight;

if( viewWidth !== undefined && viewHeight !== undefined )
    this.camera = new Camera( levelWidht, levelHeight, viewWidth, viewHeight );
else
    this.camera = new Camera( levelWidht, levelHeight );
}//


render( ctx:CanvasRenderingContext2D ){}
update( delta:number ){}

//Input Events, all this are eventListeners attached to canvas
//@note:if below lines are commented they will cause an issue with GameManager.loadLevel function
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

