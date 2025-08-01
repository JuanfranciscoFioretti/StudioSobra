'use client';

import Layout from '../components/Layout';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useState, useCallback } from 'react';
import DynamicImageSection from './DynamicImageSection';

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
    { id: 1, title: "Restaurant Decor", image: "/images/proj13.jpg", images: ["/images/proj13.jpg", "/images/proj13.jpg"], description: "A stunning floral installation that transforms spaces with natural elegance." },
    { id: 2, title: "Private Events", image: "/images/proj9.jpg", images: ["/images/proj9.jpg", "/images/proj9.jpg"], description: "Elegant event decor blending sophistication with botanical charm." },
    { id: 3, title: "Wedding Decor", image: "/images/proj8.jpg", images: ["/images/proj8.jpg", "/images/proj8.jpg"], description: "Elegant event decor blending sophistication with botanical charm." },
    { id: 4, title: "House Decor", image: "/images/proj10.jpg", images: ["/images/proj10.jpg", "/images/proj10.jpg"], description: "Elegant event decor blending sophistication with botanical charm." },
  ];

  const products = [
    { id: 1, name: "Bouquets", image: "/images/proj17.jpg", price: "350 DKK", description: "Vibrant floral arrangements for any occasion." },
    { id: 2, name: "Product of the Week", image: "/images/proj15.jpg", price: "630 DKK", description: "Our signature floral creation, updated weekly.", highlight: true },
    { id: 3, name: "Restaurant Decor", image: "/images/proj9.jpg", price: "525 DKK", description: "Elegant designs to enhance dining spaces." },
    { id: 4, name: "Event Decor", image: "/images/proj11.jpg", price: "700 DKK", description: "Bespoke decor for unforgettable events." },
    { id: 5, name: "Bouquets", image: "/images/proj13.jpg", price: "400 DKK", description: "Charming event decor blending elegance with botanical charm." },
    { id: 6, name: "Hotel Decor", image: "/images/proj14.jpg", price: "580 DKK", description: "Elegant event decor blending sophistication with botanical charm." },
  ];

  const testimonials = [
    { id: 1, text: "The floral installation for our event was breathtaking—Studio Sobra brought our vision to life with elegance and creativity.", author: "Anna K., Event Planner", stars: 5, image: "/images/user1.png" },
    { id: 2, text: "Their attention to detail and innovative designs transformed our restaurant’s ambiance—truly exceptional work.", author: "Lars M., Restaurant Owner", stars: 5, image: "/images/user2.jpg" },
    { id: 3, text: "A beautiful and professional service that exceeded our expectations.", author: "Sofia P., Client", stars: 4, image: "/images/user3.png" },
  ];

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
        className="min-h-[70vh] py-16 px-4 bg-gray-50 flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={projectsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-6xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => {
              const isExpanded = expandedProject === project.id;
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: project.id * 0.1 }}
                  className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
                  onClick={(e) => handleCardClick(project.id, e)}
                  style={{
                    position: 'relative',
                    height: '400px', // Fixed height to maintain card size
                    overflow: 'hidden',
                  }}
                >
                  <motion.div
                    initial={false}
                    animate={{ height: isExpanded ? '128px' : '256px' }} // Shrink from 256px to 128px
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, overflow: 'hidden', transformOrigin: 'bottom' }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={1200}
                      height={768}
                      className="w-full object-cover transition-transform duration-300"
                      style={{ height: '100%', objectFit: 'cover' }} // Dynamic height with cover fit
                    />
                  </motion.div>
                  <motion.div
                    initial={false}
                    animate={{ y: isExpanded ? '-150px' : 0 }} // Shift content up more for better centering
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="p-4 relative"
                    style={{ height: 'calc(100% - 256px)', position: 'absolute', top: '256px', left: 0, right: 0 }}
                  >
                    <motion.h3
                      className="text-2xl font-serif font-semibold text-gray-800"
                      initial={false}
                      animate={isExpanded ? { y: 20, opacity: 0 } : { y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      {project.title}
                    </motion.h3>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 250, opacity: 1 }} // Adjusted height to fit within space
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 150, damping: 30 }}
                        className="mt-2 p-4"
                        style={{
                          background: 'linear-gradient(to bottom, rgba(243, 244, 246, 0.1) 0%, rgba(243, 244, 246, 0) 100%)',
                          overflow: 'hidden',
                        }}
                      >
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          {project.images.map((img, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ scale: 0.95, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: idx * 0.1, duration: 0.4 }}
                            >
                              <Image
                                src={img}
                                alt={`${project.title} image ${idx + 1}`}
                                width={300}
                                height={200}
                                className="w-full h-32 object-cover rounded-lg"
                              />
                            </motion.div>
                          ))}
                        </div>
                        <p className="text-base font-serif text-gray-600 leading-relaxed">{project.description}</p>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      <section
        id="products"
        ref={productsRef}
        className="min-h-[70vh] py-16 px-4 bg-white flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={productsInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center w-full max-w-6xl"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-800 mb-8">Our Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-16 justify-items-center relative" style={{ gap: '16px' }}>
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={productsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`bg-gray-50 rounded-xl shadow-lg p-6 text-center w-80 transform hover:scale-105 transition-transform duration-300 border ${product.highlight ? 'border-green-100 animate-moving-border' : 'border-gray-200'}`}
                style={{ minHeight: '420px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={400}
                    className="w-full h-48 object-cover mb-4 rounded-t-lg"
                  />
                  <h3 className="text-xl font-serif font-bold text-green-700 mb-2">{product.name}</h3>
                  <p className="text-sm font-serif text-gray-600 mb-4 flex-grow">{product.description}</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-serif text-gray-800 mb-4">{product.price}</p>
                  <Link href="#contact" className="bg-green-300 text-white w-full py-3 rounded-xl hover:bg-green-400 transition-colors duration-200 shadow-md block text-center">
                    Order
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section
        id="about"
        ref={aboutRef}
        className="min-h-[70vh] py-16 px-4 bg-gray-50 flex items-center justify-center"
        style={{backgroundImage: "url('/images/bg1.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}
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
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-800 mb-8">About Us</h2>
          <p className="text-base font-serif text-gray-600 leading-relaxed">
            We are a distinguished landscape and floral design studio based in the heart of Copenhagen. With a legacy of meticulous craftsmanship and an unwavering commitment to excellence, we craft immersive botanical installations that seamlessly blend the untamed beauty of nature with intentional, sophisticated design, accented by an industrial edge. Our passion is to transform ordinary spaces into extraordinary, living artworks that captivate the senses and inspire the soul. Drawing from a deep appreciation for both tradition and innovation, we collaborate closely with our clients to bring their visions to life, creating bespoke experiences that leave a lasting impression.
          </p>
        </motion.div>
      </section>

      <section
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
      </section>

      <section
        id="contact"
        ref={contactRef}
        className="min-h-[70vh] py-16 px-4 bg-gray-50 flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={contactInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center max-w-sm lg:max-w-xs bg-white rounded-xl shadow-2xl p-6 border border-gray-200"
          style={{ width: '100vw', maxWidth: '700px', overflow: 'hidden' }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-800 mb-6">Contact Us</h2>
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
                  to: 'juanfrafio125@gmail.com',
                  subject: `New Contact Form Submission - ${service}`,
                  text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\nMessage: ${message}`,
                }),
              });
              if (response.ok) {
                form.style.display = 'none';
                const successMessage = document.createElement('div');
                successMessage.className = 'text-green-700 font-serif text-lg mt-6';
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 placeholder-gray-400 text-gray-800 transition-all duration-300"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="relative">
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 placeholder-gray-400 text-gray-800 transition-all duration-300"
                placeholder="Your Phone (e.g., +4512345678)"
                required
              />
            </div>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 placeholder-gray-400 text-gray-800 transition-all duration-300"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="relative">
              <select
                id="service"
                name="service"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-800 appearance-none transition-all duration-300"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 placeholder-gray-400 text-gray-800 transition-all duration-300"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors duration-300 font-serif text-lg shadow-md"
            >
              Send Message
            </button>
          </motion.form>
        </motion.div>
      </section>

      <footer className="bg-gradient-to-t from-gray-50 to-gray-100 text-gray-800 py-6 px-4 shadow-md relative" style={{
        backgroundImage: "url('/images/bg3.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h4 className="text-lg font-serif font-semibold text-green-600 mb-2">Contact Us</h4>
              <p className="text-base font-serif text-gray-500 mb-1">Email: studiosobra.cph@gmail.com</p>
              <p className="text-base font-serif text-gray-500 mb-2">Phone: +45 91658293</p>
              <div className="flex justify-center md:justify-start space-x-4">
                <a href="https://www.instagram.com/studiosobra/" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors">
                  <i className="fab fa-instagram text-2xl"></i>
                </a>
                <a href="https://www.facebook.com/studiosobra/" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors">
                  <i className="fab fa-facebook text-2xl"></i>
                </a>
              </div>
            </div>
            <div className="text-center">
              <h4 className="text-lg font-serif font-semibold text-green-600 mb-2">Developed By</h4>
              <p className="text-base font-serif text-gray-500">
                <a href="https://www.instagram.com/greencoding_/" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:underline">
                  Greencode
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
}