import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Header from './header/Header';
import Footer from './footer/Footer';

export default function Layout({ children }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-brand-bg text-brand-tint overflow-x-hidden selection:bg-brand-primary/30 selection:text-white">

      {/* Premium Header */}
      <Header />
      
      <main className="relative w-full">
        {children}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Go to Top Floating Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 450, damping: 18 }}
            className="fixed bottom-6 right-6 z-50 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-brand-surface/60 hover:bg-brand-surface/95 border border-brand-accent/20 hover:border-brand-accent/50 text-white cursor-pointer backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-colors duration-300"
            title="Go to Top"
          >
            <ArrowUp className="w-5 h-5 text-brand-accent" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
