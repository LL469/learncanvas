import './style.css'
/** @type {HTMLCanvasElement} */
let canvas = document.getElementById('canvas');
canvas.focus();
canvas.addEventListener('keydown', keydown);
canvas.addEventListener('keyup', keyup);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext('2d');
ctx.fillStyle = 'red';

let box = {
    x: 100,
    y: 100,
    maxSpeed: 300,
    xSpeed: 0,
    ySpeed: 0,
    drag: 5
}

let bullet = {
    x: 0,
    y: 0,
    maxSpeed: 300,
    xSpeed: 0,
    ySpeed: 0,
}

let bullets = [];

let keys = {
    a: false,
    d: false,
    w: false,
    s: false
}
let start = 0
let previous = 0;
let previousBullet = 0;
function step(timestamp){
    if(start == undefined){
        start = timestamp;
    }
    
    const delta = timestamp - previous;
    drawFps(previous,timestamp,delta);
    //console.log(delta);
    drawBox(delta);
    drawBullets(delta);
    previous = timestamp;
    window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);


function drawFps(previous, timestamp, delta){
    const prevSec = Math.floor(previous /1000);
    const currentSec = Math.floor(timestamp /1000);
    if(prevSec !== currentSec){
        const fps = Math.floor(1000 / delta);
        ctx.clearRect(0, 0, 100, 100);
        ctx.fillStyle = 'red';
        ctx.font = "30px Arial";
        ctx.fillText(fps, 0,30);
    }
}

function drawBullets(delta){
    bullets.forEach(bullet => {
        ctx.clearRect(Math.floor(bullet.x), Math.floor(bullet.y), 10, 10);
        bullet.x += bullet.xSpeed/1000*delta;
        bullet.y += bullet.ySpeed/1000*delta;
        ctx.fillRect(Math.floor(bullet.x), Math.floor(bullet.y), 10, 10);
    });
}

function drawBox(delta){
    ctx.clearRect(Math.floor(box.x), Math.floor(box.y), 50, 50);
    //console.log(box.speed/1000*delta);
    box.x += box.xSpeed/1000*delta;
    box.y += box.ySpeed/1000*delta;

    if(!keys.a && !keys.d){
        if(Math.abs(box.xSpeed) < box.drag) {
            box.xSpeed = 0;
        } else {
            box.xSpeed += -1 * (box.xSpeed / Math.abs(box.xSpeed)) * box.drag;
        }
       
    }
    if(!keys.w && !keys.s){
        if(Math.abs(box.ySpeed) < box.drag) {
            box.ySpeed = 0;
        } else {
            box.ySpeed += -1 * (box.ySpeed / Math.abs(box.ySpeed)) * box.drag;
        }
    }
    //console.log(box.xSpeed, box.ySpeed);
    ctx.fillRect(Math.floor(box.x), Math.floor(box.y), 50, 50);
}

function speed(axis, side, key){
    let speedAxis = axis == 'x' ? 'xSpeed' : 'ySpeed';
    let otherAxis = axis == 'x' ? 'ySpeed' : 'xSpeed';
    let keyCheck = axis == 'x' ? (keys.s || keys.w) : (keys.a || keys.d); 
    let positiveCheck = axis == 'x' ? keys.s : keys.d;
    box[speedAxis] = side * box.maxSpeed;
    keys[key] = true;
    if(keyCheck){
        box[speedAxis] = side * Math.sqrt(box.maxSpeed*box.maxSpeed/2);
        if(positiveCheck){
            box[otherAxis] = Math.sqrt(box.maxSpeed*box.maxSpeed/2);
        } else {
            box[otherAxis] = -1 * Math.sqrt(box.maxSpeed*box.maxSpeed/2);
        }
    }
}
function keydown(evt){
    console.log(evt);
    switch(evt.code){
        case 'KeyA':
            speed('x', -1, 'a');
            break;
        case 'KeyD':
            speed('x', 1, 'd');
            break;
        case 'KeyS':
            speed('y', 1, 's');
            break;
        case 'KeyW':
            speed('y', -1, 'w');
            break;
        case 'Space':
            console.log(previous-previousBullet);
            if(previous-previousBullet >100){
                previousBullet = previous;
                let newBullet = { ...bullet };
                newBullet.x = box.x;
                newBullet.y = box.y;
                newBullet.xSpeed = newBullet.maxSpeed;
                bullets.push(newBullet);
            }
            break;
    }
}

function keyup(evt){
    console.log(evt);
    switch(evt.code){
        case 'KeyA':
            //box.xSpeed = 0;
            keys.a = false;
            break;
        case 'KeyD':
            //box.xSpeed =0;
            keys.d = false;
            break;
        case 'KeyS':
            //box.ySpeed = 0;
            keys.s = false;
            break;
        case 'KeyW':
            //box.ySpeed = 0;
            keys.w = false;
            break;
    }
}