
import { BaseLevel } from '../../lib/level/BaseLevel.js';
import { Initiable } from '../../lib/ntfc/Initiable.js';
import { AssetLoadable } from '../../lib/ntfc/AssetLoadable.js';
import { AssetUtil } from "../../lib/util/AssetUtil.js";
import { GameState } from '../../lib/manager/GameState.js';
import { Tile } from '../../lib/graphic/Tile.js';
import { TileUtil } from '../../lib/util/TileUtil.js';
import { Sprite } from '../../lib/graphic/Sprite.js';
import { AnimationLoop } from '../../lib/graphic/AnimationLoop.js';
import { CollisionUtil } from '../../lib/util/CollisionUtil.js'
import { Point } from '../../lib/graphic/Point.js';
import { Collider } from '../../lib/graphic/shape/Collider.js';

export class BlackCatGamePlatformer extends BaseLevel
implements AssetLoadable, Initiable
{
    readonly colissionUtil:CollisionUtil = CollisionUtil.getInstance();
    // tileMap:number[]=[];
    tiles:Tile[];
    cat:Sprite;
    
    moveRight:boolean;
    moveLeft:boolean;
    readonly CAT_SPD:number=35;

    //jump related variables
    jump:boolean=true;
    onGround:boolean=true;
    grav:number=20; //9.80
    ySpd:number=0;

    updateCount:number=0;
    marginLeft:number = 0;
    marginRight:number = 0; 

    catIcons:Sprite[]=[];

    iconRetrieved:number=0;


    tileMap:number[]=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 
                      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 
                      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 
                      0, 0, 0, 0, 0, 2, 1, 3, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
                      0, 0, 0, 0, 2, 1, 1, 1, 3, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
                      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]


    catIconsMap:number[]=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                          0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                          0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0,
                          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // tileMap:number[]=  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    //                     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    //                     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    //                     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    //                     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    //                     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    //                     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    //                     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    //                     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    //                     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 
    //                     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 1, 1, 1, 1, 1, 1, 0, 3, 0, 0, 0, 0, 0, 2, 0, 1, 1, 1, 1, 1, 1, 
    //                     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 3, 0, 0, 0, 2, 0, 1, 1, 1, 1, 1, 1, 1, 
    //                     0, 0, 0, 0, 0, 2, 1, 3, 0, 0, 0, 0, 0, 0, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
    //                     0, 0, 0, 0, 2, 0, 1, 0, 3, 0, 0, 0, 0, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
    //                     1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

    //settings for moving platform
    onPlatform:boolean;
    movingPlatform:Collider;
    movingPlatformSPD:number = 30;
    initPosition:number = 20;
    endPosition:number = 640;


    constructor()
    {
        super( 1280, 480, 640, 480 );
        this.init();
    }

    async init(): Promise<void>  {
       
        
        await this.loadImages();
        await this.loadData();
        await this.loadSounds();
      

        //parse tiles here
        this.tiles = TileUtil.parse(this.tileMap, 40, 15, 32, 32 );


        this.cat = new Sprite( this.imageMap.get("catImg"), { srcX:0 , srcY:0 , w:38, h:40, frames: 3 } );
        this.cat.setPosition( 20, 200 );//this will put cat in middle air
         
        this.cat.animationLoop = AnimationLoop.NONE;
        this.cat.anchor = new Point( this.cat.w/2, this.cat.h );
        this.cat.animationStepLimit = 5;
        this.cat.spdY=0;

        const slopeCollider = new Collider( 18, 0, 2, 40, this.cat);
        slopeCollider.anchor= new Point( 1, this.cat.h );
        this.cat.colliders.set("slopeCollider", slopeCollider );

        this.moveLeft=false;
        this.moveRight=false;

        //this sets the margin to move the camera along the level
        this.setMargings();


        //moving platforms
        this.onPlatform=false;
        this.movingPlatform = new Collider( 20, 150, 64, 32 );


        this.gameState = GameState.PLAYING;
    }

    async loadImages(): Promise<void> 
    {
        let blacktileImg = await  AssetUtil.getImage("/assets/catgame/blacktile.png").then(img=>img);
        this.imageMap.set( "blacktileImg", blacktileImg );

        let catImg = await  AssetUtil.getImage("/assets/catgame/cat_walk.png").then(img=>img);
        this.imageMap.set( "catImg", catImg );

        let catIconImg = await  AssetUtil.getImage("/assets/catgame/sp_icon_cat_1.png").then(img=>img);
        this.imageMap.set( "catIconImg", catIconImg );

    }

    async loadSounds(): Promise<void> {

    }

    async loadData(): Promise<void> {

        let tileJson:any = await AssetUtil.makeAsyncRequest( "get", "/assets/catgame/black_platform_tile_map.json").then( data => data );
        tileJson = JSON.parse(tileJson);  
        // console.log( tileJson.layers[0].data ) //.layers[0].data );
        // this.tileMap = tileJson.layers[0].data;

        //parse cat icon tiles to get correct position
        let catIconTiles:Tile[]= TileUtil.parse( this.catIconsMap, 40, 15, 32, 32 );

        //then create cat Icon Sprites
        let nbr:number = 0;
        for( let tile of catIconTiles )
        {
            this.catIcons[ nbr ] = new Sprite( this.imageMap.get( "catIconImg") );
            this.catIcons[ nbr ].setPosition( tile.x, tile.y );
            console.log("creating icon cat "+nbr)
            nbr++;
        }

        console.log("length catIcon: "+this.catIcons.length)

    }


    update(delta:number)
    {

        switch( this.gameState )
        {
            case GameState.LOADING:
            break;
            case GameState.PLAYING:


            this.updateCount++;
            if(this.updateCount >= 30 )
            {
                this.updateCount = 0;
                // console.log( `X: ${this.cat.colliders.get("slopeCollider").getX()} - Y:${this.cat.colliders.get("slopeCollider").getY()}` )
                // console.log( `XXX: ${this.cat.colliders.get("slopeCollider").parent.getX()} - YYY:${this.cat.colliders.get("slopeCollider").parent.getY()}` )
            }


            if(this.moveRight)
            {
                this.cat.spdX = this.CAT_SPD * delta;
            }
            else if( this.moveLeft)
            {
                this.cat.spdX = -this.CAT_SPD * delta;
            }

            this.checkPlayerMargings(delta);

            //checking gravity
            if( this.jump || !this.onGround )
            {
                this.cat.spdY += this.grav * delta;
                if( this.cat.spdY  >= 14 )this.cat.spdY = 14;
            }

            //make cat move depending spdX
            this.cat.move();
            // this.cat.moveY(this.grav);

            //check collision with tiles here
            if( this.cat.spdY > 0 || this.onGround )
            {
                // let colside =  this.colissionUtil.tileCollision( this.cat.colliders.get("slopeCollider"), this.tiles );
                let colside = "";
                
                    colside =  this.colissionUtil.tileCollision( this.cat.colliders.get("slopeCollider"), this.tiles );
                    
                    if( colside )
                    console.log(`colside: ${colside}`)
                    
                    if( colside.includes("bottom")  ) {
                        console.log("entro bottom")
                        this.onGround=true;
                        this.jump=false;
                        this.cat.spdY = 0;
                        // this.gameState=GameState.BREAK_POINT;
                        // break;
                    }
                    else if( colside === "" )
                    {
                        this.onGround = false;
                    }

            }


            //check collision between cat and cat icons
            for( let catIcon of this.catIcons){
                if( this.colissionUtil.spriteRectangleCollision( this.cat, catIcon ) && catIcon.visible ){
                    this.iconRetrieved++;
                    catIcon.visible=false;
                }
            }


            //moving platform
            if( this.movingPlatform.getX() <= this.initPosition ||  this.movingPlatform.getX() >= this.endPosition )
            {
                this.movingPlatformSPD *= -1;
            }

            this.movingPlatform.setX( this.movingPlatform.getX() + ( this.movingPlatformSPD * delta ) );


            if( this.colissionUtil.sideAndPushCollision( this.cat, this.movingPlatform ) === "bottom" )
            {
                this.onPlatform = true;
            }

            //adding same spd to cat if on platform
            if( this.onPlatform )
            {
                this.onGround = true;
                this.jump = false;
                this.cat.spdY = 0;
                this.cat.moveX( this.movingPlatformSPD * delta );
            }

            
            break;
            case GameState.BREAK_POINT:
            break;
        }

    }

    

    render( ctx:CanvasRenderingContext2D)
    {

        ctx.fillStyle = "#000";
        ctx.fillRect(0,0, this.levelWidth, this.levelHeight)

        switch( this.gameState )
        {
            case GameState.LOADING:
            break;
            
            case GameState.PLAYING:
            // case GameState.BREAK_POINT:
            
            ctx.save();
            
            ctx.translate(this.camera.x, this.camera.y);

            //blue sky bg
            ctx.fillStyle ="#5fcde4";
            ctx.fillRect( this.camera.viewX, 0, this.levelWidth, this.levelHeight );

            //render tiles inside camera view
            TileUtil.renderTiles( ctx, this.imageMap.get( "blacktileImg" ), this.tiles, this.camera, 64 );

            ctx.fillStyle="white";
            ctx.fillText("icons:"+this.iconRetrieved,this.camera.viewX + 20 ,this.camera.viewY+20 );

            this.cat.render(ctx);

            // ctx.fillStyle = "red";
            // const col:Collider =  this.cat.colliders.get("slopeCollider");
            // ctx.fillRect( col.getX(), col.getY(), col.w, col.h );

            for( let catIcon of this.catIcons ){
                catIcon.render( ctx );
            }
            
            //displaying moving platform
            ctx.fillStyle = "#000";
            ctx.fillRect( this.movingPlatform.getX(), this.movingPlatform.getY(), this.movingPlatform.w, this.movingPlatform.h );

            ctx.restore();
            break;
            
        }

    }



    keyDown( event:KeyboardEvent )
    {
        switch( event.keyCode )
        {
            case 87://W | JUMP
            if(!this.jump)
                {
                    //this.androidSprite.setNewAnimation( this.imageMap.get("androidJump") )
                    this.jump=true;
                    // this.grav=-5;
                    this.cat.spdY = -10;
                    this.onGround=false;
                    this.onPlatform=false;
                }
                break;
            case 65: //A | MOVE LEFT
              this.moveLeft=true;
              this.moveRight=false;

            if( this.cat.xScale !== -1)
                this.cat.xScale =-1;

            if( this.cat.animationLoop !== AnimationLoop.FORWARD )    
                this.cat.animationLoop= AnimationLoop.FORWARD;

            break;

            case 68: //D | MOVE RIGHT
              this.moveLeft=false;
              this.moveRight=true;

              if( this.cat.xScale !== 1)
                  this.cat.xScale = 1;

              if( this.cat.animationLoop !== AnimationLoop.FORWARD )    
                  this.cat.animationLoop= AnimationLoop.FORWARD;

            break;

        }//

    }//


    keyUp( event:KeyboardEvent )
    {
        switch( event.keyCode )
        {
            case 87://W
                break;
            case 65: //A
              this.moveLeft=false;
              this.cat.animationLoop = AnimationLoop.NONE;
              this.cat.setCurrentFrame(0);
              this.cat.spdX = 0;
            break;

            case 68: //D
              this.moveRight=false;
              this.cat.setCurrentFrame(0);
              this.cat.animationLoop = AnimationLoop.NONE;
              this.cat.spdX = 0;
            break;

            case 32: //enter
            break;
        }//

    }//


    setMargings()
    {
        let marginWidth = Math.ceil( this.camera.viewWidth/3 );
        this.marginLeft = marginWidth;
        this.marginRight = marginWidth*2; 
    }

    checkPlayerMargings(delta:number)
    {

        if( this.cat.getX()-8 < this.camera.viewX+this.marginLeft )  this.camera.moveX(-1);
        else if( this.cat.getX()+8 > this.camera.viewX+this.marginRight ) this.camera.moveX( 1 );
    }


}