export class Player {
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
    }

    update(delta){
        this.x += this.speed.x/1000*delta;
        this.y += this.speed.y/1000*delta;
    
        // if(!keys.a && !keys.d){
        //     if(Math.abs(this.speed.x) < this.drag) {
        //         this.speed.x = 0;
        //     } else {
        //         this.speed.x += -1 * (this.speed.x / Math.abs(this.speed.x)) * this.drag;
        //     }
           
        // }
        // if(!keys.w && !keys.s){
        //     if(Math.abs(this.speed.y) < this.drag) {
        //         this.speed.y = 0;
        //     } else {
        //         this.speed.y += -1 * (this.speed.y / Math.abs(this.speed.y)) * this.drag;
        //     }
        // }
    }
    draw(ctx){
        ctx.fillStyle = 'red';
        ctx.fillRect(Math.floor(this.x), Math.floor(this.y), 50, 50);
    }
    clear(ctx){
        ctx.clearRect(Math.floor(this.x), Math.floor(this.y), 50, 50);
    }
}