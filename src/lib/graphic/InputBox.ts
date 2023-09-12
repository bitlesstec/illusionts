
import { Point } from "./Point";
import {BaseShape} from "./shape/BaseShape";


/**
 * this will create an input box that will be used
 * to input text
 */
export class InputBox extends BaseShape
{

    text:string;
    letters:string[][];

    textColor:string;
    lettersColor:string;
    backgroundColor:string;

    w:number;
    h:number;

    selectorX:number;
    selectorY:number;

    constructor(){
        super();
    }

    createLetters()
    {
        this.letters = [
            ["A","B","C","D","E","F","G","H","I","J","K"],
            ["L","M","N","O","P","Q","R","S","T","U","V"],
            ["W","X","Y","Z","-",".",",","!","?","&","'"],
            ["a","b","c","d","e","f","g","h","i","j","k"],
            ["l","m","n","o","p","q","r","s","t","u","v"],
            ["w","x","y","z","@","#","$","%","*","(",")"],
            ["","","","","","","","","",""," "],
            ["0","1","2","3","4","5","6","7","8","9","Ok"]
        ];

    }


}