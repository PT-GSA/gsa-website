import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Minimal resources - components will handle their own translations
const resources = {
  en: {
    common: {},
  },
  id: {
    common: {},
  },
};

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'common',
  });

export default i18next; 