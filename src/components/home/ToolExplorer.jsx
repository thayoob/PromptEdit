import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video, Image, Music, Puzzle, Sparkles, ArrowRight, User, Share2,
  LayoutGrid, Edit3, PlayCircle, Megaphone, Film, Smartphone, Tv,
  Mic, UserCheck, RefreshCw, Volume2, HelpCircle, X, Cpu, Layers, Sliders
} from 'lucide-react';

const categoryData = {
  image: {
    id: 'image',
    name: 'AI Image',
    icon: Image,
    colorClass: 'text-purple-400',
    themeColor: 'purple',
    glowClass: 'shadow-[0_12px_30px_rgba(168,85,247,0.12)]',
    bgClass: 'bg-purple-500/5',
    activeTabClass: 'bg-purple-500/10 text-purple-400 shadow-[0_4px_15px_rgba(168,85,247,0.15)]',
    brands: [
      { name: 'Nano Banana', logo: '/logos/gemini.svg', icon: Image },
      { name: 'Grok', logo: '/logos/grok.svg', icon: Cpu },
      { name: 'ChatGPT', logo: '/logos/chatgpt.svg', icon: Sparkles },
      { name: 'Ideogram', logo: '/logos/ideogram.svg', icon: Layers }
    ],
    cards: [
      {
        id: 'img-clones',
        title: 'AI Clones',
        type: 'AI Avatar',
        capabilities: ['100% likeness match', 'Studio quality lighting', 'Custom expressions & poses'],
        videoUrl: 'https://fast.wistia.net/embed/iframe/6ugrp949dp?web_component=true&seo=true',
        icon: User,
        gradient: 'from-purple-950/20 via-[#0a0614] to-purple-950/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] hover:bg-purple-500/[0.02]'
      },
      {
        id: 'img-social',
        title: 'Social Media Posts',
        type: 'Social Asset',
        capabilities: ['Optimized dimensions', 'Auto captions generation', 'High-converting templates'],
        videoUrl: 'https://fast.wistia.net/embed/iframe/5bzldtmz36?web_component=true&seo=true',
        icon: Share2,
        gradient: 'from-blue-950/20 via-[#040714] to-blue-950/10 hover:shadow-[0_0_20px_rgba(56,189,248,0.1)] hover:bg-sky-500/[0.02]'
      },
      {
        id: 'img-graphic',
        title: 'Graphic Design',
        type: 'Design Engine',
        capabilities: ['Vector export support', 'Precise brand colors', 'Fast mockup renders'],
        videoUrl: 'https://fast.wistia.net/embed/iframe/kvqvjrid9z?web_component=true&seo=true',
        icon: LayoutGrid,
        gradient: 'from-amber-950/20 via-[#140b04] to-amber-950/10 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] hover:bg-amber-500/[0.02]'
      },
      {
        id: 'img-edit',
        title: 'Image Editing',
        type: 'AI Editor',
        capabilities: ['1-click object removal', 'Smart background swaps', 'Quality resolution upscaling'],
        videoUrl: 'https://fast.wistia.net/embed/iframe/72zakh7jbf?web_component=true&seo=true',
        icon: Edit3,
        gradient: 'from-pink-950/20 via-[#140409] to-pink-950/10 hover:shadow-[0_0_20px_rgba(236,72,153,0.1)] hover:bg-pink-500/[0.02]'
      },
      {
        id: 'img-thumb',
        title: 'YT Thumbnails',
        type: 'YT Asset',
        capabilities: ['High CTR templates', 'Subject auto cutout', 'Bold styling presets'],
        videoUrl: 'https://fast.wistia.net/embed/iframe/yrq89m8ns0?web_component=true&seo=true',
        icon: PlayCircle,
        gradient: 'from-red-950/20 via-[#140404] to-red-950/10 hover:shadow-[0_0_20px_rgba(239,68,68,0.1)] hover:bg-red-500/[0.02]'
      },
      {
        id: 'img-ads',
        title: 'Online Ads',
        type: 'Marketing Tool',
        capabilities: ['Tested ad structures', 'Multi-size auto-reflow', 'High conversion formats'],
        videoUrl: 'https://fast.wistia.net/embed/iframe/cypx73wu36?web_component=true&seo=true',
        icon: Megaphone,
        gradient: 'from-emerald-950/20 via-[#04140a] to-emerald-950/10 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:bg-emerald-500/[0.02]'
      }
    ]
  },
  video: {
    id: 'video',
    name: 'AI Video',
    icon: Video,
    colorClass: 'text-sky-400',
    themeColor: 'sky',
    glowClass: 'shadow-[0_12px_30px_rgba(56,189,248,0.12)]',
    bgClass: 'bg-sky-500/5',
    activeTabClass: 'bg-sky-500/10 text-sky-400 shadow-[0_4px_15px_rgba(56,189,248,0.15)]',
    brands: [
      { name: 'Kling AI', logo: '/logos/kling.svg', icon: Video },
      { name: 'Veo 3', logo: '/logos/gemini.svg', icon: Cpu },
      { name: 'Runway', logo: '/logos/runway.svg', icon: Film },
      { name: 'Luma Dream', logo: '/logos/luma.svg', icon: Sparkles }
    ],
    cards: [
      {
        id: 'vid-clones',
        title: 'Clone Videos',
        type: 'Video Clone',
        capabilities: ['Flawless lip-syncing', 'Natural hand movements', 'Multi-lingual voices'],
        videoUrl: 'https://fast.wistia.net/embed/iframe/v39qn2mla0?web_component=true&seo=true',
        icon: User,
        gradient: 'from-indigo-950/20 via-[#070514] to-indigo-950/10 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] hover:bg-indigo-500/[0.02]'
      },
      {
        id: 'vid-vfx',
        title: 'Visual Effects',
        type: 'Cinematic FX',
        capabilities: ['Cinematic style transfer', 'Smart chroma keying', 'Dynamic lighting blend'],
        videoUrl: 'https://fast.wistia.net/embed/iframe/qx4qain2eg?web_component=true&seo=true',
        icon: Sparkles,
        gradient: 'from-purple-950/20 via-[#0c0514] to-purple-950/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] hover:bg-purple-500/[0.02]'
      },
      {
        id: 'vid-cinematic',
        title: 'Cinematic Films',
        type: 'Cinema Engine',
        capabilities: ['Ultra-realistic physics', 'Sleek camera paths', 'Atmospheric grading'],
        videoUrl: 'https://fast.wistia.net/embed/iframe/3rllmh5doc?web_component=true&seo=true',
        icon: Film,
        gradient: 'from-slate-950/20 via-[#0a0d14] to-slate-950/10 hover:shadow-[0_0_20px_rgba(148,163,184,0.1)] hover:bg-slate-500/[0.02]'
      },
      {
        id: 'vid-ads',
        title: 'Video Ads',
        type: 'Ad Generator',
        capabilities: ['Hook-focused structures', '1-click social resize', 'Visual CTA templates'],
        videoUrl: 'https://fast.wistia.net/embed/iframe/1muopqfwh6?web_component=true&seo=true',
        icon: Megaphone,
        gradient: 'from-cyan-950/20 via-[#040e14] to-cyan-950/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:bg-cyan-500/[0.02]'
      },
      {
        id: 'vid-reels',
        title: 'Reels & Tiktoks',
        type: 'Short Form',
        capabilities: ['Viral pacing helper', 'Auto captions & emojis', 'Precise audio beats sync'],
        videoUrl: 'https://fast.wistia.net/embed/iframe/fq2zoz36cz?web_component=true&seo=true',
        icon: Smartphone,
        gradient: 'from-rose-950/20 via-[#140409] to-rose-950/10 hover:shadow-[0_0_20px_rgba(244,63,94,0.1)] hover:bg-rose-500/[0.02]'
      },
      {
        id: 'vid-yt',
        title: 'Youtube Videos',
        type: 'Long Form',
        capabilities: ['Chapter-based creator', 'Smart B-roll search', 'Auto audio balancing'],
        videoUrl: 'https://fast.wistia.net/embed/iframe/8nri26so0p?web_component=true&seo=true',
        icon: Tv,
        gradient: 'from-red-950/20 via-[#140404] to-red-950/10 hover:shadow-[0_0_20px_rgba(239,68,68,0.1)] hover:bg-red-500/[0.02]'
      }
    ]
  },
  audio: {
    id: 'audio',
    name: 'AI Audio',
    icon: Music,
    colorClass: 'text-emerald-400',
    themeColor: 'emerald',
    glowClass: 'shadow-[0_12px_30px_rgba(16,185,129,0.12)]',
    bgClass: 'bg-emerald-500/5',
    activeTabClass: 'bg-emerald-500/10 text-emerald-400 shadow-[0_4px_15px_rgba(16,185,129,0.15)]',
    brands: [
      { name: 'ElevenLabs', logo: '/logos/elevenlabs.svg', icon: Mic },
      { name: 'Suno', logo: '/logos/suno.svg', icon: Music },
      { name: 'Udio', logo: '/logos/udio.svg', icon: Music },
      { name: 'VoiceMod', logo: '/logos/voicemod.svg', icon: Volume2 }
    ],
    cards: [
      {
        id: 'aud-voiceover',
        title: 'AI Voiceovers',
        type: 'Voice Synthesizer',
        capabilities: ['140+ native languages', 'Real emotional depth', 'Instant pitch tuning'],
        videoUrl: 'https://fast.wistia.net/embed/iframe/rsh692c710?web_component=true&seo=true',
        icon: Mic,
        gradient: 'from-emerald-950/20 via-[#041409] to-emerald-950/10 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:bg-emerald-500/[0.02]'
      },
      {
        id: 'aud-clones',
        title: 'AI Voice Clones',
        type: 'Voice Cloner',
        capabilities: ['5-second voice clone', 'Background noise clean', 'Secure voice locking'],
        videoUrl: 'https://fast.wistia.net/embed/iframe/rusyskd1ox?web_component=true&seo=true',
        icon: UserCheck,
        gradient: 'from-teal-950/20 via-[#041414] to-teal-950/10 hover:shadow-[0_0_20px_rgba(20,184,166,0.1)] hover:bg-teal-500/[0.02]'
      },
      {
        id: 'aud-swaps',
        title: 'Voice Swaps',
        type: 'Voice Swapper',
        capabilities: ['Instant gender change', 'Age-adjustable voice', 'Live vocal conversion'],
        videoUrl: 'https://fast.wistia.net/embed/iframe/x6w5dao4h0?web_component=true&seo=true',
        icon: RefreshCw,
        gradient: 'from-blue-950/20 via-[#040714] to-blue-950/10 hover:shadow-[0_0_20px_rgba(56,189,248,0.1)] hover:bg-sky-500/[0.02]'
      },
      {
        id: 'aud-sfx',
        title: 'AI Sound Effects',
        type: 'SFX Engine',
        capabilities: ['Text-to-sound creation', 'Ambient layering', 'Royalty-free licensing'],
        videoUrl: 'https://fast.wistia.net/embed/iframe/0yhtigj9mg?web_component=true&seo=true',
        icon: Volume2,
        gradient: 'from-purple-950/20 via-[#0a0514] to-purple-950/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] hover:bg-purple-500/[0.02]'
      },
      {
        id: 'aud-music',
        title: 'AI Music Generation',
        type: 'Music Composer',
        capabilities: ['Beat & genre matching', 'Full multi-track stems', 'Custom lyric singing'],
        videoUrl: 'https://fast.wistia.net/embed/iframe/81m386dh7h?web_component=true&seo=true',
        icon: Music,
        gradient: 'from-violet-950/20 via-[#0b0414] to-violet-950/10 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)] hover:bg-violet-500/[0.02]'
      }
    ]
  },
  plugins: {
    id: 'plugins',
    name: 'Plugins',
    icon: Puzzle,
    colorClass: 'text-orange-400',
    themeColor: 'orange',
    glowClass: 'shadow-[0_12px_30px_rgba(249,115,22,0.12)]',
    bgClass: 'bg-orange-500/5',
    activeTabClass: 'bg-orange-500/10 text-orange-400 shadow-[0_4px_15px_rgba(249,115,22,0.15)]',
    brands: [
      { name: 'Premiere Pro', logo: '/logos/premiere.svg', icon: Film },
      { name: 'DaVinci Resolve', logo: '/logos/davinci.svg', icon: Sliders },
      { name: 'After Effects', logo: '/logos/aftereffects.svg', icon: Sparkles },
      { name: 'Photoshop', logo: '/logos/photoshop.svg', icon: Image }
    ],
    cards: [
      {
        id: 'plug-video',
        title: 'AI Video Editing Plugin',
        type: 'NLE Extension',
        capabilities: ['Direct timeline access', 'Fast background tasks', 'In-editor previews'],
        videoUrl: 'https://fast.wistia.net/embed/iframe/821b33oy7g?web_component=true&seo=true',
        icon: Puzzle,
        gradient: 'from-orange-950/20 via-[#140804] to-orange-950/10 hover:shadow-[0_0_20px_rgba(249,115,22,0.1)] hover:bg-orange-500/[0.02]'
      }
    ]
  }
};

