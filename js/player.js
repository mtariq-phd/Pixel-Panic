class Player {
  constructor(canvasWidth, canvasHeight) {
    this.size = 30;
    this.speed = 30;
    this.x = (canvasWidth - this.size) / 2;
    this.y = canvasHeight - this.size - 20;
    this.invulnerable = false;
    this.lives = 5;
  }

  move(canvasWidth) {
    if (Input.left && this.x > 0) {
      this.x -= this.speed;
      if (this.x < 0) this.x = 0;
    }
    if (Input.right && this.x < canvasWidth - this.size) {
      this.x += this.speed;
      if (this.x > canvasWidth - this.size) this.x = canvasWidth - this.size;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.invulnerable ? "rgba(0, 255, 0, 0.5)" : "cyan";
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

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
