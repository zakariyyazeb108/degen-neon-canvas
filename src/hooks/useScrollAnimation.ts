
import { useEffect, useRef } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -100px 0px',
    triggerOnce = true
  } = options;

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          
          if (entry.isIntersecting) {
            // Force a reflow to ensure the initial state is applied
            element.offsetHeight;
            
            // Use requestAnimationFrame to ensure smooth transition
            requestAnimationFrame(() => {
              element.classList.add('animate-in');
              
              // Add staggered delay for sibling elements
              const parent = element.parentElement;
              if (parent) {
                const siblings = Array.from(parent.children).filter(child => 
                  child.classList.contains('scroll-animate')
                );
                const index = siblings.indexOf(element);
                element.style.transitionDelay = `${index * 100}ms`;
              }
            });

            // If triggerOnce is true, stop observing this element
            if (triggerOnce) {
              observerRef.current?.unobserve(element);
            }
          } else if (!triggerOnce) {
            element.classList.remove('animate-in');
            element.style.transitionDelay = '';
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    // Function to observe elements
    const observeElements = () => {
      const elements = document.querySelectorAll('.scroll-animate');
      console.log('Found scroll-animate elements:', elements.length);
      
      elements.forEach((el) => {
        const element = el as HTMLElement;
        console.log('Observing element:', element.className);
        
        // Ensure initial state is set
        if (!element.classList.contains('animate-in')) {
          element.style.opacity = '0';
          element.style.transform = getInitialTransform(element);
        }
        
        observerRef.current?.observe(element);
      });
    };

    // Get initial transform based on animation class
    const getInitialTransform = (element: HTMLElement) => {
      if (element.classList.contains('fade-up')) {
        return 'translateY(60px)';
      } else if (element.classList.contains('fade-down')) {
        return 'translateY(-40px)';
      } else if (element.classList.contains('fade-left')) {
        return 'translateX(-50px)';
      } else if (element.classList.contains('fade-right')) {
        return 'translateX(50px)';
      } else if (element.classList.contains('scale-up')) {
        return 'scale(0.8) translateY(30px)';
      } else if (element.classList.contains('rotate-in')) {
        return 'rotate(-5deg) translateY(40px) scale(0.9)';
      } else {
        return 'translateY(40px)';
      }
    };

    // Initial observation
    observeElements();

    // Set up a mutation observer to catch dynamically added elements
    const mutationObserver = new MutationObserver(() => {
      // Small delay to ensure DOM is updated
      setTimeout(observeElements, 100);
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observerRef.current?.disconnect();
      mutationObserver.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return observerRef;
};
