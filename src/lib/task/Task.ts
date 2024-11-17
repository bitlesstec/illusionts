

/**
 * a task can ejecute diferent functions at every number of steps
 * - curIndex: is the index of the function to be ejecuted next, 
 * after the function is ejecuted succesfully, curIndex will be increased
 * so the next steps reached and ejecute what is next
 * - curStep: when curStep reach maxSTep function will be ejecuting the function at current index
 * - subtasks: are all the functions to be executed in that order, subtasks needs to be initialized
 * 
 * execute() : must be called in level.update 
 *  
 */
export class Task
{

    curIndex:number;
    curStep:number;
    maxStep:number;
    subTasks:any[];

    constructor(maxStep?:number, tasks?:any[])
    {
        this.curIndex=0;
        this.curStep=0;
        this.maxStep = maxStep?maxStep:30;
        this.subTasks = tasks?tasks:[];
    }


    execute(args?:any[]): void 
    {}


}