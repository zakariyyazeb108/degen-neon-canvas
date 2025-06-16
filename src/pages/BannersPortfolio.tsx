import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";

const BannersPortfolio = () => {
  const bannerItems = [
    {
      id: 1,
      title: "Crypto Exchange Banner",
      description: "High-conversion banner for cryptocurrency trading platform",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop&crop=center",
      client: "CryptoTrade Pro",
      year: "2024",
      type: "Web Banner"
    },
    {
      id: 2,
      title: "Fashion Brand Campaign",
      description: "Luxury fashion banner series for seasonal campaign",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop&crop=center",
      client: "Luxe Fashion",
      year: "2024",
      type: "Social Media"
    },
    {
      id: 3,
      title: "Tech Startup Launch",
      description: "Launch campaign banners for AI startup",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop&crop=center",
      client: "AI Innovations",
      year: "2024",
      type: "Display Ads"
    },
    {
      id: 4,
      title: "E-commerce Sale Banner",
      description: "Black Friday sale banners with high conversion rates",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop&crop=center",
      client: "ShopMax",
      year: "2023",
      type: "Promotional"
    },
    {
      id: 5,
      title: "Gaming Tournament",
      description: "Esports tournament banner series",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop&crop=center",
      client: "GameFest",
      year: "2023",
      type: "Event Banner"
    },
    {
      id: 6,
      title: "Health & Wellness",
      description: "Clean, modern banners for wellness brand",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop&crop=center",
      client: "WellLife",
      year: "2023",
      type: "Brand Campaign"
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
              <span className="gradient-text font-medium">Banner</span> Designs
            </h1>
            <p className="text-xl text-white/60 max-w-2xl font-light">
              Eye-catching banner designs that drive engagement and conversions across web and social platforms
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bannerItems.map((item) => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <div className="cursor-pointer group">
                    <Card className="premium-card overflow-hidden h-full">
                      <div className="relative">
                        <div className="aspect-[2/1] overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
                            <span className="text-purple-400 font-medium tracking-wide uppercase">
                              {item.type}
                            </span>
                            <span className="text-white/40">
                              {item.year}
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-medium text-white group-hover:text-purple-300 transition-colors duration-300">
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
                          <span className="text-purple-400 text-sm font-medium tracking-wide uppercase">
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

export default BannersPortfolio;
