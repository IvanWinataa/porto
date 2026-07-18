import GlassCard from '../components/GlassCard';

export default function About() {
  const skills = [
    'React.js', 'Next.js', 'Node.js', 'Express',
    'PostgreSQL', 'TailwindCSS', 'TypeScript', 'Figma'
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-primary font-mono text-xl mr-2">01.</span>
            About Me
          </h2>
          <div className="h-px bg-white/10 flex-grow max-w-xs"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-gray-300 space-y-6 leading-relaxed text-lg">
            <p>
              Hello! I am a passionate developer who loves creating beautiful and highly functional digital experiences on the web. 
            </p>
            <p>
              My journey started with a deep interest in UI/UX design, which evolved into a full-stack engineering career. Today, I specialize in building scalable web applications using the latest web technologies.
            </p>
            <p>
              I believe in clean code, premium design aesthetics, and products that provide true value to users.
            </p>
          </div>
          
          <div>
            <GlassCard className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-[50px] pointer-events-none"></div>
              <h3 className="text-xl font-semibold mb-6">Tech Stack</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="font-mono text-sm bg-white/5 border border-white/10 px-3 py-1.5 rounded hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
