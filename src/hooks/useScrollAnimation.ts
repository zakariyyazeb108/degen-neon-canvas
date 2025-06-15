
import { useEffect, useRef } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true
  } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          
          if (entry.isIntersecting) {
            // Add animation classes
            element.classList.add('animate-in');
            element.style.animationFillMode = 'both';
            
            // Add staggered delay for sibling elements
            const parent = element.parentElement;
            if (parent) {
              const siblings = Array.from(parent.children).filter(child => 
                child.classList.contains('scroll-animate')
              );
              const index = siblings.indexOf(element);
              element.style.animationDelay = `${index * 0.1}s`;
            }
          } else if (!triggerOnce) {
            element.classList.remove('animate-in');
            element.style.animationDelay = '';
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    // Observe all elements with scroll-animate class
    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return useRef(null);
};
