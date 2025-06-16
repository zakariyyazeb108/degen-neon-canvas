
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
          {/* Main heading with enhanced animations */}
          <div className="relative">
            <h1 className="text-6xl md:text-8xl font-light leading-tight mb-6 text-balance">
              <span className="block text-white/90 animate-fade-in-up [animation-delay:0.2s] [animation-fill-mode:forwards] opacity-0 -mb-6">
                Creative
              </span>
              <span className="block gradient-text-animated font-medium relative opacity-100 leading-relaxed">
                <span className="inline-block">
                  Designer
                </span>
              </span>
            </h1>
            
            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-blue-600/5 rounded-full blur-3xl animate-pulse-slow animate-fade-in [animation-delay:1.2s] [animation-fill-mode:forwards] opacity-0"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-blue-500/15 to-blue-300/5 rounded-full blur-2xl animate-float animate-fade-in [animation-delay:1.4s] [animation-fill-mode:forwards] opacity-0"></div>
          </div>
          
          {/* Subtitle with elegant spacing and animations */}
          <div className="space-y-4">
            <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:1.6s] [animation-fill-mode:forwards] opacity-0">
              Crafting digital experiences through minimalist design
            </p>
            <p className="text-lg md:text-xl text-white/40 font-light max-w-2xl mx-auto animate-fade-in-up [animation-delay:1.8s] [animation-fill-mode:forwards] opacity-0">
              Banners • PNL • UI/UX • Brand Identity
            </p>
          </div>
          
          {/* CTA with premium styling and animation */}
          <div className="pt-12 animate-fade-in-up [animation-delay:2s] [animation-fill-mode:forwards] opacity-0">
            <MagneticButton className="premium-button text-white px-12 py-4 text-lg font-medium rounded-full">
              Let's Create Together
            </MagneticButton>
          </div>
        </div>
      </div>
      
      {/* Advanced scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-fade-in [animation-delay:2.2s] [animation-fill-mode:forwards] opacity-0">
        <div className="scroll-indicator"></div>
      </div>
    </section>
  );
};

export default Hero;
