import {Player} from "./player";
import {Info} from "./info"
import {Laser} from "./laser";
import {Mob} from "./mobs";

export class World {
    constructor() {
        // Создадим игрока
        this.player = new Player(15, 15);
        this.laser = [];// ToDo: Создать массив лазеров
        this.mob = [];
    }

    click (x, y) {// ToDo: Метод click, которая принимает x, y
        this.laser.push(new Laser(this.player.x, this.player.y, x, y));
    }// В зависисмости от нажатых клавиш изменяем среду
    spawn () {
        this.mob.length < 10 ? this.mob.push(new Mob(Math.random() * (window.innerWidth - 20) + 10,Math.random() * (window.innerHeight - 20) + 10 )) :null;
    }
    move = (keys) => {
        // Для каждого ключа в объекте
        Object.keys(keys).map((key) => {
            // Если нажата кнопка
            if (keys[key]) {
                // Взависимости от того какая кнопка
                switch (key) {
                    case "a":
                        this.player.x - 2 >= this.player.r ? this.player.go_left() :null;
                        break;
                    case "d":
                        this.player.x + 2 <= window.innerWidth - this.player.r ? this.player.go_right() :null;
                        break;
                    case "s":
                        this.player.y + 2 <= window.innerHeight - this.player.r ? this.player.go_down() :null;
                        break;
                    case "w":
                        this.player.y - 2 >= this.player.r ? this.player.go_up() :null;
                        break;
                }
            }
        });

    };

    get_items() {
        this.laser = this.laser.filter(Laser => (Math.round(Laser.cur_x) !== Math.round(Laser.dist_x))&&(Math.round(Laser.cur_y) !== Math.round(Laser.dist_y)));// ToDo: Возвращать массив лазеров
        this.mob.forEach(Mob => {
            Mob.go_x = this.player.x;
            Mob.go_y = this.player.y;
        });

        this.laser = this.laser.filter(Laser =>{
            let good = false;
            this.mob = this.mob.filter(Mob => {
                ((((Mob.coo_x - Laser.cur_x)**2 + (Mob.coo_y - Laser.cur_y)**2)**0.5) < 15) ? good = true :null;
                return ((((Mob.coo_x - Laser.cur_x)**2 + (Mob.coo_y - Laser.cur_y)**2)**0.5) >= 15)
            });
            return !good
        });


        this.mob.map(Mob => (((Mob.coo_x - this.player.x)**2 + (Mob.coo_y - this.player.y)**2)**0.5) <= 18 ? this.player.live=this.player.live - 1 :null );/*((Math.abs((Math.round(Mob.coo_x) - Math.round(this.player.x))) <= 5)&&((Math.abs(Math.round(Mob.coo_y) - Math.round(this.player.y)))<=5) ? this.player.live=this.player.live - 1 :null)*/
        if (this.player.live <= 0) {
            alert("Game over");
            this.player.x = 15;
            this.player.y = 15;
            this.player.live = 10;
            this.mob.splice(0, this.mob.length);
            this.laser.splice(0, this.laser.length);
        }


        this.mob = this.mob.filter(Mob => (((Mob.coo_x - this.player.x)**2 + (Mob.coo_y - this.player.y)**2)**0.5) > 18);/*(Math.abs((Math.round(Mob.coo_x) - Math.round(this.player.x))) > 5)||((Math.abs(Math.round(Mob.coo_y) - Math.round(this.player.y))) > 5))*/

        return [this.player, new Info(this.player.x, this.player.y, this.player.live), ...this.laser, ...this.mob];
    }

}

