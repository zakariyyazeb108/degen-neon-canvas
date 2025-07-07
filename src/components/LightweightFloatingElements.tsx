
const LightweightFloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Lightweight floating orbs with CSS-only animations */}
      <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-blue-400/10 rounded-full animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-300/15 rounded-full animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-blue-500/12 rounded-full animate-pulse" style={{ animationDuration: '10s', animationDelay: '4s' }}></div>
      <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-blue-200/10 rounded-full animate-pulse" style={{ animationDuration: '7s', animationDelay: '6s' }}></div>
      
      {/* Simple geometric shapes */}
      <div className="absolute top-1/5 right-1/5 w-6 h-6 border border-blue-400/5 rotate-45 animate-pulse" style={{ animationDuration: '12s', animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/4 left-1/5 w-4 h-4 border border-blue-300/8 rotate-12 animate-pulse" style={{ animationDuration: '9s', animationDelay: '3s' }}></div>
    </div>
  );
};

export default LightweightFloatingElements;
