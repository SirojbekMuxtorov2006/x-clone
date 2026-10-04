'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { NAV_ITEMS, PERSONAL_INFO } from '@/data/portfolioData';
import { Menu, X, ArrowUpRight, Globe, Phone } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { lang, toggleLang } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/85 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#"
          className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-purple-600 p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-[0_0_20px_rgba(0,240,255,0.25)]">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-sm tracking-wider">
                SM.
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold tracking-tight text-sm group-hover:text-cyan-400 transition-colors">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">
              Full-Stack & AI
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 px-4 py-1.5 rounded-full bg-slate-900/60 border border-white/10 backdrop-blur-md">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
            >
              {item.label[lang]}
            </a>
          ))}
        </nav>

        {/* Action Controls: Language Toggle & Contact CTA */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={toggleLang}
            aria-label="Tilni o‘zgartirish / Switch language"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium text-slate-300 hover:text-white bg-slate-900/80 border border-white/10 hover:border-cyan-500/40 backdrop-blur-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className={lang === 'uz' ? 'text-cyan-400 font-bold' : 'text-slate-400'}>UZ</span>
            <span className="text-slate-600">/</span>
            <span className={lang === 'en' ? 'text-purple-400 font-bold' : 'text-slate-400'}>EN</span>
          </button>

          {/* Quick Call Direct */}
          <a
            href={PERSONAL_INFO.phoneTel}
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-slate-300 hover:text-white bg-slate-900/80 border border-white/10 hover:border-white/20 transition-all"
            title="Qo‘ng‘iroq qilish"
          >
            <Phone className="w-3 h-3 text-emerald-400" />
            <span>+998 90 192 0755</span>
          </a>

          {/* Contact Button */}
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <span>{lang === 'uz' ? 'Bog‘lanish' : 'Get in Touch'}</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Menu & Language Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleLang}
            aria-label="Switch language"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-300 bg-slate-900 border border-white/10"
          >
            <Globe className="w-3 h-3 text-cyan-400" />
            <span className="font-bold text-cyan-400">{lang.toUpperCase()}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900/80 border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-slate-950/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 shadow-2xl transition-all">
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-cyan-400 hover:bg-white/5 transition-colors"
              >
                {item.label[lang]}
              </a>
            ))}

            <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
              <a
                href={PERSONAL_INFO.phoneTel}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-mono text-slate-300 bg-slate-900 border border-white/10"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+998 90 192 0755</span>
              </a>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-[0_0_20px_rgba(0,240,255,0.3)]"
              >
                <span>{lang === 'uz' ? 'Bog‘lanish' : 'Get in Touch'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
