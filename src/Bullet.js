import * as Phaser from "phaser";
import { MainScene } from "./MainScene";

export class Bullet extends Phaser.Physics.Arcade.Sprite {

    constructor(scene,x,y, target){
        super(scene, x, y);
        scene.physics.add.existing(this);
        this.setTexture('atlas', 'weapon_arrow');

        this.body.setOffset(-5, 3);
        this.body.setSize(16, 16, false);

        this.setScale(4);
        this.body.setMaxSpeed(800);
        this.body.useDamping = true;
        //this.body.setDrag(0.5, 0.5);
        console.log(Phaser.Math.Angle.BetweenPoints(this, target));
        this.rotation = Phaser.Math.Angle.BetweenPoints(this, target)+Math.PI/2;
        
 
        scene.physics.moveToObject(this, target, 800);
        this.setData("flying", true);

        this.on('changedata-flying', (gameObject, value, previousValue) => {
            if(value == false){
                this.setVelocity(0, 0);
                scene.physics.world.removeCollider(this.getData("collider"));
            }
            
        });
    }


    
}