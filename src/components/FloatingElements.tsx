
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large floating orbs */}
      <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-blue-400/20 rounded-full float-slow blur-sm"></div>
      <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-300/30 rounded-full float-medium blur-sm" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-blue-500/25 rounded-full float-fast blur-sm" style={{ animationDelay: '4s' }}></div>
      <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-blue-200/20 rounded-full float-slow blur-sm" style={{ animationDelay: '6s' }}></div>
      
      {/* Geometric shapes */}
      <div className="absolute top-1/5 right-1/5 w-8 h-8 border border-blue-400/10 rotate-45 float-medium" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/4 left-1/5 w-6 h-6 border border-blue-300/15 rotate-12 float-fast" style={{ animationDelay: '3s' }}></div>
      
      {/* Subtle lines */}
      <div className="absolute top-1/2 left-0 w-32 h-px bg-gradient-to-r from-transparent via-blue-400/10 to-transparent float-slow"></div>
      <div className="absolute top-3/4 right-0 w-24 h-px bg-gradient-to-l from-transparent via-blue-300/15 to-transparent float-medium" style={{ animationDelay: '2s' }}></div>
    </div>
  );
};

export default FloatingElements;
