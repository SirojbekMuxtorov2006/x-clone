'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { ABOUT_TEXT, PERSONAL_INFO } from '@/data/portfolioData';
import { User, MapPin, Calendar, Languages, CheckCircle2, Shield, Cpu, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-3">
            <User className="w-3.5 h-3.5" />
            <span>{lang === 'uz' ? 'Men Haqimda' : 'About Me'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            {lang === 'uz' ? 'Muhandislik Falsafasi & Yondashuv' : 'Engineering Philosophy & Mindset'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Geometric "SM" Monogram Profile Card */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="relative rounded-2xl p-6 bg-slate-900/60 border border-white/10 backdrop-blur-xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.4)]">
              {/* Decorative background grid and gradients */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,240,255,0.1),transparent_70%)] pointer-events-none" />
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-purple-500/20 blur-2xl rounded-full pointer-events-none" />

              {/* Sirojbek Muxtorov Official Portrait */}
              <div className="relative w-full max-w-[280px] mx-auto rounded-2xl overflow-hidden border-2 border-cyan-500/40 p-1 bg-gradient-to-br from-cyan-500/20 via-slate-900 to-purple-600/20 shadow-[0_0_35px_rgba(0,240,255,0.25)] mb-6 group">
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-950">
                  <Image
                    src="/sirojbek.jpg"
                    alt="Sirojbek Muxtorov - Full-Stack & AI Engineer"
                    fill
                    priority
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 320px"
                  />
                  {/* Subtle gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Corner branding tag */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md border border-white/10 flex items-center gap-1.5 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono font-bold text-white tracking-wider">SM.</span>
                  </div>

                  {/* Bottom caption overlay */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2 rounded-xl bg-slate-950/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white leading-tight">Sirojbek Muxtorov</div>
                      <div className="text-[10px] font-mono text-cyan-300">Full-Stack & AI</div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
                  </div>
                </div>
              </div>

              {/* Verified Profile Attributes */}
              <div className="space-y-3 pt-4 border-t border-white/10 text-xs font-mono">
                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    {lang === 'uz' ? 'Joylashuv' : 'Location'}:
                  </span>
                  <span className="text-white font-medium">{PERSONAL_INFO.location[lang]}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    {lang === 'uz' ? 'Freelance' : 'Freelance'}:
                  </span>
                  <span className="text-emerald-400 font-medium">{PERSONAL_INFO.freelancePeriod[lang]}</span>
                </div>
              </div>

              {/* Languages Box */}
              <div className="mt-5 pt-4 border-t border-white/10">
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300 font-semibold mb-3">
                  <Languages className="w-4 h-4 text-cyan-400" />
                  <span>{lang === 'uz' ? 'Til bilish darajasi' : 'Languages'}</span>
                </div>

                <div className="space-y-2">
                  {PERSONAL_INFO.languages.map((l) => (
                    <div
                      key={l.code}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-white/5 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold">
                          {l.code}
                        </span>
                        <span className="text-slate-200">{l.lang[lang]}</span>
                      </div>
                      <span className="text-slate-400 font-mono text-[11px]">{l.level[lang]}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Bio Paragraph & Pillars */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* The verbatim required bio text */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 blur-3xl pointer-events-none" />
              
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-4">
                <Sparkles className="w-4 h-4" />
                <span>{lang === 'uz' ? 'Kasbiy Qarash va Maqsad' : 'Professional Mission'}</span>
              </div>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
                {ABOUT_TEXT[lang].bio}
              </p>
            </div>

            {/* Core Competency Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ABOUT_TEXT[lang].highlights.map((item, index) => (
                <div
                  key={index}
                  className="p-5 rounded-xl bg-slate-900/40 border border-white/5 hover:border-cyan-500/30 transition-all hover:bg-slate-900/70 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-105 transition-transform">
                    {index === 0 ? <CheckCircle2 className="w-4 h-4" /> : index === 1 ? <Cpu className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Full Lifecycle Development Banner */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/70 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  {lang === 'uz' ? 'To‘liq siklli mahsulot yaratish' : 'End-to-End Product Engineering'}
                </h4>
                <p className="text-xs text-slate-400">
                  {lang === 'uz'
                    ? 'Talablarni tahlil qilish → Arxitektura → Frontend → Backend → DB → Integratsiya → Deploy'
                    : 'Requirement Discovery → System Architecture → Frontend → Backend → DB → Integrations → Production Deploy'}
                </p>
              </div>
              <a
                href="#contact"
                className="self-start sm:self-auto shrink-0 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold font-mono border border-white/10 transition-colors"
              >
                {lang === 'uz' ? 'Hamkorlik' : 'Collaborate'}
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
