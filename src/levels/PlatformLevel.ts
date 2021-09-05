
import { Point } from "../lib/graphic/Point.js";
import { CircleShape } from "../lib/graphic/shape/CircleShape.js";
import { Sprite } from "../lib/graphic/Sprite.js";
import { Tile } from "../lib/graphic/Tile.js";
import { BaseLevel } from "../lib/level/BaseLevel.js";
import { GameManager } from "../lib/manager/GameManager.js";
import { GameState } from "../lib/manager/GameState.js";
import { AssetLoadable } from "../lib/ntfc/AssetLoadable.js";
import { Initiable } from "../lib/ntfc/Initiable.js";
import { AssetUtil } from '../lib/util/AssetUtil.js';
import { MathUtil } from "../lib/util/MathUtil.js";
import { SpriteUtil } from "../lib/util/SpriteUtil.js";
import { TileUtil } from "../lib/util/TileUtil.js";


/**
 * this levels shows you how to:
 * - use and create tiles background and the use of
 * - use camera views
 * - make a platform game with attack and jump mechanics
 * - create HUD messages
 * - create destructible objects
 * - load assets to be used to crate different objects in the game
 */
export class PlatformLevel extends BaseLevel
                           implements AssetLoadable, Initiable
{

    tilesRows:number = 15;
    tilesCols:number = 40;
    tileSize:number = 32;
    tiles:Tile[];

    circle:CircleShape;

    purpleCircle:Sprite;

    mouseX:number = 0;
    mouseY:number = 0;

    angle:number = 0;

    //this array contains the frame of the image that will be set in the background
    tileMap:any  =
        [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,5,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4, 5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,

        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,4,5,1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,4,5,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1,4,5,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,

        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3, 3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
        2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2, 2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2
        ];


    constructor()
    {
        //this will instantiate the camera
        super( 1280, 480, 640, 480 );
        this.init();
    }


    update(delta:number)
    {
        switch( this.gameState )
        {
        case GameState.LOADING:
        break;

        case GameState.PLAYING:
            // this.camera.moveX(1);


           

            // this.circle.move();
            // this.circle.spdY += 9.8 *delta ;
            
        break;
        }
    }


    async init(){
        await this.loadImages();

        this.tiles = TileUtil.parse( this.tileMap,  this.tilesCols, this.tilesRows, 32,32 );


        this.circle = new CircleShape( new Point( 100,100 ), 20, "red" );

        this.purpleCircle = new Sprite( this.imageMap.get( "purpleCircle") );
        this.purpleCircle.setPosition(100, 250);

        // afther everything is loaded change state to playing
        this.gameState = GameState.PLAYING;
    }


    async loadImages(): Promise<void> {

        //loading the image that contains all the tiles for the bakground
        //and saving it in the imageMap to be used when needed
        let tileBackground = await AssetUtil.getImage("/assets/platform-tiles.png").then(img=>img);
        this.imageMap.set("tileBg", tileBackground);

        let circleImg = await AssetUtil.getImage("/assets/circle.png").then(img=>img);
        this.imageMap.set("purpleCircle", circleImg);

    }

    //those are not usable for now
    loadSounds(): void {}
    loadData(): void {}


    render( ctx:CanvasRenderingContext2D)
    {
        switch( this.gameState )
        {
        case GameState.LOADING:
        break;

        case GameState.PLAYING:

            

        ctx.save();
        ctx.translate(this.camera.x, this.camera.y);

        

        ctx.clearRect(0,0, 640,480);
        // TileUtil.renderTiles( ctx, this.imageMap.get( "tileBg" ), this.tiles );


        this.circle.render(ctx);

       

        //must be after we put the tiles, otherwise it wont show
        ctx.fillStyle ="#000";
        ctx.fillText("use A or D to move the view", this.camera.viewX+20, this.camera.viewY+20)


        ctx.restore();
        // SpriteUtil.rotateAround( this.purpleCircle, 100, 250, 100, this.angle); this.angle+=1;
        this.purpleCircle.render(ctx);
            
        break;
        }


    }//

    keyDown( event:KeyboardEvent )
    {
        switch( event.keyCode )
        {
            case 65: //A
            this.camera.moveX(-3);
            break;

            case 68: //D
            this.camera.moveX(3);
            break;

            // case 87: //W - trust
            // break;
        }//

    }//

    keyUp(event:KeyboardEvent)
    {
        switch( event.keyCode )
        {
        case 32: //D
        console.log( `up: ${this.mouseX} - ${this.mouseY} ` )

        // let arr:any = MathUtil.projectileTrajectory( new Point(this.circle.getX(), this.circle.getY() ),
        //                                                        new Point( this.mouseX, this.mouseY ), 300, 600 );
        let arr:any = MathUtil.projectile(65,9);


        this.circle.setX(100)
        this.circle.setY(300)                          
        this.circle.spdX = arr[0];
        this.circle.spdY = arr[1];

        console.log( `up: ${this.mouseX} - ${this.mouseY} == ${this.circle.spdX} - ${this.circle.spdY} ` )

        break;
        }
    }

    mouseMove( event:MouseEvent )
    {
        let boundingRect = GameManager.getInstance().canvas.getBoundingClientRect();

        this.mouseX = event.clientX - boundingRect.left;
        this.mouseY = event.clientY - boundingRect.top;
    }

}//