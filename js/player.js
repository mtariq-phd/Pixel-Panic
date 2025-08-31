
// Player class tracks position, lives, movement, and handling collision feedback.
class Player {
  // ...constructor
  constructor(canvasWidth, canvasHeight) {
    this.width = 60;
    this.height = 15;
    this.speed = 10;//speed of the player movment
    this.x = (canvasWidth - this.width) / 2;
    this.y = canvasHeight - this.height - 20;
    this.invulnerable = false;
    this.lives = 5;
  }
  // move(): Moves player horizontally based on input, constraining to canvas bounds.
  move(canvasWidth) {
    if (Input.left && this.x > 0) {
      this.x -= this.speed;
      if (this.x < 0) this.x = 0;
    }
    if (Input.right && this.x < canvasWidth - this.width) {
      this.x += this.speed;
      if (this.x > canvasWidth - this.width) this.x = canvasWidth - this.width;
    }
  }

  // draw(): Renders player, with visual change if invulnerable (hit recently).
  draw(ctx) {
    ctx.fillStyle = this.invulnerable ? "rgba(255, 0, 0, 0.5)" : "cyan";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  // loseLife(): Deducts a life and sets temporary invulnerability.
  loseLife() {
    if (!this.invulnerable && this.lives > 0) {
      this.lives--;
      this.invulnerable = true;
      setTimeout(() => {
        this.invulnerable = false;
      }, 1000);
      return true; // life lost
    }
    return false;
  }
}
