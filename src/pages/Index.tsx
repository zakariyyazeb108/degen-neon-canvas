
import { useState } from "react";
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
import { Cog } from "lucide-react";
import { useSimpleDegenMode } from "@/hooks/useSimpleDegenMode";

const Index = () => {
  const { isDegenMode, activateDegenMode, deactivateDegenMode, loading } = useSimpleDegenMode();
  
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
    if (isDegenMode) {
      deactivateDegenMode();
    } else {
      setShowDegenInput(true);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <ParticleBackground />
      <CustomCursor />
      
      {/* Degen Mode Toggle */}
      <div className="fixed bottom-6 left-6 z-50">
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
