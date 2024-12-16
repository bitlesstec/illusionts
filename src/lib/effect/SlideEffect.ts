import { Point } from "../graphic/Point";
import { BaseShape } from "../graphic/shape/BaseShape";
import { BaseEffect } from "./BaseEffect";
import { EffectType } from "./EffectType";
import { Tween } from "./Tween";


/**
 * this will SLIDE specific sprite from starting point{ sprite.x, sprite.y } to destination point x, y
 * at defined frame duration.
 * 
 * this uses an specific linear tween under the hood.
 * 
 * pingpong flag with make the patter reversed once is done and it will repeat endlessly
 * 
 * if repeat is also true pingpong will take precedence.
 * 
 * repeat will repeat the patters since starting point to ending point endlessly
 * 
 * if yoy want to slide once, just set pingpong and repeat flags to false
 * 
 * USAGE:
 * 
//init
 slideEffect:SlideEffect<Sprite>;
 
 this.slideEffect = new SlideEffect(

            sprite, //object to slide

            new Point() | { x: 400, y: 300 }, // slide destination point

            frames, // default = 60 

            pingpong, // optional default = false

            repeat, // optopnal default = false

            onComplete //optional callback accepts a function e.g: ()=>{ console.log....}

        );

// in game loop update
this.slideEffect.update()
 * 
 * 
 */
export class SlideEffect<T extends BaseShape> extends BaseEffect
{

    startPoint:Point;
    destinationPoint: Point;

    constructor( spr:T, 
                 destinationPoint: { x?: number; y?: number },
                 durFrames:number = 60, 
                 pingPong: boolean = false,
                 repeat: boolean = false,
                 onComplete?: () => void)
    {
        super();

        this.durFrames = durFrames;
        this.pingPong = pingPong;
        this.repeat = repeat;

        //to make slide from initPoint to dstPoint
        this.startPoint = new Point(spr.x, spr.y);
        this.destinationPoint = {
            x: destinationPoint.x ?? spr.x,
            y: destinationPoint.y ?? spr.y,
        };
        
        this.createTween(spr, durFrames, onComplete);
    }//


    private createTween(spr: T, durFrames: number, onComplete?: () => void): void {
        const tweenOptions = [];
        if (this.startPoint.x !== this.destinationPoint.x) {
            tweenOptions.push({
                property: "x",
                initValue: this.startPoint.x,
                endValue: this.destinationPoint.x,
            });
        }
        if (this.startPoint.y !== this.destinationPoint.y) {
            tweenOptions.push({
                property: "y",
                initValue: this.startPoint.y,
                endValue: this.destinationPoint.y,
            });
        }

        this.tween = new Tween(
            spr,
            tweenOptions,
            durFrames,
            Tween.Easings.linear,
            () => {
                this.handleCompletion(onComplete);
            }
        );
    }


     /**
     * Handles the completion of the tween animation.
     * It manages ping-pong behavior and repeat cycles.
     * 
     * @param onComplete Optional callback to invoke after completion.
     */
    protected handleCompletion(onComplete?: () => void): void 
    {
        if (onComplete) onComplete();

        if (this.pingPong) 
        {

          // Intercambiar puntos inicial y final para el siguiente ciclo
            const tempPoint = { ...this.startPoint };
            this.startPoint = this.destinationPoint;
            this.destinationPoint = tempPoint;

            // Reiniciar el Tween con los nuevos puntos
            this.resetTween();
        } 
        else if (this.repeat) 
        {
            // Restart the current effect
            this.resetTween();
        }
    }

    /**
     * Resets the tween to start the effect over, based on the current start and destination points.
     */
    private resetTween(): void 
    {
        
            const tweenOptions = [];
            if (this.startPoint.x !== this.destinationPoint.x) 
            {
                tweenOptions.push({
                    property: "x",
                    initValue: this.startPoint.x,
                    endValue: this.destinationPoint.x,
                });
            }

            if (this.startPoint.y !== this.destinationPoint.y) 
            {
                tweenOptions.push({
                    property: "y",
                    initValue: this.startPoint.y,
                    endValue: this.destinationPoint.y,
                });
            }
            console.log(tweenOptions)
            this.tween.reset(tweenOptions);
        
    }


    update()
    {
        this.tween.update();
    }

    reset(): void {
        this.tween.reset();
    }

    set active(value:boolean){
        this.tween.active = value;
    }
}