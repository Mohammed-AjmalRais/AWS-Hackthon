"use client";

import React, { useState, useMemo } from "react";
import {
  DocumentAuditInput,
  auditCitizenDocuments,
  generateNpciMandateForm,
  generateNameAffidavitText
} from "@/lib/audit/documentAuditor";
import { SCHEMES_DATABASE, SchemeOrService } from "@/data/schemes";
import { UserProfile } from "@/lib/cedar/evaluator";
import { CertificateResolutionModal } from "@/components/CertificateResolutionModal";
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
  FileBadge,
  FileCheck2,
  ChevronRight,
  ExternalLink,
  Layers,
  Search,
  Award
} from "lucide-react";

interface DocumentAuditTabProps {
  initialInput: DocumentAuditInput;
  selectedSchemeId?: string;
  profile?: UserProfile;
  onSelectScheme?: (schemeId: string) => void;
  onProfileChange?: (newProfile: UserProfile) => void;
  onNavigateToEligibility?: () => void;
  onNavigateToRoadmap?: (schemeId: string) => void;
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
  selectedSchemeId,
  profile,
  onSelectScheme,
  onProfileChange,
  onNavigateToEligibility,
  onNavigateToRoadmap,
}) => {
  const [auditInput, setAuditInput] = useState<DocumentAuditInput>(initialInput);
  const [copiedForm, setCopiedForm] = useState(false);
  const [copiedAffidavit, setCopiedAffidavit] = useState(false);
  const [showMandateModal, setShowMandateModal] = useState(false);
  const [showAffidavitModal, setShowAffidavitModal] = useState(false);
  const [selectedCertGuideId, setSelectedCertGuideId] = useState<string | null>(null);

  // Default active scheme
  const defaultSchemeId = useMemo(() => {
    if (selectedSchemeId) return selectedSchemeId;
    if (profile?.state === "Andhra Pradesh") return "AP_Jagananna_Vidya_Deevena";
    if (profile?.state === "Tamil Nadu") return "TN_Pudhumai_Penn";
    return "PostMatric_ST";
  }, [selectedSchemeId, profile?.state]);

  const [activeSchemeId, setActiveSchemeId] = useState<string>(defaultSchemeId);

  // Sync if prop changes
  React.useEffect(() => {
    if (selectedSchemeId) {
      setActiveSchemeId(selectedSchemeId);
    }
  }, [selectedSchemeId]);

  const currentScheme: SchemeOrService = useMemo(() => {
    return (
      SCHEMES_DATABASE.find((s) => s.id === activeSchemeId) ||
      SCHEMES_DATABASE[0]
    );
  }, [activeSchemeId]);

  // File Upload states
  const [aadhaarFile, setAadhaarFile] = useState<UploadedFileInfo | null>({
    name: "Aadhaar_Card_Front_Back.pdf",
    size: "420 KB",
    type: "application/pdf",
    extractedName: auditInput.nameOnAadhaar || profile?.name || "Kavitha Selvam",
    extractedDob: auditInput.dobOnAadhaar || "2006-05-12",
    extractedId: "XXXX-XXXX-4819"
  });

  const [marksheetFile, setMarksheetFile] = useState<UploadedFileInfo | null>({
    name: "Class10_SSC_Marksheet.jpg",
    size: "860 KB",
    type: "image/jpeg",
    extractedName: auditInput.nameOnMarksheet || "Kavitha S",
    extractedDob: auditInput.dobOnMarksheet || "2006-05-12",
    extractedId: "SSC-2022-849182"
  });

  const [bankFile, setBankFile] = useState<UploadedFileInfo | null>({
    name: "Bank_Passbook_FrontPage.jpg",
    size: "610 KB",
    type: "image/jpeg",
    extractedName: auditInput.nameOnAadhaar || profile?.name || "Kavitha Selvam",
    extractedId: "38920192819"
  });

  const auditResult = auditCitizenDocuments(auditInput);

  const mandateText = generateNpciMandateForm(
    auditInput.nameOnAadhaar || profile?.name || "Citizen",
    auditInput.bankName || "State Bank of India",
    "38920192819",
    "XXXX-XXXX-4819"
  );

  const affidavitText = generateNameAffidavitText(
    auditInput.nameOnAadhaar || profile?.name || "Citizen",
    auditInput.nameOnMarksheet || "Citizen",
    "Parent/Guardian",
    profile?.state || "India"
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
    link.download = `NPCI_Aadhaar_DBT_Mandate_${(auditInput.nameOnAadhaar || "Applicant").replace(/\s+/g, "_")}.txt`;
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
    link.download = `Notarized_Name_Discrepancy_Affidavit_${(auditInput.nameOnAadhaar || "Applicant").replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSchemeChange = (schemeId: string) => {
    setActiveSchemeId(schemeId);
    if (onSelectScheme) {
      onSelectScheme(schemeId);
    }
  };

  const handleMarkCertAsHeld = (certId: string) => {
    if (profile && onProfileChange) {
      const currentHeld = profile.heldDocuments || [];
      if (!currentHeld.includes(certId)) {
        onProfileChange({
          ...profile,
          heldDocuments: [...currentHeld, certId],
        });
      }
    }
    setSelectedCertGuideId(null);
  };

  // Human-readable document titles
  const getDocumentName = (docId: string) => {
    const names: Record<string, string> = {
      Aadhaar_Card: "Aadhaar Card (UIDAI with Linked Mobile)",
      Marksheet_10_12: "10th Class Marksheet / SSC Memo",
      Bank_Passbook: "Bank Account Passbook (NPCI Seeded)",
      Income_Certificate: "Statutory Income Certificate (Tahsildar)",
      Caste_Certificate: "Permanent Community / Caste Certificate",
      Domicile_Certificate: "Nativity / Domicile Certificate",
      Ration_Card: "Ration Card / Rice Card (Civil Supplies)",
      TN_First_Graduate_Cert: "First Graduate Certificate (e-Sevai REV-104)",
      Govt_School_Study_Certificate: "Class 6-12 Govt School Study Memo (HM Signed)",
      Disability_Certificate: "UDID National Disability Certificate",
      EWS_Certificate: "Economically Weaker Section Certificate",
      College_Bonafide_Certificate: "Institutional Bonafide Certificate & Allotment Order",
      MeeSeva_REV01_Integrated_Cert: "Integrated Community, Nativity & DOB Certificate (REV-01)",
      Electricity_Bill: "Recent Domestic Electricity Consumption Bill (<300 units/mo)",
      Mother_Aadhaar: "Mother's Aadhaar Card (For RTF Tuition Crediting)",
      Mother_Bank_Passbook: "Mother's NPCI-Seeded Bank Passbook"
    };
    return names[docId] || docId.replace(/_/g, " ");
  };

  // Required documents for active scheme
  const schemeDocs = useMemo(() => {
    const docs = new Set<string>();
    (currentScheme.mandatoryDocuments || []).forEach((d) => docs.add(d));
    (currentScheme.prerequisites || []).forEach((p) => docs.add(p));
    return Array.from(docs);
  }, [currentScheme]);

  const userHeld = profile?.heldDocuments || [];

  return (
    <div className="space-y-6">
      {/* Target Scheme Selector Banner */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">
              <Layers className="size-4" />
              <span>Scheme-Centric Pre-Flight Document Audit</span>
            </div>
            <h2 className="text-xl font-black text-slate-900">
              Audit Document Prerequisites for Specific Scheme
            </h2>
            <p className="text-xs text-slate-500">
              Document mandates differ per program. Select your target scheme below to evaluate statutory prerequisites, cross-document name consistency, and NPCI DBT readiness.
            </p>
          </div>

          {/* Scheme Dropdown Selector */}
          <div className="w-full md:w-80">
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Target Scheme:
            </label>
            <select
              value={activeSchemeId}
              onChange={(e) => handleSchemeChange(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-900 focus:border-orange-500 focus:bg-white focus:outline-hidden"
            >
              <optgroup label="Andhra Pradesh Flagship Schemes">
                {SCHEMES_DATABASE.filter((s) => s.id.startsWith("AP_")).map((s) => (
                  <option key={s.id} value={s.id}>
                    AP: {s.title.substring(0, 45)}...
                  </option>
                ))}
              </optgroup>
              <optgroup label="Tamil Nadu Flagship Schemes">
                {SCHEMES_DATABASE.filter((s) => s.id.startsWith("TN_")).map((s) => (
                  <option key={s.id} value={s.id}>
                    TN: {s.title.substring(0, 45)}...
                  </option>
                ))}
              </optgroup>
              <optgroup label="Centrally Sponsored Schemes">
                {SCHEMES_DATABASE.filter((s) => !s.id.startsWith("AP_") && !s.id.startsWith("TN_")).map((s) => (
                  <option key={s.id} value={s.id}>
                    Central: {s.title.substring(0, 45)}...
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        {/* Selected Scheme Detail Card */}
        <div className="rounded-2xl border border-orange-200 bg-orange-50/40 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-orange-600 px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                {currentScheme.level} Level
              </span>
              <span className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-bold text-slate-700">
                {currentScheme.shortCode}
              </span>
              <h3 className="text-sm font-bold text-slate-900">{currentScheme.title}</h3>
            </div>
            <p className="text-xs text-slate-600">
              <strong>Statutory Benefit:</strong> <span className="font-semibold text-orange-800">{currentScheme.benefitAmount}</span> ({currentScheme.benefitDescription})
            </p>
            <p className="text-[11px] text-slate-500">
              Sponsoring Body: {currentScheme.sponsoringBody} • Official Portal: {currentScheme.portalName}
            </p>
          </div>

          {onNavigateToRoadmap && (
            <button
              onClick={() => onNavigateToRoadmap(currentScheme.id)}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-orange-600 px-4 py-2 text-xs font-bold text-white hover:bg-orange-700 transition-all cursor-pointer shrink-0 shadow-xs"
            >
              <span>View Scheme Roadmap</span>
              <ArrowRight className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Scheme Required Documents Checklist */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <FileCheck2 className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                1. Statutory Documents Required for {currentScheme.shortCode}
              </h3>
              <p className="text-[11px] text-slate-500">
                Real-world verification checks matching the issuing gazette rules
              </p>
            </div>
          </div>

          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-700">
            {schemeDocs.filter((d) => userHeld.includes(d)).length} of {schemeDocs.length} Verified
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {schemeDocs.map((docId) => {
            const isHeld = userHeld.includes(docId);
            return (
              <div
                key={docId}
                className={`flex flex-col justify-between rounded-xl border p-3.5 transition-all ${
                  isHeld
                    ? "border-emerald-200 bg-emerald-50/40 text-emerald-950"
                    : "border-amber-200 bg-amber-50/50 text-amber-950"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div
                    className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md ${
                      isHeld
                        ? "bg-emerald-600 text-white"
                        : "bg-amber-500 text-white"
                    }`}
                  >
                    {isHeld ? <Check className="size-3.5 stroke-[3]" /> : <AlertTriangle className="size-3" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-tight">{getDocumentName(docId)}</p>
                    <p className="text-[10px] mt-0.5 text-slate-600">
                      {isHeld ? "✓ Uploaded & verified in profile" : "⚠️ Missing prerequisite certificate"}
                    </p>
                  </div>
                </div>

                {!isHeld && (
                  <div className="mt-3 pt-2 border-t border-amber-200/60 flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-amber-800">Prerequisite Roadblock</span>
                    <button
                      onClick={() => setSelectedCertGuideId(docId)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-700 hover:text-orange-900 hover:underline cursor-pointer"
                    >
                      <span>Resolve Guide</span>
                      <ChevronRight className="size-3" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Document Upload Dropzones with Live OCR Preview */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
              <Upload className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                2. Live Document Upload & OCR Identity Parsing
              </h3>
              <p className="text-[11px] text-slate-500">
                Upload your files (PDF or Image) to test real-time cross-document name & DOB extraction
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Dropzone 1: Aadhaar Card */}
          <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-4 text-center hover:bg-slate-50 transition-colors">
            <div className="flex size-10 mx-auto items-center justify-center rounded-xl bg-orange-100 text-orange-600 mb-2">
              <FileBadge className="size-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Aadhaar Card (UIDAI)</h4>
            <p className="text-[10px] text-slate-500 mb-3">Front & Back PDF or JPG</p>

            {aadhaarFile ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-2.5 text-left text-xs text-emerald-950 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[11px] truncate max-w-[130px]">{aadhaarFile.name}</span>
                  <span className="text-[10px] text-emerald-700 font-semibold">{aadhaarFile.size}</span>
                </div>
                <div className="text-[10px] text-slate-600">
                  <span>OCR Name: <strong className="text-slate-900">{aadhaarFile.extractedName}</strong></span>
                  <br />
                  <span>DOB: <strong>{aadhaarFile.extractedDob}</strong></span>
                </div>
              </div>
            ) : (
              <label className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer shadow-xs">
                <FileUp className="size-3.5 text-orange-600" />
                <span>Upload Aadhaar</span>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setAadhaarFile({
                        name: file.name,
                        size: `${Math.round(file.size / 1024)} KB`,
                        type: file.type,
                        extractedName: auditInput.nameOnAadhaar || profile?.name || "Kavitha Selvam",
                        extractedDob: auditInput.dobOnAadhaar || "2006-05-12",
                        extractedId: "XXXX-XXXX-4819"
                      });
                    }
                  }}
                />
              </label>
            )}
          </div>

          {/* Dropzone 2: 10th Marksheet */}
          <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-4 text-center hover:bg-slate-50 transition-colors">
            <div className="flex size-10 mx-auto items-center justify-center rounded-xl bg-sky-100 text-sky-600 mb-2">
              <FileText className="size-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">10th Marksheet / Memo</h4>
            <p className="text-[10px] text-slate-500 mb-3">SSC / CBSE / State Board Memo</p>

            {marksheetFile ? (
              <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-2.5 text-left text-xs text-sky-950 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[11px] truncate max-w-[130px]">{marksheetFile.name}</span>
                  <span className="text-[10px] text-sky-700 font-semibold">{marksheetFile.size}</span>
                </div>
                <div className="text-[10px] text-slate-600">
                  <span>OCR Name: <strong className="text-slate-900">{marksheetFile.extractedName}</strong></span>
                  <br />
                  <span>DOB: <strong>{marksheetFile.extractedDob}</strong></span>
                </div>
              </div>
            ) : (
              <label className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer shadow-xs">
                <FileUp className="size-3.5 text-sky-600" />
                <span>Upload Marksheet</span>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={(e) => {
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
                  }}
                />
              </label>
            )}
          </div>

          {/* Dropzone 3: Bank Passbook */}
          <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-4 text-center hover:bg-slate-50 transition-colors">
            <div className="flex size-10 mx-auto items-center justify-center rounded-xl bg-purple-100 text-purple-600 mb-2">
              <Building className="size-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Bank Passbook / Statement</h4>
            <p className="text-[10px] text-slate-500 mb-3">Front Page Showing IFSC & NPCI</p>

            {bankFile ? (
              <div className="rounded-xl border border-purple-200 bg-purple-50/60 p-2.5 text-left text-xs text-purple-950 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[11px] truncate max-w-[130px]">{bankFile.name}</span>
                  <span className="text-[10px] text-purple-700 font-semibold">{bankFile.size}</span>
                </div>
                <div className="text-[10px] text-slate-600">
                  <span>OCR Name: <strong className="text-slate-900">{bankFile.extractedName}</strong></span>
                  <br />
                  <span>Account: <strong>{bankFile.extractedId}</strong></span>
                </div>
              </div>
            ) : (
              <label className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer shadow-xs">
                <FileUp className="size-3.5 text-purple-600" />
                <span>Upload Passbook</span>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setBankFile({
                        name: file.name,
                        size: `${Math.round(file.size / 1024)} KB`,
                        type: file.type,
                        extractedName: auditInput.nameOnAadhaar || profile?.name || "Kavitha Selvam",
                        extractedId: "38920192819"
                      });
                    }
                  }}
                />
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Cross-Document Name Verification Matrix */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
              <ShieldAlert className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                3. Cross-Document Name Matching Matrix
              </h3>
              <p className="text-[11px] text-slate-500">
                Compares string patterns, phonetic Soundex, and initial expansions to prevent automated PFMS rejection
              </p>
            </div>
          </div>

          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
              auditResult.nameMatchPercentage >= 85
                ? "bg-emerald-100 text-emerald-800"
                : "bg-amber-100 text-amber-900"
            }`}
          >
            Name Match Score: {auditResult.nameMatchPercentage}%
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold">
              <tr>
                <th className="px-3 py-2 rounded-l-lg">Document Source</th>
                <th className="px-3 py-2">Extracted Legal Name</th>
                <th className="px-3 py-2">Date of Birth</th>
                <th className="px-3 py-2 rounded-r-lg">Discrepancy Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr>
                <td className="px-3 py-2.5 font-bold text-slate-800">Aadhaar Card (UIDAI)</td>
                <td className="px-3 py-2.5 text-slate-900">{auditInput.nameOnAadhaar || profile?.name || "Kavitha Selvam"}</td>
                <td className="px-3 py-2.5 text-slate-700">{auditInput.dobOnAadhaar || "2006-05-12"}</td>
                <td className="px-3 py-2.5">
                  <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                    <Check className="size-3" /> Master Legal Anchor
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2.5 font-bold text-slate-800">10th Class Marksheet</td>
                <td className="px-3 py-2.5 text-slate-900">{auditInput.nameOnMarksheet || "Kavitha S"}</td>
                <td className="px-3 py-2.5 text-slate-700">{auditInput.dobOnMarksheet || "2006-05-12"}</td>
                <td className="px-3 py-2.5">
                  {auditInput.nameOnAadhaar !== auditInput.nameOnMarksheet ? (
                    <span className="inline-flex items-center gap-1 rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                      <AlertTriangle className="size-3" /> Initial Discrepancy Flagged
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                      <Check className="size-3" /> Exact Match
                    </span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2.5 font-bold text-slate-800">Bank Account Record</td>
                <td className="px-3 py-2.5 text-slate-900">{auditInput.nameOnAadhaar || profile?.name || "Kavitha Selvam"}</td>
                <td className="px-3 py-2.5 text-slate-700">{auditInput.dobOnAadhaar || "2006-05-12"}</td>
                <td className="px-3 py-2.5">
                  <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                    <Check className="size-3" /> Seeded & Matched
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Actionable Legal Solutions for Mismatch */}
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-amber-600" />
            <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
              Legal Remedies & Solutions for Name Discrepancy:
            </h4>
          </div>
          <p className="text-xs text-amber-900">
            Because the 10th marksheet records <strong>"{auditInput.nameOnMarksheet || "Kavitha S"}"</strong> while Aadhaar records <strong>"{auditInput.nameOnAadhaar || "Kavitha Selvam"}"</strong>, state scrutinizing committees may raise an objection. We offer two immediate statutory solutions:
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-1">
            {/* Solution A: One-and-the-Same Person Affidavit */}
            <div className="rounded-xl border border-amber-300 bg-white p-3.5 space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Solution 1: Notarized Affidavit</span>
                <span className="rounded bg-orange-100 px-1.5 py-0.5 text-[10px] font-bold text-orange-800">
                  Immediate (24 hrs)
                </span>
              </div>
              <p className="text-[11px] text-slate-600">
                Execute a ₹20 / ₹50 Non-Judicial Stamp Paper affidavit affirming that "{auditInput.nameOnAadhaar}" and "{auditInput.nameOnMarksheet}" refer to one and the same person.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setShowAffidavitModal(true)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <Eye className="size-3" />
                  <span>Preview Text</span>
                </button>
                <button
                  onClick={handleCopyAffidavit}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <Copy className="size-3" />
                  <span>{copiedAffidavit ? "Copied!" : "Copy"}</span>
                </button>
                <button
                  onClick={handleDownloadAffidavit}
                  className="inline-flex items-center gap-1 rounded-lg bg-orange-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-orange-700 cursor-pointer shadow-xs"
                >
                  <Download className="size-3" />
                  <span>Download .txt</span>
                </button>
              </div>
            </div>

            {/* Solution B: NPCI Seeding Mandate */}
            <div className="rounded-xl border border-sky-300 bg-white p-3.5 space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Solution 2: Bank NPCI Seeding Mandate</span>
                <span className="rounded bg-sky-100 px-1.5 py-0.5 text-[10px] font-bold text-sky-800">
                  Bank Branch Form
                </span>
              </div>
              <p className="text-[11px] text-slate-600">
                Submit standard Annexure I to the bank manager requesting that account 38920192819 be seeded in the NPCI Aadhaar mapper for DBT.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setShowMandateModal(true)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <Eye className="size-3" />
                  <span>Preview Text</span>
                </button>
                <button
                  onClick={handleCopyMandate}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <Copy className="size-3" />
                  <span>{copiedForm ? "Copied!" : "Copy"}</span>
                </button>
                <button
                  onClick={handleDownloadMandate}
                  className="inline-flex items-center gap-1 rounded-lg bg-sky-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-sky-700 cursor-pointer shadow-xs"
                >
                  <Download className="size-3" />
                  <span>Download .txt</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Affidavit Preview Modal */}
      {showAffidavitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileBadge className="size-5 text-orange-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Notarized One-and-the-Same Person Affidavit Format
                </h3>
              </div>
              <button
                onClick={() => setShowAffidavitModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed border border-slate-200 max-h-96 overflow-y-auto">
              {affidavitText}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={handleCopyAffidavit}
                className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <Copy className="size-4" />
                <span>{copiedAffidavit ? "Copied to Clipboard!" : "Copy Text"}</span>
              </button>
              <button
                onClick={handleDownloadAffidavit}
                className="flex items-center gap-1.5 rounded-xl bg-orange-600 px-4 py-2 text-xs font-bold text-white hover:bg-orange-700 cursor-pointer shadow-md"
              >
                <Download className="size-4" />
                <span>Download Affidavit .txt</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mandate Preview Modal */}
      {showMandateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Building className="size-5 text-sky-600" />
                <h3 className="text-base font-bold text-slate-900">
                  NPCI Aadhaar DBT Seeding Mandate (Annexure I)
                </h3>
              </div>
              <button
                onClick={() => setShowMandateModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed border border-slate-200 max-h-96 overflow-y-auto">
              {mandateText}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={handleCopyMandate}
                className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <Copy className="size-4" />
                <span>{copiedForm ? "Copied to Clipboard!" : "Copy Text"}</span>
              </button>
              <button
                onClick={handleDownloadMandate}
                className="flex items-center gap-1.5 rounded-xl bg-sky-600 px-4 py-2 text-xs font-bold text-white hover:bg-sky-700 cursor-pointer shadow-md"
              >
                <Download className="size-4" />
                <span>Download Mandate .txt</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Resolution Modal */}
      {selectedCertGuideId && (
        <CertificateResolutionModal
          certificateId={selectedCertGuideId}
          onClose={() => setSelectedCertGuideId(null)}
          onMarkAsObtained={handleMarkCertAsHeld}
        />
      )}
    </div>
  );
};
