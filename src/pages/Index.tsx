
import { useEffect } from "react";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Contact from "@/components/Contact";
import ScrollToTop from "@/components/ScrollToTop";
import ParticleBackground from "@/components/ParticleBackground";
import CustomCursor from "@/components/CustomCursor";
import { useAdvancedScrollReveal } from "@/hooks/useAdvancedScrollReveal";

const Index = () => {
  useAdvancedScrollReveal();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <ParticleBackground />
      <CustomCursor />
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
