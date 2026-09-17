"use client";

import React, { useState } from "react";
import {
  DocumentAuditInput,
  auditCitizenDocuments,
  generateNpciMandateForm,
  generateNameAffidavitText
} from "@/lib/audit/documentAuditor";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Download,
  Copy,
  ShieldAlert,
  FileText,
  Building,
  Check,
  Upload,
  FileUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Eye,
  X,
  FileBadge
} from "lucide-react";

interface DocumentAuditTabProps {
  initialInput: DocumentAuditInput;
  onNavigateToEligibility?: () => void;
  onNavigateToRoadmap?: () => void;
}

interface UploadedFileInfo {
  name: string;
  size: string;
  type: string;
  extractedName?: string;
  extractedDob?: string;
  extractedId?: string;
}

export const DocumentAuditTab: React.FC<DocumentAuditTabProps> = ({
  initialInput,
  onNavigateToEligibility,
  onNavigateToRoadmap,
}) => {
  const [auditInput, setAuditInput] = useState<DocumentAuditInput>(initialInput);
  const [copiedForm, setCopiedForm] = useState(false);
  const [copiedAffidavit, setCopiedAffidavit] = useState(false);
  const [showMandateModal, setShowMandateModal] = useState(false);
  const [showAffidavitModal, setShowAffidavitModal] = useState(false);

  // File Upload states
  const [aadhaarFile, setAadhaarFile] = useState<UploadedFileInfo | null>({
    name: "Aadhaar_Front_Back.pdf",
    size: "420 KB",
    type: "application/pdf",
    extractedName: auditInput.nameOnAadhaar,
    extractedDob: auditInput.dobOnAadhaar,
    extractedId: "XXXX-XXXX-4819"
  });

  const [marksheetFile, setMarksheetFile] = useState<UploadedFileInfo | null>({
    name: "Class10_SSC_Marksheet.jpg",
    size: "860 KB",
    type: "image/jpeg",
    extractedName: auditInput.nameOnMarksheet,
    extractedDob: auditInput.dobOnMarksheet,
    extractedId: "SSC-2022-849182"
  });

  const [bankFile, setBankFile] = useState<UploadedFileInfo | null>({
    name: "Bank_Passbook_FrontPage.jpg",
    size: "610 KB",
    type: "image/jpeg",
    extractedName: auditInput.nameOnAadhaar,
    extractedId: "38920192819"
  });

  const auditResult = auditCitizenDocuments(auditInput);

  const mandateText = generateNpciMandateForm(
    auditInput.nameOnAadhaar,
    auditInput.bankName || "State Bank of India",
    "38920192819",
    "XXXX-XXXX-4819"
  );

  const affidavitText = generateNameAffidavitText(
    auditInput.nameOnAadhaar,
    auditInput.nameOnMarksheet,
    "V. Selvam",
    "Tamil Nadu"
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

  const handleCopyAffidavit = () => {
    navigator.clipboard.writeText(affidavitText);
    setCopiedAffidavit(true);
    setTimeout(() => setCopiedAffidavit(false), 2500);
  };

  const handleDownloadAffidavit = () => {
    const blob = new Blob([affidavitText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Notarized_Name_Discrepancy_Affidavit_${auditInput.nameOnAadhaar.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Mock File Upload Handlers (Simulates OCR parsing)
  const handleAadhaarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAadhaarFile({
        name: file.name,
        size: `${Math.round(file.size / 1024)} KB`,
        type: file.type,
        extractedName: auditInput.nameOnAadhaar || "Kavitha Selvam",
        extractedDob: auditInput.dobOnAadhaar || "2006-05-12",
        extractedId: "XXXX-XXXX-4819"
      });
    }
  };

  const handleMarksheetUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMarksheetFile({
        name: file.name,
        size: `${Math.round(file.size / 1024)} KB`,
        type: file.type,
        extractedName: auditInput.nameOnMarksheet || "Kavitha S",
        extractedDob: auditInput.dobOnMarksheet || "2006-05-12",
        extractedId: "SSC-2022-849182"
      });
    }
  };

  const handleBankUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBankFile({
        name: file.name,
        size: `${Math.round(file.size / 1024)} KB`,
        type: file.type,
        extractedName: auditInput.nameOnAadhaar || "Kavitha Selvam",
        extractedId: "38920192819"
      });
    }
  };

  const isNameMismatched = auditResult.nameMatchPercentage < 100;
  const isDobMismatched = !auditResult.dobMatched;
  const isNpciProblematic = auditResult.npciStatus !== "SEEDED";

  return (
    <div className="space-y-8">
      {/* Top Guided Pipeline Flow Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
              ✓
            </span>
            <span className="text-xs font-bold text-slate-700">1. Eligibility Criteria</span>
            <span className="text-slate-300">➔</span>

            <span className="flex size-6 items-center justify-center rounded-full bg-orange-600 text-white font-bold text-xs">
              2
            </span>
            <span className="text-xs font-bold text-orange-600">2. Document Upload & Cross-Match Audit</span>
            <span className="text-slate-300">➔</span>

            <span className="flex size-6 items-center justify-center rounded-full bg-slate-100 text-slate-600 font-bold text-xs">
              3
            </span>
            <span className="text-xs font-semibold text-slate-500">3. NPCI Bank Seeding Mandate</span>
          </div>

          {onNavigateToEligibility && (
            <button
              onClick={onNavigateToEligibility}
              className="text-xs font-bold text-orange-600 hover:underline cursor-pointer"
            >
              ← Back to Eligibility Schemes
            </button>
          )}
        </div>
      </div>

      {/* Top Banner Explaining the Rejection Funnel */}
      <div className="rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50 via-amber-50/50 to-white p-6">
        <div className="flex items-start gap-3">
          <ShieldAlert className="size-6 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-base font-black text-rose-950">
              Pre-Flight Document Audit: Prevent Silent Application Rejections
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-rose-800">
              Over 40% of government scholarship & DBT rejections occur not due to ineligibility, but because of clerical mismatches (e.g. initials on marksheets vs full name on Aadhaar) or unseeded NPCI bank accounts. Upload and cross-verify your documents below before submitting on government portals.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 1: INTERACTIVE DOCUMENT UPLOAD ZONES */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Upload className="size-4 text-orange-600" />
              <span>Step 1: Upload Documents for OCR Cross-Matching</span>
            </h4>
            <p className="text-xs text-slate-500">
              Upload client documents (PDF or Image) to test real-world e-KYC name matching and bank seeding
            </p>
          </div>
          <span className="text-[11px] font-mono font-bold text-orange-700 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
            Intelligent Document Validator
          </span>
        </div>

        {/* 3 Upload Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Box 1: Aadhaar Card */}
          <div className="rounded-2xl border-2 border-dashed border-slate-200 p-4 transition-all hover:border-orange-400 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <FileBadge className="size-4 text-blue-600" />
                Aadhaar Card
              </span>
              <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[9px] font-black text-blue-800">
                Primary Identity
              </span>
            </div>

            {aadhaarFile ? (
              <div className="rounded-xl bg-white p-3 border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span className="truncate max-w-[170px]">{aadhaarFile.name}</span>
                  <span className="text-[10px] text-slate-400">{aadhaarFile.size}</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Name: <strong>{aadhaarFile.extractedName}</strong>
                </p>
                <p className="text-[10px] text-slate-400 font-mono">UID: {aadhaarFile.extractedId}</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 pt-1">
                  <CheckCircle2 className="size-3" /> OCR Verified
                </span>
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-slate-400">
                Drag & drop or upload Aadhaar PDF/Image
              </div>
            )}

            <label className="flex items-center justify-center gap-1.5 w-full rounded-xl bg-slate-900 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors cursor-pointer">
              <FileUp className="size-3.5" />
              <span>Replace / Upload Aadhaar</span>
              <input
                type="file"
                accept="application/pdf,image/*"
                onChange={handleAadhaarUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Box 2: 10th Marksheet */}
          <div className="rounded-2xl border-2 border-dashed border-slate-200 p-4 transition-all hover:border-orange-400 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <FileText className="size-4 text-orange-600" />
                10th Class Marksheet
              </span>
              <span className="rounded bg-orange-100 px-1.5 py-0.5 text-[9px] font-black text-orange-800">
                Date of Birth Proof
              </span>
            </div>

            {marksheetFile ? (
              <div className="rounded-xl bg-white p-3 border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span className="truncate max-w-[170px]">{marksheetFile.name}</span>
                  <span className="text-[10px] text-slate-400">{marksheetFile.size}</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Name: <strong>{marksheetFile.extractedName}</strong>
                </p>
                <p className="text-[10px] text-slate-400 font-mono">Roll: {marksheetFile.extractedId}</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 pt-1">
                  <CheckCircle2 className="size-3" /> OCR Verified
                </span>
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-slate-400">
                Drag & drop or upload 10th Marksheet
              </div>
            )}

            <label className="flex items-center justify-center gap-1.5 w-full rounded-xl bg-slate-900 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors cursor-pointer">
              <FileUp className="size-3.5" />
              <span>Replace / Upload Marksheet</span>
              <input
                type="file"
                accept="application/pdf,image/*"
                onChange={handleMarksheetUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Box 3: Bank Passbook */}
          <div className="rounded-2xl border-2 border-dashed border-slate-200 p-4 transition-all hover:border-orange-400 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Building className="size-4 text-emerald-600" />
                Bank Passbook / Cheque
              </span>
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-black text-emerald-800">
                DBT Destination
              </span>
            </div>

            {bankFile ? (
              <div className="rounded-xl bg-white p-3 border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span className="truncate max-w-[170px]">{bankFile.name}</span>
                  <span className="text-[10px] text-slate-400">{bankFile.size}</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Account Name: <strong>{bankFile.extractedName}</strong>
                </p>
                <p className="text-[10px] text-slate-400 font-mono">A/C: {bankFile.extractedId}</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 pt-1">
                  <CheckCircle2 className="size-3" /> Account Active
                </span>
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-slate-400">
                Drag & drop or upload Bank Passbook
              </div>
            )}

            <label className="flex items-center justify-center gap-1.5 w-full rounded-xl bg-slate-900 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors cursor-pointer">
              <FileUp className="size-3.5" />
              <span>Replace / Upload Passbook</span>
              <input
                type="file"
                accept="application/pdf,image/*"
                onChange={handleBankUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* SECTION 2: LIVE CROSS-MATCHING AUDIT MATRIX */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* LEFT: Particulars Editor & NPCI Selector (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-sm font-black text-slate-900">
                Document Details (Editable)
              </h4>
              <span className="text-[11px] font-medium text-slate-500 font-mono">Live Sync</span>
            </div>

            <div className="space-y-4">
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
                  placeholder="e.g. Kavitha Selvam"
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-800 focus:border-orange-500 focus:outline-hidden"
                />
              </div>

              {/* Name on 10th Marksheet */}
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Full Name on 10th Marksheet / Certificate
                </label>
                <input
                  type="text"
                  value={auditInput.nameOnMarksheet}
                  onChange={(e) =>
                    setAuditInput({ ...auditInput, nameOnMarksheet: e.target.value })
                  }
                  placeholder="e.g. Kavitha S"
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-800 focus:border-orange-500 focus:outline-hidden"
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
                    value={auditInput.dobOnAadhaar || "2006-05-12"}
                    onChange={(e) =>
                      setAuditInput({ ...auditInput, dobOnAadhaar: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-2 py-1.5 text-xs text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Marksheet DOB
                  </label>
                  <input
                    type="date"
                    value={auditInput.dobOnMarksheet || "2006-05-12"}
                    onChange={(e) =>
                      setAuditInput({ ...auditInput, dobOnMarksheet: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-2 py-1.5 text-xs text-slate-800"
                  />
                </div>
              </div>

              {/* The NPCI Seeding Selector */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 space-y-2">
                <label className="block text-xs font-black text-amber-950">
                  Bank Account Aadhaar DBT Status (NPCI Mapper)
                </label>
                <p className="text-[11px] text-amber-800">
                  Is your bank account mapped on the NPCI gateway for scholarship Direct Benefit Transfer?
                </p>

                <div className="space-y-2 pt-1">
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
                      Only Aadhaar Linked (ATM KYC, NOT Seeded) ⚠️
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
                      Not Linked or Unknown (Immediate Rejection) ❌
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Results, Mismatch Analysis & Actionable Solutions (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Readiness Score Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Pre-Flight Submission Status
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <h3 className="text-xl font-black text-slate-900">
                    Application Readiness Score
                  </h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-black ${
                      auditResult.overallReadinessScore >= 80
                        ? "bg-emerald-100 text-emerald-800"
                        : auditResult.overallReadinessScore >= 50
                        ? "bg-amber-100 text-amber-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {auditResult.overallReadinessScore} / 100
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div>
                {auditResult.canSubmitNow ? (
                  <span className="flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="size-4" />
                    <span>Safe to Submit</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 rounded-xl bg-rose-50 px-3.5 py-2 text-xs font-bold text-rose-700 border border-rose-200">
                    <AlertTriangle className="size-4" />
                    <span>Clerical Risks Detected</span>
                  </span>
                )}
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-4">
              <div className="rounded-2xl bg-slate-50 p-3 border border-slate-100">
                <span className="text-[10px] font-semibold text-slate-500 block">Name Match</span>
                <span className={`text-base font-black ${auditResult.nameMatchPercentage === 100 ? "text-emerald-600" : "text-amber-600"}`}>
                  {auditResult.nameMatchPercentage}%
                </span>
                <span className="text-[10px] text-slate-400 block truncate">
                  {auditResult.nameMatchPercentage === 100 ? "Exact Match" : "Initial Expansion Mismatch"}
                </span>
              </div>

              <div className="rounded-2xl bg-slate-50 p-3 border border-slate-100">
                <span className="text-[10px] font-semibold text-slate-500 block">DOB Match</span>
                <span className={`text-base font-black ${auditResult.dobMatched ? "text-emerald-600" : "text-rose-600"}`}>
                  {auditResult.dobMatched ? "Consistent" : "Discrepant"}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  {auditResult.dobMatched ? "Aadhaar = Marksheet" : "DOBs Differ!"}
                </span>
              </div>

              <div className="rounded-2xl bg-slate-50 p-3 border border-slate-100 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-semibold text-slate-500 block">NPCI DBT Seeding</span>
                <span className={`text-base font-black ${auditResult.npciStatus === "SEEDED" ? "text-emerald-600" : "text-rose-600"}`}>
                  {auditResult.npciStatus === "SEEDED" ? "Seeded" : "Unseeded ⚠️"}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  {auditResult.npciStatus === "SEEDED" ? "DBT Ready" : "Treasury Rejection"}
                </span>
              </div>
            </div>

            {/* Cross-Matching Table */}
            <div className="space-y-3 pt-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Detected Discrepancies & Issues ({auditResult.issues.length})
              </h5>

              <div className="space-y-3">
                {auditResult.issues.map((issue, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl border p-4 text-xs space-y-2 ${
                      issue.severity === "CRITICAL"
                        ? "border-rose-200 bg-rose-50/70 text-rose-950"
                        : issue.severity === "WARNING"
                        ? "border-amber-200 bg-amber-50/70 text-amber-950"
                        : "border-emerald-200 bg-emerald-50/70 text-emerald-950"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 font-bold">
                        {issue.severity === "CRITICAL" ? (
                          <XCircle className="size-4 text-rose-600 shrink-0" />
                        ) : issue.severity === "WARNING" ? (
                          <AlertTriangle className="size-4 text-amber-600 shrink-0" />
                        ) : (
                          <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                        )}
                        <span>{issue.title}</span>
                      </div>
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/70 font-bold">
                        {issue.severity}
                      </span>
                    </div>

                    <p className="text-[11px] leading-relaxed opacity-90">{issue.description}</p>

                    <div className="rounded-xl bg-white/80 p-2.5 border border-black/5 space-y-1">
                      <strong className="text-[11px] font-bold block">Actionable Legal Solution:</strong>
                      <p className="text-[11px] leading-relaxed">{issue.solution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ============================================================= */}
          {/* ACTIONABLE LEGAL SOLUTIONS / REMEDIES (USER PERSPECTIVE)       */}
          {/* ============================================================= */}
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-orange-600" />
                <h4 className="text-sm font-black text-slate-900">
                  Ready-to-Use Legal Solutions & Remedies
                </h4>
              </div>
              <span className="text-[10px] text-slate-500 font-semibold">1-Click Downloads</span>
            </div>

            {/* Remedy 1: Notarized Name Discrepancy Affidavit */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h5 className="font-bold text-xs text-amber-950">
                    Solution 1: Notarized &ldquo;One-and-the-Same Person&rdquo; Affidavit
                  </h5>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    Statutory affidavit for ₹20/₹50 stamp paper to legally protect against initial expansion rejections.
                  </p>
                </div>
                <span className="rounded bg-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-900 shrink-0">
                  Stamp Paper ₹20
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={() => setShowAffidavitModal(true)}
                  className="flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-xs font-bold text-slate-800 border border-slate-300 hover:bg-slate-50 cursor-pointer shadow-2xs"
                >
                  <Eye className="size-3.5 text-slate-500" />
                  <span>Preview Legal Draft</span>
                </button>

                <button
                  onClick={handleCopyAffidavit}
                  className="flex items-center gap-1.5 rounded-xl bg-amber-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-amber-700 cursor-pointer shadow-2xs"
                >
                  {copiedAffidavit ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  <span>{copiedAffidavit ? "Affidavit Copied!" : "Copy Legal Text"}</span>
                </button>

                <button
                  onClick={handleDownloadAffidavit}
                  className="flex items-center gap-1.5 rounded-xl border border-amber-400 bg-white px-3.5 py-2 text-xs font-bold text-amber-900 hover:bg-amber-100 cursor-pointer"
                >
                  <Download className="size-3.5" />
                  <span>Download .txt</span>
                </button>
              </div>
            </div>

            {/* Remedy 2: Bank NPCI Seeding Mandate */}
            <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h5 className="font-bold text-xs text-blue-950">
                    Solution 2: Official NPCI Aadhaar DBT Seeding Mandate (Annexure I)
                  </h5>
                  <p className="text-[11px] text-blue-800 mt-0.5">
                    Statutory mandate form required by all nationalized banks to activate Aadhaar DBT mapping.
                  </p>
                </div>
                <span className="rounded bg-blue-200 px-2 py-0.5 text-[10px] font-bold text-blue-900 shrink-0">
                  Free at Bank
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={() => setShowMandateModal(true)}
                  className="flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-xs font-bold text-slate-800 border border-slate-300 hover:bg-slate-50 cursor-pointer shadow-2xs"
                >
                  <Eye className="size-3.5 text-slate-500" />
                  <span>Preview Mandate</span>
                </button>

                <button
                  onClick={handleCopyMandate}
                  className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-700 cursor-pointer shadow-2xs"
                >
                  {copiedForm ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  <span>{copiedForm ? "Mandate Copied!" : "Copy Mandate Text"}</span>
                </button>

                <button
                  onClick={handleDownloadMandate}
                  className="flex items-center gap-1.5 rounded-xl border border-blue-400 bg-white px-3.5 py-2 text-xs font-bold text-blue-900 hover:bg-blue-100 cursor-pointer"
                >
                  <Download className="size-3.5" />
                  <span>Download .txt</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: PREVIEW AFFIDAVIT */}
      {showAffidavitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 bg-amber-50/60 p-5">
              <h3 className="text-sm font-black text-slate-900">
                Notarized One-and-the-Same Person Affidavit Draft
              </h3>
              <button
                onClick={() => setShowAffidavitModal(false)}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 bg-slate-50 font-mono text-[11px] text-slate-800 leading-relaxed">
              <pre className="whitespace-pre-wrap">{affidavitText}</pre>
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 bg-white p-4">
              <span className="text-[11px] text-slate-500">Print on ₹20/₹50 Non-Judicial Stamp Paper</span>
              <button
                onClick={handleDownloadAffidavit}
                className="flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-700 cursor-pointer"
              >
                <Download className="size-3.5" />
                <span>Download Document</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: PREVIEW MANDATE */}
      {showMandateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 bg-blue-50/60 p-5">
              <h3 className="text-sm font-black text-slate-900">
                NPCI Bank Aadhaar DBT Seeding Mandate (Annexure I)
              </h3>
              <button
                onClick={() => setShowMandateModal(false)}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 bg-slate-50 font-mono text-[11px] text-slate-800 leading-relaxed">
              <pre className="whitespace-pre-wrap">{mandateText}</pre>
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 bg-white p-4">
              <span className="text-[11px] text-slate-500">Submit to Branch Manager</span>
              <button
                onClick={handleDownloadMandate}
                className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 cursor-pointer"
              >
                <Download className="size-3.5" />
                <span>Download Mandate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
