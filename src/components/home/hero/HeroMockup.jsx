import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Zap, Play, Pause, Video, Film, Music, Mic, Tv, Bot, Sparkles,
  Compass, Layers, FolderClosed, Sliders, Heart, Volume2
} from 'lucide-react';

const badgesData = [
  {
    id: 'kling',
    name: 'Kling AI',
    logoUrl: '/logos/kling.svg',
    iconBg: 'bg-gradient-to-tr from-cyan-400 to-indigo-500 text-white',
    position: 'top-[8%] right-[38%] scale-[0.8] sm:scale-100',
    color: 'hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:border-cyan-500/50',
    pathD: 'M 370 45 C 370 70, 440 70, 450 110',
    activeColor: '#22d3ee',
    targetZone: 'prompt',
    lineClass: ''
  },
  {
    id: 'veo',
    name: 'Veo 3',
    logoUrl: '/logos/gemini.svg',
    iconBg: 'bg-blue-500/10 text-blue-400',
    position: 'top-[12%] right-[24%] scale-[0.8] sm:scale-100',
    color: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:border-blue-500/50',
    pathD: 'M 450 65 L 450 110',
    activeColor: '#3b82f6',
    targetZone: 'preview',
    lineClass: ''
  },
  {
    id: 'suno',
    name: 'Suno',
    logoUrl: '/logos/suno.svg',
    iconBg: 'bg-amber-500/10 text-amber-400',
    position: 'top-[10%] right-[8%] scale-[0.8] sm:scale-100',
    color: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:border-amber-500/50',
    pathD: 'M 525 55 C 525 80, 480 85, 480 110',
    activeColor: '#f59e0b',
    targetZone: 'preview',
    lineClass: ''
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    logoUrl: '/logos/elevenlabs.svg',
    iconBg: 'bg-emerald-500/10 text-emerald-400',
    position: 'top-[32%] right-[-3%] hidden sm:flex',
    color: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:border-emerald-500/50',
    pathD: 'M 585 160 C 530 160, 520 220, 500 240',
    activeColor: '#10b981',
    targetZone: 'timeline',
    lineClass: 'hidden sm:block'
  },
  {
    id: 'heygen',
    name: 'HeyGen',
    logoUrl: '/logos/heygen.svg',
    iconBg: 'bg-purple-500/10 text-purple-400',
    position: 'top-[30%] left-[24%] hidden sm:flex',
    color: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:border-purple-500/50',
    pathD: 'M 280 160 C 310 160, 310 180, 320 200',
    activeColor: '#a855f7',
    targetZone: 'prompt',
    lineClass: 'hidden sm:block'
  },
  {
    id: 'grok',
    name: 'Grok',
    logoUrl: '/logos/grok.svg',
    iconBg: 'bg-cyan-500/10 text-cyan-400',
    position: 'bottom-[28%] left-[22%] hidden sm:flex',
    color: 'hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:border-cyan-500/50',
    pathD: 'M 270 245 C 290 280, 270 300, 290 320',
    activeColor: '#06b6d4',
    targetZone: 'timeline',
    lineClass: 'hidden sm:block'
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    logoUrl: '/logos/chatgpt.svg',
    iconBg: 'bg-emerald-500/20 text-emerald-400',
    position: 'bottom-[32%] right-[-3%] hidden sm:flex',
    color: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:border-emerald-500/50',
    pathD: 'M 580 300 C 530 300, 520 280, 500 260',
    activeColor: '#10b981',
    targetZone: 'assets',
    lineClass: 'hidden sm:block'
  }
];

