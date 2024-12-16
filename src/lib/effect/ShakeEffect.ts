import { Camera } from "../camera/Camera";
import { FlashTarget } from "./FlashTarget";
import { Tween } from "./Tween";


/**
 * this will create the shake effect usually set to the camera
 * 
 * USAGE:
 * 
 *      this.shakeEffect = new ShakeEffect( this.camera, { duration: 20, intensity: 10 } );
 * 
 *      this.shakeEffect.active = true;
 * 
 *      this.shakeEffect.update() //use this in update method
 *  
 * to make this work you shoud implement the camera.translate(ctx) e.g:
 * 
 *      level.render(ctx)...
 * 
 *      ...
 * 
 *      case GameState.PLAYING:
 * 
 *      ctx.save();
 * 
 *      ctx.translate(this.camera.x, this.camera.y);
 * 
 *      ...
 * 
 *      //render sprites here...
 * 
 *      ...
 * 
 *      ctx.restore();
 * 
 */
export class ShakeEffect
{

    active: boolean;
    private target: Camera | FlashTarget;
    private tween: Tween;
    private intensity: number;
    private duration: number;
    private originalX: number;
    private originalY: number;

    constructor(
        target: Camera | FlashTarget,
        options?: { duration?: number; intensity?: number },
        onComplete?: () => void)
        {
            this.target = target;
            this.active = false;

            this.intensity = options?.intensity ?? 5; // Default shake intensity (pixels)
            this.duration = options?.duration ?? 30; // Default duration in frames (30 FPS)

            // Save the original position of the target
            this.originalX = target.x;
            this.originalY = target.y;

            this.tween = new Tween(
                this,
                [{ property: "intensity", initValue: this.intensity, endValue: 0 }], // Gradually reduce intensity to 0
                this.duration,
                Tween.Easings.easeInQuad,
                () => {
                    this.active = false; // Deactivate shake effect
                    this.target.x = this.originalX;
                    this.target.y = this.originalY;
    
                    if (onComplete) onComplete(); // Callback when shake ends
                } );
        }


        update() 
        {
            if (this.active && this.tween) 
            {
                this.tween.update();
    
                // Generate random offsets based on the current intensity
                const offsetX = (Math.random() - 0.5) * 2 * this.intensity;
                const offsetY = (Math.random() - 0.5) * 2 * this.intensity;

                // Apply offsets to the target's position
                this.target.x = this.originalX + offsetX;
                this.target.y = this.originalY + offsetY;
            }
        }

    
        stop() {
            if (this.tween) { this.tween.active = false; }
            this.active = false;
            // Reset target position to its original state
            this.target.x = this.originalX;
            this.target.y = this.originalY;
        }

}