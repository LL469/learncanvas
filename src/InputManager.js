export class InputManager {
    keys = {};
    constructor(canvas){
        canvas.addEventListener('keydown', this.keydown);
        canvas.addEventListener('keyup', this.keyup);
    }
    keyup = (evt) => {
        this.keys[evt.code] = false;
    }
    keydown = (evt) => {
        this.keys[evt.code] = true;
    }
}