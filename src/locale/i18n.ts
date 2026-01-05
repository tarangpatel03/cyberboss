import i18n from 'i18next';
import en from '@locale/en.json';
import fr from '@locale/fr.json';
import ar from '@locale/ar.json';
import es from '@locale/es.json';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  ar: { translation: ar },
  es: { translation: es },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
