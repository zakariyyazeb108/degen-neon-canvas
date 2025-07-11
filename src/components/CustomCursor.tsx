
import { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animationId: number;
    
    const updatePosition = (e: MouseEvent) => {
      // Use requestAnimationFrame for smoother updates
      cancelAnimationFrame(animationId);
      animationId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // More aggressive throttling - ~30fps instead of 60fps
    let lastUpdate = 0;
    const throttledUpdate = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastUpdate > 33) { // ~30fps
        updatePosition(e);
        lastUpdate = now;
      }
    };

    document.addEventListener('mousemove', throttledUpdate, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener('mousemove', throttledUpdate);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="cursor-main"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        willChange: 'transform',
      }}
    />
  );
};

export default CustomCursor;
