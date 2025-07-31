import Navbar from './Navbar';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, i18n } = useTranslation();

  // Debug: Log i18n to verify its properties
  useEffect(() => {
    console.log('i18n object:', i18n);
  }, [i18n]);

  const [lang, setLang] = useState(i18n.language);

  useEffect(() => {
    setLang(i18n.language);
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'da' : 'en';
    if (i18n.changeLanguage) {
      i18n.changeLanguage(newLang);
    } else {
      console.error('changeLanguage is not available, attempting manual switch');
      // Fallback: Manually trigger a re-render or page reload if i18n is not fully initialized
      window.location.href = `/${newLang}${window.location.pathname}`;
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-serif relative">
      <Navbar toggleLanguage={toggleLanguage} currentLang={lang} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;