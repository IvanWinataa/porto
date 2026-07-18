import GlassCard from '../components/GlassCard';

export default function About() {
  const row1 = [
    {
      name: 'React.js',
      color: 'text-[#61DAFB]',
      icon: (
        <svg className="w-6 h-6" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
          <g stroke="currentColor" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      )
    },
    {
      name: 'Next.js',
      color: 'text-white',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="90" cy="90" r="90" fill="black" stroke="white" strokeWidth="6"/>
          <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V68.7444L137.669 160.528C141.879 159.619 145.845 158.599 149.508 157.52Z" fill="white"/>
          <path d="M115 54H127V126H115V54Z" fill="white"/>
        </svg>
      )
    },
    {
      name: 'Node.js',
      color: 'text-[#339933]',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      name: 'Express',
      color: 'text-gray-400',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  const row2 = [
    {
      name: 'PostgreSQL',
      color: 'text-[#4169E1]',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7V4a2 2 0 012-2h12a2 2 0 012 2v3M4 7a4 4 0 000 8h16a4 4 0 000-8M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 15c0 2.21 3.582 4 8 4s8-1.79 8-4m0 0v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3" />
        </svg>
      )
    },
    {
      name: 'TailwindCSS',
      color: 'text-[#06B6D4]',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
        </svg>
      )
    },
    {
      name: 'TypeScript',
      color: 'text-[#3178C6]',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.125 0C.502 0 0 .502 0 1.125V22.88C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.12V1.125C24 .502 23.498 0 22.875 0zm17.163 9.309c.444 0 .825.045 1.143.137.318.09.58.225.786.402a1.86 1.86 0 0 1 .495.636c.117.267.177.587.177.96 0 .37-.057.683-.171.938a1.73 1.73 0 0 1-.477.621c-.207.168-.465.297-.777.387-.309.09-.648.135-1.017.135-.39 0-.74-.045-1.047-.135a2.53 2.53 0 0 1-.84-.393l.633-1.428c.204.144.423.255.654.333.234.078.477.117.729.117.306 0 .54-.069.702-.207.162-.138.243-.339.243-.603 0-.177-.042-.321-.129-.432-.087-.114-.207-.204-.36-.273-.153-.069-.333-.123-.54-.162-.207-.039-.42-.087-.639-.144a2.93 2.93 0 0 1-.837-.36 1.76 1.76 0 0 1-.582-.603c-.15-.246-.225-.57-.225-.972 0-.363.06-.675.18-.936.12-.261.291-.477.513-.648.222-.171.492-.297.81-.378a3.86 3.86 0 0 1 .999-.123m-8.115.156h5.364v1.608H12.9v9.702H10.74V11.073H8.172z"/>
        </svg>
      )
    },
    {
      name: 'Figma',
      color: 'text-[#F24E1E]',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C9.79 2 8 3.79 8 6v3c0 2.21 1.79 4 4 4 2.21 0 4-1.79 4-4V6c0-2.21-1.79-4-4-4zm-4 7V6c0-2.21 1.79-4 4-4s4 1.79 4 4v3H8zm4 4c-2.21 0-4 1.79-4 4v1c0 2.21 1.79 4 4 4s4-1.79 4-4v-1c0-2.21-1.79-4-4-4zm-4 4v-1c0-2.21 1.79-4 4-4s4 1.79 4 4v1c0 2.21-1.79 4-4 4s-4-1.79-4-4zm0 2c0 2.21 1.79 4 4 4s4-1.79 4-4h-8z"/>
        </svg>
      )
    }
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
          
          <div className="relative overflow-hidden w-full">
            <GlassCard className="relative overflow-hidden p-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-[50px] pointer-events-none"></div>
              
              <h3 className="text-xl font-semibold mb-6">Tech Stack</h3>

              <div className="space-y-6">
                {/* Row 1: Moving Left */}
                <div className="relative w-full overflow-hidden py-1 mask-gradient-horizontal">
                  <div className="flex w-max animate-marquee space-x-4">
                    {/* First Loop */}
                    {row1.map((skill, index) => (
                      <div 
                        key={`r1-1-${index}`} 
                        className="flex items-center gap-2 font-mono text-sm bg-white/5 border border-white/10 px-4 py-2.5 rounded hover:border-primary/50 hover:text-primary transition-all duration-300 cursor-default"
                      >
                        <span className={skill.color}>{skill.icon}</span>
                        <span>{skill.name}</span>
                      </div>
                    ))}
                    {/* Second Loop (Seamless repeat) */}
                    {row1.map((skill, index) => (
                      <div 
                        key={`r1-2-${index}`} 
                        className="flex items-center gap-2 font-mono text-sm bg-white/5 border border-white/10 px-4 py-2.5 rounded hover:border-primary/50 hover:text-primary transition-all duration-300 cursor-default"
                      >
                        <span className={skill.color}>{skill.icon}</span>
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 2: Moving Right */}
                <div className="relative w-full overflow-hidden py-1 mask-gradient-horizontal">
                  <div className="flex w-max animate-marquee space-x-4" style={{ animationDirection: 'reverse' }}>
                    {/* First Loop */}
                    {row2.map((skill, index) => (
                      <div 
                        key={`r2-1-${index}`} 
                        className="flex items-center gap-2 font-mono text-sm bg-white/5 border border-white/10 px-4 py-2.5 rounded hover:border-secondary/50 hover:text-secondary transition-all duration-300 cursor-default"
                      >
                        <span className={skill.color}>{skill.icon}</span>
                        <span>{skill.name}</span>
                      </div>
                    ))}
                    {/* Second Loop (Seamless repeat) */}
                    {row2.map((skill, index) => (
                      <div 
                        key={`r2-2-${index}`} 
                        className="flex items-center gap-2 font-mono text-sm bg-white/5 border border-white/10 px-4 py-2.5 rounded hover:border-secondary/50 hover:text-secondary transition-all duration-300 cursor-default"
                      >
                        <span className={skill.color}>{skill.icon}</span>
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
