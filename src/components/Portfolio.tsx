
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowUpRight, ExternalLink } from "lucide-react";

const Portfolio = () => {
  const portfolioItems = [
    {
      id: 1,
      title: "CryptoFlow Dashboard",
      category: "UI/UX Design",
      year: "2024",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center",
      description: "Complete trading interface redesign with focus on data visualization and user experience. Increased user engagement by 340% and reduced bounce rate significantly.",
      technologies: ["Figma", "Prototyping", "User Research"],
      client: "FinTech Startup",
      result: "+340% engagement"
    },
    {
      id: 2,
      title: "Nexus Brand Identity",
      category: "Brand Design",
      year: "2024",
      image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=600&fit=crop&crop=center",
      description: "Complete visual identity system for AI-driven quantum computing company. Modern, tech-forward design that communicates innovation and reliability.",
      technologies: ["Illustrator", "Photoshop", "Brand Strategy"],
      client: "Tech Corporation",
      result: "Brand recognition +250%"
    },
    {
      id: 3,
      title: "Aurora Marketing Campaign",
      category: "Digital Assets",
      year: "2024",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
      description: "High-impact marketing visuals for luxury product launch. Clean aesthetics with strong conversion focus that drove exceptional results.",
      technologies: ["Photoshop", "After Effects", "Campaign Design"],
      client: "Luxury Brand",
      result: "Conversion +180%"
    },
    {
      id: 4,
      title: "Tesla PNL Graphics",
      category: "Trading Graphics",
      year: "2024",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop&crop=center",
      description: "Series of profit & loss graphics for Tesla trading community. Bold, modern design that clearly communicates financial performance.",
      technologies: ["Photoshop", "Data Visualization"],
      client: "Trading Community",
      result: "Viral engagement"
    },
    {
      id: 5,
      title: "DeFi Protocol Interface",
      category: "UI/UX Design",
      year: "2023",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop&crop=center",
      description: "User interface design for decentralized finance protocol. Focus on simplifying complex financial operations for mainstream adoption.",
      technologies: ["Figma", "User Testing", "Prototyping"],
      client: "DeFi Protocol",
      result: "User adoption +400%"
    },
    {
      id: 6,
      title: "Gaming Brand Package",
      category: "Brand Design",
      year: "2023",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop&crop=center",
      description: "Complete brand package for esports organization including logo, jerseys, social media templates, and streaming overlays.",
      technologies: ["Illustrator", "Photoshop", "Brand Guidelines"],
      client: "Esports Team",
      result: "Sponsorship deals +300%"
    }
  ];

  return (
    <section id="portfolio" className="py-32 bg-background relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24 reveal-scale">
          <h2 className="text-5xl md:text-6xl font-light mb-8 text-balance">
            Featured <span className="gradient-text font-medium">Work</span>
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto font-light">
            Recent projects that showcase design excellence and measurable results
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {portfolioItems.map((item, index) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <div
                  className="reveal-up cursor-pointer group"
                  style={{ animationDelay: `${index * 0.1}s` }}
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
                            <ExternalLink className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-blue-400 text-xs font-medium tracking-wide uppercase">
                            {item.category}
                          </span>
                          <span className="text-white/40 text-xs">
                            {item.year}
                          </span>
                        </div>
                        
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-white group-hover:text-blue-300 transition-colors duration-300 line-clamp-1">
                              {item.title}
                            </h3>
                            <p className="text-white/50 text-sm mt-1">{item.client}</p>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-blue-400 transition-colors duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0 mt-1" />
                        </div>
                        
                        <div className="pt-2">
                          <span className="text-xs text-green-400 font-medium">{item.result}</span>
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
                      <div className="flex items-center justify-between">
                        <span className="text-blue-400 text-sm font-medium tracking-wide uppercase">
                          {item.category} • {item.year}
                        </span>
                        <span className="text-green-400 text-sm font-medium">{item.result}</span>
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
                      <h4 className="text-white font-medium">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.map((tech, idx) => (
                          <span key={idx} className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/70">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
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
