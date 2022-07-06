
import { BaseLevel } from '../lib/level/BaseLevel.js';
import { GameState } from '../lib/manager/GameState.js';
import { Initiable } from '../lib/ntfc/Initiable.js';
import { Point } from '../lib/graphic/Point.js';
import { LineShape } from '../lib/graphic/shape/LineShape.js';
import { PolygonShape } from '../lib/graphic/shape/PolygonShape.js';
import { CollisionUtil } from '../lib/util/CollisionUtil.js';
import { Tile } from '../lib/graphic/Tile.js';
import { HUDSprite } from '../lib/graphic/HUDSprite.js';
import { Background } from '../lib/graphic/Background.js';
import { CanvasUtil } from '../lib/util/CanvasUtil.js';
import { Dialog } from '../lib/graphic/Dialog.js';

export class SampleLevel extends BaseLevel implements Initiable
{

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

    constructor()
    {
        //setting level width and height
        super( 640, 480 );
        this.init(); //init can be also here instead GAMESTATE.LOADING
    }

    async init()
    {
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

        this.knightSprite = new Sprite(this.imageMap.get( "tileImage" ),{srcX:0, srcY:0, w:16, h:16, frames:3});
        this.knightSprite.setPosition( 20, 200 );

        this.animKnight = new Sprite(this.imageMap.get( "tileImage" ),{srcX:0, srcY:0, w:16, h:16, frames:3});
        this.animKnight.setPosition(20, 150);
        this.animKnight.setAnimationFrames(4,6);

        this.collisionUtil = CollisionUtil.getInstance();

        this.tiles = TileUtil.parse( TileMap.getSampleLevelMap(), 40,22, 16,16,16 );

        this.score = new HUDSprite("Lives x", 3);
        this.score.setPosition(this.levelWidth - 100, 20);

        this.damageTxt = new HUDSprite("",0);
        this.damageTxt.setPosition(this.levelWidth/2, this.levelHeight/2);
        this.damageTxt.setExpiration(100);

        this.bg = new Background( this.imageMap.get("starbg") );

        this.gameState=GameState.PLAYING;
    }

    render(ctx:CanvasRenderingContext2D)
    {
        switch( this.gameState )
        {
            case GameState.LOADING:
                this.init();
            break;
            // case GameState.DIALOGUING:
                
            //     break;
            case GameState.PLAYING:

            this.bg.scrollX( 2, 640 );    
            this.bg.scrollY( 3, 480 ); 

            let cnt = this.angleCounter++;
            this.circleShape.endAngle= cnt;
            if(this.angleCounter >= 360) this.angleCounter = 0;
            
            this.knightSprite.updateAnimation();

            this.animKnight.updateAnimation();

            //checking line collision here
            if( this.lineShape2.points[0].y > 20 )
            {
                this.lineShape2.points[0].y--;
                this.lineShape2.points[1].y--;

                //if there is a collision this will print text in console
                if(this.collisionUtil.lineCollision(this.lineShape, this.lineShape2))
                {
                    // console.log("::: collision true at: "+this.lineShape2.points[0].y)
                }
            }

            //pushing damageText Up then it dissapears
            this.damageTxt.expire(()=>{ this.damageTxt.moveY(-1); });

            // console.log(`userName ${this.userName}`);

            break;
        }
    }


        switch( this.gameState )
        {
            case GameState.LOADING:
                ctx.fillStyle = "#000";
                ctx.fillRect( 0, 0, this.levelWidth, this.levelHeight );

                //set white color and print hello word in screen at 20, 20
                ctx.fillStyle = "#FFF";
                ctx.fillText( "loading" ,this.levelWidth/2,20);
            break;

            case GameState.DIALOGUING:
                ctx.fillStyle = "#000";
                ctx.fillRect( 0, 0, this.levelWidth, this.levelHeight );

                ctx.fillStyle = "#FFF";
                ctx.fillText( "Release D until dialog finish, C to quit" ,20,20);

                //blue background for dialog to display text by one line
                // ctx.fillStyle = "#00F";
                // ctx.fillRect( 100, 100, 500, 30 );
                // this.dialog.showDialog(ctx, "this is a text example for dialog fn!", 100, 100, 500);



                 //blue background for dialog for 2 text line height
                 ctx.fillStyle = "#00F";
                 ctx.fillRect( 100, 100, 500, 60 );
                 this.dialog.showDialog(ctx, this.dialogText, 100, 100, 500, 2);


                break;

            case GameState.PLAYING:

                // set black background color and fill canvas with it
                ctx.fillStyle = "#000";
                ctx.fillRect( 0, 0, this.levelWidth, this.levelHeight );

                //set white color and print hello word in screen at 20, 20
                ctx.fillStyle = "#FFF";
                ctx.fillText( "Hello World" ,20,20);

                ctx.fillText( "Release D to open Dialog" ,80,20);

                //this will render the sprice in the screen
                this.circle.render(ctx);

                this.circleShape.render(ctx);

                this.lineShape.render(ctx);
                this.lineShape2.render(ctx);

                this.triangle.render(ctx);

                this.knightSprite.render(ctx);

                this.animKnight.render(ctx);

                this.score.render(ctx);

                this.damageTxt.render(ctx);


                

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
    
    keyUp( event:KeyboardEvent )
    {
        switch( event.keyCode )
        {
            case 65: //A
            this.userName = prompt("Enter User Email:");
            break;
            case 32: //SPACE
            // this.audioManager.playSfx( "sfxsound" );
            CanvasUtil.takeScreenshot();
            break;
            case 68: //D

            if( !this.dialog.active )
            {
                console.log("show dialog")
                this.dialog.active=true;
                this.gameState = GameState.DIALOGUING;
            }
            else{

                //when its done the dialog, change to playing state
                 if( this.dialog.nextLine() )
                 {
                     this.gameState = GameState.PLAYING;
                 }
                
            }

            break;

            case 67: //C
            this.dialog.closeDialog();
            this.gameState = GameState.PLAYING;
            break;


        }//
    }

}