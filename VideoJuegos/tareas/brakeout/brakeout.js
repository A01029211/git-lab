/*
 * Implementation of the game breakout
 *
 * Santiago Cordova
 * 2025-03-11
 */

"use strict";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;

let oldTime;
const paddleVelocity = 1.0;
const initialSpeed = 0.3;

let score = 0;
let vidas = 3;
let playing = true;

// Context of the Canvas
let ctx;

// Clases for the Pong game
class Ball extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "ball");
        this.reset();
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime));
    }

    initVelocity() {
        this.inPlay = true;

        // Ángulo en el eje Y siempre hacia abajo (sin cambiar)
        let angleY = Math.PI / 2;

        // Generar una dirección aleatoria para el eje X, ya sea izquierda o derecha
        let directionX = Math.random() < 0.5 ? -1 : 1;

        // Establecer la velocidad en el eje X y Y
        this.velocity = new Vec(directionX, Math.sin(angleY)).times(initialSpeed);
    }

    reset() {
        this.inPlay = false;
        this.position = new Vec(canvasWidth / 2, canvasHeight / 2);
        this.velocity = new Vec(0, 0);
    }
}

class Paddle extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "paddle");
        this.velocity = new Vec(0.0, 0.0);
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime));

        // Limitar el movimiento del paddle dentro del canvas
        if (this.position.x < 0) {
            this.position.x = 0;
        } else if (this.position.x + this.width > canvasWidth) {
            this.position.x = canvasWidth - this.width;
        }
    }

}


// Inicialización del paddle en la parte inferior
const botompaddle = new Paddle(new Vec((canvasWidth - 100) / 2, canvasHeight - 20), 100, 20, "white");
const ball = new Ball(new Vec(canvasWidth / 2 - 20, canvasHeight / 2 - 20), 20, 20, "white");
const borderTop = new Paddle(new Vec(0 , 0), canvasWidth,10,"white");
const borderRight = new Paddle(new Vec(canvasWidth - 10 , 0), 10, canvasHeight, "white");
const borderLeft = new Paddle(new Vec(0, 0), 10, canvasHeight, "white");
const borderBottom = new Paddle(new Vec(0 , canvasHeight -1 ), canvasWidth, 1,"white");
const textScore = new TextLabel (35 , 35 , "20px Ubuntu Mono",  "white");
const textVidas = new TextLabel (canvasWidth - 100, 35 , "20px Ubuntu Mono",  "white");
const textGameOver = new TextLabel (canvasWidth/2 -150 , canvasHeight/2 , "50px Ubuntu Mono",  "white");
const textWinner = new TextLabel (canvasWidth/2 -150 , canvasHeight/2 , "50px Ubuntu Mono",  "white");

function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');

    createEventListeners();
    
    drawScene(0);

    createBlocks();
}

class Block extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "block");
        this.active = true; // Indica si el bloque aún está en juego
    }
}

class PowerUp extends GameObject {
    constructor(position, width, height, color, effect) {
        super(position, width, height, color, "powerup");
        this.effect = effect; 
        this.active = true;
    }

    update(deltaTime) {
        this.position = this.position.plus(new Vec(0, 0.7)); // Movimiento hacia abajo
    }

    applyEffect(paddle) {
        if (this.effect === "expand") {
            // hace mas grande el paddle
            paddle.width *= 1.5;  
            
        } else if (this.effect === "shrink") {
            // hace mas chico el padlle
            paddle.width *= 0.5;  
        }
        setTimeout(() => {
            // Restablece tamaño después de 5 segundos
            paddle.width = 100; 
        }, 5000);
    }
}

const blockRows = 5; 
const blockCols = 8; 
const blockWidth = 80; 
const blockHeight = 30; 
const blockPadding = 4; 
const blockOffsetTop = 50; 
const blockOffsetLeft = 50;

let blocks = [];
let powerUps = [];

function createBlocks() {
    for (let row = 0; row < blockRows; row++) {
        for (let col = 0; col < blockCols; col++) {
            let x = blockOffsetLeft + col * (blockWidth  + blockPadding );
            let y = blockOffsetTop + row * (blockHeight + blockPadding);
            blocks.push(new Block(new Vec(10+x, y), blockWidth, blockHeight, "white"));
        }
    }
}





function createEventListeners() {
    window.addEventListener('keydown', (event) => {
        if (event.key == 'ArrowRight') { // Flecha derecha
            botompaddle.velocity = new Vec(paddleVelocity, 0); // Mover hacia la derecha
        } else if (event.key == 'ArrowLeft') { // Flecha izquierda
            botompaddle.velocity = new Vec(-paddleVelocity, 0); // Mover hacia la izquierda
        }
    });
    
    window.addEventListener('keyup', (event) => {
        if (event.key == 'ArrowRight' || event.key == 'ArrowLeft') {
            botompaddle.velocity = new Vec(0, 0); // Detener el movimiento cuando se suelta la tecla
        }
        if (event.key == 's' && !ball.inPlay) {
            ball.initVelocity();
        }
    });
}



function drawScene(newTime) {
    if (oldTime == undefined) {
        oldTime = newTime;
    }
    let deltaTime = newTime - oldTime;

    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    botompaddle.update(deltaTime);
    ball.update(deltaTime);

    // Draw the paddle
    textScore.draw(ctx, `Score: ${score}`);
    textVidas.draw(ctx, `Vidas: ${vidas}`);
    botompaddle.draw(ctx);
    ball.draw(ctx);
    borderTop.draw(ctx);
    borderRight.draw(ctx);
    borderLeft.draw(ctx);
    borderBottom.draw(ctx);

    blocks.forEach(block => {
        if (block.active) {
            block.draw(ctx);
        }
    });

    powerUps.forEach((powerUp, index) => {
        if (powerUp.active) {
            powerUp.update(deltaTime);
            powerUp.draw(ctx);

            if (boxOverlap(powerUp, botompaddle)) {
                powerUp.applyEffect(botompaddle);
                powerUp.active = false;
                powerUps.splice(index, 1); // Eliminar power-up tras usarlo
            }
        }
    });

    if (boxOverlap(ball, botompaddle) || boxOverlap(ball, borderTop)) {
        ball.velocity.y *= -1;
    }
    if (boxOverlap(ball, borderLeft) || boxOverlap(ball, borderRight)) {
        ball.velocity.x *= -1;
    }
    if (boxOverlap(ball, borderBottom)){
        ball.reset();
        vidas--;
        if (vidas == 0){
            textGameOver.draw(ctx, `GAME OVER`);
            playing = false;
        }
    }

    // dibuja los bloques
    blocks.forEach((block, index) => {
    if (block.active && boxOverlap(ball, block)) {
        ball.velocity.y *= -1; 
        block.active = false; 
        score += 100;
        if (score === 4000){
            textWinner.draw(ctx, ` GANASTE`);
            playing = false;
        }

        if (Math.random() < 0.2) {
            let effect = Math.random() < 0.5 ? "expand" : "shrink"; // 50% expand, 50% shrink
            powerUps.push(new PowerUp(block.position, 20, 20, "red", effect));
        }
        // el splice funicona para eliminar un elemento de la lista
        blocks.splice(index, 1); 
    }
});


    oldTime = newTime;
    if (playing == true){
        requestAnimationFrame(drawScene);
    }
}