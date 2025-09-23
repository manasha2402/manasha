// modules/constellation.js - Interactive Constellation Background
export default class Constellation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.dots = [];
    this.mouse = { x: null, y: null, radius: 150 };
    this.animationId = null;
  }

  init() {
    this.resizeCanvas();
    this.createDots();
    this.addEventListeners();
    this.animate();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createDots() {
    this.dots = [];
    const numberOfDots = Math.floor((this.canvas.width * this.canvas.height) / 15000);

    for (let i = 0; i < numberOfDots; i++) {
      this.dots.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }
  }

  addEventListeners() {
    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.createDots();
    });

    this.canvas.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    // Touch support for mobile
    this.canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.mouse.x = e.touches[0].clientX;
        this.mouse.y = e.touches[0].clientY;
      }
    });

    this.canvas.addEventListener('touchend', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  drawDot(dot) {
    this.ctx.beginPath();
    this.ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = 'rgba(102, 126, 234, 0.8)';
    this.ctx.fill();
  }

  drawLine(dot1, dot2, distance, maxDistance) {
    const opacity = 1 - distance / maxDistance;
    this.ctx.beginPath();
    this.ctx.moveTo(dot1.x, dot1.y);
    this.ctx.lineTo(dot2.x, dot2.y);
    this.ctx.strokeStyle = `rgba(102, 126, 234, ${opacity * 0.4})`;
    this.ctx.lineWidth = 0.5;
    this.ctx.stroke();
  }

  calculateDistance(dot1, dot2) {
    const dx = dot1.x - dot2.x;
    const dy = dot1.y - dot2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  updateDots() {
    for (const dot of this.dots) {
      // Move dots
      dot.x += dot.vx;
      dot.y += dot.vy;

      // Bounce off walls
      if (dot.x < 0 || dot.x > this.canvas.width) {
        dot.vx = -dot.vx;
      }
      if (dot.y < 0 || dot.y > this.canvas.height) {
        dot.vy = -dot.vy;
      }

      // Keep dots within bounds
      dot.x = Math.max(0, Math.min(this.canvas.width, dot.x));
      dot.y = Math.max(0, Math.min(this.canvas.height, dot.y));
    }
  }

  connectDots() {
    const maxDistance = 100;

    for (let i = 0; i < this.dots.length; i++) {
      for (let j = i + 1; j < this.dots.length; j++) {
        const distance = this.calculateDistance(this.dots[i], this.dots[j]);
        if (distance < maxDistance) {
          this.drawLine(this.dots[i], this.dots[j], distance, maxDistance);
        }
      }

      // Connect to mouse
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const mouseDistance = this.calculateDistance(this.dots[i], this.mouse);
        if (mouseDistance < this.mouse.radius) {
          this.drawLine(this.dots[i], this.mouse, mouseDistance, this.mouse.radius);
        }
      }
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.updateDots();
    this.connectDots();

    for (const dot of this.dots) {
      this.drawDot(dot);
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}
