import { GameObjects } from "phaser";

export class Bullet extends GameObjects.Sprite {
    x;
    y;
    speed = {
        x: 0,
        y: 0,
    };
    maxSpeed;
    drag;
    constructor(scene, x,y, maxSpeed, drag, angle){
        super(scene, x, y);
        this.setTexture('atlas', 'weapon_arrow');
        this.setScale(4);
        this.x = x; 
        this.y = y;
        this.drag = drag;
        this.maxSpeed = maxSpeed;
        this.target = new Phaser.Math.Vector2();
        this.target.x = 100;
        this.target.y = 200;
        game.physics.arcade.enable(player);

        scene.physics.moveToObject(this, this.target, 200);
    }

    // preUpdate(time,delta){
    //     this.x += this.speed.x/1000*delta;
    //     this.y += this.speed.y/1000*delta;
    // }



    // setSpeed(axis, side){
    //     this.speed[axis] = side * this.maxSpeed;
    // }
    // setSpeedsFromAngle(angle){
    //     this.speed.y = this.maxSpeed * Math.cos(angle);
    //     this.speed.x = this.maxSpeed * Math.sin(angle);
    // }
}