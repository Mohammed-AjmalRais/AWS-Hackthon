"use client";

import React, { useState } from "react";
import { UserProfile, CedarEvaluationResult } from "@/lib/cedar/evaluator";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Code2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Calendar,
  IndianRupee,
  Building2,
  ShieldCheck,
  FileCheck
} from "lucide-react";

interface EligibilityTabProps {
  profile: UserProfile;
  evaluationResults: CedarEvaluationResult[];
  currentLanguage: "en" | "hi";
  onProfileChange: (newProfile: UserProfile) => void;
  onNavigateToDocuments: () => void;
}

export const EligibilityTab: React.FC<EligibilityTabProps> = ({
  profile,
  evaluationResults,
  currentLanguage,
  onProfileChange,
  onNavigateToDocuments,
}) => {
  const [expandedCedarPolicy, setExpandedCedarPolicy] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<"ALL" | "SCHOLARSHIP" | "CERTIFICATE">("ALL");

  const eligibleCount = evaluationResults.filter((r) => r.decision === "ALLOW").length;
  const filteredResults = evaluationResults.filter((r) => {
    if (filterType === "SCHOLARSHIP") return r.scheme.type === "scholarship";
    if (filterType === "CERTIFICATE") return r.scheme.type === "certificate";
    return true;
  });

  const togglePolicyView = (id: string) => {
    setExpandedCedarPolicy(expandedCedarPolicy === id ? null : id);
  };

  const handleHeldDocToggle = (docId: string) => {
    const currentHeld = new Set(profile.heldDocuments || []);
    if (currentHeld.has(docId)) {
      currentHeld.delete(docId);
    } else {
      currentHeld.add(docId);
    }
    onProfileChange({
      ...profile,
      heldDocuments: Array.from(currentHeld),
    });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* LEFT COLUMN: Profile Inputs Form (4 cols) */}
      <div className="lg:col-span-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6 sticky top-28">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">
              {currentLanguage === "hi" ? "नागरिक प्रोफ़ाइल" : "Citizen Profile"}
            </h3>
            <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-700 font-mono">
              AWS Cedar Engine
            </span>
          </div>

          <div className="mt-4 space-y-4">
            {/* Category / Community */}
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                {currentLanguage === "hi" ? "सामाजिक श्रेणी / वर्ग" : "Social Category"}
              </label>
              <div className="mt-1.5 grid grid-cols-5 gap-1.5">
                {(["ST", "SC", "OBC", "EWS", "General"] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => onProfileChange({ ...profile, category: cat })}
                    className={`rounded-lg py-1.5 text-xs font-semibold transition-all ${
                      profile.category === cat
                        ? "bg-orange-600 text-white shadow-xs"
                        : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Annual Family Income */}
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-700">
                  {currentLanguage === "hi" ? "वार्षिक पारिवारिक आय" : "Annual Household Income"}
                </label>
                <span className="font-mono text-xs font-bold text-orange-600">
                  ₹{profile.annualFamilyIncome.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min={50000}
                max={1200000}
                step={25000}
                value={profile.annualFamilyIncome}
                onChange={(e) =>
                  onProfileChange({
                    ...profile,
                    annualFamilyIncome: parseInt(e.target.value, 10),
                  })
                }
                className="mt-2 w-full accent-orange-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>₹50K</span>
                <span>₹2.5L (MoTA Cap)</span>
                <span>₹8L (EWS Cap)</span>
                <span>₹12L</span>
              </div>
            </div>

            {/* Education Level */}
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                {currentLanguage === "hi" ? "वर्तमान कक्षा / शिक्षा स्तर" : "Education Stage"}
              </label>
              <select
                value={profile.educationLevel}
                onChange={(e) =>
                  onProfileChange({
                    ...profile,
                    educationLevel: e.target.value as UserProfile["educationLevel"],
                  })
                }
                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-800 focus:border-orange-500 focus:outline-hidden"
              >
                <option value="Class 9">Class 9 (Pre-Matric)</option>
                <option value="Class 10">Class 10 (Pre-Matric)</option>
                <option value="11th">Class 11 (Post-Matric)</option>
                <option value="12th">Class 12 (Post-Matric)</option>
                <option value="UG">Undergraduate (B.Tech, B.Sc, BA, MBBS)</option>
                <option value="PG">Postgraduate (M.Tech, M.Sc, MA, MBA)</option>
                <option value="PhD">Doctoral (PhD / MPhil)</option>
                <option value="Diploma">Polytechnic / Technical Diploma</option>
              </select>
            </div>

            {/* State & Gender Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  {currentLanguage === "hi" ? "राज्य (State)" : "Home State"}
                </label>
                <select
                  value={profile.state}
                  onChange={(e) => onProfileChange({ ...profile, state: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-xs font-medium text-slate-800 focus:border-orange-500 focus:outline-hidden"
                >
                  <option value="Odisha">Odisha</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Assam">Assam</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="All India">Other / All India</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  {currentLanguage === "hi" ? "लिंग (Gender)" : "Gender"}
                </label>
                <select
                  value={profile.gender}
                  onChange={(e) =>
                    onProfileChange({
                      ...profile,
                      gender: e.target.value as "Male" | "Female" | "Other",
                    })
                  }
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-xs font-medium text-slate-800 focus:border-orange-500 focus:outline-hidden"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Already Held Certificates Checklist */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                {currentLanguage === "hi"
                  ? "वर्तमान में आपके पास कौन से प्रमाण पत्र हैं?"
                  : "Which Certificates Do You Already Have?"}
              </label>
              <div className="space-y-1.5">
                {[
                  { id: "Caste_Certificate", label: "Caste / Tribe Certificate" },
                  { id: "Income_Certificate", label: "Income Certificate (< 1 yr)" },
                  { id: "Domicile_Certificate", label: "Domicile Certificate" },
                ].map((doc) => {
                  const isChecked = (profile.heldDocuments || []).includes(doc.id);
                  return (
                    <label
                      key={doc.id}
                      className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleHeldDocToggle(doc.id)}
                        className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                      />
                      <span>{doc.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Results & Schemes (8 cols) */}
      <div className="lg:col-span-8">
        {/* Results Header Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 p-6 text-white shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
              <ShieldCheck className="size-4" />
              AWS Cedar Policy Evaluation Complete
            </div>
            <h3 className="mt-1 text-2xl font-bold tracking-tight">
              {eligibleCount}{" "}
              {currentLanguage === "hi"
                ? "योजनाएं / प्रमाण पत्र उपलब्ध हैं"
                : "Schemes & Services Available"}
            </h3>
            <p className="mt-1 text-xs text-slate-300">
              {currentLanguage === "hi"
                ? "आपकी श्रेणी, आय और राज्य के आधार पर कानूनी नीतियों द्वारा सत्यापित।"
                : "Verified against statutory thresholds and Ministry gazette guidelines."}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 rounded-lg bg-white/10 p-1 text-xs">
            <button
              onClick={() => setFilterType("ALL")}
              className={`rounded px-3 py-1 font-medium transition-all ${
                filterType === "ALL" ? "bg-white text-slate-900" : "text-slate-300 hover:text-white"
              }`}
            >
              All ({evaluationResults.length})
            </button>
            <button
              onClick={() => setFilterType("SCHOLARSHIP")}
              className={`rounded px-3 py-1 font-medium transition-all ${
                filterType === "SCHOLARSHIP"
                  ? "bg-white text-slate-900"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Scholarships
            </button>
            <button
              onClick={() => setFilterType("CERTIFICATE")}
              className={`rounded px-3 py-1 font-medium transition-all ${
                filterType === "CERTIFICATE"
                  ? "bg-white text-slate-900"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Certificates
            </button>
          </div>
        </div>

        {/* Scheme Cards List */}
        <div className="mt-6 space-y-4">
          {filteredResults.map((result) => {
            const isAllowed = result.decision === "ALLOW";
            const isExpanded = expandedCedarPolicy === result.scheme.id;
            const hasMissingPrereqs = result.missingPrerequisites.length > 0;

            return (
              <div
                key={result.scheme.id}
                className={`rounded-2xl border transition-all ${
                  isAllowed
                    ? "border-slate-200 bg-white shadow-xs hover:border-orange-300"
                    : "border-slate-200 bg-slate-50/70 opacity-80"
                }`}
              >
                <div className="p-5 sm:p-6">
                  {/* Top Bar: Ministry & Decision Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <Building2 className="size-3.5 text-slate-400" />
                      <span>{result.scheme.ministry}</span>
                      <span className="text-slate-300">•</span>
                      <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-600">
                        {result.scheme.level}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isAllowed ? (
                        <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="size-3.5 text-emerald-600" />
                          {currentLanguage === "hi" ? "योग्य (ELIGIBLE)" : "ELIGIBLE"}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700 border border-rose-200">
                          <XCircle className="size-3.5 text-rose-600" />
                          {currentLanguage === "hi" ? "अयोग्य (INELIGIBLE)" : "INELIGIBLE"}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Hindi Title */}
                  <h4 className="mt-2 text-lg font-bold text-slate-900">
                    {currentLanguage === "hi" ? result.scheme.hindiTitle : result.scheme.title}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {currentLanguage === "hi" ? result.scheme.title : result.scheme.hindiTitle}
                  </p>

                  {/* Benefit & Deadline Banner */}
                  <div className="mt-4 flex flex-wrap items-center gap-4 rounded-xl bg-orange-50/60 p-3 text-xs border border-orange-100">
                    <div className="flex items-center gap-1.5 font-semibold text-orange-950">
                      <IndianRupee className="size-4 text-orange-600" />
                      <span>{result.scheme.benefitAmount}</span>
                    </div>
                    <span className="text-orange-200 hidden sm:inline">|</span>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Calendar className="size-4 text-slate-400" />
                      <span>
                        Deadline: <strong>{result.scheme.deadline}</strong> ({result.scheme.daysRemaining} days left)
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-slate-600">
                    {result.scheme.benefitDescription}
                  </p>

                  {/* Missing Prerequisites Alert */}
                  {isAllowed && hasMissingPrereqs && (
                    <div className="mt-3.5 rounded-xl border border-amber-200 bg-amber-50/80 p-3 text-xs">
                      <div className="flex items-start gap-2 text-amber-900 font-semibold">
                        <AlertTriangle className="size-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <span>Prerequisite Chain Incomplete:</span>
                          <p className="mt-0.5 font-normal text-amber-800">
                            To claim this benefit, you must first obtain or renew:{" "}
                            <strong>
                              {result.missingPrerequisites.map((p) => p.title).join(", ")}
                            </strong>.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Evaluation Reason Breakdown */}
                  <div className="mt-4 space-y-1">
                    {result.passedClauses.map((clause, i) => (
                      <p key={i} className="flex items-center gap-1.5 text-[11px] text-emerald-700">
                        <CheckCircle2 className="size-3 text-emerald-500 shrink-0" />
                        <span>{clause}</span>
                      </p>
                    ))}
                    {result.failedClauses.map((clause, i) => (
                      <p key={i} className="flex items-center gap-1.5 text-[11px] text-rose-600 font-medium">
                        <XCircle className="size-3 text-rose-500 shrink-0" />
                        <span>{clause}</span>
                      </p>
                    ))}
                  </div>

                  {/* Collapsible Cedar Policy View */}
                  {isExpanded && (
                    <div className="mt-4 rounded-xl border border-indigo-200 bg-indigo-950 p-4 font-mono text-xs text-indigo-200 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between border-b border-indigo-800 pb-2 text-[11px] text-indigo-400">
                        <span>AWS Cedar Policy Definition ({result.scheme.cedarPolicyId})</span>
                        <span className="rounded bg-indigo-900 px-1.5 py-0.5 text-[10px] text-indigo-300">
                          Deterministic
                        </span>
                      </div>
                      <pre className="mt-2 overflow-x-auto whitespace-pre leading-relaxed text-[11px]">
                        {result.cedarPolicySnippet}
                      </pre>
                      <div className="mt-2 text-[10px] text-indigo-400">
                        Gazette Ref: {result.scheme.officialGazetteRef}
                      </div>
                    </div>
                  )}

                  {/* Action Bar */}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                    <button
                      onClick={() => togglePolicyView(result.scheme.id)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      <Code2 className="size-3.5" />
                      <span>{isExpanded ? "Hide Cedar Policy" : "Inspect Cedar Policy Code"}</span>
                      {isExpanded ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
                    </button>

                    <div className="flex items-center gap-2">
                      {isAllowed && hasMissingPrereqs && (
                        <button
                          onClick={onNavigateToDocuments}
                          className="flex items-center gap-1 rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 hover:bg-amber-100 transition-colors"
                        >
                          <FileCheck className="size-3.5" />
                          Resolve Prerequisites
                        </button>
                      )}
                      <a
                        href={result.scheme.officialPortalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 rounded-lg bg-orange-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-orange-700 transition-colors"
                      >
                        <span>Apply on {result.scheme.portalName}</span>
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
