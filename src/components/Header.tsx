"use client";

import React from "react";
import { Sparkles, Globe, Cpu, Award } from "lucide-react";
import { DEMO_PERSONAS, DemoPersona } from "@/data/demoPersonas";

interface HeaderProps {
  currentLanguage: "en" | "hi";
  onLanguageChange: (lang: "en" | "hi") => void;
  onSelectPersona: (persona: DemoPersona) => void;
  onOpenArchitecture: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  onSelectPersona,
  onOpenArchitecture,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-orange-200/80 bg-white/95 backdrop-blur-md shadow-xs">
      {/* Top Hackathon Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-indigo-700 px-4 py-1.5 text-xs text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-flex items-center gap-1 rounded bg-white/20 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider backdrop-blur-xs">
              <Award className="size-3 text-amber-200" /> WeMakeDevs × AWS
            </span>
            <span className="hidden sm:inline">Bharat Builds Tour • First Commit Hackathon 2026</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={onOpenArchitecture}
              className="flex items-center gap-1.5 font-mono text-amber-100 hover:text-white underline-offset-4 hover:underline transition-colors"
            >
              <Cpu className="size-3.5" />
              <span>AWS Stack (Bedrock + Cedar + SAM)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo & Identity */}
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 via-amber-500 to-indigo-600 text-white shadow-md shadow-orange-500/20">
            <span className="font-serif text-xl font-bold">से</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                JanSetu <span className="text-orange-600 font-extrabold">AI</span>
              </h1>
              <span className="rounded-md border border-orange-200 bg-orange-50 px-1.5 py-0.5 text-[10px] font-semibold text-orange-700">
                {currentLanguage === "hi" ? "जनसेतु" : "Bharat Edition"}
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              {currentLanguage === "hi"
                ? "छात्रवृत्ति, प्रमाण पत्र और सरकारी योजनाओं का एकीकृत साथी"
                : "Unified Citizen & Student Scholarship Copilot"}
            </p>
          </div>
        </div>

        {/* Quick Demo Personas & Language Switcher */}
        <div className="flex items-center gap-3">
          {/* Quick Demo Pill Selector */}
          <div className="hidden lg:flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50/80 p-1 text-xs">
            <span className="flex items-center gap-1 px-2 font-medium text-slate-500 text-[11px]">
              <Sparkles className="size-3 text-amber-500" />
              {currentLanguage === "hi" ? "त्वरित परीक्षण:" : "Quick Demo:"}
            </span>
            {DEMO_PERSONAS.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelectPersona(p)}
                className="rounded-md px-2.5 py-1 font-medium text-slate-700 hover:bg-white hover:text-orange-700 hover:shadow-xs transition-all text-xs"
                title={p.story}
              >
                {p.name.split(" ")[0]} ({p.profile.category})
              </button>
            ))}
          </div>

          {/* Language Toggle */}
          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-xs font-medium">
            <button
              onClick={() => onLanguageChange("en")}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 transition-all ${
                currentLanguage === "en"
                  ? "bg-white text-slate-900 shadow-xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Globe className="size-3 text-slate-400" />
              English
            </button>
            <button
              onClick={() => onLanguageChange("hi")}
              className={`rounded-md px-2.5 py-1 transition-all ${
                currentLanguage === "hi"
                  ? "bg-orange-600 text-white shadow-xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
