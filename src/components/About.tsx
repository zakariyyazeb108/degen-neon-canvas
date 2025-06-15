
const About = () => {
  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "3+", label: "Years Experience" },
    { number: "25+", label: "Happy Clients" },
    { number: "99%", label: "Client Satisfaction" }
  ];

  const skills = [
    { name: "Photoshop", level: 95 },
    { name: "Figma", level: 90 },
    { name: "After Effects", level: 85 },
    { name: "Illustrator", level: 88 },
    { name: "Brand Strategy", level: 80 },
    { name: "UI/UX Design", level: 92 }
  ];

  return (
    <section id="about" className="py-32 premium-gradient">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20 scroll-animate fade-up">
            <h2 className="text-5xl md:text-6xl font-light mb-8 text-balance">
              About <span className="gradient-text font-medium">Degen</span>
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto font-light">
              The designer behind the visuals that convert
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Content */}
            <div className="space-y-8 scroll-animate fade-left">
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p>
                  I'm a self-taught visual designer with <span className="text-blue-400 font-medium">3+ years of experience</span> crafting 
                  standout visuals for clients across crypto, gaming, and tech industries.
                </p>
                
                <p>
                  My specialty? Creating designs that don't just look incredible — they <span className="text-blue-400 font-medium">drive results</span>. 
                  Whether it's a banner that stops the scroll, a PNL that communicates success, 
                  or a UI that users love to interact with.
                </p>
                
                <p>
                  I believe great design should be both <span className="text-blue-400 font-medium">beautiful and functional</span> — 
                  that's the philosophy behind every project I take on.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center scroll-animate scale-up">
                    <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                    <div className="text-white/60 text-sm font-light">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Skills */}
            <div className="scroll-animate fade-right">
              <div className="premium-card p-8">
                <h3 className="text-2xl font-medium text-white mb-8">Skills & Expertise</h3>
                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/80 font-medium">{skill.name}</span>
                        <span className="text-blue-400">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: `${skill.level}%`,
                            animationDelay: `${index * 0.1}s`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy */}
          <div className="text-center scroll-animate fade-up">
            <div className="max-w-4xl mx-auto premium-card p-12">
              <h3 className="text-3xl font-medium gradient-text mb-6">Design Philosophy</h3>
              <p className="text-xl text-white/70 leading-relaxed font-light">
                "Every pixel has a purpose. Every color tells a story. Every design decision should drive your business forward. 
                I don't just create pretty pictures — I craft visual solutions that convert browsers into buyers."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
