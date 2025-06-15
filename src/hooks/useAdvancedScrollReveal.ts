
import { useEffect } from 'react';

export const useAdvancedScrollReveal = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          
          // Add base animation class
          element.classList.add('animate-in');
          
          // Add staggered delay for elements in the same container
          const siblings = Array.from(element.parentNode?.children || []);
          const elementIndex = siblings.indexOf(element);
          element.style.animationDelay = `${elementIndex * 0.1}s`;
          
          // Add specific animation based on data attribute
          const animationType = element.getAttribute('data-animation');
          if (animationType) {
            element.classList.add(`animate-${animationType}`);
          }
        }
      });
    }, observerOptions);

    // Observe all elements with reveal classes
    const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-scale');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};
