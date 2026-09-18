"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Header } from "@/components/Header";
import { AwsArchitectureModal } from "@/components/AwsArchitectureModal";
import { CitizenProfilePage } from "@/components/CitizenProfilePage";
import { EligibilityTab } from "@/components/EligibilityTab";
import { DocumentAuditTab } from "@/components/DocumentAuditTab";
import { PrerequisiteRoadmapTab } from "@/components/PrerequisiteRoadmapTab";
import { OfflineNavigatorTab } from "@/components/OfflineNavigatorTab";
import { AiCopilotTab } from "@/components/AiCopilotTab";
import { ApplicationDossierTab } from "@/components/ApplicationDossierTab";
import {
  DEMO_PERSONAS,
  DemoPersona,
  BLANK_CITIZEN_PROFILE,
  BLANK_CITIZEN_AUDIT
} from "@/data/demoPersonas";
import { SCHEMES_DATABASE, SchemeOrService } from "@/data/schemes";
import { evaluateCedarPolicies, UserProfile } from "@/lib/cedar/evaluator";
import { auditCitizenDocuments, DocumentAuditInput } from "@/lib/audit/documentAuditor";
import {
  User,
  ShieldCheck,
  FileCheck2,
  GitFork,
  Building,
  Bot,
  FileBadge,
  Sparkles,
  CheckCircle2
} from "lucide-react";

