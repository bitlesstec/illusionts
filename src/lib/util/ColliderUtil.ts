import { Collider } from "../graphic/shape/Collider.js";


/**
 * this class is used mostly by CollisionUtils to generate colliders 
 * for one or several sprites, this that can be used to collision which
 * does not necesary needs to be objects like sprites
 */
export class ColliderUtil
{

    static parse(colliderMap:number[], cols:number, rows:number, colliderWidth:number, colliderHeight:number):Collider[]
    {
        
        let colliderList:Collider[] = [];

        let tileIndex:number = 0;
            
            for( let i = 0; i < rows; i++ )
                {
                    let tiley = i * colliderHeight;
                
                        //for de columnas
                        for( let j = 0; j < cols; j++ )
                        {
                            let tilex = j * colliderWidth;
                          
                            //value of tileMap, can be image or solid tile
                            let tileFrame = colliderMap[ tileIndex ];
                           
                            tileIndex++;
                             
                            //all tiles with 0 values are ignored so they can be used to sort
                            //other tiles used as sprite positions, etc.
                            if( tileFrame == 0 ) continue;
                                    
                            let t = new Collider(tilex, tiley, colliderWidth, colliderHeight);
    
                            colliderList.push( t );//tile added
                        }//j
                } //i       
    
            return colliderList;

    }

}