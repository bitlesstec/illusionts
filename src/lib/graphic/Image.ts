
import { ImageData } from "../ntfc/ImageData.js";

/**
 * this class will contain an image html element and all imame measures
 * asociated to that in case is an atlas,
 * a single image sprite can have no image measurer meaning 
 * the sole image is the entire sprite and the image measures are the 
 * same of the image html element.
 */
export class Image
{


    image:HTMLImageElement;
    // imageMeasures: ImageMeasures[];
    imageData: Map<string, ImageData>

    constructor( image:HTMLImageElement, atlasJson?: any)
    {
        this.image= image;
        this.imageData = atlasJson? this.setImageData(atlasJson):undefined;
    }


    /**
     * will return specific ImageData object from specified key
     * that key is the name of the entry in atlas.json
     * @param key 
     */
    getImageData(key: string): ImageData {
        return this.imageData.get(key);
    }

    private setImageData(atlasJson: any) {
        // console.log(atlasJson)
        const imgDatas = new Map<string, ImageData>();

        for (let json of atlasJson) {
            imgDatas.set(json.name,
                {
                    name: json.name,
                    label: json.label,
                    copies: json.copies,
                    imageMeasures: {
                        srcX: json.imageMeasures.x,
                        srcY: json.imageMeasures.y,
                        w: json.imageMeasures.frameWidth,
                        h: json.imageMeasures.h,
                        frames: json.imageMeasures.frames,
                        label: json.label
                    }
                }
            );

        }
        return imgDatas;
    }


}