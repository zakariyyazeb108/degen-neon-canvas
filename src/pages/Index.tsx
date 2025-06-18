
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Contact from "@/components/Contact";
import ScrollToTop from "@/components/ScrollToTop";
import ParticleBackground from "@/components/ParticleBackground";
import CustomCursor from "@/components/CustomCursor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Cog, LogIn, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useDegenMode } from "@/hooks/useDegenMode";
import { Link, useNavigate } from "react-router-dom";

const Index = () => {
  const { user, signOut } = useAuth();
  const { isDegenMode, activateDegenMode, deactivateDegenMode, loading } = useDegenMode();
  const navigate = useNavigate();
  
  const [showDegenInput, setShowDegenInput] = useState(false);
  const [degenCode, setDegenCode] = useState("");

  const handleDegenCodeSubmit = async () => {
    const success = await activateDegenMode(degenCode);
    if (success) {
      setShowDegenInput(false);
      setDegenCode("");
    }
  };

  const toggleDegenMode = () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (isDegenMode) {
      deactivateDegenMode();
    } else {
      setShowDegenInput(true);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    if (isDegenMode) {
      await deactivateDegenMode();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <ParticleBackground />
      <CustomCursor />
      
      {/* Auth Status & Degen Mode Toggle */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2">
        {/* User Status */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
                <div className="flex items-center gap-2 text-white/60 text-xs">
                  <User className="h-3 w-3" />
                  <span>{user.email}</span>
                </div>
              </div>
              <Button
                onClick={handleSignOut}
                variant="ghost"
                size="sm"
                className="bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/60 border border-white/10 backdrop-blur-sm"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/60 border border-white/10 backdrop-blur-sm"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* Degen Mode Toggle */}
        <Button
          onClick={toggleDegenMode}
          disabled={loading}
          variant="ghost"
          size="sm"
          className={`${
            isDegenMode 
              ? "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30" 
              : "bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/60 border border-white/10"
          } backdrop-blur-sm transition-all duration-300 opacity-50 hover:opacity-100`}
        >
          <Cog className="h-4 w-4" />
          {isDegenMode && <span className="ml-2 text-xs">DEGEN</span>}
          {!user && <span className="ml-2 text-xs">LOGIN</span>}
        </Button>
      </div>

      <Navigation />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Contact />
      <ScrollToTop />

      {/* Degen Code Input Dialog */}
      <Dialog open={showDegenInput} onOpenChange={setShowDegenInput}>
        <DialogContent className="bg-background border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Enter Degen Code</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Enter code..."
              value={degenCode}
              onChange={(e) => setDegenCode(e.target.value)}
              className="bg-background/50 border-white/20 text-white"
              onKeyDown={(e) => e.key === 'Enter' && handleDegenCodeSubmit()}
            />
            <div className="flex gap-2">
              <Button 
                onClick={handleDegenCodeSubmit} 
                className="flex-1"
                disabled={loading}
              >
                {loading ? "Activating..." : "Activate Degen Mode"}
              </Button>
              <Button onClick={() => setShowDegenInput(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
