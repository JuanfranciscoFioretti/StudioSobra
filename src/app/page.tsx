'use client';

import Layout from '../components/Layout';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useState, useCallback } from 'react';
import DynamicImageSection from './DynamicImageSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';


export default function Home() {
  const { scrollYProgress } = useScroll();

  const opacity = useTransform(scrollYProgress, [0.7, 0.9, 1], [1, 1, 0]);

  const { ref: homeRef, inView: homeInView } = useInView();
  const { ref: projectsRef, inView: projectsInView } = useInView();
  const { ref: productsRef, inView: productsInView } = useInView();
  const { ref: aboutRef, inView: aboutInView } = useInView();
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView();
  const { ref: contactRef, inView: contactInView } = useInView();

  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const handleCardClick = useCallback((id: number, event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    console.log('Clicked project ID:', id, 'Current expandedProject:', expandedProject);
    setExpandedProject((prev) => (prev === id ? null : id));
  }, [expandedProject]);

  const projects = [
    { id: 1, title: "Restaurant Decor", image: "/images/proj13.jpg", images: ["/images/proj13.jpg", "/images/proj13.jpg", "/images/proj13.jpg"], description: "A stunning floral installation that transforms spaces with natural elegance." },
    { id: 2, title: "Private Events", image: "/images/proj9.jpg", images: ["/images/proj9.jpg", "/images/proj10.jpg", "/images/proj13.jpg"], description: "Elegant event decor blending sophistication with botanical charm." },
    { id: 3, title: "Wedding Decor", image: "/images/proj8.jpg", images: ["/images/proj8.jpg", "/images/proj8.jpg", "/images/proj13.jpg"], description: "Elegant event decor blending sophistication with botanical charm." },
    { id: 4, title: "House Decor", image: "/images/proj10.jpg", images: ["/images/proj10.jpg", "/images/proj10.jpg", "/images/proj13.jpg"], description: "Elegant event decor blending sophistication with botanical charm." },
  ];

  // Generar números aleatorios para las imágenes (proj5 a proj17)
  const getRandomProjectNumbers = () => {
    const availableNumbers = Array.from({length: 13}, (_, i) => i + 5); // 5 a 17
    const shuffled = availableNumbers.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5); // Tomar 5 números aleatorios
  };

  const projectNumbers = getRandomProjectNumbers();

  // const products = [
  //   { id: 1, name: "Bouquets", image: "/images/proj17.jpg", price: "350 DKK", description: "Vibrant floral arrangements for any occasion." },
  //   { id: 2, name: "Product of the Week", image: "/images/proj15.jpg", price: "630 DKK", description: "Our signature floral creation, updated weekly.", highlight: true },
  //   { id: 3, name: "Restaurant Decor", image: "/images/proj9.jpg", price: "525 DKK", description: "Elegant designs to enhance dining spaces." },
  //   { id: 4, name: "Event Decor", image: "/images/proj11.jpg", price: "700 DKK", description: "Bespoke decor for unforgettable events." },
  //   { id: 5, name: "Bouquets", image: "/images/proj13.jpg", price: "400 DKK", description: "Charming event decor blending elegance with botanical charm." },
  //   { id: 6, name: "Hotel Decor", image: "/images/proj14.jpg", price: "580 DKK", description: "Elegant event decor blending sophistication with botanical charm." },
  // ];

  // const testimonials = [
  //   { id: 1, text: "The floral installation for our event was breathtaking—Studio Sobra brought our vision to life with elegance and creativity.", author: "Anna K., Event Planner", stars: 5, image: "/images/user1.png" },
  //   { id: 2, text: "Their attention to detail and innovative designs transformed our restaurant’s ambiance—truly exceptional work.", author: "Lars M., Restaurant Owner", stars: 5, image: "/images/user2.jpg" },
  //   { id: 3, text: "A beautiful and professional service that exceeded our expectations.", author: "Sofia P., Client", stars: 4, image: "/images/user3.png" },
  // ];

  return (
    <Layout>
      <section
        id="home"
        ref={homeRef}
        className="min-h-screen w-full relative overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={homeInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ opacity }}
          className="text-center z-10 max-w-[80%] mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <Image
            src="/images/titulo2.png"
            alt="Studio Sobra"
            width={600}
            height={200}
            className="w-full"
          />
        </motion.div>

        <DynamicImageSection />
      </section>

      <section
  id="projects"
  ref={projectsRef}
  className="min-h-[70vh] py-16 px-4 bg-white flex items-center justify-center "
>
  <div
    className={`w-full max-w-6xl transition-all duration-800 delay-200 ${
      projectsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
    }`}
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project) => {
        const isExpanded = expandedProject === project.id;
        const imageOrder = isExpanded ? [...project.images].reverse() : project.images;

        return (
          <div
            key={project.id}
            className={`relative bg-white rounded-sm shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer transform ${
              projectsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            onClick={(e) => handleCardClick(project.id, e)}
            style={{
              position: 'relative',
              height: '400px',
              overflow: 'hidden',
              transitionDelay: `${project.id * 100}ms`
            }}
          >
            {/* Image container with animated height */}
            <div
              className="absolute top-0 left-0 right-0 overflow-hidden transition-all duration-300 ease-out"
              style={{ 
                height: isExpanded ? '128px' : '256px',
                transformOrigin: 'bottom'
              }}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={1200}
                height={isExpanded ? 384 : 768}
                className="w-full h-full transition-transform duration-300 hover:scale-105"
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Content container */}
            <div
              className="p-4 relative transition-transform duration-300 ease-out"
              style={{ 
                height: 'calc(100% - 256px)', 
                position: 'absolute', 
                top: '256px', 
                left: 0, 
                right: 0,
                transform: isExpanded ? 'translateY(-150px)' : 'translateY(0)'
              }}
            >
              {/* Title */}
              <h3
                className="text-4xl font-semibold text-gray-900 transition-all duration-300 ease-out"
                style={{ 
                  fontFamily: '"Inter", sans-serif', 
                  fontWeight: 600,
                  transform: isExpanded ? 'translateY(20px)' : 'translateY(0)',
                  opacity: isExpanded ? 0 : 1
                }}
              >
                {project.title}
              </h3>

              {/* Expanded content */}
              {isExpanded && (
                <div
                  className="mt-1 p-1 pb-15 transition-all duration-500 ease-spring"
                  style={{
                    background: 'rgba(245, 245, 245, 0.8)',
                    overflow: 'hidden',
                    height: '350px',
                    opacity: isExpanded ? 1 : 0
                  }}
                >
                  <div className="grid grid-cols-2 gap-2 h-full pb-4">
                    {imageOrder.slice(0, 3).map((img, idx) => (
                      <div
                        key={idx}
                        className={`overflow-hidden rounded-xs transform transition-all duration-400 ${
                          idx === 0 ? 'col-span-1 row-span-2' : 
                          idx === 1 ? 'col-span-1 row-span-1' : 
                          'col-span-1 row-span-1'
                        }`}
                        style={{
                          transitionDelay: `${idx * 100}ms`,
                          transform: isExpanded ? 'scale(1)' : 'scale(0.95)',
                          opacity: isExpanded ? 1 : 0,
                          height: idx === 2 ? '60%' : 'auto',
                          marginBottom: '.1rem'
                        }}
                      >
                        <Image
                          src={img}
                          alt={`${project.title} image ${idx + 1}`}
                          width={idx === 0 ? 300 : (idx === 1 ? 300 : 300)}
                          height={idx === 0 ? 360 : (idx === 1 ? 180 : 210)}
                          className="w-full h-full hover:scale-110 transition-transform duration-300"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>

<section className="mosaic-gallery">
      {/* Fila Superior (2 columnas) */}
      <div className="row-top">
        <div className="mosaic-item">
          <Image
            src={`/images/mosaico1.png`}
            alt={`Proyecto Floral`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 49vw, 49vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="mosaic-item">
          <Image
            src={`/images/mosaico2.png`}
            alt={`Bouquet Zoom in`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 51vw, 51vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      </div>

      {/* Fila Inferior (3 columnas) */}
      <div className="row-bottom">
        <div className="mosaic-item">
          <Image
            src={`/images/mosaico3.png`}
            alt={`Roses Zoom in`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 24vw, 24vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="mosaic-item">
          <Image
            src={`/images/mosaico4.png`}
            alt={`Boquet frist plan`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 43vw, 43vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="mosaic-item">
          <Image
            src={`/images/mosaico5.png`}
            alt={`Small boquet`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </section>



      <section
  id="work"
  ref={productsRef}
  className="min-h-[70vh] py-16 px-4 bg-white flex items-center justify-center"
>
  <motion.div
    initial={{ opacity: 0, x: -100 }}
    animate={productsInView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.8, delay: 0.4 }}
    className="w-full max-w-6xl"
  >
    {/* Work/Flowers Section */}
    <h2 className="text-4xl md:text-5xl  text-gray-800 mb-19 justify-start"
      style={{ fontFamily: '"Inter", sans-serif' }}
    >
      <span style={{ fontWeight: 800}}>WORK</span> / <span style={{ fontWeight: 400}}>FLOWERS</span>
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-16 justify-items-center relative" style={{ gap: '16px' }}>
      {[
        { id: 1, title: "DECORATIONS", price: "525 DKK", image: "/images/proj9.jpg", identifier: "Flowers" },
        { id: 2, title: "EVENTS", price: "700 DKK", image: "/images/proj11.jpg", identifier: "Flowers" },
        { id: 3, title: "BOUQUETS", price: "350 DKK", image: "/images/proj17.jpg", identifier: "Flowers" },
        { id: 4, title: "INSTALLATIONS", price: "630 DKK", image: "/images/proj15.jpg", identifier: "Flowers", highlight: true },
      ].map((item, idx) => (
        <div key={item.id} className="relative w-80 mb-18">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative w-80 h-80 bg-gray-50 overflow-hidden border border-gray-100"
            style={{ position: 'relative' }}
          >
            <style>
              {`
                // @keyframes imageHover {
                //   0% { transform: scale(1); }
                  
                //   100% { transform: scale(1.2); }
                // }
                .hover-gradient::after {
                  content: '';
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
                  opacity: 0;
                  transition: opacity 1s ease;
                  z-index: 1; /* Gradiente detrás del precio */
                }
                .hover-gradient:hover::after {
                  opacity: 1;
                }
                .hover-gradient:hover img {
                  animation: imageHover 4s infinite alternate;
                }
                .image-container {
                  overflow: hidden;
                  height: 100%;
                  width: 100%;
                  position: relative;
                  background-color: #f9fafb;
                }
                .price {
                  bottom: -100%;
                  right: 10px;
                  transform: translateY(100%);
                  transition: transform 1.2s ease, bottom 1.2s ease;
                  z-index: 2; /* Precio sobre el gradiente */
                }
                .hover-gradient:hover .price {
                  bottom: 10px;
                  transform: translateY(0);
                }

              `}
            </style>
            <div className="hover-gradient relative w-full h-80">
              <div className="image-container">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="price absolute text-white text-4xl"
                style={{ fontFamily: '"Inter", sans-serif', fontWeight: 400, letterSpacing: '-0.04em' }}
              >
                {item.price}
              </div>
            </div>
          </motion.div>
          <div className="title-container" style={{ marginLeft: 0, marginTop: '8px' }}>
            <h3 className="text-5xl text-gray-800 text-left"
              style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, letterSpacing: '-0.07em' }}
            >
              {item.title}
            </h3>
          </div>
        </div>
      ))}
    </div>

    {/* Work/Landscape Section */}
    <h2 className="text-4xl md:text-5xl text-gray-800 mb-19 mt-35"
      style={{ fontFamily: '"Inter", sans-serif' }}
    >
      <span style={{ fontWeight: 800 }}>WORK</span> / <span style={{ fontWeight: 400 }}>LANDSCAPE</span>
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-16 justify-items-center relative" style={{ gap: '16px' }}>
      {[
        { id: 5, title: "GARDENS", price: "400 DKK", image: "/images/proj13.jpg", identifier: "Landscape" },
        { id: 6, title: "DESIGN", price: "580 DKK", image: "/images/proj14.jpg", identifier: "Landscape" },
      ].map((item, idx) => (
        <div key={item.id} className="relative w-80 mb-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: idx * 0.1 + 0.4 }}
            className="relative w-80 h-80 bg-gray-50 overflow-hidden border border-gray-100"
            style={{ position: 'relative' }}
          >
            <div className="hover-gradient relative w-full h-80">
              <div className="image-container">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="price absolute text-white text-4xl"
                style={{ fontFamily: '"Inter", sans-serif', fontWeight: 400, letterSpacing: '0.1em' }}
              >
                {item.price}
              </div>
            </div>
          </motion.div>
          <div className="title-container" style={{ marginLeft: 0, marginTop: '8px' }}>
            <h3 className="text-5xl text-gray-800 text-left"
              style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600 }}
            >
              {item.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
</section>

      <section
        id="about"
        ref={aboutRef}
        className="min-h-[70vh] py-50 px-4 bg-white flex items-center justify-center"
        // style={{backgroundImage: "url('/images/bg1.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}
      >
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={aboutInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center max-w-3xl md:max-w-2xl sm:max-w-lg relative"
          style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.1,
          }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-15" /* Quitamos font-serif, usamos Inter con 600 */
            style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600 }} /* Añadimos Inter Semi Bold */
          >
            About Us
          </h2>
          <p className="text-2xl text-gray-800 leading-snug" /* Quitamos font-serif, usamos Inter con 100 */
            style={{ fontFamily: '"Inter", sans-serif', fontWeight: 400 }} /* Añadimos Inter Extra Light */
          >
            We are a Flower Studio specialized
            in floral installations, based in
            Copenhagen. With a background in
            landscape and design, we combine
            nature with an industrial edge.
            <br />
            <br />
            The word “sobra” in Spanish has
            multiple nuanced meanings,
            making it a versatile and evoca
            tive choice for a studio name.
            Sobra can mean “surplus” or
            “abundance,” suggesting something
            overflowing or more than enough—
            an idea tied to creativity, growth, and
            richness. 
            <br />
            <br />It also carries the notion of
            something left behind or beyond,
            hinting at pushing boundaries, exploring
            uncharted territory, and creating
            something unexpected.
          </p>
        </motion.div>
      </section>

      {/* <section
        id="testimonials"
        ref={testimonialsRef}
        className="min-h-[70vh] py-16 px-4 bg-white flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center max-w-4xl"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-800 mb-10">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: idx === 0 ? -50 : idx === 2 ? 50 : 0 }}
                animate={testimonialsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.9 + idx * 0.1 }}
                className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-center max-w-sm w-full"
              >
                <div className="mb-4">
                  <Image
                    src={testimonial.image}
                    alt={`${testimonial.author} photo`}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                </div>
                <p className="text-base font-serif text-gray-600 italic mb-4 text-center">{testimonial.text}</p>
                <div className="flex items-center justify-center mb-2">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <span key={i} className="text-yellow-300 text-sm">★</span>
                  ))}
                  {[...Array(5 - testimonial.stars)].map((_, i) => (
                    <span key={i + testimonial.stars} className="text-gray-300 text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm font-serif text-gray-500 text-center">{testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section> */}

      <section
        id="contact"
        ref={contactRef}
        className="min-h-[70vh] py-15 pb-30 px-4 bg-white flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={contactInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center max-w-sm lg:max-w-xs bg-white rounded-lg shadow-2xl p-6 border border-gray-200"
          style={{ width: '100vw', maxWidth: '700px', overflow: 'hidden' }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-black mb-6" /* Quitamos font-serif, usamos Inter con 600 */
            style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600 }} /* Añadimos Inter Semi Bold */
          >
            Contact Us
          </h2>
          <motion.form
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50, transition: { duration: 0.6, ease: 'easeOut' } }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const name = (form.elements.namedItem('name') as HTMLInputElement).value;
              const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
              const email = (form.elements.namedItem('email') as HTMLInputElement).value;
              const message = (form.elements.namedItem('message') as HTMLInputElement).value;
              const service = (form.elements.namedItem('service') as HTMLSelectElement).value;
              // Basic validation
              const sanitizeInput = (input: string) => input.replace(/[<>;'"\\]/g, '').trim();
              if (!name || !phone || !email || !message || !service) {
                alert('All fields are required.');
                return;
              }
              if (!/^\+?[\d\s-]{8,}$/.test(phone)) {
                alert('Please enter a valid phone number (e.g., +4512345678).');
                return;
              }
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address.');
                return;
              }
              if (sanitizeInput(name) !== name || sanitizeInput(phone) !== phone || sanitizeInput(email) !== email || sanitizeInput(message) !== message) {
                alert('Invalid characters detected. Please avoid <, >, ;, ", \', or \\.');
                return;
              }
              // Send data to API route
              const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  to: 'greencode365@gmail.com',
                  subject: `New Contact Form Submission - ${service}`,
                  text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\nMessage: ${message}`,
                }),
              });
              if (response.ok) {
                form.style.display = 'none';
                const successMessage = document.createElement('div');
                successMessage.className = 'text-green-700 text-lg mt-6' /* Quitamos font-serif, usamos Inter con 100 */
                successMessage.style.fontFamily = '"Inter", sans-serif';
                successMessage.style.fontWeight = '400'; /* Añadimos Inter Extra Light */
                successMessage.textContent = 'Thank you for your submission. Our team will reach out to you shortly.';
                form.parentElement?.appendChild(successMessage);
              } else {
                alert('Failed to send the message. Please try again later.');
              }
            }}
          >
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                style={{ fontFamily: '"Inter", sans-serif', fontWeight: 400 }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 bg-gray-50 placeholder-gray-400 text-gray-800 transition-all duration-300"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="relative">
              <input
                type="tel"
                id="phone"
                name="phone"
                style={{ fontFamily: '"Inter", sans-serif', fontWeight: 400 }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 bg-gray-50 placeholder-gray-400 text-gray-800 transition-all duration-300"
                placeholder="Your Phone (e.g., +4512345678)"
                required
              />
            </div>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                style={{ fontFamily: '"Inter", sans-serif', fontWeight: 400 }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 bg-gray-50 placeholder-gray-400 text-gray-800 transition-all duration-300"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="relative">
              <select
                id="service"
                name="service"
                style={{ fontFamily: '"Inter", sans-serif', fontWeight: 400 }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 bg-white text-gray-800 appearance-none transition-all duration-300"
                defaultValue=""
                required
              >
                <option value="">Select Service</option>
                <option value="restaurant">Restaurant</option>
                <option value="hotel">Hotel</option>
                <option value="private_event">Private Event</option>
                <option value="home">Home</option>
                <option value="wedding">Wedding</option>
                <option value="shop">Shop</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                rows={4}
                style={{ fontFamily: '"Inter", sans-serif', fontWeight: 400 }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 bg-gray-50 placeholder-gray-400 text-gray-800 transition-all duration-300"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-black hover:text-gray-100 hover:duration-100 transition-colors duration-300 text-lg shadow-md" /* Quitamos font-serif, usamos Inter con 600 */
              style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600 }} /* Añadimos Inter Semi Bold */
            >
              Send Message
            </button>
          </motion.form>
        </motion.div>
      </section>

      <footer className="bg-gradient-to-b from-white to-gray-300 text-gray-300 py-10 mt-20 px-4 shadow-md relative" style={{
        // backgroundImage: "url('/images/bg3.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold text-gray-900 mb-6" /* Quitamos font-serif, usamos Inter con 600 */
                style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600 }} /* Añadimos Inter Semi Bold */
              >
                Contact Us
              </h4>
              <p className="text-base text-gray-700 mb-1" /* Quitamos font-serif, usamos Inter con 100 */
                style={{ fontFamily: '"Inter", sans-serif', fontWeight: 400 }} /* Añadimos Inter Extra Light */
              >
                Email: studiosobra.cph@gmail.com
              </p>
              <p className="text-base text-gray-700 mb-2" /* Quitamos font-serif, usamos Inter con 100 */
                style={{ fontFamily: '"Inter", sans-serif', fontWeight: 400 }} /* Añadimos Inter Extra Light */
              >
                Phone: +45 91658293
              </p>
              <div className="flex justify-center md:justify-around sm:mb-10 md:mt-10 space-x-4 mt-5">
                <a href="https://www.instagram.com/studio.sobra/" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-white hover:animate-pulse transition-colors">
                  <FontAwesomeIcon icon={faInstagram} size="2xl" />
                </a>
                <a href="https://www.instagram.com/studio.sobra/" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-white hover:animate-pulse transition-colors">
                  <FontAwesomeIcon icon={faFacebook} size="2xl" />
                </a>

              </div>
            </div>
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-900 mb-6" /* Quitamos font-serif, usamos Inter con 600 */
                style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600 }} /* Añadimos Inter Semi Bold */
              >
                Developed By
              </h4>
              <p className="text-base text-gray-900" /* Quitamos font-serif, usamos Inter con 100 */
                style={{ fontFamily: '"Inter", sans-serif', fontWeight: 400 }} /* Añadimos Inter Extra Light */
              >
                <a href="https://www.instagram.com/greencoding_/" target="_blank" rel="noopener noreferrer" className="text-gray-900 mb-6 hover:text-green-700 ">
                  <FontAwesomeIcon icon={faInstagram} style={{ marginTop: 4}}/> Greencode 
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
}