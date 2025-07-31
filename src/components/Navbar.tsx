import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface NavbarProps {
  toggleLanguage: () => void;
  currentLang: string;
}

const Navbar: React.FC<NavbarProps> = ({ toggleLanguage, currentLang }) => {
  const { t } = useTranslation();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white bg-opacity-50 backdrop-blur-2xl shadow-md p-4 flex justify-between items-center fixed w-full z-20"
    >
      <Link href="/" className="flex items-center">
        <Image
          src="/images/titulo1.png"
          alt="Studio Sobra"
          width={100}
          height={40}
          className="object-contain"
        />
      </Link>
      <div className="space-x-6">
        {/* <Link href="/#home" className="text-gray-700 hover:text-green-600 transition-colors">
          {t('home')}
        </Link> */}
        <Link href="/#projects" className="text-gray-700 hover:text-green-600 transition-colors">
          {t('projects')}
        </Link>
        <Link href="/#products" className="text-gray-700 hover:text-green-600 transition-colors">
          {t('products')}
        </Link>
        <Link href="/#about" className="text-gray-700 hover:text-green-600 transition-colors">
          {t('about')}
        </Link>
        <Link href="/#contact" className="text-gray-700 hover:text-green-600 transition-colors">
          {t('contact')}
        </Link>
        <button
          onClick={toggleLanguage}
          className="ml-4 text-gray-700 hover:text-green-600 transition-colors font-medium bg-gray-100 px-3 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          {currentLang === 'en' ? 'DA' : 'EN'}
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;