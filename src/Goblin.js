import { Physics } from "phaser";
import { InputManager } from "./InputManager";


export class Goblin extends Physics.Arcade.Sprite {
    input;
    //could be put into data
    target;
    healthBar;
    damageInterval = 500;
    lastDamageTime = 0;
    myTime = 0;
    
    constructor(scene, x, y, player){
        super(scene, x, y, 'atlas', 'goblin_idle_anim_0');
        scene.physics.add.existing(this);
        this.body.setOffset(4, 6);
        this.body.setSize(10, 10, false);
        this.body.setMaxSpeed(200);

        this.body.setDrag(800, 800);

        this.target = player

        
      
        this.anims.create({
            key: 'goblin_idle_anim',
            frames: this.anims.generateFrameNames('atlas', { prefix: 'goblin_idle_anim_', start:0, end: 3}),
            repeat: -1,
            frameRate: 8,
     
        });
        
        this.anims.create({
            key: 'goblin_run_anim',
            frames: this.anims.generateFrameNames('atlas', { prefix: 'goblin_run_anim_', start:0, end: 3}),
            repeat: -1,
            frameRate: 8,
            
        });
        this.anims.create({
            key: 'goblin_hit_anim',
            frames: this.anims.generateFrameNames('atlas', { prefix: 'goblin_hit_anim_', start:0, end: 0}),
            repeat: -1,
            frameRate: 8,
      
        });
        
        this.anims.play('goblin_idle_anim');
    
        this.setScale(4);
        this.input = new InputManager(scene);
        

        this.setData("health", 3);
        this.healthBar = scene.add.text(0, 0, "#".repeat(this.getData("health")), {fontSize: '12px', color: '#ff0000',});
        this.on('changedata-health', (gameObject, value, previousValue) => {
            this.healthBar.setText("#".repeat(value));

            if(previousValue==1){
                scene.physics.world.disable(this);
                this.setActive(false);
                this.setRotation(1.5708);
            }
        });
        


       
    }
    isMoving(){
   
        return this.body.speed>0;
    }
    preUpdate(time, delta) {
        if(this.target.getData("health") <= 0){return}
        this.myTime = time; //gave up
        this.healthBar.setPosition(this.x-15, this.y-30);

        const differenceX = this.target.x-this.x;
        const differenceY = this.target.y-this.y+12;

        const chill = 10;

        super.preUpdate(time, delta);

        if(differenceX < -chill) {
            this.body.setVelocityX(-this.body.maxSpeed);
            this.setFlipX(true);
        }
        if(differenceX > chill) {
            this.body.setVelocityX(this.body.maxSpeed);
            this.setFlipX(false);
        }
        if(differenceY < -chill) {
            this.body.setVelocityY(-this.body.maxSpeed);
           
        }
        if(differenceY > chill) {
            this.body.setVelocityY(this.body.maxSpeed);
            
        }

        if(this.isMoving()){
            this.play('goblin_run_anim', true);
        } else {
            this.play('goblin_idle_anim', true);
        }
    }
}