const assetsData = [
  {
    id: 'a1',
    type: 'video',
    title: 'Mountain Sunrise',
    prompt: 'Cinematic shot of a mountain landscape at sunrise, fog moving over the trees, 4k, ultra realistic',
    icon: Video
  },
  {
    id: 'a2',
    type: 'video',
    title: 'Cyberpunk Neon',
    prompt: 'Cyberpunk city street at night, neon lights reflecting on wet pavement, flying cars, rainy atmosphere',
    icon: Film
  },
  {
    id: 'a3',
    type: 'image',
    title: 'Cyber Warrior',
    prompt: 'Portrait of a cybernetic warrior, neon glowing implants, dark techwear, volumetric lighting',
    icon: Bot
  },
  {
    id: 'a4',
    type: 'image',
    title: 'Tiny Robot',
    prompt: 'Tiny cute robot helper cleaning a desk, soft Pixar style lighting, highly detailed 3D render',
    icon: Sparkles
  },
  {
    id: 'a5',
    type: 'audio',
    title: 'Forest Wind',
    prompt: 'Calm forest wind rustling through pine trees, distant birds chirping, cinematic stereo sound',
    icon: Mic
  },
  {
    id: 'a6',
    type: 'audio',
    title: 'Synthwave Beat',
    prompt: 'Upbeat 80s synthwave music, retro futuristic beat, driving drums, electronic synthesizer',
    icon: Music
  }
];

