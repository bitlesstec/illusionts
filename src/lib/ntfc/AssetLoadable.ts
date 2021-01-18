
export interface AssetLoadable
{

    /**
     * used to load all images
     */
    loadImages():void;

    /**
     * used to load external sound files
     */
    loadSounds():void;

    /**
     * used if you want to load external data or to call/consume 
     * a service
     */
    loadData():void;
    
    /** is used some logic in onload event to know if the assets were loaded */
    // isLoadComplete():boolean;

}