// Get DOM elements
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const livesDiv = document.getElementById("lives");
const messageDiv = document.getElementById("message");
const levelDisplay = document.getElementById("levelDisplay");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const exitBtn = document.getElementById("exitBtn");
const continueBtn = document.getElementById("continueBtn");

// Game state flags
let isRunning = false;
let isPaused = false;
let showingTransition = false;

let player = null;
let obstacles = [];
let frameCount = 0;
let level = 1;
let gameOver = false;

// ----------- Helper Functions --------------

// Render lives UI, fading out lost lives
function drawLives() {
  livesDiv.innerHTML = "";
  // Draw up to 5 hearts, faded if lost
  for (let i = 0; i < 5; i++) {
    let life = document.createElement("div");
    life.className = "life" + (i >= player.lives ? " lost" : "");
    livesDiv.appendChild(life);
  }
}

// Update displayed level each frame or on change
function updateLevelDisplay(level) {
  levelDisplay.textContent = `Level: ${level}`;
}

// Spawn a new obstacle at a random position
function createObstacle() {
  obstacles.push(new Obstacle(canvas.width));
}

// MAIN GAME LOOP
function update() {
  // Exit loop if game is not running or is paused/transitioning
  if (!isRunning || isPaused || showingTransition) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  frameCount++;

  // Obstacle speed and spawn rate adjust with level
  const obstacleSpeed = 1.5 + level; // speed increases each level
  const spawnRate = level === 1 ? 35 : level === 2 ? 25 : 15;//rate of obstacle spawning

  if (frameCount % spawnRate === 0) createObstacle();

  // Update and render obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    const obs = obstacles[i];
    obs.update(obstacleSpeed);
    obs.draw(ctx);

    // Collision check -> if player collides,lose a life
    if (!player.invulnerable && obs.collidesWith(player)) {
      let lost = player.loseLife();
      if (lost) drawLives();

      // End game if out of lives
      if (player.lives <= 0) {
        messageDiv.innerText = "Game Over! Try again.";
        messageDiv.style.color = "red";   // Give the message a noticeable red color
        isRunning = false; // Stop game loop
        gameOver = true;
      }
    }

    // Remove obstacles off screen
    if (obs.isOffScreen(canvas.height)) obstacles.splice(i, 1);
  }

  // Move and render player
  player.move(canvas.width);
  player.draw(ctx);
  
    // -------- Level transitions: pause, show message, wait for Continue --------

  // Level progression
  if (frameCount === 1500 && level === 1) {
    transitionToLevel(2);
  }
  if (frameCount === 3000 && level === 2) {
    transitionToLevel(3);
  }
  if (frameCount > 4500 && level === 3) {
  gameWon();
  }

  if (isRunning) requestAnimationFrame(update);
}

// Pause, show new level message and display Continue button
function transitionToLevel(nextLevel) {
  showingTransition = true;
  level = nextLevel;
  isPaused = true;
  messageDiv.innerText = `Level ${level}!`;
  continueBtn.style.display = "inline";
  level = nextLevel;
  updateLevelDisplay(level);
}

// Reset game state and UI elements
function startGame() {
  // Set all flags for new game
  isRunning = true;
  isPaused = false;
  showingTransition = false;
  obstacles = [];
  frameCount = 0;
  level = 1;
  gameOver = false;
  player = new Player(canvas.width, canvas.height);
  drawLives();
  messageDiv.innerText = "";
  messageDiv.style.color = "white"; // reset to normal color for gameplay messages
  continueBtn.style.display = "none";
  updateLevelDisplay(level);
  update();
}

// Pause game by toggling isPaused flag
function pauseGame() {
  isPaused = true;
  messageDiv.innerText = "Paused";
}

// Resume game from pause
function continueGame() {
  isPaused = false;
  showingTransition = false;
  messageDiv.innerText = "";
  continueBtn.style.display = "none";
  update();
}

function gameWon() {
  messageDiv.innerText = "You WON! 🎉";
  isRunning = false;
  showConfetti();
}

// Exit: Stop loop, reset UI
//function exitGame() {
 // isRunning = false;
  //isPaused = false;
  //messageDiv.innerText = "Exited. Click Start to play again.";
  //continueBtn.style.display = "none";
//}

function exitGame() {
  isRunning = false;
  isPaused = false;
  gameOver = false;
  showingTransition = false;

  obstacles = [];               // remove all obstacles

  if (player) {
    // Reset player position to center start
    player.x = (canvas.width - player.width) / 2;
    player.y = canvas.height - player.height - 20;
  }

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Reset lives display visually to full lives
  if (player) player.lives = 5;
  drawLives();

  // Clear message and hide continue button
  messageDiv.innerText = "Exited. Click Start to play again.";
  continueBtn.style.display = "none";

  // Optionally draw player at start position
  if (player) {
    player.draw(ctx);
  }
}


// -------- Button Event Listeners -----------
startBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", pauseGame);
exitBtn.addEventListener("click", exitGame);
continueBtn.addEventListener("click", continueGame);

// -------- Space bar Event Listener to pause/unpause game -----------
document.addEventListener("keydown", (e) => {
  if (e.key === " ") { // space bar key
    e.preventDefault(); // prevent page scroll
    if (isRunning) {
      if (isPaused) {
        continueGame(); // function to resume
      } else {
        pauseGame();    // function to pause
      }
    }
  }
});


function showConfetti() {
  // Create multiple small colored divs falling down your game area
  for (let i = 0; i < 100; i++) {
    const confetto = document.createElement("div");
    confetto.style.position = "absolute";
    confetto.style.width = "8px";
    confetto.style.height = "8px";
    confetto.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetto.style.left = Math.random() * window.innerWidth + "px";
    confetto.style.top = Math.random() * -100 + "px"; // start above view
    confetto.style.borderRadius = "50%";
    confetto.style.opacity = Math.random();

    document.body.appendChild(confetto);

    // Animate falling effect
    let y = -100;
    const speed = 1 + Math.random() * 3;
    function fall() {
      y += speed;
      confetto.style.top = y + "px";
      if (y < window.innerHeight) {
        requestAnimationFrame(fall);
      } else {
        confetto.remove();
      }
    }
    fall();
  }
}


// Optionally: start game on load
// startGame();
