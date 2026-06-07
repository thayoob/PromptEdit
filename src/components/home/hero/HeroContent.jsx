import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Play, Check, ChevronRight } from 'lucide-react';

export default function HeroContent({ itemVariants, onWatchDemo }) {
  return (
    <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left gap-4 sm:gap-5 w-full overflow-hidden">
      
      {/* Live Trust Badge at the top */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-2 select-none mb-1 bg-brand-surface/40 border border-brand-border/40 px-2.5 py-1 rounded-full backdrop-blur-sm self-center lg:self-start shrink-0"
      >
        {/* Overlapping User Avatars */}
        <div className="flex -space-x-1">
          <div className="w-4.5 h-4.5 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 border border-brand-bg text-[7px] font-black text-white flex items-center justify-center shadow-sm">JK</div>
          <div className="w-4.5 h-4.5 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 border border-brand-bg text-[7px] font-black text-white flex items-center justify-center shadow-sm">MR</div>
          <div className="w-4.5 h-4.5 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 border border-brand-bg text-[7px] font-black text-white flex items-center justify-center shadow-sm">AS</div>
          <div className="w-4.5 h-4.5 rounded-full bg-gradient-to-tr from-rose-400 to-pink-500 border border-brand-bg text-[7px] font-black text-white flex items-center justify-center shadow-sm">TL</div>
        </div>

        {/* Text Stack & Active Pulse */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] sm:text-[11px] font-bold text-white/90">
            43,000+ creators trust PromptEdit
          </span>
          <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-[8.5px] sm:text-[9.5px] font-bold text-brand-accent/80 uppercase tracking-wide shrink-0">
            Live
          </span>
        </div>
      </motion.div>

      <style>{`
        @keyframes text-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-flow {
          background-size: 200% auto;
          animation: text-gradient 4s linear infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Redesigned 2-Line Headline (Centered on Mobile) */}
      <motion.h1
        variants={itemVariants}
        className="text-[25px] sm:text-4xl md:text-5xl lg:text-[46px] font-black tracking-tight text-white leading-[1.15] select-none text-center lg:text-left w-full"
      >
        Every AI tool you need. <br className="hidden sm:inline" />
        <span className="bg-gradient-to-r from-brand-accent via-indigo-400 to-violet-400 bg-clip-text text-transparent animate-gradient-flow">
          One place. Zero subscriptions.
        </span>
      </motion.h1>

      {/* Subtext (Centered on Mobile) */}
      <motion.p
        variants={itemVariants}
        className="text-brand-tint/70 text-[13px] sm:text-base md:text-lg max-w-xl leading-relaxed mt-0.5 text-center lg:text-left mx-auto lg:mx-0 w-full"
      >
        Access the best AI video, image, audio and voice tools in one powerful platform. Pay only for what you use.
      </motion.p>

      {/* Compact CTA Buttons (Side-by-Side on Mobile) */}
      <motion.div
        variants={itemVariants}
        className="flex flex-row items-center justify-center lg:justify-start gap-2.5 w-full sm:w-auto mt-1 shrink-0"
      >
        <button className="relative group px-4 sm:px-6 py-2 sm:py-3 rounded-full text-[11px] sm:text-sm font-extrabold text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-[0_0_20px_rgba(112,112,255,0.2)] shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-600 to-brand-accent transition-opacity duration-300 group-hover:opacity-95" />
          <div className="absolute -inset-x-20 top-0 bottom-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none" />
          <span className="relative flex items-center justify-center gap-1.5 z-10">
            <Zap className="w-3 h-3 fill-white text-white" />
            Get started free
            <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </button>

        <button
          onClick={onWatchDemo}
          className="px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-brand-border hover:border-brand-accent/40 text-[11px] sm:text-sm font-extrabold text-brand-tint hover:text-white bg-brand-surface/40 hover:bg-brand-surface/70 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98] shrink-0"
        >
          <Play className="w-3 h-3 fill-brand-accent text-brand-accent animate-pulse" />
          Watch demo
        </button>
      </motion.div>

      {/* Checkmark Bullets Styled as Compact Glass Feature Badges (Horizontal Swipe Scroll on Mobile) */}
      <motion.div
        variants={itemVariants}
        className="flex flex-row items-center justify-start sm:justify-center lg:justify-start overflow-x-auto no-scrollbar gap-2 mt-3 select-none w-full px-4 sm:px-0 whitespace-nowrap scroll-smooth pb-1 shrink-0"
      >
        {[
          'No monthly bills',
          'Pay per use',
          'All tools in one place',
          'Cancel anytime'
        ].map((text, idx) => (
          <div 
            key={idx} 
            className="flex items-center gap-1 bg-brand-surface/40 hover:bg-brand-surface/75 border border-brand-border/40 hover:border-brand-accent/25 px-2.5 py-1.2 rounded-full transition-all duration-200 text-[9.5px] sm:text-xs font-bold text-brand-tint/65 hover:text-white backdrop-blur-sm cursor-default hover:scale-[1.02] shadow-sm shrink-0"
          >
            <Check className="w-2.5 h-2.5 text-brand-accent stroke-[3.5] shrink-0" />
            <span>{text}</span>
          </div>
        ))}
      </motion.div>

    </div>
  );
}
