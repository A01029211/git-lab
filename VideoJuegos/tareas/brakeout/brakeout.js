/*
 * Implementation of the game of Pong
 *
 * Gilberto Echeverria
 * 2025-02-25
 */

"use strict";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;

let oldTime;
const paddleVelocity = 1.0;
const initialSpeed = 0.3;

let leftScore = 0;
let rightScore = 0;

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

// An object to represent the box to be displayed
// const box = new Ball(new Vec(canvasWidth / 2, canvasHeight / 2), 20, 20, "red");
// const leftPaddle = new Paddle(new Vec(20, canvasHeight / 2), 20, 100, "blue");
// const rightPaddle = new Paddle(new Vec(canvasWidth - 40, canvasHeight / 2), 20, 100, "blue");
// const topBar = new GameObject(new Vec(0, 0), canvasWidth, 20, "black", "obstacle");
// const bottomBar = new GameObject(new Vec(0, canvasHeight - 20), canvasWidth, 20, "black", "obstacle");
// const leftGoal = new GameObject(new Vec(0, 0), 20, canvasHeight, "green", "leftGoal");
// const rightGoal = new GameObject(new Vec(canvasWidth -20, 0), 20, canvasHeight, "green", "rightGoal");
// const leftLabel = new TextLabel(100, 50, "40px Ubuntu Mono", "white")
// const rightLabel = new TextLabel(500, 50, "40px Ubuntu Mono", "white")

// Inicialización del paddle en la parte inferior
const botompaddle = new Paddle(new Vec((canvasWidth - 100) / 2, canvasHeight - 20), 100, 20, "blue");
const ball = new Ball(new Vec(canvasWidth / 2 - 20, canvasHeight / 2 - 20), 20, 20, "red");
const borderTop = new Paddle(new Vec(0 , 0), canvasWidth,10,"black");
const borderRight = new Paddle(new Vec(canvasWidth - 10 , 0), 10, canvasHeight, "black");
const borderLeft = new Paddle(new Vec(0, 0), 10, canvasHeight, "black");


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
    botompaddle.draw(ctx);
    ball.draw(ctx);
    borderTop.draw(ctx);
    borderRight.draw(ctx);
    borderLeft.draw(ctx);

    if (boxOverlap(ball, botompaddle) || boxOverlap(ball, borderTop)) {
        ball.velocity.y *= -1;
    }
    if (boxOverlap(ball, borderLeft) || boxOverlap(ball, borderRight)) {
        ball.velocity.x *= -1;
    }

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}