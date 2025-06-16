
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface ImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  category: string;
}

const ImageViewer = ({ 
  isOpen, 
  onClose, 
  imageSrc, 
  imageAlt, 
  title, 
  description, 
  category 
}: ImageViewerProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 bg-background/95 backdrop-blur-sm border-white/10 [&>button]:hidden">
        <div className="relative">
          {/* Custom Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-black/50 p-2"
          >
            <X className="h-4 w-4 text-white" />
            <span className="sr-only">Close</span>
          </button>
          
          {/* Image */}
          <div className="relative">
            <img 
              src={imageSrc} 
              alt={imageAlt}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
          </div>
          
          {/* Image info */}
          <div className="p-6 border-t border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
                {category}
              </span>
            </div>
            <h3 className="text-xl font-medium text-white mb-2">
              {title}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageViewer;
