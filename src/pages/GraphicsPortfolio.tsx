import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";

const GraphicsPortfolio = () => {
  const graphicsItems = [
    {
      id: 1,
      title: "Gaming Brand Package",
      description: "Complete visual identity system for esports organization",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop&crop=center",
      client: "Pro Gaming Team",
      year: "2024",
      type: "Brand Package",
      items: "Logo, Jersey, Overlays, Social Templates"
    },
    {
      id: 2,
      title: "Crypto Project Pack",
      description: "Launch package for new cryptocurrency project",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop&crop=center",
      client: "DefiCoin",
      year: "2024",
      type: "Launch Package",
      items: "Website Graphics, Whitepaper Design, Social Kit"
    },
    {
      id: 3,
      title: "Fashion Brand Assets",
      description: "Seasonal campaign graphics package for luxury fashion brand",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&crop=center",
      client: "Luxe Couture",
      year: "2024",
      type: "Campaign Package",
      items: "Lookbook, Web Banners, Product Cards, Email Templates"
    },
    {
      id: 4,
      title: "Tech Startup Kit",
      description: "Complete visual package for AI technology startup",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop&crop=center",
      client: "AI Innovations",
      year: "2024",
      type: "Startup Package",
      items: "Pitch Deck, Brand Guidelines, Marketing Materials"
    },
    {
      id: 5,
      title: "Restaurant Brand Pack",
      description: "Full branding package for premium restaurant chain",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop&crop=center",
      client: "Gourmet Bistro",
      year: "2023",
      type: "Restaurant Package",
      items: "Menu Design, Signage, Digital Displays, Uniforms"
    },
    {
      id: 6,
      title: "Fitness Brand Assets",
      description: "Dynamic graphics package for fitness and wellness brand",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center",
      client: "FitLife Studios",
      year: "2023",
      type: "Wellness Package",
      items: "App Graphics, Merchandise, Workout Templates"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Navigation />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <Link to="/#portfolio" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-6">
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

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {graphicsItems.map((item) => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <div className="cursor-pointer group">
                    <Card className="premium-card overflow-hidden h-full">
                      <div className="relative">
                        <div className="aspect-[4/3] overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
                              <ExternalLink className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6 space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-orange-400 font-medium tracking-wide uppercase">
                              {item.type}
                            </span>
                            <span className="text-white/40">
                              {item.year}
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-medium text-white group-hover:text-orange-300 transition-colors duration-300">
                            {item.title}
                          </h3>
                          <p className="text-white/50 text-sm">{item.client}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </DialogTrigger>
                
                <DialogContent className="max-w-4xl bg-black/95 backdrop-blur-xl border-white/10">
                  <div className="grid md:grid-cols-2 gap-8">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-80 object-cover rounded-lg"
                    />
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-orange-400 text-sm font-medium tracking-wide uppercase">
                            {item.type} • {item.year}
                          </span>
                        </div>
                        <h3 className="text-3xl font-medium gradient-text">
                          {item.title}
                        </h3>
                        <p className="text-white/60 font-medium">{item.client}</p>
                      </div>
                      
                      <p className="text-white/70 leading-relaxed font-light">
                        {item.description}
                      </p>
                      
                      <div className="space-y-2">
                        <h4 className="text-white font-medium">Package Includes</h4>
                        <p className="text-white/60 text-sm">{item.items}</p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphicsPortfolio;
