import { UserProfile } from "@/lib/cedar/evaluator";
import { DocumentAuditInput } from "@/lib/audit/documentAuditor";

export interface DemoPersona {
  id: string;
  name: string;
  tagline: string;
  story: string;
  profile: UserProfile;
  auditInput: DocumentAuditInput;
}

export const DEMO_PERSONAS: DemoPersona[] = [
  {
    id: "rajesh_st_tribal",
    name: "Rajesh Kumar Munda",
    tagline: "ST Tribal Student (1st Year B.Tech, Mayurbhanj, Odisha)",
    story: "Family income ₹1.8L. Eligible for 100% tuition waiver under Post-Matric ST, but his marksheet says 'Rajesh K Munda' while Aadhaar says 'Rajesh Kumar Munda', and his SBI account is not NPCI-seeded.",
    profile: {
      name: "Rajesh Kumar Munda",
      category: "ST",
      annualFamilyIncome: 180000,
      educationLevel: "UG",
      state: "Odisha",
      district: "Mayurbhanj",
      gender: "Male",
      hasPaternalCasteRecord: true,
      hasValidAddressProof: true,
      residenceYearsInState: 18,
      heldDocuments: ["Caste_Certificate"] // Missing Income Certificate renewal
    },
    auditInput: {
      nameOnAadhaar: "Rajesh Kumar Munda",
      nameOnMarksheet: "Rajesh K Munda",
      dobOnAadhaar: "2005-08-14",
      dobOnMarksheet: "2005-08-14",
      incomeCertificateIssueDate: "2025-11-20", // Expired
      isAadhaarLinkedToBank: true,
      isNpciSeeded: false, // The classic trap!
      bankName: "State Bank of India (Mayurbhanj Branch)"
    }
  },
  {
    id: "priya_ews_general",
    name: "Priya Sharma",
    tagline: "General / EWS Girl Student (B.Sc 1st Year, Bhopal, MP)",
    story: "Family income ₹3.2L from a small tea shop. Not eligible for SC/ST quotas, but qualifies for 10% EWS reservation and Central Sector Merit scholarship, but lacks an EWS certificate.",
    profile: {
      name: "Priya Sharma",
      category: "General",
      annualFamilyIncome: 320000,
      educationLevel: "UG",
      state: "Madhya Pradesh",
      district: "Bhopal",
      gender: "Female",
      marksPercentage: 84,
      hasPaternalCasteRecord: false,
      hasValidAddressProof: true,
      residenceYearsInState: 12,
      heldDocuments: ["Income_Certificate"]
    },
    auditInput: {
      nameOnAadhaar: "Priya Sharma",
      nameOnMarksheet: "Priya Sharma",
      dobOnAadhaar: "2006-03-22",
      dobOnMarksheet: "2006-03-22",
      incomeCertificateIssueDate: "2026-05-10",
      isAadhaarLinkedToBank: true,
      isNpciSeeded: true,
      bankName: "Punjab National Bank"
    }
  },
  {
    id: "sunita_tribal_ready",
    name: "Sunita Murmu",
    tagline: "ST Girl Student (Class 11 Science, Ranchi, Jharkhand)",
    story: "First generation learner from a Santhal tribal family. Income ₹1.1L. All documents active and seeded. Ready for immediate submission on NSP with zero blockers.",
    profile: {
      name: "Sunita Murmu",
      category: "ST",
      annualFamilyIncome: 110000,
      educationLevel: "11th",
      state: "Jharkhand",
      district: "Ranchi",
      gender: "Female",
      hasPaternalCasteRecord: true,
      hasValidAddressProof: true,
      residenceYearsInState: 16,
      heldDocuments: ["Caste_Certificate", "Income_Certificate", "Domicile_Certificate"]
    },
    auditInput: {
      nameOnAadhaar: "Sunita Murmu",
      nameOnMarksheet: "Sunita Murmu",
      dobOnAadhaar: "2008-11-05",
      dobOnMarksheet: "2008-11-05",
      incomeCertificateIssueDate: "2026-06-15",
      isAadhaarLinkedToBank: true,
      isNpciSeeded: true,
      bankName: "Bank of India"
    }
  }
];
