import { Scene } from "phaser";
import atlas from './assets/0x72_DungeonTilesetII_v1.4.png';
import atlasJSON from './assets/atlas.json';
import mapJSON from './assets/map.json';
import { Player } from "./Player";
import { Bullet } from "./Bullet";
import { Goblin } from "./Goblin";

export class MainScene extends Scene {

    text;

      
    preload() {
        this.load.atlas('atlas', atlas, atlasJSON);
        this.load.tilemapTiledJSON('map', mapJSON);
    }
    
    create() {
        this.text = this.add.text(100, 100, '0', {fontSize: '64px',});
        


        const map = this.make.tilemap({ key: 'map' });
        const tiles = map.addTilesetImage('0x72_DungeonTilesetII_v1.4', 'atlas');
        const floor = map.createLayer(0, tiles, 0, 0);
        floor.setScale(4);
        floor.setCollisionByExclusion([130]);
        const walls = map.createLayer(1, tiles, 0, 0);
        walls.setScale(4);
        let player = this.add.existing(new Player(this, 100, 100, 3));
        const edges = map.createLayer(2, tiles, 0, 0);
        edges.setScale(4);
        this.physics.add.collider(player, floor);

        function goblinPlayerCallBack(goblin, player) {

            if(goblin.myTime-goblin.lastDamageTime > goblin.damageInterval){
                goblin.lastDamageTime = goblin.myTime;
                player.data.inc("health", -1);

            }
        }

        let goblin = this.add.existing(new Goblin(this, 600, 600, player));
        this.physics.add.collider(goblin, floor);
        this.physics.add.collider(goblin, player, goblinPlayerCallBack);


        function arrowCollideCallBack(bullet, object) {
            bullet.setData("flying", false);
        }

        function arrowOverlapCallback(bullet, object) {
            if(object instanceof Player) {
                if(bullet.getData("flying") == false){
                    object.data.inc("arrows", 1);
                    bullet.destroy();
                }
            }else if(object instanceof Goblin) {
                if(bullet.getData("flying") == true){
                    bullet.destroy();
                    object.data.inc('health', -1);
                }
            }
            
        }

        this.events.on('addedtoscene', (object) => {
            if(object instanceof Bullet) {
                const collider = this.physics.add.collider(object, floor, arrowCollideCallBack);
                object.setData("collider", collider);
                this.physics.add.overlap(object, player, arrowOverlapCallback);
                this.physics.add.overlap(object, goblin, arrowOverlapCallback);
            }
        });

        

        














    }

}