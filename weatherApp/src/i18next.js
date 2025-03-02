import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importa todos los archivos de traducción
import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enWeather from './locales/en/wheather.json';
import enMap from './locales/en/map.json';
import enAbout from './locales/en/about.json';

import esCommon from './locales/es/common.json';
import esHome from './locales/es/home.json';
import esWeather from './locales/es/weather.json';
import esMap from './locales/es/map.json';
import esAbout from './locales/es/about.json';

import caCommon from './locales/ca/common.json';
import caHome from './locales/ca/home.json';
import caWeather from './locales/ca/weather.json';
import caMap from './locales/ca/map.json';
import caAbout from './locales/ca/about.json';

i18n
  .use(LanguageDetector) // Detectar idioma del navegador
  .use(initReactI18next) // Inicializar react-i18next
  .init({
    resources: {
      en: {
        common: enCommon,
        home: enHome,
        weather: enWeather,
        map: enMap,
        about: enAbout,
      },
      es: {
        common: esCommon,
        home: esHome,
        weather: esWeather,
        map: esMap,
        about: esAbout,
      },
      ca: {
        common: caCommon,
        home: caHome,
        weather: caWeather,
        map: caMap,
        about: caAbout,
      },
    },
    fallbackLng: 'ca', // Idioma por defecto (catalán)
    interpolation: {
      escapeValue: false, // No escapar HTML en las traducciones
    },
  });

export default i18n;