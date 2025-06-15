
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
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      iconColor: "text-purple-400",
      hoverColor: "group-hover:text-purple-300",
      path: "/portfolio/banners"
    },
    {
      id: "uiux",
      title: "UI/UX Design",
      description: "Modern interfaces and user experiences that convert",
      icon: Monitor,
      count: "15+ Projects",
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      iconColor: "text-blue-400",
      hoverColor: "group-hover:text-blue-300",
      path: "/portfolio/uiux"
    },
    {
      id: "pnl",
      title: "PNL Graphics",
      description: "Profit & loss visualizations for trading communities",
      icon: TrendingUp,
      count: "30+ Graphics",
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      iconColor: "text-green-400",
      hoverColor: "group-hover:text-green-300",
      path: "/portfolio/pnl"
    },
    {
      id: "graphics",
      title: "Graphics Packs",
      description: "Complete visual packages for brands and campaigns",
      icon: Package,
      count: "20+ Packs",
      color: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30",
      iconColor: "text-orange-400",
      hoverColor: "group-hover:text-orange-300",
      path: "/portfolio/graphics"
    }
  ];

  return (
    <section id="portfolio" className="py-32 bg-background relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-light mb-8 text-balance">
            My <span className="gradient-text font-medium">Portfolio</span>
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto font-light">
            Explore different categories of design work, each crafted with precision and creativity
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {categories.map((category) => (
            <Link key={category.id} to={category.path} className="block group">
              <Card className={`premium-card p-8 h-full transition-all duration-700 hover:scale-105 bg-gradient-to-br ${category.color} border-2 ${category.borderColor} hover:${category.borderColor.replace('/30', '/50')}`}>
                <div className="space-y-6">
                  {/* Icon & Count */}
                  <div className="flex items-start justify-between">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${category.color} border ${category.borderColor}`}>
                      <category.icon className={`w-10 h-10 ${category.iconColor} transition-colors duration-500`} />
                    </div>
                    <div className="text-right">
                      <span className={`${category.iconColor} font-medium text-sm block`}>{category.count}</span>
                      <ArrowUpRight className={`w-5 h-5 text-white/40 ${category.hoverColor} transition-all duration-500 transform group-hover:translate-x-1 group-hover:-translate-y-1 mt-2`} />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className={`text-3xl font-medium text-white ${category.hoverColor} transition-colors duration-500`}>
                      {category.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed font-light">
                      {category.description}
                    </p>
                  </div>
                  
                  {/* Hover indicator */}
                  <div className="pt-4">
                    <div className={`w-full h-1 bg-gradient-to-r ${category.color.replace('/20', '/40')} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`}></div>
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
