
import { Sprite } from '../lib/graphic/Sprite.js';
import { BaseLevel } from '../lib/level/BaseLevel.js';
import { GameState } from '../lib/manager/GameState.js';
import { AssetLoadable } from '../lib/ntfc/AssetLoadable.js';
import { CollisionUtil } from '../lib/util/CollisionUtil.js';
import { MathUtil } from '../lib/util/MathUtil.js';
import { SpriteUtil } from '../lib/util/SpriteUtil.js';
import { AssetUtil } from '../lib/util/AssetUtil.js';
import { Initiable } from '../lib/ntfc/Initiable.js';
import { Tile } from '../lib/graphic/Tile.js';


/**
 * this is the hello world example, if this works and
 * you can see "hello world" in your page, you have all
 * set...
 */
 export class XpaceRocksLevel extends BaseLevel
                             implements AssetLoadable, Initiable
{
    ship:Sprite;
    bullets:Sprite[] = [];
    smallRock:Sprite[] = [];
    medRock:Sprite[] = [];
    bigRock:Sprite[] = [];

    score:number;
    shipTrust:number;
    trust:boolean;
    rotateShip:number;

    planetoidSpan:number = 2000;
    planetoidSpanCounter:number = 0;
    tiles:Tile[];


 constructor()
{
    //setting level width and height
    super( 640, 480 );
//    this.init();
}
    
async init() 
{
    console.log("initttts")
    await this.loadImages();

    this.score = 0;
    this.trust = false;
    this.shipTrust = 0;
    this.rotateShip=0;

    //create circle sprite instance
    this.ship =  new Sprite( this.imageMap.get( "ship" ) );
    this.ship.setPosition( 640/2, 480/2 );

    for(let i = 0; i < 5; i++)
    {
    this.bullets[i] = new Sprite( this.imageMap.get( "bullet"+(i+1) ) );
    this.bullets[i].setPosition(-20,0);
    this.bullets[i].visible = false;

    this.smallRock[i] = new Sprite( this.imageMap.get( "smlrock"+(i+1) ) );
    this.smallRock[i].setPosition( -100,0 );
    this.smallRock[i].visible=false;
    this.spawnPlanetoid( this.smallRock[i])

    this.medRock[i] = new Sprite( this.imageMap.get( "midrock"+(i+1) ) );
    this.medRock[i].setPosition( -100,0 );
    this.medRock[i].visible=false;
    this.spawnPlanetoid( this.medRock[i])

    this.bigRock[i] = new Sprite( this.imageMap.get( "bigrock"+(i+1) ) );
    this.bigRock[i].setPosition( -100,0 );
    this.bigRock[i].visible=false;
    this.spawnPlanetoid(  this.bigRock[i])
    }
    this.gameState=GameState.PLAYING;
}


/**
* this method is used to get the input and process
* all updates of the game, by default the game is set
* to LOADING state, in this example, the level will check
* if all assets are loaded, if so, then it will change the
* state to PLAYING where the game should be processed, 
* in fact they are more GameState that can be used 
* @param delta 
*/
update( delta:number )
{
    switch( this.gameState )
    {
    case GameState.LOADING:

    try{
        this.init();
        console.log( "game is in LOADING state" );

    }catch(error){
        console.log(error)
    }

    // if( this.isLoadComplete ) this.gameState=GameState.PLAYING;
    // this.init();
    // console.log( "game is in LOADING state" );
    break;
    case GameState.PLAYING:console.log( "PLAYING" );

    this.moveShip();

    this.moveBullets();

    this.movePlanetoids();

    this.checkShootCollisions();

    break;
    }
}


/**
* function used to display sprites, words, images, shapes, etc in screen
* @param ctx this is the context retrieved from html canvas element 
*/
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
            //set background to black color
            ctx.fillStyle = "#000";
            ctx.fillRect( 0, 0, this.levelWidth, this.levelHeight );

            //set white color and print hello word in screen at 20, 20
            ctx.fillStyle = "#FFF";
            ctx.fillText( "Score:"+this.score, 20, 20);

            //this will render the sprice in the screen
            this.ship.render(ctx);

            for(let i = 0; i < 5; i++)
            {
                this.bullets[i].render(ctx); 
                this.smallRock[i].render(ctx);
                this.medRock[i].render(ctx);
                this.bigRock[i].render(ctx);
            }
        break;
    }

}

