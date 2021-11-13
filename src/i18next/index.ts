import i18next from 'i18next';
import { LanguageDetector } from 'i18next-http-middleware';

import normalizeValue from '@utils/normalize-value';

import en from './en';
import es from './es';
import pt_BR from './pt_BR';

i18next.use(LanguageDetector).init({
  lng: process.env.I18NEXT_FALLBACK_LANGUAGE || 'en',
  debug: normalizeValue(process.env.I18NEXT_DEBUG === 'true'),
  fallbackLng: process.env.I18NEXT_DEFAULT_LANGUAGE || 'en',
  ns: 'translations',
  defaultNS: 'translations',
  resources: { en, es, pt_BR },
});

export default i18next;
