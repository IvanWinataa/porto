import { useEffect, useState } from 'react';
import { useLanguage } from '../context/useLanguage';

const SHOW_AFTER_SCROLL = 480;

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();
  const label = t('Back to top', 'Kembali ke atas');

  useEffect(() => {
    let animationFrame = null;

    const updateVisibility = () => {
      if (animationFrame !== null) return;

      animationFrame = window.requestAnimationFrame(() => {
        setIsVisible(window.scrollY > SHOW_AFTER_SCROLL);
        animationFrame = null;
      });
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const scrollToTop = () => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    window.scrollTo({ top: 0, behavior });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={label}
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      title={label}
      className={`back-to-top fixed bottom-6 left-4 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full border border-teal-300/30 bg-[#0b1422]/90 text-teal-200 shadow-[0_8px_28px_rgba(0,0,0,0.35)] backdrop-blur-md hover:border-teal-300/60 hover:bg-blue-900/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] sm:left-6 ${
        isVisible ? 'is-visible' : ''
      }`}
    >
      <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}
