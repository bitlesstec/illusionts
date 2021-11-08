import { PointerControl } from "../lib/input/PointerControl.js";
import { BaseLevel } from "../lib/level/BaseLevel.js";
import { GameState } from "../lib/manager/GameState.js";
import { AssetLoadable } from "../lib/ntfc/AssetLoadable.js";
import { Initiable } from "../lib/ntfc/Initiable.js";



export class TouchLevel extends BaseLevel
                        implements AssetLoadable, Initiable
{


    pointerControl:PointerControl;
    swipeText:string;


    constructor()
    {
        super( 640, 480 );
    }


    init(): void {
    }
    loadImages(): void {
    }
    loadSounds(): void {
    }
    loadData(): void {
    }

    update( delta:number )
    {
        switch( this.gameState )
        {
            case GameState.LOADING:

            this.pointerControl = new PointerControl();
            this.gameState = GameState.PLAYING;
            break;
            case GameState.PLAYING:
            break;
        }
    }

    render( ctx:CanvasRenderingContext2D)
    {
        switch( this.gameState )
        {
            case GameState.LOADING:
                ctx.fillStyle = "#000";
                ctx.fillRect( 0, 0, this.levelWidth, this.levelHeight );

                ctx.fillStyle = "#FFF";
                ctx.fillText( "loading" ,this.levelWidth/2,20);

            break;
            case GameState.PLAYING:
                ctx.fillStyle = "#000";
                ctx.fillRect( 0, 0, this.levelWidth, this.levelHeight );
                ctx.fillStyle = "#FFF";

                ctx.fillText( `click and make swipe actions, you can toggle to mobile device`,20,20);
                ctx.fillText( `point pressed X:${this.pointerControl.pointPressed.x} , Y:${this.pointerControl.pointPressed.y}`   ,20,40);
                ctx.fillText( `point Released X:${this.pointerControl.pointReleased.x} , Y:${this.pointerControl.pointReleased.y}`,20,60);
                ctx.fillText( `swipe executed: ${this.swipeText}`,20,100);
            break;
        }

    }

    mouseDown( event: MouseEvent)
    {
        this.pointerControl.pointerPressed(event);
    }

    mouseUp( event: MouseEvent )
    {
        this.pointerControl.pointerReleased(event);

        if( this.pointerControl.swipeRight( 200 ) )
            this.swipeText="swipe right";
        else if( this.pointerControl.swipeLeft( 200 )  )
            this.swipeText="swipe left";
        else if( this.pointerControl.swipeUp( 200 )  )
            this.swipeText="swipe up";
        else if( this.pointerControl.swipeDown( 200 )  )
            this.swipeText="swipe down";
    }

    touchStart( event: TouchEvent )
    {
        this.pointerControl.pointerPressed(event);
    }
    

    touchEnd( event: TouchEvent )
    {
        this.pointerControl.pointerReleased(event);

        if( this.pointerControl.swipeRight( 200 ) )
            this.swipeText="swipe right";
        else if( this.pointerControl.swipeLeft( 200 )  )
            this.swipeText="swipe left";
        else if( this.pointerControl.swipeUp( 200 )  )
            this.swipeText="swipe up";
        else if( this.pointerControl.swipeDown( 200 )  )
            this.swipeText="swipe down";

    }


}