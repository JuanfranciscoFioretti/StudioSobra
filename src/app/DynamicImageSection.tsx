'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function DynamicImageSection() {
  // Server-safe initial offset
  const initialOffset = typeof window !== 'undefined' ? -200 : 0; // Offset for title height

  // Only calculate transforms on client
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 600, 1000], [0, -300, -800]);
  const imageScale = useTransform(scrollY, [0, 600], [1, 1.5]);
  const imageBlur = useTransform(scrollY, [0, 300, 600], [10, 5, 0]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        bottom: 0, // Pin to bottom of viewport
        left: 0, // Start from the left
        right: 0, // End at the right
        margin: 'auto', // Center horizontally
        transform: 'none', // Remove any translateX
        y: imageY, // Client-side vertical animation
        scale: imageScale,
        filter: `blur(${imageBlur}px)`,
        zIndex: 0,
      }}
      initial={false} // Disable initial animation to use static position
      transition={{ duration: 0 }}
      className="h-[80vh] md:h-[70vh] max-h-[900px] overflow-hidden rounded-none bg-gradient-to-b from-green-50 to-white w-full md:w-[90vw] md:max-w-[1200px]"
    >
      <Image
        src="/images/fondofloralRecortado.png"
        alt="Floral decor"
        width={1200}
        height={900}
        className="object-cover object-center w-full h-full"
      />
    </motion.div>
  );
}