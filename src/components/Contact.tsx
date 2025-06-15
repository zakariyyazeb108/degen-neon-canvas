
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Mail, Clock, DollarSign } from "lucide-react";

const Contact = () => {
  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Discord",
      description: "Fastest response time",
      value: "@degendesigns",
      action: "Send Message"
    },
    {
      icon: Mail,
      title: "Email",
      description: "For detailed inquiries",
      value: "hello@degendesigns.com",
      action: "Send Email"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery Call",
      description: "We discuss your project, goals, and vision"
    },
    {
      step: "02", 
      title: "Proposal & Quote",
      description: "Detailed project scope and transparent pricing"
    },
    {
      step: "03",
      title: "Design & Iterate", 
      description: "I create your designs with regular feedback loops"
    },
    {
      step: "04",
      title: "Final Delivery",
      description: "High-quality files and ongoing support"
    }
  ];

  return (
    <section id="contact" className="py-32 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20 reveal-scale">
            <h2 className="text-5xl md:text-6xl font-light mb-8 text-balance">
              Let's Create <span className="gradient-text font-medium">Together</span>
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto font-light">
              Ready to elevate your brand with designs that convert? Let's discuss your project.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            {/* Contact Methods */}
            <div className="space-y-8 reveal-left">
              <div>
                <h3 className="text-2xl font-medium text-white mb-6">Get in Touch</h3>
                <p className="text-white/60 leading-relaxed mb-8">
                  I'm always excited to work on new projects and collaborate with creative minds. 
                  Choose your preferred method to start the conversation.
                </p>
              </div>

              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <Card key={method.title} className="premium-card p-6 group cursor-pointer hover:border-blue-400/30">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-400/5 border border-blue-400/20">
                        <method.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-white group-hover:text-blue-300 transition-colors">
                          {method.title}
                        </h4>
                        <p className="text-white/50 text-sm">{method.description}</p>
                        <p className="text-blue-400 font-medium">{method.value}</p>
                      </div>
                      <Button size="sm" className="premium-button">
                        {method.action}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="premium-card p-4 text-center">
                  <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <p className="text-white/80 font-medium">Response Time</p>
                  <p className="text-white/50 text-sm">Under 24 hours</p>
                </Card>
                <Card className="premium-card p-4 text-center">
                  <DollarSign className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <p className="text-white/80 font-medium">Starting From</p>
                  <p className="text-white/50 text-sm">$150</p>
                </Card>
              </div>
            </div>

            {/* Process */}
            <div className="reveal-right">
              <h3 className="text-2xl font-medium text-white mb-8">How We Work</h3>
              <div className="space-y-6">
                {processSteps.map((step, index) => (
                  <div key={step.step} className="flex space-x-4 group">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-400/10 border border-blue-400/30 flex items-center justify-center">
                        <span className="text-blue-400 font-bold text-sm">{step.step}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-medium text-white group-hover:text-blue-300 transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-white/60 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center reveal-up">
            <Card className="premium-card p-12 max-w-3xl mx-auto">
              <h3 className="text-3xl font-medium gradient-text mb-4">Ready to Start?</h3>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                Join 25+ satisfied clients who've transformed their brands with premium design. 
                Let's discuss how I can help you achieve your goals.
              </p>
              <Button size="lg" className="premium-button px-12 py-6 text-lg">
                Start Your Project Today
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
