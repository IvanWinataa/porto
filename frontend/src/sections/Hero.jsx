import NeonButton from '../components/NeonButton';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      
      <div className="text-center px-4 max-w-4xl mx-auto z-10">
        <p className="text-secondary font-mono mb-4 text-sm md:text-base tracking-widest uppercase">
          Welcome to my universe
        </p>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Hi, I'm a <br />
          <span className="text-gradient">Fullstack Developer</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          I build premium, high-performance web applications with a focus on cutting-edge design and flawless user experience.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <NeonButton href="#projects" className="w-full sm:w-auto text-center px-8 py-3 text-lg">
            View My Work
          </NeonButton>
          <a href="#contact" className="text-gray-300 hover:text-white font-mono border-b border-transparent hover:border-white transition-colors py-2 px-4">
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
