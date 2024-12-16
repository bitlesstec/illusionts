

import { FlashTarget } from "./FlashTarget";
import { Tween } from "./Tween";

/**
 * This class creates a wobble effect that can be applied to any target (e.g., sprite) to make it oscillate.
 * The effect can be applied in the x or y direction, and you can control the intensity and duration.
 * 
 * USAGE:
 * 
 *      const wobbleOptions = { "duration": 30, "intensity": 10, "axis": "x", "repeat": true, };
 *      this.wobbleEffect = new WobbleEffect( this.sprite, wobbleOptions, () => { this.wobbleEffect.stop() });
 *      this.wobbleEffect.active = true;
 *      this.wobbleEffect.update(); // Call in update method
 *      this.wobbleEffect.render(ctx); // Call in render method
 * 
 * @NOTE needs Testing
 */
export class WobbleEffect {

    active: boolean;
    private target: FlashTarget;
    private tween: Tween;
    private intensity: number;
    private axis: string; // Can be 'x' or 'y'
    private duration: number;
    private direction: number; // Direction of wobble movement (+1 or -1)
    
    constructor(target: FlashTarget, options?: { duration?: number, intensity?: number, axis?: string, repeat?: boolean }, onComplete?: () => void) {
        this.target = target;
        this.intensity = options?.intensity || 10;  // Default intensity of wobble
        this.axis = options?.axis || "x"; // Default wobble direction: x
        this.duration = options?.duration || 30; // Default duration for the wobble effect
        this.active = false;
        this.direction = 1; // Default direction (right or down)

        // Create the tween that will animate the wobble effect
        this.tween = new Tween(
            this,
            [
                { property: this.axis === "x" ? "xOffset" : "yOffset", initValue: 0, endValue: this.intensity } // Move target back and forth
            ],
            this.duration,
            Tween.Easings.easeInOutSine,
            () => {
                if (options?.repeat) {
                    // Reverse direction and animate in the opposite direction
                    this.direction *= -1;
                    this.tween.reset([
                        { property: this.axis === "x" ? "xOffset" : "yOffset", initValue: 0, endValue: this.intensity * this.direction }
                    ]);
                } else {
                    this.active = false; // Deactivate wobble once it completes
                }

                // Call the completion callback if provided
                if (onComplete) onComplete();
            }
        );
    }

    // Update method to progress the tween
    update() {
        if (this.active && this.tween) {
            this.tween.update();
        }
    }

    // Render the wobble effect on the target
    render(ctx: CanvasRenderingContext2D) {
        if (this.active) {
            ctx.save();

            // Apply the wobble to the target's position
            // if (this.axis === "x") 
            // {
            //     ctx.translate(this.target.x + this.target.w * 0.5 + this.tween.getValue("xOffset"), this.target.y);
            // }
            //  else 
            // {
            //     ctx.translate(this.target.x, this.target.y + this.target.h * 0.5 + this.tween.getValue("yOffset"));
            // }

            // Render the target's sprite or shape with the wobble effect applied
            // Assuming a simple rectangle render for illustration (replace with sprite rendering code)
            ctx.fillStyle = "#FF0000"; // Example color for the wobbling object
            ctx.fillRect(0, 0, this.target.w, this.target.h);

            ctx.restore();
        }
    }

    // Stop the wobble effect
    stop() {
        if (this.tween) {
            this.tween.active = false;
        }
        this.active = false;
    }
}
