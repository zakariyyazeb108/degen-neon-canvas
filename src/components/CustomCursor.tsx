
import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add trail
      setTrails(prev => {
        const newTrail = { x: e.clientX, y: e.clientY, id: trailId++ };
        const updated = [...prev, newTrail].slice(-5); // Keep only last 5 trails
        return updated;
      });
    };

    const removeTrail = () => {
      setTrails(prev => prev.slice(1));
    };

    document.addEventListener('mousemove', handleMouseMove);
    const interval = setInterval(removeTrail, 100);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div
        className="cursor"
        style={{
          left: position.x - 10,
          top: position.y - 10,
        }}
      />
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: trail.x - 4,
            top: trail.y - 4,
            opacity: (index + 1) / trails.length * 0.5,
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
