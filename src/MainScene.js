import { Scene } from "phaser";
import atlas from './assets/0x72_DungeonTilesetII_v1.4.png';
import atlasJSON from './assets/atlas.json';
import mapJSON from './assets/map.json';
import { Player } from "./Player";
import { Bullet } from "./Bullet";
export class MainScene extends Scene {
      
    preload() {
        this.load.atlas('atlas', atlas, atlasJSON);
        this.load.tilemapTiledJSON('map', mapJSON);
    }
    
    create() {
        const map = this.make.tilemap({ key: 'map' });
        const tiles = map.addTilesetImage('0x72_DungeonTilesetII_v1.4', 'atlas');
        const floor = map.createLayer(0, tiles, 0, 0);
        floor.setScale(4);
        floor.setCollisionByExclusion([130]);
        const walls = map.createLayer(1, tiles, 0, 0);
        walls.setScale(4);
        let player = this.add.existing(new Player(this, 100, 100));
        const edges = map.createLayer(2, tiles, 0, 0);
        edges.setScale(4);
        this.physics.add.collider(player, floor);

        function arrowCollideCallBack(bullet, object) {
            console.log(object);
        }


        this.events.on('addedtoscene', (object) => {
            if(object instanceof Bullet) {
                this.physics.add.collider(object, floor, arrowCollideCallBack)
            }
        });
    }

}