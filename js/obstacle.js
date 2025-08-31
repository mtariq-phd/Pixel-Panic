//obstracle class deasl with the creation, movement and collision of the obstacles
class Obstacle {
  // ...constructor
  constructor(canvasWidth) {
    this.size = 15;//size of obstacles
    this.x = Math.floor(Math.random() * (canvasWidth - this.size));
    this.y = -this.size;
  }

  update(speed) {
    this.y += speed;
  }

  //obstacle creation
  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  isOffScreen(canvasHeight) {
    return this.y > canvasHeight;
  }

  //obstacle movement
  collidesWith(player) {
    return (
      this.x < player.x + player.width &&
      this.x + this.size > player.x &&
      this.y < player.y + player.height &&
      this.y + this.size > player.y
    );
  }
}
