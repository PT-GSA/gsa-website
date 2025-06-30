'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n'; // Initialize i18n

interface I18nContextType {
  language: string;
  changeLanguage: (lang: string) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState('en'); // Always 'en' on SSR, will sync on client

  useEffect(() => {
    // Only run on client
    const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('language') : null;
    const lang = savedLanguage || 'en';
    setLanguage(lang);
    i18n.changeLanguage(lang);
  }, [i18n]);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
    i18n.changeLanguage(lang);
  };

  return (
    <I18nContext.Provider value={{ language, changeLanguage }}>
      {children}
    </I18nContext.Provider>
  );
}; 