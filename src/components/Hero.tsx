
import MagneticButton from "./MagneticButton";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden gradient-bg">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-pink rounded-full blur-3xl animate-float float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-neon-blue rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8 reveal-scale">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Hey, I'm <span className="gradient-text pulse-glow">Degen</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed reveal-up glass rounded-lg p-4 shimmer">
            I design high-impact banners, PNLs & UI/UX.
          </p>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto reveal-up" style={{ animationDelay: '0.2s' }}>
            Clean, bold visuals for modern brands and projects.
          </p>
          
          <div className="pt-8 reveal-scale" style={{ animationDelay: '0.4s' }}>
            <MagneticButton
              className="bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-purple text-white px-8 py-6 text-lg font-semibold btn-enhanced neon-glow"
            >
              Contact Me on Discord
            </MagneticButton>
          </div>
        </div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center glass">
          <div className="w-1 h-3 bg-gradient-to-b from-neon-purple to-neon-pink rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
