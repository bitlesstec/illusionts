import { Point } from "./Point.js";
export class Tile extends Point {
    constructor(x, y, w, h, imageIndex) {
        super();
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.imageIndex = imageIndex;
    }
} //
