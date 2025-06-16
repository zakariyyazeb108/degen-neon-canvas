import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";

const UIUXPortfolio = () => {
  const uiuxItems = [
    {
      id: 1,
      title: "DeFi Trading Platform",
      description: "Complete UX redesign for decentralized trading platform with focus on usability",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center",
      client: "DeFi Exchange",
      year: "2024",
      type: "Web Application",
      result: "400% user engagement increase"
    },
    {
      id: 2,
      title: "Mobile Banking App",
      description: "Modern mobile banking interface with enhanced security features",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&crop=center",
      client: "FinBank",
      year: "2024",
      type: "Mobile App",
      result: "250% user satisfaction"
    },
    {
      id: 3,
      title: "E-learning Platform",
      description: "Educational platform design focused on student engagement and learning outcomes",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop&crop=center",
      client: "EduTech Pro",
      year: "2024",
      type: "Web Platform",
      result: "180% completion rates"
    },
    {
      id: 4,
      title: "Healthcare Dashboard",
      description: "Medical dashboard for healthcare professionals with real-time patient data",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&crop=center",
      client: "MedTech Solutions",
      year: "2023",
      type: "Dashboard",
      result: "300% workflow efficiency"
    },
    {
      id: 5,
      title: "Social Media App",
      description: "Next-generation social platform with AR integration and enhanced privacy",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&crop=center",
      client: "Social Connect",
      year: "2023",
      type: "Mobile App",
      result: "500% user growth"
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
              <span className="gradient-text font-medium">UI/UX</span> Design
            </h1>
            <p className="text-xl text-white/60 max-w-2xl font-light">
              User experiences that balance beautiful aesthetics with flawless functionality
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {uiuxItems.map((item) => (
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
                            <span className="text-blue-400 font-medium tracking-wide uppercase">
                              {item.type}
                            </span>
                            <span className="text-white/40">
                              {item.year}
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-medium text-white group-hover:text-blue-300 transition-colors duration-300">
                            {item.title}
                          </h3>
                          <p className="text-white/50 text-sm">{item.client}</p>
                          <p className="text-green-400 text-xs font-medium">{item.result}</p>
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
                            {item.type} • {item.year}
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

export default UIUXPortfolio;
