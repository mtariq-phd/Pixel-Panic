class Star {
  constructor(canvasWidth) {
    this.size = 15;
    this.x = Math.floor(Math.random() * (canvasWidth - this.size));
    this.y = -this.size;
  }

  update(speed) {
    this.y += speed;
  }

  draw(ctx) {
    // Draw yellow star using simple 5-point star path for simplicity
    ctx.fillStyle = 'yellow';
    ctx.beginPath();

    const cx = this.x + this.size / 2;
    const cy = this.y + this.size / 2;
    const spikes = 5;
    const outerRadius = this.size / 2;
    const innerRadius = this.size / 4;
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();

    // add pixelated effect
    ctx.imageSmoothingEnabled = false;
  }

  isOffScreen(canvasHeight) {
    return this.y > canvasHeight;
  }

  collidesWith(player) {
    // Simple AABB collision check like obstacles
    return (
      this.x < player.x + player.width &&
      this.x + this.size > player.x &&
      this.y < player.y + player.height &&
      this.y + this.size > player.y
    );
  }
}
