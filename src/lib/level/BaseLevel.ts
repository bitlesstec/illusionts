import {Renderable} from "../ntfc/Renderable.js";
import {Updatable} from "../ntfc/Updatable.js";
import { Touchable } from "../ntfc/input/Touchable.js";
import { Mousable } from "../ntfc/input/Mousable.js";
import { Keyable } from "../ntfc/input/Keyable.js";
import { GameState } from "../manager/GameState.js";
import { Camera } from "../camera/Camera.js";
import {AudioManager} from "../audio/AudioManager.js";
import { Sprite } from "../graphic/Sprite.js";

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
imageMap: Map<string, HTMLImageElement>;

//used to maintain all the sprites in a single place, 
//so we can iterate this map and use render method of each sprite for example
// spriteList: Sprite[];
//this will allow to separate in group several screens like player, enemies, bosses, items, etc.
spriteMap: Map<string, any >;

camera: Camera;

//actual gameState of the level, by default loading!
gameState:GameState;

levelWidth:number;
levelHeight:number;

/**
 * this constructors set level width and height which is not the same as viewWidth and viewHeight.
 * viewWidth/viewHeight are measures used by camera.
 * @param levelWidht 
 * @param levelHeight 
 * @param viewWidth 
 * @param viewHeight 
 */
constructor( levelWidht:number, levelHeight:number, viewWidth?:number, viewHeight?:number )
{ 
    this.gameState = GameState.LOADING;
    this.imageMap = new Map<string, HTMLImageElement>();
    this.spriteMap = new Map<string, Sprite>();
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
touchStart( event: Event ){}
touchMove( event: Event ){}
touchEnd( event: Event ){}
touchLeave( event: Event ){}
touchCancel( event: Event ){}

mouseDown( event: Event ){}
mouseUp( event: Event ){}
mouseMove( event: Event ){}
mouseOut( event: Event ){}
mouseOver( event: Event ){}

keyDown( event: Event ){}
keyUp( event: Event ){}

GamePadConnected( event: Event ){}
GamePadDisconnected( event: Event ){}
GamePadButtonPressed( event: Event ){}
GamePadAxisMovement( event: Event ){}

/**
 * this will merge new sprList into spriteMap of this level, 
 * in the case when we have a bunch of sprites in diferent atlasses images
 * @param sprList 
 */
protected addSpriteMap( sprMap:Map<string, Sprite>):void
{
    this.spriteMap = new Map<string, Sprite>([...this.spriteMap,...sprMap]);
}

}//