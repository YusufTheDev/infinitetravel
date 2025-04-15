const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

class Player {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dy = 0; // Vertical velocity
        this.dx = 0; // Horizontal velocity
        this.gravity = 0.5; // Gravity effect
        this.jumpStrength = -10; // Jump velocity
        this.grounded = false; // Is the player on the ground?
    }

    update() {
        // Apply gravity
        if (!this.grounded) {
            this.dy += this.gravity;
        }

        // Update position
        this.y += this.dy;
        this.x += this.dx;

        // Check for ground collision
        if (this.y + this.height >= canvas.height) {
            this.y = canvas.height - this.height;
            this.dy = 0;
            this.grounded = true;
        } else {
            this.grounded = false;
        }

        // Handle jump
        if ((keys["ArrowUp"] || keys["w"]) && this.grounded) {
            this.dy = this.jumpStrength;
            this.grounded = false;
        }

        // Handle left and right movement
        if (keys["ArrowLeft"] || keys["a"]) {
            this.dx = -5;
        } else if (keys["ArrowRight"] || keys["d"]) {
            this.dx = 5;
        } else {
            this.dx = 0;
        }
    }

    draw() {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Obstacle {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }

    update() {
        this.x -= this.speed; // Move obstacle to the left
    }

    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

const player = new Player(canvas.width / 2, canvas.height - 30, 30, 30);
const obstacles = [];
let keys = {};
let score = 0;
let isPaused = false;
let isEscapePressed = false; // Track if Escape is currently pressed
let isGameOver = false; // Track if the game is over

window.addEventListener("keydown", (e) => (keys[e.key] = true));
window.addEventListener("keyup", (e) => (keys[e.key] = false));

// Spawn obstacles every 2 seconds
setInterval(() => {
    if (!isPaused) {
        const height = Math.random() * 50 + 20; // Random height
        const y = canvas.height - height; // Position at the bottom
        const width = Math.random() * 30 + 20; // Random width
        const speed = Math.random() * 2 + 3; // Random speed
        obstacles.push(new Obstacle(canvas.width, y, width, height, speed));
    }
}, 2000);

const scoreDisplay = document.getElementById("scoreDisplay");
const messageDiv = document.getElementById("message");

function updateScore() {
    if (!isPaused) {
        score += 1; // Increment score over time
        scoreDisplay.innerText = `Score: ${score}`;
    }
}

function checkCollision(player, obstacle) {
    return (
        player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y
    );
}

function handleCollisions() {
    obstacles.forEach((obstacle) => {
        if (checkCollision(player, obstacle)) {
            gameOver();
        }
    });
}

function gameOver() {
    isPaused = true; // Pause the game
    isGameOver = true; // Mark the game as over
    messageDiv.innerText = `Game Over! Your score: ${score}`;
    messageDiv.style.color = "red"; // Change text color to red
    messageDiv.style.fontSize = "30px"; // Increase font size
    keys = {}; // Reset keys to prevent further movement
    // Remove key event listener
    window.removeEventListener("keydown", (e) => (keys[e.key] = true));
}

function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].update();

        // Remove obstacles that go off-screen
        if (obstacles[i].x + obstacles[i].width < 0) {
            obstacles.splice(i, 1);
        }
    }
}

function drawObstacles() {
    obstacles.forEach((obstacle) => obstacle.draw());
}

function update() {
    player.update();
    updateObstacles();
    handleCollisions();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();
    drawObstacles();
}

// Set the game loop interval (e.g., 60 FPS = 1000ms / 60 ≈ 16ms)
const gameLoopInterval = 16; // Approximately 60 FPS

function gameLoop() {
    // Disable pause/unpause logic if the game is over
    if (!isGameOver) {
        if (keys["Escape"] && !isEscapePressed) {
            isPaused = !isPaused; // Toggle pause state
            messageDiv.innerText = isPaused ? "Game Paused" : ""; // Show/hide pause message
            isEscapePressed = true; // Mark Escape as pressed
        } else if (!keys["Escape"]) {
            isEscapePressed = false; // Reset when Escape is released
        }
    }

    // Continue the game loop if not paused and the game is not over
    if (!isPaused && !isGameOver) {
        update();
        draw();
        updateScore();
    }
}

// Start the game loop using setInterval
setInterval(gameLoop, gameLoopInterval);

// Add a score display to the canvas
const scoreDisplayElement = document.createElement("div");
scoreDisplayElement.id = "scoreDisplay";
scoreDisplayElement.style.position = "absolute";
scoreDisplayElement.style.top = "10px";
scoreDisplayElement.style.left = "10px";
scoreDisplayElement.style.color = "white";
scoreDisplayElement.style.fontSize = "20px";
document.body.appendChild(scoreDisplayElement);
