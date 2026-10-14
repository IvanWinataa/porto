import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext(null);

function getInitialLanguage() {
  try {
    const savedLanguage = window.localStorage.getItem('portfolio-language');
    return savedLanguage === 'id' || savedLanguage === 'en' ? savedLanguage : 'en';
  } catch {
    return 'en';
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);
  const t = useCallback((english, indonesian) => (
    language === 'id' ? indonesian : english
  ), [language]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === 'id'
      ? 'Portofolio | Fullstack Engineer & Spesialis UI/UX'
      : 'Portfolio | Fullstack Engineer & UI/UX Specialist';

    const description = language === 'id'
      ? 'Portofolio yang menampilkan pilihan aplikasi web, pengalaman rekayasa perangkat lunak, dan kemampuan teknis.'
      : 'Portfolio featuring selected web applications, engineering experience, and technical capabilities.';
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', document.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);

    try {
      window.localStorage.setItem('portfolio-language', language);
    } catch {
      // Language switching still works for the current page when storage is unavailable.
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
