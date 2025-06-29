import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Upload, Trash2, Image as ImageIcon } from "lucide-react";
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

const GraphicsPortfolio = () => {
  const { isDegenMode } = useSimpleDegenMode();
  const { items: graphicsPacks, loading, addItem, updateItem, deleteItem } = usePortfolioItems('graphics');
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
  const [newCategory, setNewCategory] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const openImageViewer = (pack: typeof graphicsPacks[0]) => {
    if (isDegenMode) return; // Don't open viewer in degen mode
    setSelectedImage({
      src: pack.image_url,
      alt: pack.title,
      title: pack.title,
      description: pack.description,
      category: pack.category
    });
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 1024 * 1024 * 1024) {
      alert('File size must be less than 1GB');
      return;
    }

    setUploadingImage(true);

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setNewImage(dataUrl);
        console.log('Image converted to data URL successfully');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Failed to process image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const startEditing = (pack: typeof graphicsPacks[0]) => {
    setEditingCard(pack.id);
    setNewTitle(pack.title);
    setNewDescription(pack.description);
    setNewImage(pack.image_url);
    setNewCategory(pack.category);
  };

  const saveEdit = async () => {
    if (!editingCard) return;

    const success = await updateItem(editingCard, {
      title: newTitle,
      description: newDescription,
      image_url: newImage,
      category: newCategory
    });

    if (success) {
      setEditingCard(null);
      setNewTitle("");
      setNewDescription("");
      setNewImage("");
      setNewCategory("");
    }
  };

  const cancelEdit = () => {
    setEditingCard(null);
    setNewTitle("");
    setNewDescription("");
    setNewImage("");
    setNewCategory("");
  };

  const addNewPack = async () => {
    await addItem({
      title: "New Graphics Pack",
      description: "Add your graphics pack description",
      image_url: "",
      category: "Graphics Pack",
      item_type: "graphics"
    });
  };

  const deletePack = async (packId: string) => {
    await deleteItem(packId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <CustomCursor />
        <Navigation />
        <div className="text-white white-mode:text-gray-800">Loading...</div>
      </div>
    );
  }

  const hasRealContent = graphicsPacks.length > 0;

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
            <p className="text-xl text-white/60 white-mode:text-gray-600 max-w-2xl font-light">
              Complete visual packages that provide brands with everything they need for consistent, professional design
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

          {/* Add New Pack Button (Degen Mode) */}
          {isDegenMode && (
            <div className="mb-8">
              <Button onClick={addNewPack} className="bg-red-500 hover:bg-red-600">
                <Upload className="w-4 h-4 mr-2" />
                Add New Graphics Pack
              </Button>
            </div>
          )}

          {/* Graphics Packs Grid or Empty State with white mode styling */}
          {hasRealContent ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {graphicsPacks.map((pack, index) => (
                <Card 
                  key={pack.id} 
                  className={`premium-card group overflow-hidden ${!isDegenMode ? 'cursor-pointer' : ''} relative`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => !isDegenMode && pack.image_url && openImageViewer(pack)}
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
                    <div className="aspect-video overflow-hidden bg-gray-900/50 white-mode:bg-gray-100">
                      {pack.image_url ? (
                        <img 
                          src={pack.image_url} 
                          alt={pack.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-800/50 white-mode:bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-600 white-mode:border-gray-400">
                          <div className="text-center">
                            <ImageIcon className="w-12 h-12 text-gray-400 white-mode:text-gray-500 mx-auto mb-2" />
                            <span className="text-gray-400 white-mode:text-gray-500 text-sm">No image uploaded</span>
                          </div>
                        </div>
                      )}

                      {/* Image Viewer Overlay */}
                      {!isDegenMode && pack.image_url && (
                        <div className="absolute inset-0 bg-black/40 white-mode:bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <ExternalLink className="w-8 h-8 text-white white-mode:text-gray-800" />
                        </div>
                      )}
                    </div>

                    {/* Degen Mode Edit Button */}
                    {isDegenMode && (
                      <div className="absolute inset-0 bg-black/60 white-mode:bg-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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
                      
                      <h3 className="text-xl font-medium text-white white-mode:text-gray-800 mb-2 group-hover:text-primary/90 transition-colors">
                        {pack.title}
                      </h3>
                      
                      <p className="text-white/60 white-mode:text-gray-600 text-sm leading-relaxed">
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
                <h3 className="text-2xl font-medium text-white/80 white-mode:text-gray-700 mb-2">Coming Soon</h3>
                <p className="text-white/50 white-mode:text-gray-500">Graphics packs will be showcased here</p>
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

      {/* Edit Pack Dialog - Upload only */}
      <Dialog open={editingCard !== null} onOpenChange={() => cancelEdit()}>
        <DialogContent className="bg-background white-mode:bg-white border-white/10 white-mode:border-gray-200 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white white-mode:text-gray-800">Edit Graphics Pack</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Image Upload Section */}
            <div>
              <label className="text-white/80 white-mode:text-gray-700 text-sm mb-3 block font-medium">Pack Image</label>
              
              {/* Current Image Preview */}
              {newImage && (
                <div className="mb-4">
                  <div className="aspect-video w-full max-w-md mx-auto rounded-lg overflow-hidden bg-gray-900 white-mode:bg-gray-100">
                    <img 
                      src={newImage} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
              
              {/* Upload Options - File upload only */}
              <div className="space-y-3">
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
                      className="w-full bg-gray-800/50 white-mode:bg-gray-100 border-gray-600 white-mode:border-gray-300 hover:bg-gray-700/50 white-mode:hover:bg-gray-200"
                      disabled={uploadingImage}
                      onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {uploadingImage ? 'Processing...' : 'Upload from PC (Max 1GB)'}
                    </Button>
                  </label>
                </div>
              </div>
            </div>

            {/* Form inputs with white mode styling */}
            <div>
              <label className="text-white/80 white-mode:text-gray-700 text-sm mb-2 block font-medium">Title</label>
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="bg-background/50 white-mode:bg-gray-50 border-white/20 white-mode:border-gray-300 text-white white-mode:text-gray-800"
                placeholder="Enter pack title..."
              />
            </div>

            <div>
              <label className="text-white/80 white-mode:text-gray-700 text-sm mb-2 block font-medium">Description</label>
              <Textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="bg-background/50 white-mode:bg-gray-50 border-white/20 white-mode:border-gray-300 text-white white-mode:text-gray-800 resize-none"
                placeholder="Enter pack description..."
                rows={3}
              />
            </div>

            <div>
              <label className="text-white/80 white-mode:text-gray-700 text-sm mb-2 block font-medium">Category</label>
              <Input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="bg-background/50 white-mode:bg-gray-50 border-white/20 white-mode:border-gray-300 text-white white-mode:text-gray-800"
                placeholder="Enter category..."
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
                className="flex-1 border-gray-600 white-mode:border-gray-300 hover:bg-gray-700/50 white-mode:hover:bg-gray-100"
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

export default GraphicsPortfolio;
