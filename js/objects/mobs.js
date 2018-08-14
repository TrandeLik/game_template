import * as PIXI from "pixi.js";


export class Mob {
    constructor(coo_x, coo_y, go_x,go_y){
        this.coord_x = coo_x;
        this.coord_y = coo_y;
        this.r = 8;
        this.go_x = go_x;
        this.go_y = go_y;
    }

    draw() {
        // http://pixijs.download/dev/docs/PIXI.Graphics.html
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0x000FFF);
        graphics.drawCircle(this.coord_x, this.coord_y, this.r);
        graphics.endFill();
        return graphics
    }
}