
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

    //for parabolic movement
    readonly DEG2RAD:number = Math.PI/180;
    readonly ang:number = 45 * this.DEG2RAD;
    launchForce:number = 9;

    tilesRows:number = 15;
    tilesCols:number = 40;
    tileSize:number = 32;
    tiles:Tile[];

    circle:CircleShape;

    purpleCircle:Sprite;

    mouseX:number = 0;
    mouseY:number = 0;

    //for rotating around purple circle
    angle:number = 0;
    radioDistance = 32;


    launchTime:number=0;

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

        //UPDATING PROJECTILE MOVEMENT
        let spdYY = (9.81 *  (Date.now() - this.launchTime) / 1000) - ( this.launchForce * Math.sin( this.ang))
        let vy = spdYY * delta * 10;

        this.circle.moveX( this.circle.spdX * delta * 10);
        this.circle.moveY(vy);

        this.angle += 5 * delta;//how  many angles by stepp will be rotating
        SpriteUtil.rotateAround( this.purpleCircle, new Point(205,205), this.angle, this.radioDistance );




        break;
        }
    }


    async init(){
        await this.loadImages();

        console.log("loading sounds")
        await this.loadSounds();

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
    async loadSounds(): Promise<void> {
    }

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
        TileUtil.renderTiles( ctx, this.imageMap.get( "tileBg" ), this.tiles );

        this.circle.render(ctx);

        //must be after we put the tiles, otherwise it wont show
        ctx.fillStyle ="#000";
        ctx.fillText(`use A or D to move the view| lacunchForce ${this.launchForce}`, this.camera.viewX+20, this.camera.viewY+20 );
        ctx.fillText(`use SPACE to launch red ball `, this.camera.viewX+20, this.camera.viewY+40 );
        ctx.fillText(`use W or S to change rotation distance ${this.radioDistance}`, this.camera.viewX+20, this.camera.viewY+60 );

        ctx.restore();
        // SpriteUtil.rotateAround( this.purpleCircle, 100, 250, 100, this.angle); this.angle+=1;
        this.purpleCircle.render(ctx);
            
        ctx.fillRect(200, 200, 10, 10 );

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

            
        }//

    }//

    keyUp(event:KeyboardEvent)
    {
        switch( event.keyCode )
        {
            case 87: //W ncrease rotation distance
                this.radioDistance+=2;
                if( this.radioDistance >= 200 )this.radioDistance=200;
                console.log("inc dist")
            break;
            case 83: //S decrease rotation distance 
                this.radioDistance-=2;
                if( this.radioDistance <= 1)this.radioDistance = 1;
                console.log("dec dist")
            break;

            case 65: //A
            this.launchForce++;
            break;

            case 68: //D
            this.launchForce--;
            break;

            case 32: //SPACE

            //SETTING INITIAL PROJECTILE MOVEMENT
                this.circle.setX(100)
                this.circle.setY(300)  
                // let ang:number = launchAngle * DEG2RAD;
                let v0x:number = this.launchForce * Math.cos(this.ang); // initial velocity in x
                let v0y:number = this.launchForce * Math.sin(this.ang); // initial velocity in y

                this.circle.spdX = v0x;
                this.circle.spdY = v0y;

                this.launchTime = Date.now();
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