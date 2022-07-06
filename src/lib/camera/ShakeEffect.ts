import { Point } from "../graphic/Point.js";
import { MathUtil } from "../util/MathUtil.js";
import { Camera } from "./Camera.js";



export class ShakeEffect
{

    isShaking:boolean;
    shakeStepCounter:number;
    time:number;
    prevPosition:Point;
    camera:Camera;
    

    constructor(cam:Camera)
    {

        this.camera=cam;
        this.shakeStepCounter=0;
        this.isShaking=false;
        this.time=0;
        this.prevPosition = new Point(0,0);

    }

     /**
     * call this method to execute shake, but shake method should be called in Level.update()
     * @param makeShake 
     */
      activate( makeShake:boolean )
      {
          this.isShaking = makeShake;
          this.prevPosition =  new Point(this.camera.x,this.camera.y);
      }
      /**
       * this method should be put in Level.update, this will execute camera shake with defined variables
       * @param amplitude how muy will move in pixels
       * @param duration number of steps will last by default 60
       */
      
      /**
       * this method should be put in Level.update, this will execute camera shake with defined variables.
       * @param deltaTime  incomming delta time from update method
       * @param amplitude how much the camera will shake in pixels
       * @param duration this should be in secords by default 1 second, this will be compared against deltaTime
       * @param frecuency how many times per step it will be shaken
       */
      updateShake(deltaTime:number, amplitude:number=16, duration:number=1, frecuency:number=60 )//needs duration
      {
          if( this.isShaking )
          {
              // if(!this.isShaking)this.prevPosition =  new Point(this.x,this.y);
              // this.isShaking=true;
              this.shakeStepCounter++;
              this.time += (deltaTime * duration);
      
  
              this.camera.x =this.prevPosition.x; 
              this.camera.y =this.prevPosition.y; 
              console.log(" frecuency/60 :",frecuency/60)
              if(this.shakeStepCounter >= frecuency/60 )
              {
  
                  this.camera.x += MathUtil.getRandomRangeInt( -amplitude, amplitude );
                  this.camera.y += MathUtil.getRandomRangeInt( -amplitude, amplitude );
                  this.shakeStepCounter=0;
              }
      
              if(this.time >= duration)
              {
                  this.isShaking=false;
                  this.time=0;
                  this.camera.x = this.prevPosition.x; 
                  this.camera.y = this.prevPosition.y;
                  console.log("END of SHAKING")
              }
          }
  
          
  
      }
  

}