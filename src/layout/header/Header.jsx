import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, Menu, X } from 'lucide-react';

const dropdownData = {
  aiTools: {
    title: 'AI Tools',
    items: ['AI Video', 'AI Images', 'AI Audio', 'AI Voice']
  },
  templates: {
    title: 'Templates',
    items: ['LUTs', 'Overlays', 'Backgrounds', 'Sound Effects', 'Text Animations']
  },
  plugins: {
    title: 'Plugins',
    items: ['Premiere Pro', 'DaVinci Resolve']
  }
};

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileSection, setExpandedMobileSection] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef(null);

  // Scroll detection — header gains bg after 80px
  useEffect(() => {
    // Reset scroll on fresh load
    window.scrollTo(0, 0);
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Desktop Hover Controls
  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  // Mobile Accordion Control
  const toggleMobileSection = (section) => {
    setExpandedMobileSection(expandedMobileSection === section ? null : section);
  };

  // Close all menus helper
  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setExpandedMobileSection(null);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* ──────────────────────────────────────────────────────────
          DESKTOP HEADER: Sleek Horizontal Capsule
          ────────────────────────────────────────────────────────── */}
      <div 
        className="hidden md:block fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl"
        onMouseLeave={handleMouseLeave}
      >
        <header
          className="w-full rounded-full px-6 py-3 transition-all duration-500 flex items-center justify-between relative"
          style={{
            background          : 'rgba(9,9,15,0.78)',
            border              : '1px solid rgba(56,189,248,0.2)',
            boxShadow           : scrolled ? '0 15px 40px rgba(0,0,0,0.6)' : '0 8px 32px rgba(0,0,0,0.35)',
            backdropFilter      : 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          
          {/* Ambient inner border glow */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent pointer-events-none" />

          {/* Left Logo */}
          <div className="flex items-center cursor-pointer select-none transition-transform duration-300 hover:scale-[1.03]" onClick={closeAllMenus}>
            <img
              src="/Logo.png"
              alt="PromptEdit Logo"
              className="h-7.5 w-auto object-contain"
            />
          </div>

          {/* Center Nav Links */}
          <nav className="flex items-center gap-6 select-none">
            {/* AI Tools */}
            <div
              className="relative py-2"
              onMouseEnter={() => handleMouseEnter('aiTools')}
            >
              <button className={`flex items-center gap-1 text-[13.5px] font-bold tracking-wide transition-colors duration-200 cursor-pointer ${activeDropdown === 'aiTools' ? 'text-white' : 'text-brand-tint/70 hover:text-white'}`}>
                AI Tools
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === 'aiTools' ? 'rotate-180 text-brand-accent' : 'text-brand-tint/30'}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'aiTools' && (
                  <DesktopDropdown content={dropdownData.aiTools} onClose={closeAllMenus} />
                )}
              </AnimatePresence>
            </div>

            {/* Templates */}
            <div
              className="relative py-2"
              onMouseEnter={() => handleMouseEnter('templates')}
            >
              <button className={`flex items-center gap-1 text-[13.5px] font-bold tracking-wide transition-colors duration-200 cursor-pointer ${activeDropdown === 'templates' ? 'text-white' : 'text-brand-tint/70 hover:text-white'}`}>
                Templates
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === 'templates' ? 'rotate-180 text-brand-accent' : 'text-brand-tint/30'}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'templates' && (
                  <DesktopDropdown content={dropdownData.templates} onClose={closeAllMenus} />
                )}
              </AnimatePresence>
            </div>

            {/* Pricing */}
            <div className="py-2">
              <a
                href="#pricing"
                className="text-[13.5px] font-bold tracking-wide text-brand-tint/70 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                Pricing
              </a>
            </div>

            {/* Plugins */}
            <div
              className="relative py-2"
              onMouseEnter={() => handleMouseEnter('plugins')}
            >
              <button className={`flex items-center gap-1 text-[13.5px] font-bold tracking-wide transition-colors duration-200 cursor-pointer ${activeDropdown === 'plugins' ? 'text-white' : 'text-brand-tint/70 hover:text-white'}`}>
                Plugins
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === 'plugins' ? 'rotate-180 text-brand-accent' : 'text-brand-tint/30'}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'plugins' && (
                  <DesktopDropdown content={dropdownData.plugins} onClose={closeAllMenus} />
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-4">
            <button className="text-[13.5px] font-bold text-brand-tint/70 hover:text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
              Log In
            </button>

            <button className="relative group px-4.5 py-2 rounded-full text-[13.5px] font-extrabold text-white overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-md cursor-pointer flex items-center justify-center gap-1">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-accent opacity-95 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute -inset-x-20 top-0 bottom-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none" />
              <span className="relative flex items-center gap-1.5 z-10">
                Get Started Free
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </button>
          </div>

        </header>
      </div>

      {/* ──────────────────────────────────────────────────────────
          MOBILE HEADER: Compact Pill + Hamburger Menu
          ────────────────────────────────────────────────────────── */}
      <div className="block md:hidden fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] select-none">
        <header
          className="w-full rounded-full px-5 py-3 flex items-center justify-between relative transition-all duration-500"
          style={{
            background          : 'rgba(9,9,15,0.78)',
            border              : '1px solid rgba(56,189,248,0.2)',
            boxShadow           : scrolled ? '0 15px 40px rgba(0,0,0,0.6)' : '0 8px 32px rgba(0,0,0,0.35)',
            backdropFilter      : 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          
          {/* Logo */}
          <div className="flex items-center cursor-pointer transition-transform duration-300 active:scale-95" onClick={closeAllMenus}>
            <img
              src="/Logo.png"
              alt="PromptEdit Logo"
              className="h-7 w-auto object-contain"
            />
          </div>

          {/* Hamburger Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-9 h-9 rounded-full bg-brand-surface border border-brand-border/60 flex items-center justify-center focus:outline-none cursor-pointer text-brand-tint hover:text-white transition-colors duration-200"
            aria-label="Toggle Menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-center"
                >
                  <X className="w-4.5 h-4.5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-center"
                >
                  <Menu className="w-4.5 h-4.5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </header>

        {/* ──────────────────────────────────────────────────────────
            MOBILE DRAWER MENU: Vertically Stacked Glass Overlay
            ────────────────────────────────────────────────────────── */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Slide-down Drawer Panel */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="fixed inset-x-0 top-0 mt-[74px] bg-[#09090f]/95 border border-brand-accent/20 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.65)] backdrop-blur-xl z-40 mx-4 flex flex-col items-center select-none"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-brand-accent/5 rounded-full blur-2xl pointer-events-none" />

                <div className="flex flex-col items-center w-full relative z-10">
                  {/* Logo Centered */}
                  <div className="flex items-center justify-center mb-0.5">
                    <img
                      src="/Logo.png"
                      alt="PromptEdit Logo"
                      className="h-7.5 w-auto object-contain"
                    />
                  </div>

                  {/* Divider */}
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-brand-border/30 to-transparent my-2.5" />

                  {/* Vertical Accordion Navigation */}
                  <nav className="flex flex-col gap-0.5 w-full text-center">
                    
                    {/* AI Tools */}
                    <div className="w-full border-b border-brand-border/20 pb-0.5">
                      <button
                        onClick={() => toggleMobileSection('aiTools')}
                        className={`w-full flex items-center justify-center gap-1 py-2 text-[13.5px] font-bold transition-colors duration-200 ${expandedMobileSection === 'aiTools' ? 'text-white' : 'text-brand-tint/75'}`}
                      >
                        AI Tools
                        <ChevronDown className={`w-3.5 h-3.5 text-brand-tint/30 transition-transform duration-350 ${expandedMobileSection === 'aiTools' ? 'rotate-180 text-brand-accent' : ''}`} />
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {expandedMobileSection === 'aiTools' && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden flex flex-col gap-0.5 bg-brand-card/25 rounded-lg px-2 py-1 border border-brand-border/20 mt-0.5"
                          >
                            {dropdownData.aiTools.items.map((item, idx) => (
                              <MobileNavItem key={idx} item={item} onClick={closeAllMenus} />
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Templates */}
                    <div className="w-full border-b border-brand-border/20 pb-0.5">
                      <button
                        onClick={() => toggleMobileSection('templates')}
                        className={`w-full flex items-center justify-center gap-1 py-2 text-[13.5px] font-bold transition-colors duration-200 ${expandedMobileSection === 'templates' ? 'text-white' : 'text-brand-tint/75'}`}
                      >
                        Templates
                        <ChevronDown className={`w-3.5 h-3.5 text-brand-tint/30 transition-transform duration-350 ${expandedMobileSection === 'templates' ? 'rotate-180 text-brand-accent' : ''}`} />
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {expandedMobileSection === 'templates' && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden flex flex-col gap-0.5 bg-brand-card/25 rounded-lg px-2 py-1 border border-brand-border/20 mt-0.5"
                          >
                            {dropdownData.templates.items.map((item, idx) => (
                              <MobileNavItem key={idx} item={item} onClick={closeAllMenus} />
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Pricing */}
                    <div className="w-full border-b border-brand-border/20">
                      <a
                        href="#pricing"
                        onClick={closeAllMenus}
                        className="block w-full py-2 text-[13.5px] font-bold text-brand-tint/75 hover:text-white"
                      >
                        Pricing
                      </a>
                    </div>

                    {/* Plugins */}
                    <div className="w-full border-b border-brand-border/20 pb-0.5">
                      <button
                        onClick={() => toggleMobileSection('plugins')}
                        className={`w-full flex items-center justify-center gap-1 py-2 text-[13.5px] font-bold transition-colors duration-200 ${expandedMobileSection === 'plugins' ? 'text-white' : 'text-brand-tint/75'}`}
                      >
                        Plugins
                        <ChevronDown className={`w-3.5 h-3.5 text-brand-tint/30 transition-transform duration-350 ${expandedMobileSection === 'plugins' ? 'rotate-180 text-brand-accent' : ''}`} />
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {expandedMobileSection === 'plugins' && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden flex flex-col gap-0.5 bg-brand-card/25 rounded-lg px-2 py-1 border border-brand-border/20 mt-0.5"
                          >
                            {dropdownData.plugins.items.map((item, idx) => (
                              <MobileNavItem key={idx} item={item} onClick={closeAllMenus} />
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                  </nav>

                  {/* Divider */}
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-brand-border/30 to-transparent my-3" />

                  {/* Actions Stacked (Get Started Button is now small and pill-shaped) */}
                  <div className="flex flex-col items-center gap-2.5 w-full">
                    <button 
                      onClick={closeAllMenus}
                      className="text-[13px] font-extrabold text-brand-tint/60 hover:text-white transition-all duration-200 active:scale-[0.98] py-0.5 cursor-pointer"
                    >
                      Log In
                    </button>

                    <button 
                      onClick={closeAllMenus}
                      className="relative group w-auto px-6 py-2 rounded-full text-xs font-bold text-white overflow-hidden shadow-md flex items-center justify-center gap-1 active:scale-[0.98] cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-accent opacity-95" />
                      <span className="relative flex items-center gap-1 z-10">
                        Get Started Free
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  </div>
                </div>

              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

// Subcomponent: Desktop Dropdown popover
function DesktopDropdown({ content, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[200px] bg-brand-surface border border-brand-accent/20 rounded-xl p-2.5 shadow-[0_15px_45px_rgba(0,0,0,0.65)] backdrop-blur-xl z-50 text-left overflow-hidden"
    >
      <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-brand-accent/5 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-1 w-full">
        <div className="px-2 pb-1.5 pt-0.5 border-b border-brand-border/40 mb-1.5">
          <span className="text-[10px] font-bold tracking-wider text-brand-tint/40 uppercase">
            {content.title}
          </span>
        </div>

        <div className="flex flex-col gap-0.5">
          {content.items.map((item, idx) => (
            <a
              key={idx}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={onClose}
              className="block w-full px-2.5 py-1.8 rounded-lg text-[13px] font-bold text-brand-tint/70 hover:text-white hover:bg-brand-card/70 border border-transparent transition-all duration-150"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Subcomponent: Mobile Nav Item list
function MobileNavItem({ item, onClick }) {
  return (
    <a
      href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
      onClick={onClick}
      className="block w-full py-2 px-3 rounded-lg text-sm font-semibold text-brand-tint/70 hover:text-white hover:bg-brand-card/40 transition-colors duration-150 text-center"
    >
      {item}
    </a>
  );
}
