import { useEffect, useState } from 'react';
import { useLanguage } from '../context/useLanguage';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const { t } = useLanguage();
  const percentage = Math.round(progress * 100);

  useEffect(() => {
    let animationFrame = null;

    const updateProgress = () => {
      if (animationFrame !== null) return;

      animationFrame = window.requestAnimationFrame(() => {
        const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight;
        const nextProgress = scrollableDistance > 0 ? window.scrollY / scrollableDistance : 0;
        setProgress(Math.min(1, Math.max(0, nextProgress)));
        animationFrame = null;
      });
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    const resizeObserver = 'ResizeObserver' in window
      ? new ResizeObserver(updateProgress)
      : null;
    resizeObserver?.observe(document.documentElement);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      resizeObserver?.disconnect();
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      role="progressbar"
      aria-label={t('Page reading progress', 'Progres membaca halaman')}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percentage}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1 bg-white/[0.04]"
    >
      <div
        aria-hidden="true"
        className="h-full origin-left bg-gradient-to-r from-blue-500 via-teal-400 to-teal-300 shadow-[0_0_10px_rgba(20,184,166,0.65)] transition-transform duration-100 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