const glowColorMap = {
  image: 'rgba(168,85,247,0.35)',
  video: 'rgba(56,189,248,0.35)',
  audio: 'rgba(16,185,129,0.35)',
  plugins: 'rgba(249,115,22,0.35)'
};

export default function ToolExplorer() {
  const [activeTab, setActiveTab] = useState('image');

  const activeData = categoryData[activeTab];

  return (
    <section className="pt-8 md:pt-10 pb-8 md:pb-10 w-full bg-[linear-gradient(180deg,#07091a_0%,#09090f_100%)] border-b border-white/[0.03] relative overflow-hidden select-none">
      {/* Background radial highlight */}
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center relative z-10">

        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-[26px] sm:text-4xl md:text-[48px] font-black text-white tracking-tight leading-[1.2] mb-5">
            One platform.<br className="sm:hidden" /> <span className="text-brand-accent">Every tool you need.</span>
          </h2>
          <p className="text-sm sm:text-base text-brand-tint/50 max-w-2xl mx-auto leading-relaxed">
            Click a category - see exactly what you can create.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-row overflow-x-auto no-scrollbar md:flex-wrap items-center justify-start md:justify-center gap-1 md:gap-1.5 p-1 md:p-1.5 bg-brand-surface/10 backdrop-blur-xl border border-white/[0.03] rounded-xl md:rounded-2xl mb-6 md:mb-8 shadow-inner w-full max-w-full md:max-w-2xl whitespace-nowrap scroll-smooth">
          {Object.values(categoryData).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-1.5 md:gap-2 px-3.5 py-2 md:px-5 md:py-3 rounded-lg md:rounded-xl font-bold text-[10.5px] md:text-xs tracking-wide transition-all duration-300 cursor-pointer shrink-0 ${isActive
                  ? tab.activeTabClass
                  : 'bg-transparent text-brand-tint/40 hover:text-brand-tint/75 hover:bg-white/[0.02]'
                  }`}
              >
                <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
                <span>{tab.name}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Brand Integration Cluster Bar */}
        <div className="flex flex-row overflow-x-auto no-scrollbar md:flex-wrap items-center justify-start md:justify-center gap-x-5 md:gap-x-12 gap-y-3 mb-8 md:mb-14 w-full max-w-full md:max-w-4xl px-4 select-none whitespace-nowrap scroll-smooth">
          <AnimatePresence mode="popLayout">
            {activeData.brands.map((brand, idx) => {
              const BrandIcon = brand.icon;
              const glowColor = glowColorMap[activeTab];
              return (
                <motion.div
                  key={`${activeTab}-${brand.name}`}
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.95 }}
                  whileHover={{ y: -4, scale: 1.04 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 18,
                    delay: idx * 0.02
                  }}
                  className="flex items-center gap-2 md:gap-3 px-2.5 py-1.5 rounded-xl cursor-default relative group shrink-0"
                >
                  {/* Subtle active background hover glow */}
                  <div className="absolute inset-0 bg-white/[0.02] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Soft colored blur drop shadow behind the brand node */}
                  <div
                    className="absolute inset-0 rounded-xl filter blur-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, ${glowColor} 0%, transparent 80%)`
                    }}
                  />

                  <div className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center shrink-0 relative z-10">
                    {brand.logo ? (
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="w-4 h-4 md:w-5 md:h-5 object-contain opacity-35 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                        style={{
                          filter: 'brightness(0) invert(1)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.filter = `brightness(0) invert(1) drop-shadow(0 0 8px ${glowColor})`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.filter = 'brightness(0) invert(1)';
                        }}
                      />
                    ) : (
                      <BrandIcon className="w-4 h-4 md:w-5 md:h-5 text-brand-tint/25 transition-all duration-300 group-hover:text-white group-hover:scale-110" />
                    )}
                  </div>
                  <span className="text-[10px] md:text-xs font-extrabold text-brand-tint/35 group-hover:text-white transition-all duration-300 tracking-wider uppercase relative z-10 font-sans">
                    {brand.name}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Dynamic content transition grid */}
        <div className="w-full flex flex-col gap-4 text-left mb-12">

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex flex-row overflow-x-auto no-scrollbar md:grid md:grid-cols-3 gap-5 md:gap-6 w-full items-stretch pb-4 md:pb-0 scroll-smooth snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0"
            >
              {activeData.cards.map((card) => {
                return (
                  <div
                    key={card.id}
                    className="flex flex-col rounded-2xl overflow-hidden bg-[#050811]/90 shadow-xl transition-all duration-300 relative border border-white/[0.02] hover:border-white/[0.06] select-none group w-[290px] sm:w-[320px] shrink-0 snap-center md:w-auto"
                  >
                    {/* Top Portion (Live Video) */}
                    <div className="w-full relative overflow-hidden bg-black aspect-video">
                      <iframe
                        src={`${card.videoUrl}&autoPlay=true&muted=true&endVideoBehavior=loop&playbar=false&smallPlayButton=false`}
                        title={card.title}
                        allow="autoplay; fullscreen"
                        allowTransparency="true"
                        frameBorder="0"
                        scrolling="no"
                        className="w-full h-full absolute inset-0 z-10"
                      />
                    </div>

                    {/* Bottom Label Bar */}
                    <div className="h-13 bg-[#04070e] py-3.5 px-5 flex items-center justify-between border-t border-white/[0.02] z-20 relative">
                      <span className="text-xs sm:text-sm font-extrabold text-white tracking-wide">
                        {card.title}
                      </span>
                      <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 ${activeData.colorClass}`} />
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
