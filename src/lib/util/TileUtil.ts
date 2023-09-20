
import { Camera } from "../camera/Camera";
import { Config } from "../cfg/Config";
import { AnimatedTile } from "../graphic/AnimatedTile";
import { Tile } from "../graphic/Tile";
import { AnimatedTileConfig } from "../ntfc/AnimatedTileConfig";

export class TileUtil
{

/**
 * this function will transform an array of numbers, used to represent the image frames should be act
 * as tiles, the result will be a list of the x and y position where the tile should be displayed
 * as well as the width, height and the image each tile repreent.
 * NOTE: all frames at index 0 are ignored, because those act as empty spaces in tile map creation
 * @param tileMap 
 * @param cols 
 * @param rows 
 * @param tileWidth 
 * @param tileHeight 
 */
static parse( tileMap:number[], cols:number, rows:number, tileWidth:number, tileHeight:number, srcY?:number):Tile[]
{
    let tileList:Tile[] = [];

    let tileIndex:number = 0;
        
        for( let i = 0; i < rows; i++ )
            {
                let tileY = i * tileHeight;
            
                    //for de columnas
                    for( let j = 0; j < cols; j++ )
                    {
                        let tileX = j * tileWidth;
                      
                        //value of tileMap, can be image or solid tile
                        let tileFrame = tileMap[ tileIndex ];
                       
                        tileIndex++;
                         
                        //all tiles with 0 values are ignored so they can be used to sort
                        //other tiles used as sprite positions, etc.
                        if( tileFrame == 0 ) continue;
                                
                        let t = new Tile( tileX, tileY, tileWidth, tileHeight, 
                                        tileFrame*tileWidth , srcY , tileFrame );

                        tileList.push( t );//tile added
                    }//j
            } //i       

        return tileList;
}//



static parseAnimatedTiles( tileMap:any[], cols:number, rows:number, tileWidth:number, tileHeight:number):AnimatedTile[]
{
    let tileList:AnimatedTile[] = [];

    let tileIndex:number = 0;
        
        for( let i = 0; i < rows; i++ )
            {
                let tileY = i * tileHeight;
            
                    //for de columnas
                    for( let j = 0; j < cols; j++ )
                    {
                        let tileX = j * tileWidth;
                      
                        //value of tileMap, can be image or solid tile
                        let tileObject:AnimatedTileConfig = tileMap[ tileIndex ];
                       
                        tileIndex++;
                         
                        //all tiles with 0 values are ignored so they can be used to sort
                        //other tiles used as sprite positions, etc.
                        if(  Object.entries( tileObject ).length == 0 ) continue;
                                
                        let at = new AnimatedTile( tileX, tileY, tileWidth, tileHeight, 
                                                   0, tileObject.srcY, tileObject.index, tileObject.lastIndex );

                        tileList.push( at );//tile added
                    }//j
            } //i       

        return tileList;
}//


/**
 * this function is used to parse tiles from Tilered app
 * map means is the complete map with the null values on it
 * cleanmap is the tilemap without nulls
 * @param tilemap 
 * @returns 
 */
static parseTileMap(tilemap:any)
{
    const tiles:Tile[]=[];   
    for( const idx in tilemap )
    {

        const t = tilemap[idx];
        if( t !== null )
        {
            tiles.push( new Tile( t.dstX, t.dstY, t.tileW, t.tileH, t.srcX, t.srcY, t.index ))
        }

    }
    return tiles;
}


/**
 * this function will render tiles, it needs an array of tiles which will be assosiated
 * to an image frame with tile.imageIndex property.
 * if there is a camera tiles will be rendered only inside viewWidth and viewHeight,
 * if no camera is present it will render all tiles ,this is useful if we have an 
 * static small level with low ammount of tiles to render.
 * @param ctx 
 * @param img 
 * @param tiles 
 * @param camera 
 * @param margin this margin is the ammount of extra
 */
static renderTiles( ctx: CanvasRenderingContext2D, img:HTMLImageElement, tiles:Tile[], camera?:Camera, margin?:number ):void
{

    //render only tiles inside camera view
    if(camera !== undefined)
    {
        // console.log("entering camera rendering")
        //setting parameters for view where tiles will be displayed
        // let mar = margin?margin:Config.CAMERA_MARGIN;
        let x2 = camera.viewX - camera.offset.left;
        let w2 = camera.viewX + camera.viewWidth + camera.offset.right;
        let y2 = camera.viewY - camera.offset.top;
        let h2 = camera.viewY + camera.viewHeight + camera.offset.bottom;

        // console.log(`x2:${x2} w2:${w2}, y2:${y2}, h2:${h2}`);
        // console.log(`VX: ${camera.viewX} VY: ${camera.viewY} | ${camera.x},${camera.y}`);
        
        for(let ind = 0; ind < tiles.length; ind++)
        {
            if( tiles[ind].x >= x2 && tiles[ind].x+tiles[ind].w <= x2+w2 && tiles[ind].y >= y2 && tiles[ind].y+tiles[ind].h <= y2+h2 )
            {
                ctx.drawImage( 
                    img,tiles[ind].srcX,tiles[ind].srcY,tiles[ind].w,tiles[ind].h,
                        tiles[ind].x,tiles[ind].y,tiles[ind].w,tiles[ind].h);
            }
            else{
                continue;
            }
        }


    }else{

        for( let ind = 0; ind < tiles.length; ind++)
        {
            ctx.drawImage( 
                img,tiles[ind].srcX,tiles[ind].srcY,tiles[ind].w,tiles[ind].h,
                    tiles[ind].x,tiles[ind].y,tiles[ind].w,tiles[ind].h);
        }

    }

}//

}//