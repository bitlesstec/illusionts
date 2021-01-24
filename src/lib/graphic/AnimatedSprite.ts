import { Subanimationable } from "../ntfc/Subanimationable.js";
import { ImageMeasures } from "./ImageMeasures.js";
import { Sprite } from "./Sprite.js";



export class AnimatedSprite extends Sprite
                        implements Subanimationable
{

    initialFrame:number;

    constructor( image: HTMLImageElement, imgMeasures?:ImageMeasures)//frameWidth?:number, frameHeight?:number )
    {
        super(image, imgMeasures);
        this.initialFrame = this.lastFrame;
    }

    /**
     * this will indicate starting and final frames of the animation,
     * then updateAnimation will iterate through initial frame until
     * final frame over and over, the order can be changed at any time
     * setting different animations of sprite sheet
     * @param initialFrame 
     * @param finalFrame 
     */
    setSubanimationFrames( initialFrame:number, finalFrame:number):void
    {
        this.initialFrame = initialFrame-1;
        this.currentFrame = finalFrame-1;
        this.lastFrame = finalFrame-1;
    }

    updateSubanimation():void
    {
        
        this.animationStep++;

        if( this.animationStep >= this.animationStepLimit )
        {
            this.animationStep = 0; 

            this.srcX = this.currentFrame * this.w;

            this.currentFrame++;
            if( this.currentFrame > this.lastFrame)
            {
                this.currentFrame = this.initialFrame;
            }
        }

    }
    
    


}