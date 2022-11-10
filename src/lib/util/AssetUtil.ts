import { AudioManager } from "../audio/AudioManager.js";
import { Sprite } from "../graphic/Sprite.js";
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

    /**
     * this will return an audio buffer object that must be set to BaseLevel.AudioManager
     * @param filePath 
     * @returns 
     */
    static async getAudioBuffer(filePath:string):Promise<AudioBuffer>
    {
        let audio = await this.makeAsyncRequest( "get", filePath, true );
        let audioContext = new AudioContext();
        return await audioContext.decodeAudioData( audio );
    }


    /**
     * this will make an asyncRequest to any tipe of resouse, it can be used
     * to load xml | json file data or even to make request to other servers
     * if that's the case be careful about CORS
     * @param requestType 
     * @param url 
     * @param isArrayBuffer true to specify requestType as 'arraybuffer' that is used for audio buffer files/objects 
     * @returns 
     */
    static async makeAsyncRequest( requestType:string, url:string,  isArrayBuffer?:boolean ):Promise<any>
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
            if(isArrayBuffer)asyncRequest.responseType="arraybuffer";//used for audio
            asyncRequest.send();
        } );
    }


    /**
     * this will create/load images and sprites from atlas.png and atlas.json 
     * and returns a map of sprites created
     * @param atlasImg 
     * @param jsonPath 
     */
    static async createSpritesFromAtlas( atlasImg:HTMLImageElement, jsonContent:any ):Promise<Map<string, Sprite >>
    {
        //these objects will be populated
        const spriteMap: Map<string, Sprite > = new Map<string, Sprite>();

        // const jsonContent = await AssetUtil.makeAsyncRequest( "GET", jsonPath, false );

        for(let json of jsonContent)
        {
            console.log(json)

            spriteMap.set( json.name, 
                    new Sprite( atlasImg, {srcX: json.x, srcY:json.y, w:json.frameWidth, h:json.h, frames:json.frames} ) );
        }

        console.log("FROM ATLAS")
        console.log(spriteMap)
    return spriteMap;
    }


}