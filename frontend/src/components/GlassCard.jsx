import { useState } from 'react';

export default function GlassCard({ children, className = '', onClick }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`glass-card rounded-2xl p-6 relative overflow-hidden transition-all duration-300 ${
        isHovered ? 'shadow-[0_12px_40px_rgba(139,92,246,0.15)] border-white/20' : 'border-white/10'
      } ${className}`}
    >
      {/* Interactive mouse spotlight gradient background */}
      {isHovered && (
        <div 
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-100 rounded-2xl"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.12), transparent 40%)`,
          }}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

