
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Contact from "@/components/Contact";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    // Check screen size after component mounts
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    checkScreenSize();
    
    // Throttled resize listener
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkScreenSize, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      {/* Minimal background effects only on large screens */}
      {isLargeScreen && (
        <div className="fixed inset-0 pointer-events-none opacity-5">
          <div className="absolute top-1/4 left-1/6 w-1 h-1 bg-primary/20 rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-primary/15 rounded-full animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
        </div>
      )}

      <Navigation />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Contact />
      <ScrollToTop />
    </div>
  );
};

export default Index;
