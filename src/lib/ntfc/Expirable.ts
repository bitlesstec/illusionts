import { Executable } from "./Executable";

/**
 * this interface is used to make an object expire
 * and to make it dissapear after certain ammount
 * of steps
 */
export interface Expirable
{
    setExpiration(stepLimit:number):void;
    expire( executer?:any):void;
}