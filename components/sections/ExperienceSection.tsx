'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { EXPERIENCE_ITEMS } from '@/data/portfolioData';
import { Briefcase, Calendar, Building, CheckCircle2, Sparkles } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { lang } = useLanguage();
  const isUz = lang === 'uz';

  return (
    <section id="experience" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{isUz ? 'Kasbiy Tajriba' : 'Professional Journey'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            {isUz ? 'Faoliyat & Ish Tajribasi' : 'Career Timeline & Experience'}
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-2 max-w-xl">
            {isUz
              ? 'Freelance va startap hamda muhandislik loyihalarida to‘plangan amaliy tajriba.'
              : 'Applied engineering experience across full-stack development, devops, and high-impact digital products.'}
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 md:pl-10 border-l border-white/10 space-y-12">
          {EXPERIENCE_ITEMS.map((item, idx) => (
            <div key={item.id} className="relative group">
              
              {/* Timeline Glowing Node */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.7)] group-hover:scale-125 transition-transform" />

              {/* Experience Card */}
              <div className="rounded-2xl p-6 md:p-7 bg-slate-900/60 border border-white/10 hover:border-cyan-500/30 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                
                {/* Meta info row: Period, Company, Type */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                      <Building className="w-3 h-3 text-cyan-400" />
                      <span>{item.company}</span>
                    </span>
                    <span className="px-2 py-1 rounded-md bg-white/5 text-slate-300">
                      {item.type[lang]}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-mono text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-full">
                    <Calendar className="w-3 h-3 text-purple-400" />
                    <span>{item.period[lang]}</span>
                  </div>
                </div>

                {/* Role Title */}
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {item.role[lang]}
                </h3>

                {/* Role Description */}
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {item.description[lang]}
                </p>

                {/* Highlights List */}
                <div className="space-y-2 pt-3 border-t border-white/5">
                  {item.highlights[lang].map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
