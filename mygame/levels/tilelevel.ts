import { BaseLevel } from "../../src/com/bitless/level/baselevel.js";
import { Tile } from "../../src/com/bitless/graphic/tile.js";
import { TileUtil } from "../../src/com/bitless/util/tileutil.js";
import { GameState } from "../../src/com/bitless/manager/gamestate.js";
import { AssetLoadable } from "../../src/com/bitless/ntfc/assetLoadable.js";

/**
 * this class will demonstrate the usage of the camera
 * and tilesets
 */
export class TileLevel extends BaseLevel
                       implements AssetLoadable
{

     tileMap: number[] = 
     [  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,

        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,

        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
     ];

     tileList:Tile[];

     cols = 40;
     rows = 15;
     tileWidth = 32;
     tileHeight = 32;
     isRendering:boolean = false;


    constructor()
    {
        super( 1280, 960, 640, 480 );
        this.loadImages();
        this.tileList = TileUtil.parse( this.tileMap, this.cols, this.rows, 
                                                      this.tileWidth, this.tileHeight );

    }//
   
  


    update( delta:number)
    {
        switch( this.gameState )
        {
            case GameState.LOADING:

            if( this.isLoadComplete() ) this.gameState = GameState.PLAYING;
            
            break;
            
            case GameState.PLAYING:
                if( this.isRendering )
                    this.camera.moveX( 2 * delta );
            
            break;

        }//

        
    }//


    render( ctx: CanvasRenderingContext2D )
    {   
        switch( this.gameState )
        {
            case GameState.LOADING:
            
            break;
            
            case GameState.PLAYING:
           
                ctx.save();
                //Math.floor is used because canvas will flicker if decimals are used
                //cause there is no 0.5 pixel width
                ctx.translate( Math.floor( this.camera.x ) , this.camera.y );
                
                //this will set a black background only on the area of the view, not
                //the whole level 
                ctx.fillStyle = "#000";
                ctx.fillRect( Math.floor( this.camera.viewX ), this.camera.viewY, this.camera.viewWidth, this.camera.viewHeight );

                //render tiles
                TileUtil.renderTiles( ctx, this.imageMap.get( "tileImage" ), this.tileList );
                
                ctx.fillStyle ="#FFF";

                //@todo i have to
                //this text will be display always in the same place even if the camera/view is moving
                ctx.fillText( "HUD TEXT", Math.floor( this.camera.viewX ) + 20, this.camera.viewY + 100 );
  
                ctx.restore();
                
            break;

        }//

       


    }//


    loadImages(): void 
    {
        let tileImage =  new Image();
            tileImage.src = "/assets/cubes.png";
       this.imageMap.set( "tileImage", tileImage );
    }

    loadSounds(): void {
    }
    loadData(): void {
    }

    isLoadComplete(): boolean 
    {
        let loadedImgs = 0;
        for ( let img of this.imageMap.values() ) 
        {
            if( img.complete )
                loadedImgs++;
        }

        return this.imageMap.size === loadedImgs;
    }//



    keyUp( event )
    {
        switch( event.keyCode )
        {
            case 65: //A
            // this.sqrSprite.x-=3;
            break;
            
            case 68: //D
            // this.sqrSprite.x+=3;
            this.isRendering = true;
            // this.camera.moveX( 0.5 );
            break;
            
            case 83: //S
            // this.sqrSprite.y+=3;
            break;
            
            case 87: //W
            // this.sqrSprite.y-=3;
            break;
        }//


    }


}//