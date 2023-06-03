import { BaseLevel } from '../lib/level/BaseLevel.js';
import { GameState } from '../lib/manager/GameState.js';
import { Initiable } from '../lib/ntfc/Initiable.js';

export class SampleLevel extends BaseLevel implements Initiable
{

<<<<<<< HEAD
=======
    bg:Background;


    circle:Sprite;
    circleShape:CircleShape;
    lineShape:LineShape;
    lineShape2:LineShape;
    triangle:PolygonShape;

    knightSprite:Sprite;

    animKnight:Sprite;

    angleCounter:number=0;

    collisionUtil:CollisionUtil;

    tiles:Tile[];

    score:HUDSprite;
    damageTxt:HUDSprite;

    userName:string;


    dialog:Dialog;
    dialogText:string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. assadsad#sad";

    imageMap: Map<string, HTMLImageElement>;
>>>>>>> examples
    constructor()
    {
        //setting level width and height
        super( 640, 480 );
        this.init(); //init can be also here instead GAMESTATE.LOADING
    }

<<<<<<< HEAD
    init(): void {
        this.gameState = GameState.PLAYING;
=======
    async init()
    {
        this.imageMap = new Map<string, HTMLImageElement>();
        
        this.userName = "";
        await this.loadImages();
        this.loadSounds();

        this.dialog = new Dialog();
       
        //create circle sprite instance
        this.circle =  new Sprite( this.imageMap.get( "circleImage" ) );
        this.circle.setPosition( 400, 100);
        GameManager.getInstance().localStorage.setItem( "gamecode", "ASDASD");

        this.circleShape = new CircleShape( new Point(100,200), 50, "red" );
        this.circleShape.endAngle=0;
        this.circleShape.displayOutline=true;

        this.lineShape = new LineShape(new Point(30,30), new Point(100,70) );

        this.lineShape2 = new LineShape(new Point(30,100), new Point(100,100) );

        this.triangle = new PolygonShape([new Point(200,200), new Point(400,200), new Point(100,160)]);
        this.triangle.fillColor="red";
        this.triangle.strokeColor="green";
        this.triangle.strokeLineWidth=3;
        this.triangle.displayOutline=true;

        this.knightSprite = new Sprite(this.imageMap.get( "tileImage" ),{srcX:0, srcY:0, w:16, h:16, frames:3,label:""});
        this.knightSprite.setPosition( 20, 200 );

        this.animKnight = new Sprite(this.imageMap.get( "tileImage" ),{srcX:0, srcY:0, w:16, h:16, frames:3,label:""});
        this.animKnight.setPosition(20, 150);
        this.animKnight.setAnimationFrames(4,6);

        this.collisionUtil = CollisionUtil.getInstance();

        this.tiles = TileUtil.parse( TileMap.getSampleLevelMap(), 40,22, 16,16,16 );

        this.score = new HUDSprite(undefined, undefined,undefined,"Lives x", 3);
        this.score.setPosition(this.levelWidth - 100, 20);

        this.damageTxt = new HUDSprite(undefined, undefined,undefined,"",0);
        this.damageTxt.setPosition(this.levelWidth/2, this.levelHeight/2);
        this.damageTxt.setExpiration(100);

        this.bg = new Background( this.imageMap.get("starbg") );

        this.gameState=GameState.PLAYING;
>>>>>>> examples
    }

    render(ctx:CanvasRenderingContext2D)
    {

        switch( this.gameState )
        {
            case GameState.LOADING:
                break;
            case GameState.PLAYING:

                // set black background color and fill canvas with it
                ctx.fillStyle = "#000";
                ctx.fillRect( 0, 0, this.levelWidth, this.levelHeight );

                //set white color and print hello word in screen at 20, 20
                ctx.fillStyle = "#FFF";
                ctx.fillText( "Hello World!" ,20,20);
                break;
        }
       
    }

    /**
     * this function load the images before they can be used
     */
    async loadImages(): Promise<void> {
    }

    loadSounds(): void {
    }

    loadData(): void {
    }


}