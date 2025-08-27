const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const livesDiv = document.getElementById("lives");
const messageDiv = document.getElementById("message");

const player = new Player(canvas.width, canvas.height);
let obstacles = [];
let frameCount = 0;
let level = 1;
let gameOver = false;

function drawLives() {
  livesDiv.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    let life = document.createElement("div");
    life.className = "life" + (i >= player.lives ? " lost" : "");
    livesDiv.appendChild(life);
  }
}

function createObstacle() {
  obstacles.push(new Obstacle(canvas.width));
}

function update() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  frameCount++;
  const obstacleSpeed = 2 + level; // speed increases each level
  const spawnRate = level === 1 ? 60 : level === 2 ? 40 : 25;

  if (frameCount % spawnRate === 0) createObstacle();

  // Update and draw obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    const obs = obstacles[i];
    obs.update(obstacleSpeed);
    obs.draw(ctx);

    // Collision check
    if (!player.invulnerable && obs.collidesWith(player)) {
      let lost = player.loseLife();
      if (lost) drawLives();

      if (player.lives <= 0) {
        messageDiv.innerText = "Game Over!";
        gameOver = true;
      }
    }

    // Remove obstacles off screen
    if (obs.isOffScreen(canvas.height)) obstacles.splice(i, 1);
  }

  player.move(canvas.width);
  player.draw(ctx);

  // Level progression
  if (frameCount === 1500 && level === 1) {
    level = 2;
    messageDiv.innerText = "Level 2!";
    setTimeout(() => {
      messageDiv.innerText = "";
    }, 2000);
  }
  if (frameCount === 3000 && level === 2) {
    level = 3;
    messageDiv.innerText = "Level 3!";
    setTimeout(() => {
      messageDiv.innerText = "";
    }, 2000);
  }

  if (!gameOver) requestAnimationFrame(update);
}

drawLives();
update();
