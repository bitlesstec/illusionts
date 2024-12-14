import { BaseShape } from "../graphic/shape/BaseShape";
import { BaseEffect } from "./BaseEffect";
import { Tween } from "./Tween";


/**
 * Creates a pulse effect for a sprite, changing its xScale and yScale properties
 * to create a breathing or pulsing animation.
 *
 * USAGE:
 *
 * // Initialize
 * const pulseEffect = new PulseEffect(
 *     sprite,            // The object to pulse
 *     { xScale: 1.5, yScale: 1.5 }, // Maximum scale (optional, default: {1.2, 1.2})
 *     frames,            // Duration for a single pulse (optional, default: 60)
 *     pingPong,          // Optional: Reverse the effect after completion (default: false)
 *     repeat,            // Optional: Repeat endlessly (default: true)
 *     onComplete         // Optional callback when a cycle completes
 * );
 *
 * // In game loop update
 * pulseEffect.update();
 */
export class PulseEffect<T extends BaseShape> extends BaseEffect
{

    private maxScale: { xScale: number; yScale: number };
    private originalScale: { xScale: number; yScale: number };

    constructor(
        spr: T,
        maxScale: { xScale?: number; yScale?: number } = { xScale: 1.2, yScale: 1.2 },
        durFrames: number = 60,
        pingPong: boolean = true,
        repeat: boolean = true,
        onComplete?: () => void)
        {
            super();
            // Store original and maximum scales
        this.originalScale = { xScale: spr.xScale, yScale: spr.yScale };
        this.maxScale = {
            xScale: maxScale.xScale ?? this.originalScale.xScale * 1.2,
            yScale: maxScale.yScale ?? this.originalScale.yScale * 1.2,
        };

        this.durFrames = durFrames;
        this.pingPong = pingPong;
        this.repeat = repeat;

        // Create the tween for scaling
        this.createTween(spr, durFrames, onComplete);
        }

        /**
     * Creates the tween for the pulse effect.
     */
    private createTween(spr: T, durFrames: number, onComplete?: () => void): void {
        const tweenOptions = [
            {
                property: "xScale",
                initValue: this.originalScale.xScale,
                endValue: this.maxScale.xScale,
            },
            {
                property: "yScale",
                initValue: this.originalScale.yScale,
                endValue: this.maxScale.yScale,
            },
        ];

        this.tween = new Tween(
            spr,
            tweenOptions,
            durFrames,
            Tween.Easings.easeInQuad,
            () => {
                this.handleCompletion(onComplete);
            }
        );
    }


    /**
     * Handles the completion of the pulse effect cycle.
     */
    protected handleCompletion(onComplete?: () => void): void 
    {
        if (onComplete) onComplete();

        if (this.pingPong) 
        {
            // Swap the original and max scales
            const tempScale = { ...this.originalScale };
            this.originalScale = this.maxScale;
            this.maxScale = tempScale;

            this.resetTween();
        } else if (this.repeat) {
            // Restart the effect with the original values
            this.resetTween();
        }
    }


    /**
     * Resets the tween with the current original and maximum scales.
     */
    private resetTween(): void {
        const tweenOptions = [
            {
                property: "xScale",
                initValue: this.originalScale.xScale,
                endValue: this.maxScale.xScale,
            },
            {
                property: "yScale",
                initValue: this.originalScale.yScale,
                endValue: this.maxScale.yScale,
            },
        ];

        this.tween.reset(tweenOptions);
    }

    /**
     * Update the effect (called in the game loop).
     */
    update(): void {
        this.tween.update();
    }

    /**
     * Reset the effect to its initial state.
     */
    reset(): void {
        this.tween.reset();
    }

    /**
     * Enable or disable the effect.
     */
    set active(value: boolean) {
        this.tween.active = value;
    }
}