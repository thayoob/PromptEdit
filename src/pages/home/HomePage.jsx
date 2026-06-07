import React from 'react';
import Hero from '../../components/home/Hero';
import ProblemSolution from '../../components/home/ProblemSolution';
import ToolExplorer from '../../components/home/ToolExplorer';
import Pricing from '../../components/home/Pricing';
import Testimonials from '../../components/home/Testimonials';
import FAQ from '../../components/home/FAQ';
import FooterCTA from '../../components/home/FooterCTA';

export default function HomePage() {
  return (
    <div className="w-full">
      <Hero />
      <ToolExplorer />
      <ProblemSolution />
      <Pricing />
      <Testimonials />
      <FAQ />
      <FooterCTA />
    </div>
  );
}
