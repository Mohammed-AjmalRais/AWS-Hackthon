"use client";

import React from "react";
import { Sparkles, Cpu, Award } from "lucide-react";
import { DEMO_PERSONAS, DemoPersona } from "@/data/demoPersonas";

interface HeaderProps {
  onSelectPersona: (persona: DemoPersona) => void;
  onOpenArchitecture: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectPersona,
  onOpenArchitecture,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
      {/* Top Hackathon Banner */}
      <div className="bg-slate-950 px-4 py-1.5 text-xs text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-flex items-center gap-1 rounded bg-orange-600 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider">
              <Award className="size-3 text-white" /> WeMakeDevs × AWS
            </span>
            <span className="text-slate-300">Bharat Builds Tour • First Commit Hackathon 2026</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={onOpenArchitecture}
              className="flex items-center gap-1.5 font-mono text-amber-300 hover:text-white underline-offset-4 hover:underline transition-colors cursor-pointer"
            >
              <Cpu className="size-3.5" />
              <span>Inspect AWS Stack (Bedrock + Cedar + SAM)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo & Identity */}
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-orange-600 text-white font-black text-lg shadow-sm">
            JS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                JanSetu <span className="text-orange-600">AI</span>
              </h1>
              <span className="rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 uppercase">
                Citizen Service Engine
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Unified Civic Eligibility, Document Pre-Flight Audit & Last-Mile Navigator
            </p>
          </div>
        </div>

        {/* Quick Demo Test Personas */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-1 text-xs">
            <span className="flex items-center gap-1 px-2 font-medium text-slate-500 text-[11px]">
              <Sparkles className="size-3 text-amber-500" />
              Quick Personas:
            </span>
            {DEMO_PERSONAS.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelectPersona(p)}
                className="rounded-lg px-3 py-1 font-semibold text-slate-700 hover:bg-white hover:text-orange-700 hover:shadow-xs transition-all text-xs cursor-pointer"
                title={p.story}
              >
                {p.name.split(" ")[0]} ({p.profile.category})
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