export default function Home() {
  const [isArchitectureOpen, setIsArchitectureOpen] = useState<boolean>(false);

  // Tab State: Opens to Official Citizen Profile by default
  const [activeTab, setActiveTab] = useState<
    "profile" | "schemes" | "audit" | "roadmap" | "offline" | "copilot" | "dossier"
  >("profile");

  // Dynamic Scheme Pool (Baseline + API Setu Dynamic Ingestion)
  const [schemes, setSchemes] = useState<SchemeOrService[]>(SCHEMES_DATABASE);
  const [isSyncingSchemes, setIsSyncingSchemes] = useState<boolean>(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<string>("Today (Live API Setu Gateway)");
  const [syncBannerMessage, setSyncBannerMessage] = useState<string | null>(null);

  // Master Citizen Profile (Initial: Kavitha Selvam, Tamil Nadu)
  const [profile, setProfile] = useState<UserProfile>(DEMO_PERSONAS[0].profile);
  const [auditInput, setAuditInput] = useState<DocumentAuditInput>(DEMO_PERSONAS[0].auditInput);
  const [targetSchemeId, setTargetSchemeId] = useState<string>("TN_Pudhumai_Penn");

  // Restore saved profile on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("jansetu_user_profile");
        if (saved) {
          const parsed = JSON.parse(saved);
          setProfile(parsed);
          if (parsed.state === "Andhra Pradesh") {
            setTargetSchemeId("AP_Jagananna_Vidya_Deevena");
          }
        }
      } catch (e) {
        console.error("Failed to restore saved profile", e);
      }
    }
  }, []);

  const handleProfileChange = (newProfile: UserProfile) => {
    setProfile(newProfile);
    if (newProfile.state === "Andhra Pradesh" && targetSchemeId.startsWith("TN_")) {
      setTargetSchemeId("AP_Jagananna_Vidya_Deevena");
    } else if (newProfile.state === "Tamil Nadu" && targetSchemeId.startsWith("AP_")) {
      setTargetSchemeId("TN_Pudhumai_Penn");
    }

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("jansetu_user_profile", JSON.stringify(newProfile));
      } catch (e) {
        console.error("Failed to persist profile", e);
      }
    }
  };

  // Sync with API Setu & National Public Data Exchange
  const handleSyncWithApiSetu = async () => {
    setIsSyncingSchemes(true);
    try {
      const res = await fetch("/api/schemes/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ forceRefresh: true })
      });
      const data = await res.json();
      if (data.success && data.allSchemes) {
        setSchemes(data.allSchemes);
        setLastSyncedAt("Just now");
        if (data.newlyAddedSchemes && data.newlyAddedSchemes.length > 0) {
          const names = data.newlyAddedSchemes.map((s: { shortCode: string }) => s.shortCode).join(", ");
          setSyncBannerMessage(`🎉 Successfully ingested newly gazetted scheme(s) from API Setu: ${names}`);
        } else {
          setSyncBannerMessage("✅ All schemes verified up-to-date with API Setu.");
        }
        setTimeout(() => setSyncBannerMessage(null), 8000);
      }
    } catch (e) {
      console.error("Failed to sync schemes:", e);
      setSyncBannerMessage("⚠️ Could not reach API Setu gateway. Kept 24 baseline policies active.");
      setTimeout(() => setSyncBannerMessage(null), 5000);
    } finally {
      setIsSyncingSchemes(false);
    }
  };

  // Live Cedar policy evaluation over active dynamic scheme pool
  const evaluationResults = useMemo(() => {
    return evaluateCedarPolicies(profile, schemes);
  }, [profile, schemes]);

  // Live document audit
  const auditResult = useMemo(() => {
    return auditCitizenDocuments(auditInput);
  }, [auditInput]);

  const eligibleCount = evaluationResults.filter((r) => r.decision === "ALLOW").length;

  const handleSelectPersona = (persona: DemoPersona) => {
    handleProfileChange(persona.profile);
    setAuditInput(persona.auditInput);
    if (persona.profile.state === "Andhra Pradesh") {
      setTargetSchemeId("AP_Jagananna_Vidya_Deevena");
    } else if (persona.profile.state === "Tamil Nadu") {
      setTargetSchemeId("TN_Pudhumai_Penn");
    } else {
      setTargetSchemeId("PostMatric_ST");
    }
  };

  const handleResetToBlank = () => {
    handleProfileChange(BLANK_CITIZEN_PROFILE);
    setAuditInput(BLANK_CITIZEN_AUDIT);
    setActiveTab("profile");
  };

  const handleNavigateToDocuments = (schemeId?: string) => {
    if (schemeId) {
      setTargetSchemeId(schemeId);
    }
    setActiveTab("audit");
  };

  const handleNavigateToRoadmap = (schemeId?: string) => {
    if (schemeId) {
      setTargetSchemeId(schemeId);
    }
    setActiveTab("roadmap");
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-800 flex flex-col font-sans">
      {/* Official Gov Header */}
      <Header
        activeProfileName={profile.name}
        onSelectPersona={handleSelectPersona}
        onResetToBlank={handleResetToBlank}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
      />

      {/* Main Container */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        {/* Regal Navy Navigation Ribbon */}
        <div className="mb-6 overflow-x-auto no-scrollbar">
          <div className="flex w-max min-w-full space-x-1 rounded-2xl bg-[#0B1B4F] p-1.5 shadow-luxury border border-[#142A6F]">
            {/* Tab 1: Citizen Master Profile */}
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "profile"
                  ? "bg-[#152864] text-[#F5E29F] shadow-sm ring-1 ring-[#DFB738]/50 font-bold"
                  : "text-slate-300 hover:bg-[#152864]/50 hover:text-white"
              }`}
            >
              <User className="size-4" />
              <span>1. Citizen Profile</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  activeTab === "profile"
                    ? "bg-[#DFB738]/20 text-[#F5E29F] border border-[#DFB738]/40"
                    : "bg-white/10 text-slate-300"
                }`}
              >
                {profile.state.split(" ")[0]}
              </span>
            </button>

            {/* Tab 2: Scheme Discovery & Eligibility */}
            <button
              onClick={() => setActiveTab("schemes")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "schemes"
                  ? "bg-[#152864] text-[#F5E29F] shadow-sm ring-1 ring-[#DFB738]/50 font-bold"
                  : "text-slate-300 hover:bg-[#152864]/50 hover:text-white"
              }`}
            >
              <ShieldCheck className="size-4" />
              <span>2. Schemes & Eligibility</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  activeTab === "schemes"
                    ? "bg-[#DFB738]/20 text-[#F5E29F] border border-[#DFB738]/40"
                    : "bg-emerald-900/60 text-emerald-300 border border-emerald-700/50"
                }`}
              >
                {eligibleCount} Eligible
              </span>
            </button>

            {/* Tab 3: Document Upload & Name Matcher */}
            <button
              onClick={() => setActiveTab("audit")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "audit"
                  ? "bg-[#152864] text-[#F5E29F] shadow-sm ring-1 ring-[#DFB738]/50 font-bold"
                  : "text-slate-300 hover:bg-[#152864]/50 hover:text-white"
              }`}
            >
              <FileCheck2 className="size-4" />
              <span>3. Document Upload & Matcher</span>
              {auditResult.npciStatus !== "SEEDED" && (
                <span className="rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 text-[10px] font-bold">
                  Attention
                </span>
              )}
            </button>

            {/* Tab 4: Application Roadmap */}
            <button
              onClick={() => setActiveTab("roadmap")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "roadmap"
                  ? "bg-[#152864] text-[#F5E29F] shadow-sm ring-1 ring-[#DFB738]/50 font-bold"
                  : "text-slate-300 hover:bg-[#152864]/50 hover:text-white"
              }`}
            >
              <GitFork className="size-4" />
              <span>4. Application Roadmap</span>
            </button>

            {/* Tab 5: Seva Centers & Fees */}
            <button
              onClick={() => setActiveTab("offline")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "offline"
                  ? "bg-[#152864] text-[#F5E29F] shadow-sm ring-1 ring-[#DFB738]/50 font-bold"
                  : "text-slate-300 hover:bg-[#152864]/50 hover:text-white"
              }`}
            >
              <Building className="size-4" />
              <span>5. Seva Centers & Fees</span>
            </button>

            {/* Tab 6: Bedrock AI Copilot */}
            <button
              onClick={() => setActiveTab("copilot")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "copilot"
                  ? "bg-[#152864] text-[#F5E29F] shadow-sm ring-1 ring-[#DFB738]/50 font-bold"
                  : "text-slate-300 hover:bg-[#152864]/50 hover:text-white"
              }`}
            >
              <Bot className="size-4" />
              <span>6. AI Civic Assistant</span>
              <span className="flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-300 border border-amber-500/30">
                <Sparkles className="size-2.5" /> Voice
              </span>
            </button>

            {/* Tab 7: Application Dossier */}
            <button
              onClick={() => setActiveTab("dossier")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "dossier"
                  ? "bg-[#152864] text-[#F5E29F] shadow-sm ring-1 ring-[#DFB738]/50 font-bold"
                  : "text-slate-300 hover:bg-[#152864]/50 hover:text-white"
              }`}
            >
              <FileBadge className="size-4" />
              <span>7. Download Dossier</span>
            </button>
          </div>
        </div>

        {/* API Setu Live Ingestion Toast Notification */}
        {syncBannerMessage && (
          <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-emerald-300 bg-emerald-50 p-3.5 text-xs text-emerald-900 shadow-sm animate-in fade-in slide-in-from-top duration-300">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
              <span className="font-semibold">{syncBannerMessage}</span>
            </div>
            <button
              onClick={() => setSyncBannerMessage(null)}
              className="rounded-lg px-2 py-0.5 text-emerald-700 hover:bg-emerald-100 font-mono font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Tab Views */}
        <div>
          {/* View 1: Citizen Master Profile Page (Default Entry Point) */}
          {activeTab === "profile" && (
            <CitizenProfilePage
              profile={profile}
              evaluationResults={evaluationResults}
              onProfileChange={handleProfileChange}
              onAuditInputChange={(newAudit) => setAuditInput(newAudit)}
              onNavigateToSchemes={() => setActiveTab("schemes")}
              onNavigateToAudit={() => setActiveTab("audit")}
            />
          )}

          {/* View 2: Scheme Discovery & Eligibility Dashboard */}
          {activeTab === "schemes" && (
            <EligibilityTab
              profile={profile}
              evaluationResults={evaluationResults}
              onProfileChange={handleProfileChange}
              onNavigateToProfile={() => setActiveTab("profile")}
              onNavigateToDocuments={handleNavigateToDocuments}
              onNavigateToRoadmap={handleNavigateToRoadmap}
              totalSchemesCount={schemes.length}
              lastSyncedAt={lastSyncedAt}
              onSyncWithApiSetu={handleSyncWithApiSetu}
              isSyncing={isSyncingSchemes}
            />
          )}

          {/* View 3: Scheme-Centric Pre-Flight Document Audit */}
          {activeTab === "audit" && (
            <DocumentAuditTab
              initialInput={auditInput}
              selectedSchemeId={targetSchemeId}
              profile={profile}
              onSelectScheme={(id) => setTargetSchemeId(id)}
              onProfileChange={handleProfileChange}
              onAuditInputChange={(newAudit) => setAuditInput(newAudit)}
              onNavigateToEligibility={() => setActiveTab("schemes")}
              onNavigateToRoadmap={handleNavigateToRoadmap}
            />
          )}

          {/* View 4: Scheme-Centric Application Roadmap */}
          {activeTab === "roadmap" && (
            <PrerequisiteRoadmapTab
              initialSchemeId={targetSchemeId}
              userHeldDocuments={profile.heldDocuments || []}
              userState={profile.state}
              onSelectScheme={(id) => setTargetSchemeId(id)}
            />
          )}

          {/* View 5: Offline Seva Centers & Anti-Extortion Fee Calculator */}
          {activeTab === "offline" && (
            <OfflineNavigatorTab
              userState={profile.state}
            />
          )}

          {/* View 6: Bedrock AI Copilot */}
          {activeTab === "copilot" && (
            <AiCopilotTab
              profile={profile}
              evaluationResults={evaluationResults}
              targetSchemeId={targetSchemeId}
              auditResult={auditResult}
              auditInput={auditInput}
            />
          )}

          {/* View 7: Application Dossier */}
          {activeTab === "dossier" && (
            <ApplicationDossierTab
              profile={profile}
              evaluationResults={evaluationResults}
              auditResult={auditResult}
            />
          )}
        </div>
      </main>

      {/* Official Portal Footer */}
      <footer className="mt-12 border-t border-[#EAE2D5] bg-[#FDFBF7] py-6 text-xs text-slate-600">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0B1B4F] font-serif">JanSetu AI</span>
            <span>•</span>
            <span>National Citizen Service Flight Deck • WeMakeDevs × AWS Hackathon 2026</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsArchitectureOpen(true)}
              className="text-[#854D0E] hover:underline cursor-pointer font-bold"
            >
              Inspect AWS Stack
            </button>
            <span className="text-slate-300">|</span>
            <span>Deterministic AWS Cedar Policies</span>
            <span className="text-slate-300">|</span>
            <span>Zero AI Hallucination</span>
          </div>
        </div>
      </footer>

      {/* AWS Architecture Modal */}
      <AwsArchitectureModal
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
      />
    </div>
  );
}
