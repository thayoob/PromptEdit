import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, ArrowRight } from 'lucide-react';

export default function FooterCTA() {
  const containerRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const checklistItems = [
    'Access to top AI creation tools',
    'Professional creator templates & assets',
    'Commercial-ready content workflows',
    'One platform. One account. No tool-hopping.'
  ];

  return (
    <section className="pt-4 md:pt-8 pb-10 md:pb-16 w-full bg-[radial-gradient(ellipse_80%_65%_at_50%_50%,#080f24_0%,#09090f_70%)] relative overflow-hidden select-none">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-brand-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Glow-spotlight Outer Card Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            backgroundImage: isHovered
              ? `radial-gradient(500px circle at ${coords.x}px ${coords.y}px, rgba(56, 189, 248, 0.08), transparent 85%)`
              : 'none',
          }}
          className="w-full bg-gradient-to-br from-brand-card/30 via-brand-surface/40 to-brand-card/30 border border-brand-accent/20 rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl relative overflow-hidden transition-all duration-300 hover:border-brand-accent/35"
        >
          {/* Card ambient corner highlights */}
          <div className="absolute -right-24 -top-24 w-72 h-72 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-24 -bottom-24 w-72 h-72 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

          {/* Split 2-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-12 items-center relative z-10">
            
            {/* Left Column (Checklist, Title & CTA Action) - Span 3 */}
            <div className="lg:col-span-3 flex flex-col gap-8 text-left">
              <div>
                <h2 className="text-3xl sm:text-[40px] font-black text-white tracking-tight leading-[1.12] mb-4">
                  Ready to Create <span className="text-brand-accent">Better Content?</span>
                </h2>
                <p className="text-sm sm:text-base text-brand-tint/65 leading-relaxed max-w-xl">
                  Stop paying for multiple AI subscriptions and start creating faster with everything you need in one place — pay only for what you use.
                </p>
              </div>

              {/* 2x2 Value Props Checklist Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {checklistItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-accent/15 flex items-center justify-center text-brand-accent shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-brand-tint/80 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button and Trust Footnote */}
              <div className="flex flex-col gap-4 mt-2">
                <button className="relative group px-8 py-4 bg-white hover:bg-white/95 text-brand-bg font-extrabold text-sm rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_25px_rgba(255,255,255,0.15)] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 w-full sm:w-fit shrink-0">
                  <span>Get Started Free</span>
                  <ArrowRight className="w-4 h-4 text-brand-bg transition-transform group-hover:translate-x-0.5" />
                </button>
                
                <span className="text-[10px] font-bold text-brand-tint/30 uppercase tracking-wider pl-1 select-none">
                  No subscriptions required • Pay only for what you use • Cancel anytime
                </span>
              </div>
            </div>

            {/* Right Column (Guarantee Shield Card & Creators Pill) - Span 2 */}
            <div className="lg:col-span-2 flex flex-col gap-6 w-full">
              
              {/* Money Back Guarantee Glass Card */}
              <div className="bg-brand-surface/40 border border-brand-accent/10 p-6 rounded-2xl backdrop-blur-md text-left shadow-lg relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center gap-3 mb-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400 shrink-0 border border-amber-500/20">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm sm:text-base font-extrabold text-white">
                    30-Day Money-Back Guarantee
                  </h4>
                </div>
                
                <p className="text-xs sm:text-sm text-brand-tint/50 leading-relaxed">
                  Try PromptEdit risk-free for 30 days. If you're not completely satisfied, we'll refund your purchase. No complicated forms. No hidden conditions.
                </p>
              </div>

              {/* Social Proof Trust Stack */}
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-brand-card/10 border border-brand-border/30 px-5 py-4.5 rounded-2xl backdrop-blur-sm">
                {/* Overlaying Initials Avatars Pile */}
                <div className="flex -space-x-3 shrink-0">
                  <div className="w-8 h-8 rounded-full bg-brand-accent/20 border border-brand-bg text-[10px] font-black text-brand-accent flex items-center justify-center">BH</div>
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-brand-bg text-[10px] font-black text-emerald-400 flex items-center justify-center">HS</div>
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-brand-bg text-[10px] font-black text-blue-400 flex items-center justify-center">ML</div>
                </div>
                
                <div className="flex flex-col text-left">
                  <span className="text-xs font-extrabold text-white">
                    Join 43,000+ Creators Today
                  </span>
                  <span className="text-[10px] text-brand-tint/40 font-semibold mt-0.5 leading-snug">
                    Creators, marketers, agencies, and video editors streamline their workflows daily.
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
