
import { Tile } from "../lib/graphic/Tile.js";
import { BaseLevel } from "../lib/level/BaseLevel.js";
import { GameState } from "../lib/manager/GameState.js";
import { AssetLoadable } from "../lib/ntfc/AssetLoadable.js";
import { Initiable } from "../lib/ntfc/Initiable.js";
import { AssetUtil } from '../lib/util/AssetUtil.js';
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


    update()
    {
        switch( this.gameState )
        {
        case GameState.LOADING:
        break;

        case GameState.PLAYING:
            // this.camera.moveX(1);
            
        break;
        }
    }


    async init(){
        await this.loadImages();

        this.tiles = TileUtil.parse( this.tileMap,  this.tilesCols, this.tilesRows, 32,32 );

        // afther everything is loaded change state to playing
        this.gameState = GameState.PLAYING;
    }


    async loadImages(): Promise<void> {

        //loading the image that contains all the tiles for the bakground
        //and saving it in the imageMap to be used when needed
        let tileBackground = await AssetUtil.getImage("/assets/platform-tiles.png").then(img=>img);
        this.imageMap.set("tileBg", tileBackground);
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

        

        TileUtil.renderTiles( ctx, this.imageMap.get( "tileBg" ), this.tiles );


        //must be after we put the tiles, otherwise it wont show
        ctx.fillStyle ="#000";
        ctx.fillText("use A or D to move the view", this.camera.viewX+20, this.camera.viewY+20)


        ctx.restore();
            
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


}//