// === Canvas Setup ===
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

// === Game State ===
let scrollOffset = 0;
let worldSpeed = 3;
let keys = {};
let score = 0;
let money = 0;
let isPaused = false;
let isGameOver = false;
let isEscapePressed = false;
let isSwordSwinging = false;
let canSwing = true;
let difficultyTimer = 0;

// === Classes ===
class Entity {
    constructor(x, y, width, height, hp) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.hp = hp;
        this.maxHp = hp;
    }

    drawHealthBar() {
        const barWidth = this.width;
        const barHeight = 5;
        const healthPercent = this.hp / this.maxHp;
        ctx.fillStyle = "red";
        ctx.fillRect(this.x - scrollOffset, this.y - 10, barWidth, barHeight);
        ctx.fillStyle = "lime";
        ctx.fillRect(this.x - scrollOffset, this.y - 10, barWidth * healthPercent, barHeight);
    }
    
    draw() {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x - scrollOffset, this.y, this.width, this.height);
        this.drawHealthBar();
    }
}
//music and skin
const selectedSkin = localStorage.getItem("selectedSkin") || "default";
const swordImg = new Image();
swordImg.src = `images/img/attack_${selectedSkin}.png`;
const skinMusicMap = {
    default: "main.mp3",
    golden: "main.mp3",
    exGolden: "main.mp3",
    what: "about.mp3",
    big: "big.mp3"
};
const musicFile = skinMusicMap[selectedSkin];
let bgm = null;
if (musicFile) {
    bgm = new Audio(`music/${musicFile}`);
    bgm.loop = true;
    bgm.volume = 0.5;
    bgm.play().catch(e => {
        console.warn("Music autoplay was blocked by browser:", e);
    });
}
const baseScrollSpeed = 3;

let frameIndex = 0;
let frameTimer = 0;
const frameSpeed = 10;
class Player extends Entity {
    constructor(x, y, width, height) {
        super(x, y, width, height, 5);
        this.dy = 0;
        this.dx = 0;
        this.gravity = 0.5;
        this.jumpStrength = -10;
        this.grounded = false;
        this.deadImage = new Image();
        this.deadImage.src = `images/skins/dead.png`;
        const speedUpgrade = localStorage.getItem("upgrade_speed") === "1";
        this.speed = speedUpgrade ? 9 : 5;
        const skinType = localStorage.getItem("selectedSkin") || "default";
        this.frames = [];

        this.extraJumpUsed = false; // Double jump for exGolden skin
        this.allowDoubleJump = (localStorage.getItem("selectedSkin") === "exGolden");
        
        for (let i = 1; i <= 3; i++) {
            const img = new Image();
            img.src = `images/skins/${skinType}_${i}.png`;
            this.frames.push(img);
        }
        this.frameIndex = 0;
        this.frameTimer = 0;
    }

    update() {
        
        // Check if player is dead
        this.isDead = false;
        if (this.hp <= 0) {
            this.isDead = true;
            gameOver();
        }
        // 
        if (!this.grounded) this.dy += this.gravity;

        this.y += this.dy;
        this.x += this.dx;
        this.x += baseScrollSpeed;
        if (this.x > scrollOffset + 150*3) {
            this.x = scrollOffset + 150*3;
        }
        
        if (this.y + this.height >= canvas.height - 10) {
            this.y = canvas.height - 10 - this.height;
            this.dy = 0;
            this.grounded = true;
        } else {
            this.grounded = false;
        }
        //double jump
        if ((keys["ArrowUp"] || keys["w"]) && !this.jumpPressed) {
            if (this.grounded) {
                this.dy = this.jumpStrength;
                this.grounded = false;
                this.extraJumpUsed = false; // double jump reset
            } else if (this.allowDoubleJump && !this.extraJumpUsed) {
                this.dy = this.jumpStrength;
                this.extraJumpUsed = true;
            }
            this.jumpPressed = true;
        }
        if (!(keys["ArrowUp"] || keys["w"])) {
            this.jumpPressed = false;
        }

        if (keys["ArrowLeft"] || keys["a"] && this.x > 0) {
            this.dx = -this.speed;
            if (this.x < scrollOffset + 100 && scrollOffset > 0) {
                scrollOffset += this.dx;
                this.dx = 0;
            }
        } else if (keys["ArrowRight"] || keys["d"]) {
            this.dx = this.speed;
            if (this.x > scrollOffset + canvas.width - 400) {
                scrollOffset += this.dx;
                this.dx = 0;
            }
        } else {
            this.dx = 0;
        }

        if (this.hp <= 0) gameOver();
    }