/**
* this function load the images before they can be used
* @TODO improve the way to load images
*/
async loadImages(): Promise<void> {
    console.log("loading images:::")

    let shipImg = await AssetUtil.getImage("/assets/ship.png").then(img=>img);


    let bulletImg= await AssetUtil.getImage("/assets/bullet.png").then(img=>img);
    let bulletImg2= await AssetUtil.getImage("/assets/bullet.png").then(img=>img);
    let bulletImg3= await AssetUtil.getImage("/assets/bullet.png").then(img=>img);
    let bulletImg4= await AssetUtil.getImage("/assets/bullet.png").then(img=>img);
    let bulletImg5= await AssetUtil.getImage("/assets/bullet.png").then(img=>img);


    let smlRockImg = await AssetUtil.getImage("/assets/rock1.png").then(img=>img);
    let smlRockImg2 = await AssetUtil.getImage("/assets/rock1.png").then(img=>img);
    let smlRockImg3 = await AssetUtil.getImage("/assets/rock1.png").then(img=>img);
    let smlRockImg4 = await AssetUtil.getImage("/assets/rock1.png").then(img=>img);
    let smlRockImg5 = await AssetUtil.getImage("/assets/rock1.png").then(img=>img);

    let midRockImg = await AssetUtil.getImage("/assets/rock2.png").then(img=>img);
    let midRockImg2 = await AssetUtil.getImage("/assets/rock2.png").then(img=>img);
    let midRockImg3 = await AssetUtil.getImage("/assets/rock2.png").then(img=>img);
    let midRockImg4 = await AssetUtil.getImage("/assets/rock2.png").then(img=>img);
    let midRockImg5 = await AssetUtil.getImage("/assets/rock2.png").then(img=>img);

    let bigRockImg = await AssetUtil.getImage("/assets/rock3.png").then(img=>img);
    let bigRockImg2 = await AssetUtil.getImage("/assets/rock3.png").then(img=>img);
    let bigRockImg3 = await AssetUtil.getImage("/assets/rock3.png").then(img=>img);
    let bigRockImg4 = await AssetUtil.getImage("/assets/rock3.png").then(img=>img);
    let bigRockImg5 = await AssetUtil.getImage("/assets/rock3.png").then(img=>img);


    //setting images to global imgMap
    this.imageMap.set('ship', shipImg );

    this.imageMap.set('bullet1',bulletImg );
    this.imageMap.set('bullet2',bulletImg2 );
    this.imageMap.set('bullet3',bulletImg3 );
    this.imageMap.set('bullet4',bulletImg4 );
    this.imageMap.set('bullet5',bulletImg5 );

    this.imageMap.set('smlrock1', smlRockImg);
    this.imageMap.set('smlrock2', smlRockImg2);
    this.imageMap.set('smlrock3', smlRockImg3);
    this.imageMap.set('smlrock4', smlRockImg4);
    this.imageMap.set('smlrock5', smlRockImg5);

    this.imageMap.set('midrock1', midRockImg);
    this.imageMap.set('midrock2', midRockImg2);
    this.imageMap.set('midrock3', midRockImg3);
    this.imageMap.set('midrock4', midRockImg4);
    this.imageMap.set('midrock5', midRockImg5);

    this.imageMap.set('bigrock1', bigRockImg );
    this.imageMap.set('bigrock2', bigRockImg2 );
    this.imageMap.set('bigrock3', bigRockImg3 );
    this.imageMap.set('bigrock4', bigRockImg4 );
    this.imageMap.set('bigrock5', bigRockImg5 );

    console.log("ENDloading images:::")

}

loadSounds(): void {
}
loadData(): void {
}

//this will check if all images are loaded
//before they can be attached to sprites
// isLoadComplete(): boolean
// {
//     let loadedImgs = 0;
//     for ( let img of this.imageMap.values() ) 
//     {
//         if( img.complete )
//         loadedImgs++;
//     }
//     return this.imageMap.size === loadedImgs;
// }


keyDown( event:KeyboardEvent )
{
    switch( event.keyCode )
    {
        case 65: //A
        this.rotateShip = 1;
        break;

        case 68: //D
        this.rotateShip = 2;
        break;

        case 87: //W - trust
        this.trust = true;
        break;
    }//

}//


keyUp( event:KeyboardEvent )
{
    switch( event.keyCode )
    {
        case 65: //A
        case 68: //D
        this.rotateShip = 0;
        break;

        case 32: //space / trust
        for( let i=0; i < this.bullets.length; i++)
        {
            let bllt = this.bullets[i];
            if(!bllt.visible)
            {
                console.log('shoot bullet')
                SpriteUtil.moveToAngle( bllt, this.ship.angle, 5, false );
                bllt.setPosition(this.ship.getX()+16, this.ship.getY()+16)
                bllt.visible=true;
                break;
            } 
        }
        break;
        case 87: //W
        this.trust = false;
        break;
    }//

}//


