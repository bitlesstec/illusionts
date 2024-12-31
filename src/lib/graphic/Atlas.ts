import { ImageMeasures } from "./ImageMeasures";


/**
 * @NOTE: check this later agains Image class maybe it should be a subclass of it   
 */
export class Atlas
{

    image:HTMLImageElement;
    imageMeasures:Map<string, ImageMeasures>


constructor(image:HTMLImageElement, atlasJson:any)
{
    this.image = image;
    this.imageMeasures = this.getImageMeasures(atlasJson);
}

private getImageMeasures(atlasJson:any)
{
    const measures = new Map<string, ImageMeasures>();

    for( let json of atlasJson )
    {
        measures.set(json.name, 
            {
                srcX: json.imageMeasures.x,
                srcY: json.imageMeasures.y,
                w: json.imageMeasures.frameWidth,
                h: json.imageMeasures.h,
                frames: json.imageMeasures.frames,
                label:json.label
            });

    }
    return measures;
}


}