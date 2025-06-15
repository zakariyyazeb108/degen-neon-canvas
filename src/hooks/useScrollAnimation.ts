
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

    // First, set initial states for all elements
    const setInitialStates = () => {
      const elements = document.querySelectorAll('.scroll-animate');
      console.log('Setting initial states for elements:', elements.length);
      
      elements.forEach((el) => {
        const element = el as HTMLElement;
        
        // Remove any existing animate-in class
        element.classList.remove('animate-in');
        
        // Force reflow
        element.offsetHeight;
        
        // Set initial styles
        element.style.opacity = '0';
        element.style.transform = getInitialTransform(element);
        element.style.transitionDelay = '';
        
        console.log('Set initial state for element:', element.className);
      });
    };

    // Set initial states immediately
    setInitialStates();

    // Create observer after a small delay to ensure initial states are applied
    setTimeout(() => {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const element = entry.target as HTMLElement;
            
            if (entry.isIntersecting) {
              console.log('Element entering view:', element.className);
              
              // Use requestAnimationFrame to ensure smooth transition
              requestAnimationFrame(() => {
                // Add staggered delay for sibling elements
                const parent = element.parentElement;
                if (parent) {
                  const siblings = Array.from(parent.children).filter(child => 
                    child.classList.contains('scroll-animate')
                  );
                  const index = siblings.indexOf(element);
                  element.style.transitionDelay = `${index * 100}ms`;
                }
                
                // Trigger animation
                element.classList.add('animate-in');
              });

              // If triggerOnce is true, stop observing this element
              if (triggerOnce) {
                observerRef.current?.unobserve(element);
              }
            } else if (!triggerOnce) {
              element.classList.remove('animate-in');
              element.style.transitionDelay = '';
              element.style.opacity = '0';
              element.style.transform = getInitialTransform(element);
            }
          });
        },
        {
          threshold,
          rootMargin,
        }
      );

      // Start observing elements
      const elements = document.querySelectorAll('.scroll-animate');
      elements.forEach((element) => {
        observerRef.current?.observe(element);
        console.log('Now observing element:', element.className);
      });
    }, 50);

    // Set up a mutation observer to catch dynamically added elements
    const mutationObserver = new MutationObserver(() => {
      setTimeout(() => {
        setInitialStates();
        const elements = document.querySelectorAll('.scroll-animate:not([data-observed])');
        elements.forEach((element) => {
          (element as HTMLElement).setAttribute('data-observed', 'true');
          observerRef.current?.observe(element);
        });
      }, 100);
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
