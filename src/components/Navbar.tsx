// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import Image from 'next/image';

// const Navbar: React.FC = () => {
//   return (
//     <motion.nav
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       className="bg-white bg-opacity-50 backdrop-blur-2xl shadow-md p-4 flex justify-between items-center fixed w-full z-20"
//     >
//       <Link href="/" className="flex items-center">
//         <Image
//           src="/images/titulo1.png"
//           alt="Studio Sobra"
//           width={100}
//           height={40}
//           className="object-contain"
//         />
//       </Link>
//       <div className="space-x-6">
//         <Link href="/#projects" className="text-gray-700 hover:text-black hover:underline transition-colors" style={{ fontFamily: '"Inter", sans-serif', fontWeight: 400 }}>
//           Projects
//         </Link>
//         <Link href="/#work" className="text-gray-700 hover:text-black hover:underline transition-colors" style={{ fontFamily: '"Inter", sans-serif', fontWeight: 400 }}>
//           Work
//         </Link>
//         <Link href="/#about" className="text-gray-700 hover:text-black hover:underline transition-colors" style={{ fontFamily: '"Inter", sans-serif', fontWeight: 400 }}>
//           About
//         </Link>
//         <Link href="/#contact" className="text-gray-700 hover:text-black hover:underline transition-colors" style={{ fontFamily: '"Inter", sans-serif', fontWeight: 400 }}>
//           Contact
//         </Link>
//       </div>
//     </motion.nav>
//   );
// };

// export default Navbar;
import Link from 'next/link';
import { motion, useCycle } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {

    const checkScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
      const threshold = window.innerHeight * 0.5;
      const shouldShow = scrollY > threshold;
      
      console.log('Polling check - Scroll:', scrollY, 'Threshold:', threshold, 'Show:', shouldShow);
      setShowLogo(shouldShow);
    };
let intervalId: NodeJS.Timeout = setInterval(checkScroll, 100) as NodeJS.Timeout;

    // Verificar cada 100ms
    intervalId = setInterval(checkScroll, 100);
    
    // Check inicial
    checkScroll();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  const menuVariants = {
    open: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    closed: { opacity: 0, x: '100%', transition: { duration: 0.3 } },
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={` ${isOpen ? 'bg-black' : 'bg-white'} bg-opacity-50 backdrop-blur-2xl shadow-md p-4 flex justify-between items-center fixed w-full z-50`}
      >
        <div className={`flex items-center transition-opacity duration-500 ${showLogo ? 'opacity-100' : 'opacity-0'}`}>
          <Link href="/" className="flex items-center">
            <Image
              src="/images/titulo1.png"
              alt="Studio Sobra"
              width={100}
              height={40}
              className="object-contain"
            />
          </Link>
        </div>
        
        <div className="hidden md:flex space-x-6">
          <Link href="/#projects" className="text-gray-700 hover:text-black hover:underline transition-colors" style={{ fontFamily: '"Inter", sans-serif', fontWeight: 400 }}>
            PROJECTS
          </Link>
          <Link href="/#work" className="text-gray-700 hover:text-black hover:underline transition-colors" style={{ fontFamily: '"Inter", sans-serif', fontWeight: 400 }}>
            WORK
          </Link>
          <Link href="/#about" className="text-gray-700 hover:text-black hover:underline transition-colors" style={{ fontFamily: '"Inter", sans-serif', fontWeight: 400 }}>
            ABOUT
          </Link>
          <Link href="/#contact" className="text-gray-700 hover:text-black hover:underline transition-colors" style={{ fontFamily: '"Inter", sans-serif', fontWeight: 400 }}>
            CONTACT
          </Link>
        </div>
        
        <button
          className="md:hidden text-gray-700 focus:outline-none z-50"
          onClick={() => toggleOpen()}
          aria-label="Toggle menu"
        >
          <div className="space-y-1">
            <span className={`block w-14 h-0.5 transition-transform ${isOpen ? 'rotate-45 translate-y-2 bg-gray-100' : 'bg-gray-700'}`}></span>
            <span className={`block w-10 h-0.5 bg-gray-100 opacity-0 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-14 h-0.5 transition-transform ${isOpen ? '-rotate-45 -translate-y-1 bg-gray-100' : 'bg-gray-700'}`}></span>
          </div>
        </button>
      </motion.nav>
      
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-90 z-40 md:hidden"
        variants={menuVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        onClick={(e) => {
          if (e.target === e.currentTarget) toggleOpen();
        }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <Link href="/#projects" className="text-white text-3xl font-bold hover:underline" style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600 }} onClick={(e) => { e.preventDefault(); toggleOpen(); setTimeout(() => (window.location.href = '/#projects'), 300); }}>
            PROJECTS
          </Link>
          <Link href="/#work" className="text-white text-3xl font-bold hover:underline" style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600 }} onClick={(e) => { e.preventDefault(); toggleOpen(); setTimeout(() => (window.location.href = '/#work'), 300); }}>
            WORK
          </Link>
          <Link href="/#about" className="text-white text-3xl font-bold hover:underline" style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600 }} onClick={(e) => { e.preventDefault(); toggleOpen(); setTimeout(() => (window.location.href = '/#about'), 300); }}>
            ABOUT
          </Link>
          <Link href="/#contact" className="text-white text-3xl font-bold hover:underline" style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600 }} onClick={(e) => { e.preventDefault(); toggleOpen(); setTimeout(() => (window.location.href = '/#contact'), 300); }}>
            CONTACT
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;