'use client';

import React, { useEffect } from 'react';
import { Project } from '@/types/portfolio';
import { useLanguage } from '@/context/LanguageContext';
import { ProjectConceptPreview } from './ProjectConceptPreview';
import { X, Cpu, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { lang } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const isUz = lang === 'uz';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-xl animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-3xl bg-slate-900 border border-white/15 p-6 sm:p-8 my-8 text-left shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 blur-[100px] pointer-events-none rounded-full" />

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label={isUz ? 'Yopish' : 'Close modal'}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 pr-8">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
              {project.category}
            </span>
            <span className="text-slate-400 text-xs font-mono">
              {project.stack.length} {isUz ? 'ta asosiy texnologiya' : 'core technologies'}
            </span>
          </div>

          <h3 id="modal-title" className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {project.title}
          </h3>
        </div>

        {/* Concept Preview */}
        <div className="mb-6">
          <ProjectConceptPreview project={project} isUz={isUz} />
        </div>

        {/* Full Description */}
        <div className="mb-6">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
            {isUz ? 'Loyiha Haqida' : 'Project Overview'}
          </h4>
          <p className="text-slate-300 text-sm leading-relaxed">
            {project.fullDesc[lang]}
          </p>
        </div>

        {/* Architecture & Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {/* Architecture */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <Layers className="w-4 h-4" />
              <span>{isUz ? 'Tizim Arxitekturasi' : 'System Architecture'}</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {project.architecture[lang].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span className="leading-normal">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Features */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10">
            <div className="flex items-center gap-2 text-purple-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <Cpu className="w-4 h-4" />
              <span>{isUz ? 'Asosiy Funksionallik' : 'Key Capabilities'}</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {project.features[lang].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                  <span className="leading-normal">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="mb-6">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
            {isUz ? 'Ishlatilgan Texnologiyalar' : 'Applied Tech Stack'}
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer actions: Note that demo/repo URLs are hidden because they aren't provided */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-400 font-mono text-[11px]">
            {isUz
              ? 'Loyiha arxitekturasi va tafsilotlari bo‘yicha to‘liq konsultatsiya mavjud.'
              : 'Architectural specifications verified.'}
          </span>
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md hover:brightness-110 transition-all"
            >
              <span>{isUz ? 'Bog‘lanish' : 'Inquire'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl font-medium bg-white/10 hover:bg-white/15 text-slate-200 transition-colors"
            >
              {isUz ? 'Yopish' : 'Close'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
