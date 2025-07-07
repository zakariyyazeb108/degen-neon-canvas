
const OptimizedFloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Reduced number of floating elements for better performance */}
      <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-blue-400/10 rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-300/15 rounded-full animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-blue-500/10 rounded-full animate-pulse" style={{ animationDuration: '8s', animationDelay: '4s' }}></div>
      
      {/* Simplified geometric shapes */}
      <div className="absolute top-1/5 right-1/5 w-6 h-6 border border-blue-400/5 rotate-45" style={{ animation: 'spin 20s linear infinite' }}></div>
    </div>
  );
};

export default OptimizedFloatingElements;
