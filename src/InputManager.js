export class InputManager {
    keys = {};
    mouse = {
        x: 0,
        y: 0
    }
    /**
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas){
    
        canvas.addEventListener('keydown', this.keydown);
        canvas.addEventListener('keyup', this.keyup);
        canvas.addEventListener('mousemove', this.mousemove)
    }
    keyup = (evt) => {
        this.keys[evt.code] = false;
    }
    keydown = (evt) => {
        this.keys[evt.code] = true;
    }
    mousemove = (evt) => {
        this.mouse.x = evt.clientX;
        this.mouse.y = evt.clientY;
    }
}