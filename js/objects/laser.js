import * as PIXI from "pixi.js";

export class Laser {
    constructor(cur_x, cur_y, dist_x, dist_y) {
        this.cur_x = cur_x;
        this.cur_y = cur_y;
        this.r = 5;
        this.V0 = 5;
        this.dist_x = dist_x;
        this.dist_y = dist_y;
        this.k = (this.dist_y - this.cur_y) / (this.dist_x - this.cur_x);
        this.b = this.cur_y - this.cur_x * this.k;
        this.Vx = this.V0*(Math.cos(Math.atan(this.k)));
        this.Vy = this.V0*(Math.sin(Math.atan(this.k)));
    }

    rasch () {// ToDo: Сделать метод, который вычисляет новый x и y

      this.dist_x >= this.cur_x ? this.cur_x = this.cur_x + this.Vx :this.cur_x = this.cur_x - this.Vx;
      this.cur_y = this.k * this.cur_x + this.b;
    }
    draw() {
        this.rasch();// ToDo: Вызвать этот метод
        // http://pixijs.download/dev/docs/PIXI.Graphics.html
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF);
        graphics.drawCircle(this.cur_x, this.cur_y, this.r);
        graphics.endFill();
        return graphics
    }
}