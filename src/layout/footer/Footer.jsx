import React from 'react';

const footerLinks = {
  platform: {
    title: 'Platform',
    links: [
      { name: 'Pricing', href: '#pricing' },
      { name: 'Tool Explorer', href: '#tool-explorer' },
      { name: 'Savings Calculator', href: '#savings-calculator' },
      { name: 'Templates Library', href: '#templates-library' }
    ]
  },
  company: {
    title: 'Company',
    links: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Contact', href: '#contact' },
      { name: 'Blog', href: '#blog' }
    ]
  },
  legal: {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Licensing', href: '#licensing' }
    ]
  }
};

export default function Footer() {
  return (
    <footer className="bg-[#050811]/90 border-t border-brand-border/40 pt-8 pb-12 md:py-16 relative overflow-hidden select-none">
      {/* Background ambient light */}
      <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10 md:gap-12 items-start">
          
          {/* Left Column: Brand Info */}
          <div className="md:col-span-3 flex flex-col gap-4 text-left">
            <div className="flex items-center gap-3">
              <img
                src="/Logo.png"
                alt="PromptEdit Logo"
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-xs sm:text-sm text-brand-tint/50 leading-relaxed max-w-sm">
              The all-in-one AI creator workspace. Pay only for what you use, skip the multiple subscriptions, and create faster.
            </p>
            <span className="text-[11px] text-brand-tint/30 font-medium mt-2">
              &copy; {new Date().getFullYear()} PromptEdit. All rights reserved.
            </span>
          </div>

          {/* Right Columns: Links Grid */}
          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8 text-left w-full">
            
            {/* Platform links */}
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                {footerLinks.platform.title}
              </span>
              <ul className="flex flex-col gap-2.5">
                {footerLinks.platform.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm text-brand-tint/40 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company links */}
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                {footerLinks.company.title}
              </span>
              <ul className="flex flex-col gap-2.5">
                {footerLinks.company.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm text-brand-tint/40 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal links */}
            <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                {footerLinks.legal.title}
              </span>
              <ul className="flex flex-col gap-2.5">
                {footerLinks.legal.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm text-brand-tint/40 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
}
