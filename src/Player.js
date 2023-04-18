import { Physics } from "phaser";
import { Bullet } from "./Bullet";
import { InputManager } from "./InputManager";

export class Player extends Physics.Arcade.Sprite {
    input;
    shootInterval = 500;
    lastShotTime = 0;
    constructor(scene, x, y){
        super(scene, x, y);
        scene.physics.add.existing(this);
        this.body.setMaxSpeed(400);
        this.body.useDamping = true;
        this.body.setDrag(0.01, 0.01);
        this.setTexture('atlas', 'elf_m_idle_anim');
        this.setScale(4);
        this.input = new InputManager(scene);
       
    }

    preUpdate(time, delta) {
        
        if(this.input.keys.KeyA.isDown) {
            this.body.setVelocityX(-this.body.maxSpeed);
            
        }
        if(this.input.keys.KeyD.isDown) {
            this.body.setVelocityX(this.body.maxSpeed);
            
        }
        if(this.input.keys.KeyW.isDown) {
            this.body.setVelocityY(-this.body.maxSpeed);
           
        }
        if(this.input.keys.KeyS.isDown) {
            this.body.setVelocityY(this.body.maxSpeed);
            
        }
        if(this.input.keys.Space.isDown){
            
            if(time-this.lastShotTime > this.shootInterval){
                this.scene.add.existing(new Bullet(this.scene, this.x,this.y, this.input.mouse));
                this.lastShotTime = time;
            }         
        }
    }
}