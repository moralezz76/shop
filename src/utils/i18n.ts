import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import _ from 'lodash';
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

const t = (str: string, prefix = 'label', options?: {}) => {
  return i18n.t(`${prefix}${_.upperFirst(str)}`, options);
};

export const translate_array = (array: any[], field = 'label', prefix = 'label') => {
  return array.map((item: any) => {
    return { ...item, [field]: t(item[field], prefix) };
  });
};

export default t;
//export default i18n;
