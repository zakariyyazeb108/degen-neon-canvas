
import { Card } from "@/components/ui/card";
import { Monitor, Package, TrendingUp, Image } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Monitor,
      title: "UI/UX",
      description: "User experiences that balance beautiful aesthetics with flawless functionality.",
      features: ["Web Design", "Mobile UI", "Prototypes", "User Research"]
    },
    {
      icon: Package,
      title: "Graphics Packs",
      description: "Complete visual packages for brands and campaigns with consistent design systems.",
      features: ["Brand Packages", "Social Media Kits", "Marketing Materials", "Visual Guidelines"]
    },
    {
      icon: TrendingUp,
      title: "PNL's",
      description: "Profit & loss visualizations for trading communities that clearly communicate performance.",
      features: ["Trading Results", "Performance Charts", "Portfolio Graphics", "Social Shares"]
    },
    {
      icon: Image,
      title: "Banners",
      description: "Eye-catching banner designs for web and social media campaigns that convert.",
      features: ["Web Banners", "Social Media", "Display Ads", "Campaign Assets"]
    }
  ];

  return (
    <section id="services" className="py-32 premium-gradient relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-light mb-8 text-balance text-white white-mode:text-gray-900">
            What I <span className="gradient-text font-medium">Create</span>
          </h2>
          <p className="text-xl text-white/50 white-mode:text-gray-600 max-w-2xl mx-auto font-light">
            Specialized services designed to elevate your brand and digital presence
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div key={service.title}>
              <Card className="premium-card p-8 h-full group">
                <div className="space-y-6">
                  {/* Icon */}
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-400/5 border border-blue-400/20">
                    <service.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-medium text-white white-mode:text-gray-800 group-hover:text-blue-300 white-mode:group-hover:text-blue-600 transition-colors duration-500">
                      {service.title}
                    </h3>
                    <p className="text-white/60 white-mode:text-gray-600 leading-relaxed font-light text-sm">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-white/40 white-mode:text-gray-600 text-sm font-light flex items-center">
                        <div className="w-1 h-1 bg-blue-400/50 white-mode:bg-blue-500/50 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
