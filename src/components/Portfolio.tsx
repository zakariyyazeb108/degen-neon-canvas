
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowUpRight } from "lucide-react";

const Portfolio = () => {
  const portfolioItems = [
    {
      id: 1,
      title: "Quantum Labs",
      category: "Brand Identity",
      year: "2024",
      image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600&h=400&fit=crop&crop=center",
      description: "Complete visual identity system for AI-driven quantum computing startup. Minimalist approach with technological edge."
    },
    {
      id: 2,
      title: "DeFi Dashboard",
      category: "Interface Design",
      year: "2024",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center",
      description: "Sophisticated trading interface design focused on data visualization and user experience optimization."
    },
    {
      id: 3,
      title: "Nexus Campaign",
      category: "Digital Assets",
      year: "2024",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center",
      description: "High-impact marketing visuals for tech product launch. Clean aesthetics with strong conversion focus."
    },
    {
      id: 4,
      title: "Aurora Collective",
      category: "Brand Identity",
      year: "2023",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop&crop=center",
      description: "Luxury brand system design emphasizing elegance and premium positioning in competitive market."
    }
  ];

  return (
    <section id="portfolio" className="py-32 bg-background relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24 reveal-scale">
          <h2 className="text-5xl md:text-6xl font-light mb-8 text-balance">
            Selected <span className="gradient-text font-medium">Works</span>
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto font-light">
            Recent projects showcasing design excellence and strategic thinking
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {portfolioItems.map((item, index) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <div
                  className="reveal-up cursor-pointer group"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <Card className="premium-card overflow-hidden h-full">
                    <div className="relative">
                      {/* Image */}
                      <div className="aspect-[4/3] overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-8 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-blue-400 text-sm font-medium tracking-wide uppercase">
                            {item.category}
                          </span>
                          <span className="text-white/40 text-sm">
                            {item.year}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between group">
                          <h3 className="text-2xl font-medium text-white group-hover:text-blue-300 transition-colors duration-300">
                            {item.title}
                          </h3>
                          <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-blue-400 transition-colors duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </div>
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
                      <span className="text-blue-400 text-sm font-medium tracking-wide uppercase">
                        {item.category} • {item.year}
                      </span>
                      <h3 className="text-3xl font-medium gradient-text">
                        {item.title}
                      </h3>
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
    </section>
  );
};

export default Portfolio;
