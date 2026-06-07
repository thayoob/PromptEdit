import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

/* ─── Tool brand pills that orbit / fly in ───────────────────────── */
const toolPills = [
  { label: 'Kling AI',    color: '#22d3ee', delay: 0.0  },
  { label: 'ElevenLabs', color: '#f59e0b', delay: 0.12 },
  { label: 'Suno',       color: '#34d399', delay: 0.24 },
  { label: 'HeyGen',     color: '#a78bfa', delay: 0.36 },
  { label: 'Veo 3',      color: '#60a5fa', delay: 0.48 },
  { label: 'ChatGPT',    color: '#10b981', delay: 0.60 },
];

/* ─── Particle spark data ─────────────────────────────────────────── */
const sparks = Array.from({ length: 14 }, (_, i) => ({
  angle : (i / 14) * 360,
  dist  : 72 + (i % 3) * 18,
  dur   : 1.4 + (i % 4) * 0.22,
  size  : 2 + (i % 3),
}));

export default function Preloader({ onComplete }) {
  const [phase, setPhase]               = useState('loading');
  const [pillsVisible, setPillsVisible] = useState(false);

  useEffect(() => {
    // Auto-exit after ~1.8s
    const doneTimer = setTimeout(() => setPhase('done'), 1400);
    const exitTimer = setTimeout(() => setPhase('exit'), 1700);
    const completeTimer = setTimeout(() => onComplete?.(), 2100);

    const pillTimer = setTimeout(() => setPillsVisible(true), 300);

    return () => {
      clearTimeout(doneTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
      clearTimeout(pillTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none overflow-hidden"
          style={{ background: 'radial-gradient(ellipse 85% 70% at 50% 50%, #0b1228 0%, #09090f 70%)' }}
        >

          {/* ── Grid lines ──────────────────────────────────────── */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundSize: '48px 48px',
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px),' +
                'linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)',
            }}
          />

          {/* ── Ambient glows ───────────────────────────────────── */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[320px] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/3 w-[380px] h-[280px] rounded-full bg-violet-600/8 blur-[110px] pointer-events-none" />

          {/* ── Particle sparks ─────────────────────────────────── */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {sparks.map((s, i) => {
              const rad = (s.angle * Math.PI) / 180;
              const x = Math.cos(rad) * s.dist;
              const y = Math.sin(rad) * s.dist;
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-brand-accent/60"
                  style={{ width: s.size, height: s.size }}
                  animate={{
                    x: [0, x * 0.4, x],
                    y: [0, y * 0.4, y],
                    opacity: [0, 0.7, 0],
                    scale:   [0, 1, 0.4],
                  }}
                  transition={{
                    duration: s.dur,
                    repeat  : Infinity,
                    delay   : (i * 0.15) % 1.2,
                    ease    : 'easeOut',
                  }}
                />
              );
            })}
          </div>

          {/* ── Orbital rings ───────────────────────────────────── */}
          {[120, 90, 62].map((size, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-brand-accent/10"
              style={{ width: size * 2, height: size * 2 }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 6 + i * 2.5, repeat: Infinity, ease: 'linear' }}
            >
              {/* Orbit dot */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent"
                style={{
                  width  : 5 - i,
                  height : 5 - i,
                  boxShadow: `0 0 ${8 - i * 2}px rgba(56,189,248,0.8)`,
                }}
              />
            </motion.div>
          ))}

          {/* ── Central logo icon ───────────────────────────────── */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1,   opacity: 1 }}
            transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.1 }}
            className="relative z-10 flex flex-col items-center gap-5"
          >
            {/* Logo mark */}
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.06, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-violet-500/40 to-brand-accent/30 blur-xl"
              />
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-brand-accent flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.45)]">
                <Zap className="w-8 h-8 text-white fill-white" />
              </div>
            </div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="flex flex-col items-center gap-1"
            >
              <span className="text-2xl font-black text-white tracking-tight">PromptEdit</span>
              <span className="text-[11px] font-bold text-brand-tint/40 uppercase tracking-[0.2em]">
                AI Creator Platform
              </span>
            </motion.div>

            {/* ── Tool pills ──────────────────────────────────────── */}
            <AnimatePresence>
              {pillsVisible && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 flex-wrap justify-center max-w-xs mt-1"
                >
                  {toolPills.map((pill, i) => (
                    <motion.div
                      key={pill.label}
                      initial={{ opacity: 0, scale: 0.7, y: 8 }}
                      animate={{ opacity: 1, scale: 1,   y: 0 }}
                      transition={{ delay: pill.delay + 0.2, duration: 0.35, type: 'spring', stiffness: 320 }}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full border backdrop-blur-sm text-[10px] font-bold"
                      style={{
                        borderColor : pill.color + '35',
                        color       : pill.color,
                        background  : pill.color + '10',
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: pill.color }}
                      />
                      {pill.label}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>




          </motion.div>



        </motion.div>
      )}
    </AnimatePresence>
  );
}
