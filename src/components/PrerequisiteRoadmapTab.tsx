"use client";

import React from "react";
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  Building2,
  CreditCard,
  Send,
  HelpCircle,
  Clock
} from "lucide-react";

interface PrerequisiteRoadmapTabProps {
  currentLanguage: "en" | "hi";
}

export const PrerequisiteRoadmapTab: React.FC<PrerequisiteRoadmapTabProps> = ({
  currentLanguage,
}) => {
  return (
    <div className="space-y-8">
      {/* Overview Banner */}
      <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50/60 p-6">
        <h3 className="text-lg font-bold text-indigo-950">
          {currentLanguage === "hi"
            ? "दस्तावेज़ निर्भरता श्रृंखला एवं आवेदन रोडमैप"
            : "The Document Dependency Chain & 5-Stage Application Roadmap"}
        </h3>
        <p className="mt-1 text-xs text-indigo-800 leading-relaxed max-w-3xl">
          {currentLanguage === "hi"
            ? "सरकारी छात्रवृत्ति सीधे नहीं मिलती; यह एक क्रमबद्ध प्रक्रिया है। पहले आधारभूत प्रमाण पत्र (जाति, आय, निवास) बनते हैं, फिर संस्थान सत्यापन होता है, और अंत में पीएफएमएस द्वारा बैंक खाते में राशि भेजी जाती है।"
            : "Government scholarships cannot be applied for in isolation—they follow a strict prerequisite hierarchy. You must unlock basic statutory certificates first, then register on the portal, obtain physical college clerk sign-off, and finally receive DBT disbursement via PFMS."}
        </p>
      </div>

      {/* PART 1: The Interactive Prerequisite Dependency Tree */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h4 className="text-base font-bold text-slate-900">
              {currentLanguage === "hi"
                ? "चरण 1: दस्तावेज़ निर्भरता वृक्ष (Document Dependency Tree)"
                : "Phase 1: Document Dependency Tree"}
            </h4>
            <p className="text-xs text-slate-500">
              See what documents are required to unlock subsequent certificates and scholarships.
            </p>
          </div>
          <span className="rounded-md bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-800">
            Prerequisite Flow
          </span>
        </div>

        {/* The Visual Tree / Flow */}
        <div className="mt-6 grid gap-4 lg:grid-cols-4">
          {/* Level 1: Foundational Proofs */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
            <span className="inline-block rounded bg-slate-200 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-700 uppercase">
              Tier 1: Base Identity
            </span>
            <h5 className="mt-2 text-sm font-bold text-slate-900">Foundational Records</h5>
            <ul className="mt-3 space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                <span>Aadhaar Card (Active Mobile linked)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                <span>Father&apos;s Paternal Land Record / RoR</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                <span>Ration Card / Family Member ID</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                <span>Class 10th Board Marksheet</span>
              </li>
            </ul>
          </div>

          {/* Level 2: Statutory Certificates */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 relative">
            <div className="hidden lg:block absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full border border-slate-200 p-1 shadow-xs">
              <ArrowRight className="size-3 text-slate-400" />
            </div>
            <span className="inline-block rounded bg-amber-200 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-900 uppercase">
              Tier 2: Certificates
            </span>
            <h5 className="mt-2 text-sm font-bold text-amber-950">Statutory Certificates</h5>
            <p className="text-[11px] text-amber-800 mt-0.5">Unlocked via Tier 1 at Tehsildar / CSC</p>
            <ul className="mt-3 space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-1.5">
                <FileText className="size-3.5 text-amber-700 shrink-0" />
                <span>Caste / Tribe Certificate (ST/SC/OBC)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <FileText className="size-3.5 text-amber-700 shrink-0" />
                <span>Income Certificate (Current FY 2026-27)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <FileText className="size-3.5 text-amber-700 shrink-0" />
                <span>Permanent Resident / Domicile</span>
              </li>
            </ul>
          </div>

          {/* Level 3: Bank & College Institutional Validation */}
          <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-4 relative">
            <div className="hidden lg:block absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full border border-slate-200 p-1 shadow-xs">
              <ArrowRight className="size-3 text-slate-400" />
            </div>
            <span className="inline-block rounded bg-indigo-200 px-2 py-0.5 font-mono text-[10px] font-bold text-indigo-900 uppercase">
              Tier 3: Institution
            </span>
            <h5 className="mt-2 text-sm font-bold text-indigo-950">Institutional Enablers</h5>
            <p className="text-[11px] text-indigo-800 mt-0.5">College & Bank branch sign-offs</p>
            <ul className="mt-3 space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-1.5">
                <Building2 className="size-3.5 text-indigo-700 shrink-0" />
                <span>College Bonafide & Fee Receipt</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CreditCard className="size-3.5 text-indigo-700 shrink-0" />
                <span>Bank Account NPCI DBT Seeding</span>
              </li>
              <li className="flex items-center gap-1.5">
                <FileText className="size-3.5 text-indigo-700 shrink-0" />
                <span>One-Time Registration (OTR) on NSP</span>
              </li>
            </ul>
          </div>

          {/* Level 4: The Final Scholarship Benefit */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 relative">
            <div className="hidden lg:block absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full border border-slate-200 p-1 shadow-xs">
              <ArrowRight className="size-3 text-slate-400" />
            </div>
            <span className="inline-block rounded bg-emerald-200 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-900 uppercase">
              Tier 4: Disbursal
            </span>
            <h5 className="mt-2 text-sm font-bold text-emerald-950">Benefit Disbursal</h5>
            <p className="text-[11px] text-emerald-800 mt-0.5">Direct into student bank account</p>
            <ul className="mt-3 space-y-2 text-xs text-emerald-900 font-medium">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                <span>100% Tuition Fee Reimbursed</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                <span>Monthly Living Maintenance Allowance</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                <span>Laptop / Book Grant (Top Class)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* PART 2: The 5-Stage Lifecycle Roadmap */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h4 className="text-base font-bold text-slate-900">
          {currentLanguage === "hi"
            ? "आवेदन से भुगतान तक: 5-चरणीय सरकारी जीवनचक्र"
            : "From Application to Bank Credit: The 5-Stage Lifecycle"}
        </h4>
        <p className="text-xs text-slate-500 mt-0.5">
          Step-by-step breakdown of how your file travels through government departments.
        </p>

        <div className="mt-6 space-y-6">
          {[
            {
              step: 1,
              title: "Pre-Flight Preparation & Document Audit",
              subtitle: "Self / JanSetu AI",
              description:
                "Ensure your name matches across Aadhaar and marksheets. Ensure your bank account is NPCI-seeded (not just KYC linked). Renew your Income Certificate if older than April 1, 2026.",
              statutoryTimeline: "1 to 7 Days",
              criticalWarning: "Never proceed to registration with an unseeded bank account.",
              icon: FileText,
            },
            {
              step: 2,
              title: "Online Portal Submission (NSP / State DBT)",
              subtitle: "National Scholarship Portal or State e-Kalyan/SSP",
              description:
                "Generate One-Time Registration (OTR) via face-authentication or biometric e-KYC on the NSP mobile app or desktop portal. Select the exact scheme code identified by JanSetu AI. Upload clear PDF copies.",
              statutoryTimeline: "1 Hour",
              criticalWarning: "Official government submission fee is ₹0. Do not pay commissions.",
              icon: Send,
            },
            {
              step: 3,
              title: "Institute Nodal Officer (INO) Physical Verification",
              subtitle: "Your College / University Scholarship Desk",
              description:
                "Print out your submitted NSP application form. Take it along with original caste/income certificates and fee receipts to your college scholarship clerk. The INO must log into the portal and click 'Verified'.",
              statutoryTimeline: "Must be completed within 15 days of online submission",
              criticalWarning: "Over 25% of scholarships lapse here because students never inform their college clerk!",
              icon: Building2,
            },
            {
              step: 4,
              title: "District & State Nodal Officer (DNO / SNO) Sanction",
              subtitle: "District Welfare Office / Ministry of Tribal Affairs",
              description:
                "The District Welfare Officer conducts automated deduplication (ensuring you are not claiming two duplicate scholarships) and issues the formal administrative financial sanction.",
              statutoryTimeline: "15 to 30 Days",
              criticalWarning: "Track status on JanSetu AI or NSP portal using your Application ID.",
              icon: Clock,
            },
            {
              step: 5,
              title: "PFMS Treasury Direct Benefit Transfer (DBT Credit)",
              subtitle: "Public Financial Management System (Ministry of Finance)",
              description:
                "The central/state treasury issues a digital payment voucher. Funds are routed via the NPCI Aadhaar payment bridge directly into your seeded bank account without any intermediaries.",
              statutoryTimeline: "Disbursed directly into account",
              criticalWarning: "You will receive an SMS from PFMS/DBT with transaction UTR number.",
              icon: CreditCard,
            },
          ].map((stage) => {
            const Icon = stage.icon;
            return (
              <div key={stage.step} className="flex gap-4">
                {/* Step circle */}
                <div className="flex flex-col items-center">
                  <div className="flex size-10 items-center justify-center rounded-full bg-orange-600 text-white font-bold text-sm shadow-sm">
                    {stage.step}
                  </div>
                  {stage.step < 5 && <div className="mt-2 h-full w-0.5 bg-slate-200" />}
                </div>

                {/* Step content card */}
                <div className="flex-1 pb-6">
                  <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Icon className="size-4 text-orange-600" />
                        <h5 className="text-sm font-bold text-slate-900">{stage.title}</h5>
                      </div>
                      <span className="rounded bg-slate-200/80 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                        {stage.subtitle}
                      </span>
                    </div>

                    <p className="mt-2 text-xs leading-relaxed text-slate-700">
                      {stage.description}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/60 pt-2 text-[11px]">
                      <span className="flex items-center gap-1 font-medium text-slate-500">
                        <Clock className="size-3 text-slate-400" />
                        Expected Duration: <strong>{stage.statutoryTimeline}</strong>
                      </span>
                      <span className="flex items-center gap-1 text-amber-800 font-semibold bg-amber-100/70 px-2 py-0.5 rounded">
                        <AlertCircle className="size-3 text-amber-700" />
                        {stage.criticalWarning}
                      </span>
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
