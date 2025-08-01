import Navbar from './Navbar';
import { motion } from 'framer-motion';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-serif relative">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;