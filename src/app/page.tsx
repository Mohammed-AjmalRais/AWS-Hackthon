"use client";

import React, { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { AwsArchitectureModal } from "@/components/AwsArchitectureModal";
import { EligibilityTab } from "@/components/EligibilityTab";
import { DocumentAuditTab } from "@/components/DocumentAuditTab";
import { PrerequisiteRoadmapTab } from "@/components/PrerequisiteRoadmapTab";
import { OfflineNavigatorTab } from "@/components/OfflineNavigatorTab";
import { AiCopilotTab } from "@/components/AiCopilotTab";
import { ApplicationDossierTab } from "@/components/ApplicationDossierTab";
import { DEMO_PERSONAS, DemoPersona } from "@/data/demoPersonas";
import { evaluateCedarPolicies, UserProfile } from "@/lib/cedar/evaluator";
import { auditCitizenDocuments, DocumentAuditInput } from "@/lib/audit/documentAuditor";
import {
  ShieldCheck,
  FileCheck2,
  GitFork,
  Building,
  Bot,
  FileBadge,
  Sparkles
} from "lucide-react";

export default function Home() {
  const [isArchitectureOpen, setIsArchitectureOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    "eligibility" | "audit" | "roadmap" | "offline" | "copilot" | "dossier"
  >("eligibility");

  // Initial Profile: Default to Rajesh Kumar Munda (ST Student)
  const [profile, setProfile] = useState<UserProfile>(DEMO_PERSONAS[0].profile);
  const [auditInput, setAuditInput] = useState<DocumentAuditInput>(DEMO_PERSONAS[0].auditInput);
  const [targetRoadmapSchemeId, setTargetRoadmapSchemeId] = useState<string>("PostMatric_ST");

  // Live Cedar policy evaluation
  const evaluationResults = useMemo(() => {
    return evaluateCedarPolicies(profile);
  }, [profile]);

  // Live document audit
  const auditResult = useMemo(() => {
    return auditCitizenDocuments(auditInput);
  }, [auditInput]);

  const eligibleCount = evaluationResults.filter((r) => r.decision === "ALLOW").length;

  const handleNavigateToRoadmap = (schemeId: string) => {
    setTargetRoadmapSchemeId(schemeId);
    setActiveTab("roadmap");
  };

  const handleSelectPersona = (persona: DemoPersona) => {
    setProfile(persona.profile);
    setAuditInput(persona.auditInput);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col font-sans">
      {/* Header */}
      <Header
        onSelectPersona={handleSelectPersona}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
      />

      {/* Main Container */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        {/* Navigation Tabs Bar */}
        <div className="mb-6 overflow-x-auto scrollbar-none">
          <div className="flex w-max min-w-full space-x-1.5 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xs">
            <button
              onClick={() => setActiveTab("eligibility")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "eligibility"
                  ? "bg-orange-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <ShieldCheck className="size-4" />
              <span>1. Eligibility & Cedar Policies</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  activeTab === "eligibility"
                    ? "bg-white/25 text-white"
                    : "bg-orange-100 text-orange-800"
                }`}
              >
                {eligibleCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("audit")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "audit"
                  ? "bg-orange-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <FileCheck2 className="size-4" />
              <span>2. Document Audit & NPCI</span>
              {auditResult.npciStatus !== "SEEDED" && (
                <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-800">
                  Risk
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("roadmap")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "roadmap"
                  ? "bg-orange-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <GitFork className="size-4" />
              <span>3. Prerequisite Roadmap</span>
            </button>

            <button
              onClick={() => setActiveTab("offline")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "offline"
                  ? "bg-orange-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Building className="size-4" />
              <span>4. Offline Centers & Fee Calculator</span>
            </button>

            <button
              onClick={() => setActiveTab("copilot")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "copilot"
                  ? "bg-orange-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Bot className="size-4" />
              <span>5. Bedrock AI Copilot</span>
              <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-900">
                <Sparkles className="size-2.5" /> Voice
              </span>
            </button>

            <button
              onClick={() => setActiveTab("dossier")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "dossier"
                  ? "bg-orange-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <FileBadge className="size-4" />
              <span>6. Application Dossier</span>
            </button>
          </div>
        </div>

        {/* Tab Views */}
        <div>
          {activeTab === "eligibility" && (
            <EligibilityTab
              profile={profile}
              evaluationResults={evaluationResults}
              onProfileChange={setProfile}
              onNavigateToDocuments={() => setActiveTab("audit")}
              onNavigateToRoadmap={handleNavigateToRoadmap}
            />
          )}

          {activeTab === "audit" && (
            <DocumentAuditTab
              initialInput={auditInput}
            />
          )}

          {activeTab === "roadmap" && (
            <PrerequisiteRoadmapTab
              initialSchemeId={targetRoadmapSchemeId}
              userHeldDocuments={profile.heldDocuments || []}
              onSelectScheme={(id) => setTargetRoadmapSchemeId(id)}
            />
          )}

          {activeTab === "offline" && (
            <OfflineNavigatorTab
              userState={profile.state}
            />
          )}

          {activeTab === "copilot" && (
            <AiCopilotTab />
          )}

          {activeTab === "dossier" && (
            <ApplicationDossierTab
              profile={profile}
              evaluationResults={evaluationResults}
              auditResult={auditResult}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">JanSetu AI</span>
            <span>•</span>
            <span>Unified Civic Access Architecture for WeMakeDevs × AWS Hackathon</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsArchitectureOpen(true)}
              className="text-orange-600 hover:underline cursor-pointer font-medium"
            >
              Inspect AWS Stack
            </button>
            <span className="text-slate-300">|</span>
            <span>Open Source AWS Cedar Policies</span>
            <span className="text-slate-300">|</span>
            <span>SAM CLI & LocalStack Compliant</span>
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
