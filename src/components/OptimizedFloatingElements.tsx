
const OptimizedFloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Minimal floating elements for better performance */}
      <div className="absolute top-1/4 left-1/6 w-1 h-1 bg-blue-400/5 rounded-full animate-pulse" style={{ animationDuration: '6s' }}></div>
      <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-blue-500/5 rounded-full animate-pulse" style={{ animationDuration: '8s', animationDelay: '4s' }}></div>
    </div>
  );
};

export default OptimizedFloatingElements;
