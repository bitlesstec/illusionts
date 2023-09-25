
import {Image} from "./Image";
import { ImageMeasures } from "./ImageMeasures";

/**
 * this class will keep all the loaded images in the game,
 * those images can be atlases with a lot of image meausres on it
 * so with this you will be able to access graphic resources from anywhere
 */
export class GraphicManager
{

    private static imageMap:Map<string, Image>
    private static instance:GraphicManager;

    /**
     * this property will help to know if the instance
     * has already content loaded, to prevent reloading
     */
    static loaded:boolean;

    private constructor()
    {

        GraphicManager.imageMap = new Map<string, Image>();

        GraphicManager.loaded=false;
    }

    public static getInstance(): GraphicManager {
        if (!GraphicManager.instance) {
            GraphicManager.instance = new GraphicManager();
        }
        return GraphicManager.instance;
      }


    public static loadImage( imgName:string, image:Image):void
    {
        this.imageMap.set( imgName, image );
    }

    public static getImage( imgName:string ):Image
    {
        return this.imageMap.get(imgName);
    }


    /**
     * this will return the image measures of the imgData of the image for instance:
     * this.imageMap.get(imgName).imageData.get(imgData).imageMeasures;
     * @param imgName 
     * @param measureKey 
     * @returns 
     */
    public static getImageMeasures( imgName:string, measureKey:string ):ImageMeasures
    {
       return this.imageMap.get(imgName).imageData.get(measureKey).imageMeasures;
    }

}