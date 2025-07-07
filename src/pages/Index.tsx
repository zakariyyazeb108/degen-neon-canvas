
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Contact from "@/components/Contact";
import ScrollToTop from "@/components/ScrollToTop";
import LightweightParticles from "@/components/LightweightParticles";
import OptimizedCursor from "@/components/OptimizedCursor";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      {/* Always load optimized components - they're lightweight enough */}
      <LightweightParticles />
      <OptimizedCursor />

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
