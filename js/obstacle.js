class Obstacle {
  constructor(canvasWidth) {
    this.size = 25;
    this.x = Math.floor(Math.random() * (canvasWidth - this.size));
    this.y = -this.size;
  }

  update(speed) {
    this.y += speed;
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  isOffScreen(canvasHeight) {
    return this.y > canvasHeight;
  }

  collidesWith(player) {
    return (
      this.x < player.x + player.size &&
      this.x + this.size > player.x &&
      this.y < player.y + player.size &&
      this.y + this.size > player.y
    );
  }
}
