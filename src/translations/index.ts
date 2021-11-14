import i18next from 'i18next';
import httpMiddleware from 'i18next-http-middleware';

import en from './en';
import es from './es';
import pt_BR from './pt_BR';

i18next.use(httpMiddleware.LanguageDetector).init({
  lng: process.env.I18N_LANGUAGE || 'pt_BR',
  debug: process.env.I18N_DEBUG === 'true',
  fallbackLng: process.env.I18N_FALLBACK_LANGUAGE || 'pt_BR',
  ns: 'translations',
  defaultNS: 'translations',
  resources: { en, es, pt_BR },
  preload: ['en', 'es', 'pt_BR'],
});

export default i18next;
