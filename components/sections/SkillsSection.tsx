'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { SKILL_CATEGORIES } from '@/data/portfolioData';
import { Cpu, Layers, Server, Database, Cloud, Sparkles, CheckCircle } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Layers: <Layers className="w-5 h-5 text-cyan-400" />,
  Server: <Server className="w-5 h-5 text-indigo-400" />,
  Cpu: <Cpu className="w-5 h-5 text-purple-400" />,
  Database: <Database className="w-5 h-5 text-sky-400" />,
  Cloud: <Cloud className="w-5 h-5 text-emerald-400" />,
};

export const SkillsSection: React.FC = () => {
  const { lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCategories =
    selectedCategory === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.id === selectedCategory);

  return (
    <section id="skills" className="py-20 md:py-28 relative">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'uz' ? 'Texnik Ko‘nikmalar' : 'Technical Stack'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              {lang === 'uz' ? 'Zamonaviy Texnologiyalar Zaxirasi' : 'Production-Ready Stack & Tools'}
            </h2>
            <p className="text-slate-400 text-sm md:text-base mt-2 max-w-xl">
              {lang === 'uz'
                ? 'Biznes yechimlarni arxitektura qilish, optimallashtirish va amaliyotga tatbiq etishda qo‘llaniladigan texnologiyalar.'
                : 'Carefully curated technical stack for scalable architectures, resilient APIs, and intelligent applications.'}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md self-start md:self-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {lang === 'uz' ? 'Barchasi' : 'All'}
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {cat.title[lang].split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Grouped Skills Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col justify-between rounded-2xl p-6 bg-slate-900/50 border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] group relative overflow-hidden"
            >
              {/* Subtle top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 opacity-70 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: category.accent }}
              />

              <div>
                {/* Header: Icon & Category title */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-950/80 border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                    {iconMap[category.icon] || <Cpu className="w-5 h-5 text-cyan-400" />}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {category.title[lang]}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">
                      {category.skills.length} {lang === 'uz' ? 'ta vosita' : 'technologies'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                  {category.description[lang]}
                </p>

                {/* Tech Pills (strictly no fake percentages) */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                        skill.highlight
                          ? 'bg-slate-950/90 text-slate-100 border border-white/15 hover:border-cyan-400/60 shadow-[0_2px_10px_rgba(0,0,0,0.2)]'
                          : 'bg-white/5 text-slate-300 border border-white/5 hover:bg-white/10 hover:border-white/15'
                      }`}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: category.accent }}
                      />
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom verified badge */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{lang === 'uz' ? 'Amaliy tajriba' : 'Hands-on Tested'}</span>
                </span>
                <span className="text-slate-400">Production</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
