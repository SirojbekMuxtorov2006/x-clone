'use client';

import React from 'react';
import { Layers, Server, Database, Cpu } from 'lucide-react';

export const SceneFallback: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[380px] md:min-h-[500px] flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-xl">
      {/* Background radial glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),transparent_70%)] pointer-events-none" />
      <div className="absolute w-72 h-72 rounded-full bg-purple-500/10 blur-3xl -top-10 -right-10 pointer-events-none animate-pulse" />
      <div className="absolute w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl -bottom-10 -left-10 pointer-events-none animate-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Futuristic Grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:28px_28px] opacity-40 pointer-events-none" />

      {/* Orbital Circles */}
      <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
        {/* Outer Orbit (AI) */}
        <div className="absolute inset-0 rounded-full border border-purple-500/30 border-dashed animate-[spin_24s_linear_infinite]" />
        {/* Node: AI */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-purple-500/40 text-purple-300 text-xs font-mono shadow-[0_0_15px_rgba(168,85,247,0.3)]">
          <Cpu className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span>AI Core</span>
        </div>

        {/* Mid Orbit 2 (Database) */}
        <div className="absolute w-[80%] h-[80%] rounded-full border border-sky-500/30 animate-[spin_18s_linear_infinite_reverse]" />
        {/* Node: Database */}
        <div className="absolute bottom-6 right-6 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-sky-500/40 text-sky-300 text-xs font-mono shadow-[0_0_15px_rgba(56,189,248,0.3)]">
          <Database className="w-3.5 h-3.5 text-sky-400" />
          <span>Database</span>
        </div>

        {/* Mid Orbit 1 (Backend) */}
        <div className="absolute w-[60%] h-[60%] rounded-full border border-indigo-500/30 border-dashed animate-[spin_14s_linear_infinite]" />
        {/* Node: Backend */}
        <div className="absolute bottom-8 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-indigo-500/40 text-indigo-300 text-xs font-mono shadow-[0_0_15px_rgba(99,102,241,0.3)]">
          <Server className="w-3.5 h-3.5 text-indigo-400" />
          <span>Backend</span>
        </div>

        {/* Inner Orbit (Frontend) */}
        <div className="absolute w-[42%] h-[42%] rounded-full border border-cyan-400/40 animate-[spin_10s_linear_infinite_reverse]" />
        {/* Node: Frontend */}
        <div className="absolute top-8 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-cyan-400/50 text-cyan-300 text-xs font-mono shadow-[0_0_15px_rgba(34,211,238,0.3)]">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Frontend</span>
        </div>

        {/* Central Core */}
        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-tr from-cyan-600/40 via-purple-600/40 to-blue-500/40 border border-cyan-300/40 backdrop-blur-md flex flex-col items-center justify-center shadow-[0_0_40px_rgba(0,240,255,0.4)] animate-pulse">
          <div className="text-xl md:text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-purple-200 font-mono">
            SM
          </div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-cyan-300/80 mt-0.5">Core v2.4</span>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-400/80 px-3 py-2 rounded-lg bg-slate-900/60 border border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-emerald-300 font-medium">Architecture Synced</span>
        </div>
        <div className="text-slate-400">4 Layers Active</div>
      </div>
    </div>
  );
};
