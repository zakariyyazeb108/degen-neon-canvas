
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Upload, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const GraphicsPortfolio = () => {
  const [isDegenMode, setIsDegenMode] = useState(false);
  const [editingCard, setEditingCard] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState("");

  const [graphicsPacks, setGraphicsPacks] = useState([
    {
      id: 1,
      title: "Coming Soon",
      description: "Graphics packs will be showcased here",
      image: "",
      category: "Graphics Pack"
    }
  ]);

  // Check for Degen Mode from localStorage
  useEffect(() => {
    const checkDegenMode = () => {
      const savedDegenMode = localStorage.getItem("degenMode");
      setIsDegenMode(savedDegenMode === "true");
    };

    checkDegenMode();
    
    // Listen for storage changes
    window.addEventListener('storage', checkDegenMode);
    
    // Also check periodically in case localStorage is updated on same tab
    const interval = setInterval(checkDegenMode, 1000);

    return () => {
      window.removeEventListener('storage', checkDegenMode);
      clearInterval(interval);
    };
  }, []);

  const startEditing = (pack: typeof graphicsPacks[0]) => {
    setEditingCard(pack.id);
    setNewTitle(pack.title);
    setNewDescription(pack.description);
    setNewImage(pack.image);
  };

  const saveEdit = () => {
    setGraphicsPacks(graphicsPacks.map(pack => 
      pack.id === editingCard 
        ? { ...pack, title: newTitle, description: newDescription, image: newImage }
        : pack
    ));
    setEditingCard(null);
  };

  const cancelEdit = () => {
    setEditingCard(null);
    setNewTitle("");
    setNewDescription("");
    setNewImage("");
  };

  const addNewPack = () => {
    const newId = Math.max(...graphicsPacks.map(p => p.id)) + 1;
    setGraphicsPacks([...graphicsPacks, {
      id: newId,
      title: "New Graphics Pack",
      description: "Add your graphics pack description",
      image: "",
      category: "Graphics Pack"
    }]);
  };

  const deletePack = (packId: number) => {
    setGraphicsPacks(graphicsPacks.filter(pack => pack.id !== packId));
  };

  const hasRealContent = graphicsPacks.length > 1 || (graphicsPacks.length === 1 && graphicsPacks[0].title !== "Coming Soon");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Navigation />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <Link to="/#portfolio" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Link>
            <h1 className="text-4xl md:text-6xl font-light mb-6">
              <span className="gradient-text font-medium">Graphics</span> Packs
            </h1>
            <p className="text-xl text-white/60 max-w-2xl font-light">
              Complete visual packages that provide brands with everything they need for consistent, professional design
            </p>
          </div>

          {/* Add New Pack Button (Degen Mode) */}
          {isDegenMode && (
            <div className="mb-8">
              <Button onClick={addNewPack} className="bg-red-500 hover:bg-red-600">
                <Upload className="w-4 h-4 mr-2" />
                Add New Graphics Pack
              </Button>
            </div>
          )}

          {/* Graphics Packs Grid or Empty State */}
          {hasRealContent ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {graphicsPacks.filter(pack => pack.title !== "Coming Soon").map((pack, index) => (
                <Card 
                  key={pack.id} 
                  className="premium-card group overflow-hidden relative"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Delete Button (Degen Mode) */}
                  {isDegenMode && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePack(pack.id);
                      }}
                      className="absolute top-2 right-2 z-10 bg-red-500/80 hover:bg-red-500 text-white p-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      size="sm"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  )}

                  <div className="relative">
                    {/* Pack Image */}
                    {pack.image ? (
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={pack.image} 
                          alt={pack.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gray-800 flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}

                    {/* Degen Mode Edit Button */}
                    {isDegenMode && (
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button
                          onClick={() => startEditing(pack)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Edit Content
                        </Button>
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
                          {pack.category}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-medium text-white mb-2 group-hover:text-primary/90 transition-colors">
                        {pack.title}
                      </h3>
                      
                      <p className="text-white/60 text-sm leading-relaxed">
                        {pack.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20"></div>
                </div>
                <h3 className="text-2xl font-medium text-white/80 mb-2">Coming Soon</h3>
                <p className="text-white/50">Graphics packs will be showcased here</p>
                {isDegenMode && (
                  <Button onClick={addNewPack} className="mt-4 bg-red-500 hover:bg-red-600">
                    <Upload className="w-4 h-4 mr-2" />
                    Add First Pack
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Pack Dialog */}
      <Dialog open={editingCard !== null} onOpenChange={() => cancelEdit()}>
        <DialogContent className="bg-background border-white/10 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Graphics Pack</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-white/80 text-sm mb-2 block">Title</label>
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="bg-background/50 border-white/20 text-white"
              />
            </div>
            <div>
              <label className="text-white/80 text-sm mb-2 block">Description</label>
              <Textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="bg-background/50 border-white/20 text-white"
                rows={3}
              />
            </div>
            <div>
              <label className="text-white/80 text-sm mb-2 block">Image URL</label>
              <Input
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                className="bg-background/50 border-white/20 text-white"
                placeholder="Enter image URL..."
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={saveEdit} className="flex-1 bg-red-500 hover:bg-red-600">
                Save Changes
              </Button>
              <Button onClick={cancelEdit} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GraphicsPortfolio;
