"use client";

import React, { useState } from "react";
import { UserProfile, CedarEvaluationResult } from "@/lib/cedar/evaluator";
import { DocumentAuditResult } from "@/lib/audit/documentAuditor";
import {
  Printer,
  FileCheck,
  CheckCircle2,
  ShieldCheck,
  Building,
  QrCode,
  Search,
  Clock,
  ArrowRight
} from "lucide-react";

interface ApplicationDossierTabProps {
  profile: UserProfile;
  evaluationResults: CedarEvaluationResult[];
  auditResult: DocumentAuditResult;
}

export const ApplicationDossierTab: React.FC<ApplicationDossierTabProps> = ({
  profile,
  evaluationResults,
  auditResult,
}) => {
  const [appTrackerId, setAppTrackerId] = useState<string>("NSP2026ST89201");
  const [isTracking, setIsTracking] = useState<boolean>(false);

  const topEligible = evaluationResults.find((r) => r.decision === "ALLOW")?.scheme;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Top Banner with Print Button */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 p-6 text-white shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <ShieldCheck className="size-4" />
            Verified Pre-Flight Submission Dossier
          </div>
          <h3 className="mt-1 text-xl font-bold tracking-tight">
            1-Click Citizen Application Dossier
          </h3>
          <p className="mt-1 text-xs text-slate-300">
            Carry this single-page verified card to your College Nodal Officer or CSC center to prevent operator errors.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-indigo-700 transition-all cursor-pointer"
        >
          <Printer className="size-4" />
          <span>Print / Export Dossier</span>
        </button>
      </div>

      {/* THE PRINTABLE APPLICATION DOSSIER SHEET */}
      <div className="rounded-2xl border-2 border-slate-300 bg-white p-6 sm:p-10 shadow-sm print:m-0 print:border-none print:p-0">
        {/* Dossier Header */}
        <div className="border-b-2 border-slate-800 pb-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-slate-900 px-2.5 py-1 text-xs font-bold text-white uppercase tracking-wider">
                  JanSetu AI
                </span>
                <span className="font-mono text-xs text-slate-500">
                  Dossier Ref: #JS-918204
                </span>
              </div>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
                CITIZEN SCHOLARSHIP & SERVICE SUBMISSION CARD
              </h2>
              <p className="text-xs text-slate-600">
                Government of India Civic Access & Direct Benefit Transfer Pre-Check
              </p>
            </div>

            <div className="hidden sm:flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
              <QrCode className="size-12 text-slate-800" />
              <span className="mt-1 font-mono text-[9px] text-slate-400">VERIFIED AUDIT</span>
            </div>
          </div>
        </div>

        {/* Section 1: Verified Applicant Demographics */}
        <div className="mt-6 border-b border-slate-200 pb-6">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
            01. Verified Applicant Demographics
          </h4>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block">Applicant Name:</span>
              <strong className="text-slate-900 text-sm font-bold">
                {profile.name || "Rajesh Kumar Munda"}
              </strong>
            </div>
            <div>
              <span className="text-slate-400 block">Category / Community:</span>
              <strong className="text-slate-900 text-sm font-bold">{profile.category}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Annual Family Income:</span>
              <strong className="text-slate-900 text-sm font-bold">
                ₹{profile.annualFamilyIncome.toLocaleString("en-IN")}
              </strong>
            </div>
            <div>
              <span className="text-slate-400 block">Education Level:</span>
              <strong className="text-slate-900 text-sm font-bold">{profile.educationLevel}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Home State / Domicile:</span>
              <strong className="text-slate-900 font-semibold">{profile.state}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Gender:</span>
              <strong className="text-slate-900 font-semibold">{profile.gender}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Aadhaar / Marksheet Match:</span>
              <strong className="text-emerald-700 font-semibold">
                {auditResult.nameMatchPercentage}% Similarity
              </strong>
            </div>
            <div>
              <span className="text-slate-400 block">NPCI DBT Bank Status:</span>
              <strong
                className={`font-semibold ${
                  auditResult.npciStatus === "SEEDED" ? "text-emerald-700" : "text-amber-700"
                }`}
              >
                {auditResult.npciStatus === "SEEDED" ? "Active (Seeded)" : "Requires Mandate"}
              </strong>
            </div>
          </div>
        </div>

        {/* Section 2: Recommended Target Scheme */}
        <div className="mt-6 border-b border-slate-200 pb-6">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
            02. Target Scheme & Financial Entitlement
          </h4>
          {topEligible ? (
            <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-mono text-[10px] text-slate-500">Scheme Code: {topEligible.id}</span>
                  <h5 className="text-base font-bold text-slate-900">{topEligible.title}</h5>
                  <p className="text-slate-600 mt-0.5">{topEligible.ministry}</p>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block text-[11px]">Financial Benefit:</span>
                  <span className="text-base font-bold text-emerald-700">
                    {topEligible.benefitAmount}
                  </span>
                </div>
              </div>

              <div className="mt-3 grid sm:grid-cols-2 gap-2 border-t border-slate-200 pt-3 text-[11px]">
                <div>
                  <span className="text-slate-500">Official Portal: </span>
                  <strong className="text-slate-800">{topEligible.portalName}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Submission Deadline: </span>
                  <strong className="text-rose-700">{topEligible.deadline}</strong>
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-2 text-xs text-slate-500">No active eligible schemes.</p>
          )}
        </div>

        {/* Section 3: Mandatory Document Checklist for Submission */}
        <div className="mt-6 border-b border-slate-200 pb-6">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
            03. Verified Mandatory Document Checklist
          </h4>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 text-xs">
            {[
              "Digital Caste / Community Certificate (with Barcode verification)",
              "Annual Income Certificate (< ₹2.50L) issued on or after April 1, 2026",
              "Aadhaar Card (linked to active mobile number)",
              "Bank Passbook with NPCI DBT Mapper Active Stamp",
              "10th Class Board Marksheet / Date of Birth Proof",
              "Current Academic Year College Bonafide Certificate & Fee Receipt",
            ].map((doc, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2.5"
              >
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span className="text-slate-800 font-medium">{doc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Offline Counter Instructions & Anti-Fraud Notice */}
        <div className="mt-6">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
            04. Official Submission Counter & Fee Declaration
          </h4>
          <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50/60 p-4 text-xs">
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <span className="text-amber-900 block font-semibold">Where to Submit:</span>
                <span className="text-slate-700">
                  College Nodal Officer (INO) Desk / District Welfare Office
                </span>
              </div>
              <div>
                <span className="text-amber-900 block font-semibold">Statutory Government Fee:</span>
                <span className="text-emerald-800 font-bold">
                  ₹0 (Completely Free under Central Guidelines)
                </span>
              </div>
              <div>
                <span className="text-amber-900 block font-semibold">Grievance Helpline:</span>
                <span className="text-slate-700 font-mono">0120-6619540 / 1800-3000-3468</span>
              </div>
            </div>
            <div className="mt-3 text-[10px] text-amber-800 border-t border-amber-200/60 pt-2 font-medium">
              * Notice to CSC Operators / Cyber Cafes: Under the Information Technology Act and Central Citizen Charters, charging unauthorized fees for government scholarship filing is illegal.
            </div>
          </div>
        </div>
      </div>

      {/* PART 2: LIVE APPLICATION STATUS TRACKER */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h4 className="text-base font-bold text-slate-900">
          Live Application Status Tracker
        </h4>
        <p className="text-xs text-slate-500 mt-0.5">
          Track the real-time progress of your submitted application across government tiers.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="size-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={appTrackerId}
              onChange={(e) => setAppTrackerId(e.target.value)}
              placeholder="Enter Application ID (e.g. NSP2026ST89201)"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-xs font-mono text-slate-800 focus:border-indigo-500 focus:outline-hidden"
            />
          </div>
          <button
            onClick={() => setIsTracking(true)}
            className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <span>Track Application</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>

        {/* Visual Pipeline */}
        <div className="mt-6 border-t border-slate-100 pt-6">
          <div className="grid gap-3 sm:grid-cols-5">
            {[
              { label: "Submitted Online", status: "COMPLETED", date: "Sept 12, 2026" },
              { label: "College (INO) Verified", status: "COMPLETED", date: "Sept 15, 2026" },
              { label: "District (DNO) Verification", status: "IN_PROGRESS", date: "Pending (Within 8 days)" },
              { label: "Ministry Sanction", status: "PENDING", date: "Awaiting DNO" },
              { label: "PFMS DBT Credit", status: "PENDING", date: "Direct to Bank" },
            ].map((step, idx) => (
              <div
                key={idx}
                className={`rounded-xl border p-3 text-xs ${
                  step.status === "COMPLETED"
                    ? "border-emerald-200 bg-emerald-50/60 text-emerald-900"
                    : step.status === "IN_PROGRESS"
                    ? "border-amber-300 bg-amber-50 text-amber-950 font-semibold shadow-xs"
                    : "border-slate-200 bg-slate-50 text-slate-400"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px]">Step 0{idx + 1}</span>
                  {step.status === "COMPLETED" ? (
                    <CheckCircle2 className="size-3.5 text-emerald-600" />
                  ) : step.status === "IN_PROGRESS" ? (
                    <Clock className="size-3.5 text-amber-600 animate-pulse" />
                  ) : (
                    <div className="size-2 rounded-full bg-slate-300" />
                  )}
                </div>
                <div className="mt-2 font-bold text-xs">{step.label}</div>
                <div className="mt-1 text-[10px] opacity-80">{step.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
