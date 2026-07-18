import NeonButton from './NeonButton';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-b-0 rounded-none border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 font-mono text-xl font-bold tracking-tighter">
            <span className="text-white">{'<'}</span>
            <span className="text-gradient">Portfolio</span>
            <span className="text-white">{' />'}</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#projects" className="text-gray-300 hover:text-white transition-colors">Projects</a>
              <NeonButton href="#contact">Contact Me</NeonButton>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
