export default function NeonButton({ children, onClick, className = '', href }) {
  const baseClasses = "inline-block bg-primary/10 text-primary border border-primary/30 px-6 py-2 rounded-full hover:bg-primary/30 hover:border-primary/60 hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] transition-all duration-300 backdrop-blur-sm cursor-pointer " + className;
  
  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {children}
      </a>
    );
  }
  
  return (
    <button onClick={onClick} className={baseClasses}>
      {children}
    </button>
  );
}
