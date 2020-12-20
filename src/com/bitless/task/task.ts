import { Executable } from "../ntfc/Executable.js";

export class Task
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
process( executer = function(){} )
{
    this.counter--;

    if( this.counter < 1 && this.active )
    {
        this.counter = 0;
        this.active = false;
        executer();//.execute();
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
    this.active = ( counter == 0 )? false : true;
}


}//