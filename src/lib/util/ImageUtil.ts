

export class ImageUtil
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
     */
    static getImages( filePath:string, imgFrames:number, frameWidth:number, frameHeight?:number):HTMLImageElement[]
    {
        return null;
    }


    /**
     * this will take an screenshot of the game and will save this in
     * user location
     */
    static takeScreenshot():void
    {}



}