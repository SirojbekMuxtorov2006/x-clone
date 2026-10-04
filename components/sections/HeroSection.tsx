'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { HeroSceneWrapper } from '@/components/3d/HeroSceneWrapper';
import { MapPin, ArrowRight, Phone, Sparkles, Terminal, Code2 } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';

export const HeroSection: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <section className="relative min-h-[92vh] pt-28 pb-16 md:pt-36 md:pb-24 flex items-center overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Information & Actions (First on mobile) */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start z-10">
            
            {/* Profile Avatar & Location & Status Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <a
                href="#about"
                className="inline-flex items-center gap-2 p-1 pr-3 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-slate-200 hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(0,240,255,0.15)] group"
              >
                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-cyan-400">
                  <Image
                    src="/sirojbek.jpg"
                    alt="Sirojbek Muxtorov"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <span className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  Sirojbek Muxtorov
                </span>
              </a>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-white/10 text-xs font-mono text-slate-300 backdrop-blur-md">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PERSONAL_INFO.location[lang]}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-xs font-mono text-emerald-300 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{lang === 'uz' ? 'Freelance 2023–Hozirgacha' : 'Freelance 2023–Present'}</span>
              </div>
            </div>

            {/* Main Name Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-3">
              <span className="block">{PERSONAL_INFO.name}</span>
            </h1>

            {/* Role Title with electric cyan & purple gradient */}
            <div className="inline-flex items-center gap-2 mb-5">
              <Code2 className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">
                {PERSONAL_INFO.heroTitle[lang]}
              </h2>
            </div>

            {/* Tagline Paragraph */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed mb-8">
              {PERSONAL_INFO.tagline[lang]}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-8">
              {/* Button 1: Loyihalarim */}
              <a
                href="#projects"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <span>{lang === 'uz' ? 'Loyihalarim' : 'My Projects'}</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </a>

              {/* Button 2: Bog‘lanish */}
              <a
                href="#contact"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-slate-900/90 hover:bg-slate-800 border border-white/15 hover:border-cyan-400/50 backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                <span>{lang === 'uz' ? 'Bog‘lanish' : 'Get in Touch'}</span>
                <Sparkles className="w-4 h-4 text-purple-400" />
              </a>
            </div>

            {/* Secondary Direct Contact & GitHub Row */}
            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-white/10 w-full text-xs font-mono text-slate-400">
              {/* GitHub Link */}
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-white/25 text-slate-200 hover:text-white transition-all group"
              >
                <GithubIcon className="w-4 h-4 text-slate-300 group-hover:text-cyan-400 transition-colors" />
                <span>github.com/{PERSONAL_INFO.githubUsername}</span>
              </a>

              {/* Direct Phone Link */}
              <a
                href={PERSONAL_INFO.phoneTel}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-emerald-500/40 text-slate-200 hover:text-white transition-all group"
              >
                <Phone className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
            </div>

          </div>

          {/* Right Column: 3D Interactive Scene (Below on mobile) */}
          <div className="lg:col-span-6 xl:col-span-6 w-full relative">
            <HeroSceneWrapper />
          </div>

        </div>
      </div>
    </section>
  );
};
