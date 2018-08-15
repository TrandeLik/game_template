import * as PIXI from "pixi.js";


export class Mob {
    constructor(coo_x, coo_y, go_x,go_y){
        this.coo_x = coo_x;
        this.coo_y = coo_y;
        this.r = 8;
        this.V0 = 2;
        this.go_x = go_x;
        this.go_y = go_y;
    }

    draw() {
        let k = (this.go_y - this.coo_y) / (this.go_x - this.coo_x);
        let b = this.coo_y - this.coo_x * k;
        let Vx = this.V0*(Math.cos(Math.atan(k)));
        let Vy = this.V0*(Math.sin(Math.atan(k)));
        this.go_x >= this.coo_x ? this.coo_x = this.coo_x + Vx :this.coo_x = this.coo_x - Vx;
        this.coo_y = k * this.coo_x + b;
        //http://pixijs.download/dev/docs/PIXI.Graphics.html
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0x000FFF);
        graphics.drawCircle(this.coo_x, this.coo_y, this.r);
        graphics.endFill();
        return graphics
    }
}