import { App } from "./App";
import { Bullet } from "./Bullet";

export class Player {
    x;
    y;
    speed = {
        x: 0,
        y: 0,
    };
    maxSpeed;
    drag;
    previousBullet = new Date().getTime();
    constructor(x,y, maxSpeed, drag){
        this.x = x;
        this.y = y;
        this.drag = drag;
        this.maxSpeed = maxSpeed;
    }
    input(keys) {
        
        if(keys.KeyA) {
            this.setSpeed(keys, 'x', -1, 'KeyA');
        }
        if(keys.KeyD) {
            this.setSpeed(keys, 'x', 1, 'KeyD');
        }
        if(keys.KeyW) {
            this.setSpeed(keys, 'y', -1, 'KeyW');
        }
        if(keys.KeyS) {
            this.setSpeed(keys, 'y', 1, 'KeyS');
        }
        if(keys.Space){
            if(new Date().getTime() - this.previousBullet > 1000){
                App.app.scene.add(new Bullet(this.x,this.y,300, 0));
                this.previousBullet = new Date().getTime();
            }
        }
         if(!keys.KeyA && !keys.KeyD){
            if(Math.abs(this.speed.x) < this.drag) {
                this.speed.x = 0;
            } else {
                this.speed.x += -1 * (this.speed.x / Math.abs(this.speed.x)) * this.drag;
            }
           
        }
        if(!keys.KeyW && !keys.KeyS){
            if(Math.abs(this.speed.y) < this.drag) {
                this.speed.y = 0;
            } else {
                this.speed.y += -1 * (this.speed.y / Math.abs(this.speed.y)) * this.drag;
            }
        }
    }
    update(delta){
        this.x += this.speed.x/1000*delta;
        this.y += this.speed.y/1000*delta;
    }
    draw(ctx){
        ctx.fillStyle = 'red';
        ctx.fillRect(Math.floor(this.x), Math.floor(this.y), 50, 50);
    }
    clear(ctx){
        ctx.clearRect(Math.floor(this.x), Math.floor(this.y), 50, 50);
    }


    setSpeed(keys, axis, side, key){
        let speedAxis = axis;
        let otherAxis = axis == 'x' ? 'y' : 'x';
        let keyCheck = axis == 'x' ? (keys.KeyS || keys.KeyW) : (keys.KeyA || keys.KeyD); 
        let positiveCheck = axis == 'x' ? keys.KeyS : keys.KeyD;
        this.speed[speedAxis] = side * this.maxSpeed;
        keys[key] = true;
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