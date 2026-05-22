// Tasteful Tron Grid Background
// Professional, Subtle, and Performance-Optimized

class TronGrid {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.resize();

        // Grid configuration - Tasteful colors (Gold & Blue)
        this.gridSize = 40;
        this.horizonY = this.canvas.height * 0.4;
        this.perspective = 300;
        this.speed = 0.5;
        this.offset = 0;

        // Tasteful color palette
        this.primaryColor = 'rgba(212, 175, 55, 0.15)'; // Gold - subtle
        this.accentColor = 'rgba(96, 165, 250, 0.1)'; // Blue - very subtle
        this.highlightColor = 'rgba(212, 175, 55, 0.3)'; // Gold highlight

        // Performance optimization
        this.lastFrameTime = 0;
        this.frameDelay = 1000 / 30; // 30 FPS for smoother performance

        this.init();
    }

    init() {
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.horizonY = this.canvas.height * 0.4;
    }

    drawGrid() {
        this.ctx.save();

        // Clear canvas
        this.ctx.fillStyle = 'rgba(10, 22, 40, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Set up gradient for depth effect
        const gradient = this.ctx.createLinearGradient(0, this.horizonY, 0, this.canvas.height);
        gradient.addColorStop(0, this.accentColor);
        gradient.addColorStop(0.5, this.primaryColor);
        gradient.addColorStop(1, this.highlightColor);

        // Draw horizontal lines (moving towards horizon)
        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = 1;

        for (let y = 0; y < 20; y++) {
            const yPos = this.horizonY + (y * this.gridSize) + (this.offset % this.gridSize);
            const scale = 1 - (yPos - this.horizonY) / (this.canvas.height - this.horizonY);

            if (scale <= 0) continue;

            this.ctx.beginPath();

            const lineWidth = this.canvas.width * (0.6 + scale * 0.4);
            const xStart = (this.canvas.width - lineWidth) / 2;
            const xEnd = xStart + lineWidth;

            this.ctx.moveTo(xStart, yPos);
            this.ctx.lineTo(xEnd, yPos);

            // Highlight some lines with gold
            if (y % 3 === 0) {
                this.ctx.strokeStyle = this.highlightColor;
            } else {
                this.ctx.strokeStyle = gradient;
            }

            this.ctx.stroke();
        }

        // Draw vertical lines (perspective)
        this.ctx.strokeStyle = this.primaryColor;

        for (let x = -10; x <= 10; x++) {
            if (x === 0) {
                this.ctx.strokeStyle = this.highlightColor;
                this.ctx.lineWidth = 2;
            } else {
                this.ctx.strokeStyle = this.primaryColor;
                this.ctx.lineWidth = 1;
            }

            const xOffset = x * this.gridSize;
            const topX = this.canvas.width / 2 + xOffset;
            const bottomX = this.canvas.width / 2 + (xOffset * 2);

            this.ctx.beginPath();
            this.ctx.moveTo(topX, this.horizonY);
            this.ctx.lineTo(bottomX, this.canvas.height);
            this.ctx.stroke();
        }

        // Add subtle glow at horizon
        const glowGradient = this.ctx.createRadialGradient(
            this.canvas.width / 2, this.horizonY, 0,
            this.canvas.width / 2, this.horizonY, this.canvas.width / 2
        );
        glowGradient.addColorStop(0, 'rgba(212, 175, 55, 0.1)');
        glowGradient.addColorStop(0.5, 'rgba(96, 165, 250, 0.05)');
        glowGradient.addColorStop(1, 'transparent');

        this.ctx.fillStyle = glowGradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.horizonY * 1.5);

        this.ctx.restore();
    }

    animate(currentTime = 0) {
        // Throttle to target FPS for better performance
        const deltaTime = currentTime - this.lastFrameTime;

        if (deltaTime >= this.frameDelay) {
            this.offset += this.speed;
            this.drawGrid();
            this.lastFrameTime = currentTime;
        }

        requestAnimationFrame((time) => this.animate(time));
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('tronCanvas');
    if (canvas) {
        new TronGrid(canvas);
    }
});

// Add subtle parallax effect on mouse move
document.addEventListener('mousemove', (e) => {
    const canvas = document.getElementById('tronCanvas');
    if (!canvas) return;

    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    canvas.style.transform = `translate(${moveX}px, ${moveY}px)`;
});
