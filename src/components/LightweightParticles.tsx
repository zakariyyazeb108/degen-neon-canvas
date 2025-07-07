
const LightweightParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-20 white-mode:opacity-5" style={{ zIndex: 1 }}>
      {/* CSS-only animated particles - much more performant */}
      <div className="absolute top-1/4 left-1/6 w-1 h-1 bg-blue-400/30 rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-0.5 h-0.5 bg-blue-300/40 rounded-full animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-blue-500/25 rounded-full animate-pulse" style={{ animationDuration: '8s', animationDelay: '4s' }}></div>
      <div className="absolute top-2/3 right-1/3 w-0.5 h-0.5 bg-blue-200/30 rounded-full animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/4 right-1/5 w-1 h-1 bg-blue-400/20 rounded-full animate-pulse" style={{ animationDuration: '7s', animationDelay: '3s' }}></div>
    </div>
  );
};

export default LightweightParticles;
