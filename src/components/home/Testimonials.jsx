import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonialsData = [
  {
    name: 'Brady Hales',
    role: 'ContentCreator.com Student - Video creator',
    initials: 'BH',
    color: 'bg-brand-accent/10 text-brand-accent border border-brand-accent/20',
    isFeatured: true,
    text: 'I used to pay for Kling, ElevenLabs, Suno, and HeyGen separately — that was <span class="text-brand-accent font-bold">$157 every single month</span> whether I was actively creating or not. I switched to PromptEdit and my first month I spent <span class="text-brand-accent font-bold">$39</span>, got more credits than I needed, AND got access to that insane templates library. <span class="text-brand-accent font-bold">I genuinely cannot believe more creators don\'t know about this.</span> It\'s not even close — this is the smarter way to work with AI tools.'
  },
  {
    name: 'Hilda Schlueter',
    role: 'Online Course Creator',
    initials: 'HS',
    color: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    text: 'My daughter and I got <span class="text-brand-accent font-bold">3 hours of editing done</span> in a single afternoon that normally would have taken us 3 full days. The templates library alone is worth 10x the price — I\'d honestly pay <span class="text-brand-accent font-bold">$100/month</span> just for the LUTs and sound effects.'
  },
  {
    name: 'Matt Lilley',
    role: 'ContentCreator.com Student - YouTuber',
    initials: 'ML',
    color: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    text: 'My videos <span class="text-brand-accent font-bold">wouldn\'t look half as good</span> as they do without PromptEdit. I lean into the templates on every single edit — the cinematic LUTs, the text animations, the overlays. I\'ve tried every platform out there. Nothing comes close to this value.'
  },
  {
    name: 'James Kowalski',
    role: 'Social media manager - 180k followers',
    initials: 'JK',
    color: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
    text: 'I was skeptical about paying for another platform but the <span class="text-brand-accent font-bold">no-subscription model sold me</span>. I bought a credit pack, tested Kling and ElevenLabs for a project, loved it, and upgraded to monthly the next week. Best decision I made for my content business this year.'
  },
  {
    name: 'Sofia Reyes',
    role: 'Video editor - Adobe Certified',
    initials: 'SR',
    color: 'bg-pink-500/10 text-pink-400 border border-pink-500/20',
    text: 'The <span class="text-brand-accent font-bold">Premiere Pro plugin is a game changer</span>. I generate a voiceover, a background track, and a clone video without ever leaving my timeline. What used to take me 45 minutes of switching between apps now takes me <span class="text-brand-accent font-bold">under 8 minutes</span>.'
  },
  {
    name: 'Tyler Nguyen',
    role: 'Filmmaker',
    initials: 'TN',
    color: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    text: 'I don\'t need <span class="text-brand-accent font-bold">any other digital asset subscription</span> anymore. This is the only platform I recommend to every creator I know.'
  },
  {
    name: 'Aisha Carter',
    role: 'UGC Creator',
    initials: 'AC',
    color: 'bg-teal-500/10 text-teal-400 border border-teal-500/20',
    text: 'Switched from paying <span class="text-brand-accent font-bold">paying $200+ a month</span> across 6 different AI tools. Now I pay $39. Same quality. Better workflow. Wish I\'d found this sooner.'
  },
  {
    name: 'Daniel Moore',
    role: 'Podcast producer',
    initials: 'DM',
    color: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
    text: 'The <span class="text-brand-accent font-bold">60,000 sound effects alone</span> have saved me hours every week. Add in the AI tools and this is genuinely the best $39 I spend each month.'
  }
];

