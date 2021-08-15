import { Sprite } from '../lib/graphic/Sprite.js';
import { BaseLevel } from '../lib/level/BaseLevel.js';
import { GameManager } from '../lib/manager/GameManager.js';
import { GameState } from '../lib/manager/GameState.js';
import { AssetLoadable } from '../lib/ntfc/AssetLoadable.js';
import { CircleShape } from '../lib/graphic/shape/CircleShape.js';
import { ImageUtil } from '../lib/util/ImageUtil.js';
import { Initiable } from '../lib/ntfc/Initiable.js';
import { Point } from '../lib/graphic/Point.js';
import { LineShape } from '../lib/graphic/shape/LineShape.js';
import { PolygonShape } from '../lib/graphic/shape/PolygonShape.js';
import { ImageMeasures } from '../lib/graphic/ImageMeasures.js';
import { CollisionUtil } from '../lib/util/CollisionUtil.js';
import { TileUtil } from '../lib/util/TileUtil.js';
import { TileMap } from './TileMap.js';
import { Tile } from '../lib/graphic/Tile.js';
import { HUDSprite } from '../lib/graphic/HUDSprite.js';
import { SampleLevel } from './SampleLevel.js';
import { XpaceRocksLevel } from './XpaceRocksLevel.js';
import { PlatformLevel } from './PlatformLevel.js';
import { AndroidLevel } from './AndroidLevel.js';






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

                this.menuSelector.render(ctx);
                
            break;
        }

       
    }


    //keyboard keys events / keyboard controller
    keyUp( event:KeyboardEvent )
    {
        switch( event.keyCode )
        {
            case 87: //W
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
            if( this.menuSelector.points[0].y > 110)
            {
                this.menuSelector.points[0].y = 110;
                this.gameSelected=4;
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
            }


            // GameManager.getInstance().loadLevel( levelToLoad );
            // break;
        }//
    }



}