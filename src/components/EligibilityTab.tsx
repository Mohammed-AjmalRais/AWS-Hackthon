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
  Layers,
  ArrowRight,
  School,
  Award,
  Zap,
  Sliders,
  RotateCcw,
  Hospital
} from "lucide-react";

interface EligibilityTabProps {
  profile: UserProfile;
  evaluationResults: CedarEvaluationResult[];
  onProfileChange: (newProfile: UserProfile) => void;
  onNavigateToDocuments: () => void;
  onNavigateToRoadmap?: (schemeId: string) => void;
}

export const EligibilityTab: React.FC<EligibilityTabProps> = ({
  profile,
  evaluationResults,
  onProfileChange,
  onNavigateToDocuments,
  onNavigateToRoadmap,
}) => {
  // Two distinct views: Profile Setup vs Scheme Evaluation
  const [activeView, setActiveView] = useState<"PROFILE" | "RESULTS">("RESULTS");
  const [expandedCedarPolicy, setExpandedCedarPolicy] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<
    "ALL" | "ELIGIBLE" | "STATE_TN" | "CENTRAL" | "SCHOLARSHIP" | "HEALTHCARE" | "CERTIFICATE"
  >("ALL");

  const eligibleResults = evaluationResults.filter((r) => r.decision === "ALLOW");
  const eligibleCount = eligibleResults.length;
  const ineligibleCount = evaluationResults.length - eligibleCount;

  // Filter logic
  const filteredResults = evaluationResults.filter((r) => {
    if (filterType === "ELIGIBLE") return r.decision === "ALLOW";
    if (filterType === "STATE_TN") return r.scheme.level === "State" && r.scheme.applicableStates?.includes("Tamil Nadu");
    if (filterType === "CENTRAL") return r.scheme.level === "Central";
    if (filterType === "SCHOLARSHIP") return r.scheme.type === "scholarship";
    if (filterType === "HEALTHCARE") return r.scheme.type === "healthcare";
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

  const isTamilNadu = profile.state === "Tamil Nadu";

  return (
    <div className="space-y-6">
      {/* View Switcher Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView("PROFILE")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
              activeView === "PROFILE"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <User className="size-4 text-orange-400" />
            <span>1. Citizen Profile Setup</span>
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
              {profile.state}
            </span>
          </button>

          <button
            onClick={() => setActiveView("RESULTS")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
              activeView === "RESULTS"
                ? "bg-orange-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Sparkles className="size-4 text-amber-300" />
            <span>2. Scheme Evaluation Results</span>
            <span className="rounded-full bg-orange-700 px-2 py-0.5 text-[10px] text-orange-100">
              {eligibleCount} Eligible
            </span>
          </button>
        </div>

        {/* Quick Summary Pill in Header */}
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="font-semibold text-slate-800">{profile.name || "Candidate"}</span>
          <span>•</span>
          <span>{isTamilNadu ? `${profile.tnCommunity || "BC"} (Tamil Nadu)` : profile.category}</span>
          <span>•</span>
          <span>₹{(profile.annualFamilyIncome / 100000).toFixed(1)}L/yr</span>
          <span>•</span>
          <button
            onClick={() => setActiveView(activeView === "PROFILE" ? "RESULTS" : "PROFILE")}
            className="text-orange-600 font-bold hover:underline cursor-pointer ml-1"
          >
            {activeView === "PROFILE" ? "View Schemes ➔" : "Edit Profile ✏️"}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: DEDICATED CITIZEN PROFILE SETUP (NON-CLUMSY, STRUCTURED FORM)   */}
      {/* ========================================================================= */}
      {activeView === "PROFILE" && (
        <div className="space-y-6">
          {/* Banner */}
          <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 via-slate-50 to-orange-50/40 p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 rounded-md bg-indigo-100 px-2.5 py-0.5 font-mono text-[10px] font-bold text-indigo-800 uppercase">
                  Civil Identity & Academic Registry
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Citizen Profile & Entitlement Parameters
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Fill in your official particulars below. Our AWS Cedar Policy Engine screens this profile against the top 15+ central and state schemes (including Tamil Nadu state flagship programs like Pudhumai Penn, 7.5% Govt School Quota, First Graduate, and CMCHIS) with 100% deterministic accuracy.
                </p>
              </div>

              <button
                onClick={() => setActiveView("RESULTS")}
                className="shrink-0 flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-3 text-xs font-bold text-white hover:bg-orange-700 transition-all shadow-sm cursor-pointer"
              >
                <span>Run Scheme Audit</span>
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* CARD 1: Domicile, State & Social Identity */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div className="rounded-lg bg-orange-100 p-2 text-orange-600">
                  <Landmark className="size-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">1. State Domicile & Social Identity</h4>
                  <p className="text-xs text-slate-500">Determines state vs central quota eligibility</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* State */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Permanent Home State</label>
                  <select
                    value={profile.state}
                    onChange={(e) =>
                      onProfileChange({
                        ...profile,
                        state: e.target.value,
                        district: e.target.value === "Tamil Nadu" ? "Chennai" : profile.district,
                        tnCommunity: e.target.value === "Tamil Nadu" ? "MBC" : undefined,
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white p-2 text-xs font-semibold text-slate-800 focus:border-orange-500 focus:outline-hidden"
                  >
                    <option value="Tamil Nadu">Tamil Nadu (தமிழ்நாடு)</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Assam">Assam (NE Region)</option>
                    <option value="National">Other / All-India</option>
                  </select>
                </div>

                {/* District */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Home District</label>
                  <input
                    type="text"
                    value={profile.district || ""}
                    onChange={(e) => onProfileChange({ ...profile, district: e.target.value })}
                    placeholder="e.g. Chennai / Madurai / Mayurbhanj"
                    className="w-full rounded-lg border border-slate-300 bg-white p-2 text-xs text-slate-800 focus:border-orange-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Gender */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                  <select
                    value={profile.gender}
                    onChange={(e) =>
                      onProfileChange({
                        ...profile,
                        gender: e.target.value as UserProfile["gender"],
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white p-2 text-xs text-slate-800 focus:border-orange-500 focus:outline-hidden"
                  >
                    <option value="Female">Female (Unlocks Pudhumai Penn, Pragati, KMUT)</option>
                    <option value="Male">Male (Unlocks Tamil Pudhalvan)</option>
                    <option value="Other">Other / Transgender</option>
                  </select>
                </div>

                {/* Broad Category */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Central Category</label>
                  <select
                    value={profile.category}
                    onChange={(e) =>
                      onProfileChange({
                        ...profile,
                        category: e.target.value as UserProfile["category"],
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white p-2 text-xs font-semibold text-slate-800 focus:border-orange-500 focus:outline-hidden"
                  >
                    <option value="OBC">OBC (Other Backward Classes)</option>
                    <option value="SC">SC (Scheduled Caste)</option>
                    <option value="ST">ST (Scheduled Tribe)</option>
                    <option value="EWS">EWS (Economically Weaker Section)</option>
                    <option value="General">General / Open Category</option>
                  </select>
                </div>
              </div>

              {/* DYNAMIC TAMIL NADU COMMUNITY SELECTOR */}
              {isTamilNadu && (
                <div className="rounded-xl border border-orange-200 bg-orange-50/60 p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-orange-950">
                      Tamil Nadu Community Reservation Category (சாதிப் பிரிவு)
                    </label>
                    <span className="text-[10px] font-mono font-bold text-orange-700 bg-orange-100 rounded px-1.5 py-0.5">
                      TN Statutory
                    </span>
                  </div>
                  <select
                    value={profile.tnCommunity || "MBC"}
                    onChange={(e) =>
                      onProfileChange({
                        ...profile,
                        tnCommunity: e.target.value as UserProfile["tnCommunity"],
                        category: ["SC", "SCA"].includes(e.target.value)
                          ? "SC"
                          : e.target.value === "ST"
                          ? "ST"
                          : e.target.value === "OC"
                          ? "General"
                          : "OBC",
                      })
                    }
                    className="w-full rounded-lg border border-orange-300 bg-white p-2 text-xs font-bold text-orange-950 focus:border-orange-500 focus:outline-hidden"
                  >
                    <option value="MBC">MBC (Most Backward Class - மிகப்பிற்படுத்தப்பட்டோர்)</option>
                    <option value="DNC">DNC (Denotified Community - சீர்மரபினர்)</option>
                    <option value="BC">BC (Backward Class - பிற்படுத்தப்பட்டோர்)</option>
                    <option value="BCM">BCM (Backward Class Muslim - பிற்படுத்தப்பட்ட முஸ்லிம்)</option>
                    <option value="SC">SC (Scheduled Caste - ஆதிதிராவிடர்)</option>
                    <option value="SCA">SCA (Arunthathiyar - அருந்ததியர்)</option>
                    <option value="ST">ST (Scheduled Tribe - பழங்குடியினர்)</option>
                    <option value="OC">OC (Open Competition / General)</option>
                  </select>
                  <p className="text-[11px] text-orange-900/80 leading-relaxed">
                    * MBC/DNC students in 3-year undergraduate degree courses receive 100% free tuition with NO income limit under Tamil Nadu government orders.
                  </p>
                </div>
              )}

              {/* Minority & PwD toggles */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-700 cursor-pointer">
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

                <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-700 cursor-pointer">
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

            {/* CARD 2: Schooling & Academic History (Crucial for TN Schemes!) */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                  <School className="size-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">2. Schooling & College Particulars</h4>
                  <p className="text-xs text-slate-500">Unlocks Pudhumai Penn, First Graduate, and counseling fee exemptions</p>
                </div>
              </div>

              {/* Critical Schooling Checkbox (Pudhumai Penn & 7.5% Quota) */}
              <div className={`rounded-xl border p-3.5 space-y-1.5 transition-all ${
                profile.studiedInGovtSchool6To12
                  ? "border-emerald-300 bg-emerald-50/70"
                  : "border-slate-200 bg-slate-50"
              }`}>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.studiedInGovtSchool6To12}
                    onChange={(e) =>
                      onProfileChange({
                        ...profile,
                        studiedInGovtSchool6To12: e.target.checked,
                      })
                    }
                    className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 size-4"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      🏫 Studied in State Government School from Class 6 to 12 continuously
                    </span>
                    <span className="text-[11px] text-slate-600 leading-snug block mt-0.5">
                      Mandatory prerequisite to unlock **Pudhumai Penn (₹1,000/mo)**, **Tamil Pudhalvan (₹1,000/mo)**, and **7.5% Preferential Quota 100% Free College Education**.
                    </span>
                  </div>
                </label>
              </div>

              {/* First Graduate in Family Checkbox (Mudhal Thalaimurai Pattadhari) */}
              <div className={`rounded-xl border p-3.5 space-y-1.5 transition-all ${
                profile.isFirstGraduateInFamily
                  ? "border-indigo-300 bg-indigo-50/70"
                  : "border-slate-200 bg-slate-50"
              }`}>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.isFirstGraduateInFamily}
                    onChange={(e) =>
                      onProfileChange({
                        ...profile,
                        isFirstGraduateInFamily: e.target.checked,
                      })
                    }
                    className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 size-4"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      🎓 First Graduate in Immediate Family (Mudhal Thalaimurai Pattadhari)
                    </span>
                    <span className="text-[11px] text-slate-600 leading-snug block mt-0.5">
                      Neither parents nor elder siblings hold an undergraduate degree. Unlocks **₹25,000 – ₹30,000 / Year Tuition Fee Concession** in engineering/professional colleges!
                    </span>
                  </div>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Education Stage */}
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
                    className="w-full rounded-lg border border-slate-300 bg-white p-2 text-xs text-slate-800 focus:border-orange-500 focus:outline-hidden"
                  >
                    <option value="UG">Undergraduate (B.E / B.Tech / MBBS / B.Sc / B.Com / Arts)</option>
                    <option value="Diploma">Diploma / Polytechnic</option>
                    <option value="12th">Class 12th</option>
                    <option value="11th">Class 11th</option>
                    <option value="PG">Postgraduate (M.E / M.Sc / MBA)</option>
                    <option value="PhD">PhD / Doctoral</option>
                  </select>
                </div>

                {/* Course Mode */}
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
                    className="w-full rounded-lg border border-slate-300 bg-white p-2 text-xs text-slate-800 focus:border-orange-500 focus:outline-hidden"
                  >
                    <option value="Regular Full-Time">Regular Full-Time (On-Campus)</option>
                    <option value="Diploma">Diploma / Vocational</option>
                    <option value="Distance">Distance / Correspondence (Ineligible for most)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Admission Quota */}
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
                    className="w-full rounded-lg border border-slate-300 bg-white p-2 text-xs font-semibold text-slate-800 focus:border-orange-500 focus:outline-hidden"
                  >
                    <option value="Merit/Govt Counseling">Single Window Merit / Govt Counseling (TNEA/OJEE/Govt)</option>
                    <option value="Management/Direct">Management / Direct Quota (Strictly Denied by Central & State Rules)</option>
                  </select>
                </div>

                {/* Institution Type */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">College Category</label>
                  <select
                    value={profile.institutionType}
                    onChange={(e) =>
                      onProfileChange({
                        ...profile,
                        institutionType: e.target.value as UserProfile["institutionType"],
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white p-2 text-xs text-slate-800 focus:border-orange-500 focus:outline-hidden"
                  >
                    <option value="Government">Government College</option>
                    <option value="Govt-Aided">Government-Aided College</option>
                    <option value="Private Recognized">Private Affiliated (Anna Univ / State Univ)</option>
                    <option value="Premier/Notified (IIT/NIT/AIIMS)">Premier Institute (IIT Madras / NIT / AIIMS)</option>
                  </select>
                </div>
              </div>

              {/* Marks slider */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700">Qualifying Exam Marks:</span>
                  <span className="font-mono font-bold text-orange-600">{profile.marksPercentage}%</span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={100}
                  step={1}
                  value={profile.marksPercentage}
                  onChange={(e) => onProfileChange({ ...profile, marksPercentage: Number(e.target.value) })}
                  className="w-full accent-orange-600"
                />
              </div>
            </div>

            {/* CARD 3: Financial & Household Background */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
                  <IndianRupee className="size-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">3. Household Financials & Statutory Assets</h4>
                  <p className="text-xs text-slate-500">Evaluates legal income limits & welfare criteria</p>
                </div>
              </div>

              {/* Income Slider */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700">Annual Family Income:</span>
                  <span className="font-mono font-bold text-emerald-700 text-sm">
                    ₹{profile.annualFamilyIncome.toLocaleString("en-IN")}
                  </span>
                </div>
                <input
                  type="range"
                  min={30000}
                  max={1000000}
                  step={10000}
                  value={profile.annualFamilyIncome}
                  onChange={(e) =>
                    onProfileChange({ ...profile, annualFamilyIncome: Number(e.target.value) })
                  }
                  className="w-full accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>₹30K (BPL)</span>
                  <span>₹1.2L (CMCHIS Cap)</span>
                  <span>₹2.5L (PMS Cap)</span>
                  <span>₹8.0L (EWS Cap)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Electricity Units (for KMUT) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Annual Electricity (Units/Yr)
                  </label>
                  <input
                    type="number"
                    value={profile.electricityUnitsPerYear || 1800}
                    onChange={(e) =>
                      onProfileChange({ ...profile, electricityUnitsPerYear: Number(e.target.value) })
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white p-2 text-xs text-slate-800 focus:border-orange-500 focus:outline-hidden"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">&lt; 3,600 units for KMUT</span>
                </div>

                {/* Agricultural Land */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Agri Land Owned (Acres)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={profile.agriculturalLandAcres}
                    onChange={(e) =>
                      onProfileChange({ ...profile, agriculturalLandAcres: Number(e.target.value) })
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white p-2 text-xs text-slate-800 focus:border-orange-500 focus:outline-hidden"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">&le; 5.0 acres for EWS/KMUT</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Hosteller vs Day Scholar */}
                <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.isHosteller}
                    onChange={(e) => onProfileChange({ ...profile, isHosteller: e.target.checked })}
                    className="rounded text-orange-600 focus:ring-orange-500"
                  />
                  <span>Hosteller (Living in College Hostel)</span>
                </label>

                {/* Dual scholarship warning */}
                <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.isAlreadyReceivingOtherScholarship}
                    onChange={(e) =>
                      onProfileChange({
                        ...profile,
                        isAlreadyReceivingOtherScholarship: e.target.checked,
                      })
                    }
                    className="rounded text-orange-600 focus:ring-orange-500"
                  />
                  <span>Already Availing Other Scholarship</span>
                </label>
              </div>
            </div>

            {/* CARD 4: Held Documents & Prerequisite Checklist */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div className="rounded-lg bg-amber-100 p-2 text-amber-600">
                  <ShieldCheck className="size-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">4. Held Documents & Physical Certificates</h4>
                  <p className="text-xs text-slate-500">Check what you currently hold to detect roadblocks</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {[
                  { id: "Caste_Certificate", label: "Caste / Community Certificate (BC / MBC / SC / ST via e-Sevai / Tahsildar)" },
                  { id: "Income_Certificate", label: "Income Certificate (Current FY 2026-27 via e-Sevai / Tehsildar)" },
                  { id: "TN_First_Graduate_Cert", label: "First Graduate Certificate (TNeGA e-Sevai signed)" },
                  { id: "Govt_School_Bonafide", label: "Class 6th-12th Government School Study Bonafide (Headmaster sealed)" },
                  { id: "Domicile_Certificate", label: "Nativity / Domicile Certificate (PRC)" },
                  { id: "Aadhaar_NPCI_Seeded", label: "Bank Account Seeded on NPCI DBT Mapper" },
                ].map((doc) => {
                  const isChecked = (profile.heldDocuments || []).includes(doc.id);
                  return (
                    <label
                      key={doc.id}
                      className={`flex items-center gap-2.5 rounded-lg border p-2.5 text-xs cursor-pointer transition-all ${
                        isChecked
                          ? "border-emerald-400 bg-emerald-50 text-emerald-950 font-semibold"
                          : "border-slate-200 bg-slate-50 text-slate-700"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleHeldDocToggle(doc.id)}
                        className="rounded text-emerald-600 focus:ring-emerald-500 size-4"
                      />
                      <span>{doc.label}</span>
                    </label>
                  );
                })}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveView("RESULTS")}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-xs font-bold text-white hover:bg-black transition-all cursor-pointer shadow-xs"
                >
                  <Sparkles className="size-4 text-amber-300" />
                  <span>Evaluate My Profile Against All Schemes ➔</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: SCHEME EVALUATION RESULTS (FULL-WIDTH, IN-DEPTH, NO CLUTTER)     */}
      {/* ========================================================================= */}
      {activeView === "RESULTS" && (
        <div className="space-y-6">
          {/* Summary Card with One-Click Edit Banner */}
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900 via-slate-950 to-indigo-950 p-6 text-white shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-orange-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    {profile.state} Civic Registry
                  </span>
                  <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-medium text-slate-200">
                    {isTamilNadu ? `${profile.tnCommunity || "MBC"} Community` : profile.category}
                  </span>
                  {profile.studiedInGovtSchool6To12 && (
                    <span className="rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold">
                      Govt School (6-12)
                    </span>
                  )}
                  {profile.isFirstGraduateInFamily && (
                    <span className="rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 text-[10px] font-bold">
                      First Graduate
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold tracking-tight">
                  {profile.name || "Candidate"}: {eligibleCount} Schemes Legally Qualified
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                  Evaluated with AWS Cedar deterministic policies across {evaluationResults.length} real central & state schemes. Review approved benefits, detect missing prerequisite roadblocks, and launch your step-by-step roadmap.
                </p>
              </div>

              {/* Action stats */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-xl bg-white/10 p-3 text-center min-w-[90px] border border-white/10">
                  <span className="text-xl font-extrabold text-emerald-400 block">{eligibleCount}</span>
                  <span className="text-[10px] text-slate-300 uppercase font-semibold">Eligible</span>
                </div>
                <div className="rounded-xl bg-white/10 p-3 text-center min-w-[90px] border border-white/10">
                  <span className="text-xl font-extrabold text-rose-400 block">{ineligibleCount}</span>
                  <span className="text-[10px] text-slate-300 uppercase font-semibold">Ineligible</span>
                </div>
                <button
                  onClick={() => setActiveView("PROFILE")}
                  className="flex items-center gap-1.5 rounded-xl bg-orange-600 px-4 py-3 text-xs font-bold text-white hover:bg-orange-700 transition-colors cursor-pointer shadow-sm"
                >
                  <span>Edit Profile</span>
                  <Sliders className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Tabs Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white p-3 border border-slate-200 shadow-xs">
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium">
              <button
                onClick={() => setFilterType("ALL")}
                className={`rounded-lg px-3 py-1.5 cursor-pointer transition-all ${
                  filterType === "ALL" ? "bg-slate-900 text-white font-bold" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                All Schemes ({evaluationResults.length})
              </button>

              <button
                onClick={() => setFilterType("ELIGIBLE")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 cursor-pointer transition-all ${
                  filterType === "ELIGIBLE" ? "bg-emerald-600 text-white font-bold" : "text-emerald-800 bg-emerald-50 hover:bg-emerald-100"
                }`}
              >
                <CheckCircle2 className="size-3.5" />
                <span>Eligible Only ({eligibleCount})</span>
              </button>

              {isTamilNadu && (
                <button
                  onClick={() => setFilterType("STATE_TN")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 cursor-pointer transition-all ${
                    filterType === "STATE_TN" ? "bg-orange-600 text-white font-bold" : "text-orange-800 bg-orange-50 hover:bg-orange-100"
                  }`}
                >
                  <Building2 className="size-3.5" />
                  <span>Tamil Nadu Flagship</span>
                </button>
              )}

              <button
                onClick={() => setFilterType("HEALTHCARE")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 cursor-pointer transition-all ${
                  filterType === "HEALTHCARE" ? "bg-teal-700 text-white font-bold" : "text-teal-800 bg-teal-50 hover:bg-teal-100"
                }`}
              >
                <Hospital className="size-3.5" />
                <span>Medical Relief</span>
              </button>

              <button
                onClick={() => setFilterType("SCHOLARSHIP")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 cursor-pointer transition-all ${
                  filterType === "SCHOLARSHIP" ? "bg-blue-600 text-white font-bold" : "text-blue-800 bg-blue-50 hover:bg-blue-100"
                }`}
              >
                <GraduationCap className="size-3.5" />
                <span>Scholarships</span>
              </button>

              <button
                onClick={() => setFilterType("CERTIFICATE")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 cursor-pointer transition-all ${
                  filterType === "CERTIFICATE" ? "bg-purple-600 text-white font-bold" : "text-purple-800 bg-purple-50 hover:bg-purple-100"
                }`}
              >
                <ShieldCheck className="size-3.5" />
                <span>Certificates</span>
              </button>
            </div>

            <span className="text-xs text-slate-500">
              Showing {filteredResults.length} schemes
            </span>
          </div>

          {/* Scheme Cards Grid */}
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
                      : "border-slate-200 bg-slate-50/70 opacity-85"
                  }`}
                >
                  <div className="p-5 sm:p-6">
                    {/* Top Row: Ministry, Short Code & Status Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <Building2 className="size-3.5 text-slate-400 shrink-0" />
                        <span className="truncate max-w-[280px] sm:max-w-md">{result.scheme.ministry}</span>
                        <span className="text-slate-300">•</span>
                        <span className="font-mono text-[10px] text-slate-700 bg-slate-100 rounded px-1.5 py-0.5 font-bold">
                          {result.scheme.shortCode}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[11px] text-slate-600">
                          {result.scheme.level} Scheme
                        </span>
                      </div>

                      <div>
                        {isAllowed ? (
                          hasMissingPrereqs ? (
                            <span className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800 border border-amber-300">
                              <AlertTriangle className="size-3.5 text-amber-600" />
                              QUALIFIED (BLOCKED BY MISSING DOCS)
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                              <CheckCircle2 className="size-3.5 text-emerald-600" />
                              ELIGIBLE (READY TO APPLY)
                            </span>
                          )
                        ) : (
                          <span className="flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700 border border-rose-200">
                            <XCircle className="size-3.5 text-rose-600" />
                            INELIGIBLE (CRITERIA UNMET)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="mt-2 text-lg font-bold text-slate-900">
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
                          Deadline: <strong>{result.scheme.deadline}</strong> ({result.scheme.daysRemaining} days remaining)
                        </span>
                      </div>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-slate-700">
                      {result.scheme.benefitDescription}
                    </p>

                    {/* MISSING PREREQUISITES / ROADBLOCK BOX */}
                    {isAllowed && hasMissingPrereqs && (
                      <div className="mt-3.5 rounded-xl border border-amber-300 bg-amber-50/90 p-4 text-xs space-y-1.5">
                        <div className="flex items-center gap-2 text-amber-950 font-bold">
                          <AlertTriangle className="size-4 text-amber-700 shrink-0" />
                          <span>Action Required to Complete Application:</span>
                        </div>
                        <p className="font-normal text-amber-900 leading-relaxed">
                          You meet the primary criteria! However, government submission is currently blocked because you have not obtained:{" "}
                          <strong>
                            {result.missingPrerequisites.map((p) => p.title).join(", ")}
                          </strong>.
                        </p>
                        <div className="pt-1">
                          <button
                            onClick={onNavigateToDocuments}
                            className="inline-flex items-center gap-1 text-xs font-bold text-amber-950 underline hover:text-amber-800 cursor-pointer"
                          >
                            Resolve this in Document Audit ➔
                          </button>
                        </div>
                      </div>
                    )}

                    {/* REASONS / OBJECTIONS BOX FOR INELIGIBLE SCHEMES */}
                    {!isAllowed && (
                      <div className="mt-3.5 rounded-xl border border-rose-200 bg-rose-50/60 p-4 text-xs space-y-1.5">
                        <div className="flex items-center gap-2 text-rose-950 font-bold">
                          <XCircle className="size-4 text-rose-600 shrink-0" />
                          <span>Objections / Why You Are Ineligible:</span>
                        </div>
                        <ul className="space-y-1 list-disc list-inside text-rose-900 text-[11px]">
                          {result.failedClauses.map((clause, i) => (
                            <li key={i} className="font-semibold">{clause}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Audit Trail Clauses */}
                    <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3">
                      <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        Statutory Clause Audit:
                      </span>
                      {result.passedClauses.map((clause, i) => (
                        <p key={i} className="flex items-center gap-1.5 text-xs text-emerald-700">
                          <CheckCircle2 className="size-3 text-emerald-500 shrink-0" />
                          <span>{clause}</span>
                        </p>
                      ))}
                    </div>

                    {/* Collapsible Cedar Policy */}
                    {isExpanded && (
                      <div className="mt-4 rounded-xl border border-indigo-200 bg-indigo-950 p-4 font-mono text-xs text-indigo-200">
                        <div className="flex items-center justify-between border-b border-indigo-800 pb-2 text-[11px] text-indigo-400">
                          <span>AWS Cedar Deterministic Policy Specification</span>
                          <span className="rounded bg-indigo-900 px-1.5 py-0.5 text-[10px] text-indigo-300">
                            Formal Verification
                          </span>
                        </div>
                        <pre className="mt-2 overflow-x-auto whitespace-pre leading-relaxed text-[11px]">
                          {result.cedarPolicySnippet}
                        </pre>
                        <div className="mt-2 text-[10px] text-indigo-400">
                          Official Gazette Reference: {result.scheme.officialGazetteRef}
                        </div>
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                      <button
                        onClick={() => togglePolicyView(result.scheme.id)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                      >
                        <Code2 className="size-3.5" />
                        <span>{isExpanded ? "Hide Cedar Policy" : "Inspect Cedar Policy"}</span>
                        {isExpanded ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
                      </button>

                      <div className="flex flex-wrap items-center gap-2">
                        {onNavigateToRoadmap && (
                          <button
                            onClick={() => onNavigateToRoadmap(result.scheme.id)}
                            className="flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer"
                          >
                            <Layers className="size-3.5 text-indigo-600" />
                            <span>View Specific Roadmap</span>
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
      )}
    </div>
  );
};
