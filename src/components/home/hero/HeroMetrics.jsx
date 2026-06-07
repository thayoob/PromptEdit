import React from 'react';
import { motion } from 'framer-motion';

export default function HeroMetrics({ itemVariants }) {
  return (
    <motion.div
      variants={itemVariants}
      className="w-full bg-brand-card/10 rounded-2xl py-6 md:py-8 px-6 md:px-8 select-none backdrop-blur-md shadow-[0_15px_35px_rgba(0,0,0,0.4)]"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 items-center">
        {[
          { 
            value: '43,000+', 
            label: 'Creators', 
            textColor: 'from-purple-400 to-fuchsia-400 filter drop-shadow-[0_2px_8px_rgba(168,85,247,0.35)]'
          },
          { 
            value: '1.2M+', 
            label: 'Videos Generated', 
            textColor: 'from-brand-accent to-blue-400 filter drop-shadow-[0_2px_8px_rgba(56,189,248,0.35)]'
          },
          { 
            value: '98%', 
            label: 'Satisfaction Rate', 
            textColor: 'from-pink-400 to-rose-400 filter drop-shadow-[0_2px_8px_rgba(236,72,153,0.35)]'
          },
          { 
            value: '$2.3M+', 
            label: 'Saved in Subscriptions', 
            textColor: 'from-emerald-400 to-teal-400 filter drop-shadow-[0_2px_8px_rgba(16,185,129,0.35)]'
          }
        ].map((stat, idx) => (
          <div 
            key={idx} 
            className="flex flex-col items-center text-center px-2 md:px-4"
          >
            {/* Stat Stack */}
            <span className={`text-2xl md:text-3xl font-black tracking-tight leading-none bg-gradient-to-r bg-clip-text text-transparent ${stat.textColor}`}>
              {stat.value}
            </span>
            <span className="text-[9px] md:text-[10px] font-bold tracking-widest text-brand-tint/30 uppercase mt-2">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

