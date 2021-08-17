import { Tile } from "../graphic/Tile.js";

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
                let tiley = i * tileHeight;
            
                    //for de columnas
                    for( let j = 0; j < cols; j++ )
                    {
                        let tilex = j * tileWidth;
                      
                        //value of tileMap, can be image or solid tile
                        let tileFrame = tileMap[ tileIndex ];
                       
                        tileIndex++;
                         
                        //all tiles with 0 values are ignored so they can be used to sort
                        //other tiles used as sprite positions, etc.
                        if( tileFrame == 0 ) continue;
                                
                        let t = new Tile( tilex, tiley, tileWidth, tileHeight, 
                                        tileFrame*tileWidth , srcY , tileFrame );

                        tileList.push( t );//tile added
                    }//j
            } //i       

        return tileList;
}//

/**
 * this function will render tiles, it needs an array of tiles which will be assosiated
 * to an image frame with tile.imageIndex property
 * @todo make only show the tiles that are in the view/level bounds
 * @param ctx 
 * @param img 
 * @param tiles 
 */
static renderTiles( ctx: CanvasRenderingContext2D, img:HTMLImageElement, tiles:Tile[] ):void
{
    // using lambda
    // tiles.forEach( (tile) => 
    // {
    //     ctx.drawImage
    //     (
    //         img,
    //         tile.imageIndex * tile.w , 0,
    //         tile.w, tile.h,
    //         Math.floor( tile.x ), Math.floor( tile.y ),
    //         tile.w, tile.h
    //     );

    // }); 
    
    for( let x = 0; x < tiles.length; x++)
    {
        ctx.drawImage
        ( 
            img,tiles[x].srcX,tiles[x].srcY,
            tiles[x].w,tiles[x].h,
            tiles[x].x,tiles[x].y,
            tiles[x].w,tiles[x].h
        );
        // ctx.drawImage
        // (
        //     img,
        //     tiles[x].imageIndex * tiles[x].w, 0,
        //     tiles[x].w, tiles[x].h,
        //     Math.ceil( tiles[x].x ), Math.ceil( tiles[x].y ),
        //     tiles[x].w, tiles[x].h
        // );
    }

}//


}//