
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

const ThemeToggle = () => {
  const { isWhiteMode, toggleWhiteMode } = useTheme();

  return (
    <Button
      onClick={toggleWhiteMode}
      variant="ghost"
      size="sm"
      className={`
        relative overflow-hidden transition-all duration-300 ease-in-out
        ${isWhiteMode 
          ? 'bg-gradient-to-r from-orange-400 to-pink-400 text-white shadow-lg hover:shadow-xl' 
          : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-xl'
        }
        rounded-full px-4 py-2 min-w-[50px] group
      `}
    >
      <div className="flex items-center justify-center space-x-2">
        <div className={`transition-transform duration-300 ${isWhiteMode ? 'rotate-180 scale-110' : 'rotate-0'}`}>
          {isWhiteMode ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </div>
        <span className="text-xs font-medium hidden sm:inline">
          {isWhiteMode ? 'Light' : 'Dark'}
        </span>
      </div>
      
      {/* Animated background effect */}
      <div className={`
        absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300
        ${isWhiteMode 
          ? 'bg-gradient-to-r from-yellow-300 to-orange-300' 
          : 'bg-gradient-to-r from-blue-400 to-indigo-400'
        }
      `} />
    </Button>
  );
};

export default ThemeToggle;