private moveShip()
{

    switch(this.rotateShip)
    {
        case 0: 
        break;
        case 1: 
        this.ship.angle-=0.1;
        break;
        case 2: 
        this.ship.angle+=0.1;
        break;
    }

    if(this.trust)
    {
        if(this.shipTrust < 4)
        {
        this.shipTrust += 0.1;
        }
        SpriteUtil.moveToAngle( this.ship, this.ship.angle, this.shipTrust, false );
    }
    else
    {
        this.shipTrust -= 0.03;
        if( this.shipTrust <= 0 ) 
        this.shipTrust = 0;
        else
        SpriteUtil.moveToAngle( this.ship, this.ship.angle, this.shipTrust, false );
    }
    //move shipt on spdX and spdY
    this.ship.move();

    //check if ship is out of level bounds
    // if( this.ship.x > this.levelWidth )
    //     this.ship.x= 0-this.ship.w;

    // if( this.ship.y > )
}//

private moveBullets()
{

    //move bullet if has speed
    for( let i = 0; i < this.bullets.length ;i++)
    {
        if( this.bullets[i].visible )
        this.bullets[i].move();

        //if is outside the level it will be set to false
        let bllt=this.bullets[i];
        if( !CollisionUtil.getInstance()
        .isInside( bllt.getX(),bllt.getY(),bllt.w, bllt.h,0,0,this.levelWidth, this.levelHeight ) )
        {
        bllt.spdX=0; bllt.spdY=0;
        bllt.setPosition( -20, 0 ); 
        bllt.visible=false;
        }

    }

}//

private spawnPlanetoid( planetoid:Sprite )
{
    if(!planetoid.visible || !CollisionUtil.getInstance().isInside
    ( planetoid.getX(), planetoid.getY(), planetoid.w, planetoid.h,
    0, 0,this.levelWidth, this.levelHeight ) )
    {
    const lenght = 400;
    let spawnAngle = Math.floor( (Math.random() * 360)+1 );

    let xpos = this.levelWidth/2 + MathUtil.lengthDirX( lenght, spawnAngle );
    let ypos = this.levelHeight/2 + MathUtil.lengthDirX( lenght, spawnAngle );

    planetoid.setPosition( xpos, ypos );
    planetoid.visible = true;

    SpriteUtil.moveToAngle( planetoid, spawnAngle+180, Math.random() * 2, false );
}



}//


private movePlanetoids()
{

    for(let i = 0; i < 5; i++)
    {
        if(this.smallRock[i].visible)
        {
            this.smallRock[i].move();
            this.smallRock[i].angle+=0.01;
        }

        if(this.medRock[i].visible)
        {
            this.medRock[i].move();
            this.medRock[i].angle+=0.01;
        }

        if(this.bigRock[i].visible)
        {
            this.bigRock[i].move();
            this.bigRock[i].angle+=0.01;
        }

}

//check how far planetoids are moved, if they are outside
//then respawn them again
this.planetoidSpanCounter++;
if( this.planetoidSpanCounter >= this.planetoidSpan )
{
    console.log("re-spawn planetoid")
    this.planetoidSpanCounter=0;

    for(let i = 0; i < 5; i++)
    {
    this.spawnPlanetoid(this.smallRock[i]);
    this.spawnPlanetoid(this.medRock[i]);
    this.spawnPlanetoid(this.bigRock[i]);
    }

}


}


/**
* this functions checks if a bullets has collided
* with a planetoid
*/
checkShootCollisions()
{
let coll = CollisionUtil.getInstance();

    for(let i = 0; i < 5; i++)
    {
        for( let bllt of this.bullets )
        {
            if(coll.spriteRectangleCollision( this.smallRock[i], bllt ) && this.smallRock[i].visible )
            {
            this.smallRock[i].visible=false;
            this.score++;
            bllt.visible=false;
            }

            if(coll.spriteRectangleCollision( this.medRock[i], bllt ) && this.medRock[i].visible)
            {
            this.medRock[i].visible=false;
            this.score++;
            bllt.visible=false;
            }

            if(coll.spriteRectangleCollision( this.bigRock[i], bllt ) && this.bigRock[i].visible)
            {
            this.bigRock[i].visible=false;
            this.score++;
            bllt.visible=false;
            }

        }

    }

}

}//
