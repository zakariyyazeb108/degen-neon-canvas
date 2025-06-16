
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Cog, Upload, X } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import ImageViewer from "@/components/ImageViewer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const BannersPortfolio = () => {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    title: string;
    description: string;
    category: string;
  } | null>(null);

  const [showDegenInput, setShowDegenInput] = useState(false);
  const [degenCode, setDegenCode] = useState("");
  const [isDegenMode, setIsDegenMode] = useState(false);
  const [editingCard, setEditingCard] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState("");

  const [banners, setBanners] = useState([
    {
      id: 1,
      title: "WealthCord",
      description: "Financial strategy mobile app banner with sleek green gradient design",
      image: "/lovable-uploads/05203f13-4871-45c1-ac98-43a86539f4a9.png",
      category: "Mobile App"
    },
    {
      id: 2,
      title: "Viralify",
      description: "Credit card payment app with glassmorphism design elements",
      image: "/lovable-uploads/c499cbcc-72b1-4929-84cf-d9c70792f6ea.png",
      category: "Fintech"
    },
    {
      id: 3,
      title: "Cash Club",
      description: "Trading education platform with modern dashboard showcase",
      image: "/lovable-uploads/cf39ab77-ca34-4acd-a81d-aa1e0a486053.png",
      category: "Education"
    },
    {
      id: 4,
      title: "Choose It Community",
      description: "Discord community banner with warm gradient and professional layout",
      image: "/lovable-uploads/b9081016-ba33-4317-b63d-98f1367a57d0.png",
      category: "Community"
    },
    {
      id: 5,
      title: "eMoney",
      description: "Financial app promotion with mobile-first design approach",
      image: "/lovable-uploads/a34c31fb-1b4e-4205-997b-eb653d12f542.png",
      category: "Mobile App"
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

  const openImageViewer = (banner: typeof banners[0]) => {
    if (isDegenMode) return; // Don't open viewer in degen mode
    setSelectedImage({
      src: banner.image,
      alt: banner.title,
      title: banner.title,
      description: banner.description,
      category: banner.category
    });
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
  };

  const startEditing = (banner: typeof banners[0]) => {
    setEditingCard(banner.id);
    setNewTitle(banner.title);
    setNewDescription(banner.description);
    setNewImage(banner.image);
  };

  const saveEdit = () => {
    setBanners(banners.map(banner => 
      banner.id === editingCard 
        ? { ...banner, title: newTitle, description: newDescription, image: newImage }
        : banner
    ));
    setEditingCard(null);
  };

  const cancelEdit = () => {
    setEditingCard(null);
    setNewTitle("");
    setNewDescription("");
    setNewImage("");
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
              <span className="gradient-text font-medium">Banner</span> Designs
            </h1>
            <p className="text-xl text-white/60 max-w-2xl font-light">
              Eye-catching banner designs that drive engagement and conversions across web and social platforms
            </p>
          </div>

          {/* Banner Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {banners.map((banner, index) => (
              <Card 
                key={banner.id} 
                className={`premium-card group overflow-hidden ${!isDegenMode ? 'cursor-pointer' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => !isDegenMode && openImageViewer(banner)}
              >
                <div className="relative">
                  {/* Banner Image */}
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={banner.image} 
                      alt={banner.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Overlay */}
                    {!isDegenMode && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <ExternalLink className="w-8 h-8 text-white" />
                      </div>
                    )}

                    {/* Degen Mode Edit Button */}
                    {isDegenMode && (
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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
                    
                    <h3 className="text-xl font-medium text-white mb-2 group-hover:text-primary/90 transition-colors">
                      {banner.title}
                    </h3>
                    
                    <p className="text-white/60 text-sm leading-relaxed">
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
                <div className="text-3xl font-bold gradient-text mb-2">20+</div>
                <div className="text-white/60 text-sm">Banner Designs</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">15+</div>
                <div className="text-white/60 text-sm">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">100%</div>
                <div className="text-white/60 text-sm">Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">24h</div>
                <div className="text-white/60 text-sm">Avg. Delivery</div>
              </div>
            </div>
          </div>
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

      {/* Edit Card Dialog */}
      <Dialog open={editingCard !== null} onOpenChange={() => cancelEdit()}>
        <DialogContent className="bg-background border-white/10 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Card Content</DialogTitle>
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
