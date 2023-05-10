
/**
 * this interface will be used usually on update methods of levels
 * second parameter is used just in case we need some kind of arguments
 * like other sprite we want to update, etc.
 */
export interface  Updatable
{
    update(delta:number,args?:any[]):void;
}//

