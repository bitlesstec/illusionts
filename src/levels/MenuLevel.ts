import { BaseLevel } from '../lib/level/BaseLevel.js';
import { GameManager } from '../lib/manager/GameManager.js';
import { GameState } from '../lib/manager/GameState.js';
import { CircleShape } from '../lib/graphic/shape/CircleShape.js';
import { Initiable } from '../lib/ntfc/Initiable.js';
import { Point } from '../lib/graphic/Point.js';
import { SampleLevel } from './SampleLevel.js';
import { XpaceRocksLevel } from './XpaceRocksLevel.js';
import { PlatformLevel } from './PlatformLevel.js';
import { AndroidLevel } from './AndroidLevel.js';
import { CollisionLevel } from './Collisionlevel.js';
import { TowerDefense } from './towerdefense/TowerDefense.js';
import { ControllerLevel } from './ControllerLevel.js';

/**
 * this is a level that creates a menu to load other levels
 * which are examples of how to use this each level shows a
 * different way to use this library for different kind of games
 */
export class MenuLevel extends BaseLevel
                       implements Initiable
{
    menuSelector :CircleShape;
    gameSelected:number = 1;
    
    constructor()
    {
        //setting level width and height
        super( 640, 480 );
        this.init(); //init can be also here instead GAMESTATE.LOADING
    }

    init(): void 
    {
        this.menuSelector = new CircleShape(new Point(20,55), 5,"#FFF");

        //after you load all necesary set game state to playing
        //cause render methods is displaying the menu in this state
        this.gameState = GameState.PLAYING;
    }

    // update( delta:number )
    // {

    //     switch( this.gameState )
    //     {
    //         case GameState.LOADING:
    //             this.init();
    //         break;
    //         case GameState.PLAYING:
            
    //         break;
    //     }
    // }


    render( ctx:CanvasRenderingContext2D)
    {
        switch( this.gameState )
        {
            case GameState.LOADING:
                ctx.fillStyle = "#000";
                ctx.fillRect( 0, 0, this.levelWidth, this.levelHeight );

                //set white color and print hello word in screen at 20, 20
                ctx.fillStyle = "#FFF";
                ctx.fillText( "loading" ,this.levelWidth/2,20);
            break;
            case GameState.PLAYING:
                 //set background to black color
                ctx.fillStyle = "#000";
                ctx.fillRect( 0, 0, this.levelWidth, this.levelHeight );

                // TileUtil.renderTiles( ctx, this.imageMap.get( "tileImage" ), this.tiles );

                //set white color and print hello word in screen at 20, 20
                ctx.fillStyle = "#FFF";
                ctx.fillText( `Menu: move with arrow up/down or W/S then Press Enter` ,20, 20);

                ctx.fillText( "Examples 1" ,40, 50);
                ctx.fillText( "Xpace Rocks" ,40, 70);
                ctx.fillText( "Platform Game" ,40, 90);
                ctx.fillText( "Tile example" ,40, 110);
                ctx.fillText( "Collision 1" ,40, 130);
                ctx.fillText( "Tower Defense" ,40, 150);
                ctx.fillText( "Gamepad Level" ,40, 170);

                this.menuSelector.render(ctx);
                
            break;
            case 100:
                let mod = document.getElementById("emailModal");
                mod.classList.add("open");
                break;
        }

       
    }


    //keyboard keys events / keyboard controller
    keyUp( event:KeyboardEvent )
    {
        switch( event.keyCode )
        {
            case 87: //W
            // this.gameState=100; //@TEST MORE
            // break;
            case 38: //arrow up
            this.gameSelected -=1;
            this.menuSelector.moveY(-20);
            if( this.menuSelector.points[0].y < 55)
            {
                this.menuSelector.points[0].y = 55; 
                this.gameSelected=1;
            }
            break;

            case 83: //S
            case 40: //arrow down
            this.gameSelected +=1;
            this.menuSelector.moveY(20);
            if( this.menuSelector.points[0].y > 170)
            {
                this.menuSelector.points[0].y = 170;
                this.gameSelected=7;
            }
            break;

            case 13: //enter/numpad enter
            //enter game

            let levelToLoad:any = undefined;
            console.log(`level to load ${this.gameSelected}`)
            switch(this.gameSelected)
            {
                case 1:
                    GameManager.getInstance().loadLevel( new SampleLevel() );
                    break;
                case 2:
                    GameManager.getInstance().loadLevel( new XpaceRocksLevel() );
                    // levelToLoad = new AsteroidsLevel();
                    break;
                case 3:
                    GameManager.getInstance().loadLevel( new PlatformLevel() );
                    break;
                case 4:
                    // this level width and height are 320 x 240
                    // we have to scale it by 2 so we can transform it to 640 x 480
                    // which is the canvas size set and used by the other levels
                    GameManager.getInstance().loadLevel( new AndroidLevel() );
                    GameManager.getInstance().scaleCanvas(2,2);
                    break;
                case 5:
                    GameManager.getInstance().loadLevel( new CollisionLevel() );
                    break; 
                case 6:
                    GameManager.getInstance().loadLevel( new TowerDefense() );
                    GameManager.getInstance().scaleCanvas(1,1);//scaling to adjust canvas to towerdefense level width and height
                    break; 
                case 7:
                        GameManager.getInstance().loadLevel( new ControllerLevel() );
                    break; 
            }
            // GameManager.getInstance().loadLevel( levelToLoad );
            // break;
        }//
    }

}