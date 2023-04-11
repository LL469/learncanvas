import { GameObjects } from "phaser";
import { Bullet } from "./Bullet";
import { InputManager } from "./InputManager";

export class Player extends GameObjects.Sprite {
    input;
    speed = {
        x: 0,
        y: 0
    }
    drag = 10;
    maxSpeed = 300;
    constructor(scene, x, y){
        super(scene, x, y);
        this.setTexture('atlas', 'elf_m_idle_anim');
        this.setScale(4);
        this.input = new InputManager(scene);
       
    }

    preUpdate(time, delta) {
        
        if(this.input.keys.KeyA.isDown) {
            this.setSpeed(this.input.keys, 'x', -1, 'KeyA');
        }
        if(this.input.keys.KeyD.isDown) {
            this.setSpeed(this.input.keys, 'x', 1, 'KeyD');
        }
        if(this.input.keys.KeyW.isDown) {
            this.setSpeed(this.input.keys, 'y', -1, 'KeyW');
        }
        if(this.input.keys.KeyS.isDown) {
            this.setSpeed(this.input.keys, 'y', 1, 'KeyS');
        }
        if(this.input.keys.Space.isDown){
            console.log('bullet');
            console.log(this.x, this.y);
                this.scene.physics.add.existing(new Bullet(this.scene, this.x,this.y,300, 0, Math.PI));         
        }
         if(!this.input.keys.KeyA.isDown && !this.input.keys.KeyD.isDown){
            if(Math.abs(this.speed.x) < this.drag) {
                this.speed.x = 0;
            } else {
                this.speed.x += -1 * (this.speed.x / Math.abs(this.speed.x)) * this.drag;
            }
           
        }
        if(!this.input.keys.KeyW.isDown && !this.input.keys.KeyS.isDown){
            if(Math.abs(this.speed.y) < this.drag) {
                this.speed.y = 0;
            } else {
                this.speed.y += -1 * (this.speed.y / Math.abs(this.speed.y)) * this.drag;
            }
        }
        this.x += this.speed.x/1000*delta;
        this.y += this.speed.y/1000*delta;

    }
    setSpeed(keys, axis, side, key){
        let speedAxis = axis;
        let otherAxis = axis == 'x' ? 'y' : 'x';
        let keyCheck = axis == 'x' ? (this.input.keys.KeyS.isDown || this.input.keys.KeyW.isDown) : (this.input.keys.KeyA.isDown || this.input.keys.KeyD.isDown); 
        let positiveCheck = axis == 'x' ? this.input.keys.KeyS.isDown : this.input.keys.KeyD.isDown;
        this.speed[speedAxis] = side * this.maxSpeed;
        if(keyCheck){
            this.speed[speedAxis] = side * Math.sqrt(this.maxSpeed*this.maxSpeed/2);
            if(positiveCheck){
                this.speed[otherAxis] = Math.sqrt(this.maxSpeed*this.maxSpeed/2);
            } else {
                this.speed[otherAxis] = -1 * Math.sqrt(this.maxSpeed*this.maxSpeed/2);
            }
        }
    }
}