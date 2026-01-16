import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import arTranslations from '../i18n/ar.json';
import enTranslations from '../i18n/en.json';

const translations = { ar: arTranslations, en: enTranslations };

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Initialize from localStorage or system preferences
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lab-theme');
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lab-language');
      if (saved) return saved;
      // Default to Arabic
      return 'ar';
    }
    return 'ar';
  });

  const t = useCallback((key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  }, [language]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('lab-theme', theme);
  }, [theme]);

  // Apply language/direction to document
  useEffect(() => {
    const root = document.documentElement;
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    root.setAttribute('lang', language);
    root.setAttribute('dir', dir);
    localStorage.setItem('lab-language', language);
  }, [language]);

  const value = {
    theme,
    setTheme,
    toggleTheme,
    language,
    setLanguage,
    toggleLanguage,
    t,
    isRTL: language === 'ar',
    isDark: theme === 'dark',
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

export default AppContext;
