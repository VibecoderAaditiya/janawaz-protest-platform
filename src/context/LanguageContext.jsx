import React, { createContext, useContext, useState, useCallback } from 'react';
import { t as translate, LANGUAGES } from '../i18n/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('janawaz_lang') || 'en';
  });

  const switchLang = useCallback((code) => {
    setLang(code);
    localStorage.setItem('janawaz_lang', code);
  }, []);

  // Bound translation helper — components call t('key') without passing lang
  const t = useCallback((key) => translate(key, lang), [lang]);

  return (
    <LanguageContext.Provider value={{ lang, switchLang, t, LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
