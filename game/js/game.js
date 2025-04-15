const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;
let scrollSpeed = -3;

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
        this.x += scrollSpeed; // Move left with scroll speed

        // Check for ground collision
        if (this.y + this.height >= canvas.height) {
            this.y = canvas.height - this.height;
            this.dy = 0;
            this.grounded = true;
        } else {
            this.grounded = false;
        }

        //handle player go past the left side of the screen
        if (this.x + this.width < 0) {
            gameOver(); // Call game over function if player goes off screen
        }

        // Handle jump
        if ((keys["ArrowUp"] || keys["w"]) && this.grounded) {
            this.dy = this.jumpStrength;
            this.grounded = false;
        }

        // Handle left and right movement
        if (keys["ArrowLeft"] || keys["a"]) {
            this.dx = -8;
        } else if (keys["ArrowRight"] || keys["d"]) {
            this.dx = 8;
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
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.gold = Math.floor(Math.random() * 21) + 10; // Random gold between 10 and 30
    }

    update() {
        this.x += scrollSpeed; // Move obstacle to the left
    }

    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Coin {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.gold = Math.floor(Math.random() * 11) + 5; // Random gold between 5 and 15
    }

    update() {
        this.x += scrollSpeed; // Move coin to the left
    }

    draw() {
        ctx.fillStyle = "gold";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const player = new Player(canvas.width / 2, canvas.height - 30, 30, 30);
const coins = []; // Array to store coins
const obstacles = [];
let keys = {};
let score = 0;
let money = 0; // Total money earned
let isPaused = false;
let isEscapePressed = false; // Track if Escape is currently pressed
let isGameOver = false; // Track if the game is over
let isSwordSwinging = false; // Track if the sword is being swung

window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
    if (e.key === " " || e.key === "Spacebar") {
        swordAttack(); // only trigger once per keypress
    }
});

window.addEventListener("keyup", (e) => (keys[e.key] = false));

// Handle sword attack
function swordAttack() {
    isSwordSwinging = true;
    setTimeout(() => (isSwordSwinging = false), 200); // Sword swing lasts 200ms
}

// Check if sword hits an obstacle
function checkSwordCollision(player, obstacle) {
    const swordRange = 50;
    const swordX = player.x + player.width;
    const swordY = player.y;
    const swordWidth = swordRange;
    const swordHeight = player.height;

    return (
        isSwordSwinging &&
        swordX < obstacle.x + obstacle.width &&
        swordX + swordWidth > obstacle.x &&
        swordY < obstacle.y + obstacle.height &&
        swordY + swordHeight > obstacle.y
    );
}


// Spawn obstacles every 2 seconds
setInterval(() => {
    if (!isPaused) {
        const height = Math.random() * 50 + 20; // Random height
        const y = canvas.height - height; // Position at the bottom
        const width = Math.random() * 30 + 20; // Random width
        obstacles.push(new Obstacle(canvas.width, y, width, height));
    }
}, 2000);

// Spawn coins every 3 seconds
setInterval(() => {
    if (!isPaused) {
        const size = Math.random() * 10 + 5; // Random size
        const x = canvas.width;
        const y = canvas.height - Math.random() * 100 - size; // Spawn coins near the ground
        coins.push(new Coin(x, y, size));
    }
}, 3000); 

const scoreDisplay = document.getElementById("scoreDisplay");
const moneyDisplay = document.getElementById("moneyDisplay");
const messageDiv = document.getElementById("message");


function updateScore() {
    if (!isPaused) {
        score += 1; // Increment score over time
        scoreDisplay.innerText = `Score: ${score}`;
    }
}

function updateMoneyDisplay() {
    moneyDisplay.innerText = `Gold: ${money}`;
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
    obstacles.forEach((obstacle, index) => {
        if (checkCollision(player, obstacle)) {
            gameOver();
        } else if (checkSwordCollision(player, obstacle)) {
            money += obstacle.gold; // Add obstacle's gold to total money
            obstacles.splice(index, 1); // Destroy obstacle with sword
        }
    });
}

function handleCoinCollection() {
    coins.forEach((coin, index) => {
        if (
            player.x < coin.x + coin.size &&
            player.x + player.width > coin.x - coin.size &&
            player.y < coin.y + coin.size &&
            player.y + player.height > coin.y - coin.size
        ) {
            money += coin.gold; // Add coin's gold to total money
            coins.splice(index, 1); // Remove the coin
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
    money += score / 10;
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

function updateCoins() {
    for (let i = coins.length - 1; i >= 0; i--) {
        coins[i].update();

        // Remove coins that go off-screen
        if (coins[i].x + coins[i].size < 0) {
            coins.splice(i, 1);
        }
    }
}

function drawObstacles() {
    obstacles.forEach((obstacle) => obstacle.draw());
}

function drawCoins() {
    coins.forEach((coin) => coin.draw());
}


function drawSwordSwing() {
    if (isSwordSwinging) {
        ctx.fillStyle = "rgba(255, 255, 0, 0.5)"; // Semi-transparent yellow
        ctx.fillRect(player.x + player.width, player.y, 50, player.height); // Sword swing area
    }
}

function update() {
    player.update();
    updateObstacles();
    updateCoins();
    handleCollisions();
    handleCoinCollection(); // Check for coin collection
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();
    drawObstacles();
    drawCoins();
    drawSwordSwing(); // Draw sword swing if active
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
        updateMoneyDisplay(); // Update money display
    }
}

// Start the game loop using setInterval
setInterval(gameLoop, gameLoopInterval);


