
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, Image, Monitor, TrendingUp, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Portfolio = () => {
  const [counts, setCounts] = useState({
    banners: 0,
    uiux: 0,
    pnl: 0,
    graphics: 0
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio_items')
          .select('item_type');

        if (error) throw error;

        const countsByType = data.reduce((acc, item) => {
          acc[item.item_type] = (acc[item.item_type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        setCounts({
          banners: countsByType.banner || 0,
          uiux: countsByType.uiux || 0,
          pnl: countsByType.pnl || 0,
          graphics: countsByType.graphics || 0
        });
      } catch (error) {
        console.error('Error fetching portfolio counts:', error);
      }
    };

    fetchCounts();
  }, []);

  const categories = [
    {
      id: "banners",
      title: "Banners",
      description: "Eye-catching banner designs for web and social media campaigns",
      icon: Image,
      count: `${counts.banners}+ Projects`,
      path: "/portfolio/banners"
    },
    {
      id: "uiux",
      title: "UI/UX Design",
      description: "Modern interfaces and user experiences that convert",
      icon: Monitor,
      count: `${counts.uiux}+ Projects`,
      path: "/portfolio/uiux"
    },
    {
      id: "pnl",
      title: "PNL Graphics",
      description: "Profit & loss visualizations for trading communities",
      icon: TrendingUp,
      count: `${counts.pnl}+ Graphics`,
      path: "/portfolio/pnl"
    },
    {
      id: "graphics",
      title: "Graphics Packs",
      description: "Complete visual packages for brands and campaigns",
      icon: Package,
      count: `${counts.graphics}+ Packs`,
      path: "/portfolio/graphics"
    }
  ];

  return (
    <section id="portfolio" className="py-32 bg-background relative overflow-hidden">
      {/* Simplified gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-light mb-8 text-balance">
            My <span className="gradient-text font-medium">Portfolio</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            Explore different categories of design work, each crafted with precision and creativity
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {categories.map((category, index) => (
            <Link 
              key={category.id} 
              to={category.path} 
              className="block group"
            >
              <Card className="premium-card p-8 h-full transition-transform duration-300 hover:scale-105">
                <div className="space-y-6 h-full flex flex-col">
                  
                  {/* Header section */}
                  <div className="flex items-start justify-between">
                    <div className="p-4 rounded-2xl bg-primary/10 backdrop-blur-sm border border-primary/20 transition-colors duration-300 group-hover:bg-primary/20">
                      <category.icon className="w-10 h-10 text-primary/80 group-hover:text-primary transition-colors duration-300" />
                    </div>
                    
                    <div className="text-right">
                      <span className="text-primary/70 font-medium text-sm block mb-2">
                        {category.count}
                      </span>
                      <ArrowUpRight className="w-6 h-6 text-primary/60 group-hover:text-primary/80 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4 flex-grow">
                    <h3 className="text-3xl font-medium text-white group-hover:text-primary/90 transition-colors duration-300">
                      {category.title}
                    </h3>
                    <p className="text-white/60 group-hover:text-white/80 leading-relaxed font-light transition-colors duration-300">
                      {category.description}
                    </p>
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="pt-4">
                    <div className="flex items-center justify-between text-xs text-primary/50 group-hover:text-primary/70 transition-colors duration-300 mb-3">
                      <span>View Portfolio</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                    </div>
                    
                    <div className="w-full h-px bg-primary/20">
                      <div className="h-full bg-primary/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
