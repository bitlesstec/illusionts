import { GameManager } from "../manager/GameManager.js";


export class AssetUtil
{

    /**
     * this will load the image from filePath, will wait until is loaded
     * and will return it once is loaded.
     * @param filePath 
     */
    static async getImage(filePath:string):Promise<HTMLImageElement>
    {
        return new Promise( (resolve, reject) =>{
            let imageToLoad = new Image();
            imageToLoad.onload = ()=> resolve(imageToLoad);
            imageToLoad.onerror = reject;
            imageToLoad.src = filePath;
        } );
    }


    /**
     * this will return an array of images (subimages) from an image that
     * should be stripped
     * NOT IMPLEMENTED FOR NOW
     */
    static async getImages( filePath:string, imgFrames:number, frameWidth:number, frameHeight?:number):Promise<HTMLImageElement[]>
    {
        return null;
    }

    static async getAudio( filePath:string):Promise<HTMLAudioElement>
    {
        console.log(filePath)
        return new Promise( (resolve, reject) =>{
            let audioToLoad:HTMLAudioElement = new Audio(filePath);
            audioToLoad.onload = ()=> resolve(audioToLoad);
            audioToLoad.onerror = reject;
            // audioToLoad.src = filePath;
        } );
    }


    /**
     * this will make an asyncRequest to any tipe of resouse, it can be used
     * to load xml | json file data or even to make request to other servers
     * if that's the case be careful about CORS
     * @param requestType 
     * @param url 
     * @returns 
     */
    static async makeAsyncRequest( requestType:string, url:string ):Promise<any>
    {

        return new Promise( (resolve, reject ) =>{
            let asyncRequest:XMLHttpRequest = new XMLHttpRequest();
            asyncRequest.onreadystatechange= ()=>
            {
                if( asyncRequest.readyState === asyncRequest.DONE )
                {
                    if( asyncRequest.status === 200 )resolve(asyncRequest.response);
                    else if(asyncRequest.status === 404) reject("404 not found");
                }
              
            }
            asyncRequest.open( requestType, url, true);
            asyncRequest.send();
        } );
    }


}