import {Player} from "./player";
import {Info} from "./info"


export class World {
    constructor() {
        // Создадим игрока
        this.player = new Player(15, 15)
    }

    // В зависисмости от нажатых клавиш изменяем среду
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
        return [this.player, new Info(this.player.x, this.player.y)]
    }

}

