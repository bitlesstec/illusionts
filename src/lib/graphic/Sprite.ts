
import { AnimationLoop } from "./AnimationLoop.js";
import { ImageMeasures } from "./ImageMeasures.js";
import { BaseShape } from "./shape/BaseShape.js";


export class Sprite extends BaseShape
{
    //width & height
    w:number;
    h:number;

    //sprite animation variables 
    animationLoop: AnimationLoop;
    animationStep: number;
    animationStepLimit: number;
    animationEnd:boolean;

    //current frame to be displayed
    currentFrame:number;

    //last frame of current image (strip image/animation)
    lastFrame:number;

    //image to be rendered & properties
    image: HTMLImageElement;
    srcX:number;
    srcY:number;
    srcW:number;
    srcH:number;
    // dstX:number;
    // dstY:number;
    dstW:number;
    dstH:number;


    /**
     * if you call 1 args consstructor, means you have 1 image sprite
     * but if you call 3 args constructor, you will pass an strip image where you
     * define the widht and height of each frame
     * @param image 
     * @param frameWidth 
     * @param frameHeight 
     */
    constructor( image: HTMLImageElement, imgMeasures?:ImageMeasures)//frameWidth?:number, frameHeight?:number )
    {
        super();
        this.animationEnd = false;
        this.lastFrame = 0;
        this.currentFrame = 0;

        this.animationLoop = AnimationLoop.FORWARD;
        this.animationStep = 0;
        this.animationStepLimit = 30;

        //when the image is loaded then we set measures
        // this.image = image;
        this.setNewAnimation( image, imgMeasures );//frameWidth, frameHeight );
    
    }//


    /**
     * this method is used if we want to change sprite animation for other set of images
     * @param image 
     * @param frameWidth 
     * @param frameHeight 
     */
    setNewAnimation(image: HTMLImageElement, imgMeasures?:ImageMeasures)//frameWidth?:number, frameHeight?:number )
    {
        console.log(imgMeasures)
        this.image = image;
        this.srcX = 0;
        this.srcY = 0;
        this.w = image.width;
        this.h = image.height;
        this.dstW = this.w;
        this.dstH = this.h;

        if(imgMeasures)
        {
            this.lastFrame = imgMeasures.frames-1;
            this.srcX = imgMeasures.srcX;
            this.srcY = imgMeasures.srcY;
            this.w=imgMeasures.w;
            this.h=imgMeasures.h;
            this.dstW = imgMeasures.w;
            this.dstH = imgMeasures.h;


            console.log(`measureX: ${imgMeasures.srcX}`);
            console.log(`measureY: ${imgMeasures.srcY}`);
            console.log(`currentFrame: ${this.currentFrame}`);
            console.log(`SRCX: ${this.srcX}`);
            console.log(`SRCY: ${this.srcY}`);


        }

        // if( frameWidth !== undefined && frameHeight !== undefined )
        // {
        //     this.w = frameWidth;
        //     this.h = frameHeight;
        //     this.lastFrame = Math.floor( image.width / frameWidth );
        // }
        // else
        // {
        //     this.w = image.width;
        //     this.h = image.height;
        //     this.lastFrame = 1;
        // }
    }//


    render(ctx: CanvasRenderingContext2D): void 
    {
    
        //display sprite if is visible
        if( this.visible )
        {

            //@todoupdateAnimation Here or in update Method?
            this.updateAnimation();

            ctx.save();

            if( this.alpha < 1 )
                ctx.globalAlpha = this.alpha; 

            if( this.angle != 0 || this.xScale != 1 || this.yScale != 1 )
            {
                ctx.translate( this.points[0].x + this.w/2, this.points[0].y + this.h/2 );
                ctx.rotate( this.angle );
                ctx.scale( this.xScale, this.yScale );
                ctx.translate( -( this.points[0].x + this.w/2 ), -( this.points[0].y + this.h/2 ) );
            }

            /// @TODO here check some effect updates 
            ctx.drawImage
            (
                this.image,
                this.srcX, this.srcY,
                this.w, this.h,
                Math.floor( this.points[0].x ), Math.floor( this.points[0].y ),
                this.dstW, this.dstH
            );
            ctx.restore();

        }///

    }//

    /**
     * this will update the frames depending on AnimationLoop
     */
    updateAnimation():void
    {

        //if animation is 1 frame there is no point to update frames
        if( this.lastFrame <= 1 ) return;

        this.animationStep ++;

        if( this.animationStep >= this.animationStepLimit )
        {
            this.animationStep = 0;

            switch( this.animationLoop )
            {
                case AnimationLoop.FORWARD:
                    this.srcX = this.currentFrame * this.w;
                    this.currentFrame++;
                    if( this.currentFrame > this.lastFrame )
                    {
                        this.currentFrame = 0;
                        this.animationEnd = true;
                    }
                break;
                
                case AnimationLoop.BACKWARD:
                    this.currentFrame--;
                    this.srcX = this.currentFrame * this.w;
                    if( this.currentFrame < 0 )
                    {
                        this.currentFrame = this.lastFrame;
                        this.animationEnd = true;
                    }
                break;
                
                case AnimationLoop.STOPATEND:
                    this.srcX = this.currentFrame * this.w;
                    this.currentFrame++;
                    if( this.currentFrame >= this.lastFrame )
                    { 
                        this.currentFrame = this.lastFrame;
                        this.animationEnd = true;
                    }
                break;

            }////

        }///
    }

}//