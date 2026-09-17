"use client";

import React, { useState, useMemo } from "react";
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  Building2,
  CreditCard,
  Clock,
  Sparkles,
  Layers,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  Hospital,
  GraduationCap,
  CheckSquare,
  Square,
  Info,
  Coins,
  MapPin,
  Check,
  HelpCircle,
  Activity
} from "lucide-react";
import { SCHEMES_DATABASE, SchemeOrService } from "@/data/schemes";
import {
  SCHEME_ROADMAPS,
  getSchemeRoadmap,
  getMergedRoadmap,
  SchemeRoadmap
} from "@/data/schemeRoadmaps";

interface PrerequisiteRoadmapTabProps {
  initialSchemeId?: string;
  userHeldDocuments?: string[];
  userState?: string;
  onSelectScheme?: (schemeId: string) => void;
}

export const PrerequisiteRoadmapTab: React.FC<PrerequisiteRoadmapTabProps> = ({
  initialSchemeId = "Ayushman_PMJAY",
  userHeldDocuments = [],
  userState,
  onSelectScheme,
}) => {
  // Navigation & View Mode
  const [viewMode, setViewMode] = useState<"SINGLE" | "MERGED">("SINGLE");

  // Determine initial scheme
  const defaultScheme = useMemo(() => {
    if (userState === "Andhra Pradesh" && (!initialSchemeId || initialSchemeId.startsWith("TN_"))) {
      return "AP_Jagananna_Vidya_Deevena";
    }
    if (userState === "Tamil Nadu" && (!initialSchemeId || initialSchemeId.startsWith("AP_"))) {
      return "TN_Pudhumai_Penn";
    }
    return initialSchemeId || "Ayushman_PMJAY";
  }, [initialSchemeId, userState]);

  // Single Scheme State
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>(defaultScheme);
  const [categoryFilter, setCategoryFilter] = useState<"ALL" | "MY_STATE" | "CENTRAL" | "SCHOLARSHIP" | "HEALTHCARE" | "CERTIFICATE">("ALL");

  React.useEffect(() => {
    if (userState === "Andhra Pradesh" && initialSchemeId.startsWith("TN_")) {
      setSelectedSchemeId("AP_Jagananna_Vidya_Deevena");
    } else if (userState === "Tamil Nadu" && initialSchemeId.startsWith("AP_")) {
      setSelectedSchemeId("TN_Pudhumai_Penn");
    } else if (initialSchemeId) {
      setSelectedSchemeId(initialSchemeId);
    }
  }, [initialSchemeId, userState]);

  // Merged Multi-Scheme State (Initialized smartly according to state)
  const [mergedSelection, setMergedSelection] = useState<string[]>(() => {
    if (userState === "Andhra Pradesh") {
      return ["AP_Jagananna_Vidya_Deevena", "AP_YSR_Aarogyasri", "AP_Integrated_Community_Cert"];
    }
    if (userState === "Tamil Nadu") {
      return ["TN_Pudhumai_Penn", "TN_CMCHIS_Medical", "Income_Certificate"];
    }
    return ["PostMatric_ST", "Ayushman_PMJAY", "Income_Certificate"];
  });

  // Interactive Checklist State (for Single Scheme)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    const initialMap: Record<string, boolean> = {};
    userHeldDocuments.forEach((doc) => {
      initialMap[doc] = true;
    });
    return initialMap;
  });

  // Current Single Scheme Roadmap
  const currentRoadmap: SchemeRoadmap = useMemo(() => {
    return getSchemeRoadmap(selectedSchemeId);
  }, [selectedSchemeId]);

  // Merged Roadmap Calculation
  const mergedData = useMemo(() => {
    return getMergedRoadmap(mergedSelection);
  }, [mergedSelection]);

  // Filter schemes for the single selector with state prioritization
  const availableSchemes = useMemo(() => {
    return SCHEMES_DATABASE.filter((s) => {
      if (categoryFilter === "MY_STATE" && userState) {
        return s.level === "State" && s.applicableStates?.includes(userState);
      }
      if (categoryFilter === "CENTRAL") {
        return s.level === "Central";
      }
      if (categoryFilter === "SCHOLARSHIP") return s.type === "scholarship";
      if (categoryFilter === "HEALTHCARE") return s.type === "healthcare";
      if (categoryFilter === "CERTIFICATE") return s.type === "certificate";
      return true;
    }).sort((a, b) => {
      // Prioritize user's home state schemes to prevent cross-state confusion
      const aMatches = a.applicableStates?.includes(userState || "");
      const bMatches = b.applicableStates?.includes(userState || "");
      if (aMatches && !bMatches) return -1;
      if (!aMatches && bMatches) return 1;
      return 0;
    });
  }, [categoryFilter, userState]);

  const toggleCheckItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleMergedScheme = (id: string) => {
    setMergedSelection((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Calculate readiness for current single scheme
  const allSingleDocs = useMemo(() => {
    const list: string[] = [];
    currentRoadmap.tier1BaseIdentity.forEach((d) => list.push(d.name));
    currentRoadmap.tier2StatutoryCertificates.forEach((c) => list.push(c.certificateId));
    currentRoadmap.tier3Institutional.forEach((i) => list.push(i.name));
    return list;
  }, [currentRoadmap]);

  const readyCount = allSingleDocs.filter((id) => checkedItems[id]).length;
  const readinessPercent = allSingleDocs.length > 0 ? Math.round((readyCount / allSingleDocs.length) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Overview Banner & Mode Switcher */}
      <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 p-6 text-white shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-200 border border-indigo-500/30">
              <Sparkles className="size-3.5 text-amber-300" />
              <span>Dedicated Civic Dependency Engine</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight">
              Scheme-Specific Roadmaps & Multi-Scheme Dependency Merger
            </h3>
            <p className="text-xs text-indigo-200/90 leading-relaxed">
              Different government benefits demand completely different proofs and issuing authorities. A medical emergency requires doctor referrals and hospital pre-authorization, while a scholarship mandates caste validity, college enrollment, and NPCI bank seeding. Explore the exact, dedicated roadmap for any scheme below, or merge them into a single-visit action plan.
            </p>
          </div>

          {/* Mode Selector Toggle */}
          <div className="shrink-0 flex items-center gap-1 rounded-xl bg-indigo-950/80 p-1.5 border border-indigo-700/50">
            <button
              onClick={() => setViewMode("SINGLE")}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                viewMode === "SINGLE"
                  ? "bg-orange-600 text-white shadow-sm"
                  : "text-indigo-300 hover:text-white"
              }`}
            >
              <FileText className="size-4" />
              <span>Specific Scheme Roadmap</span>
            </button>
            <button
              onClick={() => setViewMode("MERGED")}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                viewMode === "MERGED"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-indigo-300 hover:text-white"
              }`}
            >
              <Layers className="size-4" />
              <span>Merge Multiple Schemes</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: DEDICATED SINGLE SCHEME ROADMAP */}
      {/* ========================================================================= */}
      {viewMode === "SINGLE" && (
        <div className="space-y-6">
          {/* Scheme Selection Bar */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Select Specific Target Scheme / Service:
                </label>
                <p className="text-xs text-slate-500 mt-0.5">
                  Every scheme displays its own exclusive prerequisites, authorities, and 5-stage verification timeline.
                </p>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => setCategoryFilter("ALL")}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold cursor-pointer transition-colors ${
                    categoryFilter === "ALL"
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  All ({SCHEMES_DATABASE.length})
                </button>
                {userState && (
                  <button
                    onClick={() => setCategoryFilter("MY_STATE")}
                    className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold cursor-pointer transition-colors ${
                      categoryFilter === "MY_STATE"
                        ? "bg-purple-700 text-white shadow-xs"
                        : "bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200"
                    }`}
                  >
                    <MapPin className="size-3" />
                    My State ({userState})
                  </button>
                )}
                <button
                  onClick={() => setCategoryFilter("CENTRAL")}
                  className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold cursor-pointer transition-colors ${
                    categoryFilter === "CENTRAL"
                      ? "bg-blue-700 text-white"
                      : "bg-blue-50 text-blue-800 hover:bg-blue-100"
                  }`}
                >
                  <Building2 className="size-3" />
                  Central Gov
                </button>
                <button
                  onClick={() => setCategoryFilter("HEALTHCARE")}
                  className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold cursor-pointer transition-colors ${
                    categoryFilter === "HEALTHCARE"
                      ? "bg-emerald-700 text-white"
                      : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                  }`}
                >
                  <Hospital className="size-3" />
                  Medical Relief
                </button>
                <button
                  onClick={() => setCategoryFilter("SCHOLARSHIP")}
                  className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold cursor-pointer transition-colors ${
                    categoryFilter === "SCHOLARSHIP"
                      ? "bg-orange-600 text-white"
                      : "bg-orange-50 text-orange-800 hover:bg-orange-100"
                  }`}
                >
                  <GraduationCap className="size-3" />
                  Scholarships
                </button>
                <button
                  onClick={() => setCategoryFilter("CERTIFICATE")}
                  className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold cursor-pointer transition-colors ${
                    categoryFilter === "CERTIFICATE"
                      ? "bg-indigo-600 text-white"
                      : "bg-indigo-50 text-indigo-800 hover:bg-indigo-100"
                  }`}
                >
                  <ShieldCheck className="size-3" />
                  Certificates
                </button>
              </div>
            </div>

            {/* Scheme Dropdown & Quick Badges */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {availableSchemes.map((s) => {
                const isSelected = s.id === selectedSchemeId;
                const isMedical = s.type === "healthcare";
                const isCert = s.type === "certificate";

                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedSchemeId(s.id);
                      if (onSelectScheme) onSelectScheme(s.id);
                    }}
                    className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "border-orange-500 bg-orange-50/50 shadow-xs ring-1 ring-orange-500"
                        : "border-slate-200 bg-slate-50/50 hover:bg-slate-100/80 hover:border-slate-300"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span
                          className={`font-mono text-[10px] font-bold rounded px-1.5 py-0.5 ${
                            isMedical
                              ? "bg-emerald-100 text-emerald-800"
                              : isCert
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {s.shortCode}
                        </span>
                        {isSelected && (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-orange-600">
                            <Check className="size-3" /> Active
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                        {s.title}
                      </h4>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                      <span>{s.level} • {s.type}</span>
                      <span className="font-semibold text-slate-700 truncate max-w-[140px]">
                        {s.benefitAmount.split("+")[0]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Scheme Focus Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-slate-900 px-2 py-0.5 font-mono text-[10px] font-bold text-white uppercase">
                    {currentRoadmap.shortCode}
                  </span>
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                    {currentRoadmap.categoryLabel}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-500 font-medium">
                    {currentRoadmap.sponsoringBody}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900">
                  {currentRoadmap.schemeTitle}
                </h2>
              </div>

              {/* Benefit & Fee Chips */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-xl bg-orange-50 border border-orange-200 px-3.5 py-2 text-xs">
                  <span className="text-[10px] text-orange-700 font-bold uppercase block">Official Benefit</span>
                  <span className="font-bold text-orange-950">{currentRoadmap.benefitHeadline}</span>
                </div>
                <div className="rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2 text-xs">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Official Fee</span>
                  <span className="font-bold text-slate-800">{currentRoadmap.officialFee}</span>
                </div>
                <div className="rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2 text-xs">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Statutory SLA</span>
                  <span className="font-bold text-slate-800">{currentRoadmap.statutoryTimeLimit}</span>
                </div>
              </div>
            </div>

            {/* Live Document Readiness Meter */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Activity className="size-4 text-orange-600" />
                  Applicant Readiness for this Scheme: {readyCount} of {allSingleDocs.length} items verified
                </span>
                <span className="font-mono font-bold text-slate-900">{readinessPercent}% Ready</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-200 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    readinessPercent >= 80
                      ? "bg-emerald-500"
                      : readinessPercent >= 50
                      ? "bg-amber-500"
                      : "bg-orange-500"
                  }`}
                  style={{ width: `${readinessPercent}%` }}
                />
              </div>
            </div>

            {/* PART A: 3-Tier Visual Prerequisite Dependency Chain */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  The Specific 3-Tier Prerequisite Chain
                </h4>
                <span className="text-xs text-slate-500">
                  Must be assembled from left to right
                </span>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {/* TIER 1: Foundational Base Identity */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="rounded bg-slate-200 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-700 uppercase">
                        Tier 1: Base Proofs
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">Foundational</span>
                    </div>
                    <h5 className="text-xs font-bold text-slate-800 mb-2">
                      Primary Identity Documents
                    </h5>
                    <ul className="space-y-2.5">
                      {currentRoadmap.tier1BaseIdentity.map((doc, idx) => (
                        <li
                          key={idx}
                          onClick={() => toggleCheckItem(doc.name)}
                          className="flex items-start gap-2 text-xs text-slate-700 cursor-pointer group"
                        >
                          <span className="mt-0.5 shrink-0 text-slate-400 group-hover:text-orange-600">
                            {checkedItems[doc.name] ? (
                              <CheckSquare className="size-4 text-emerald-600" />
                            ) : (
                              <Square className="size-4" />
                            )}
                          </span>
                          <div>
                            <span className="font-semibold block">{doc.name}</span>
                            <span className="text-[11px] text-slate-500 leading-tight block">
                              {doc.requirement}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-slate-500">
                    Source: UIDAI & State Civil Supplies
                  </div>
                </div>

                {/* TIER 2: Statutory Government Certificates */}
                <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4 relative flex flex-col justify-between">
                  <div className="hidden lg:block absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full border border-slate-200 p-1 shadow-xs">
                    <ArrowRight className="size-3 text-slate-400" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="rounded bg-amber-200 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-900 uppercase">
                        Tier 2: Certificates
                      </span>
                      <span className="text-[11px] text-amber-800 font-medium">Revenue Dept</span>
                    </div>
                    <h5 className="text-xs font-bold text-amber-950 mb-2">
                      Statutory Certificates Required
                    </h5>
                    {currentRoadmap.tier2StatutoryCertificates.length === 0 ? (
                      <p className="text-xs text-slate-500 italic">No secondary statutory certificates required for this service.</p>
                    ) : (
                      <ul className="space-y-3">
                        {currentRoadmap.tier2StatutoryCertificates.map((cert, idx) => (
                          <li
                            key={idx}
                            onClick={() => toggleCheckItem(cert.certificateId)}
                            className="rounded-lg border border-amber-200/80 bg-white p-2.5 text-xs text-slate-800 cursor-pointer hover:border-amber-400 transition-colors"
                          >
                            <div className="flex items-start gap-2">
                              <span className="mt-0.5 shrink-0">
                                {checkedItems[cert.certificateId] ? (
                                  <CheckSquare className="size-4 text-emerald-600" />
                                ) : (
                                  <Square className="size-4 text-slate-400" />
                                )}
                              </span>
                              <div className="flex-1 min-w-0">
                                <span className="font-bold text-amber-950 block truncate">{cert.name}</span>
                                <div className="mt-1 grid grid-cols-2 gap-1 text-[10px] text-slate-500">
                                  <span>Authority: <strong>{cert.authority.split("/")[0]}</strong></span>
                                  <span>Cost: <strong>{cert.statutoryCost}</strong></span>
                                  <span>Turnaround: <strong>{cert.turnaround}</strong></span>
                                  <span>Validity: <strong>{cert.validity.split("(")[0]}</strong></span>
                                </div>
                                <p className="mt-1 text-[10px] text-amber-800 font-medium">
                                  {cert.keyCondition}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="mt-4 pt-3 border-t border-amber-200/60 text-[11px] text-amber-800">
                    Authority: Tahsildar / Sub-Divisional Officer
                  </div>
                </div>

                {/* TIER 3: Institutional Verification & Banking Gateways */}
                <div className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-4 relative flex flex-col justify-between">
                  <div className="hidden lg:block absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full border border-slate-200 p-1 shadow-xs">
                    <ArrowRight className="size-3 text-slate-400" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="rounded bg-indigo-200 px-2 py-0.5 font-mono text-[10px] font-bold text-indigo-950 uppercase">
                        Tier 3: Institutional
                      </span>
                      <span className="text-[11px] text-indigo-800 font-medium">Verification</span>
                    </div>
                    <h5 className="text-xs font-bold text-indigo-950 mb-2">
                      {currentRoadmap.type === "healthcare"
                        ? "Clinical Requisitions & Pre-Auth"
                        : "Academic & Banking Clearance"}
                    </h5>
                    <ul className="space-y-2.5">
                      {currentRoadmap.tier3Institutional.map((item, idx) => (
                        <li
                          key={idx}
                          onClick={() => toggleCheckItem(item.name)}
                          className="flex items-start gap-2 text-xs text-slate-800 cursor-pointer group"
                        >
                          <span className="mt-0.5 shrink-0 text-slate-400 group-hover:text-indigo-600">
                            {checkedItems[item.name] ? (
                              <CheckSquare className="size-4 text-emerald-600" />
                            ) : (
                              <Square className="size-4" />
                            )}
                          </span>
                          <div>
                            <span className="font-semibold block">{item.name}</span>
                            <span className="text-[11px] text-indigo-900/80 leading-tight block">
                              Authority: {item.authority}
                            </span>
                            <span className="text-[10px] text-slate-500 block mt-0.5">
                              {item.action}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 pt-3 border-t border-indigo-200/60 text-[11px] text-indigo-900 font-semibold">
                    Banking: {currentRoadmap.bankingRequirement}
                  </div>
                </div>
              </div>
            </div>

            {/* PART B: 5-Stage Life Cycle Pipeline */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Official 5-Stage Processing Timeline & Rejection Gates
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    How an application flows from initial submission to final disbursement.
                  </p>
                </div>
                <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                  5 Verification Gates
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {currentRoadmap.stages.map((stage) => (
                  <div
                    key={stage.stageNumber}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex size-6 items-center justify-center rounded-full bg-orange-600 text-xs font-bold text-white">
                          {stage.stageNumber}
                        </span>
                        <span className="font-mono text-[10px] font-bold text-slate-500">
                          {stage.timeline}
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-900 leading-snug">
                        {stage.stageName}
                      </h5>
                      <span className="text-[10px] font-semibold text-orange-700 block mt-0.5">
                        Actor: {stage.actor}
                      </span>
                      <p className="mt-2 text-[11px] text-slate-600 leading-relaxed">
                        {stage.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1.5">
                      <div className="rounded bg-emerald-50 p-1.5 text-[10px] text-emerald-900 font-medium">
                        <strong>Action:</strong> {stage.actionItem}
                      </div>
                      <div className="rounded bg-rose-50 p-1.5 text-[10px] text-rose-900 font-medium">
                        <strong>Rejection Risk:</strong> {stage.commonPitfall}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PART C: Direct Portal & Offline Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl bg-slate-50 p-4 border border-slate-200">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <MapPin className="size-4 text-orange-600 shrink-0" />
                  <span><strong>Physical Counter:</strong> {currentRoadmap.offlineCounter}</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Official Portal: <strong>{currentRoadmap.portalName}</strong>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={currentRoadmap.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg bg-orange-600 px-4 py-2 text-xs font-bold text-white hover:bg-orange-700 transition-colors shadow-xs"
                >
                  <span>Open Official Portal</span>
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>

            {/* Rejection Checklist */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 space-y-2">
              <div className="flex items-center gap-2 text-amber-950 font-bold text-xs">
                <AlertTriangle className="size-4 text-amber-600" />
                <span>Critical Precautions to Prevent Rejection for {currentRoadmap.shortCode}:</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 text-xs">
                {currentRoadmap.rejectionChecklist.map((item, idx) => (
                  <div key={idx} className="rounded-lg bg-white p-3 border border-amber-200/60">
                    <p className="font-semibold text-slate-900 mb-1">{item.check}</p>
                    <p className="text-[11px] text-slate-600">{item.resolution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: MERGED MULTI-SCHEME DEPENDENCY MATRIX */}
      {/* ========================================================================= */}
      {viewMode === "MERGED" && (
        <div className="space-y-6">
          {/* Multi-Scheme Selection Panel */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Select Schemes to Merge into a Single Action Plan
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  See shared prerequisites, avoid making duplicate visits to government offices, and get an integrated single-visit roadmap.
                </p>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {userState === "Andhra Pradesh" && (
                  <>
                    <button
                      onClick={() =>
                        setMergedSelection(["AP_Jagananna_Vidya_Deevena", "AP_YSR_Aarogyasri", "AP_Integrated_Community_Cert"])
                      }
                      className="rounded-lg bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-800 hover:bg-orange-100 cursor-pointer border border-orange-200"
                    >
                      Combo: AP Vidya Deevena + YSR Aarogyasri
                    </button>
                    <button
                      onClick={() =>
                        setMergedSelection(["AP_Amma_Vodi", "AP_YSR_Aarogyasri", "Income_Certificate"])
                      }
                      className="rounded-lg bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-800 hover:bg-teal-100 cursor-pointer border border-teal-200"
                    >
                      Combo: Amma Vodi + Aarogyasri
                    </button>
                  </>
                )}

                {userState === "Tamil Nadu" && (
                  <>
                    <button
                      onClick={() =>
                        setMergedSelection(["TN_Pudhumai_Penn", "TN_CMCHIS_Medical", "TN_First_Graduate"])
                      }
                      className="rounded-lg bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-800 hover:bg-orange-100 cursor-pointer border border-orange-200"
                    >
                      Combo: TN Pudhumai Penn + CMCHIS Health
                    </button>
                    <button
                      onClick={() =>
                        setMergedSelection(["TN_7_5_Govt_School_Quota", "TN_CMCHIS_Medical", "Income_Certificate"])
                      }
                      className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800 hover:bg-emerald-100 cursor-pointer border border-emerald-200"
                    >
                      Combo: TN 7.5% Quota + CMCHIS
                    </button>
                  </>
                )}

                <button
                  onClick={() =>
                    setMergedSelection(["PostMatric_ST", "Ayushman_PMJAY", "Income_Certificate"])
                  }
                  className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 cursor-pointer border border-indigo-200"
                >
                  Combo: ST Scholarship + PM-JAY Relief
                </button>
                <button
                  onClick={() =>
                    setMergedSelection(["AICTE_Pragati", "Ayushman_PMJAY", "Income_Certificate"])
                  }
                  className="rounded-lg bg-pink-50 px-2.5 py-1 text-xs font-semibold text-pink-700 hover:bg-pink-100 cursor-pointer border border-pink-200"
                >
                  Combo: Girl Tech Student + Medical
                </button>
              </div>
            </div>

            {/* Checkbox Grid for All Schemes */}
            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {SCHEMES_DATABASE.map((scheme) => {
                const isChecked = mergedSelection.includes(scheme.id);
                return (
                  <label
                    key={scheme.id}
                    className={`flex items-start gap-2.5 rounded-xl border p-3 text-xs cursor-pointer transition-all ${
                      isChecked
                        ? "border-indigo-500 bg-indigo-50/50 shadow-xs ring-1 ring-indigo-500"
                        : "border-slate-200 bg-slate-50/60 hover:bg-slate-100/80"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleMergedScheme(scheme.id)}
                      className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 size-4"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="font-mono text-[10px] font-bold text-slate-500">
                          {scheme.shortCode}
                        </span>
                        <span className="text-[10px] font-semibold text-indigo-700">
                          {scheme.type}
                        </span>
                      </div>
                      <span className="font-bold text-slate-900 block truncate">
                        {scheme.title}
                      </span>
                      <span className="text-[10px] text-slate-500 block truncate mt-0.5">
                        {scheme.benefitAmount}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Merged Highlights Banner */}
          <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50/70 p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                  Merged Multi-Scheme Impact ({mergedData.selectedSchemes.length} Schemes Selected)
                </span>
                <h3 className="text-base font-bold text-indigo-950">
                  Combined Welfare Value: {mergedData.totalCombinedBenefit}
                </h3>
                <p className="text-xs text-indigo-800">
                  Total Statutory Government Fee: <strong>{mergedData.totalStatutoryFees}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-100/80 rounded-xl px-3 py-2 border border-emerald-200">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>
                  {mergedData.sharedStatutoryCertificates.filter((c) => c.isOverlapping).length} Shared Certificates Detected (Zero Duplication)
                </span>
              </div>
            </div>
          </div>

          {/* 1. Shared Statutory Certificates (The Synergy Engine) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Shared Statutory Certificates (Apply Once, Use Everywhere)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Instead of paying multiple times, these certificates simultaneously satisfy multiple schemes.
                </p>
              </div>
              <span className="rounded-md bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-900">
                Overlapping Prerequisites
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {mergedData.sharedStatutoryCertificates.map((cert) => (
                <div
                  key={cert.certificateId}
                  className={`rounded-xl border p-4 flex flex-col justify-between ${
                    cert.isOverlapping
                      ? "border-emerald-300 bg-emerald-50/40 shadow-xs ring-1 ring-emerald-300"
                      : "border-slate-200 bg-slate-50/60"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-bold text-xs text-slate-900">{cert.name}</span>
                      {cert.isOverlapping && (
                        <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">
                          Used in {cert.sharedCount} Schemes
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-600 space-y-1">
                      <div>Authority: <strong>{cert.authority}</strong></div>
                      <div>Statutory Fee: <strong>{cert.statutoryCost}</strong></div>
                      <div>RTSA Turnaround: <strong>{cert.turnaround}</strong></div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-200/70 text-[10px] font-medium text-slate-500">
                    Unlocks: {cert.usedInSchemes.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Consolidated Physical Visit Plan */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  The Single-Visit Physical Action Plan
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Consolidated stops to accomplish all requirements with zero wasted trips.
                </p>
              </div>
              <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-900">
                Route Efficiency
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {mergedData.consolidatedVisitPlan.map((visit, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-3"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">{visit.location}</h5>
                      <p className="text-[11px] text-slate-600 mt-0.5">{visit.purpose}</p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-white p-2.5 border border-slate-200 text-xs space-y-1">
                    <span className="font-semibold text-slate-700 text-[11px] block">
                      Documents to Carry:
                    </span>
                    <ul className="list-disc list-inside text-[11px] text-slate-600 space-y-0.5">
                      {visit.documentsToCarry.map((doc, dIdx) => (
                        <li key={dIdx}>{doc}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <span className="font-semibold text-slate-700">
                      Fee: {visit.statutoryFee}
                    </span>
                    <span className="text-emerald-700 font-medium">
                      💡 {visit.timeEfficiencyNote}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
