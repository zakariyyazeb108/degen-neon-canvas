
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isWhiteMode: boolean;
  toggleWhiteMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isWhiteMode, setIsWhiteMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('whiteMode');
    if (savedTheme === 'true') {
      setIsWhiteMode(true);
      document.documentElement.classList.add('white-mode');
    }
  }, []);

  const toggleWhiteMode = () => {
    const newMode = !isWhiteMode;
    setIsWhiteMode(newMode);
    localStorage.setItem('whiteMode', newMode.toString());
    
    if (newMode) {
      document.documentElement.classList.add('white-mode');
    } else {
      document.documentElement.classList.remove('white-mode');
    }
  };

  return (
    <ThemeContext.Provider value={{ isWhiteMode, toggleWhiteMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
