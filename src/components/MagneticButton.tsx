
import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  className = '', 
  onClick,
  size = 'lg'
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = 80;
      
      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        const moveX = x * force * 0.15;
        const moveY = y * force * 0.15;
        
        button.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    };

    const handleMouseLeave = () => {
      button.style.transform = 'translate(0px, 0px)';
      button.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
    };

    const handleMouseEnter = () => {
      button.style.transition = 'transform 0.1s ease-out';
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <Button
      ref={buttonRef}
      size={size}
      onClick={onClick}
      className={`${className}`}
      style={{ willChange: 'transform' }}
    >
      {children}
    </Button>
  );
};

export default MagneticButton;
