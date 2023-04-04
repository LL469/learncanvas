export class MainScene {
    entities = [];
    constructor(){

    }

    input(keys){
        this.entities.forEach(entity => {
            entity.input(keys);
        });
    }

    update(delta){
        this.entities.forEach(entity => {
            entity.update(delta);
        });
    }

    draw(ctx){
        this.entities.forEach(entity => {
            entity.draw(ctx);
        });
    }

    clear(ctx){
        this.entities.forEach(entity => {
            entity.clear(ctx);
        });
    }

    add(entity) {
        this.entities.push(entity);
    }
}