
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Upload, ExternalLink, Trash2, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import ImageViewer from "@/components/ImageViewer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useSimpleDegenMode } from "@/hooks/useSimpleDegenMode";
import { usePortfolioItems } from "@/hooks/usePortfolioItems";

const UIUXPortfolio = () => {
  const { isDegenMode } = useSimpleDegenMode();
  const { items: uiuxProjects, loading, addItem, updateItem, deleteItem } = usePortfolioItems('uiux');
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    title: string;
    description: string;
    category: string;
  } | null>(null);
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newWebsiteUrl, setNewWebsiteUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const openImageViewer = (project: typeof uiuxProjects[0]) => {
    if (isDegenMode) return; // Don't open viewer in degen mode
    setSelectedImage({
      src: project.image_url,
      alt: project.title,
      title: project.title,
      description: project.description,
      category: project.category
    });
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Increased file size limit to 10MB
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setUploadingImage(true);

    try {
      const imageUrl = URL.createObjectURL(file);
      setNewImage(imageUrl);
      console.log('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const startEditing = (project: typeof uiuxProjects[0]) => {
    setEditingCard(project.id);
    setNewTitle(project.title);
    setNewDescription(project.description);
    setNewImage(project.image_url);
    setNewWebsiteUrl(project.website_url || "");
  };

  const saveEdit = async () => {
    if (!editingCard) return;

    const success = await updateItem(editingCard, {
      title: newTitle,
      description: newDescription,
      image_url: newImage,
      website_url: newWebsiteUrl
    });

    if (success) {
      setEditingCard(null);
      setNewTitle("");
      setNewDescription("");
      setNewImage("");
      setNewWebsiteUrl("");
    }
  };

  const cancelEdit = () => {
    setEditingCard(null);
    setNewTitle("");
    setNewDescription("");
    setNewImage("");
    setNewWebsiteUrl("");
  };

  const addNewProject = async () => {
    await addItem({
      title: "New UI/UX Project",
      description: "Add your project description",
      image_url: "",
      website_url: "",
      category: "UI/UX",
      item_type: "uiux"
    });
  };

  const deleteProject = async (projectId: string) => {
    await deleteItem(projectId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <CustomCursor />
        <Navigation />
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const hasRealContent = uiuxProjects.length > 0;

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
              <span className="gradient-text font-medium">UI/UX</span> Design
            </h1>
            <p className="text-xl text-white/60 max-w-2xl font-light">
              User experiences that balance beautiful aesthetics with flawless functionality
            </p>

            {/* Degen Mode Indicator */}
            {isDegenMode && (
              <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">
                  🔥 Degen Mode Active - All changes will be publicly visible
                </p>
              </div>
            )}
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

          {/* Projects Grid or Empty State */}
          {hasRealContent ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {uiuxProjects.map((project, index) => (
                <Card 
                  key={project.id} 
                  className={`premium-card group overflow-hidden ${!isDegenMode ? 'cursor-pointer' : ''} relative`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => !isDegenMode && project.image_url && openImageViewer(project)}
                >
                  {/* Delete Button (Degen Mode) */}
                  {isDegenMode && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProject(project.id);
                      }}
                      className="absolute top-2 right-2 z-10 bg-red-500/80 hover:bg-red-500 text-white p-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      size="sm"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  )}

                  <div className="relative">
                    {/* Project Image */}
                    <div className="aspect-video overflow-hidden bg-gray-900/50">
                      {project.image_url ? (
                        <img 
                          src={project.image_url} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-800/50 flex items-center justify-center border-2 border-dashed border-gray-600">
                          <div className="text-center">
                            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <span className="text-gray-400 text-sm">No image uploaded</span>
                          </div>
                        </div>
                      )}

                      {/* Image Viewer Overlay (only when not in degen mode and has image) */}
                      {!isDegenMode && project.image_url && (
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <ExternalLink className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Degen Mode Edit Button */}
                    {isDegenMode && (
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button
                          onClick={() => startEditing(project)}
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
                          {project.category}
                        </span>
                        {project.website_url && !isDegenMode && (
                          <a 
                            href={project.website_url} 
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

                      {/* Website Link Display */}
                      {project.website_url && (
                        <a 
                          href={project.website_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary/80 hover:text-primary text-sm flex items-center gap-1 transition-colors"
                        >
                          Visit Website <ExternalLink className="w-3 h-3" />
                        </a>
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

      {/* Edit Project Dialog */}
      <Dialog open={editingCard !== null} onOpenChange={() => cancelEdit()}>
        <DialogContent className="bg-background border-white/10 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">Edit UI/UX Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Image Upload Section */}
            <div>
              <label className="text-white/80 text-sm mb-3 block font-medium">Project Image</label>
              
              {/* Current Image Preview */}
              {newImage && (
                <div className="mb-4">
                  <div className="aspect-video w-full max-w-md mx-auto rounded-lg overflow-hidden bg-gray-900">
                    <img 
                      src={newImage} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
              
              {/* Upload Options */}
              <div className="space-y-3">
                {/* File Upload */}
                <div>
                  <label className="block">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full bg-gray-800/50 border-gray-600 hover:bg-gray-700/50"
                      disabled={uploadingImage}
                      onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {uploadingImage ? 'Uploading...' : 'Upload from PC'}
                    </Button>
                  </label>
                </div>
                
                {/* URL Input */}
                <div>
                  <Input
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="bg-background/50 border-white/20 text-white"
                    placeholder="Or paste image URL..."
                  />
                </div>
              </div>
            </div>

            {/* Title Input */}
            <div>
              <label className="text-white/80 text-sm mb-2 block font-medium">Project Title</label>
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="bg-background/50 border-white/20 text-white"
                placeholder="Enter project title..."
              />
            </div>

            {/* Description Input */}
            <div>
              <label className="text-white/80 text-sm mb-2 block font-medium">Description</label>
              <Textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="bg-background/50 border-white/20 text-white resize-none"
                placeholder="Enter project description..."
                rows={3}
              />
            </div>

            {/* Website URL Input */}
            <div>
              <label className="text-white/80 text-sm mb-2 block font-medium">Website/Project URL</label>
              <Input
                value={newWebsiteUrl}
                onChange={(e) => setNewWebsiteUrl(e.target.value)}
                className="bg-background/50 border-white/20 text-white"
                placeholder="https://example.com"
              />
            </div>

            {/* Public Notice */}
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-xs">
                ⚠️ This content will be publicly visible once saved
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button 
                onClick={saveEdit} 
                className="flex-1 bg-red-500 hover:bg-red-600"
                disabled={!newTitle.trim()}
              >
                Save Changes
              </Button>
              <Button 
                onClick={cancelEdit} 
                variant="outline" 
                className="flex-1 border-gray-600 hover:bg-gray-700/50"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Viewer Modal */}
      {selectedImage && (
        <ImageViewer
          isOpen={!!selectedImage}
          onClose={closeImageViewer}
          imageSrc={selectedImage.src}
          imageAlt={selectedImage.alt}
          title={selectedImage.title}
          description={selectedImage.description}
          category={selectedImage.category}
        />
      )}
    </div>
  );
};

export default UIUXPortfolio;
