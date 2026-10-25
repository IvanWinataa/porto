import { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ children, className = '', delay = 0 }) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer;

    const reveal = () => {
      setIsVisible(true);
      observer?.disconnect();
    };

    if (motionPreference.matches || !('IntersectionObserver' in window)) {
      reveal();
      return undefined;
    }

    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) reveal();
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    if (elementRef.current) observer.observe(elementRef.current);

    const handleMotionPreferenceChange = (event) => {
      if (event.matches) reveal();
    };

    if (motionPreference.addEventListener) {
      motionPreference.addEventListener('change', handleMotionPreferenceChange);
    } else {
      motionPreference.addListener(handleMotionPreferenceChange);
    }

    return () => {
      observer?.disconnect();
      if (motionPreference.removeEventListener) {
        motionPreference.removeEventListener('change', handleMotionPreferenceChange);
      } else {
        motionPreference.removeListener(handleMotionPreferenceChange);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`scroll-reveal ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ '--scroll-reveal-delay': `${delay}ms` }}
    >
      {children}
    </div>
  );
}
