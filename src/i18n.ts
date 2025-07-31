import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import nextI18NextConfig from '../next-i18next.config'; // Import the config

// Initialize i18next with the config
i18n
  .use(initReactI18next)
  .init({
    ...nextI18NextConfig.i18n, // Spread the i18n configuration
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    // Add other i18n options if needed (e.g., ns, interpolation)
  });

export default i18n;