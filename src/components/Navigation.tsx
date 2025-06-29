import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSimpleDegenMode } from "@/hooks/useSimpleDegenMode";
import ThemeToggle from "@/components/ThemeToggle";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDegenModalOpen, setIsDegenModalOpen] = useState(false);
  const [degenCode, setDegenCode] = useState("");
  const { isDegenMode, activateDegenMode, deactivateDegenMode, loading } = useSimpleDegenMode();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold gradient-text">
              DegenDesigns
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/#about" 
                className="text-white/70 hover:text-white transition-colors"
                onClick={handleLinkClick}
              >
                About
              </Link>
              <Link 
                to="/#services" 
                className="text-white/70 hover:text-white transition-colors"
                onClick={handleLinkClick}
              >
                Services
              </Link>
              <Link 
                to="/#portfolio" 
                className="text-white/70 hover:text-white transition-colors"
                onClick={handleLinkClick}
              >
                Portfolio
              </Link>
              <Link 
                to="/#contact" 
                className="text-white/70 hover:text-white transition-colors"
                onClick={handleLinkClick}
              >
                Contact
              </Link>
              
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* Degen Mode Button */}
              {!isDegenMode ? (
                <Button 
                  onClick={() => setIsDegenModalOpen(true)}
                  className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400"
                  size="sm"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Degen Mode
                </Button>
              ) : (
                <Button 
                  onClick={deactivateDegenMode}
                  className="bg-red-500 hover:bg-red-600 text-white"
                  size="sm"
                >
                  <Unlock className="w-4 h-4 mr-2" />
                  Exit Degen
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="text-white"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-white/10">
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/#about" 
                  className="text-white/70 hover:text-white transition-colors"
                  onClick={handleLinkClick}
                >
                  About
                </Link>
                <Link 
                  to="/#services" 
                  className="text-white/70 hover:text-white transition-colors"
                  onClick={handleLinkClick}
                >
                  Services
                </Link>
                <Link 
                  to="/#portfolio" 
                  className="text-white/70 hover:text-white transition-colors"
                  onClick={handleLinkClick}
                >
                  Portfolio
                </Link>
                <Link 
                  to="/#contact" 
                  className="text-white/70 hover:text-white transition-colors"
                  onClick={handleLinkClick}
                >
                  Contact
                </Link>
                
                {/* Mobile Degen Mode Button */}
                {!isDegenMode ? (
                  <Button 
                    onClick={() => setIsDegenModalOpen(true)}
                    className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 w-full"
                    size="sm"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Degen Mode
                  </Button>
                ) : (
                  <Button 
                    onClick={deactivateDegenMode}
                    className="bg-red-500 hover:bg-red-600 text-white w-full"
                    size="sm"
                  >
                    <Unlock className="w-4 h-4 mr-2" />
                    Exit Degen
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Degen Mode Dialog */}
      <Dialog open={isDegenModalOpen} onOpenChange={setIsDegenModalOpen}>
        <DialogContent className="bg-background border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Enter Degen Mode</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="code"
                value={degenCode}
                onChange={(e) => setDegenCode(e.target.value)}
                className="col-span-4 bg-background/50 border-white/20 text-white"
              />
            </div>
          </div>
          <Button 
            onClick={() => activateDegenMode(degenCode).then(success => {
              if (success) setIsDegenModalOpen(false);
            })}
            className="bg-red-500 hover:bg-red-600 w-full"
            disabled={loading}
          >
            {loading ? "Activating..." : "Activate Degen Mode"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navigation;
