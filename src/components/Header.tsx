"use client";

import React, { useState } from "react";
import { Sparkles, Cpu, Award, User, ChevronDown, PlusCircle, ShieldCheck, Check } from "lucide-react";
import { DEMO_PERSONAS, DemoPersona } from "@/data/demoPersonas";

interface HeaderProps {
  activeProfileName?: string;
  onSelectPersona: (persona: DemoPersona) => void;
  onResetToBlank?: () => void;
  onOpenArchitecture: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeProfileName,
  onSelectPersona,
  onResetToBlank,
  onOpenArchitecture,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
      {/* Top Hackathon Banner */}
      <div className="bg-slate-950 px-4 py-1.5 text-xs text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-flex items-center gap-1 rounded bg-orange-600 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider">
              <Award className="size-3 text-white" /> WeMakeDevs × AWS
            </span>
            <span className="text-slate-300 hidden sm:inline">Bharat Builds Tour • First Commit Hackathon 2026</span>
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
                National Citizen Engine
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden md:block">
              Unified Civic Eligibility, Document Pre-Flight Audit & Last-Mile Navigator
            </p>
          </div>
        </div>

        {/* Citizen Profile Switcher & Actions */}
        <div className="flex items-center gap-3">
          {/* Client Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-all cursor-pointer shadow-xs"
            >
              <div className="flex size-5 items-center justify-center rounded-md bg-orange-600 text-[10px] font-bold text-white">
                {activeProfileName ? activeProfileName.charAt(0) : "U"}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-[11px] font-bold text-slate-900 leading-tight">
                  {activeProfileName || "Select Client Profile"}
                </p>
                <p className="text-[9px] text-slate-500 leading-tight">Active Citizen Master</p>
              </div>
              <ChevronDown className="size-3.5 text-slate-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl z-50 space-y-1">
                <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Switch Citizen Persona (9 Verified Profiles):
                </div>

                <div className="max-h-60 overflow-y-auto space-y-0.5">
                  {DEMO_PERSONAS.map((p) => {
                    const isSelected = activeProfileName === p.profile.name;
                    return (
                      <button
                        key={p.id}
                        onClick={() => {
                          onSelectPersona(p);
                          setDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between rounded-xl px-2.5 py-2 text-left text-xs font-medium transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-orange-50 text-orange-950 font-bold"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <div className="truncate pr-2">
                          <p className="font-bold text-slate-900 truncate">{p.name}</p>
                          <p className="text-[10px] text-slate-500">{p.state} • {p.categoryTag}</p>
                        </div>
                        {isSelected && <Check className="size-3.5 text-orange-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {onResetToBlank && (
                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => {
                        onResetToBlank();
                        setDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 rounded-xl px-2.5 py-2 text-left text-xs font-bold text-orange-700 hover:bg-orange-50 transition-colors cursor-pointer"
                    >
                      <PlusCircle className="size-4" />
                      <span>+ Register New Blank Citizen</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
