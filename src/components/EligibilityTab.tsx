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
  FileCheck,
  User,
  GraduationCap,
  Landmark,
  Home,
  Check,
  Sparkles,
  Layers
} from "lucide-react";

interface EligibilityTabProps {
  profile: UserProfile;
  evaluationResults: CedarEvaluationResult[];
  onProfileChange: (newProfile: UserProfile) => void;
  onNavigateToDocuments: () => void;
}

export const EligibilityTab: React.FC<EligibilityTabProps> = ({
  profile,
  evaluationResults,
  onProfileChange,
  onNavigateToDocuments,
}) => {
  const [activeSection, setActiveSection] = useState<"ALL" | "ACADEMIC" | "FINANCIAL">("ALL");
  const [expandedCedarPolicy, setExpandedCedarPolicy] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<"ALL" | "ELIGIBLE" | "SCHOLARSHIP" | "CERTIFICATE">("ALL");

  const eligibleResults = evaluationResults.filter((r) => r.decision === "ALLOW");
  const eligibleCount = eligibleResults.length;

  const filteredResults = evaluationResults.filter((r) => {
    if (filterType === "ELIGIBLE") return r.decision === "ALLOW";
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
    <div className="grid gap-8 lg:grid-cols-12 items-start">
      {/* LEFT COLUMN: Comprehensive Real-World Profile Form (5 cols) */}
      <div className="lg:col-span-5 space-y-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6 sticky top-24">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <User className="size-4 text-orange-600" />
                Comprehensive Citizen Profile
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Real-world parameters checked by National & State Scholarship Portals.
              </p>
            </div>
            <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-mono font-bold text-indigo-700 border border-indigo-200">
              AWS Cedar
            </span>
          </div>

          <div className="mt-5 space-y-5">
            {/* GROUP 1: Social Category & Personal Identity */}
            <div className="space-y-3">
              <span className="block font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                1. Social Category & Demographics
              </span>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Social Category
                </label>
                <div className="grid grid-cols-5 gap-1.5">
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                  <select
                    value={profile.gender}
                    onChange={(e) =>
                      onProfileChange({
                        ...profile,
                        gender: e.target.value as "Male" | "Female" | "Other",
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-800"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female (Unlocks Pragati / Girls schemes)</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Domicile State</label>
                  <select
                    value={profile.state}
                    onChange={(e) => onProfileChange({ ...profile, state: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-800"
                  >
                    <option value="Odisha">Odisha</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Assam">Assam (NE Quota)</option>
                    <option value="All India">Other / All India</option>
                  </select>
                </div>
              </div>

              {/* Special toggles: Minority & Disability */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.isMinority}
                    onChange={(e) =>
                      onProfileChange({
                        ...profile,
                        isMinority: e.target.checked,
                        minorityCommunity: e.target.checked ? "Muslim" : "None",
                      })
                    }
                    className="rounded text-orange-600 focus:ring-orange-500"
                  />
                  <span>Religious Minority</span>
                </label>

                <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.isPersonWithDisability}
                    onChange={(e) =>
                      onProfileChange({
                        ...profile,
                        isPersonWithDisability: e.target.checked,
                        disabilityPercentage: e.target.checked ? 40 : 0,
                      })
                    }
                    className="rounded text-orange-600 focus:ring-orange-500"
                  />
                  <span>PwD (&ge; 40% Disability)</span>
                </label>
              </div>
            </div>

            {/* GROUP 2: Academic & Institutional Particulars */}
            <div className="space-y-3 border-t border-slate-100 pt-4">
              <span className="block font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                2. Academic & Course Particulars
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Education Stage</label>
                  <select
                    value={profile.educationLevel}
                    onChange={(e) =>
                      onProfileChange({
                        ...profile,
                        educationLevel: e.target.value as UserProfile["educationLevel"],
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-800"
                  >
                    <option value="Class 9">Class 9 (Pre-Matric)</option>
                    <option value="Class 10">Class 10 (Pre-Matric)</option>
                    <option value="11th">Class 11 (Post-Matric)</option>
                    <option value="12th">Class 12 (Post-Matric)</option>
                    <option value="UG">Undergraduate (B.Tech, B.Sc, BA, MBBS)</option>
                    <option value="PG">Postgraduate (M.Tech, MBA, M.Sc)</option>
                    <option value="PhD">Doctoral (PhD / MPhil)</option>
                    <option value="Diploma">Polytechnic Diploma</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Course Mode</label>
                  <select
                    value={profile.courseType}
                    onChange={(e) =>
                      onProfileChange({
                        ...profile,
                        courseType: e.target.value as UserProfile["courseType"],
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-800"
                  >
                    <option value="Regular Full-Time">Regular Full-Time (Eligible)</option>
                    <option value="Diploma">Diploma Course</option>
                    <option value="Distance">Distance / Open School (Ineligible)</option>
                    <option value="Vocational">Vocational / Skill</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Admission Quota</label>
                  <select
                    value={profile.admissionQuota}
                    onChange={(e) =>
                      onProfileChange({
                        ...profile,
                        admissionQuota: e.target.value as UserProfile["admissionQuota"],
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-800"
                  >
                    <option value="Merit/Govt Counseling">Merit / Govt Counseling (JEE/CET)</option>
                    <option value="Management/Direct">Management / Direct Quota (Excluded)</option>
                    <option value="Sports/ECA">Sports / ECA Quota</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Institution Category</label>
                  <select
                    value={profile.institutionType}
                    onChange={(e) =>
                      onProfileChange({
                        ...profile,
                        institutionType: e.target.value as UserProfile["institutionType"],
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-800"
                  >
                    <option value="Government">Government College/Univ</option>
                    <option value="Govt-Aided">Govt-Aided Institution</option>
                    <option value="Premier/Notified (IIT/NIT/AIIMS)">Premier Institute (IIT/NIT/AIIMS)</option>
                    <option value="Private Recognized">Private Recognized College</option>
                  </select>
                </div>
              </div>

              {/* Marks & Hosteller Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Previous Exam Marks: <span className="font-mono text-orange-600 font-bold">{profile.marksPercentage}%</span>
                  </label>
                  <input
                    type="range"
                    min={40}
                    max={100}
                    value={profile.marksPercentage}
                    onChange={(e) =>
                      onProfileChange({ ...profile, marksPercentage: parseInt(e.target.value, 10) })
                    }
                    className="w-full accent-orange-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                    <span>40%</span>
                    <span>50% (Min)</span>
                    <span>80% (CSSS)</span>
                    <span>100%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Living Arrangement</label>
                  <div className="grid grid-cols-2 gap-1 mt-1">
                    <button
                      type="button"
                      onClick={() => onProfileChange({ ...profile, isHosteller: true })}
                      className={`rounded py-1.5 text-xs font-semibold ${
                        profile.isHosteller
                          ? "bg-slate-900 text-white"
                          : "border border-slate-200 bg-slate-50 text-slate-700"
                      }`}
                    >
                      Hosteller (Higher DBT)
                    </button>
                    <button
                      type="button"
                      onClick={() => onProfileChange({ ...profile, isHosteller: false })}
                      className={`rounded py-1.5 text-xs font-semibold ${
                        !profile.isHosteller
                          ? "bg-slate-900 text-white"
                          : "border border-slate-200 bg-slate-50 text-slate-700"
                      }`}
                    >
                      Day Scholar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* GROUP 3: Household Financials & Landholding */}
            <div className="space-y-3 border-t border-slate-100 pt-4">
              <span className="block font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                3. Household Financials & Assets
              </span>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-700">
                    Annual Gross Family Income
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
                  <span>₹2.5L (MoTA/MoSJE)</span>
                  <span>₹4.5L (UGC)</span>
                  <span>₹8L (EWS/Pragati)</span>
                </div>
              </div>

              {/* Fast presets */}
              <div className="flex flex-wrap gap-1.5">
                {[150000, 240000, 400000, 600000, 800000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => onProfileChange({ ...profile, annualFamilyIncome: val })}
                    className={`rounded px-2 py-1 text-[10px] font-mono font-medium transition-all ${
                      profile.annualFamilyIncome === val
                        ? "bg-orange-600 text-white"
                        : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    ₹{(val / 100000).toFixed(1)}L
                  </button>
                ))}
              </div>

              {/* Concurrency Check */}
              <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.isAlreadyReceivingOtherScholarship}
                  onChange={(e) =>
                    onProfileChange({
                      ...profile,
                      isAlreadyReceivingOtherScholarship: e.target.checked,
                    })
                  }
                  className="rounded text-rose-600 focus:ring-rose-500"
                />
                <span className="text-slate-800">
                  Already receiving another Government Scholarship (Dual conflict check)
                </span>
              </label>

              {/* Certificates already held */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Certificates Already in Possession:
                </label>
                <div className="space-y-1.5">
                  {[
                    { id: "Caste_Certificate", label: "Valid Caste / Tribe Certificate" },
                    { id: "Income_Certificate", label: "Income Certificate (< 1 year old)" },
                    { id: "Domicile_Certificate", label: "Domicile / PRC Certificate" },
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
      </div>

      {/* RIGHT COLUMN: Real Schemes & Transparent Audit Results (7 cols) */}
      <div className="lg:col-span-7 space-y-6">
        {/* Results Overview Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 text-white shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
              <ShieldCheck className="size-4" />
              AWS Cedar Deterministic Evaluation Complete
            </div>
            <h3 className="mt-1 text-2xl font-black tracking-tight">
              {eligibleCount} Scheme(s) & Services Qualified
            </h3>
            <p className="mt-1 text-xs text-slate-300">
              Evaluated across 15+ statutory dimensions (income, counseling quota, course mode, gender, merit).
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1 rounded-lg bg-white/10 p-1 text-xs">
            <button
              onClick={() => setFilterType("ALL")}
              className={`rounded px-3 py-1 font-medium transition-all ${
                filterType === "ALL" ? "bg-white text-slate-900 shadow-xs" : "text-slate-300 hover:text-white"
              }`}
            >
              All ({evaluationResults.length})
            </button>
            <button
              onClick={() => setFilterType("ELIGIBLE")}
              className={`rounded px-3 py-1 font-medium transition-all ${
                filterType === "ELIGIBLE" ? "bg-white text-slate-900 shadow-xs" : "text-slate-300 hover:text-white"
              }`}
            >
              Eligible ({eligibleCount})
            </button>
            <button
              onClick={() => setFilterType("SCHOLARSHIP")}
              className={`rounded px-3 py-1 font-medium transition-all ${
                filterType === "SCHOLARSHIP" ? "bg-white text-slate-900 shadow-xs" : "text-slate-300 hover:text-white"
              }`}
            >
              Scholarships
            </button>
            <button
              onClick={() => setFilterType("CERTIFICATE")}
              className={`rounded px-3 py-1 font-medium transition-all ${
                filterType === "CERTIFICATE" ? "bg-white text-slate-900 shadow-xs" : "text-slate-300 hover:text-white"
              }`}
            >
              Certificates
            </button>
          </div>
        </div>

        {/* Scheme Cards */}
        <div className="space-y-4">
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
                  {/* Top Bar: Ministry, Sponsoring Body & Status Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <Building2 className="size-3.5 text-slate-400 shrink-0" />
                      <span className="truncate max-w-[280px] sm:max-w-md">{result.scheme.ministry}</span>
                      <span className="text-slate-300">•</span>
                      <span className="font-mono text-[10px] text-slate-600 bg-slate-100 rounded px-1.5 py-0.5">
                        {result.scheme.shortCode}
                      </span>
                    </div>

                    <div>
                      {isAllowed ? (
                        <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="size-3.5 text-emerald-600" />
                          ELIGIBLE (QUALIFIED)
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700 border border-rose-200">
                          <XCircle className="size-3.5 text-rose-600" />
                          INELIGIBLE
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Scheme Title */}
                  <h4 className="mt-2.5 text-lg font-bold text-slate-900">
                    {result.scheme.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {result.scheme.sponsoringBody}
                  </p>

                  {/* Financial Benefit Highlight Banner */}
                  <div className="mt-4 flex flex-wrap items-center gap-4 rounded-xl bg-orange-50/70 p-3.5 text-xs border border-orange-200/80">
                    <div className="flex items-center gap-1.5 font-bold text-orange-950">
                      <IndianRupee className="size-4 text-orange-600 shrink-0" />
                      <span>{result.estimatedBenefit}</span>
                    </div>
                    <span className="text-orange-200 hidden sm:inline">|</span>
                    <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                      <Calendar className="size-4 text-slate-400 shrink-0" />
                      <span>
                        Deadline: <strong>{result.scheme.deadline}</strong> ({result.scheme.daysRemaining} days left)
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-slate-700">
                    {result.scheme.benefitDescription}
                  </p>

                  {/* Missing Prerequisites Warning */}
                  {isAllowed && hasMissingPrereqs && (
                    <div className="mt-3.5 rounded-xl border border-amber-300 bg-amber-50 p-3.5 text-xs">
                      <div className="flex items-start gap-2.5 text-amber-950 font-semibold">
                        <AlertTriangle className="size-4 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <span>Prerequisite Roadblock Detected:</span>
                          <p className="mt-0.5 font-normal text-amber-900 leading-relaxed">
                            You meet all academic & income criteria, but cannot submit on the portal yet because you lack:{" "}
                            <strong>
                              {result.missingPrerequisites.map((p) => p.title).join(", ")}
                            </strong>.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Real-World Passed / Failed Rule Clauses */}
                  <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3">
                    <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      Evaluation Audit Trail:
                    </span>
                    {result.passedClauses.map((clause, i) => (
                      <p key={i} className="flex items-center gap-1.5 text-xs text-emerald-700">
                        <CheckCircle2 className="size-3 text-emerald-500 shrink-0" />
                        <span>{clause}</span>
                      </p>
                    ))}
                    {result.failedClauses.map((clause, i) => (
                      <p key={i} className="flex items-center gap-1.5 text-xs text-rose-600 font-semibold">
                        <XCircle className="size-3 text-rose-500 shrink-0" />
                        <span>{clause}</span>
                      </p>
                    ))}
                  </div>

                  {/* Collapsible Cedar Policy View */}
                  {isExpanded && (
                    <div className="mt-4 rounded-xl border border-indigo-200 bg-indigo-950 p-4 font-mono text-xs text-indigo-200 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between border-b border-indigo-800 pb-2 text-[11px] text-indigo-400">
                        <span>AWS Cedar Policy Engine Definition</span>
                        <span className="rounded bg-indigo-900 px-1.5 py-0.5 text-[10px] text-indigo-300">
                          Deterministic Open Source
                        </span>
                      </div>
                      <pre className="mt-2 overflow-x-auto whitespace-pre leading-relaxed text-[11px]">
                        {result.cedarPolicySnippet}
                      </pre>
                      <div className="mt-2 text-[10px] text-indigo-400">
                        Statutory Reference: {result.scheme.officialGazetteRef}
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
                      <span>{isExpanded ? "Hide Cedar Policy" : "Inspect Cedar Policy (Code)"}</span>
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
                        className="flex items-center gap-1.5 rounded-lg bg-orange-600 px-4 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-orange-700 transition-colors"
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
