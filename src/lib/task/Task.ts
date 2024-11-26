import { SubTask } from "./SubTask";
import { Updatable } from "../ntfc/Updatable";
import { TaskAction } from "./TaskAction";

/**
 * @TODO need to add TASKACTION.ts implementation to change what heppens after task is complete
 * this can potentially execute a series of subtasks, 
 * it starts from taskIndex 0 onwards until the last one,
 * every subTask has it own counter and maxStep, also their own function to be executed
 * when the currentStep reaches maxStep,
 * 
 * if a task is not enabled wont be executed.
 * 
 * you must call update function in level.update method in order to make it work.
 * 
 * ### HOW TO IMPLEMENT:
 *      const subTask1:SubTask = 
        {
            "curStep": 0,
            "maxStep": 200,
            "fn": ()=>{ this.text = " first task executed" },
        }

        const subTask2:SubTask = 
        {
            "curStep": 0,
            "maxStep": 200,
            "fn": ()=>{ this.text = "second task executed" },
        }


        this.task = new Task([ subTask1, subTask2] )


        ###call this in level.update(delta, args?)###
        this.update(delta, args)
 */
export class Task implements Updatable
{

    taskIndex:number; //indicates current function to be executed
    subTasks:SubTask[];
    isTaskComplete:boolean;
    enable:boolean;
    onEndAction:TaskAction;

    constructor( tasks:SubTask[] = [] )
    {
        this.taskIndex=0;
        this.subTasks = tasks;
        this.isTaskComplete=false;
        this.enable=true;
        this.onEndAction = TaskAction.NONE;
    }


    update(delta?: number, args?: any[]): void 
    {

        if( !this.enable ) return; //if not enabled dont process the logic belo

        if (this.isTaskComplete) //if complete we won't execute below logic anymore until reset
        {
            switch( this.onEndAction )
            {
                case TaskAction.NONE:
                    return;
                case TaskAction.RESTART:
                    this.reset();
                    break;
                    //@TODO implement other actions

            }
        }

        // console.log(` taskIndex process: ${this.taskIndex}  `)
        //this will check if we reached the end of task, if so will set isTaskComplete to true
        if ( this.taskIndex > this.subTasks.length-1 ) 
        {
            //if we reach task
            if( !this.isTaskComplete ){ this.isTaskComplete = true; 
                //  console.log(`task index complete: ${this.taskIndex}`) 
                }
            return;
        }


        const currentTask = this.subTasks[this.taskIndex];
        // currentTask.curStep += delta; //use this for time
        currentTask.curStep += 1; //use this for frame count

        if (currentTask.curStep >= currentTask.maxStep) 
        {
            console.log(` taskIndex executed: ${this.taskIndex}`)
            currentTask.curStep = 0; // Reset step count
            currentTask.fn( delta, args ); // Execute the task function
            this.taskIndex++; // Move to the next task
        }
    
    }

    /**
     * reset index and each subtask curStep
     */
    reset():void
    {
        this.subTasks.forEach( (subTask:SubTask) => { subTask.curStep=0; } );
        this.taskIndex = -1;
        this.isTaskComplete = false;
    }


}