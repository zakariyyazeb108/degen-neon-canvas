
const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 reveal">
            <h2 className="text-4xl md:text-5xl font-bold">
              Who's <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-pink">Degen?</span>
            </h2>
            
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                I'm a self-taught visual designer focused on digital design with over 3 years of experience crafting standout visuals for clients and creators.
              </p>
              
              <p>
                My passion lies in creating designs that not only look incredible but also drive results. Whether it's a banner that stops the scroll, a PNL that communicates success, or a UI that users love to interact with.
              </p>
              
              <p>
                I believe great design should be both beautiful and functional – that's the philosophy behind every project I take on.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {['Photoshop', 'Figma', 'After Effects', 'Illustrator'].map((skill) => (
                <span 
                  key={skill}
                  className="px-4 py-2 bg-secondary border border-border rounded-full text-sm font-medium hover:border-neon-purple/50 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="reveal relative">
            <div className="relative">
              {/* Floating design elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-neon-purple/20 rounded-full blur-xl animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-neon-pink/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
              
              {/* Main image placeholder */}
              <div className="relative z-10 h-96 bg-gradient-to-br from-secondary to-card rounded-2xl flex items-center justify-center border border-border">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-neon-purple/20 rounded-full flex items-center justify-center mx-auto">
                    <div className="w-8 h-8 bg-neon-purple rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-gray-400 font-medium">Creative Mind at Work</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
