import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, ArrowRight, Sparkles, AlertTriangle, Cpu, TrendingDown, 
  Layers, Zap, Film, Mic, Music, User, Video, Bot, 
  ArrowUpRight, ArrowDownRight, DollarSign, Wallet, RefreshCw,
  MessageSquare, Image
} from 'lucide-react';

const aiStackTools = [
  { id: 'kling', name: 'Kling AI', category: 'Video Generation', cost: 26, logo: '/logos/kling.svg' },
  { id: 'elevenlabs', name: 'ElevenLabs', category: 'Voice & Speech', cost: 22, logo: '/logos/elevenlabs.svg' },
  { id: 'suno', name: 'Suno AI', category: 'Music & Audio', cost: 10, logo: '/logos/suno.svg' },
  { id: 'heygen', name: 'HeyGen', category: 'AI Avatars', cost: 30, logo: '/logos/heygen.svg' },
  { id: 'gemini', name: 'Veo / Gemini', category: 'Advanced Video', cost: 20, logo: '/logos/gemini.svg' },
  { id: 'grok', name: 'Grok Premium', category: 'LLM & Search', cost: 16, logo: '/logos/grok.svg' },
  { id: 'chatgpt', name: 'ChatGPT Plus', category: 'AI Copy & Chat', cost: 20, logo: '/logos/chatgpt.svg' },
  { id: 'runway', name: 'Runway Gen-3', category: 'Cinematic Video', cost: 15, logo: '/logos/runway.svg' }
];

const categoryIcons = {
  kling: Film,
  elevenlabs: Mic,
  suno: Music,
  heygen: User,
  gemini: Video,
  grok: Bot,
  chatgpt: MessageSquare,
  runway: Image
};

const toolBrands = {
  kling: {
    accent: '#a855f7', // violet-500
    glow: 'rgba(168, 85, 247, 0.25)',
    border: 'border-violet-500/20 hover:border-violet-500/40',
    borderActive: 'border-violet-500/50',
    bgActive: 'bg-violet-950/20',
    text: 'text-violet-400',
    badge: 'bg-violet-500/10 text-violet-400',
  },
  elevenlabs: {
    accent: '#f59e0b', // amber-500
    glow: 'rgba(245, 158, 11, 0.25)',
    border: 'border-amber-500/20 hover:border-amber-500/40',
    borderActive: 'border-amber-500/50',
    bgActive: 'bg-amber-950/15',
    text: 'text-amber-400',
    badge: 'bg-amber-500/10 text-amber-400',
  },
  suno: {
    accent: '#10b981', // emerald-500
    glow: 'rgba(16, 185, 129, 0.25)',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    borderActive: 'border-emerald-500/50',
    bgActive: 'bg-emerald-950/15',
    text: 'text-emerald-400',
    badge: 'bg-emerald-500/10 text-emerald-400',
  },
  heygen: {
    accent: '#f43f5e', // rose-500
    glow: 'rgba(244, 63, 94, 0.25)',
    border: 'border-rose-500/20 hover:border-rose-500/40',
    borderActive: 'border-rose-500/50',
    bgActive: 'bg-rose-950/15',
    text: 'text-rose-400',
    badge: 'bg-rose-500/10 text-rose-400',
  },
  gemini: {
    accent: '#06b6d4', // cyan-500
    glow: 'rgba(6, 180, 212, 0.25)',
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    borderActive: 'border-cyan-500/50',
    bgActive: 'bg-cyan-950/15',
    text: 'text-cyan-400',
    badge: 'bg-cyan-500/10 text-cyan-400',
  },
  grok: {
    accent: '#cbd5e1', // slate-300
    glow: 'rgba(203, 213, 225, 0.15)',
    border: 'border-slate-500/20 hover:border-slate-500/40',
    borderActive: 'border-slate-400/40',
    bgActive: 'bg-slate-900/30',
    text: 'text-slate-300',
    badge: 'bg-slate-500/10 text-slate-300',
  },
  chatgpt: {
    accent: '#10a37f', // ChatGPT green
    glow: 'rgba(16, 163, 127, 0.25)',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    borderActive: 'border-emerald-500/50',
    bgActive: 'bg-emerald-950/20',
    text: 'text-emerald-400',
    badge: 'bg-emerald-500/10 text-emerald-400',
  },
  runway: {
    accent: '#ec4899', // pink-500
    glow: 'rgba(236, 72, 153, 0.25)',
    border: 'border-pink-500/20 hover:border-pink-500/40',
    borderActive: 'border-pink-500/50',
    bgActive: 'bg-pink-950/15',
    text: 'text-pink-400',
    badge: 'bg-pink-500/10 text-pink-400',
  }
};