    draw() {
        if (this.isDead) {
            ctx.drawImage(this.deadImage, this.x - scrollOffset, this.y, this.width, this.height);
        } else {
            ctx.drawImage(this.frames[this.frameIndex], this.x - scrollOffset, this.y, this.width, this.height);
    
            this.frameTimer++;
            if (this.frameTimer >= frameSpeed) {
                this.frameIndex = (this.frameIndex + 1) % this.frames.length;
                this.frameTimer = 0;
            }
        }
        this.drawHealthBar();
    }
}

class Obstacle extends Entity {
    constructor(x, y, width, height, hp = 2) {
        super(x, y, width, height, hp);
        this.gold = Math.floor(Math.random() * 21) + 10;
    }

    update() {
        if (this.hp <= 0) {
            money += this.gold;
            return false;
        }
        return true;
    }

    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x - scrollOffset, this.y, this.width, this.height);
        this.drawHealthBar();
    }
}

class Coin {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.gold = Math.floor(Math.random() * 11) + 5;
    }

    update() {
        return (this.x - scrollOffset + this.size > 0);
    }

    draw() {
        ctx.fillStyle = "gold";
        ctx.beginPath();
        ctx.arc(this.x - scrollOffset, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Boss extends Entity {
    constructor(x, y) {
        const scale = 1 + score / 10000;
        super(x, y, 60, 80, Math.floor(10 * scale));
        this.gold = 100;
        this.attackCooldown = 0;
    }

    update() {
        this.attackCooldown++;
        if (this.attackCooldown >= 60) {
            this.attackCooldown = 0;
            if (checkCollision(this, player)) {
                player.hp--;
            }
        }

        if (this.hp <= 0) {
            money += this.gold;
            return false;
        }
        return true;
    }

    draw() {
        ctx.fillStyle = "purple";
        ctx.fillRect(this.x - scrollOffset, this.y, this.width, this.height);
        this.drawHealthBar();
    }
}
// === Game Entities ===
const player = new Player(100, canvas.height - 40, 30, 30);
const obstacles = [];
const coins = [];
const bosses = [];

// === DOM Elements ===
const scoreDisplay = document.getElementById("scoreDisplay");
const moneyDisplay = document.getElementById("moneyDisplay");
const messageDiv = document.getElementById("message");

// === Input Events ===
window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
    if ((e.key === " " || e.key === "Spacebar") && canSwing) swordAttack();
});
window.addEventListener("keyup", (e) => (keys[e.key] = false));

// === Sword Mechanics ===

function swordAttack() {
    if (!canSwing) return;
    isSwordSwinging = true;
    canSwing = false;
    setTimeout(() => (isSwordSwinging = false), 200);
    setTimeout(() => (canSwing = true), 500);
}

function checkSwordCollision(entity) {
    const swordRange = 50;
    const swordX = player.x + player.width;
    const swordY = player.y;
    const swordWidth = swordRange;
    const swordHeight = player.height;

    return (
        isSwordSwinging &&
        swordX < entity.x + entity.width &&
        swordX + swordWidth > entity.x &&
        swordY < entity.y + entity.height &&
        swordY + swordHeight > entity.y
    );
}

