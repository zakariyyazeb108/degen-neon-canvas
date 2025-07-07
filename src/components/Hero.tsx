
import MagneticButton from "./MagneticButton";
import LightweightFloatingElements from "./LightweightFloatingElements";

const Hero = () => {
  const handleDiscordClick = () => {
    window.open('https://discord.gg/v7f2U4APgW', '_blank');
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden hero-gradient">
      <LightweightFloatingElements />
      
      {/* Simplified geometric background */}
      <div className="geometric-bg opacity-30"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-5xl mx-auto space-y-12 pt-32">
          {/* Main heading with optimized animations */}
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
            
            {/* Simplified decorative elements */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-blue-400/8 to-blue-600/4 rounded-full blur-2xl animate-pulse animate-fade-in [animation-delay:1.2s] [animation-fill-mode:forwards] opacity-0"></div>
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-blue-300/4 rounded-full blur-xl animate-pulse animate-fade-in [animation-delay:1.4s] [animation-fill-mode:forwards] opacity-0"></div>
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
          
          {/* CTA with premium styling and animation - increased bottom padding */}
          <div className="pt-8 pb-32 animate-fade-in-up [animation-delay:2s] [animation-fill-mode:forwards] opacity-0">
            <MagneticButton 
              className="premium-button text-white px-12 py-4 text-lg font-medium rounded-full"
              onClick={handleDiscordClick}
            >
              Let's Create Together
            </MagneticButton>
          </div>
        </div>
      </div>
      
      {/* Advanced scroll indicator - positioned with more clearance */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-fade-in [animation-delay:2.2s] [animation-fill-mode:forwards] opacity-0">
        <div className="scroll-indicator"></div>
      </div>
    </section>
  );
};

export default Hero;
