
import { BaseLevel } from '../lib/level/BaseLevel';
import { GameState } from '../lib/game/GameState';
import { Initiable } from '../lib/ntfc/Initiable';
import { ParticleEmitter } from '../lib/particle/ParticleEmitter';
import { MathUtil } from '../lib/util/MathUtil';
import { Timer } from '../lib/index';


export class SampleLevel extends BaseLevel implements Initiable
{


    emitter:ParticleEmitter;

    psTimer:Timer;


    xx:number= 50;
    xspd:number = 20;

    constructor()
    {
        //setting level width and height
        super( 640, 480 );
        this.init(); //init can be also here instead GAMESTATE.LOADING
    }


    async init()
    {

        this.psTimer = new Timer( 200, ()=>{
            this.createPS()
            // this.psTimer.setCounter( MathUtil.getRandomRangeInt( 300, 600 ) )
        })

        // this.createPS()
        
       
        this.gameState=GameState.PLAYING;
    }


    update(delta: number): void 
    {
        
        switch( this.gameState )
        {
            case GameState.LOADING:
                break;
            case GameState.PLAYING:

            if(this.emitter)
            {
                this.emitter.update(delta);
                    // if( this.xx < 640 )
                    // {
                    //     this.xx+= this.xspd*delta;
                    //     this.emitter.x= this.xx;
                    // }
            }
           

            this.psTimer.update(delta);

            
            

                break;
        }
        
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
                // ctx.fillStyle = "#FFF";
                // ctx.fillText( "Hello World!" ,20,20);

                if(this.emitter)
                this.emitter.render(ctx)
                
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


    createPS()
    {

        const colors:string[] = [ "red","green","blue","yellow","orange"]
        const pickedColor = MathUtil.choose( [0,1,2,3,4] )
        // this.emmiter = new ParticleEmitter(
        //     { x: 150, y: 150 },
        //     50, // Número de partículas
        //     true, // Espaciado aleatorio
        //     0, Math.PI * 2, // Ángulo completo
        //     4, 12, // Tamaño de las partículas
        //     1, 3, // Velocidad mínima y máxima
        //     0.01, 0.02, // Escala Speed
        //     false,
        //     0.02, 0.04, // Alpha Speed
        //     0.01, 0.05, // Rotación Speed
        //     0.1, // Gravedad
        //     5000, // Tiempo de vida del emisor en ms (5 segundos)
        //     colors[pickedColor], // Color inicial
        //     // "#FFFF00", // Color medio (opcional)
        //     // "#00FF00", // Color final (opcional)
        // );

        //FIRE
    //     this.emitter =  new ParticleEmitter(
    //     { x: 100, y: 100, w:20, h:10 },          // initial position
    //     150,                 // quantity of particles
    //     true,               // random space
    //     Math.PI * 1.37, Math.PI * 1.43, // angle to disperse particles (in radians)
    //     1,6,                // range of size of the particles
    //     1,10,                // minSpd and maxSpd range of particles (particle movement)
    //     0.01, 0.05,          // ScaleMinSpd, ScaleMaxSpd (particle size)
    //     false, .1, .3,       // alphaRandomized,  AlphaMinSpd, alphaMaxSpd //handles particle life
    //     0.01, 0.05,          // minRotation and MaxRotation (only cubes rotate)
    //     0,                   // gravity added to particles
    //     null,// 120,         //  lifetime in frames, if null will be executed endlessly
    //               //color 1
    //     "red", 
    //     "yellow",         // color 2 optional
    //     // "#FFD700",          // color 3 optional
    //     // ParticleShape.ARC,  //shape of particle  (optional) circle by default
    //     // ()=>{               //call back when particle is done (optional)
    //     //     console.log("particle DONE")
    //     //     this.emitter.x = MathUtil.getRandomRangeInt( 20,100 )
    //     //     this.emitter.y = MathUtil.getRandomRangeInt( 50,150 )
    //     //     this.emitter.reset();
    //     // }
    // );


    //EPLOSION
    // this.emitter = 
    // new ParticleEmitter(
    //     { x: 100, y: 100 },
    //     100, // Número de partículas
    //     true, // Espaciado aleatorio
    //     0, Math.PI * 2, // Ángulo completo
    //     2, 4, // Tamaño de las partículas
    //     20, 40, // Velocidad mínima y máxima
    //     0.01, 0.04, // Escala Speed
    //     false,0.02, 0.05, // Alpha Speed
    //     0.01, 0.05, // Rotación Speed
    //     0.1, // Gravedad
    //     3000, // Tiempo de vida del emisor en ms (5 segundos)
    //     "#FFFFFF",
    // );


//FIRE WALL
    // this.emitter =  new ParticleEmitter(
    //     { x: 100, y: 100, w:100, h:10 },          // initial position
    //     1000,                 // quantity of particles
    //     true,               // random space
    //     Math.PI * 1.37, Math.PI * 1.43, // angle to disperse particles (in radians)
    //     1,6,                // range of size of the particles
    //     1,10,                // minSpd and maxSpd range of particles (particle movement)
    //     0.01, 0.05,          // ScaleMinSpd, ScaleMaxSpd (particle size)
    //     false, .1, .3,       // alphaRandomized,  AlphaMinSpd, alphaMaxSpd //handles particle life
    //     0.01, 0.05,          // minRotation and MaxRotation (only cubes rotate)
    //     0,                   // gravity added to particles
    //     null,// 120,         //  lifetime in frames, if null will be executed endlessly
    //     colors[ MathUtil.choose( [0,1,2,3,4] ) ],  //color 1
    //     colors[ MathUtil.choose( [0,1,2,3,4] ) ],  // color 2 optional
    //     colors[ MathUtil.choose( [0,1,2,3,4] ) ],   // color 3 optional      
    //     // ParticleShape.ARC,  //shape of particle  (optional) circle by default
    //     // ()=>{               //call back when particle is done (optional)
    //     //     console.log("particle DONE")
    //     //     this.emitter.x = MathUtil.getRandomRangeInt( 20,100 )
    //     //     this.emitter.y = MathUtil.getRandomRangeInt( 50,150 )
    //     //     this.emitter.reset();
    //     // }
    // );

        //PERPETUAL EXPLOSION
    // this.emitter =  new ParticleEmitter(
    //     { x: 100, y: 100, w:20, h:20 },          // initial position
    //     1000,                 // quantity of particles
    //     true,               // random space
    //     0, Math.PI * 2, // angle to disperse particles (in radians)
    //     1,6,                // range of size of the particles
    //     1,10,                // minSpd and maxSpd range of particles (particle movement)
    //     0.01, 0.05,          // ScaleMinSpd, ScaleMaxSpd (particle size)
    //     false, .1, .3,       // alphaRandomized,  AlphaMinSpd, alphaMaxSpd //handles particle life
    //     0.01, 0.05,          // minRotation and MaxRotation (only cubes rotate)
    //     0,                   // gravity added to particles
    //     null,// 120,         //  lifetime in frames, if null will be executed endlessly
    //     colors[ MathUtil.choose( [0,1,2,3,4] ) ],  //color 1
    //     colors[ MathUtil.choose( [0,1,2,3,4] ) ],  // color 2 optional
    //     colors[ MathUtil.choose( [0,1,2,3,4] ) ],   // color 3 optional      
    //     // ParticleShape.ARC,  //shape of particle  (optional) circle by default
    //     // ()=>{               //call back when particle is done (optional)
    //     //     console.log("particle DONE")
    //     //     this.emitter.x = MathUtil.getRandomRangeInt( 20,100 )
    //     //     this.emitter.y = MathUtil.getRandomRangeInt( 50,150 )
    //     //     this.emitter.reset();
    //     // }
    // );


    // STATIC FIREBALL, it can be moved if we change x, y position (tested and works)
    //put 500 in lifetime frames and will create an exlposion
    // this.emitter =  new ParticleEmitter(
    //     { x: this.xx, y: 100, w:20, h:20 },          // initial position
    //     1000,                 // quantity of particles
    //     true,               // random space
    //     0, Math.PI * 2, // angle to disperse particles (in radians)
    //     1,6,                // range of size of the particles
    //     1,10,                // minSpd and maxSpd range of particles (particle movement)
    //     0.01, 0.05,          // ScaleMinSpd, ScaleMaxSpd (particle size)
    //     false, .1, .3,       // alphaRandomized,  AlphaMinSpd, alphaMaxSpd //handles particle life
    //     0.01, 0.05,          // minRotation and MaxRotation (only cubes rotate)
    //     0.2,                   // gravity added to particles
    //     null, //120         //  lifetime in frames, if null will be executed endlessly
    //     colors[ MathUtil.choose( [0,1,2,3,4] ) ],  //color 1
    //     colors[ MathUtil.choose( [0,1,2,3,4] ) ],  // color 2 optional
    //     colors[ MathUtil.choose( [0,1,2,3,4] ) ],   // color 3 optional      
    //     // ParticleShape.ARC,  //shape of particle  (optional) circle by default
    //     // ()=>{               //call back when particle is done (optional)
    //     //     console.log("particle DONE")
    //     //     this.emitter.x = MathUtil.getRandomRangeInt( 20,100 )
    //     //     this.emitter.y = MathUtil.getRandomRangeInt( 50,150 )
    //     //     this.emitter.reset();
    //     // }
    // );


    //SOME KIND OF RAIN
    // this.emitter =  new ParticleEmitter(
    //     { x: 0, y: -100, w: this.levelWidth, h: 40 }, // Área de emisión (parte superior de la pantalla)
    //     2000,                                    // Número de partículas (cantidad de gotas)
    //     true,                                   // Espaciado aleatorio
    //     Math.PI / 2, Math.PI / 2,               // Ángulo de emisión (90°, vertical hacia abajo)
    //     2, 2,                                   // Tamaño mínimo y máximo de las partículas (delgadas)
    //     10, 20,                                  // Velocidad mínima y máxima (rápido hacia abajo)
    //     0.01, 0.02,                             // Escala
    //     true,                                  // Sin transparencia aleatoria
    //     0, 0,                                   // Velocidad alpha (sin cambio en transparencia)
    //     0, 0,                                   // Sin rotación
    //     1,                                    // Gravedad para acelerar las partículas
    //     null,                                   // Emisor infinito
    //     "#66ccff"                               // Color inicial (azul claro como gotas de agua)
    // );


    //SOME KIND of SNOW
    this.emitter =  new ParticleEmitter(
        { x: 0, y: -50, w: this.levelWidth, h: 30 }, // Área de emisión (parte superior de la pantalla)
        2000,                                    // Número de partículas (cantidad de gotas)
        true,                                   // Espaciado aleatorio
        Math.PI / 2, Math.PI / 3,               // Ángulo de emisión (90°, vertical hacia abajo)
        2, 4,                                   // Tamaño mínimo y máximo de las partículas (delgadas)
        1, 15,                                  // Velocidad mínima y máxima (rápido hacia abajo)
        0.01, 0.04,                             // Escala
        false,                                  // Sin transparencia aleatoria
        0, 0,                                   // Velocidad alpha (sin cambio en transparencia)
        0, 0,                                   // Sin rotación
        0.2,                                    // Gravedad para acelerar las partículas
        null,                                   // Emisor infinito
        "white"                               // Color inicial (azul claro como gotas de agua)
    );

    }


}