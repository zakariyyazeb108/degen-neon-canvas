
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Cog, Upload, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const UIUXPortfolio = () => {
  const [showDegenInput, setShowDegenInput] = useState(false);
  const [degenCode, setDegenCode] = useState("");
  const [isDegenMode, setIsDegenMode] = useState(false);
  const [editingCard, setEditingCard] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newWebsiteUrl, setNewWebsiteUrl] = useState("");

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Coming Soon",
      description: "UI/UX projects will be showcased here",
      image: "",
      websiteUrl: "",
      category: "UI/UX"
    }
  ]);

  const handleDegenCodeSubmit = () => {
    if (degenCode === "DegenDesigns+123") {
      setIsDegenMode(true);
      setShowDegenInput(false);
      setDegenCode("");
    } else {
      alert("Incorrect code! Try again.");
      setDegenCode("");
    }
  };

  const startEditing = (project: typeof projects[0]) => {
    setEditingCard(project.id);
    setNewTitle(project.title);
    setNewDescription(project.description);
    setNewImage(project.image);
    setNewWebsiteUrl(project.websiteUrl);
  };

  const saveEdit = () => {
    setProjects(projects.map(project => 
      project.id === editingCard 
        ? { ...project, title: newTitle, description: newDescription, image: newImage, websiteUrl: newWebsiteUrl }
        : project
    ));
    setEditingCard(null);
  };

  const cancelEdit = () => {
    setEditingCard(null);
    setNewTitle("");
    setNewDescription("");
    setNewImage("");
    setNewWebsiteUrl("");
  };

  const addNewProject = () => {
    const newId = Math.max(...projects.map(p => p.id)) + 1;
    setProjects([...projects, {
      id: newId,
      title: "New Project",
      description: "Add your project description",
      image: "",
      websiteUrl: "",
      category: "UI/UX"
    }]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Navigation />
      
      {/* Degen Mode Toggle */}
      <div className="fixed top-24 right-6 z-40">
        <Button
          onClick={() => isDegenMode ? setIsDegenMode(false) : setShowDegenInput(true)}
          variant={isDegenMode ? "default" : "outline"}
          size="icon"
          className={isDegenMode ? "bg-red-500 hover:bg-red-600" : ""}
        >
          <Cog className="h-4 w-4" />
        </Button>
        {isDegenMode && (
          <div className="absolute top-12 right-0 text-xs text-red-400 font-bold">
            DEGEN MODE
          </div>
        )}
      </div>
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <Link to="/#portfolio" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Link>
            <h1 className="text-4xl md:text-6xl font-light mb-6">
              <span className="gradient-text font-medium">UI/UX</span> Design
            </h1>
            <p className="text-xl text-white/60 max-w-2xl font-light">
              User experiences that balance beautiful aesthetics with flawless functionality
            </p>
          </div>

          {/* Add New Project Button (Degen Mode) */}
          {isDegenMode && (
            <div className="mb-8">
              <Button onClick={addNewProject} className="bg-red-500 hover:bg-red-600">
                <Upload className="w-4 h-4 mr-2" />
                Add New Project
              </Button>
            </div>
          )}

          {/* Projects Grid */}
          {projects.length > 0 && projects[0].title !== "Coming Soon" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card 
                  key={project.id} 
                  className="premium-card group overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    {/* Project Image */}
                    {project.image && (
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
                          {project.category}
                        </span>
                        {project.websiteUrl && (
                          <a 
                            href={project.websiteUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary/60 hover:text-primary/80 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-medium text-white mb-2 group-hover:text-primary/90 transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-white/60 text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>

                      {/* Degen Mode Edit Button */}
                      {isDegenMode && (
                        <Button
                          onClick={() => startEditing(project)}
                          className="w-full bg-red-500 hover:bg-red-600"
                          size="sm"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Edit Project
                        </Button>
                      )}
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
                <p className="text-white/50">UI/UX projects will be showcased here</p>
                {isDegenMode && (
                  <Button onClick={addNewProject} className="mt-4 bg-red-500 hover:bg-red-600">
                    <Upload className="w-4 h-4 mr-2" />
                    Add First Project
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

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
            />
            <div className="flex gap-2">
              <Button onClick={handleDegenCodeSubmit} className="flex-1">
                Activate Degen Mode
              </Button>
              <Button onClick={() => setShowDegenInput(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Project Dialog */}
      <Dialog open={editingCard !== null} onOpenChange={() => cancelEdit()}>
        <DialogContent className="bg-background border-white/10 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Edit UI/UX Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-white/80 text-sm mb-2 block">Project Title</label>
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
            <div>
              <label className="text-white/80 text-sm mb-2 block">Website URL</label>
              <Input
                value={newWebsiteUrl}
                onChange={(e) => setNewWebsiteUrl(e.target.value)}
                className="bg-background/50 border-white/20 text-white"
                placeholder="https://example.com"
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

export default UIUXPortfolio;
