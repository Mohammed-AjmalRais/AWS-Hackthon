"use client";

import React, { useState } from "react";
import { DocumentAuditInput, auditCitizenDocuments, generateNpciMandateForm } from "@/lib/audit/documentAuditor";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Download,
  Copy,
  ShieldAlert,
  FileText,
  Building,
  Sparkles,
  Check
} from "lucide-react";

interface DocumentAuditTabProps {
  initialInput: DocumentAuditInput;
  currentLanguage: "en" | "hi";
}

export const DocumentAuditTab: React.FC<DocumentAuditTabProps> = ({
  initialInput,
  currentLanguage,
}) => {
  const [auditInput, setAuditInput] = useState<DocumentAuditInput>(initialInput);
  const [copiedForm, setCopiedForm] = useState(false);
  const [showMandateModal, setShowMandateModal] = useState(false);

  const auditResult = auditCitizenDocuments(auditInput);
  const mandateText = generateNpciMandateForm(
    auditInput.nameOnAadhaar,
    auditInput.bankName || "State Bank of India",
    "38920192819",
    "XXXX-XXXX-4819"
  );

  const handleCopyMandate = () => {
    navigator.clipboard.writeText(mandateText);
    setCopiedForm(true);
    setTimeout(() => setCopiedForm(false), 2500);
  };

  const handleDownloadMandate = () => {
    const blob = new Blob([mandateText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `NPCI_Aadhaar_DBT_Mandate_${auditInput.nameOnAadhaar.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner Explaining the Rejection Funnel */}
      <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-6">
        <div className="flex items-start gap-3">
          <ShieldAlert className="size-6 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-base font-bold text-rose-950">
              {currentLanguage === "hi"
                ? "प्री-फ्लाइट दस्तावेज़ जांच: आवेदन खारिज होने से रोकें"
                : "Pre-Flight Document Audit: Prevent Silent Application Rejections"}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-rose-800">
              {currentLanguage === "hi"
                ? "भारत में 42% छात्रवृत्तियां केवल इसलिए खारिज हो जाती हैं क्योंकि आधार कार्ड और मार्कशीट के नाम में थोड़ा सा अंतर होता है या बैंक खाता NPCI मैपर पर सीड नहीं होता। पोर्टल पर आवेदन करने से पहले यहां जांचें।"
                : "Over 40% of government scholarship rejections in India occur not because the student was ineligible, but due to subtle clerical mismatches (e.g., initials on marksheets vs full name on Aadhaar) or unseeded NPCI bank mappers. Audit your records below before submitting."}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* LEFT COLUMN: Document Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-sm font-bold text-slate-900">
                {currentLanguage === "hi" ? "दस्तावेज़ विवरण दर्ज करें" : "Enter Document Details"}
              </h4>
              <span className="text-[11px] font-medium text-slate-500">Live Validator</span>
            </div>

            <div className="mt-4 space-y-4">
              {/* Name on Aadhaar */}
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Full Name on Aadhaar Card
                </label>
                <input
                  type="text"
                  value={auditInput.nameOnAadhaar}
                  onChange={(e) =>
                    setAuditInput({ ...auditInput, nameOnAadhaar: e.target.value })
                  }
                  placeholder="e.g. Rajesh Kumar Munda"
                  className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-800 focus:border-orange-500 focus:outline-hidden"
                />
              </div>

              {/* Name on 10th Marksheet */}
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Full Name on 10th Class Marksheet / Certificate
                </label>
                <input
                  type="text"
                  value={auditInput.nameOnMarksheet}
                  onChange={(e) =>
                    setAuditInput({ ...auditInput, nameOnMarksheet: e.target.value })
                  }
                  placeholder="e.g. Rajesh K Munda"
                  className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-800 focus:border-orange-500 focus:outline-hidden"
                />
              </div>

              {/* Date of Birth Verification */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Aadhaar DOB
                  </label>
                  <input
                    type="date"
                    value={auditInput.dobOnAadhaar || "2005-08-14"}
                    onChange={(e) =>
                      setAuditInput({ ...auditInput, dobOnAadhaar: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-xs text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Marksheet DOB
                  </label>
                  <input
                    type="date"
                    value={auditInput.dobOnMarksheet || "2005-08-14"}
                    onChange={(e) =>
                      setAuditInput({ ...auditInput, dobOnMarksheet: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-xs text-slate-800"
                  />
                </div>
              </div>

              {/* The NPCI Seeding Selector */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3.5">
                <label className="block text-xs font-bold text-amber-950">
                  Bank Account Aadhaar DBT Status (NPCI Mapper)
                </label>
                <p className="text-[11px] text-amber-800 mt-0.5">
                  Does your bank have active NPCI DBT Seeding?
                </p>

                <div className="mt-2 space-y-2">
                  <label className="flex items-center gap-2 text-xs text-slate-800 cursor-pointer">
                    <input
                      type="radio"
                      name="npci"
                      checked={auditInput.isNpciSeeded}
                      onChange={() =>
                        setAuditInput({
                          ...auditInput,
                          isNpciSeeded: true,
                          isAadhaarLinkedToBank: true,
                        })
                      }
                      className="text-orange-600 focus:ring-orange-500"
                    />
                    <span className="font-semibold text-emerald-800">
                      Yes, NPCI Seeded for DBT (Safe)
                    </span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-slate-800 cursor-pointer">
                    <input
                      type="radio"
                      name="npci"
                      checked={auditInput.isAadhaarLinkedToBank && !auditInput.isNpciSeeded}
                      onChange={() =>
                        setAuditInput({
                          ...auditInput,
                          isNpciSeeded: false,
                          isAadhaarLinkedToBank: true,
                        })
                      }
                      className="text-orange-600 focus:ring-orange-500"
                    />
                    <span className="font-semibold text-amber-900">
                      Only Aadhaar Linked (KYC done, but NOT seeded) ⚠️
                    </span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-slate-800 cursor-pointer">
                    <input
                      type="radio"
                      name="npci"
                      checked={!auditInput.isAadhaarLinkedToBank}
                      onChange={() =>
                        setAuditInput({
                          ...auditInput,
                          isNpciSeeded: false,
                          isAadhaarLinkedToBank: false,
                        })
                      }
                      className="text-orange-600 focus:ring-orange-500"
                    />
                    <span className="font-semibold text-rose-800">
                      Not Linked at all ❌
                    </span>
                  </label>
                </div>
              </div>

              {/* Income Certificate Issue Date */}
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Income Certificate Issue Date
                </label>
                <input
                  type="date"
                  value={auditInput.incomeCertificateIssueDate || "2025-11-20"}
                  onChange={(e) =>
                    setAuditInput({
                      ...auditInput,
                      incomeCertificateIssueDate: e.target.value,
                    })
                  }
                  className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800"
                />
                <span className="mt-1 block text-[10px] text-slate-500">
                  Must be issued after April 1, 2026 for 2026–27 scholarships.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Audit Diagnosis & Action Plan (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Readiness Meter Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Overall Portal Submission Readiness
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span
                    className={`text-4xl font-extrabold ${
                      auditResult.overallReadinessScore >= 80
                        ? "text-emerald-600"
                        : auditResult.overallReadinessScore >= 50
                        ? "text-amber-600"
                        : "text-rose-600"
                    }`}
                  >
                    {auditResult.overallReadinessScore}%
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    {auditResult.canSubmitNow
                      ? "Ready for Instant Portal Submission"
                      : "Action Required Before Submission"}
                  </span>
                </div>
              </div>

              {/* Name Match Indicator */}
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-right">
                <span className="text-[11px] font-semibold text-slate-600">
                  Aadhaar / Marksheet Match
                </span>
                <div className="mt-0.5 text-lg font-bold text-slate-900">
                  {auditResult.nameMatchPercentage}% Similarity
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full transition-all duration-500 ${
                  auditResult.overallReadinessScore >= 80
                    ? "bg-emerald-500"
                    : auditResult.overallReadinessScore >= 50
                    ? "bg-amber-500"
                    : "bg-rose-500"
                }`}
                style={{ width: `${auditResult.overallReadinessScore}%` }}
              />
            </div>
          </div>

          {/* Audit Issues List */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900">
              Audit Findings & Statutory Citations ({auditResult.issues.length})
            </h4>

            {auditResult.issues.map((issue, idx) => (
              <div
                key={idx}
                className={`rounded-xl border p-4 transition-all ${
                  issue.severity === "CRITICAL"
                    ? "border-rose-200 bg-rose-50/50"
                    : issue.severity === "WARNING"
                    ? "border-amber-200 bg-amber-50/50"
                    : "border-emerald-200 bg-emerald-50/50"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {issue.severity === "CRITICAL" && (
                    <XCircle className="size-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  {issue.severity === "WARNING" && (
                    <AlertTriangle className="size-5 text-amber-600 shrink-0 mt-0.5" />
                  )}
                  {issue.severity === "RESOLVED" && (
                    <CheckCircle2 className="size-5 text-emerald-600 shrink-0 mt-0.5" />
                  )}

                  <div className="space-y-1">
                    <h5 className="text-sm font-bold text-slate-900">{issue.title}</h5>
                    <p className="text-xs text-slate-700 leading-relaxed">{issue.description}</p>
                    <div className="rounded-md bg-white/70 p-2 text-xs font-medium text-slate-800 border border-slate-200/60">
                      <span className="font-semibold text-orange-700">Required Solution: </span>
                      {issue.solution}
                    </div>
                    <span className="block text-[10px] text-slate-400 font-mono">
                      Statutory Rule: {issue.statutoryReference}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* NPCI Bank Mandate Form Action Box */}
          {auditResult.npciStatus !== "SEEDED" && (
            <div className="rounded-2xl border border-indigo-200 bg-indigo-50/60 p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-indigo-950 flex items-center gap-1.5">
                    <Building className="size-4 text-indigo-600" />
                    NPCI Aadhaar Seeding Bank Mandate Form
                  </h4>
                  <p className="mt-1 text-xs text-indigo-800">
                    Take this pre-filled statutory form to your branch to get your account DBT-seeded in 24 hours.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowMandateModal(true)}
                    className="rounded-lg border border-indigo-300 bg-white px-3 py-1.5 text-xs font-semibold text-indigo-900 hover:bg-indigo-50 transition-colors"
                  >
                    View Form
                  </button>
                  <button
                    onClick={handleDownloadMandate}
                    className="flex items-center gap-1.5 rounded-lg bg-indigo-700 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-indigo-800 transition-colors"
                  >
                    <Download className="size-3.5" />
                    Download Form
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Mandate Form Inspection */}
      {showMandateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-base font-bold text-slate-900">
                Official NPCI Bank Mandate Form (Annexure I)
              </h4>
              <button
                onClick={() => setShowMandateModal(false)}
                className="rounded p-1 text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <pre className="mt-4 overflow-x-auto whitespace-pre rounded-xl bg-slate-50 p-4 font-mono text-xs text-slate-800 border border-slate-200">
              {mandateText}
            </pre>

            <div className="mt-4 flex justify-between">
              <button
                onClick={handleCopyMandate}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50"
              >
                {copiedForm ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
                {copiedForm ? "Copied!" : "Copy Text"}
              </button>

              <button
                onClick={handleDownloadMandate}
                className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
              >
                <Download className="size-3.5" />
                Download Form (Text)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
