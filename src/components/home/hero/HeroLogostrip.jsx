import React from 'react';
import { motion } from 'framer-motion';

const logoList = [
  { name: 'Kling AI', logoUrl: '/logos/kling.svg', color: 'hover:shadow-[0_8px_20px_rgba(34,211,238,0.15)] hover:bg-cyan-500/5 hover:text-cyan-400' },
  { name: 'Veo 3', logoUrl: '/logos/gemini.svg', color: 'hover:shadow-[0_8px_20px_rgba(59,130,246,0.15)] hover:bg-blue-500/5 hover:text-blue-400' },
  { name: 'ElevenLabs', logoUrl: '/logos/elevenlabs.svg', color: 'hover:shadow-[0_8px_20px_rgba(16,185,129,0.15)] hover:bg-emerald-500/5 hover:text-emerald-400' },
  { name: 'Suno', logoUrl: '/logos/suno.svg', color: 'hover:shadow-[0_8px_20px_rgba(236,72,153,0.15)] hover:bg-pink-500/5 hover:text-pink-400' },
  { name: 'HeyGen', logoUrl: '/logos/heygen.svg', color: 'hover:shadow-[0_8px_20px_rgba(168,85,247,0.15)] hover:bg-purple-500/5 hover:text-purple-400' },
  { name: 'Grok', logoUrl: '/logos/grok.svg', color: 'hover:shadow-[0_8px_20px_rgba(6,182,212,0.15)] hover:bg-cyan-500/5 hover:text-cyan-400' },
  { name: 'Runway', logoUrl: '/logos/runway.svg', color: 'hover:shadow-[0_8px_20px_rgba(139,92,246,0.15)] hover:bg-violet-500/5 hover:text-violet-400' },
  { name: 'ChatGPT', logoUrl: '/logos/chatgpt.svg', color: 'hover:shadow-[0_8px_20px_rgba(16,185,129,0.15)] hover:bg-emerald-500/5 hover:text-emerald-400' }
];

export default function HeroLogostrip({ itemVariants }) {
  return (
    <motion.div
      variants={itemVariants}
      className="w-full max-w-5xl mx-auto select-none relative overflow-hidden"
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Label Header */}
      <p className="text-[9px] font-black uppercase tracking-widest text-brand-tint/25 text-center mb-5">
        Works with all major AI models & tools
      </p>

      {/* Fade Mask Container */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)] py-2">
        <div className="animate-marquee flex gap-4 pr-4">
          
          {/* First sequence of logos */}
          {logoList.map((tool, idx) => (
            <div
              key={`first-${idx}`}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-xl bg-brand-card/25 text-brand-tint/65 hover:text-white transition-all duration-300 hover:bg-brand-surface cursor-pointer group hover:-translate-y-0.5 shrink-0 ${tool.color}`}
            >
              <img 
                src={tool.logoUrl} 
                className="w-4 h-4 object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" 
                alt={tool.name} 
              />
              <span className="text-[11px] font-bold tracking-wide">{tool.name}</span>
            </div>
          ))}

          {/* Duplicated sequence for seamless looping */}
          {logoList.map((tool, idx) => (
            <div
              key={`second-${idx}`}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-xl bg-brand-card/25 text-brand-tint/65 hover:text-white transition-all duration-300 hover:bg-brand-surface cursor-pointer group hover:-translate-y-0.5 shrink-0 ${tool.color}`}
            >
              <img 
                src={tool.logoUrl} 
                className="w-4 h-4 object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" 
                alt={tool.name} 
              />
              <span className="text-[11px] font-bold tracking-wide">{tool.name}</span>
            </div>
          ))}
          
        </div>
      </div>
    </motion.div>
  );
}
