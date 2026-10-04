'use client';

import React, { useState } from 'react';
import { Project } from '@/types/portfolio';
import {
  Bot,
  Play,
  Pause,
  RotateCw,
  CheckCircle2,
  TrendingUp,
  CreditCard,
  Users,
  Search,
  BookOpen,
  Sparkles,
  Terminal,
} from 'lucide-react';

export const ProjectConceptPreview: React.FC<{ project: Project; isUz: boolean }> = ({
  project,
  isUz,
}) => {
  const [flipped, setFlipped] = useState(false);
  const [timerRunning, setTimerRunning] = useState(true);

  return (
    <div className="relative w-full rounded-2xl border border-white/10 bg-slate-950/80 p-4 sm:p-5 overflow-hidden shadow-2xl">
      {/* Top Bar with Concept Badge */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-[11px] text-slate-400 truncate max-w-[200px]">
            preview://{project.id}.internal
          </span>
        </div>

        {/* Mandatory Label: Interfeys konsepti */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-widest shadow-[0_0_10px_rgba(0,240,255,0.2)]">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>{isUz ? 'Interfeys konsepti' : 'Interface Concept'}</span>
        </div>
      </div>

      {/* Dynamic Simulated UI according to conceptType */}
      {project.conceptType === 'chat-ai' && (
        <div className="space-y-3 font-mono text-xs">
          {/* System status */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/90 border border-white/5 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-400 font-semibold">FastAPI + LangChain Agent</span>
            </div>
            <span className="text-slate-400">pgvector: connected</span>
          </div>

          {/* User message */}
          <div className="flex items-start gap-2.5 justify-end">
            <div className="p-3 rounded-2xl rounded-tr-sm bg-gradient-to-r from-cyan-600 to-indigo-600 text-white max-w-[85%] text-xs shadow-md">
              {project.id === 'speke-uz'
                ? isUz
                  ? 'Ingliz tilida biznes uchrashuvi uchun suhbat tayyorla va xatolarimni tekshir.'
                  : 'Prepare a mock business dialogue and correct any grammar mistakes.'
                : isUz
                ? 'Kompaniya oylik hisobotini PDF dan o‘qib, asosiy ko‘rsatkichlarni tahlil qil.'
                : 'Ingest monthly performance PDF and synthesize executive metrics.'}
            </div>
          </div>

          {/* AI Response Stream */}
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-purple-400" />
            </div>
            <div className="p-3.5 rounded-2xl rounded-tl-sm bg-slate-900 border border-white/10 text-slate-200 max-w-[90%] space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                <Terminal className="w-3 h-3" />
                <span>Tool Invocation: Semantic Retrieval</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-300">
                {project.id === 'speke-uz'
                  ? isUz
                    ? 'Ajoyib! Keling, xalqaro hamkorlar bilan muzokara simulyatsiyasini boshlaymiz. Birinchi savol: "Could you walk us through the Q3 delivery timeline?"'
                    : 'Certainly! Let us begin the negotiation simulation. First prompt: "Could you walk us through the Q3 delivery timeline?"'
                  : isUz
                  ? 'PDF tahlil qilindi (1,420 token). Asosiy ko‘rsatkichlar: Oylik o‘sish +24.8%, konversiya 3.4%. Barcha ma’lumotlar bazada yangilandi.'
                  : 'Vector document processed (1,420 tokens). Key metrics: +24.8% growth MoM, 3.4% conversion rate. Records indexed.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {project.conceptType === 'portal' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/5 text-xs text-slate-400">
            <span className="font-bold text-white font-mono">21-ASR Media Feed</span>
            <span className="text-[10px] font-mono text-cyan-400">Next.js SSR • 100 CWV</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-white/10">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                Raqamli Media
              </span>
              <h4 className="text-xs font-bold text-white mt-2 mb-1">
                Zamonaviy Kontent va Ijtimoiy Tarmoqlar Dinamikasi
              </h4>
              <p className="text-[11px] text-slate-400">Optimallashtirilgan tezkor o‘qish interfeysi.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-white/10">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                Texnologiya
              </span>
              <h4 className="text-xs font-bold text-white mt-2 mb-1">
                Raqamli Transformatsiya va Onlayn Platformalar
              </h4>
              <p className="text-[11px] text-slate-400">Avtomatik OpenGraph & Media integratsiya.</p>
            </div>
          </div>
        </div>
      )}

      {project.conceptType === 'cards-study' && (
        <div className="flex flex-col items-center justify-center py-2">
          {/* 3D Flip Card */}
          <div
            onClick={() => setFlipped(!flipped)}
            className="w-full max-w-sm h-40 rounded-2xl bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 border border-cyan-500/30 p-5 flex flex-col items-center justify-center text-center cursor-pointer shadow-[0_0_25px_rgba(0,240,255,0.15)] transition-all transform hover:scale-[1.02]"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 mb-2">
              {flipped ? (isUz ? 'Javob / Orqa tomon' : 'Answer') : isUz ? 'Savol / Old tomon' : 'Question'}
            </span>
            <p className="text-sm font-bold text-white mb-2">
              {flipped
                ? 'ACID (Atomicity, Consistency, Isolation, Durability) kafolatlari'
                : 'PostgreSQL relieshinal bazasida tranzaksiyalarning 4 ta asosiy xususiyati nima?'}
            </p>
            <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <RotateCw className="w-3 h-3 text-cyan-400" />
              <span>{isUz ? 'Aylantirish uchun bosing' : 'Click to flip card'}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 mt-4 text-[11px] font-mono text-slate-400">
            <span className="px-2 py-1 rounded bg-slate-900 border border-white/10">Takrorlash: 4-kun</span>
            <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">O‘zlashtirish: 94%</span>
          </div>
        </div>
      )}

      {project.conceptType === 'marketplace' && (
        <div className="space-y-3">
          {/* Top Metrics Row */}
          <div className="grid grid-cols-3 gap-2 text-center font-mono">
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-white/5">
              <span className="text-[10px] text-slate-400 block">{isUz ? 'Buyurtmalar' : 'Orders'}</span>
              <span className="text-sm font-bold text-white">1,482</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-white/5">
              <span className="text-[10px] text-slate-400 block">Payme / Stripe</span>
              <span className="text-sm font-bold text-emerald-400">Active</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-white/5">
              <span className="text-[10px] text-slate-400 block">{isUz ? 'Konversiya' : 'Conversion'}</span>
              <span className="text-sm font-bold text-cyan-400">4.8%</span>
            </div>
          </div>

          {/* Orders stream sample */}
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-white/5 space-y-1.5 text-xs font-mono">
            <div className="flex items-center justify-between text-[11px] text-slate-300">
              <span className="flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
                <span>#ORD-9021 (Payme)</span>
              </span>
              <span className="text-emerald-400 font-bold">+450,000 UZS</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-300">
              <span className="flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-purple-400" />
                <span>#ORD-9022 (Stripe)</span>
              </span>
              <span className="text-emerald-400 font-bold">+$120.00 USD</span>
            </div>
          </div>
        </div>
      )}

      {project.conceptType === 'dashboard' && (
        <div className="space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/90 border border-white/5">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-white">Workspace: Enterprise Dev</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px]">
              RBAC: Admin
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 rounded-lg bg-slate-900/70 border border-white/5">
              <span className="text-slate-400 block">NestJS Microservices</span>
              <span className="text-emerald-400 font-bold">99.98% Uptime</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/70 border border-white/5">
              <span className="text-slate-400 block">Prisma Connection Pool</span>
              <span className="text-cyan-400 font-bold">12 Active Conns</span>
            </div>
          </div>
        </div>
      )}

      {project.conceptType === 'time-tracker' && (
        <div className="space-y-3 font-mono text-xs">
          {/* Active Timer Box */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">
                {isUz ? 'Faol Vazifa' : 'Active Task'}
              </span>
              <span className="text-sm font-bold text-white">API Gateway Refactor & Auth</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-base font-black text-cyan-400">03:42:18</span>
              <button
                type="button"
                onClick={() => setTimerRunning(!timerRunning)}
                className={`p-2 rounded-lg border transition-colors ${
                  timerRunning
                    ? 'bg-red-500/20 text-red-300 border-red-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}
              >
                {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
            <span>Rollar: Manager / Engineer</span>
            <span className="text-emerald-400">Haftalik jami: 38.5 soat</span>
          </div>
        </div>
      )}
    </div>
  );
};
