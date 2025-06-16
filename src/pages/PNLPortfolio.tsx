import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";

const PNLPortfolio = () => {
  const pnlItems = [
    {
      id: 1,
      title: "Tesla Weekly PNL",
      description: "Weekly profit visualization for Tesla trading community",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop&crop=center",
      client: "Tesla Traders",
      year: "2024",
      type: "Trading PNL",
      profit: "+$127,540"
    },
    {
      id: 2,
      title: "Crypto Portfolio Gains",
      description: "Monthly cryptocurrency portfolio performance visualization",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop&crop=center",
      client: "Crypto Millionaires",
      year: "2024",
      type: "Crypto PNL",
      profit: "+$89,320"
    },
    {
      id: 3,
      title: "Forex Trading Results",
      description: "Daily forex trading results with detailed breakdown",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=600&fit=crop&crop=center",
      client: "FX Masters",
      year: "2024",
      type: "Forex PNL",
      profit: "+$45,780"
    },
    {
      id: 4,
      title: "Options Strategy PNL",
      description: "Complex options strategy performance visualization",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop&crop=center",
      client: "Options Elite",
      year: "2024",
      type: "Options PNL",
      profit: "+$156,890"
    },
    {
      id: 5,
      title: "Day Trading Summary",
      description: "Daily scalping results with trade-by-trade breakdown",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&crop=center",
      client: "Day Traders Club",
      year: "2023",
      type: "Day Trading",
      profit: "+$23,450"
    },
    {
      id: 6,
      title: "Swing Trading PNL",
      description: "Weekly swing trading performance with trend analysis",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&crop=center",
      client: "Swing Pros",
      year: "2023",
      type: "Swing Trading",
      profit: "+$67,230"
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
              <span className="gradient-text font-medium">PNL</span> Graphics
            </h1>
            <p className="text-xl text-white/60 max-w-2xl font-light">
              Profit & loss visualizations that clearly communicate trading performance and results
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pnlItems.map((item) => (
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
                            <span className="text-green-400 font-medium tracking-wide uppercase">
                              {item.type}
                            </span>
                            <span className="text-white/40">
                              {item.year}
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-medium text-white group-hover:text-green-300 transition-colors duration-300">
                            {item.title}
                          </h3>
                          <p className="text-white/50 text-sm">{item.client}</p>
                          <p className="text-green-400 text-sm font-bold">{item.profit}</p>
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
                          <span className="text-green-400 text-sm font-medium tracking-wide uppercase">
                            {item.type} • {item.year}
                          </span>
                          <span className="text-green-400 text-lg font-bold">{item.profit}</span>
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

export default PNLPortfolio;
