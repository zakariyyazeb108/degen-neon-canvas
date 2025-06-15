
import { Card } from "@/components/ui/card";
import { Image, Zap, Monitor } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Image,
      title: "Visual Identity",
      description: "Brand systems that communicate with clarity and impact.",
      features: ["Logo Design", "Brand Guidelines", "Visual Systems"]
    },
    {
      icon: Zap,
      title: "Digital Assets",
      description: "High-conversion visuals for modern marketing needs.",
      features: ["PNL Graphics", "Social Media", "Campaign Assets"]
    },
    {
      icon: Monitor,
      title: "Interface Design",
      description: "User experiences that balance function with beauty.",
      features: ["Web Design", "Mobile UI", "Prototypes"]
    }
  ];

  return (
    <section id="services" className="py-32 premium-gradient relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24 reveal-scale">
          <h2 className="text-5xl md:text-6xl font-light mb-8 text-balance">
            What I <span className="gradient-text font-medium">Craft</span>
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto font-light">
            Focused expertise in three core areas of digital design
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="reveal-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <Card className="premium-card p-8 h-full group">
                <div className="space-y-8">
                  {/* Icon */}
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-400/5 border border-blue-400/20">
                    <service.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-medium text-white group-hover:text-blue-300 transition-colors duration-500">
                      {service.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-white/40 text-sm font-light flex items-center">
                        <div className="w-1 h-1 bg-blue-400/50 rounded-full mr-3"></div>
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
