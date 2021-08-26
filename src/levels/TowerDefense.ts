import { Sprite } from "../lib/graphic/Sprite.js";
import { Tile } from "../lib/graphic/Tile.js";
import { BaseLevel } from "../lib/level/BaseLevel.js";
import { GameState } from "../lib/manager/GameState.js";
import { AssetLoadable } from "../lib/ntfc/AssetLoadable.js";
import { Initiable } from "../lib/ntfc/Initiable.js";
import { AssetUtil } from "../lib/util/AssetUtil.js";
import { TileUtil } from "../lib/util/TileUtil.js";



export class TowerDefense extends BaseLevel implements Initiable, AssetLoadable
{


    cols:number=32;
    rows:number=18;
    tileWidth:number=16;
    tileHeight:number=16;
    tiles:Tile[];

    tileMap = [
        9,9,9,9,1,2,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,1,2,9,9,9,9,
        9,9,9,9,1,2,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,1,2,9,9,9,9,
        9,9,9,9,1,2,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,1,2,9,9,9,9,
        9,9,9,9,1,2,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,1,2,9,9,9,9,
        9,9,9,9,1,2,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,1,2,9,9,9,9,
        9,9,9,9,1,2,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,1,2,9,9,9,9,
        9,9,9,9,1,2,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,1,2,9,9,9,9,
        9,9,9,9,1,2,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,1,2,9,9,9,9,
        9,9,9,9,1,2,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,1,2,9,9,9,9, 
        9,9,9,9,1,2,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,1,2,9,9,9,9,
        9,9,9,9,1,2,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,1,2,9,9,9,9,
        9,9,9,9,1,2,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,1,2,9,9,9,9,
        9,9,9,9,1,2,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,1,2,9,9,9,9,
        9,9,9,9,1,6,3,3,3,3,3,3,3,3,3,3, 3,3,3,3,3,3,3,3,3,3,8,2,9,9,9,9,
        9,9,9,9,5,4,4,4,4,4,4,4,4,4,4,4, 4,4,4,4,4,4,4,4,4,4,4,7,9,9,9,9,
        9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,
        9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,
        9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9, 9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9
    ];



    enemy:Sprite;
    turret:Sprite;
    bullet:Sprite;


    constructor()
    {
        super(512,288);
        this.init();
    }


    async loadImages(): Promise<void>  
    {
       // loading images/assets of the game
       let bgtilesImg = await AssetUtil.getImage( "/assets/towerdefense/bgtiles.png" ).then( img => img );
       this.imageMap.set( "bgtiles" , bgtilesImg );

       let enemyImg = await AssetUtil.getImage( "/assets/towerdefense/enemy.png" ).then( img => img );
       this.imageMap.set( "enemy" , enemyImg );

       let turretImg = await AssetUtil.getImage( "/assets/towerdefense/turret.png" ).then( img => img );
       this.imageMap.set( "turret" , turretImg );

       let bulletImg = await AssetUtil.getImage( "/assets/towerdefense/redBullet.png" ).then( img => img );
       this.imageMap.set( "bullet" , bulletImg )

    }

    loadSounds(): void {
    }
    loadData(): void {
    }
    

    async init()
    {
        await this.loadImages();

        this.tiles = TileUtil.parse( this.tileMap, this.cols, this.rows, this.tileWidth, this.tileHeight );


        this.enemy = new Sprite( this.imageMap.get("enemy") );
        this.enemy.setPosition( 64, 0 );

        this.turret = new Sprite( this.imageMap.get("turret") );
        this.turret.visible=false;

        this.bullet = new Sprite( this.imageMap.get("bullet") );
        this.bullet.visible=false;


        this.spriteList.push(this.enemy);
        this.spriteList.push(this.turret);
        this.spriteList.push(this.bullet);



        this.gameState=GameState.PLAYING;
    }

    update( delta:number)
    {

        switch( this.gameState )
        {
            case GameState.LOADING:
            break;
            case GameState.PLAYING:
            break;
        }

    }

    render(ctx: CanvasRenderingContext2D)
    {
        switch( this.gameState )
        {
            case GameState.LOADING:
            break;
            case GameState.PLAYING:

            TileUtil.renderTiles( ctx, this.imageMap.get( "bgtiles" ), this.tiles );


            for( let spr of this.spriteList )
            {
                spr.render(ctx);
            }

            break;
        }
    }

    

}