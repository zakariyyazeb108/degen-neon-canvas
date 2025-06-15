
import MagneticButton from "./MagneticButton";
import FloatingElements from "./FloatingElements";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden hero-gradient">
      <FloatingElements />
      
      {/* Geometric background */}
      <div className="geometric-bg"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Main heading with Apple-style reveal */}
          <div className="scroll-animate scale-up">
            <h1 className="text-6xl md:text-8xl font-light leading-none mb-6 text-balance">
              <span className="block text-white/90">Creative</span>
              <span className="block gradient-text font-medium">Designer</span>
            </h1>
          </div>
          
          {/* Subtitle with elegant spacing */}
          <div className="scroll-animate fade-up space-y-4">
            <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl mx-auto leading-relaxed">
              Crafting digital experiences through minimalist design
            </p>
            <p className="text-lg md:text-xl text-white/40 font-light max-w-2xl mx-auto">
              Banners • PNL • UI/UX • Brand Identity
            </p>
          </div>
          
          {/* CTA with premium styling */}
          <div className="pt-12 scroll-animate scale-up">
            <MagneticButton className="premium-button text-white px-12 py-4 text-lg font-medium rounded-full">
              Let's Create Together
            </MagneticButton>
          </div>
        </div>
      </div>
      
      {/* Advanced scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="scroll-indicator"></div>
      </div>
    </section>
  );
};

export default Hero;
