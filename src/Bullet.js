export class Bullet {
    x;
    y;
    speed = {
        x: 0,
        y: 0,
    };
    maxSpeed;
    drag;
    constructor(x,y, maxSpeed, drag){
        this.x = x;
        this.y = y;
        this.drag = drag;
        this.maxSpeed = maxSpeed;
        this.setSpeed('x', 1, 'KeyD');
    }
    input(keys) {
       
    }
    update(delta){
        this.x += this.speed.x/1000*delta;
        this.y += this.speed.y/1000*delta;
    }
    draw(ctx){
        ctx.fillStyle = 'red';
        ctx.fillRect(Math.floor(this.x), Math.floor(this.y), 10, 10);
    }
    clear(ctx){
        ctx.clearRect(Math.floor(this.x), Math.floor(this.y), 10, 10);
    }


    setSpeed(axis, side){
        this.speed[axis] = side * this.maxSpeed;
    }
}