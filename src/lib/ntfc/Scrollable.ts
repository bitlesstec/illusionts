

export interface Scrollable{

    /**
     * this will scroll background in X axis
     * THIS MUST BE CALLED IN UPDATE METHOD  
     * @param xSpd 
     * @param viewWidth this is scrolling limit, it can be also levelWidth if view are not enabled
     */
    scrollX(xSpd:number, viewWidth:number):void;

/**
     * this will scroll background in Y axis
     * THIS MUST BE CALLED IN UPDATE METHOD 
     * @param xSpd 
     * @param viewHeight this is scrolling limit, it can be also levelHeight if view are not enabled
     */
    scrollY(ySpd:number, viewHeight:number):void;

    /**
     * this is used to scroll background in both axis ( X & Y )
     * with the scroll speed already set
     */
    scroll( viewWidth:number, viewHeight:number):void;
}