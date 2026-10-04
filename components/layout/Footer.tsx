'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PERSONAL_INFO, NAV_ITEMS } from '@/data/portfolioData';
import { ArrowUp, Phone, MapPin } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';

export const Footer: React.FC = () => {
  const { lang } = useLanguage();
  const isUz = lang === 'uz';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-slate-950/90 text-slate-400 text-xs py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b border-white/10">
          
          {/* Logo & Description */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 p-[1.5px]">
                <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center font-mono font-black text-cyan-400 text-xs">
                  SM.
                </div>
              </div>
              <span className="font-bold text-white text-sm">{PERSONAL_INFO.name}</span>
            </div>
            <p className="text-slate-400 text-xs max-w-sm mb-3">
              {PERSONAL_INFO.role[lang]}
            </p>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{PERSONAL_INFO.location[lang]}</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-4 flex flex-wrap gap-x-4 gap-y-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-xs text-slate-400 hover:text-white transition-colors"
              >
                {item.label[lang]}
              </a>
            ))}
          </div>

          {/* Contacts & Back to Top */}
          <div className="md:col-span-3 flex md:flex-col items-end justify-between md:justify-center gap-3">
            <div className="flex items-center gap-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2 rounded-lg bg-slate-900 border border-white/10 hover:border-cyan-400/50 text-slate-300 hover:text-white transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.phoneTel}
                aria-label="Call phone"
                className="p-2 rounded-lg bg-slate-900 border border-white/10 hover:border-emerald-400/50 text-slate-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors font-mono text-[11px]"
            >
              <span>{isUz ? 'Yuqoriga' : 'Back to Top'}</span>
              <ArrowUp className="w-3 h-3 text-cyan-400" />
            </button>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-400">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. {isUz ? 'Barcha huquqlar himoyalangan.' : 'All rights reserved.'}
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Next.js App Router • Three.js 3D • Tailwind CSS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
