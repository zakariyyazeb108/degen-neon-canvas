
import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Drastically reduced particle count for better performance
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles.length = 0;
      // Reduced to max 10 particles for much better performance
      const particleCount = Math.min(10, Math.floor((canvas.width * canvas.height) / 50000));
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2, // Much slower movement
          vy: (Math.random() - 0.5) * 0.2,
          alpha: Math.random() * 0.2 + 0.05 // More subtle
        });
      }
    };

    let animationId: number;
    let lastTime = 0;

    const animate = (currentTime: number) => {
      // Limit to 30fps for better performance
      if (currentTime - lastTime < 33) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle with reduced size
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${particle.alpha})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate(0);

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-10 white-mode:opacity-3"
      style={{ zIndex: 1 }}
    />
  );
};

export default ParticleBackground;
