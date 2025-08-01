import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Navbar: React.FC = () => {
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
          Home
        </Link> */}
        <Link href="/#projects" className="text-gray-700 hover:text-green-600 transition-colors">
          Projects
        </Link>
        <Link href="/#products" className="text-gray-700 hover:text-green-600 transition-colors">
          Products
        </Link>
        <Link href="/#about" className="text-gray-700 hover:text-green-600 transition-colors">
          About
        </Link>
        <Link href="/#contact" className="text-gray-700 hover:text-green-600 transition-colors">
          Contact
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;