function TestimonialCard({ item, idx }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.01, zIndex: 10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        backgroundImage: isHovered
          ? `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(56, 189, 248, 0.12), transparent 80%)`
          : 'none',
      }}
      className={`${
        item.isFeatured ? 'w-[85vw] max-w-[340px] sm:w-[480px] md:w-[600px]' : 'w-[85vw] max-w-[340px] sm:w-[320px] md:w-[355px]'
      } shrink-0 snap-start flex flex-col justify-between p-5 sm:p-7.5 rounded-2xl md:rounded-3xl bg-brand-card/30 border border-brand-accent/20 shadow-2xl hover:bg-brand-card/45 hover:border-brand-accent/35 transition-all duration-300 h-auto backdrop-blur-xl relative overflow-hidden`}
    >
      <div>
        {/* Top Quote Icon / Pill (Featured) or Stars (Regular) */}
        {item.isFeatured ? (
          <div className="flex justify-between items-start mb-4">
            <span className="text-brand-accent/20 text-5xl font-serif leading-none select-none">“</span>
          </div>
        ) : (
          <div className="flex items-center gap-0.5 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400 stroke-1" />
            ))}
          </div>
        )}

        <p 
          className="text-[11.5px] sm:text-sm text-brand-tint/65 leading-relaxed italic mb-4 sm:mb-6"
          dangerouslySetInnerHTML={{ __html: `"${item.text}"` }}
        />
      </div>

      <div className="flex items-center gap-3 border-t border-white/[0.03] pt-3.5 sm:pt-4.5 mt-auto">
        <div className={`w-8 h-8 md:w-9.5 md:h-9.5 rounded-full ${item.color} font-black text-[10px] md:text-xs flex items-center justify-center shrink-0`}>
          {item.initials}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[11px] md:text-xs font-black text-white truncate">{item.name}</span>
          <span className="text-[9.5px] md:text-[10px] text-brand-tint/40 font-medium truncate mt-0.5">{item.role}</span>
          {/* Stars below details (Featured only) */}
          {item.isFeatured && (
            <div className="flex gap-0.5 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400 stroke-1" />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const startX = useRef(0);
  const scrollLeftVal = useRef(0);

  // Monitor scroll position to show/hide navigation arrows dynamically
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setShowLeftArrow(scrollLeft > 15);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 15);
  };

  useEffect(() => {
    // Check initially on mount
    handleScroll();
    
    // Add resize listener to handle dynamic viewport scaling
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeftVal.current = containerRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Drag speed multiplier
    containerRef.current.scrollLeft = scrollLeftVal.current - walk;
  };

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
  };

  return (
    <section className="pt-4 md:pt-8 pb-8 md:pb-10 w-full bg-[radial-gradient(ellipse_75%_60%_at_50%_30%,#0d0a20_0%,#09090f_70%)] relative overflow-hidden select-none">
      {/* Background radial highlight */}
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">

        {/* Section Header */}
        <div className="text-center mb-6 md:mb-10 px-6 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-card/40 text-brand-tint/70 text-xs font-semibold tracking-wide mb-4">
            <span>Real creators. Real results.</span>
          </div>
          <h2 className="text-[23px] sm:text-4xl md:text-[48px] font-black text-white tracking-tight leading-snug md:leading-[1.15] mb-4 md:mb-5">
            43,000+ creators already <span className="text-brand-accent">switched.</span>
          </h2>
          <p className="text-xs sm:text-base text-brand-tint/50 max-w-2xl mx-auto leading-relaxed">
            Here's what they said after their first month on PromptEdit.
          </p>

          {/* Sub-Header Stats Row with Integrated Navigation Controls */}
          <div className="flex items-center justify-center gap-2 mt-6 md:mt-8 max-w-3xl mx-auto w-full">
            {/* Left scroll control arrow */}
            <button
              onClick={scrollLeft}
              disabled={!showLeftArrow}
              className={`hidden sm:flex w-11 h-11 rounded-full bg-brand-card/30 border border-brand-border/60 text-white items-center justify-center transition-all duration-300 cursor-pointer shadow-md active:scale-95 shrink-0 ${
                !showLeftArrow 
                  ? 'opacity-20 cursor-not-allowed hover:border-brand-border/60' 
                  : 'hover:bg-brand-card hover:border-brand-accent/50 hover:scale-105'
              }`}
              title="Previous"
            >
              <ChevronLeft className="w-5 h-5 text-brand-tint" />
            </button>

            {/* Stats Pill */}
            <div className="flex items-center justify-center gap-2.5 sm:gap-8 md:gap-10 text-center bg-brand-card/20 border border-brand-border/40 px-3.5 py-3 rounded-xl md:rounded-2xl backdrop-blur-md w-full max-w-md md:max-w-2xl mx-auto select-none">
              <div className="flex flex-col items-center shrink-0">
                <div className="flex gap-0.5 mb-1 sm:mb-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400 stroke-1" />
                  ))}
                </div>
                <span className="text-[9.5px] sm:text-[11px] font-bold text-brand-tint/50">4.9 / 5 average</span>
              </div>
              
              <div className="h-6 sm:h-8 w-px bg-brand-border/60 shrink-0" />
              
              <div className="flex flex-col items-center shrink-0">
                <span className="text-xs sm:text-sm md:text-base font-black text-white leading-none">43,000+</span>
                <span className="text-[9.5px] sm:text-[11px] font-bold text-brand-tint/50 mt-1 sm:mt-1.5">active creators</span>
              </div>
              
              <div className="h-6 sm:h-8 w-px bg-brand-border/60 shrink-0" />
              
              <div className="flex flex-col items-center shrink-0">
                <span className="text-xs sm:text-sm md:text-base font-black text-white leading-none">$118</span>
                <span className="text-[9.5px] sm:text-[11px] font-bold text-brand-tint/50 mt-1 sm:mt-1.5">avg monthly saving</span>
              </div>
            </div>

            {/* Right scroll control arrow */}
            <button
              onClick={scrollRight}
              disabled={!showRightArrow}
              className={`hidden sm:flex w-11 h-11 rounded-full bg-brand-card/30 border border-brand-border/60 text-white items-center justify-center transition-all duration-300 cursor-pointer shadow-md active:scale-95 shrink-0 ${
                !showRightArrow 
                  ? 'opacity-20 cursor-not-allowed hover:border-brand-border/60' 
                  : 'hover:bg-brand-card hover:border-brand-accent/50 hover:scale-105'
              }`}
              title="Next"
            >
              <ChevronRight className="w-5 h-5 text-brand-tint" />
            </button>
          </div>
        </div>

        {/* Carousel Outer Track */}
        <div className="relative w-full mb-10 group/carousel">
          {/* Testimonials Slider Track */}
          <div
            ref={containerRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="flex overflow-x-auto gap-4 md:gap-10 py-6 md:py-8 items-stretch scroll-smooth select-none scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing [mask-image:linear-gradient(to_right,white_85%,transparent)] -mx-6 px-6 md:mx-0 md:px-12 scroll-pl-6 md:scroll-pl-12"
          >
            {testimonialsData.map((item, idx) => (
              <TestimonialCard key={idx} item={item} idx={idx} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
