import { GameObjects } from "phaser";

export class Player extends GameObjects.Sprite {
    constructor(scene, x, y){
        super(scene, x, y);
        this.setTexture('atlas', 'elf_m_idle_anim');
        this.setScale(4);
    }
}