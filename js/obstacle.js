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
    ctx.fillStyle = "magenta";
    // Enable image smoothing off for pixelated effect
    ctx.imageSmoothingEnabled = false;

    // Draw pixelated circle using filled rectangles
    const scale = 3; // size of each pixel block
    for(let px = 0; px < this.size; px += scale) {
      for(let py = 0; py < this.size; py += scale) {
        // circle equation check
        const dx = px + scale/2 - this.size/2;
        const dy = py + scale/2 - this.size/2;
        if(dx*dx + dy*dy <= (this.size/2)*(this.size/2)) {
          ctx.fillRect(this.x + px, this.y + py, scale, scale);
        }
      }
    }
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