// === Game Logic ===
function update() {
    difficultyTimer++;
    if (difficultyTimer % 600 === 0) worldSpeed++;
    if (score > 0 && score % 10000 === 0 && bosses.length === 0) {
        bosses.push(new Boss(player.x + 400, canvas.height - 80));
    }
    scrollOffset += baseScrollSpeed;
    player.update();

    for (let i = obstacles.length - 1; i >= 0; i--) {
        if (!obstacles[i].update()) obstacles.splice(i, 1);
        else if (checkSwordCollision(obstacles[i])) obstacles[i].hp--;
        else if (checkCollision(player, obstacles[i])) {
            const hasShield = localStorage.getItem("upgrade_shield") === "1";
            const damage = hasShield ? 0.5 : 1;
            player.hp -= damage;
        }
    }

    for (let i = coins.length - 1; i >= 0; i--) {
        if (
            player.x < coins[i].x + coins[i].size &&
            player.x + player.width > coins[i].x - coins[i].size &&
            player.y < coins[i].y + coins[i].size &&
            player.y + player.height > coins[i].y - coins[i].size
        ) {
            money += coins[i].gold;
            coins.splice(i, 1);
        }
    }

    for (let i = bosses.length - 1; i >= 0; i--) {
        if (!bosses[i].update()) bosses.splice(i, 1);
        else if (checkSwordCollision(bosses[i])) bosses[i].hp--;
    }

    score++;
}

function drawBackground() {
    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#228B22";
    ctx.fillRect(0, canvas.height - 10, canvas.width, 10);

    // Add clouds or objects to show scrolling
    ctx.fillStyle = "white";
    for (let i = 0; i < 5; i++) {
        const cloudX = (i * 300 - (scrollOffset % 1500)) % 1500;
        ctx.beginPath();
        ctx.arc(cloudX, 50, 20, 0, Math.PI * 2);
        ctx.fill();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    player.draw();
    for (const o of obstacles) o.draw();
    for (const c of coins) c.draw();
    for (const b of bosses) b.draw();
    if (isSwordSwinging) {
        const swordX = player.x + player.width - scrollOffset;
        const swordY = player.y;
        const swordWidth = 50;
        const swordHeight = player.height;
        
        ctx.drawImage(swordImg, swordX, swordY, swordWidth, swordHeight);
    }
    drawShadow();
}

function drawShadow() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.beginPath();
    ctx.ellipse(player.x - scrollOffset + player.width / 2, canvas.height - 5, player.width / 2, 5, 0, 0, Math.PI * 2);
    ctx.fill();
}

function checkCollision(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

function gameOver() {
    isPaused = true;
    isGameOver = true;
    messageDiv.innerText = `Game Over! Your score: ${score}`;
    messageDiv.style.color = "red";
    messageDiv.style.fontSize = "30px";
    keys = {};
    if (bgm && !bgm.paused) {
        bgm.pause();
        bgm.currentTime = 0;
    }
}

function gameLoop() {
    console.log("x: " + player.x);
    console.log("so: " + scrollOffset);
    if (!isGameOver) {
        if (keys["Escape"] && !isEscapePressed) {
            isPaused = !isPaused;
            messageDiv.innerText = isPaused ? "Game Paused" : "";
            isEscapePressed = true;
        } else if (!keys["Escape"]) isEscapePressed = false;

        if (!isPaused) {
            update();
            draw();
            scoreDisplay.innerText = `Score: ${score}`;
            moneyDisplay.innerText = `Gold: ${money}`;
        }
    }
}

setInterval(() => {
    if (!isPaused) {
        const height = Math.random() * 50 + 20;
        const width = Math.random() * 30 + 20;
        const y = canvas.height - height - 10;
        const x = player.x + canvas.width + Math.random() * 200;
        obstacles.push(new Obstacle(x, y, width, height));
    }
}, 2000);

setInterval(() => {
    if (!isPaused) {
        const size = Math.random() * 10 + 5;
        const x = player.x + canvas.width + Math.random() * 300;
        const y = canvas.height - Math.random() * 100 - size - 10;
        coins.push(new Coin(x, y, size));
    }
}, 3000);

setInterval(gameLoop, 16);
