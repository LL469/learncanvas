import { App } from './App'
import { MainScene } from './MainScene'
import { Player } from './Player';
import './style.css'
let scene = new MainScene();
let app = new App('canvas', scene);
scene.add(new Player(100, 100, 300, 5));