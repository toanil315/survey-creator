import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import vi from './locales/vi.translation.json';
import en from './locales/en.translation.json';

export const defaultNS = 'vi';
export const resources = {
  en: { translation: en },
  vi: { translation: vi },
} as const;

i18next.use(initReactI18next).init({
  fallbackLng: 'vi',
  interpolation: { escapeValue: false },
  resources,
});

export default i18next;
