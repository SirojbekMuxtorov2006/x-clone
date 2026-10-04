'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { SERVICES } from '@/data/portfolioData';
import {
  Globe,
  Server,
  Bot,
  Send,
  CreditCard,
  ShieldCheck,
  Wrench,
  ArrowRight,
} from 'lucide-react';

const serviceIconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-6 h-6 text-cyan-400" />,
  Server: <Server className="w-6 h-6 text-indigo-400" />,
  Bot: <Bot className="w-6 h-6 text-purple-400" />,
  Send: <Send className="w-6 h-6 text-sky-400" />,
  CreditCard: <CreditCard className="w-6 h-6 text-emerald-400" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-teal-400" />,
};

export const ServicesSection: React.FC = () => {
  const { lang } = useLanguage();
  const isUz = lang === 'uz';

  return (
    <section id="services" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-3">
            <Wrench className="w-3.5 h-3.5" />
            <span>{isUz ? 'Xizmatlar & Imkoniyatlar' : 'Services & Solutions'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            {isUz ? 'Muhandislik va Ishlanma Xizmatlari' : 'Full-Lifecycle Engineering Services'}
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-2 max-w-xl">
            {isUz
              ? 'G‘oyadan boshlab to‘liq ishlaydigan dasturiy mahsulotgacha bo‘lgan barcha bosqichlarda professional yordam.'
              : 'End-to-end technical execution tailored for modern web apps, intelligent AI pipelines, and rock-solid systems.'}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="flex flex-col justify-between rounded-2xl p-6 bg-slate-900/50 border border-white/10 hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_12px_35px_rgba(0,240,255,0.06)] group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/5 group-hover:bg-cyan-500/10 blur-xl rounded-full transition-all pointer-events-none" />

              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-950/80 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-inner">
                  {serviceIconMap[service.icon]}
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {service.title[lang]}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {service.description[lang]}
                </p>
              </div>

              <div>
                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                  {service.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 text-slate-400"
                    >
                      {tag}
                    </span>
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
