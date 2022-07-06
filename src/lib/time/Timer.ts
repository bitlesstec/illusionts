
/**
 * this class will create an object with a counter, 
 * when counter reach 0 the executor (of proccess method) will be called,
 * NOTE: process method should be called inside Level.update() mehtod
 */
export class Timer
{

    private active: boolean;
    private counter: number;


    constructor()
    {
        this.active = false;
        this.counter = 0;
    }

    /**
     * this is to set any process to be executed after several gamethicks
     * @param executer 
     */
    process( executor = function(){} )
    {
        this.counter--;

        if( this.counter < 1 && this.active )
        {
            this.counter = 0;
            this.active = false;
            executor();//.execute();
        }

    }//

    /**
     * returns current counter
     */
    getCounter():number
    { return this.counter }


    /**
     * every time a new counter value is set, then the task will be activated,
     * to deactivate this task at any time then set the counter to 0
     * @param counter 
     */
    setCounter( counter:number ):void
    { 
        this.counter = counter; 
        this.active = ( counter === 0 )? false : true;
    }


}//