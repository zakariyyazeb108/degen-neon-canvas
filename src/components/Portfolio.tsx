
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Portfolio = () => {
  const portfolioItems = [
    {
      id: 1,
      title: "Brand Banner Design",
      category: "Banner",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=400&fit=crop&crop=center",
      description: "Modern banner design for tech startup with cutting-edge aesthetics"
    },
    {
      id: 2,
      title: "E-commerce UI",
      category: "UI/UX",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=400&fit=crop&crop=center",
      description: "Clean and intuitive e-commerce interface with seamless user experience"
    },
    {
      id: 3,
      title: "Crypto PNL Dashboard",
      category: "PNL",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=400&fit=crop&crop=center",
      description: "Professional trading dashboard design with real-time data visualization"
    },
    {
      id: 4,
      title: "Social Media Banner",
      category: "Banner",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=400&fit=crop&crop=center",
      description: "Eye-catching social media campaign that drives engagement"
    },
    {
      id: 5,
      title: "Mobile App Interface",
      category: "UI/UX",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=400&fit=crop&crop=center",
      description: "Sleek mobile application design with intuitive navigation"
    },
    {
      id: 6,
      title: "Investment Portfolio",
      category: "PNL",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=500&h=400&fit=crop&crop=center",
      description: "Professional investment tracking interface with comprehensive analytics"
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-secondary/30 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal-scale">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="gradient-text pulse-glow">Work</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A showcase of recent projects and creative solutions
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {portfolioItems.map((item, index) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <Card 
                  className="bg-card/80 backdrop-blur-sm border-border hover:border-neon-purple/50 transition-all duration-500 transform hover:scale-105 cursor-pointer group reveal-up overflow-hidden glass shimmer"
                  data-animation="slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/10 to-neon-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-neon-purple to-neon-pink text-white text-sm rounded-full mb-2 glass">
                        {item.category}
                      </span>
                      <h3 className="text-white font-semibold text-lg gradient-text">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl bg-card/95 backdrop-blur-sm border-border glass">
                <div className="grid md:grid-cols-2 gap-6">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                  <div className="space-y-4">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 text-neon-purple text-sm rounded-full glass">
                      {item.category}
                    </span>
                    <h3 className="text-2xl font-bold gradient-text">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
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
