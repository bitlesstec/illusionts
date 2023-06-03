import { AnimatedTile } from "../lib/graphic/AnimatedTile.js";
import { Background } from "../lib/graphic/Background.js";
import { PointerControl } from "../lib/input/PointerControl.js";
import { BaseLevel } from "../lib/level/BaseLevel.js";
import { GameState } from "../lib/manager/GameState.js";
import { AnimatedTileConfig } from "../lib/ntfc/AnimatedTileConfig.js";
import { AssetLoadable } from "../lib/ntfc/AssetLoadable.js";
import { Initiable } from "../lib/ntfc/Initiable.js";
import { AssetUtil } from "../lib/util/AssetUtil.js";
import { TileUtil } from "../lib/util/TileUtil.js";


/**
 * in this example you can find:
 * Background fileonX functionality
 * camera shake effect ( when left clicking )
 * camera flash effect ( when left clicking )
 * animated tiles
 * 
 */
export class BackgroundExample  extends BaseLevel implements Initiable, AssetLoadable
{
    //rows and cols for tiles parsing
    readonly COLS:number=32;
    readonly ROWS:number=18;
    

    imageMap: Map<string, HTMLImageElement>;

    bgColor:Background;
    bg:Background;
    // bgMiddle:Background;
    // bgFront:Background;

    pointerControl:PointerControl;

    animTile:AnimatedTile;



    yellowATile:AnimatedTileConfig = { index:0, lastIndex:3, srcY:16 };
    brownATile:AnimatedTileConfig = { index:0, lastIndex:3, srcY:32 };

    //array to get animated tiles, this will set the position of tiles when parsed
    animTileMap=[ 
        {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
        {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
        {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
        {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
        {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
        {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
        {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
        {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
        {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
        {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
        {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
        {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
        {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
        {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
        {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
        {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
        {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
        {},{},this.yellowATile,{},{},{},{},{},this.yellowATile,{},{},{},{},{},{},this.brownATile,this.brownATile,{},this.brownATile,{},{},{},{},{},{},{},{},{},{},{},{},{}
    ];

    animTiles:AnimatedTile[];

    constructor()
    {
        super(2048,288,512,288);
        this.imageMap = new Map<string, HTMLImageElement>();
        this.init();
    }


   async loadImages(): Promise<void> {

        let bgBackImg = await AssetUtil.getImage("/assets/BackgroundExample/fg1.png").then(img=>img);
        this.imageMap.set("bgBackImg", bgBackImg);

        let animatedTiles = await AssetUtil.getImage("/assets/BackgroundExample/animatedTiles.png").then(img=>img);
        this.imageMap.set("animatedTiles", animatedTiles);
    }



    loadSounds(): void {
    }
    loadData(): void {
    }




    async init(): Promise<void> 
    {

        this.pointerControl = new PointerControl();

        await this.loadImages();

        // this.bgColor = new Background();
        this.bg = new Background( this.imageMap.get("bgBackImg") );

        this.bg.setFillOnX( this.levelWidth );
        this.bg.setY( this.levelHeight-this.bg.h );

        //parsing array and getting animated tiles
        this.animTiles = TileUtil.parseAnimatedTiles( this.animTileMap, this.COLS, this.ROWS, 16, 16 );
        console.log("number of ANIM TILES: ", this.animTiles.length)

        //after you load all necesary set game state to playing
        //cause render methods is displaying the menu in this state
        this.gameState = GameState.PLAYING;
    }


    update( delta:number )
    {
        switch( this.gameState )
        {
            case GameState.LOADING:
            break;

            case GameState.PLAYING:
            
            this.camera.moveX( 4 * delta );

            //setting config for shake and flash effects, those will be activated when left click is done 
            this.camera.shakeEffect.updateShake(delta,5,30,60);
            this.camera.flashEffect.updateFlash(delta, .3);//.3 second

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

                //set white color and print hello word in screen at 20, 20
                ctx.fillStyle = "#FFF";
                ctx.fillText( "loading" ,this.levelWidth/2,20);
            break;
            case GameState.PLAYING:

                
                ctx.save();
                ctx.translate(this.camera.x, this.camera.y);

                    ctx.fillStyle = "#fce0a8";
                    ctx.fillRect( this.camera.viewX, 0, this.levelWidth, this.levelHeight );
                    this.bg.render(ctx);

                    this.camera.flashEffect.render( ctx );
                    
                // this.animTile.render( ctx, this.imageMap.get("animatedTiles") );    

                //render animated tiles at the bottom of the screen
                for( const tl of this.animTiles)
                {
                    tl.render( ctx, this.imageMap.get("animatedTiles") );
                }

                ctx.restore();
            
            break;
        }
    }



    mouseUp(e:MouseEvent)
    {
        if( !this.camera.shakeEffect.isShaking )
        {
            this.camera.shakeEffect.activate(true);
            this.camera.flashEffect.activate(true);
        }
        
    }

}