export default function HeroMockup({ itemVariants, onWatchDemo }) {
  const [activeTab, setActiveTab] = useState('Home');
  const [activeAssetTab, setActiveAssetTab] = useState('All');
  const [promptText, setPromptText] = useState(
    'Cinematic shot of a mountain landscape at sunrise, fog moving over the trees, 4k, ultra realistic'
  );
  const [generationState, setGenerationState] = useState('idle'); // 'idle' | 'generating' | 'completed'
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playheadPosition, setPlayheadPosition] = useState(0);
  const [hoveredBadge, setHoveredBadge] = useState(null);

  // Playhead timeline interval
  useEffect(() => {
    let interval;
    if (isPlaying && generationState === 'completed') {
      interval = setInterval(() => {
        setPlayheadPosition((prev) => {
          if (prev >= 100) {
            return 0; // Loop playback
          }
          return prev + 1; // 100 steps * 80ms = 8 seconds total playback simulation
        });
      }, 80);
    }
    return () => clearInterval(interval);
  }, [isPlaying, generationState]);

  const handleGenerate = () => {
    if (generationState === 'generating') return;
    setGenerationState('generating');
    setGenerationProgress(0);
    setIsPlaying(false);
    setPlayheadPosition(0);

    const duration = 2000; // 2 seconds simulation
    const stepTime = 100;
    const steps = duration / stepTime;
    const increment = 100 / steps;

    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        clearInterval(timer);
        setGenerationProgress(100);
        setGenerationState('completed');
        setIsPlaying(true);
      } else {
        setGenerationProgress(Math.floor(currentProgress));
      }
    }, stepTime);
  };

  const filteredAssets = assetsData.filter((asset) => {
    if (activeAssetTab === 'All') return true;
    return asset.type === activeAssetTab.toLowerCase();
  });

  const getTargetGlowClass = (zoneName) => {
    if (!hoveredBadge) return 'border-brand-border/40';
    const badge = badgesData.find(b => b.id === hoveredBadge);
    if (badge && badge.targetZone === zoneName) {
      if (badge.id === 'kling') return 'border-cyan-500/70 shadow-[0_0_15px_rgba(34,211,238,0.2)]';
      if (badge.id === 'veo') return 'border-blue-500/70 shadow-[0_0_15px_rgba(59,130,246,0.2)]';
      if (badge.id === 'suno') return 'border-amber-500/70 shadow-[0_0_15px_rgba(245,158,11,0.2)]';
      if (badge.id === 'elevenlabs') return 'border-emerald-500/70 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
      if (badge.id === 'heygen') return 'border-purple-500/70 shadow-[0_0_15px_rgba(168,85,247,0.2)]';
      if (badge.id === 'grok') return 'border-cyan-500/70 shadow-[0_0_15px_rgba(6,182,212,0.2)]';
      if (badge.id === 'chatgpt') return 'border-emerald-500/70 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
    }
    return 'border-brand-border/40';
  };

  const elapsedSeconds = Math.floor((playheadPosition / 100) * 8);

  const menuItems = [
    { id: 'Home', label: 'Home', icon: Compass },
    { id: 'Tools', label: 'AI Tools', icon: Tv },
    { id: 'Video', label: 'AI Video', icon: Video },
    { id: 'Image', label: 'AI Image', icon: Layers },
    { id: 'Audio', label: 'AI Audio', icon: Music },
    { id: 'Templates', label: 'Templates', icon: Tv },
    { id: 'Assets', label: 'Assets', icon: FolderClosed },
    { id: 'Projects', label: 'Projects', icon: Sliders },
    { id: 'Favorites', label: 'Favorites', icon: Heart }
  ];

  return (
    <motion.div
      variants={itemVariants}
      className="lg:col-span-6 w-full flex items-center justify-center select-none py-4 sm:py-0"
    >
      <div className="w-full max-w-[600px] sm:max-w-[640px] aspect-[640/390] sm:aspect-[640/490] flex items-center justify-center relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[480px] scale-[0.44] min-[340px]:scale-[0.50] min-[400px]:scale-[0.58] min-[480px]:scale-[0.70] sm:scale-[0.80] lg:scale-[0.82] origin-center shrink-0">
      {/* Dynamic gradients & glow style rules */}
      <style>{`
        @keyframes sunset-pan {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-sunset-pan {
          background-size: 200% 200%;
          animation: sunset-pan 10s ease infinite;
        }
        @keyframes glow-pulse {
          0% { filter: drop-shadow(0 0 2px rgba(56, 189, 248, 0.4)); }
          50% { filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.8)); }
          100% { filter: drop-shadow(0 0 2px rgba(56, 189, 248, 0.4)); }
        }
        .animate-glow-path {
          animation: glow-pulse 2.5s infinite ease-in-out;
        }
      `}</style>

      {/* SVG Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 600 400" fill="none">
        <defs>
          <filter id="svg-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {badgesData.map((badge) => {
          const isHovered = hoveredBadge === badge.id;
          const isToolGenerating = generationState === 'generating' && (
            badge.id === 'kling' || badge.id === 'veo' || badge.id === 'grok'
          );
          const isFlowing = isHovered || isToolGenerating;

          return (
            <g key={badge.id} className={badge.lineClass || ''}>
              {/* Highlight path glow */}
              {isFlowing && (
                <path
                  d={badge.pathD}
                  stroke={badge.activeColor}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  opacity="0.5"
                  filter="url(#svg-glow)"
                  className="transition-all duration-300"
                />
              )}

              {/* Base thin connector line */}
              <path
                d={badge.pathD}
                stroke={isFlowing ? badge.activeColor : '#0c2340'}
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity={isFlowing ? 0.95 : 0.35}
                className="transition-all duration-300"
              />

              {/* Overlay animated flowing dash */}
              {isFlowing && (
                <motion.path
                  d={badge.pathD}
                  stroke={badge.activeColor}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="4 8"
                  animate={{ strokeDashoffset: [0, -24] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Mockup Dashboard Window Container */}
      <div className="absolute top-[8%] left-[6%] w-[88%] h-[82%] rounded-2xl border border-brand-border/60 bg-[#05070d] shadow-[0_24px_55px_rgba(0,0,0,0.85)] flex flex-row overflow-hidden backdrop-blur-md">
        
        {/* Left Sidebar */}
        <div className="flex w-[110px] sm:w-[125px] border-r border-brand-border/30 bg-[#040508]/85 flex-col p-2 select-none justify-between">
          <div className="flex flex-col gap-2.5">
            {/* App Brand Header */}
            <div className="flex items-center gap-1 px-1 py-0.5">
              <div className="w-4 h-4 rounded-md bg-gradient-to-tr from-violet-500 to-indigo-500 flex items-center justify-center">
                <Zap className="w-2.5 h-2.5 text-white fill-white" />
              </div>
              <span className="text-[10px] font-black text-white tracking-tight">PromptEdit</span>
            </div>

            {/* Navigation Menu */}
            <nav className="flex flex-col gap-0.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-left transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-brand-accent/10 text-brand-accent font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
                        : 'text-brand-tint/40 hover:text-brand-tint/70 hover:bg-brand-surface/30'
                    }`}
                  >
                    <Icon className={`w-3 h-3 ${isActive ? 'text-brand-accent' : 'text-brand-tint/30'}`} />
                    <span className="text-[8px] font-semibold">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer credit status indicators */}
          <div className="border-t border-brand-border/35 pt-2 flex flex-col gap-1">
            <div className="flex items-center justify-between text-[7px] text-brand-tint/35 px-1 font-bold">
              <span>Pro Plan</span>
              <span className="text-emerald-400">Active</span>
            </div>
            <div className="w-full bg-brand-surface/60 h-1 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-violet-500 to-brand-accent h-full w-[80%]" />
            </div>
          </div>
        </div>

        {/* Right Dashboard Workspace Pane */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#07090f]/50">
          {/* Top Navbar */}
          <header className="h-9 border-b border-brand-border/30 bg-[#040508]/45 px-3 flex items-center justify-between select-none">
            <div className="flex flex-col text-left">
              <h2 className="text-[10px] font-bold text-white tracking-wide leading-tight">AI Video Generator</h2>
              <p className="text-[7.5px] text-brand-tint/45 leading-none font-medium">Create stunning videos with the best AI models</p>
            </div>
            <div className="flex items-center gap-2">
              {/* Credits */}
              <div className="flex items-center gap-1 bg-brand-surface/80 border border-brand-border/40 px-2 py-0.5 rounded-full">
                <Sparkles className="w-2.5 h-2.5 text-brand-accent animate-pulse" />
                <span className="text-[8.5px] font-black text-white tracking-wide">12,550</span>
              </div>
              {/* Profile Avatar */}
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 border border-brand-border/50 flex items-center justify-center text-[7px] font-black text-white shadow-md">
                U
              </div>
            </div>
          </header>

          {/* Main Grid workspace */}
          <main className="flex-1 p-2.5 grid grid-cols-12 gap-2.5 overflow-hidden">
            
            {/* Left Content Area: Input & Timeline */}
            <div className="col-span-7 flex flex-col gap-2.5 overflow-hidden h-full">
              
              {/* Prompt box */}
              <div className={`p-2 border rounded-xl bg-brand-surface/30 flex flex-col gap-1.5 transition-all duration-300 relative ${getTargetGlowClass('prompt')}`}>
                <div className="flex justify-between items-center select-none">
                  <span className="text-[8px] font-bold text-brand-tint/45 uppercase tracking-wider">Describe your video...</span>
                  <span className="text-[7.5px] font-bold text-brand-tint/35 bg-brand-surface border border-brand-border/35 px-1 py-0.2 rounded">16:9</span>
                </div>
                
                <textarea
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  disabled={generationState === 'generating'}
                  className="w-full h-[54px] bg-[#030509]/80 border border-brand-border/25 rounded-lg p-1.5 text-[8.5px] text-white/95 placeholder-brand-tint/25 focus:outline-none focus:border-brand-accent/40 resize-none font-sans leading-normal transition-all duration-300 disabled:opacity-50"
                  placeholder="Enter a prompt description..."
                />

                <div className="flex justify-between items-center">
                  <span className="text-[7px] text-brand-tint/30 font-medium">Click an asset below to auto-load prompts</span>
                  <button
                    onClick={handleGenerate}
                    disabled={generationState === 'generating'}
                    className={`px-2.5 py-1 rounded-md text-[8.5px] font-bold flex items-center gap-1 transition-all duration-300 cursor-pointer ${
                      generationState === 'generating'
                        ? 'bg-brand-surface text-brand-tint/30 border border-brand-border/40'
                        : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-[0_4px_12px_rgba(99,102,241,0.2)] hover:scale-[1.02] active:scale-[0.98]'
                    }`}
                  >
                    <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                    <span>{generationState === 'generating' ? 'Generating...' : 'Generate'}</span>
                  </button>
                </div>
              </div>

              {/* Scenes timeline track */}
              <div className={`p-2 border rounded-xl bg-brand-surface/30 flex flex-col gap-1.5 flex-1 relative overflow-hidden transition-all duration-300 ${getTargetGlowClass('timeline')}`}>
                <div className="flex justify-between items-center select-none">
                  <span className="text-[8px] font-bold text-brand-tint/45 uppercase tracking-wider">Scenes</span>
                  <span className="text-[7.5px] text-brand-tint/40 font-mono font-semibold">00:08 / 00:15</span>
                </div>

                {/* Timeline Tracks Grid */}
                <div className="flex-1 flex flex-col gap-1.5 relative justify-center">
                  
                  {/* Moving Playhead line bar */}
                  {generationState === 'completed' && (
                    <div
                      className="absolute top-0 bottom-0 w-[1.5px] bg-brand-accent shadow-[0_0_8px_rgba(56,189,248,0.8)] z-10 pointer-events-none transition-all duration-75"
                      style={{ left: `${playheadPosition}%` }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-accent -translate-x-[2.25px] -translate-y-[2px]" />
                    </div>
                  )}

                  {/* Video Track */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[7.5px] font-bold text-brand-tint/30 w-7 text-left uppercase">Video</span>
                    <div className="flex-1 flex gap-1 items-center font-mono text-[7.5px]">
                      <div
                        className={`flex-1 py-1 px-1.5 rounded border text-center font-bold transition-all duration-300 ${
                          generationState === 'completed' && playheadPosition < 50
                            ? 'bg-violet-600/35 border-violet-500/50 text-white shadow-[0_0_8px_rgba(139,92,246,0.2)]'
                            : 'bg-brand-surface/60 border-brand-border/30 text-brand-tint/40'
                        }`}
                      >
                        Landscape
                      </div>
                      <div
                        className={`flex-1 py-1 px-1.5 rounded border text-center font-bold transition-all duration-300 ${
                          generationState === 'completed' && playheadPosition >= 50
                            ? 'bg-indigo-600/35 border-indigo-500/50 text-white shadow-[0_0_8px_rgba(99,102,241,0.2)]'
                            : 'bg-brand-surface/60 border-brand-border/30 text-brand-tint/40'
                        }`}
                      >
                        Mountains
                      </div>
                    </div>
                  </div>

                  {/* Audio Track */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[7.5px] font-bold text-brand-tint/30 w-7 text-left uppercase">Audio</span>
                    <div
                      className={`flex-1 py-0.5 px-2 rounded border flex justify-between items-center font-semibold text-[7.5px] transition-all duration-300 ${
                        isPlaying && generationState === 'completed'
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.1)]'
                          : 'bg-brand-surface/60 border-brand-border/30 text-brand-tint/40'
                      }`}
                    >
                      <span className="truncate max-w-[80px]">Cinematic landscape...</span>
                      
                      {/* Audio waveform visualization */}
                      <div className="flex items-center gap-[2px] h-3">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                          <motion.div
                            key={i}
                            className={`w-[1.5px] rounded-full transition-colors duration-300 ${
                              isPlaying && generationState === 'completed' ? 'bg-emerald-400' : 'bg-brand-tint/20'
                            }`}
                            animate={{
                              height: isPlaying && generationState === 'completed' ? [3, 9, 5, 11, 3][i % 5] : 4
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.5 + (i % 3) * 0.1,
                              ease: 'easeInOut'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content Area: Preview Screen & Assets Grid */}
            <div className="col-span-5 flex flex-col gap-2.5 overflow-hidden h-full">
              
              {/* Preview Screen */}
              <div className={`aspect-[16/10] border rounded-xl bg-black relative overflow-hidden flex flex-col items-center justify-center transition-all duration-300 ${getTargetGlowClass('preview')}`}>
                
                {generationState === 'idle' && (
                  <>
                    {/* Placeholder content - Watch Demo */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-0" />
                    
                    <button
                      onClick={onWatchDemo}
                      className="w-10 h-10 rounded-full bg-brand-accent hover:bg-brand-accent/90 flex items-center justify-center text-black shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer z-10"
                      title="Watch Product Demo"
                    >
                      <Play className="w-5 h-5 fill-current ml-0.5 text-black" />
                    </button>
                    <span className="absolute bottom-2 left-2 text-[7px] text-brand-tint/40 font-mono z-10">00:00 / 00:08</span>
                  </>
                )}

                {generationState === 'generating' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-surface/90 gap-2 z-20">
                    <div className="w-6 h-6 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
                    <div className="flex flex-col gap-0.5 items-center">
                      <span className="text-[8.5px] font-bold text-white tracking-wider">GENERATING SCENE</span>
                      <span className="text-[7.5px] text-brand-tint/50 font-semibold">{generationProgress}%</span>
                    </div>
                  </div>
                )}

                {generationState === 'completed' && (
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden z-0">
                    {/* Animated moving mesh sunset gradient simulation */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-pink-600 via-purple-700 to-indigo-600 animate-sunset-pan opacity-90" />
                    
                    {/* Tiny sun/flare effect */}
                    <div className="absolute top-1/4 left-1/3 w-16 h-16 bg-amber-400/30 rounded-full blur-xl animate-pulse" />
                    
                    {/* Landscape silhouette silhouette mesh line vectors */}
                    <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Centered Play/Pause Control Overlay */}
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-all duration-250 cursor-pointer z-10"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-white" />
                      ) : (
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      )}
                    </button>

                    {/* Bottom Status bar controls */}
                    <div className="absolute bottom-0 inset-x-0 h-5 bg-black/70 backdrop-blur-sm px-2 flex items-center justify-between text-[7px] text-white/90 z-10 select-none">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="text-white hover:text-brand-accent cursor-pointer"
                        >
                          {isPlaying ? (
                            <Pause className="w-2.5 h-2.5 fill-current" />
                          ) : (
                            <Play className="w-2.5 h-2.5 fill-current" />
                          )}
                        </button>
                        <span className="font-mono">00:0{elapsedSeconds} / 00:08</span>
                      </div>
                      
                      {/* Simulated timeline slider bar track */}
                      <div className="flex-1 mx-2.5 bg-white/20 h-0.5 rounded-full overflow-hidden relative">
                        <div
                          className="bg-brand-accent h-full absolute left-0 top-0 transition-all duration-75"
                          style={{ width: `${playheadPosition}%` }}
                        />
                      </div>

                      <div className="flex items-center gap-1">
                        <Volume2 className="w-2.5 h-2.5 text-white/80" />
                        <div className="w-6 bg-white/30 h-0.5 rounded-full">
                          <div className="bg-white h-full w-[70%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Assets Grid */}
              <div className={`p-2 border rounded-xl bg-brand-surface/30 flex flex-col gap-1.5 flex-1 relative overflow-hidden transition-all duration-300 ${getTargetGlowClass('assets')}`}>
                <div className="flex justify-between items-center select-none">
                  <span className="text-[8px] font-bold text-brand-tint/45 uppercase tracking-wider">Assets</span>
                  
                  {/* Category switcher tabs */}
                  <div className="flex bg-brand-surface/90 border border-brand-border/40 p-0.5 rounded-md gap-0.5">
                    {['All', 'Video', 'Image', 'Audio'].map((tab) => {
                      const isActive = activeAssetTab === tab;
                      return (
                        <button
                          key={tab}
                          onClick={() => setActiveAssetTab(tab)}
                          className={`px-1.5 py-0.2 text-[6.5px] font-bold rounded-sm transition-all duration-150 cursor-pointer ${
                            isActive
                              ? 'bg-brand-accent/20 border border-brand-accent/30 text-white'
                              : 'text-brand-tint/35 hover:text-brand-tint/60'
                          }`}
                        >
                          {tab}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Grid of asset slots */}
                <div className="grid grid-cols-3 gap-1.5 flex-1 items-stretch select-none">
                  {Array.from({ length: 6 }).map((_, index) => {
                    const asset = filteredAssets[index];
                    if (asset) {
                      return (
                        <button
                          key={asset.id}
                          onClick={() => {
                            setPromptText(asset.prompt);
                            setGenerationState('idle');
                            setIsPlaying(false);
                            setPlayheadPosition(0);
                          }}
                          className="rounded-lg border border-brand-border/30 bg-[#030509]/75 flex flex-col items-center justify-center gap-0.5 hover:border-brand-accent/40 group transition-all duration-200 cursor-pointer p-1"
                        >
                          <div className="p-0.5 rounded-md bg-brand-surface group-hover:scale-105 transition-transform duration-200 flex items-center justify-center">
                            <asset.icon className="w-2.5 h-2.5 text-brand-tint/55 group-hover:text-brand-accent transition-colors duration-200" />
                          </div>
                          <span className="text-[6.5px] text-brand-tint/45 font-bold group-hover:text-brand-tint transition-colors duration-200 truncate max-w-full px-0.5">
                            {asset.title}
                          </span>
                        </button>
                      );
                    }

                    // View all button in last slot
                    if (index === 5) {
                      return (
                        <button
                          key="view-all"
                          className="rounded-lg border border-brand-border/25 border-dashed bg-brand-surface/10 flex flex-col items-center justify-center gap-0.5 hover:border-brand-accent/30 hover:bg-brand-surface/20 transition-all duration-250 cursor-pointer p-1"
                        >
                          <span className="text-[7.5px] font-black text-brand-accent">View all</span>
                          <span className="text-[5.5px] text-brand-tint/30 font-bold">24+ assets</span>
                        </button>
                      );
                    }

                    // Placeholder slot
                    return (
                      <div
                        key={`empty-${index}`}
                        className="rounded-lg border border-brand-border/15 border-dashed bg-brand-surface/5 flex flex-col items-center justify-center"
                      >
                        <FolderClosed className="w-2.5 h-2.5 text-brand-tint/10" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Floating Badges wrapper */}
      {badgesData.map((badge) => {
        const isHovered = hoveredBadge === badge.id;
        const isToolGenerating = generationState === 'generating' && (
          badge.id === 'kling' || badge.id === 'veo' || badge.id === 'grok'
        );
        const isActive = isHovered || isToolGenerating;

        return (
          <div
            key={badge.id}
            className={`absolute ${badge.position} z-20 cursor-pointer flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-brand-border/60 bg-brand-surface/85 backdrop-blur-sm shadow-md transition-all duration-300 hover:scale-105 active:scale-95 ${badge.color} ${
              isActive ? 'border-brand-accent shadow-[0_0_15px_rgba(56,189,248,0.3)] scale-105' : ''
            }`}
            onMouseEnter={() => setHoveredBadge(badge.id)}
            onMouseLeave={() => setHoveredBadge(null)}
            onClick={() => {
              if (badge.id === 'kling') {
                setPromptText('Cinematic shot of a mountain landscape at sunrise, fog moving over the trees, 4k, ultra realistic');
              } else if (badge.id === 'grok') {
                setPromptText('Deep space exploration spaceship orbiting a ringed gas giant, cinematic science fiction, high detail');
              } else if (badge.id === 'suno') {
                setPromptText('Epic orchestral score with thunderous percussion and dramatic brass, cinematic soundtrack');
              } else if (badge.id === 'veo') {
                setPromptText('Hyper-realistic slow motion tracking shot of a mechanical hummingbird drinking nectar from a flower');
              } else if (badge.id === 'elevenlabs') {
                setPromptText('Cinematic voiceover in a deep, gravelly male voice, whispering dark secrets of the forest');
              } else if (badge.id === 'heygen') {
                setPromptText('AI avatar presenter introducing the brand new PromptEdit platform, natural gestures');
              } else if (badge.id === 'chatgpt') {
                setPromptText('Detailed storyboard text showing sequence shots of a volcanic planet exploration team');
              }
              setGenerationState('idle');
              setIsPlaying(false);
              setPlayheadPosition(0);
            }}
          >
            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${badge.iconBg} overflow-hidden p-0.5`}>
              <img
                src={badge.logoUrl}
                alt={badge.name}
                className="w-full h-full object-contain brightness-0 invert"
              />
            </div>
            <span className="text-[9px] font-bold text-white tracking-wide">{badge.name}</span>
            {isToolGenerating && (
              <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
            )}
          </div>
        );
      })}
        </div>
      </div>
    </motion.div>
  );
}
