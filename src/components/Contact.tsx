
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-secondary/30 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-purple rounded-full blur-3xl animate-glow"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-pink">Together</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Have a project or idea? Reach out through Discord and let's create something amazing.
            </p>
          </div>
          
          <Card className="bg-card/50 backdrop-blur-sm border-border max-w-2xl mx-auto reveal">
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-white">Ready to Start?</h3>
                <p className="text-gray-400">
                  I'm always excited to work on new projects and collaborate with creative minds. 
                  Drop me a message and let's discuss your vision.
                </p>
              </div>
              
              <Button 
                size="lg"
                className="w-full bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-purple text-white py-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105 neon-glow"
              >
                DM Me on Discord
              </Button>
              
              <p className="text-sm text-gray-500">
                Discord: @degen.designs (placeholder)
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
