'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PROJECTS } from '@/data/portfolioData';
import { Project } from '@/types/portfolio';
import { ProjectModal } from '@/components/ui/ProjectModal';
import { FolderGit2, ArrowUpRight, Layers, Sparkles } from 'lucide-react';

const CATEGORIES = ['Barchasi', 'Full-Stack', 'AI', 'Education', 'E-Commerce'] as const;

export const ProjectsSection: React.FC = () => {
  const { lang } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<string>('Barchasi');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const isUz = lang === 'uz';

  const filteredProjects =
    selectedFilter === 'Barchasi' || selectedFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedFilter);

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>{isUz ? 'Tanlangan Loyihalar' : 'Featured Projects'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              {isUz ? 'Amaliy Mahsulotlar & Tizimlar' : 'Production Systems & Case Studies'}
            </h2>
            <p className="text-slate-400 text-sm md:text-base mt-2 max-w-xl">
              {isUz
                ? 'AI agentlar, yuqori yuklamali veb platformalar, e-commerce va ta’lim texnologiyalariga oid loyihalar.'
                : 'Selected applications spanning intelligent AI agents, modern web platforms, e-commerce, and edtech.'}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md self-start md:self-auto">
            {CATEGORIES.map((cat) => {
              const label =
                cat === 'Barchasi' ? (isUz ? 'Barchasi' : 'All') : cat;
              const isCurrent =
                selectedFilter === cat ||
                (cat === 'Barchasi' && selectedFilter === 'All');

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                    isCurrent
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col justify-between rounded-2xl p-6 bg-slate-900/60 border border-white/10 hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_12px_35px_rgba(0,240,255,0.08)] group relative overflow-hidden"
            >
              {/* Top ambient hover glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 group-hover:bg-cyan-500/15 blur-2xl rounded-full transition-all duration-300 pointer-events-none" />

              <div>
                {/* Category Pill and Concept Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-white/5 border border-white/10 text-cyan-300">
                    {project.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    <span>{isUz ? 'Konsept' : 'Concept'}</span>
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed line-clamp-3">
                  {project.shortDesc[lang]}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.slice(0, 5).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-white/5 border border-white/5 text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 5 && (
                    <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono text-slate-400">
                      +{project.tags.length - 5}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer: Details CTA Button */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <Layers className="w-3 h-3 text-slate-400" />
                  <span>{project.stack.length} stack items</span>
                </span>

                <button
                  type="button"
                  onClick={() => setActiveProject(project)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-slate-800/80 hover:bg-slate-700 border border-white/10 hover:border-cyan-400/50 transition-all group-hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <span>{isUz ? 'Tafsilotlar' : 'View Details'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal when a project is selected */}
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />

      </div>
    </section>
  );
};
