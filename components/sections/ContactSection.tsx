'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { Phone, MapPin, Copy, Check, ArrowUpRight, MessageSquare, Terminal, Sparkles } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';

export const ContactSection: React.FC = () => {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);

  const isUz = lang === 'uz';

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden">
      {/* Dynamic ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 via-indigo-500/10 to-purple-500/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Glassmorphic Contact Card */}
        <div className="relative rounded-3xl p-8 sm:p-12 md:p-16 bg-slate-900/70 border border-white/15 backdrop-blur-2xl overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.7)]">
          {/* Cyber grid and neon corner accents */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 blur-3xl pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/10 blur-3xl pointer-events-none rounded-full" />
          <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-purple-400" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-indigo-400" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Heading & Description */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-4">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{isUz ? 'To‘g‘ridan-to‘g‘ri Aloqa' : 'Direct Connection'}</span>
              </div>

              {/* Required Heading: G‘oyangizni ishlaydigan mahsulotga aylantiramiz */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                {isUz
                  ? 'G‘oyangizni ishlaydigan mahsulotga aylantiramiz.'
                  : 'Turning your vision into working software.'}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mb-8">
                {isUz
                  ? 'Yangi veb platforma, AI agentlar, avtomatlashtirish tizimi yoki backend arxitekturasi bo‘yicha to‘g‘ridan-to‘g‘ri bog‘lanishingiz mumkin. Har qanday murakkablikdagi talablarni tahlil qilib, ishonchli yechim taklif qilaman.'
                  : 'Ready to build high-performance web applications, intelligent AI pipelines, or reliable backend architectures? Connect directly to discuss scope and technical implementation.'}
              </p>

              {/* Location Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-white/10 text-xs font-mono text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>{PERSONAL_INFO.location[lang]}</span>
              </div>
            </div>

            {/* Right Column: Direct Verified Contact Channels */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              
              {/* Channel 1: Direct Phone Call */}
              <div className="rounded-2xl p-5 bg-slate-950/80 border border-white/10 hover:border-emerald-500/40 transition-all shadow-inner group">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <Phone className="w-4 h-4" />
                    <span>{isUz ? 'Telefon orqali qo‘ng‘iroq' : 'Direct Telephone'}</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>

                <div className="text-xl sm:text-2xl font-mono font-bold text-white mb-3 tracking-wide">
                  {PERSONAL_INFO.phone}
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={PERSONAL_INFO.phoneTel}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-[0_0_15px_rgba(52,211,153,0.3)]"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{isUz ? 'Qo‘ng‘iroq qilish' : 'Call Now'}</span>
                  </a>

                  <button
                    onClick={handleCopyPhone}
                    type="button"
                    aria-label="Raqamdan nusxa olish"
                    className="p-2.5 rounded-xl text-xs font-mono bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10 transition-colors flex items-center gap-1.5"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 hidden sm:inline">{isUz ? 'Nusxalandi' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="hidden sm:inline">{isUz ? 'Nusxa' : 'Copy'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Channel 2: GitHub Profile */}
              <div className="rounded-2xl p-5 bg-slate-950/80 border border-white/10 hover:border-cyan-500/40 transition-all shadow-inner group">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                    <GithubIcon className="w-4 h-4" />
                    <span>{isUz ? 'Dasturchi Repozitoriyasi' : 'Developer Repository'}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Open Source</span>
                </div>

                <div className="text-sm sm:text-base font-mono font-bold text-white mb-3 truncate">
                  github.com/{PERSONAL_INFO.githubUsername}
                </div>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-white/10 hover:border-cyan-400/50 transition-colors"
                >
                  <span>{isUz ? 'GitHub profilni ochish' : 'Visit GitHub Profile'}</span>
                  <ArrowUpRight className="w-4 h-4 text-cyan-400" />
                </a>
              </div>

              {/* Informational Note regarding direct channels */}
              <div className="p-3 rounded-xl bg-slate-950/50 border border-white/5 flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <Terminal className="w-4 h-4 text-purple-400 shrink-0" />
                <span>
                  {isUz
                    ? 'Tezkor javob uchun telefon orqali to‘g‘ridan-to‘g‘ri bog‘lanishingiz mumkin.'
                    : 'Reach out directly by phone for urgent project discussions.'}
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
