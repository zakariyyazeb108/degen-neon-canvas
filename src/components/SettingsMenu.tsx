
import { useState } from 'react';
import { Cog, Sun, Moon, Settings, Zap } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { useSimpleDegenMode } from '@/hooks/useSimpleDegenMode';
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SettingsMenu = () => {
  const { isWhiteMode, toggleWhiteMode } = useTheme();
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
    <>
      {/* Fixed positioning to bottom left */}
      <div className="fixed bottom-6 left-6 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/20 white-mode:bg-white/90 backdrop-blur-sm border border-white/10 white-mode:border-gray-200 hover:bg-black/30 white-mode:hover:bg-white shadow-lg white-mode:shadow-md"
            >
              <Cog className="h-5 w-5 text-white white-mode:text-gray-700" />
              <span className="sr-only">Settings</span>
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent
            align="start"
            side="top"
            className="w-64 bg-black/90 white-mode:bg-white border-white/10 white-mode:border-gray-200 backdrop-blur-xl"
          >
            {/* Theme Toggle */}
            <DropdownMenuItem
              onClick={toggleWhiteMode}
              className="flex items-center gap-3 p-3 cursor-pointer text-white/90 white-mode:text-gray-700 hover:bg-white/10 white-mode:hover:bg-gray-50"
            >
              <div className="p-2 rounded-lg bg-primary/10 white-mode:bg-primary/10">
                {isWhiteMode ? (
                  <Moon className="h-4 w-4 text-primary" />
                ) : (
                  <Sun className="h-4 w-4 text-primary" />
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">
                  {isWhiteMode ? 'Dark Mode' : 'Light Mode'}
                </div>
                <div className="text-xs text-white/50 white-mode:text-gray-500">
                  Switch to {isWhiteMode ? 'dark' : 'light'} theme
                </div>
              </div>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-white/10 white-mode:bg-gray-200" />

            {/* Degen Mode Toggle */}
            <DropdownMenuItem
              onClick={toggleDegenMode}
              disabled={loading}
              className="flex items-center gap-3 p-3 cursor-pointer text-white/90 white-mode:text-gray-700 hover:bg-white/10 white-mode:hover:bg-gray-50"
            >
              <div className={`p-2 rounded-lg ${
                isDegenMode 
                  ? "bg-red-500/20 white-mode:bg-red-500/10" 
                  : "bg-white/10 white-mode:bg-gray-100"
              }`}>
                <Zap className={`h-4 w-4 ${
                  isDegenMode 
                    ? "text-red-400 white-mode:text-red-500" 
                    : "text-white/60 white-mode:text-gray-400"
                }`} />
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">
                  {isDegenMode ? 'Exit Degen Mode' : 'Degen Mode'}
                </div>
                <div className="text-xs text-white/50 white-mode:text-gray-500">
                  {isDegenMode ? 'Disable content editing' : 'Enable content editing'}
                </div>
              </div>
              {isDegenMode && (
                <div className="px-2 py-1 rounded-full bg-red-500/20 white-mode:bg-red-500/10">
                  <span className="text-xs text-red-400 white-mode:text-red-500 font-medium">ON</span>
                </div>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Degen Code Input Dialog */}
      <Dialog open={showDegenInput} onOpenChange={setShowDegenInput}>
        <DialogContent className="bg-background white-mode:bg-white border-white/10 white-mode:border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-white white-mode:text-gray-800">Enter Degen Code</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Enter code..."
              value={degenCode}
              onChange={(e) => setDegenCode(e.target.value)}
              className="bg-background/50 white-mode:bg-gray-50 border-white/20 white-mode:border-gray-300 text-white white-mode:text-gray-800"
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
              <Button 
                onClick={() => setShowDegenInput(false)} 
                variant="outline" 
                className="flex-1 border-gray-600 white-mode:border-gray-300"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SettingsMenu;
