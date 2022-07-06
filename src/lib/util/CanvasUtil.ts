import { GameManager } from "../manager/GameManager.js";



/**
 * this instance is a singleton to not to use memory is
 * is not used or other dialog function is implemented
 */
export class CanvasUtil
{
    
    /**
     * this will take an screenshot of the game (most specifucally of the canvas)
     * and will save this in user location
     */
    static takeScreenshot():void
    {
         let imgUrl = GameManager.getInstance().canvas
             .toDataURL("image/png").replace("image/png", "image/octet-stream");
         window.location.href = imgUrl;
    }


    static getTextWidth(txt:string):number
    {
       return GameManager.getInstance().context2D.measureText(txt).width;
    }
     

    //getWebM from canvas



}