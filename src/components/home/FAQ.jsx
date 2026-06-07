import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Sparkles, MessageSquare } from 'lucide-react';

const faqData = [
  {
    question: 'What is PromptEdit?',
    answer: 'PromptEdit is an all-in-one AI creator platform that gives you access to leading AI video, image, audio, and editing tools from a single dashboard. Instead of managing multiple subscriptions, you can access everything you need in one place and pay only for what you use.'
  },
  {
    question: 'Do I need separate subscriptions for tools like Kling, Veo, Suno, or ElevenLabs?',
    answer: 'No. PromptEdit brings together popular AI tools under one platform, eliminating the need to manage multiple accounts, subscriptions, and billing cycles. Access your favorite tools from a single workspace.'
  },
  {
    question: 'Can I use the content I create for commercial projects?',
    answer: 'Yes. Content generated through PromptEdit can be used for personal projects, client work, social media content, marketing campaigns, and commercial productions, subject to the licensing terms of the individual tools and assets used.'
  },
  {
    question: 'What\'s included with the Content Creator Templates Library?',
    answer: 'You\'ll get access to thousands of professional creator assets, including LUTs, sound effects, overlays, motion graphics, backgrounds, text animations, transitions, and other resources designed to speed up your content creation workflow.'
  },
  {
    question: 'Do the templates and assets work with my editing software?',
    answer: 'Yes. Most assets are designed to work with popular editing platforms such as Adobe Premiere Pro, DaVinci Resolve, Final Cut Pro, CapCut, After Effects, and other industry-standard editing tools.'
  },
  {
    question: 'Can I cancel my subscription at any time?',
    answer: 'Absolutely. There are no long-term contracts or commitments. You can upgrade, downgrade, or cancel your subscription whenever you choose.'
  },
  {
    question: 'Is there a money-back guarantee?',
    answer: 'Yes. We offer a 30-day money-back guarantee so you can explore the platform with confidence. If PromptEdit isn\'t the right fit for your workflow, simply contact our support team within the guarantee period.'
  }
];

function FaqItem({ item, isOpen, onToggle }) {
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
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onToggle}
      style={{
        backgroundImage: isHovered
          ? `radial-gradient(300px circle at ${coords.x}px ${coords.y}px, rgba(56, 189, 248, 0.1), transparent 80%)`
          : 'none',
      }}
      className={`relative overflow-hidden backdrop-blur-xl border border-brand-accent/15 hover:border-brand-accent/30 rounded-2xl p-5 mb-4 cursor-pointer transition-all duration-300 bg-brand-card/20 hover:bg-brand-card/35 select-none`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <HelpCircle className={`w-4 h-4 shrink-0 transition-colors duration-300 ${isOpen ? 'text-brand-accent' : 'text-brand-tint/40'}`} />
          <h4 className={`text-sm sm:text-base font-bold transition-colors duration-300 ${isOpen ? 'text-white' : 'text-brand-tint/80'}`}>
            {item.question}
          </h4>
        </div>
        <ChevronDown className={`w-4.5 h-4.5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-accent' : 'text-brand-tint/40'}`} />
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-xs sm:text-sm text-brand-tint/60 mt-4 leading-relaxed pl-7">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0); // Default open the first question

  const toggleIdx = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section className="pt-8 md:pt-10 pb-10 md:pb-16 w-full bg-[linear-gradient(180deg,#09090f_0%,#070d19_60%,#09090f_100%)] relative overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[350px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-10 left-1/4 w-[400px] h-[300px] bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Split Layout: Left title/cta, Right accordions */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12 items-start">
          
          {/* Left Side: Header Info & CTA card */}
          <div className="md:col-span-2 flex flex-col gap-6 text-left">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-card/40 text-brand-tint/70 text-xs font-semibold tracking-wide mb-4">
                <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
                <span>Got Questions?</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-[1.15] mb-4">
                Frequently Asked <span className="text-brand-accent">Questions.</span>
              </h2>
              <p className="text-sm text-brand-tint/50 leading-relaxed max-w-sm">
                Everything you need to know about PromptEdit's tools, commercial licensing, billing models, and templates library.
              </p>
            </div>

            {/* Premium Support CTA card */}
            <div className="bg-gradient-to-br from-brand-card/40 to-brand-surface/40 border border-brand-accent/15 p-6 rounded-3xl backdrop-blur-xl relative overflow-hidden flex flex-col justify-between h-fit gap-6 shadow-xl">
              <div className="absolute -right-12 -bottom-12 w-36 h-36 bg-brand-accent/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex flex-col gap-2">
                <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent mb-2">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h4 className="text-base font-extrabold text-white">Still have questions?</h4>
                <p className="text-xs text-brand-tint/40 leading-relaxed">
                  Can't find the answers you're looking for? Reach out to our dedicated support team, and we'll help resolve your questions.
                </p>
              </div>
              <button className="relative group px-5 py-3 bg-white hover:bg-white/95 text-brand-bg font-extrabold text-xs rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5 w-full relative z-10">
                <span>Chat with support</span>
              </button>
            </div>
          </div>

          {/* Right Side: Accordion Accordions */}
          <div className="md:col-span-3 text-left w-full">
            {faqData.map((item, idx) => (
              <FaqItem
                key={idx}
                item={item}
                isOpen={openIdx === idx}
                onToggle={() => toggleIdx(idx)}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
