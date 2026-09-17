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
    tagline: "ST Student • 1st Year B.Tech • Mayurbhanj, Odisha",
    story: "Family income ₹1.8L. Admitted to B.Tech through OJEE State Merit Counseling as a Hosteller. Eligible for 100% Tuition Waiver under Post-Matric ST + ₹1,200/mo hosteller stipend. Blocked by an unseeded bank account and initial mismatch.",
    profile: {
      name: "Rajesh Kumar Munda",
      category: "ST",
      gender: "Male",
      isMinority: false,
      isPersonWithDisability: false,
      isOrphanOrSingleParent: false,
      state: "Odisha",
      district: "Mayurbhanj",
      residenceYearsInState: 19,
      isStudyingInHomeState: true,
      educationLevel: "UG",
      courseType: "Regular Full-Time",
      isTechnicalCourse: true,
      admissionQuota: "Merit/Govt Counseling",
      institutionType: "Government",
      marksPercentage: 76,
      isHosteller: true,
      annualFamilyIncome: 180000,
      numberOfSiblingsAvailingScholarship: 0,
      agriculturalLandAcres: 1.5,
      residentialFlatSqFt: 450,
      hasPaternalCasteRecord: true,
      hasValidAddressProof: true,
      isAlreadyReceivingOtherScholarship: false,
      heldDocuments: ["Caste_Certificate"]
    },
    auditInput: {
      nameOnAadhaar: "Rajesh Kumar Munda",
      nameOnMarksheet: "Rajesh K Munda",
      dobOnAadhaar: "2005-08-14",
      dobOnMarksheet: "2005-08-14",
      incomeCertificateIssueDate: "2025-11-20",
      isAadhaarLinkedToBank: true,
      isNpciSeeded: false, // Unseeded trap
      bankName: "State Bank of India (Baripada Branch)"
    }
  },
  {
    id: "priya_ews_general",
    name: "Priya Sharma",
    tagline: "General / EWS Student • 1st Year B.Sc • Bhopal, MP",
    story: "Family income ₹3.2L from a small retail shop. Scored 84% in Class 12. Seeking Central Sector CSSS scholarship and EWS reservation certificate. Lacks formal EWS and Domicile certificates.",
    profile: {
      name: "Priya Sharma",
      category: "General",
      gender: "Female",
      isMinority: false,
      isPersonWithDisability: false,
      isOrphanOrSingleParent: false,
      state: "Madhya Pradesh",
      district: "Bhopal",
      residenceYearsInState: 14,
      isStudyingInHomeState: true,
      educationLevel: "UG",
      courseType: "Regular Full-Time",
      isTechnicalCourse: false,
      admissionQuota: "Merit/Govt Counseling",
      institutionType: "Government",
      marksPercentage: 84,
      isHosteller: false,
      annualFamilyIncome: 320000,
      numberOfSiblingsAvailingScholarship: 0,
      agriculturalLandAcres: 0,
      residentialFlatSqFt: 720,
      hasPaternalCasteRecord: false,
      hasValidAddressProof: true,
      isAlreadyReceivingOtherScholarship: false,
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
    tagline: "ST Girl Student • B.Tech CSE (IIT Kharagpur) • Top Class Scheme",
    story: "Tribal student admitted to IIT Kharagpur under JEE Advanced merit. Income ₹2.1L. Qualifies for MoTA Top Class Education (Full tuition + ₹45,000 laptop allowance) and AICTE Pragati. All documents clean and verified.",
    profile: {
      name: "Sunita Murmu",
      category: "ST",
      gender: "Female",
      isMinority: false,
      isPersonWithDisability: false,
      isOrphanOrSingleParent: false,
      state: "Jharkhand",
      district: "Ranchi",
      residenceYearsInState: 18,
      isStudyingInHomeState: false,
      educationLevel: "UG",
      courseType: "Regular Full-Time",
      isTechnicalCourse: true,
      admissionQuota: "Merit/Govt Counseling",
      institutionType: "Premier/Notified (IIT/NIT/AIIMS)",
      marksPercentage: 89,
      isHosteller: true,
      annualFamilyIncome: 210000,
      numberOfSiblingsAvailingScholarship: 0,
      agriculturalLandAcres: 2.0,
      residentialFlatSqFt: 500,
      hasPaternalCasteRecord: true,
      hasValidAddressProof: true,
      isAlreadyReceivingOtherScholarship: false,
      heldDocuments: ["Caste_Certificate", "Income_Certificate", "Domicile_Certificate"]
    },
    auditInput: {
      nameOnAadhaar: "Sunita Murmu",
      nameOnMarksheet: "Sunita Murmu",
      dobOnAadhaar: "2007-06-18",
      dobOnMarksheet: "2007-06-18",
      incomeCertificateIssueDate: "2026-06-15",
      isAadhaarLinkedToBank: true,
      isNpciSeeded: true,
      bankName: "Bank of India"
    }
  }
];
