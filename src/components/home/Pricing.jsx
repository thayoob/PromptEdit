import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Sparkles, ArrowRight, Lock } from 'lucide-react';

const paymentMethods = [
  { name: 'Visa', logo: '/logos/visa.svg' },
  { name: 'Mastercard', logo: '/logos/mastercard.svg' },
  { name: 'Amex', logo: '/logos/amex.svg' },
  { name: 'PayPal', logo: '/logos/paypal.svg' },
  { name: 'Apple Pay', logo: '/logos/applepay.svg' },
  { name: 'Google Pay', logo: '/logos/googlepay.svg' }
];

export default function Pricing() {
  const [isMonthly, setIsMonthly] = useState(false);

  // Dynamic Prices based on Toggle
  const starterPrice = isMonthly ? 29 : 98;
  const starterSub = isMonthly
    ? "Get $35 worth of AI credits monthly. Save 15%."
    : "Get $110 worth of AI credits. Save 10%.";
  const starterLabel = isMonthly ? "/mo" : " one time";
  const starterButtonText = isMonthly ? "Subscribe to Starter" : "Claim credit deal";

  const monthlyPrice = isMonthly ? 31 : 39;
  const monthlySub = isMonthly
    ? "$49 worth of AI credits every month. Billed annually."
    : "$49 worth of AI credits every month. + 10% off extra credits.";

  return (
    <section className="pt-6 md:pt-20 pb-10 md:pb-16 w-full bg-[linear-gradient(180deg,#060d1f_0%,#09090f_55%)] relative overflow-hidden select-none">
      {/* Background ambient glowing rings */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[450px] bg-brand-accent/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-1/3 w-[450px] h-[450px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center relative z-10">

        {/* Section Header */}
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-[23px] sm:text-4xl md:text-[48px] font-black text-white tracking-tight leading-snug md:leading-[1.15] mb-4 md:mb-5">
            Start for <span className="text-brand-accent">as little as $39.</span> <br />
            No hidden fees. Cancel any time.
          </h2>
          <p className="text-xs sm:text-base text-brand-tint/50 max-w-xl mx-auto leading-relaxed">
            Both plans include access to all 20+ AI tools. Pick what suits your needs.
          </p>
        </div>

        {/* Billing Cycle Toggle Switch */}
        <div className="flex items-center gap-1.5 mb-8 md:mb-14 bg-[#050811]/90 border border-white/[0.03] p-1 md:p-1.5 rounded-xl md:rounded-2xl backdrop-blur-md shadow-2xl relative">
          <button
            onClick={() => setIsMonthly(false)}
            className={`px-3.5 py-2 md:px-5 md:py-2.5 rounded-lg md:rounded-xl text-[10.5px] md:text-xs font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer ${!isMonthly ? 'bg-white/[0.04] text-white shadow-[0_4px_15px_rgba(255,255,255,0.05)]' : 'text-brand-tint/40 hover:text-brand-tint/70'
              }`}
          >
            <span className="hidden sm:inline">One-time credits</span>
            <span className="sm:hidden">One-time</span>
          </button>

          <button
            onClick={() => setIsMonthly(true)}
            className={`flex items-center gap-1.5 md:gap-2 px-3.5 py-2 md:px-5 md:py-2.5 rounded-lg md:rounded-xl text-[10.5px] md:text-xs font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer ${isMonthly ? 'bg-white/[0.04] text-white shadow-[0_4px_15px_rgba(255,255,255,0.05)]' : 'text-brand-tint/40 hover:text-brand-tint/70'
              }`}
          >
            <span className="hidden sm:inline">Monthly plan</span>
            <span className="sm:hidden">Monthly</span>
            <span className="bg-emerald-500/10 text-emerald-400 text-[8px] md:text-[9px] px-1.5 py-0.5 rounded font-black uppercase tracking-widest shrink-0">
              Save 20%
            </span>
          </button>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch w-full max-w-4xl mb-6">

          {/* Card 1: Starter Credit Pack */}
          <div className="flex flex-col justify-between p-5 sm:p-6 md:p-10 rounded-2xl md:rounded-3xl backdrop-blur-xl transition-all duration-500 relative overflow-hidden group bg-[#050811]/60 border border-white/[0.02] opacity-90 hover:opacity-100 hover:scale-[1.01] hover:bg-[#070b16]/80">
            <div className="text-left">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 bg-white/[0.03] text-brand-tint/50 rounded-lg">
                  Starter Pack
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white mt-4 md:mt-6">Save on Credits</h3>
              <p className="text-[11px] sm:text-xs text-brand-tint/45 mt-1.5 md:mt-2 max-w-[280px] leading-relaxed">
                Best if you want to try everything first. Credits never expire.
              </p>

              {/* Price Stack */}
              <div className="my-5 md:my-8 flex flex-col items-start gap-1">
                <div className="flex items-baseline">
                  <span className="text-4xl sm:text-5xl md:text-[56px] font-black text-white tracking-tight">${starterPrice}</span>
                  <span className="text-xs text-brand-tint/40 font-bold uppercase tracking-wider ml-1.5">{starterLabel}</span>
                </div>
                <span className="text-[11px] text-emerald-400 font-extrabold tracking-wide mt-2 bg-emerald-500/5 px-2.5 py-1 rounded-md">
                  {starterSub}
                </span>
              </div>

              {/* Bullet Features */}
              <div className="flex flex-col gap-3 mb-6 md:mb-10">
                {[
                  { text: 'All 20+ AI tools - Kling, Veo, Suno, ElevenLabs', ok: true },
                  { text: 'Credits never expire - use when you want', ok: true },
                  { text: 'Premiere Pro + DaVinci plugins included', ok: true },
                  { text: 'Buy more credits anytime - no subscription', ok: true },
                  { text: 'Templates library not included', ok: false },
                  { text: 'No monthly credit bonus', ok: false }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 md:gap-3 text-[11px] md:text-xs font-semibold transition-opacity duration-300 ${item.ok ? 'text-brand-tint/70' : 'text-brand-tint/25 line-through decoration-white/10'
                      }`}
                  >
                    {item.ok ? (
                      <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-accent stroke-[3.5] shrink-0" />
                    ) : (
                      <X className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-tint/20 stroke-[3.5] shrink-0" />
                    )}
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Button */}
            <button className="w-full relative group px-6 py-3.5 font-extrabold text-xs rounded-2xl tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 border bg-white/[0.04] hover:bg-white/[0.08] text-white border-white/[0.03]">
              <span>{starterButtonText}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Card 2: Featured Monthly Plan */}
          <div className="flex flex-col justify-between p-5 sm:p-6 md:p-10 rounded-2xl md:rounded-3xl backdrop-blur-xl transition-all duration-500 relative overflow-hidden group bg-[#09152b]/50 border-2 border-brand-accent/50 shadow-[0_0_35px_rgba(56,189,248,0.25)] scale-[1.02] hover:bg-[#0c1c38]/60">
            {/* Top accent glow line */}
            <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-brand-accent via-sky-400 to-violet-500" />

            <div className="text-left">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 bg-brand-accent/20 text-brand-accent rounded-lg border border-brand-accent/20">
                  Most popular - Best value
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white mt-4 md:mt-6">
                Save on Everything
              </h3>
              <p className="text-[11px] sm:text-xs text-brand-tint/45 mt-1.5 md:mt-2 max-w-[280px] leading-relaxed">
                Best for regular creators. More credits + the full templates library.
              </p>

              {/* Price Stack */}
              <div className="my-5 md:my-8 flex flex-col items-start gap-1">
                <div className="flex items-baseline">
                  <span className="text-4xl sm:text-5xl md:text-[56px] font-black text-white tracking-tight">${monthlyPrice}</span>
                  <span className="text-xs text-brand-tint/40 font-bold uppercase tracking-wider ml-1.5">/month</span>
                </div>
                <span className="text-[11px] text-emerald-400 font-extrabold tracking-wide mt-2 bg-emerald-500/5 px-2.5 py-1 rounded-md">
                  {monthlySub}
                </span>
              </div>

              {/* Bullet Features */}
              <div className="flex flex-col gap-3 mb-6 md:mb-10">
                {[
                  { text: 'Everything in the Credit Pack', ok: true, highlight: false },
                  { text: '100,000+ Content Creator Templates Library', ok: true, highlight: true },
                  { text: 'Lifetime 20% boost on all monthly credits', ok: true, highlight: true },
                  { text: 'Faster AI generation speeds', ok: true, highlight: false },
                  { text: 'Run multiple generations at once', ok: true, highlight: false },
                  { text: 'Cancel anytime - no lock-in', ok: true, highlight: false }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 md:gap-3 text-[11px] md:text-xs font-semibold ${item.highlight ? 'text-emerald-400 font-bold' : 'text-brand-tint/70'
                      }`}
                  >
                    <Check className={`w-3.5 h-3.5 md:w-4 md:h-4 stroke-[3.5] shrink-0 ${item.highlight ? 'text-emerald-400' : 'text-brand-accent'}`} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Button */}
            <button className="w-full relative group px-6 py-3.5 text-white font-extrabold text-xs rounded-2xl tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(99,102,241,0.25)] bg-gradient-to-r from-violet-600 via-indigo-600 to-brand-accent hover:shadow-[0_8px_25px_rgba(99,102,241,0.4)]">
              <span>
                Get started - ${monthlyPrice}/mo
              </span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

        </div>

        {/* Minimal borderless Guarantee & Checkout Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 w-full max-w-4xl py-4 md:py-6 px-4 mt-2 md:mt-4 border-t border-white/[0.03] text-brand-tint/30 text-[10px] md:text-xs">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3 h-3 md:w-3.5 md:h-3.5 text-brand-accent/60 shrink-0" />
            <span className="font-semibold whitespace-nowrap">30-day money-back guarantee • Secure checkout</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {paymentMethods.map((method, idx) => (
              <img
                key={idx}
                src={method.logo}
                alt={method.name}
                className="h-4.5 object-contain opacity-25 hover:opacity-85 transition-opacity duration-300 filter brightness-0 invert"
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
