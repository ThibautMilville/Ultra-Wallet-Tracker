import { useEffect, useRef } from 'react';

const BackgroundEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuration
    const particles: Particle[] = [];
    const particleCount = 50;
    const mouse = { x: 0, y: 0 };
    let animationFrameId: number;

    // Ajuster la taille du canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Classe Particle
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      private canvas: HTMLCanvasElement;

      constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Rebondir sur les bords
        if (this.x > this.canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > this.canvas.height || this.y < 0) this.speedY *= -1;

        // Interaction avec la souris
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          this.speedX -= Math.cos(angle) * 0.2;
          this.speedY -= Math.sin(angle) * 0.2;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialisation
    const init = () => {
      resizeCanvas();
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas));
      }
    };

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    // Event listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    const handleResize = () => {
      resizeCanvas();
    };

    // Setup
    init();
    animate();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ background: 'linear-gradient(to bottom right, #1a1a1a, #2a2a2a)' }}
    />
  );
};

export default BackgroundEffect; 