// Custom rolling numeric counter for premium feedback
function RollingNumber({ value, prefix = "" }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let start = displayValue;
    const end = value;
    if (start === end) return;

    const duration = 400; // ms
    const startTime = performance.now();
    let animationFrameId;

    const updateNumber = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const easeProgress = progress * (2 - progress);
      const current = Math.round(start + (end - start) * easeProgress);

      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateNumber);
      }
    };

    animationFrameId = requestAnimationFrame(updateNumber);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value]);

  return <>{prefix}{displayValue}</>;
}

export default function ProblemSolution() {
  const [activeTools, setActiveTools] = useState(['kling', 'elevenlabs', 'suno', 'heygen', 'chatgpt', 'runway']);

  // Spotlight effect for the left tool grid card container
  const gridContainerRef = useRef(null);
  const [gridCoords, setGridCoords] = useState({ x: 0, y: 0 });
  const [gridHovered, setGridHovered] = useState(false);

  const handleGridMouseMove = (e) => {
    if (gridContainerRef.current) {
      const rect = gridContainerRef.current.getBoundingClientRect();
      setGridCoords({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const toggleTool = (toolId) => {
    setActiveTools((prev) =>
      prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId]
    );
  };

  // Calculations
  const directCost = aiStackTools
    .filter((t) => activeTools.includes(t.id))
    .reduce((acc, t) => acc + t.cost, 0);

  const promptEditCost = directCost === 0 ? 0 : Math.max(9, Math.round(directCost * 0.20));
  const savings = directCost - promptEditCost;
  const savingsPercent = directCost > 0 ? Math.round((savings / directCost) * 100) : 0;

  return (
    <section className="pt-12 md:pt-16 pb-12 w-full bg-[radial-gradient(ellipse_70%_55%_at_50%_50%,#0b0a1e_0%,#09090f_70%)] border-b border-white/[0.03] relative overflow-hidden select-none">
      <style>{`
        .bg-grid-line-subtle {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.012) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.012) 1px, transparent 1px);
        }
        @keyframes float-slow-1 {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(25px, -30px) scale(1.04); }
          66% { transform: translate(-15px, 15px) scale(0.97); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float-slow-2 {
          0% { transform: translate(0px, 0px) scale(1.1); }
          33% { transform: translate(-30px, 25px) scale(0.95); }
          66% { transform: translate(25px, -15px) scale(1.02); }
          100% { transform: translate(0px, 0px) scale(1.1); }
        }
        .animate-float-slow-1 {
          animation: float-slow-1 18s infinite ease-in-out;
        }
        .animate-float-slow-2 {
          animation: float-slow-2 22s infinite ease-in-out;
        }
        @keyframes dash {
          to {
            stroke-dashoffset: -32;
          }
        }
        .animate-dash-flow {
          stroke-dasharray: 6, 6;
          animation: dash 1.5s linear infinite;
        }
      `}</style>

      {/* Grid background and glowing spots */}
      <div className="absolute inset-0 bg-grid-line-subtle pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,white_20%,transparent_90%)] opacity-80" />
      <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[110px] pointer-events-none animate-float-slow-1" />
      <div className="absolute bottom-[10%] right-[5%] w-[450px] h-[450px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none animate-float-slow-2" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 max-w-2xl px-2">
          <div className="flex items-center justify-center gap-1.5 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.12em] sm:tracking-[0.25em] mb-4">
            <span className="bg-gradient-to-r from-brand-accent via-cyan-300 to-violet-400 bg-clip-text text-transparent">
              Unified Pay-As-You-Go Integration
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-[44px] font-black text-white tracking-tight leading-[1.15] mb-5">
            Stop Subscribing to <br className="hidden sm:inline" />
            <span className="inline-block whitespace-nowrap bg-gradient-to-r from-brand-accent to-violet-400 bg-clip-text text-transparent">
              Multiple Tools
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-brand-tint/60 max-w-lg mx-auto leading-relaxed">
            Toggle the premium creator tools below to see how PromptEdit collapses individual monthly software overhead into a single optimized pay-per-use billing core.
          </p>
        </div>

        {/* Cost Calculator Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full">

          {/* Left Column: Interactive Tools Grid Card */}
          <div
            ref={gridContainerRef}
            onMouseMove={handleGridMouseMove}
            onMouseEnter={() => setGridHovered(true)}
            onMouseLeave={() => setGridHovered(false)}
            className="lg:col-span-7 flex flex-col gap-4 p-4 sm:p-7 bg-brand-surface/20 backdrop-blur-xl border border-brand-border/40 rounded-3xl relative overflow-hidden transition-all duration-300"
          >
            {/* Spotlight highlight */}
            {gridHovered && (
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 bg-[radial-gradient(350px_circle_at_var(--x)_var(--y),rgba(56,189,248,0.04),transparent_80%)]"
                style={{
                  '--x': `${gridCoords.x}px`,
                  '--y': `${gridCoords.y}px`
                }}
              />
            )}

            <div className="flex items-center justify-between border-b border-brand-border/30 pb-3 mb-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-brand-tint/40 uppercase tracking-widest">
                  Tool Workspace Stack ({activeTools.length} active)
                </span>
              </div>
              <button
                onClick={() => setActiveTools(activeTools.length === aiStackTools.length ? [] : aiStackTools.map(t => t.id))}
                className="text-[11px] font-bold text-brand-accent hover:text-cyan-300 hover:underline transition-all duration-200 cursor-pointer flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                {activeTools.length === aiStackTools.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            {/* Grid of tools (Responsive 2-col to 3-col mapping) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2.5 sm:gap-3.5">
              {aiStackTools.map((tool) => {
                const isActive = activeTools.includes(tool.id);
                const brand = toolBrands[tool.id];
                const CategoryIcon = categoryIcons[tool.id];
                
                return (
                  <motion.button
                    key={tool.id}
                    onClick={() => toggleTool(tool.id)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left rounded-xl sm:rounded-2xl p-2.5 sm:p-3 border transition-all duration-300 cursor-pointer relative overflow-hidden group flex flex-col justify-between h-[64px] sm:h-[108px] ${
                      isActive
                        ? `${brand.bgActive} ${brand.borderActive} shadow-[0_10px_22px_-5px_${brand.glow}]`
                        : 'bg-brand-card/35 border-brand-border/20 hover:border-brand-accent/25 text-brand-tint/50 hover:text-brand-tint/90'
                    }`}
                  >
                    {/* Mobile Layout (simple horizontal row, hidden on desktop/tablet) */}
                    <div className="flex sm:hidden items-center justify-between w-full h-full gap-2">
                      <div className="flex items-center gap-2 overflow-hidden w-full">
                        {/* Logo container */}
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          isActive ? 'bg-white/10 backdrop-blur-md' : 'bg-white/[0.03]'
                        }`}>
                          <img
                            src={tool.logo}
                            className={`w-3.5 h-3.5 object-contain transition-all duration-300 ${
                              isActive ? 'grayscale-0 opacity-100 scale-105' : 'grayscale opacity-30'
                            }`}
                            alt=""
                          />
                        </div>
                        {/* Text */}
                        <div className="flex flex-col overflow-hidden text-left min-w-0 flex-1">
                          <span className={`text-[11px] font-extrabold truncate leading-tight ${isActive ? 'text-white' : 'text-brand-tint/80'}`}>
                            {tool.name}
                          </span>
                          <span className={`text-[9px] font-bold mt-0.5 leading-none ${isActive ? brand.text : 'text-brand-tint/40'}`}>
                            ${tool.cost}/mo
                          </span>
                        </div>
                      </div>
                      
                      {/* Checkbox */}
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center border flex-shrink-0 transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-violet-500 to-brand-accent border-transparent text-white shadow-[0_0_8px_rgba(56,189,248,0.4)] scale-105'
                          : 'bg-white/[0.04] border-white/10 text-transparent'
                      }`}>
                        <Check className={`w-2.5 h-2.5 text-white stroke-[4.5] transition-transform duration-200 ${isActive ? 'scale-100' : 'scale-0'}`} />
                      </div>
                    </div>

                    {/* Desktop Layout (spacious stacked layout, hidden on mobile) */}
                    <div className="hidden sm:flex flex-col justify-between h-full w-full">
                      {/* Top Row: Logo Container & Custom Circular Checkbox */}
                      <div className="flex justify-between items-start w-full">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isActive ? 'bg-white/10 backdrop-blur-md' : 'bg-white/[0.03]'
                        }`}>
                          <img
                            src={tool.logo}
                            className={`w-4 h-4 object-contain transition-all duration-300 ${
                              isActive ? 'grayscale-0 opacity-100 scale-110' : 'grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-70'
                            }`}
                            alt=""
                          />
                        </div>

                        {/* Custom Checkbox */}
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 border ${
                          isActive
                            ? 'bg-gradient-to-r from-violet-500 to-brand-accent border-transparent text-white shadow-[0_0_8px_rgba(56,189,248,0.4)] scale-105'
                            : 'bg-white/[0.04] border-white/10 text-transparent'
                        }`}>
                          <Check className={`w-2.5 h-2.5 text-white stroke-[4.5] transition-transform duration-200 ${isActive ? 'scale-100' : 'scale-0'}`} />
                        </div>
                      </div>

                      {/* Bottom Row: Text details & Price */}
                      <div className="flex justify-between items-end w-full mt-2">
                        <div className="flex flex-col overflow-hidden mr-1">
                          <span className={`text-xs font-extrabold tracking-wide transition-colors truncate ${isActive ? 'text-white' : 'text-brand-tint/80'}`}>
                            {tool.name}
                          </span>
                          <span className="text-[9px] text-brand-tint/30 font-medium tracking-tight mt-0.5 truncate flex items-center gap-1 select-none">
                            {CategoryIcon && <CategoryIcon className="w-2.5 h-2.5 opacity-60 flex-shrink-0" />}
                            {tool.category}
                          </span>
                        </div>
                        <div className="flex flex-col items-end flex-shrink-0">
                          <span className={`text-[11px] sm:text-xs font-black transition-colors ${isActive ? brand.text : 'text-brand-tint/40'}`}>
                            ${tool.cost}
                          </span>
                          <span className="text-[7px] text-brand-tint/20 font-bold uppercase tracking-wider">/mo</span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Calculator Readout Glass Dashboard */}
          <div className="lg:col-span-5 flex flex-col justify-between p-4 sm:p-7 bg-brand-card/45 backdrop-blur-xl border border-brand-border/40 rounded-3xl relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            {/* Glowing internal blobs */}
            <div className="absolute -right-20 -top-20 w-56 h-56 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-56 h-56 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col items-center w-full relative z-10">
              <div className="flex items-center gap-2 self-start border-b border-brand-border/30 pb-3 w-full mb-4 sm:mb-6">
                <span className="text-[10px] font-bold text-brand-tint/40 uppercase tracking-widest">
                  Live Cost Optimizer Hub
                </span>
              </div>

              {/* Unique input flow pipeline visualization (shows selected tool logos in dynamic tray) */}
              <div className="w-full flex flex-col items-center mb-3 sm:mb-6">
                <div className="text-[9px] font-bold text-brand-tint/30 uppercase tracking-widest mb-2">
                  Optimized Pipelines
                </div>
                <div className="flex items-center justify-center gap-1.5 h-8 bg-brand-surface/40 px-3 rounded-full border border-brand-border/25 max-w-full overflow-hidden select-none">
                  <AnimatePresence>
                    {activeTools.length > 0 ? (
                      activeTools.map((toolId) => {
                        const tool = aiStackTools.find(t => t.id === toolId);
                        const brand = toolBrands[toolId];
                        return (
                          <motion.div
                            key={toolId}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className={`w-5 h-5 rounded-md flex items-center justify-center p-0.5 border border-brand-border/30 bg-brand-bg relative group`}
                          >
                            <img src={tool?.logo} alt="" className="w-3.5 h-3.5 object-contain" />
                            <div className={`absolute -inset-[1px] rounded-md border border-${brand.text} opacity-20 pointer-events-none`} />
                          </motion.div>
                        );
                      })
                    ) : (
                      <span className="text-[9px] text-brand-tint/20 font-medium px-2 py-0.5 flex items-center gap-1">
                        <AlertTriangle className="w-2.5 h-2.5 text-amber-500/70" />
                        Pipeline Idle - Toggle stack items
                      </span>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* SVG pipeline connector flow path (hidden on mobile to save vertical space) */}
                <div className="w-full h-8 flex justify-center relative overflow-hidden hidden sm:flex">
                  <svg className="w-20 h-full overflow-visible" fill="none">
                    <path
                      d="M 40 0 L 40 32"
                      stroke="url(#svgFlowGradient)"
                      strokeWidth="2"
                      className={`${activeTools.length > 0 ? 'animate-dash-flow' : 'stroke-brand-border/20'}`}
                    />
                    <defs>
                      <linearGradient id="svgFlowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Dynamic Circular Savings Gauge (shrunk on mobile to save height) */}
              <div className="relative flex justify-center items-center mb-4 sm:mb-6">
                <svg viewBox="0 0 180 180" className="w-28 h-28 sm:w-40 h-40 filter drop-shadow-[0_0_12px_rgba(56,189,248,0.12)]">
                  <defs>
                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="50%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#38bdf8" />
                    </linearGradient>
                  </defs>
                  
                  {/* Under track */}
                  <circle
                    cx="90"
                    cy="90"
                    r="70"
                    stroke="rgba(255,255,255,0.03)"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  {/* Dynamic indicator circle */}
                  <motion.circle
                    cx="90"
                    cy="90"
                    r="70"
                    stroke="url(#gaugeGradient)"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray="440"
                    initial={{ strokeDashoffset: 440 }}
                    animate={{ strokeDashoffset: 440 - (440 * savingsPercent) / 100 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </svg>

                {/* Text centered inside the gauge */}
                <div className="absolute inset-0 flex flex-col justify-center items-center">
                  <TrendingDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 mb-0.5 sm:mb-1 filter drop-shadow-[0_0_5px_rgba(52,211,153,0.4)]" />
                  <span className="text-xl sm:text-3xl font-black text-white tracking-tight flex items-baseline select-none">
                    <RollingNumber value={savingsPercent} />
                    <span className="text-[10px] sm:text-xs font-extrabold text-brand-accent ml-0.5">%</span>
                  </span>
                  <span className="text-[7px] sm:text-[8px] font-extrabold text-brand-tint/30 tracking-widest mt-0.5 uppercase">
                    Saved
                  </span>
                </div>
              </div>

              {/* Interactive side-by-side cost boxes (padding/radius optimized for mobile) */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full mb-4 sm:mb-6">
                
                {/* Traditional Subscription box */}
                <div className="p-2 sm:p-3 bg-brand-bg/40 border border-brand-border/20 rounded-xl sm:rounded-2xl flex flex-col items-center text-center">
                  <span className="text-[8px] font-bold text-rose-400/80 uppercase tracking-wider mb-1 flex items-center gap-1 select-none">
                    <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-rose-400" />
                    Stack Cost
                  </span>
                  <span className="text-sm sm:text-lg font-black text-brand-tint/90 flex items-center justify-center">
                    <DollarSign className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-tint/40 mr-0.5" />
                    <RollingNumber value={directCost} />
                    <span className="text-[8px] sm:text-[9px] text-brand-tint/30 font-medium ml-0.5">/mo</span>
                  </span>
                </div>

                {/* PromptEdit cost box */}
                <div className="p-2 sm:p-3 bg-gradient-to-br from-brand-accent/5 to-violet-500/5 border border-brand-accent/20 rounded-xl sm:rounded-2xl flex flex-col items-center text-center relative overflow-hidden shadow-[0_4px_12px_rgba(56,189,248,0.05)]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-accent/5 via-transparent to-transparent pointer-events-none" />
                  <span className="text-[8px] font-bold text-brand-accent uppercase tracking-wider mb-1 flex items-center gap-1 relative z-10 select-none">
                    <Zap className="w-2.5 h-2.5 text-brand-accent animate-bounce" />
                    PromptEdit
                  </span>
                  <span className="text-sm sm:text-lg font-black text-white relative z-10 flex items-center justify-center">
                    <Wallet className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-accent mr-0.5" />
                    <RollingNumber value={promptEditCost} />
                    <span className="text-[8px] sm:text-[9px] text-brand-tint/40 font-semibold ml-0.5">/mo</span>
                  </span>
                </div>

              </div>

              {/* Dynamic Bottom Status readout */}
              <div className="w-full flex justify-center text-center min-h-[28px] sm:min-h-[38px] mb-4 sm:mb-5">
                <AnimatePresence mode="wait">
                  {directCost > 0 ? (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="flex flex-col items-center"
                    >
                      <div className="flex items-center gap-1.5 text-emerald-400 font-extrabold text-[11px] sm:text-[12px] tracking-wide">
                        <TrendingDown className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Save $<RollingNumber value={savings} /> monthly</span>
                      </div>
                      <span className="text-[8px] font-medium text-brand-tint/30 mt-1 uppercase tracking-wider hidden sm:block">
                        Based on flat $9 base fee + pay-as-you-use computation
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1.5 text-brand-tint/30 text-[10px] font-medium text-center"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Configure your tool stack on the left.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* CTA action button (responsive padding on mobile) */}
            <button className="w-full relative group px-4 py-3 sm:px-5 sm:py-3.5 bg-gradient-to-r from-violet-600 via-indigo-600 to-brand-accent text-white font-extrabold text-[10px] sm:text-[11px] rounded-xl sm:rounded-2xl tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_25px_rgba(99,102,241,0.35)] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(99,102,241,0.25)] relative z-10">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-200 animate-pulse" />
              <span>Optimise Your Stack Now</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
