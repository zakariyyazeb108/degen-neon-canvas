
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

const ThemeToggle = () => {
  const { isWhiteMode, toggleWhiteMode } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleWhiteMode}
      className="fixed top-6 right-24 z-50 bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-black/30 white-mode:bg-white/20 white-mode:border-gray-300 white-mode:hover:bg-white/30"
    >
      {isWhiteMode ? (
        <Moon className="h-5 w-5 text-white white-mode:text-gray-700" />
      ) : (
        <Sun className="h-5 w-5 text-white" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
