
import { Card } from "@/components/ui/card";
import { Palette, Zap, Monitor, Layers } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Palette,
      title: "Brand Identity",
      description: "Complete visual systems that tell your story with precision and impact.",
      features: ["Logo Design", "Brand Guidelines", "Visual Systems", "Color Palettes"],
      price: "From $500"
    },
    {
      icon: Zap,
      title: "Digital Assets",
      description: "High-conversion visuals designed to capture attention and drive results.",
      features: ["PNL Graphics", "Social Media", "Campaign Assets", "Marketing Materials"],
      price: "From $150"
    },
    {
      icon: Monitor,
      title: "UI/UX Design",
      description: "User experiences that balance beautiful aesthetics with flawless functionality.",
      features: ["Web Design", "Mobile UI", "Prototypes", "User Research"],
      price: "From $800"
    },
    {
      icon: Layers,
      title: "Custom Projects",
      description: "Tailored design solutions for unique challenges and creative visions.",
      features: ["Consultation", "Custom Work", "Ongoing Support", "Revisions"],
      price: "Contact"
    }
  ];

  return (
    <section id="services" className="py-32 premium-gradient relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24 reveal-scale">
          <h2 className="text-5xl md:text-6xl font-light mb-8 text-balance">
            What I <span className="gradient-text font-medium">Create</span>
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto font-light">
            Specialized services designed to elevate your brand and digital presence
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="reveal-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <Card className="premium-card p-8 h-full group">
                <div className="space-y-6">
                  {/* Icon & Price */}
                  <div className="flex items-start justify-between">
                    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-400/5 border border-blue-400/20">
                      <service.icon className="w-8 h-8 text-blue-400" />
                    </div>
                    <span className="text-blue-400 font-medium text-sm">{service.price}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-medium text-white group-hover:text-blue-300 transition-colors duration-500">
                      {service.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed font-light text-sm">
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
