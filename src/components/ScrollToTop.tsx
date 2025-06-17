
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`fixed bottom-20 right-8 z-40 transition-all duration-300 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
    }`}>
      <Button
        onClick={scrollToTop}
        size="icon"
        className="bg-primary/80 hover:bg-primary text-white rounded-full p-3 shadow-lg backdrop-blur-sm border border-white/10 transition-all duration-300 transform hover:scale-110"
      >
        <ArrowUp className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default ScrollToTop;
