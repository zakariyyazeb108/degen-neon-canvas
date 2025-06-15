
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
            // Add animation classes
            element.classList.add('animate-in');
            
            // Add staggered delay for sibling elements
            const parent = element.parentElement;
            if (parent) {
              const siblings = Array.from(parent.children).filter(child => 
                child.classList.contains('scroll-animate')
              );
              const index = siblings.indexOf(element);
              element.style.animationDelay = `${index * 0.1}s`;
            }

            // If triggerOnce is true, stop observing this element
            if (triggerOnce) {
              observerRef.current?.unobserve(element);
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

    // Function to observe elements
    const observeElements = () => {
      const elements = document.querySelectorAll('.scroll-animate');
      console.log('Found scroll-animate elements:', elements.length);
      elements.forEach((el) => {
        console.log('Observing element:', el.className);
        observerRef.current?.observe(el);
      });
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
