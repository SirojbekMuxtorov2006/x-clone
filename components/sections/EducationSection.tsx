'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { EDUCATION_PLATFORMS } from '@/data/portfolioData';
import { GraduationCap, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const { lang } = useLanguage();
  const isUz = lang === 'uz';

  return (
    <section id="education" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{isUz ? 'Ta’lim & Rivojlanish' : 'Education & Learning'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            {isUz ? 'Doimiy O‘rganish & Malaka Oshirish' : 'Continuous Learning & Growth'}
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-2 max-w-xl">
            {isUz
              ? 'Zamonaviy dasturlash, sun’iy intellekt va muhandislik sohasida yetakchi ta’lim platformalari orqali egallangan amaliy bilimlar.'
              : 'Continuous technical mastery, algorithmic reasoning, and AI engineering pursued across premier platforms.'}
          </p>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EDUCATION_PLATFORMS.map((platform, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl p-6 bg-slate-900/50 border border-white/10 hover:border-purple-500/30 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_10px_30px_rgba(168,85,247,0.06)] group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 group-hover:bg-purple-500/15 blur-xl rounded-full transition-all pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="w-10 h-10 rounded-xl bg-slate-950/80 border border-white/10 flex items-center justify-center text-purple-400 font-bold font-mono text-sm group-hover:scale-105 transition-transform shadow-inner">
                    <BookOpen className="w-5 h-5 text-purple-400" />
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    {platform.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {platform.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {platform.description[lang]}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 text-[11px] font-mono text-cyan-400">
                <span className="text-slate-500 block mb-0.5">{isUz ? 'Asosiy yo‘nalish:' : 'Core Focus:'}</span>
                <span>{platform.focus[lang]}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
