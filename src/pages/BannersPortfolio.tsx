import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Upload, Trash2, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ImageViewer from "@/components/ImageViewer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useSimpleDegenMode } from "@/hooks/useSimpleDegenMode";
import { usePortfolioItems } from "@/hooks/usePortfolioItems";

const BannersPortfolio = () => {
  const { isDegenMode } = useSimpleDegenMode();
  const { items: banners, loading, addItem, updateItem, deleteItem } = usePortfolioItems('banner');
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

  const openImageViewer = (banner: typeof banners[0]) => {
    if (isDegenMode) return; // Don't open viewer in degen mode
    setSelectedImage({
      src: banner.image_url,
      alt: banner.title,
      title: banner.title,
      description: banner.description,
      category: banner.category
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

    // Increased file size limit to 1GB (1024 * 1024 * 1024 bytes)
    if (file.size > 1024 * 1024 * 1024) {
      alert('File size must be less than 1GB');
      return;
    }

    setUploadingImage(true);

    try {
      // Convert file to base64 data URL for permanent storage
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

  const startEditing = (banner: typeof banners[0]) => {
    setEditingCard(banner.id);
    setNewTitle(banner.title);
    setNewDescription(banner.description);
    setNewImage(banner.image_url);
    setNewCategory(banner.category);
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

  const addNewBanner = async () => {
    await addItem({
      title: "New Banner",
      description: "Add your banner description",
      image_url: "",
      category: "Custom",
      item_type: "banner"
    });
  };

  const deleteBanner = async (bannerId: string) => {
    await deleteItem(bannerId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Navigation />
        <div className="text-white white-mode:text-gray-800">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
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
              <span className="gradient-text font-medium">Banner</span> Designs
            </h1>
            <p className="text-xl text-white/60 white-mode:text-gray-600 max-w-2xl font-light">
              Eye-catching banner designs that drive engagement and conversions across web and social platforms
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

          {/* Add New Banner Button (Degen Mode) */}
          {isDegenMode && (
            <div className="mb-8">
              <Button onClick={addNewBanner} className="bg-red-500 hover:bg-red-600">
                <Upload className="w-4 h-4 mr-2" />
                Add New Banner
              </Button>
            </div>
          )}

          {/* Banner Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {banners.map((banner, index) => (
              <Card 
                key={banner.id} 
                className={`premium-card group overflow-hidden ${!isDegenMode ? 'cursor-pointer' : ''} relative`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => !isDegenMode && openImageViewer(banner)}
              >
                {/* Delete Button (Degen Mode) */}
                {isDegenMode && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteBanner(banner.id);
                    }}
                    className="absolute top-2 right-2 z-10 bg-red-500/80 hover:bg-red-500 text-white p-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    size="sm"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                )}

                <div className="relative">
                  {/* Banner Image with improved quality */}
                  <div className="aspect-video overflow-hidden bg-gray-900/50 white-mode:bg-gray-100">
                    {banner.image_url ? (
                      <img 
                        src={banner.image_url} 
                        alt={banner.title}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        style={{ 
                          imageRendering: 'auto',
                          filter: 'contrast(1.05) saturate(1.1)'
                        }}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800/50 white-mode:bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-600 white-mode:border-gray-400">
                        <div className="text-center">
                          <ImageIcon className="w-12 h-12 text-gray-400 white-mode:text-gray-500 mx-auto mb-2" />
                          <span className="text-gray-400 white-mode:text-gray-500 text-sm">No image uploaded</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Overlay */}
                    {!isDegenMode && banner.image_url && (
                      <div className="absolute inset-0 bg-black/40 white-mode:bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <ExternalLink className="w-8 h-8 text-white white-mode:text-gray-800" />
                      </div>
                    )}

                    {/* Degen Mode Edit Button */}
                    {isDegenMode && (
                      <div className="absolute inset-0 bg-black/60 white-mode:bg-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button
                          onClick={() => startEditing(banner)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Edit Content
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
                        {banner.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-medium text-white white-mode:text-gray-800 mb-2 group-hover:text-primary/90 transition-colors">
                      {banner.title}
                    </h3>
                    
                    <p className="text-white/60 white-mode:text-gray-600 text-sm leading-relaxed">
                      {banner.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-20 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">{banners.length}+</div>
                <div className="text-white/60 white-mode:text-gray-600 text-sm">Banner Designs</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">15+</div>
                <div className="text-white/60 white-mode:text-gray-600 text-sm">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">100%</div>
                <div className="text-white/60 white-mode:text-gray-600 text-sm">Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">24h</div>
                <div className="text-white/60 white-mode:text-gray-600 text-sm">Avg. Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Edit Card Dialog */}
      <Dialog open={editingCard !== null} onOpenChange={() => cancelEdit()}>
        <DialogContent className="bg-background white-mode:bg-white border-white/10 white-mode:border-gray-200 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white white-mode:text-gray-800">Edit Banner Content</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Image Upload Section */}
            <div>
              <label className="text-white/80 white-mode:text-gray-700 text-sm mb-3 block font-medium">Banner Image</label>
              
              {/* Current Image Preview */}
              {newImage && (
                <div className="mb-4">
                  <div className="aspect-video w-full max-w-md mx-auto rounded-lg overflow-hidden bg-gray-900 white-mode:bg-gray-100">
                    <img 
                      src={newImage} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      style={{ 
                        imageRendering: 'auto',
                        filter: 'contrast(1.05) saturate(1.1)'
                      }}
                    />
                  </div>
                </div>
              )}
              
              {/* Upload Options - Only file upload in degen mode */}
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

            {/* Title Input */}
            <div>
              <label className="text-white/80 white-mode:text-gray-700 text-sm mb-2 block font-medium">Title</label>
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="bg-background/50 white-mode:bg-gray-50 border-white/20 white-mode:border-gray-300 text-white white-mode:text-gray-800"
                placeholder="Enter banner title..."
              />
            </div>

            {/* Description Input */}
            <div>
              <label className="text-white/80 white-mode:text-gray-700 text-sm mb-2 block font-medium">Description</label>
              <Textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="bg-background/50 white-mode:bg-gray-50 border-white/20 white-mode:border-gray-300 text-white white-mode:text-gray-800 resize-none"
                placeholder="Enter banner description..."
                rows={3}
              />
            </div>

            {/* Category Input */}
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

export default BannersPortfolio;
