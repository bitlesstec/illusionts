

/**
 * this class is an implementation of Spline
 * it works for positions mostrly
 * 
 * USAGE:
 * ... update method
 * if (this.moveSpline.active) 
 * {
 *   this.spr.y = this.moveSpline.update();
*  }
 *
 */
export class Spline
{

    private points: number[]; // Array of control points
    private duration: number; // Duration of the interpolation
    private frameCounter: number;
    private onComplete: (() => void) | null; // Callback for completion
    public active: boolean;

    constructor( points: number[],  duration: number,  onComplete: (() => void) | null = null) 
    {
        if (points.length < 2) 
        {
            throw new Error("At least two points are required for spline interpolation.");
        }

        this.points = points;
        this.duration = duration;
        this.frameCounter = 0;
        this.onComplete = onComplete;
        this.active = true;
    }


     /**
     * Catmull-Rom Spline interpolation
     */
     private catmullRom(t: number, p0: number, p1: number, p2: number, p3: number): number {
        const t2 = t * t;
        const t3 = t2 * t;
        return (
            0.5 *
            (2 * p1 +
                (-p0 + p2) * t +
                (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
                (-p0 + 3 * p1 - 3 * p2 + p3) * t3)
        );
    }

     /**
     * Calculates the spline value at a given normalized time (t)
     */
     private interpolateSpline(t: number): number 
     {
        const n = this.points.length - 1; // Number of segments
        const segment = Math.min(Math.floor(t * n), n - 1); // Determine which segment to use
        const localT = (t * n) - segment; // Local time within the segment

        const p0 = this.points[Math.max(segment - 1, 0)];
        const p1 = this.points[segment];
        const p2 = this.points[Math.min(segment + 1, n)];
        const p3 = this.points[Math.min(segment + 2, n)];

        return this.catmullRom(localT, p0, p1, p2, p3);
    }

     /**
     * Updates the spline and returns the interpolated value.
     */
     update(): number {
        if (!this.active) return this.points[0];

        if (this.frameCounter < this.duration) {
            const normalizedTime = this.frameCounter / this.duration;
            const value = this.interpolateSpline(normalizedTime);
            this.frameCounter++;
            return value;
        } else {
            if (this.onComplete) this.onComplete();
            this.active = false;
            return this.points[this.points.length - 1];
        }
    }

    reset()
    {
        this.frameCounter =0;
        this.active = true;
    }

}