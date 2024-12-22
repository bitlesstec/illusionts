import { Updatable } from "../ntfc/Updatable";

/**
 * this class will create a timer that has a counter, 
 * when counter reach 0 the executor (of proccess method) will be called,
 * NOTE: process method should be called inside Level.update() mehtod
 */
export class Timer implements Updatable
{
     /**
     * to know whether the timer is active or not
     */
    public active: boolean;
    public initialCounter:number;
    public counter: number;
    public onComplete: ((delta?:number, args?:any[]) => void) | null;

    /**
     * Creates an inactive timer by default. Optionally, provide a counter and callback to start it immediately.
     * @param counter - Optional number of frames until the timer expires.
     * @param callback - Optional function to execute when the timer expires.
     */
    constructor(counter?:number, onComplete: (() => void) | null = null)
    {
        if(counter) { this.setCounter(counter) }
        else{
            this.active = false;
            this.counter = 0;    
            this.initialCounter=0;
        }

        if(onComplete)
        {
            this.onComplete = onComplete;
        }
    }

    /**
     * Executes the timer, decrementing the counter if active. 
     * Calls the callback when the counter reaches zero.
     */
    update( delta?:number, args?:any[] )
    {
        if(!this.active)return;

        this.counter--;

        if( this.counter <= 0  )
        {
            this.counter = 0;
            this.active = false;
            
            if (this.onComplete) {
                this.onComplete(delta, args); // Llama al callback si existe
            }
        }

    }//

    /**
     * Resets the timer to its initial counter value,
     * and makes the Timer active again
     */
    reset(): void {
        this.counter = this.initialCounter;
        this.active = this.counter > 0;
    }


     /**
     * Sets a new counter value and activates the timer if the value is greater than 0.
     * @param counter - New counter value to set.
     */
     setCounter(counter: number): void {
        this.counter = counter;
        this.initialCounter = counter;
        this.active = counter > 0;
    }


}//