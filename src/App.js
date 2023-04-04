export class App {
    scene;
    start = 0;
    previous = 0;
    ctx;
    constructor(canvasId,scene){

        /** @type {HTMLCanvasElement} */
        let canvas = document.getElementById(canvasId);
        canvas.focus();
        // canvas.addEventListener('keydown', keydown);
        // canvas.addEventListener('keyup', keyup);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.ctx = canvas.getContext('2d');

        this.scene = scene;
        
        let step = timestamp => {
            console.log(this);
            if(this.start == 0){
                this.start = timestamp;
            }
            
            const delta = timestamp - this.previous;
            this.scene.clear(this.ctx);
            this.scene.update(delta);
            this.scene.draw(this.ctx);
            
    
            this.previous = timestamp;
            window.requestAnimationFrame(step);
        }


        window.requestAnimationFrame(step);
    }

   
    
    
}