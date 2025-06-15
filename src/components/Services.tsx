
import { Card } from "@/components/ui/card";
import { Image, Zap, Monitor } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Image,
      title: "Banners",
      description: "Custom-made banners designed to catch eyes instantly.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop&crop=center"
    },
    {
      icon: Zap,
      title: "PNLs",
      description: "Polished promo visuals that deliver results.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop&crop=center"
    },
    {
      icon: Monitor,
      title: "Web UI/UX",
      description: "Interfaces that are both functional and aesthetic.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&crop=center"
    }
  ];

  return (
    <section id="services" className="py-20 bg-background relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal-scale">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What I <span className="gradient-text">Create</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Specialized services tailored for modern digital needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className="bg-card/80 backdrop-blur-sm border-border hover:border-neon-purple/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl group reveal-up tilt glass shimmer"
              data-animation="slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="p-6 space-y-4">
                <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 p-3 bg-gradient-to-r from-neon-purple/30 to-neon-pink/30 rounded-full backdrop-blur-sm glass neon-glow">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-neon-purple group-hover:to-neon-pink transition-all duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
