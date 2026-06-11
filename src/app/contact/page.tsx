'use client';

import { useState } from 'react';
import SharedNav from '@/components/SharedNav';
import { Baloo_2 } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, PageTransition } from '@/components/motion';

const baloo2 = Baloo_2({ subsets: ['latin'] });

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    captcha: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate captcha
    if (formData.captcha === '18') {
      setIsSubmitted(true);
      // Here you can add API call to send email
    } else {
      alert('Please solve the math problem correctly.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={`${baloo2.className} min-h-screen bg-gradient-to-b from-blue-50 to-white`}>
      <SharedNav />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Decorative elements */}
        <motion.div
          aria-hidden
          className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl"
          animate={{ x: [0, -40, 20, 0], y: [0, 30, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-400/20 to-transparent rounded-full blur-3xl"
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Wave at bottom */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-12 sm:h-16 md:h-20" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{transform: 'rotate(180deg)'}}>
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
          </svg>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <PageTransition className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Contact Us
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
            >
              We'd love to hear from you
            </motion.p>
          </PageTransition>
        </div>
      </section>

      {/* Contact Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              {/* Left Side - Text Content */}
              <Reveal direction="right" className="w-full lg:w-1/2">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Get In Touch
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  We're always happy to connect and support you. Whether you have a question about our services, need technical assistance, or want to discuss a new project, our team is here to help. Simply fill out the contact form with your details and message, and we'll respond as quickly as possible.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  We value clear communication and aim to provide timely, helpful responses to every inquiry. Your message matters to us, and we look forward to working with you and building a long-term partnership.
                </p>

                {/* Contact Info */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100 shadow-lg shadow-blue-900/5 hover:shadow-xl hover:shadow-blue-900/10 transition-shadow"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href="mailto:dev@pawgressapp.com" className="text-lg text-blue-600 hover:text-blue-700 font-semibold">
                        dev@pawgressapp.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-lg text-gray-700">United States</span>
                    </div>
                  </div>
                </motion.div>

                {/* Image */}
                <Reveal direction="up" delay={0.1} className="mt-8">
                  <motion.img
                    src="/dogs.webp"
                    alt="Dogs resting together"
                    className="rounded-3xl w-full shadow-xl shadow-blue-900/10"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  />
                </Reveal>
              </Reveal>

              {/* Right Side - Contact Form */}
              <Reveal direction="left" delay={0.1} className="w-full lg:w-1/2">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-xl border border-blue-100">
                  <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.35 }}
                    >
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                          <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-2">
                            Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                            placeholder="Your name"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-lg font-semibold text-gray-700 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                            placeholder="your.email@example.com"
                          />
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-lg font-semibold text-gray-700 mb-2">
                            Phone
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                            placeholder="(123) 456-7890"
                          />
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-lg font-semibold text-gray-700 mb-2">
                            Message *
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            rows={6}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                            placeholder="Tell us how we can help you..."
                          />
                        </div>

                        <div className="flex items-center gap-4">
                          <label htmlFor="captcha" className="text-lg font-semibold text-gray-700">
                            12 + 6 = 
                          </label>
                          <input
                            type="text"
                            id="captcha"
                            name="captcha"
                            required
                            value={formData.captcha}
                            onChange={handleChange}
                            className="w-24 px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                            placeholder="?"
                          />
                        </div>

                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.03, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xl font-bold py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-colors duration-300 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35"
                        >
                          Submit
                        </motion.button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="text-center py-12"
                    >
                      <motion.div
                        className="mb-6"
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.15 }}
                      >
                        <svg className="w-20 h-20 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </motion.div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h3>
                      <p className="text-xl text-gray-700 mb-6">
                        Your message has been received. We'll get back to you as soon as possible.
                      </p>
                      <motion.button
                        onClick={() => setIsSubmitted(false)}
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold px-8 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-colors duration-300 shadow-lg shadow-blue-600/25"
                      >
                        Send Another Message
                      </motion.button>
                    </motion.div>
                  )}
                  </AnimatePresence>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
