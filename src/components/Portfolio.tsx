
import { Card } from "@/components/ui/card";
import { ArrowUpRight, Image, Monitor, TrendingUp, Package } from "lucide-react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const categories = [
    {
      id: "banners",
      title: "Banners",
      description: "Eye-catching banner designs for web and social media campaigns",
      icon: Image,
      count: "25+ Projects",
      primaryColor: "from-blue-600/20 via-blue-500/10 to-purple-600/20",
      accentColor: "from-blue-400 to-blue-300",
      glowColor: "shadow-blue-500/20",
      hoverGlow: "group-hover:shadow-blue-400/30",
      borderGradient: "bg-gradient-to-r from-blue-500/30 via-blue-400/20 to-purple-500/30",
      iconBg: "bg-gradient-to-br from-blue-500/15 to-purple-600/20",
      textAccent: "text-blue-300",
      hoverText: "group-hover:text-blue-200",
      path: "/portfolio/banners"
    },
    {
      id: "uiux",
      title: "UI/UX Design",
      description: "Modern interfaces and user experiences that convert",
      icon: Monitor,
      count: "15+ Projects",
      primaryColor: "from-blue-600/20 via-purple-500/10 to-blue-600/20",
      accentColor: "from-blue-400 to-purple-300",
      glowColor: "shadow-blue-500/20",
      hoverGlow: "group-hover:shadow-blue-400/30",
      borderGradient: "bg-gradient-to-r from-blue-500/30 via-purple-400/20 to-blue-500/30",
      iconBg: "bg-gradient-to-br from-blue-500/15 to-purple-600/20",
      textAccent: "text-blue-300",
      hoverText: "group-hover:text-blue-200",
      path: "/portfolio/uiux"
    },
    {
      id: "pnl",
      title: "PNL Graphics",
      description: "Profit & loss visualizations for trading communities",
      icon: TrendingUp,
      count: "30+ Graphics",
      primaryColor: "from-purple-600/20 via-blue-500/10 to-purple-600/20",
      accentColor: "from-purple-400 to-blue-300",
      glowColor: "shadow-purple-500/20",
      hoverGlow: "group-hover:shadow-purple-400/30",
      borderGradient: "bg-gradient-to-r from-purple-500/30 via-blue-400/20 to-purple-500/30",
      iconBg: "bg-gradient-to-br from-purple-500/15 to-blue-600/20",
      textAccent: "text-purple-300",
      hoverText: "group-hover:text-purple-200",
      path: "/portfolio/pnl"
    },
    {
      id: "graphics",
      title: "Graphics Packs",
      description: "Complete visual packages for brands and campaigns",
      icon: Package,
      count: "20+ Packs",
      primaryColor: "from-purple-600/20 via-purple-500/10 to-blue-600/20",
      accentColor: "from-purple-400 to-blue-300",
      glowColor: "shadow-purple-500/20",
      hoverGlow: "group-hover:shadow-purple-400/30",
      borderGradient: "bg-gradient-to-r from-purple-500/30 via-purple-400/20 to-blue-500/30",
      iconBg: "bg-gradient-to-br from-purple-500/15 to-blue-600/20",
      textAccent: "text-purple-300",
      hoverText: "group-hover:text-purple-200",
      path: "/portfolio/graphics"
    }
  ];

  return (
    <section id="portfolio" className="py-32 bg-background relative overflow-hidden">
      {/* Advanced background with moving gradients */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Geometric grid overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100px_100px] animate-[drift_30s_linear_infinite]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-light mb-8 text-balance">
            My <span className="gradient-text font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">Portfolio</span>
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
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className={`
                relative overflow-hidden p-8 h-full
                bg-gradient-to-br ${category.primaryColor}
                backdrop-blur-xl border-0
                shadow-2xl ${category.glowColor} ${category.hoverGlow}
                transition-all duration-700 ease-out
                hover:scale-[1.02] hover:-translate-y-2
                transform-gpu perspective-1000
                before:absolute before:inset-0 before:opacity-0 before:bg-gradient-to-r before:from-white/5 before:via-white/10 before:to-white/5
                hover:before:opacity-100 before:transition-opacity before:duration-700
                after:absolute after:inset-0 after:bg-gradient-to-br after:${category.primaryColor} after:opacity-0
                hover:after:opacity-20 after:transition-opacity after:duration-700
              `}>
                
                {/* Advanced border gradient */}
                <div className="absolute inset-0 rounded-lg p-[1px] bg-gradient-to-r from-white/20 via-white/5 to-white/20 group-hover:from-white/30 group-hover:via-white/10 group-hover:to-white/30 transition-all duration-700">
                  <div className="w-full h-full rounded-lg bg-transparent"></div>
                </div>

                {/* Floating particles effect */}
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-float opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
                  <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white/30 rounded-full animate-float opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300"></div>
                  <div className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-white/10 rounded-full animate-float opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-500"></div>
                </div>

                {/* Content wrapper with advanced animations */}
                <div className="relative z-10 space-y-6 h-full flex flex-col">
                  
                  {/* Header section with icon and count */}
                  <div className="flex items-start justify-between">
                    <div className={`
                      relative p-4 rounded-2xl ${category.iconBg}
                      backdrop-blur-sm border border-white/10
                      shadow-lg transform transition-all duration-500
                      group-hover:scale-110 group-hover:rotate-3
                      before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0
                      group-hover:before:opacity-100 before:transition-opacity before:duration-500
                    `}>
                      <category.icon className={`
                        w-10 h-10 ${category.textAccent} ${category.hoverText}
                        transition-all duration-500 relative z-10
                        drop-shadow-lg group-hover:drop-shadow-xl
                      `} />
                      
                      {/* Icon glow effect */}
                      <div className={`
                        absolute inset-0 rounded-2xl bg-gradient-to-br ${category.accentColor}
                        opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700
                      `}></div>
                    </div>
                    
                    <div className="text-right transform transition-all duration-500 group-hover:translate-x-1">
                      <span className={`
                        ${category.textAccent} ${category.hoverText} font-medium text-sm block
                        transition-colors duration-500
                      `}>
                        {category.count}
                      </span>
                      <ArrowUpRight className={`
                        w-6 h-6 text-white/40 ${category.hoverText} mt-2
                        transition-all duration-700 transform
                        group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:scale-110
                        drop-shadow-lg
                      `} />
                    </div>
                  </div>
                  
                  {/* Main content section */}
                  <div className="space-y-4 flex-grow">
                    <h3 className={`
                      text-3xl font-medium text-white ${category.hoverText}
                      transition-all duration-500 transform
                      group-hover:translate-x-1
                      bg-gradient-to-r ${category.accentColor} bg-clip-text group-hover:text-transparent
                    `}>
                      {category.title}
                    </h3>
                    <p className="text-white/70 group-hover:text-white/90 leading-relaxed font-light transition-colors duration-500 transform group-hover:translate-x-1">
                      {category.description}
                    </p>
                  </div>
                  
                  {/* Advanced progress indicator */}
                  <div className="pt-4 space-y-3">
                    <div className="flex items-center justify-between text-xs text-white/40 group-hover:text-white/60 transition-colors duration-500">
                      <span>View Portfolio</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">→</span>
                    </div>
                    
                    {/* Multi-layered progress bar */}
                    <div className="relative">
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className={`
                          h-full bg-gradient-to-r ${category.accentColor} rounded-full
                          transform scale-x-0 group-hover:scale-x-100 
                          transition-transform duration-700 origin-left
                          shadow-lg shadow-current/50
                        `}></div>
                      </div>
                      
                      {/* Glow effect for progress bar */}
                      <div className={`
                        absolute inset-0 h-1 bg-gradient-to-r ${category.accentColor} rounded-full
                        opacity-0 group-hover:opacity-30 blur-sm
                        transition-opacity duration-700
                      `}></div>
                    </div>
                  </div>
                </div>

                {/* Advanced hover overlay with gradient mesh */}
                <div className={`
                  absolute inset-0 opacity-0 group-hover:opacity-100
                  bg-gradient-to-br from-white/5 via-transparent to-white/10
                  transition-opacity duration-700 pointer-events-none
                `}></div>
                
                {/* Corner accent decoration */}
                <div className={`
                  absolute top-0 right-0 w-32 h-32
                  bg-gradient-to-bl ${category.accentColor} opacity-0 group-hover:opacity-10
                  transition-opacity duration-700 blur-3xl
                `}></div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
