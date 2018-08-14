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
        this.mob.length < 15 ? this.mob.push(new Mob(Math.random() * (window.innerWidth - 20) + 10,Math.random() * (window.innerHeight - 20) + 10 ), this.player.x, this.player.x) :null;
    }
    move = (keys) => {
        // Для каждого ключа в объекте
        Object.keys(keys).map((key) => {
            // Если нажата кнопка
            if (keys[key]) {
                // Взависимости от того какая кнопка
                switch (key) {
                    case "a":
                        this.player.x - 1 >= this.player.r ? this.player.go_left() :null;
                        break;
                    case "d":
                        this.player.x + 1 <= window.innerWidth - this.player.r ? this.player.go_right() :null;
                        break;
                    case "s":
                        this.player.y + 1 <= window.innerHeight - this.player.r ? this.player.go_down() :null;
                        break;
                    case "w":
                        this.player.y - 1 >= this.player.r ? this.player.go_up() :null;
                        break;
                }
            }
        });

    };

    get_items() {
        this.laser = this.laser.filter(Laser => (Math.round(Laser.cur_x) !== Math.round(Laser.dist_x))&&(Math.round(Laser.cur_y) !== Math.round(Laser.dist_y)));// ToDo: Возвращать массив лазеров
        return [this.player, new Info(this.player.x, this.player.y), ...this.laser, ...this.mob];
    }

}

