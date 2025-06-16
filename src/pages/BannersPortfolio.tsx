
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";

const BannersPortfolio = () => {
  const banners = [
    {
      id: 1,
      title: "WealthCord",
      description: "Financial strategy mobile app banner with sleek green gradient design",
      image: "/lovable-uploads/05203f13-4871-45c1-ac98-43a86539f4a9.png",
      category: "Mobile App"
    },
    {
      id: 2,
      title: "Virality",
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
    },
    {
      id: 6,
      title: "Cash Club Duplicate",
      description: "Alternative version of the trading education platform banner",
      image: "/lovable-uploads/63b63796-9613-4289-aab7-e27542cc5cc5.png",
      category: "Education"
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
                className="premium-card group overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
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
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <ExternalLink className="w-8 h-8 text-white" />
                    </div>
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
                <div className="text-3xl font-bold gradient-text mb-2">25+</div>
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
    </div>
  );
};

export default BannersPortfolio;
