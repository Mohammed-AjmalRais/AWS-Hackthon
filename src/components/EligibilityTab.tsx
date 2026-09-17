"use client";

import React, { useState, useEffect } from "react";
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
  Hospital,
  ListTodo,
  FileText,
  MapPin,
  HelpCircle
} from "lucide-react";
import { DEMO_PERSONAS, DemoPersona } from "@/data/demoPersonas";
import { SchemeCockpitModal } from "@/components/SchemeCockpitModal";
import { CertificateResolutionModal } from "@/components/CertificateResolutionModal";

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
  // Requirement 3: Default to Profile Setup on entry so user fills details first
  const [activeView, setActiveView] = useState<"PROFILE" | "RESULTS">("PROFILE");

  // Requirement 4: Classify into Eligible vs Not Eligible
  const [eligibilityTab, setEligibilityTab] = useState<"ELIGIBLE" | "NOT_ELIGIBLE">("ELIGIBLE");

  // Category filter
  const [categoryFilter, setCategoryFilter] = useState<
    "ALL" | "STATE_SPECIFIC" | "CENTRAL" | "SCHOLARSHIP" | "HEALTHCARE" | "CERTIFICATE"
  >("ALL");

  const [expandedCedarPolicy, setExpandedCedarPolicy] = useState<string | null>(null);

  // Modals for Individual Scheme Cockpit & Missing Certificate Sub-Tree
  const [selectedCockpitResult, setSelectedCockpitResult] = useState<CedarEvaluationResult | null>(null);
  const [selectedCertGuideId, setSelectedCertGuideId] = useState<string | null>(null);

  // Persona loading
  const handleSelectPersona = (persona: DemoPersona) => {
    onProfileChange(persona.profile);
  };

  const isTamilNadu = profile.state === "Tamil Nadu";
  const isAndhraPradesh = profile.state === "Andhra Pradesh";

  const handleResetToBlank = () => {
    onProfileChange({
      name: "",
      category: "General",
      tnCommunity: "None",
      apCommunity: "None",
      gender: "Female",
      isMinority: false,
      minorityCommunity: "None",
      isPersonWithDisability: false,
      disabilityPercentage: 0,
      isOrphanOrSingleParent: false,
      state: "Andhra Pradesh",
      district: "",
      residenceYearsInState: 10,
      isStudyingInHomeState: true,
      educationLevel: "UG",
      courseType: "Regular Full-Time",
      isTechnicalCourse: true,
      admissionQuota: "Merit/Govt Counseling",
      institutionType: "Government",
      studiedInGovtSchool6To12: false,
      isFirstGraduateInFamily: false,
      marksPercentage: 75,
      isHosteller: false,
      annualFamilyIncome: 150000,
      electricityUnitsPerYear: 1800,
      numberOfSiblingsAvailingScholarship: 0,
      agriculturalLandAcres: 0,
      residentialFlatSqFt: 0,
      hasPaternalCasteRecord: true,
      hasValidAddressProof: true,
      isAlreadyReceivingOtherScholarship: false,
      heldDocuments: ["Aadhaar_Card", "Marksheet_10_12", "Bank_Passbook"],
    });
  };

  // Split results into Eligible vs Not Eligible
  const eligibleResults = evaluationResults.filter((r) => r.decision === "ALLOW");
  const ineligibleResults = evaluationResults.filter((r) => r.decision !== "ALLOW");

  const activeClassificationResults =
    eligibilityTab === "ELIGIBLE" ? eligibleResults : ineligibleResults;

  // Filter based on category
  const displayedResults = activeClassificationResults.filter((r) => {
    if (categoryFilter === "STATE_SPECIFIC") {
      return r.scheme.level === "State";
    }
    if (categoryFilter === "CENTRAL") {
      return r.scheme.level === "Central";
    }
    if (categoryFilter === "SCHOLARSHIP") {
      return r.scheme.type === "scholarship";
    }
    if (categoryFilter === "HEALTHCARE") {
      return r.scheme.type === "healthcare";
    }
    if (categoryFilter === "CERTIFICATE") {
      return r.scheme.type === "certificate";
    }
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

  const handleMarkCertObtained = (certId: string) => {
    const currentHeld = new Set(profile.heldDocuments || []);
    currentHeld.add(certId);
    onProfileChange({
      ...profile,
      heldDocuments: Array.from(currentHeld),
    });
  };

  return (
    <div className="space-y-6">
      {/* Top View Navigation Bar */}
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
            <span>2. Scheme Classification & Evaluation</span>
            <span className="rounded-full bg-orange-700 px-2 py-0.5 text-[10px] text-orange-100">
              {eligibleResults.length} Eligible
            </span>
          </button>
        </div>

        {/* Quick Snapshot in Header */}
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
            {activeView === "PROFILE" ? "Check Schemes ➔" : "Edit Profile ✏️"}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: DEDICATED CITIZEN PROFILE SETUP (STATE-AWARE & SUFFICIENT)        */}
      {/* ========================================================================= */}
      {activeView === "PROFILE" && (
        <div className="space-y-6">
          {/* State Scope Live Banner */}
          <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 via-slate-50 to-orange-50/40 p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-indigo-100 px-2.5 py-0.5 font-mono text-[10px] font-bold text-indigo-800 uppercase">
                    Step 1: Citizen Profile Setup
                  </span>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                    Evaluating Constant Central + Top Active {profile.state} Schemes
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  Citizen Profile & Eligibility Parameters
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enter your official particulars below. The system checks all top active Central Government schemes alongside {profile.state}&apos;s flagship state programs using deterministic AWS Cedar policies—with zero AI hallucination.
                </p>
              </div>

              <button
                onClick={() => setActiveView("RESULTS")}
                className="flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-3.5 text-xs font-black text-white shadow-md hover:bg-orange-700 transition-all cursor-pointer shrink-0"
              >
                <span>Check My Eligibility</span>
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>

          {/* Quick-Fill Verified Personas Bar */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-orange-500" />
                  Select Demo Persona OR Enter Custom Client Details
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">Click a verified profile or start fresh to enter custom citizen parameters</p>
              </div>

              <button
                onClick={handleResetToBlank}
                className="flex items-center gap-1.5 rounded-xl border border-dashed border-orange-300 bg-orange-50/70 px-3 py-1.5 text-xs font-bold text-orange-800 hover:bg-orange-100 cursor-pointer shadow-2xs transition-all shrink-0"
              >
                <RotateCcw className="size-3 text-orange-600" />
                <span>Clear Form / Custom Client Entry</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 pt-1">
              {DEMO_PERSONAS.map((persona) => (
                <button
                  key={persona.id}
                  onClick={() => handleSelectPersona(persona)}
                  className={`flex flex-col text-left rounded-xl p-3 border transition-all cursor-pointer ${
                    profile.name === persona.profile.name
                      ? "border-orange-500 bg-orange-50/50 shadow-2xs"
                      : "border-slate-200 bg-slate-50/60 hover:bg-slate-100 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{persona.name}</span>
                    <span className="text-[9px] font-mono rounded bg-slate-200 px-1 py-0.5 text-slate-700 font-bold">
                      {persona.profile.state}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 line-clamp-1">{persona.tagline}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4-Card Sufficient Profile Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CARD 1: Social Identity & Location */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div className="rounded-lg bg-orange-100 p-2 text-orange-600">
                  <User className="size-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">1. Social Identity & State Domicile</h4>
                  <p className="text-xs text-slate-500">Determines state vs central welfare quotas</p>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={profile.name || ""}
                  onChange={(e) => onProfileChange({ ...profile, name: e.target.value })}
                  placeholder="e.g. Sravani Reddy / Kavitha Selvam"
                  className="w-full rounded-lg border border-slate-300 bg-white p-2 text-xs text-slate-800 focus:border-orange-500 focus:outline-hidden font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* State Domicile */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">State Domicile</label>
                  <select
                    value={profile.state}
                    onChange={(e) => onProfileChange({ ...profile, state: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 bg-white p-2 text-xs font-bold text-orange-700 focus:border-orange-500 focus:outline-hidden"
                  >
                    <option value="Andhra Pradesh">Andhra Pradesh (11 State Schemes Active)</option>
                    <option value="Tamil Nadu">Tamil Nadu (11 State Schemes Active)</option>
                    <option value="Jharkhand">Jharkhand (Tribal Welfare Active)</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="National">All States / Central Focus</option>
                  </select>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                  <select
                    value={profile.gender}
                    onChange={(e) =>
                      onProfileChange({ ...profile, gender: e.target.value as UserProfile["gender"] })
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white p-2 text-xs text-slate-800 focus:border-orange-500 focus:outline-hidden"
                  >
                    <option value="Female">Female (Pudhumai Penn / Pragati / Amma Vodi)</option>
                    <option value="Male">Male (Tamil Pudhalvan / General)</option>
                    <option value="Other">Other / Transgender</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Community Category */}
              {isTamilNadu ? (
                <div className="rounded-xl border border-orange-200 bg-orange-50/50 p-3 space-y-2">
                  <label className="block text-xs font-bold text-orange-950">
                    Tamil Nadu Community Category (Reservation Quota)
                  </label>
                  <select
                    value={profile.tnCommunity || "BC"}
                    onChange={(e) =>
                      onProfileChange({
                        ...profile,
                        tnCommunity: e.target.value as UserProfile["tnCommunity"],
                        category:
                          e.target.value === "ST"
                            ? "ST"
                            : ["SC", "SCA"].includes(e.target.value)
                            ? "SC"
                            : ["BC", "BCM", "MBC", "DNC"].includes(e.target.value)
                            ? "OBC"
                            : "General",
                      })
                    }
                    className="w-full rounded-lg border border-orange-300 bg-white p-2 text-xs font-bold text-slate-900 focus:border-orange-500 focus:outline-hidden"
                  >
                    <option value="MBC">MBC - Most Backward Class (100% Free UG Tuition)</option>
                    <option value="DNC">DNC - De-Notified Community (100% Free UG Tuition)</option>
                    <option value="BC">BC - Backward Class</option>
                    <option value="BCM">BCM - Backward Class Muslim</option>
                    <option value="SC">SC - Scheduled Caste (Adi Dravidar Post-Matric)</option>
                    <option value="SCA">SCA - SC Arunthathiyar</option>
                    <option value="ST">ST - Scheduled Tribe (Tribal Welfare 100% Waiver)</option>
                    <option value="OC">OC - Open Category / General</option>
                  </select>
                  <p className="text-[10px] text-orange-800">
                    MBC/DNC students in 3-yr degree courses receive 100% free tuition with zero income limit under TN Govt orders.
                  </p>
                </div>
              ) : isAndhraPradesh ? (
                <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-3 space-y-2">
                  <label className="block text-xs font-bold text-teal-950">
                    Andhra Pradesh Social Category (MeeSeva / Navasakam Quota)
                  </label>
                  <select
                    value={profile.apCommunity || "BC-A"}
                    onChange={(e) =>
                      onProfileChange({
                        ...profile,
                        apCommunity: e.target.value as UserProfile["apCommunity"],
                        category:
                          e.target.value === "ST"
                            ? "ST"
                            : e.target.value === "SC"
                            ? "SC"
                            : ["BC-A", "BC-B", "BC-C", "BC-D", "BC-E", "Kapu", "EBC"].includes(e.target.value)
                            ? "OBC"
                            : "General",
                      })
                    }
                    className="w-full rounded-lg border border-teal-300 bg-white p-2 text-xs font-bold text-slate-900 focus:border-orange-500 focus:outline-hidden"
                  >
                    <option value="BC-A">BC-A (Aboriginal Tribes & Nomadic Groups - 100% RTF)</option>
                    <option value="BC-B">BC-B (Occupational / Artisan Groups - 100% RTF)</option>
                    <option value="BC-C">BC-C (Scheduled Caste Converts to Christianity - 100% RTF)</option>
                    <option value="BC-D">BC-D (Other Backward Classes - 100% RTF)</option>
                    <option value="BC-E">BC-E (Socially & Educationally Backward Muslims - 100% RTF)</option>
                    <option value="SC">SC (Scheduled Caste - 100% RTF + Vasathi Deevena)</option>
                    <option value="ST">ST (Scheduled Tribe - 100% RTF + Vasathi Deevena)</option>
                    <option value="Kapu">Kapu / Telaga / Balija (Kapu Nestham & Jnanabhumi)</option>
                    <option value="EBC">EBC (Economically Backward Classes)</option>
                    <option value="OC">OC (Open Category / General)</option>
                  </select>
                  <p className="text-[10px] text-teal-800">
                    Eligible for Jagananna Vidya Deevena (100% Fee Reimbursement) and Vasathi Deevena (₹20,000 MTF) under AP Navasakam guidelines.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">National Category</label>
                    <select
                      value={profile.category}
                      onChange={(e) =>
                        onProfileChange({ ...profile, category: e.target.value as UserProfile["category"] })
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white p-2 text-xs font-semibold text-slate-800 focus:border-orange-500 focus:outline-hidden"
                    >
                      <option value="ST">ST (Scheduled Tribe)</option>
                      <option value="SC">SC (Scheduled Caste)</option>
                      <option value="OBC">OBC (Other Backward Class)</option>
                      <option value="EWS">EWS (Economically Weaker)</option>
                      <option value="General">General (Open Merit)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Minority Religion</label>
                    <select
                      value={profile.minorityCommunity || "None"}
                      onChange={(e) =>
                        onProfileChange({
                          ...profile,
                          isMinority: e.target.value !== "None",
                          minorityCommunity: e.target.value as UserProfile["minorityCommunity"],
                        })
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white p-2 text-xs text-slate-800 focus:border-orange-500 focus:outline-hidden"
                    >
                      <option value="None">Not Applicable</option>
                      <option value="Muslim">Muslim</option>
                      <option value="Christian">Christian</option>
                      <option value="Sikh">Sikh</option>
                      <option value="Buddhist">Buddhist</option>
                      <option value="Jain">Jain</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Disability Checkbox */}
              <div className="flex items-center gap-3 pt-1">
                <label className="flex items-center gap-2 text-xs text-slate-700 font-medium cursor-pointer">
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
                    className="size-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
                  />
                  <span>Person with Benchmark Disability (PwD &ge; 40%)</span>
                </label>
              </div>
            </div>

            {/* CARD 2: Academic & Schooling Particulars */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                  <GraduationCap className="size-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">2. Academic & Schooling Background</h4>
                  <p className="text-xs text-slate-500">Crucial for 7.5% Quota, Pudhumai Penn & First Graduate</p>
                </div>
              </div>

              {/* Statutory Schooling Checkboxes (Highlights of User Perspective) */}
              <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-3.5 space-y-2.5">
                <label className="flex items-start gap-2.5 text-xs text-blue-950 font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.studiedInGovtSchool6To12 || false}
                    onChange={(e) =>
                      onProfileChange({ ...profile, studiedInGovtSchool6To12: e.target.checked })
                    }
                    className="size-4.5 rounded border-blue-400 text-blue-600 focus:ring-blue-500 mt-0.5 cursor-pointer"
                  />
                  <div>
                    <span>Studied continuously in Government School (Class 6 to 12)</span>
                    <p className="text-[10px] font-normal text-blue-800">
                      Mandatory for ₹1,000/mo Pudhumai Penn (girls), Tamil Pudhalvan (boys), and 7.5% Full Tuition Waiver Quota.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 text-xs text-blue-950 font-bold cursor-pointer pt-1 border-t border-blue-200/70">
                  <input
                    type="checkbox"
                    checked={profile.isFirstGraduateInFamily || false}
                    onChange={(e) =>
                      onProfileChange({ ...profile, isFirstGraduateInFamily: e.target.checked })
                    }
                    className="size-4.5 rounded border-blue-400 text-blue-600 focus:ring-blue-500 mt-0.5 cursor-pointer"
                  />
                  <div>
                    <span>First Graduate in Immediate Family (Mudhal Thalaimurai)</span>
                    <p className="text-[10px] font-normal text-blue-800">
                      Entitles to ₹25,000 to ₹30,000/yr tuition fee concession in professional college admissions.
                    </p>
                  </div>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Education Level */}
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
                    className="w-full rounded-lg border border-slate-300 bg-white p-2 text-xs font-semibold text-slate-800 focus:border-orange-500 focus:outline-hidden"
                  >
                    <option value="UG">Undergraduate (B.E. / B.Tech / MBBS / B.Sc / B.A)</option>
                    <option value="Diploma">Polytechnic / Diploma</option>
                    <option value="11th">Class 11</option>
                    <option value="12th">Class 12</option>
                    <option value="PG">Postgraduate (M.E. / M.Tech / M.Sc / M.A)</option>
                    <option value="PhD">PhD / Research</option>
                  </select>
                </div>

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
                    <option value="Merit/Govt Counseling">Single Window Merit (TNEA / Govt Counseling)</option>
                    <option value="Management/Direct">Management / Direct Quota (Disqualified by Law)</option>
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
                  className="w-full accent-orange-600 cursor-pointer"
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
                  <p className="text-xs text-slate-500">Evaluates statutory income ceilings and welfare criteria</p>
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
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>₹30K (BPL)</span>
                  <span>₹1.2L (CMCHIS Cap)</span>
                  <span>₹2.5L (PMS Cap)</span>
                  <span>₹8.0L (EWS Cap)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Electricity Units */}
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
                  <span className="text-[10px] text-slate-400 mt-0.5 block">&lt; 3,600 units for KMUT DBT</span>
                </div>

                {/* Hosteller vs Day Scholar */}
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 text-xs text-slate-700 font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.isHosteller}
                      onChange={(e) => onProfileChange({ ...profile, isHosteller: e.target.checked })}
                      className="size-4 rounded text-orange-600 focus:ring-orange-500 cursor-pointer"
                    />
                    <span>Living in College Hostel (Higher Stipend)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* CARD 4: Currently Held Certificates & Documents */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-purple-100 p-2 text-purple-600">
                    <FileCheck className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">4. Currently Held Documents & Certificates</h4>
                    <p className="text-xs text-slate-500">Uncheck to test missing prerequisite roadblocks</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2 py-1 rounded-md">
                  {profile.heldDocuments?.length || 0} Held
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  { id: "Aadhaar_Card", label: "Aadhaar Card (Linked Mobile)" },
                  { id: "Marksheet_10_12", label: "10th & 12th Board Marksheet" },
                  { id: "Bank_Passbook", label: "Aadhaar-Seeded Bank Passbook" },
                  { id: "Ration_Card", label: "Family Smart Ration Card" },
                  { id: "Caste_Certificate", label: "Community / Caste Certificate" },
                  { id: "Income_Certificate", label: "Current FY Income Certificate" },
                  { id: "Domicile_Certificate", label: "Nativity / Domicile Certificate" },
                  { id: "TN_First_Graduate_Cert", label: "First Graduate Cert (REV-104)" },
                  { id: "Govt_School_Study_Certificate", label: "Govt School 6-12 Bonafide" },
                ].map((doc) => {
                  const isHeld = (profile.heldDocuments || []).includes(doc.id);
                  return (
                    <label
                      key={doc.id}
                      className={`flex items-center gap-2 rounded-xl border p-2.5 cursor-pointer transition-all ${
                        isHeld
                          ? "border-purple-300 bg-purple-50/60 font-semibold text-purple-950"
                          : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isHeld}
                        onChange={() => handleHeldDocToggle(doc.id)}
                        className="size-4 rounded text-purple-600 focus:ring-purple-500 cursor-pointer"
                      />
                      <span className="truncate">{doc.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Action Footer for Profile Setup */}
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold">Profile Ready for Complete Eligibility Audit</h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Clicking evaluate will screen {evaluationResults.length} Central and {profile.state} state schemes with exact reasons.
              </p>
            </div>
            <button
              onClick={() => setActiveView("RESULTS")}
              className="flex items-center gap-2 rounded-xl bg-orange-500 px-7 py-3.5 text-xs font-black text-white hover:bg-orange-600 shadow-sm transition-all cursor-pointer shrink-0"
            >
              <span>View Scheme Evaluation Results</span>
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: SCHEME CLASSIFICATION & EVALUATION (ELIGIBLE VS NOT ELIGIBLE)      */}
      {/* ========================================================================= */}
      {activeView === "RESULTS" && (
        <div className="space-y-6">
          {/* Top Classification Summary Banner */}
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 text-white shadow-md">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold">
                    {profile.state} Citizen Profile
                  </span>
                  <span className="rounded-md bg-white/10 text-slate-200 px-2 py-0.5 text-[10px] font-bold">
                    {isTamilNadu ? profile.tnCommunity : profile.category}
                  </span>
                  {profile.studiedInGovtSchool6To12 && (
                    <span className="rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 text-[10px] font-bold">
                      Govt School (6-12)
                    </span>
                  )}
                  {profile.isFirstGraduateInFamily && (
                    <span className="rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold">
                      First Graduate
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                  {profile.name || "Candidate"}: {eligibleResults.length} Schemes Legally Qualified
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                  Evaluated across top Central and {profile.state} schemes with AWS Cedar deterministic policies. Every scheme card shows why you qualified or the exact legal clause failed.
                </p>
              </div>

              {/* Classification Action Pills */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setEligibilityTab("ELIGIBLE")}
                  className={`rounded-2xl p-4 text-center min-w-[120px] border transition-all cursor-pointer ${
                    eligibilityTab === "ELIGIBLE"
                      ? "bg-emerald-600/30 border-emerald-400 text-white shadow-xs"
                      : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                  }`}
                >
                  <span className="text-2xl font-black text-emerald-400 block">{eligibleResults.length}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider">Eligible Schemes</span>
                </button>

                <button
                  onClick={() => setEligibilityTab("NOT_ELIGIBLE")}
                  className={`rounded-2xl p-4 text-center min-w-[120px] border transition-all cursor-pointer ${
                    eligibilityTab === "NOT_ELIGIBLE"
                      ? "bg-rose-600/30 border-rose-400 text-white shadow-xs"
                      : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                  }`}
                >
                  <span className="text-2xl font-black text-rose-400 block">{ineligibleResults.length}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider">Not Eligible</span>
                </button>

                <button
                  onClick={() => setActiveView("PROFILE")}
                  className="rounded-2xl bg-orange-600 p-4 text-center text-xs font-black text-white hover:bg-orange-700 transition-all cursor-pointer shrink-0"
                >
                  <Sliders className="size-5 mx-auto mb-1" />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filter Chips Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-3 border border-slate-200 shadow-xs">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
              <button
                onClick={() => setCategoryFilter("ALL")}
                className={`rounded-xl px-3.5 py-2 cursor-pointer transition-all font-bold ${
                  categoryFilter === "ALL"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                All {eligibilityTab === "ELIGIBLE" ? "Eligible" : "Ineligible"} ({activeClassificationResults.length})
              </button>

              <button
                onClick={() => setCategoryFilter("STATE_SPECIFIC")}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 cursor-pointer transition-all font-bold ${
                  categoryFilter === "STATE_SPECIFIC"
                    ? "bg-orange-600 text-white"
                    : "text-orange-800 bg-orange-50 hover:bg-orange-100"
                }`}
              >
                <Building2 className="size-3.5" />
                <span>{profile.state} State Schemes</span>
              </button>

              <button
                onClick={() => setCategoryFilter("CENTRAL")}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 cursor-pointer transition-all font-bold ${
                  categoryFilter === "CENTRAL"
                    ? "bg-purple-600 text-white"
                    : "text-purple-800 bg-purple-50 hover:bg-purple-100"
                }`}
              >
                <Landmark className="size-3.5" />
                <span>Central Government</span>
              </button>

              <button
                onClick={() => setCategoryFilter("HEALTHCARE")}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 cursor-pointer transition-all font-bold ${
                  categoryFilter === "HEALTHCARE"
                    ? "bg-teal-700 text-white"
                    : "text-teal-800 bg-teal-50 hover:bg-teal-100"
                }`}
              >
                <Hospital className="size-3.5" />
                <span>Medical Relief</span>
              </button>

              <button
                onClick={() => setCategoryFilter("SCHOLARSHIP")}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 cursor-pointer transition-all font-bold ${
                  categoryFilter === "SCHOLARSHIP"
                    ? "bg-blue-600 text-white"
                    : "text-blue-800 bg-blue-50 hover:bg-blue-100"
                }`}
              >
                <GraduationCap className="size-3.5" />
                <span>Scholarships</span>
              </button>
            </div>

            <span className="text-xs text-slate-500 font-semibold pr-2">
              Showing {displayedResults.length} schemes
            </span>
          </div>

          {/* Scheme Cards List */}
          <div className="space-y-4">
            {displayedResults.map((result) => {
              const isAllowed = result.decision === "ALLOW";
              const isExpanded = expandedCedarPolicy === result.scheme.id;
              const hasMissingPrereqs = result.missingPrerequisites.length > 0;

              return (
                <div
                  key={result.scheme.id}
                  className={`rounded-3xl border transition-all ${
                    isAllowed
                      ? "border-slate-200 bg-white shadow-xs hover:border-orange-300"
                      : "border-slate-200 bg-slate-50/70"
                  }`}
                >
                  <div className="p-6">
                    {/* Top Row: Scheme Level, Ministry, Code, and Status */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span
                          className={`rounded-md px-2 py-0.5 font-bold uppercase text-[10px] ${
                            result.scheme.level === "Central"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {result.scheme.level} Scheme
                        </span>

                        <span className="font-semibold text-slate-700">{result.scheme.ministry}</span>
                        <span className="text-slate-300">•</span>
                        <span className="font-mono text-[10px] text-slate-600 bg-slate-100 rounded px-1.5 py-0.5 font-bold">
                          {result.scheme.shortCode}
                        </span>
                      </div>

                      {/* Application End Date Badge */}
                      <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100 rounded-full px-3 py-1">
                        <Calendar className="size-3.5 text-slate-500" />
                        <span>Deadline: {result.scheme.deadline}</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-orange-600">{result.scheme.daysRemaining}d left</span>
                      </div>
                    </div>

                    {/* Scheme Title & Benefit Headline */}
                    <div className="mt-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                      <div>
                        <h4 className="text-lg font-black text-slate-900 leading-snug">
                          {result.scheme.title}
                        </h4>
                        <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                          {result.scheme.benefitDescription}
                        </p>
                      </div>

                      <div className="sm:text-right shrink-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Potential Entitlement
                        </span>
                        <span className="text-sm font-black text-emerald-600">
                          {result.estimatedBenefit}
                        </span>
                      </div>
                    </div>

                    {/* ===================================================== */}
                    {/* PRIMARY DETAILS: WHY ELIGIBLE vs WHY NOT ELIGIBLE    */}
                    {/* ===================================================== */}
                    <div className="mt-4 rounded-2xl border p-4 text-xs space-y-2.5 transition-all">
                      {isAllowed ? (
                        <div className="border-emerald-200 bg-emerald-50/50 rounded-xl p-3">
                          <div className="flex items-center gap-2 text-emerald-900 font-bold mb-2">
                            <CheckCircle2 className="size-4 text-emerald-600" />
                            <span>WHY YOU ARE ELIGIBLE (SATISFIED CRITERIA):</span>
                          </div>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-emerald-950">
                            {result.matchedReasons.map((reason, rIdx) => (
                              <li key={rIdx} className="flex items-start gap-1.5">
                                <span className="text-emerald-600 font-bold">✓</span>
                                <span className="font-medium">{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="border-rose-200 bg-rose-50/60 rounded-xl p-3">
                          <div className="flex items-center gap-2 text-rose-900 font-bold mb-2">
                            <AlertTriangle className="size-4 text-rose-600" />
                            <span>WHY NOT ELIGIBLE (FAILED STATUTORY CLAUSES):</span>
                          </div>
                          <ul className="space-y-1.5 text-rose-950">
                            {result.failedReasons.map((clause, cIdx) => (
                              <li key={cIdx} className="flex items-start gap-1.5">
                                <span className="text-rose-600 font-bold">✗</span>
                                <span className="font-semibold">{clause}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* MISSING PREREQUISITE ROADBLOCK ALERT (Amber) */}
                      {isAllowed && hasMissingPrereqs && (
                        <div className="rounded-xl border border-amber-300 bg-amber-50 p-3.5 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5 font-black text-amber-950 text-xs">
                              <AlertTriangle className="size-4 text-amber-600" />
                              PREREQUISITE ROADBLOCK: {result.missingPrerequisites.length} MANDATORY CERTIFICATE(S) MISSING
                            </span>
                            <span className="text-[10px] text-amber-800 font-semibold">
                              Must obtain before portal submission
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 pt-1">
                            {result.missingPrerequisites.map((prereq) => (
                              <button
                                key={prereq.id}
                                onClick={() => setSelectedCertGuideId(prereq.id)}
                                className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-amber-900 border border-amber-300 shadow-2xs hover:bg-amber-100 cursor-pointer"
                              >
                                <span>{prereq.title}</span>
                                <span className="rounded bg-amber-600 px-1.5 py-0.5 text-[9px] font-black text-white">
                                  Resolve Guide ➔
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => togglePolicyView(result.scheme.id)}
                          className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 cursor-pointer font-medium"
                        >
                          <Code2 className="size-3.5 text-slate-400" />
                          <span>{isExpanded ? "Hide AWS Cedar Policy" : "Inspect Cedar Policy"}</span>
                          {isExpanded ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={onNavigateToDocuments}
                          className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
                        >
                          <FileCheck className="size-3.5 text-blue-600" />
                          <span>Upload & Audit Docs</span>
                        </button>

                        {/* Primary Button: Open Scheme Cockpit */}
                        <button
                          onClick={() => setSelectedCockpitResult(result)}
                          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all cursor-pointer shadow-xs ${
                            isAllowed
                              ? "bg-orange-600 text-white hover:bg-orange-700"
                              : "bg-slate-800 text-white hover:bg-slate-900"
                          }`}
                        >
                          <ListTodo className="size-3.5 text-amber-300" />
                          <span>Open Scheme Cockpit & Action Tracker</span>
                          <ArrowRight className="size-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Expandable AWS Cedar Policy Code */}
                    {isExpanded && (
                      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-[11px] text-slate-200 shadow-inner">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                          <span className="text-orange-400 font-bold">AWS Cedar Declarative Policy Rule</span>
                          <span className="text-[10px] text-slate-400">cedar/policies/schemes.cedar</span>
                        </div>
                        <pre className="overflow-x-auto whitespace-pre leading-relaxed text-slate-300">
                          {result.cedarPolicySnippet}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: INDIVIDUAL SCHEME COCKPIT & ACTION TRACKER ("Where I Am Present") */}
      {/* ========================================================================= */}
      {selectedCockpitResult && (
        <SchemeCockpitModal
          result={selectedCockpitResult}
          onClose={() => setSelectedCockpitResult(null)}
          onOpenCertificateGuide={(certId) => setSelectedCertGuideId(certId)}
          onNavigateToDocumentsTab={onNavigateToDocuments}
        />
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: MISSING CERTIFICATE RESOLUTION SUB-TREE (Step-by-Step Guide)    */}
      {/* ========================================================================= */}
      {selectedCertGuideId && (
        <CertificateResolutionModal
          certificateId={selectedCertGuideId}
          onClose={() => setSelectedCertGuideId(null)}
          onMarkAsObtained={handleMarkCertObtained}
        />
      )}
    </div>
  );
};
