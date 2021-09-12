import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import moment from 'moment';
import { initReactI18next } from 'react-i18next';
import en_EN from '../locales/en.json';
import es_ES from '../locales/es.json';

const detection = {
  lookupLocalStorage: 'language',
};

const resources = {
  en: { translation: en_EN },
  es: { translation: es_ES },
};

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources,
});

export const locale =
  i18n.services.languageDetector.detectors.localStorage.lookup(detection) || 'en';

moment.locale(locale);

const t = (str: string, options?: {}) => i18n.t(str, options);

export default t;
//export default i18n;
