import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

import HeroContent from './hero/HeroContent';
import HeroMockup from './hero/HeroMockup';
import HeroMetrics from './hero/HeroMetrics';
import HeroLogostrip from './hero/HeroLogostrip';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMouseOver, setIsMouseOver] = useState(false);
  const sectionRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    if (isVideoOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVideoOpen]);

  // Handle escape key to close video modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsVideoOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      className="relative w-full pt-24 md:pt-28 pb-12 overflow-hidden bg-[radial-gradient(ellipse_90%_70%_at_50%_55%,#0c1830_0%,#09090f_70%)] border-b border-white/[0.04]"
    >
      <style>{`
        .bg-grid-line {
          background-size: 44px 44px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
        }
        @keyframes float-slow-1 {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float-slow-2 {
          0% { transform: translate(0px, 0px) scale(1.15); }
          33% { transform: translate(-50px, 40px) scale(0.9); }
          66% { transform: translate(40px, -30px) scale(1.05); }
          100% { transform: translate(0px, 0px) scale(1.15); }
        }
        .animate-float-slow-1 {
          animation: float-slow-1 18s infinite ease-in-out;
        }
        .animate-float-slow-2 {
          animation: float-slow-2 22s infinite ease-in-out;
        }
      `}</style>

      {/* Premium background grid lines with radial fade mask */}
      <div className="absolute inset-0 bg-grid-line pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,white_30%,transparent_90%)] opacity-85" />

      {/* Cursor spotlight layer */}
      {isMouseOver && (
        <div
          className="absolute pointer-events-none w-[600px] h-[600px] rounded-full bg-brand-accent/5 blur-[120px] transition-opacity duration-300"
          style={{
            left: `${mousePos.x - 300}px`,
            top: `${mousePos.y - 300}px`,
          }}
        />
      )}

      {/* Floating glowing light effects */}
      <div className="absolute top-[10%] left-[5%] w-[450px] h-[450px] bg-violet-600/8 rounded-full blur-[110px] pointer-events-none animate-float-slow-1" />
      <div className="absolute top-[25%] right-[5%] w-[450px] h-[450px] bg-brand-accent/8 rounded-full blur-[110px] pointer-events-none animate-float-slow-2" />
      <div className="absolute bottom-[10%] left-[30%] w-[350px] h-[350px] bg-fuchsia-600/5 rounded-full blur-[100px] pointer-events-none animate-float-slow-1" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-6 flex flex-col gap-8 md:gap-10"
      >
        {/* Main Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <HeroContent itemVariants={itemVariants} onWatchDemo={() => setIsVideoOpen(true)} />
          <HeroMockup itemVariants={itemVariants} onWatchDemo={() => setIsVideoOpen(true)} />
        </div>

        {/* Bottom Metrics Stats Card */}
        <HeroMetrics itemVariants={itemVariants} />

        {/* Footer Integration Logostrip */}
        <HeroLogostrip itemVariants={itemVariants} />

      </motion.div>

      {/* Video Modal Overlay */}
      <AnimatePresence>
        {isVideoOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVideoOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-5xl aspect-video bg-[#0b0f19] border border-brand-border/60 rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.85)] overflow-hidden z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-brand-surface/80 hover:bg-brand-surface border border-brand-border/65 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Iframe video container */}
              <div className="w-full h-full relative">
                <iframe
                  src="https://fast.wistia.net/embed/iframe/eu37od3pav?web_component=true&seo=true"
                  title="Product Demo Video"
                  allow="autoplay; fullscreen"
                  allowTransparency="true"
                  frameBorder="0"
                  scrolling="no"
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
