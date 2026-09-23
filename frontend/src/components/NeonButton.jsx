export default function NeonButton({ children, onClick, className = '', href, variant = 'primary', type = 'button' }) {
  const variants = {
    primary: "bg-gradient-to-r from-purple-600/30 to-cyan-600/30 text-white border border-purple-500/40 hover:border-purple-400 shadow-[0_0_20px_rgba(139,92,246,0.25)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:from-purple-600/50 hover:to-cyan-600/50",
    secondary: "bg-white/5 text-slate-200 border border-white/10 hover:border-white/30 hover:bg-white/10 hover:text-white shadow-[0_4px_20px_rgba(0,0,0,0.2)]",
    amber: "bg-gradient-to-r from-amber-500/30 to-pink-500/30 text-white border border-amber-500/40 hover:border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]"
  };

  const baseClasses = `relative group inline-flex items-center justify-center font-mono font-medium px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-md cursor-pointer overflow-hidden ${variants[variant] || variants.primary} ${className}`;
  
  const content = (
    <>
      {/* Glare sheen animation */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {content}
      </a>
    );
  }
  
  return (
    <button type={type} onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
}

