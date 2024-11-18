/**
 * this interface can be used to set a Task with multiple subtasks
 * 
 * ### HOW TO IMPLEMENT:
 * const subTask1:SubTask = 
        {
            "curStep": 0,
            "maxStep": 200,
            "fn": ()=>{ this.text = " first task executed" },
        }
 */
        export interface SubTask
        {
            curStep:number;
            maxStep:number;
            fn:any;
        }