export interface OfflineSubmissionDetail {
  centerName: string;
  counterName: string;
  officialStatutoryFee: string;
  maxAuthorizedFee: string;
  feeWarning: string;
  statutoryDaysLimit: number;
  rtsaClause: string;
}

export interface SchemeOrService {
  id: string;
  title: string;
  shortCode: string;
  type: "scholarship" | "certificate" | "healthcare";
  ministry: string;
  sponsoringBody: string;
  level: "Central" | "State";
  targetCategories: string[];
  maxIncome: number;
  educationStages: string[];
  courseTypesAllowed: ("Regular Full-Time" | "Diploma" | "Distance" | "Vocational")[];
  minimumMarksPercentage?: number;
  genderRestriction?: "Female" | "Male" | "All";
  disabilityRequirement?: boolean;
  minDisabilityPercentage?: number;
  minorityOnly?: boolean;
  technicalOnly?: boolean;
  maxSiblingsBenefited?: number;
  managementQuotaAllowed: boolean;
  applicableStates?: string[];
  requiresGovtSchool6To12?: boolean;
  requiresFirstGraduate?: boolean;
  maxElectricityUnitsPerYear?: number;
  benefitAmount: string;
  maintenanceAllowanceHosteller?: string;
  maintenanceAllowanceDayScholar?: string;
  benefitDescription: string;
  officialPortalUrl: string;
  portalName: string;
  portalSchemeCode: string;
  deadline: string;
  daysRemaining: number;
  prerequisites: string[];
  mandatoryDocuments: string[];
  offlineSubmission: OfflineSubmissionDetail;
  cedarPolicyCode: string;
  officialGazetteRef: string;
  faqs: { q: string; a: string }[];
}

export const SCHEMES_DATABASE: SchemeOrService[] = [
  // 1. Post-Matric Scholarship for ST Students (MoTA)
  {
    id: "PostMatric_ST",
    title: "Centrally Sponsored Post-Matric Scholarship for Scheduled Tribe (ST) Students",
    shortCode: "MoTA-PMS-ST",
    type: "scholarship",
    ministry: "Ministry of Tribal Affairs (MoTA), Government of India",
    sponsoringBody: "Centrally Sponsored Scheme (75:25 Central:State funding; 90:10 for NE & Himalayan States)",
    level: "Central",
    targetCategories: ["ST"],
    maxIncome: 250000,
    educationStages: ["11th", "12th", "UG", "PG", "PhD", "Diploma", "Professional"],
    courseTypesAllowed: ["Regular Full-Time", "Diploma"],
    managementQuotaAllowed: false,
    benefitAmount: "100% Compulsory Non-Refundable Tuition Waiver + Living Allowance",
    maintenanceAllowanceHosteller: "Up to ₹1,200 / month (Group 1 courses: Engineering, Medical)",
    maintenanceAllowanceDayScholar: "Up to ₹550 / month",
    benefitDescription: "Reimburses 100% compulsory tuition and examination fees fixed by the State Fee Regulatory Committee, plus annual academic allowance and monthly maintenance stipend deposited via DBT.",
    officialPortalUrl: "https://scholarships.gov.in",
    portalName: "National Scholarship Portal (NSP)",
    portalSchemeCode: "MOTA-PMS-ST-2026",
    deadline: "November 30, 2026",
    daysRemaining: 74,
    prerequisites: ["Caste_Certificate", "Income_Certificate", "Domicile_Certificate"],
    mandatoryDocuments: [
      "Valid ST Caste Certificate issued by Sub-Divisional Officer (SDO) / Tehsildar (Digital barcode)",
      "Current Financial Year Income Certificate (< ₹2,50,000) issued on or after April 1, 2026",
      "Aadhaar Number (active mobile number linked for NSP e-KYC)",
      "Aadhaar-Seeded Bank Account Passbook (must be mapped on NPCI DBT gateway)",
      "Bonafide Certificate issued by College / Institute Principal",
      "Passing Marksheet of previous qualifying board/university examination",
      "Current Academic Year Official Fee Receipt"
    ],
    offlineSubmission: {
      centerName: "Institute Nodal Officer (INO) Desk at College & District Tribal Welfare Office",
      counterName: "Student Welfare & Scholarship Verification Cell",
      officialStatutoryFee: "₹0 (Completely Free under MoTA guidelines)",
      maxAuthorizedFee: "₹0",
      feeWarning: "Colleges and cyber cafes cannot charge processing or application fees for government scholarships.",
      statutoryDaysLimit: 30,
      rtsaClause: "MoTA Operational Guidelines Rev. 2024 Section 7.2"
    },
    cedarPolicyCode: `permit(principal, action == Action::"ApplyScheme", resource == Scheme::"PostMatric_ST")
when {
    principal.category == "ST" &&
    principal.annualFamilyIncome <= 250000 &&
    principal.courseType == "Regular Full-Time" &&
    principal.admissionQuota != "Management" &&
    (principal.educationLevel in ["11th", "12th", "UG", "PG", "PhD", "Diploma", "Professional"])
};`,
    officialGazetteRef: "MoTA Notification No. 14013/01/2021-Scholarship, Gazetted Dec 2023",
    faqs: [
      {
        q: "Can students admitted under Management or NRI quota apply?",
        a: "No. Central scheme guidelines strictly mandate that candidates must be admitted through recognized government merit counseling."
      },
      {
        q: "What if my family income exceeds ₹2,50,000 by even ₹1,000?",
        a: "The income ceiling of ₹2.50 Lakh is a statutory hard limit. Applications with higher income declarations will be rejected during revenue verification."
      }
    ]
  },

  // 2. Central Sector Scheme of Scholarship for College & University Students (CSSS - DoHE)
  {
    id: "CentralSector_College",
    title: "Central Sector Scheme of Scholarship for College and University Students (CSSS)",
    shortCode: "DoHE-CSSS",
    type: "scholarship",
    ministry: "Department of Higher Education (DoHE), Ministry of Education",
    sponsoringBody: "Central Sector Scheme (100% funded by Govt. of India)",
    level: "Central",
    targetCategories: ["ST", "SC", "OBC", "EWS", "General"],
    maxIncome: 450000,
    educationStages: ["UG", "PG"],
    courseTypesAllowed: ["Regular Full-Time"],
    minimumMarksPercentage: 80,
    managementQuotaAllowed: false,
    benefitAmount: "₹12,000 / year for UG (1st to 3rd yr); ₹20,000 / year for PG",
    benefitDescription: "Financial assistance for meritorious students who are above the 80th percentile of successful candidates in the relevant stream from the respective State Examination Board in Class 12.",
    officialPortalUrl: "https://scholarships.gov.in",
    portalName: "National Scholarship Portal (NSP)",
    portalSchemeCode: "DOHE-CSSS-2026",
    deadline: "October 31, 2026",
    daysRemaining: 44,
    prerequisites: ["Income_Certificate"],
    mandatoryDocuments: [
      "Class 12 Board Passing Marksheet (showing >= 80th percentile in relevant board)",
      "Income Certificate (< ₹4.50 Lakh/year) from Revenue Authority",
      "Joining Report & Bonafide Certificate from College/University",
      "Aadhaar Card and NPCI DBT Seeded Bank Passbook",
      "Fee receipt of current undergraduate degree course"
    ],
    offlineSubmission: {
      centerName: "Registrar / Dean of Student Welfare Office at University",
      counterName: "Central Sector Scholarship Verification Desk",
      officialStatutoryFee: "₹0 (Free)",
      maxAuthorizedFee: "₹0",
      feeWarning: "Direct DBT scheme through NSP. No offline intermediary allowed.",
      statutoryDaysLimit: 25,
      rtsaClause: "Department of Higher Education Operational Norms Para 4"
    },
    cedarPolicyCode: `permit(principal, action == Action::"ApplyScheme", resource == Scheme::"CentralSector_College")
when {
    principal.annualFamilyIncome <= 450000 &&
    principal.marksPercentage >= 80 &&
    principal.courseType == "Regular Full-Time" &&
    (principal.educationLevel in ["UG", "PG"])
};`,
    officialGazetteRef: "DoHE Scheme Guidelines F.No. 1-1/2022-NS-I",
    faqs: [
      {
        q: "Is this scheme open for students pursuing distance education?",
        a: "No. Only regular, full-time undergraduate and postgraduate students enrolled in recognized universities/colleges are eligible."
      }
    ]
  },

  // 3. PM-YASASVI Post-Matric Scholarship for OBC, EBC & DNT Students (MoSJE)
  {
    id: "PM_YASASVI_OBC",
    title: "PM-YASASVI Post-Matric Scholarship for OBC, EBC and DNT Students",
    shortCode: "MoSJE-YASASVI-OBC",
    type: "scholarship",
    ministry: "Ministry of Social Justice & Empowerment (MoSJE)",
    sponsoringBody: "Centrally Sponsored Scheme (60:40 Central:State share)",
    level: "Central",
    targetCategories: ["OBC", "EBC", "DNT"],
    maxIncome: 250000,
    educationStages: ["11th", "12th", "UG", "PG", "PhD", "Diploma"],
    courseTypesAllowed: ["Regular Full-Time", "Diploma"],
    managementQuotaAllowed: false,
    benefitAmount: "Up to ₹45,000 / year (Tuition fee waiver + academic allowance)",
    maintenanceAllowanceHosteller: "Up to ₹1,000 / month",
    maintenanceAllowanceDayScholar: "Up to ₹500 / month",
    benefitDescription: "Empowers Other Backward Classes, Economically Backward Classes, and De-Notified Nomadic Tribes through direct tuition assistance and monthly maintenance grants.",
    officialPortalUrl: "https://scholarships.gov.in",
    portalName: "National Scholarship Portal (NSP)",
    portalSchemeCode: "MOSJE-YASASVI-PMS-2026",
    deadline: "November 15, 2026",
    daysRemaining: 59,
    prerequisites: ["Caste_Certificate", "OBC_NCL_Certificate", "Income_Certificate"],
    mandatoryDocuments: [
      "OBC Certificate with current financial year Non-Creamy Layer (NCL) status",
      "Income Certificate issued by Tehsildar/Revenue Officer (< ₹2.50L)",
      "Aadhaar Card and NPCI Seeded Bank Account",
      "Admission letter and fee receipt from recognized institution"
    ],
    offlineSubmission: {
      centerName: "District Backward Classes Welfare Office & College Nodal Officer",
      counterName: "BC Welfare Cell",
      officialStatutoryFee: "₹0 (Free)",
      maxAuthorizedFee: "₹0",
      feeWarning: "Centrally funded scheme. No form filing charges.",
      statutoryDaysLimit: 30,
      rtsaClause: "PM-YASASVI Umbrella Framework Chapter III"
    },
    cedarPolicyCode: `permit(principal, action == Action::"ApplyScheme", resource == Scheme::"PM_YASASVI_OBC")
when {
    (principal.category in ["OBC", "EBC", "DNT"]) &&
    principal.annualFamilyIncome <= 250000 &&
    principal.courseType == "Regular Full-Time" &&
    (principal.educationLevel in ["11th", "12th", "UG", "PG", "PhD", "Diploma"])
};`,
    officialGazetteRef: "MoSJE Operational Manual PM-YASASVI 2023-26",
    faqs: [
      {
        q: "Is Non-Creamy Layer (NCL) status mandatory?",
        a: "Yes. Candidates belonging to the Creamy Layer are statutorily ineligible for OBC reservation benefits and scholarships."
      }
    ]
  },

  // 4. AICTE Pragati Scholarship for Girl Students (Technical Education)
  {
    id: "AICTE_Pragati",
    title: "AICTE Pragati Scholarship Scheme for Girl Students (Degree & Diploma)",
    shortCode: "AICTE-PRAGATI",
    type: "scholarship",
    ministry: "All India Council for Technical Education (AICTE), Ministry of Education",
    sponsoringBody: "Central Council Scheme (100% AICTE Grant)",
    level: "Central",
    targetCategories: ["ST", "SC", "OBC", "EWS", "General"],
    maxIncome: 800000,
    educationStages: ["UG", "Diploma"],
    courseTypesAllowed: ["Regular Full-Time", "Diploma"],
    genderRestriction: "Female",
    technicalOnly: true,
    maxSiblingsBenefited: 2,
    managementQuotaAllowed: false,
    benefitAmount: "₹50,000 / year (Every year of study)",
    benefitDescription: "Provides a fixed lump-sum amount of ₹50,000 per annum to girl students admitted to 1st year degree/diploma courses in AICTE-approved institutions towards college fee, computer/laptop purchase, and stationeries.",
    officialPortalUrl: "https://scholarships.gov.in",
    portalName: "National Scholarship Portal (AICTE Pragati Section)",
    portalSchemeCode: "AICTE-PRAGATI-DEG-2026",
    deadline: "December 31, 2026",
    daysRemaining: 105,
    prerequisites: ["Income_Certificate", "Domicile_Certificate"],
    mandatoryDocuments: [
      "AICTE-approved Institution Centralized Admission Receipt (e.g. state CET/JEE counseling allotment letter)",
      "Family Income Certificate issued by Tehsildar / SDO (income <= ₹8.00 Lakh/year)",
      "Aadhaar Number and NPCI-mapped active Bank Passbook",
      "Parents declaration stating not more than two girl children are availing this scheme",
      "Class 10 and 12 passing certificates"
    ],
    offlineSubmission: {
      centerName: "Institute AICTE Coordinator / Scholarship Nodal Officer at College",
      counterName: "AICTE Cell",
      officialStatutoryFee: "₹0 (Free)",
      maxAuthorizedFee: "₹0",
      feeWarning: "Direct DBT into girl student bank account. College cannot deduct charges.",
      statutoryDaysLimit: 30,
      rtsaClause: "AICTE Pragati Regulations Clause 4.1"
    },
    cedarPolicyCode: `permit(principal, action == Action::"ApplyScheme", resource == Scheme::"AICTE_Pragati")
when {
    principal.gender == "Female" &&
    principal.annualFamilyIncome <= 800000 &&
    principal.isTechnicalCourse == true &&
    principal.courseType == "Regular Full-Time" &&
    principal.admissionQuota != "Management" &&
    (principal.educationLevel in ["UG", "Diploma"])
};`,
    officialGazetteRef: "AICTE Regulation F.No. 1-104/AICTE/P&AP/Pragati-Saksham/2021",
    faqs: [
      {
        q: "Can two daughters from the same family receive the Pragati Scholarship?",
        a: "Yes. Maximum 2 girl children per family are permitted."
      }
    ]
  },

  // 5. AICTE Saksham Scholarship for Specially-Abled Students
  {
    id: "AICTE_Saksham",
    title: "AICTE Saksham Scholarship Scheme for Specially-Abled Students",
    shortCode: "AICTE-SAKSHAM",
    type: "scholarship",
    ministry: "All India Council for Technical Education (AICTE)",
    sponsoringBody: "Central Council Scheme",
    level: "Central",
    targetCategories: ["ST", "SC", "OBC", "EWS", "General"],
    maxIncome: 800000,
    educationStages: ["UG", "Diploma"],
    courseTypesAllowed: ["Regular Full-Time", "Diploma"],
    disabilityRequirement: true,
    minDisabilityPercentage: 40,
    technicalOnly: true,
    managementQuotaAllowed: false,
    benefitAmount: "₹50,000 / year (Fixed grant)",
    benefitDescription: "Assists students with disabilities (minimum 40% benchmark disability) pursuing technical degree or diploma courses in AICTE-approved institutions.",
    officialPortalUrl: "https://scholarships.gov.in",
    portalName: "National Scholarship Portal",
    portalSchemeCode: "AICTE-SAKSHAM-2026",
    deadline: "December 31, 2026",
    daysRemaining: 105,
    prerequisites: ["UDID_Certificate", "Income_Certificate"],
    mandatoryDocuments: [
      "Unique Disability Identity Card (UDID) or State Medical Board Disability Certificate (>= 40% disability)",
      "Family Income Certificate (up to ₹8 Lakh/annum)",
      "Allotment letter through centralized counseling process",
      "Aadhaar and NPCI DBT Seeded Account Passbook"
    ],
    offlineSubmission: {
      centerName: "Institute Academic Section & District Disability Rehabilitation Centre (DDRC)",
      counterName: "Disability & Equal Opportunity Cell",
      officialStatutoryFee: "₹0 (Free)",
      maxAuthorizedFee: "₹0",
      feeWarning: "Statutory reservation benefit. Zero administrative fee.",
      statutoryDaysLimit: 30,
      rtsaClause: "Rights of Persons with Disabilities Act 2016"
    },
    cedarPolicyCode: `permit(principal, action == Action::"ApplyScheme", resource == Scheme::"AICTE_Saksham")
when {
    principal.isPersonWithDisability == true &&
    principal.disabilityPercentage >= 40 &&
    principal.annualFamilyIncome <= 800000 &&
    principal.isTechnicalCourse == true &&
    (principal.educationLevel in ["UG", "Diploma"])
};`,
    officialGazetteRef: "AICTE Saksham Guidelines Ref 2021-22",
    faqs: [
      {
        q: "What is the minimum disability required?",
        a: "Candidates must have not less than 40% benchmark disability certified by an authorized medical board."
      }
    ]
  },

  // 6. Post-Matric Scholarship for SC Students (MoSJE)
  {
    id: "PostMatric_SC",
    title: "Centrally Sponsored Post-Matric Scholarship for Scheduled Caste (SC) Students",
    shortCode: "MoSJE-PMS-SC",
    type: "scholarship",
    ministry: "Ministry of Social Justice & Empowerment (MoSJE)",
    sponsoringBody: "Centrally Sponsored Scheme (60:40 Central:State share)",
    level: "Central",
    targetCategories: ["SC"],
    maxIncome: 250000,
    educationStages: ["11th", "12th", "UG", "PG", "PhD", "Diploma", "Professional"],
    courseTypesAllowed: ["Regular Full-Time", "Diploma"],
    managementQuotaAllowed: false,
    benefitAmount: "100% Tuition Fee Waiver + Annual Academic Allowance",
    maintenanceAllowanceHosteller: "Up to ₹1,200 / month",
    maintenanceAllowanceDayScholar: "Up to ₹550 / month",
    benefitDescription: "Comprehensive financial support for Scheduled Caste students studying in post-matric or post-secondary courses to complete their higher education.",
    officialPortalUrl: "https://scholarships.gov.in",
    portalName: "National Scholarship Portal & State Portals",
    portalSchemeCode: "MOSJE-PMS-SC-2026",
    deadline: "November 30, 2026",
    daysRemaining: 74,
    prerequisites: ["Caste_Certificate", "Income_Certificate", "Domicile_Certificate"],
    mandatoryDocuments: [
      "SC Caste Certificate issued by Tehsildar / SDO",
      "Current Financial Year Income Certificate (< ₹2.50 Lakh)",
      "Aadhaar Number and NPCI Active Seeded Bank Account",
      "Previous Exam Passing Marksheet and College Bonafide"
    ],
    offlineSubmission: {
      centerName: "District Social Welfare Office & College Nodal Cell",
      counterName: "SC Welfare Section",
      officialStatutoryFee: "₹0 (Free)",
      maxAuthorizedFee: "₹0",
      feeWarning: "Centrally sponsored scheme. Zero processing fee.",
      statutoryDaysLimit: 30,
      rtsaClause: "MoSJE Scheme Guidelines Revision 2022 Section 5"
    },
    cedarPolicyCode: `permit(principal, action == Action::"ApplyScheme", resource == Scheme::"PostMatric_SC")
when {
    principal.category == "SC" &&
    principal.annualFamilyIncome <= 250000 &&
    principal.courseType == "Regular Full-Time" &&
    (principal.educationLevel in ["11th", "12th", "UG", "PG", "PhD", "Diploma", "Professional"])
};`,
    officialGazetteRef: "MoSJE Notification F.No. 11014/03/2020-SCD-V",
    faqs: [
      {
        q: "How are funds disbursed?",
        a: "The Central and State shares are directly credited into the student's Aadhaar-seeded bank account through PFMS DBT."
      }
    ]
  },

  // 7. Top Class Education Scheme for ST Students (MoTA)
  {
    id: "TopClass_ST",
    title: "National Scholarship for Higher Education / Top Class Education for ST Students",
    shortCode: "MoTA-TOPCLASS-ST",
    type: "scholarship",
    ministry: "Ministry of Tribal Affairs (MoTA)",
    sponsoringBody: "Central Sector Scheme (100% Central Funding)",
    level: "Central",
    targetCategories: ["ST"],
    maxIncome: 600000,
    educationStages: ["UG", "PG"],
    courseTypesAllowed: ["Regular Full-Time"],
    managementQuotaAllowed: false,
    benefitAmount: "Full Tuition Fee Reimbursed + ₹45,000 Living / Book / Laptop Allowance",
    benefitDescription: "Covers 100% non-refundable fees at notified top premier institutes across India (IITs, NITs, IIMs, AIIMS, National Law Universities, Central Universities).",
    officialPortalUrl: "https://scholarships.gov.in",
    portalName: "NSP Top Class ST Module",
    portalSchemeCode: "MOTA-TOPCLASS-2026",
    deadline: "December 15, 2026",
    daysRemaining: 89,
    prerequisites: ["Caste_Certificate", "Income_Certificate", "Domicile_Certificate"],
    mandatoryDocuments: [
      "Allotment letter showing admission to a MoTA-notified institute (IIT, NIT, AIIMS, etc.)",
      "ST Caste Certificate issued by competent Revenue Authority",
      "Income Certificate up to ₹6.00 Lakh/year",
      "Hostel fee receipt and tuition fee voucher"
    ],
    offlineSubmission: {
      centerName: "Dean of Student Affairs / Financial Aid Office at Premier Institute",
      counterName: "Institute Nodal Verification Desk",
      officialStatutoryFee: "₹0 (Free)",
      maxAuthorizedFee: "₹0",
      feeWarning: "Official MoTA Direct Scheme. Zero intermediary charges.",
      statutoryDaysLimit: 45,
      rtsaClause: "MoTA Top Class Higher Education Manual Par. 4.1"
    },
    cedarPolicyCode: `permit(principal, action == Action::"ApplyScheme", resource == Scheme::"TopClass_ST")
when {
    principal.category == "ST" &&
    principal.annualFamilyIncome <= 600000 &&
    principal.courseType == "Regular Full-Time" &&
    (principal.educationLevel in ["UG", "PG"])
};`,
    officialGazetteRef: "MoTA Top Class Gazette S.O. 441(E)",
    faqs: [
      {
        q: "What is the income limit for Top Class ST?",
        a: "Unlike standard Post-Matric which is ₹2.5L, the Top Class scheme allows family income up to ₹6.00 Lakh per annum."
      }
    ]
  },

  // 8. Ishaan Uday Special Scholarship for North Eastern Region (NER - UGC)
  {
    id: "Ishaan_Uday_NER",
    title: "Ishaan Uday Special Scholarship Scheme for North Eastern Region (UGC)",
    shortCode: "UGC-ISHAAN-UDAY",
    type: "scholarship",
    ministry: "University Grants Commission (UGC), Ministry of Education",
    sponsoringBody: "Central Sector Scheme for 8 North Eastern States",
    level: "Central",
    targetCategories: ["ST", "SC", "OBC", "EWS", "General"],
    maxIncome: 450000,
    educationStages: ["UG"],
    courseTypesAllowed: ["Regular Full-Time"],
    managementQuotaAllowed: false,
    benefitAmount: "₹5,400 / month for General Degree; ₹7,800 / month for Technical / Medical",
    benefitDescription: "10,000 fresh scholarships annually for students possessing domicile of the 8 North Eastern States (Assam, Arunachal Pradesh, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, Tripura) admitted to 1st year general, technical, or professional undergraduate degree programs.",
    officialPortalUrl: "https://scholarships.gov.in",
    portalName: "National Scholarship Portal",
    portalSchemeCode: "UGC-ISHAAN-UDAY-2026",
    deadline: "November 30, 2026",
    daysRemaining: 74,
    prerequisites: ["Domicile_Certificate", "Income_Certificate"],
    mandatoryDocuments: [
      "Permanent Resident Certificate (PRC) / Domicile of one of the 8 NE States",
      "Annual Family Income Certificate (< ₹4.50 Lakh)",
      "Class 12 Passing Marksheet and College Admission Proof",
      "Aadhaar Card and Bank Account with NPCI active seeding"
    ],
    offlineSubmission: {
      centerName: "Registrar / Principal Office at University or College",
      counterName: "UGC Nodal Verification Counter",
      officialStatutoryFee: "₹0 (Free)",
      maxAuthorizedFee: "₹0",
      feeWarning: "Administered directly via NSP. No application fees.",
      statutoryDaysLimit: 30,
      rtsaClause: "UGC Ishaan Uday Operational Norms Section 3"
    },
    cedarPolicyCode: `permit(principal, action == Action::"ApplyScheme", resource == Scheme::"Ishaan_Uday_NER")
when {
    principal.annualFamilyIncome <= 450000 &&
    principal.courseType == "Regular Full-Time" &&
    principal.educationLevel == "UG"
};`,
    officialGazetteRef: "UGC Notification No. F. 23-2/2014(Policy/NER-IU)",
    faqs: [
      {
        q: "Is domicile of North Eastern states compulsory?",
        a: "Yes. Candidates must hold a valid Permanent Resident Certificate (PRC) from Assam, Arunachal, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, or Tripura."
      }
    ]
  },

  // 9. Begum Hazrat Mahal National Scholarship for Minority Girls
  {
    id: "BegumHazratMahal",
    title: "Begum Hazrat Mahal National Scholarship for Meritorious Minority Girl Students",
    shortCode: "MoMA-BHMN",
    type: "scholarship",
    ministry: "Ministry of Minority Affairs (MoMA)",
    sponsoringBody: "Maulana Azad Education Foundation (MAEF) / Central Scheme",
    level: "Central",
    targetCategories: ["Minority"],
    maxIncome: 200000,
    educationStages: ["Class 9", "Class 10", "11th", "12th"],
    courseTypesAllowed: ["Regular Full-Time"],
    genderRestriction: "Female",
    minorityOnly: true,
    minimumMarksPercentage: 50,
    managementQuotaAllowed: false,
    benefitAmount: "₹5,000 / year (Class 9-10) and ₹6,000 / year (Class 11-12)",
    benefitDescription: "Supports meritorious girl students belonging to notified national minority communities (Muslims, Christians, Sikhs, Buddhists, Jains, Parsis) who secured at least 50% marks in the qualifying examination.",
    officialPortalUrl: "https://scholarships.gov.in",
    portalName: "National Scholarship Portal",
    portalSchemeCode: "MOMA-BHMN-2026",
    deadline: "November 15, 2026",
    daysRemaining: 59,
    prerequisites: ["Income_Certificate"],
    mandatoryDocuments: [
      "Self-declaration of Minority Community on non-judicial stamp paper or verified format",
      "Family Income Certificate issued by Revenue Authority (< ₹2.00 Lakh)",
      "Marksheet of previous qualifying class with >= 50% aggregate marks",
      "School verification certificate counter-signed by Principal"
    ],
    offlineSubmission: {
      centerName: "School Principal Office & District Minority Welfare Officer Desk",
      counterName: "Minority Welfare Section",
      officialStatutoryFee: "₹0 (Free)",
      maxAuthorizedFee: "₹0",
      feeWarning: "Free government benefit. Any charging by schools is prohibited.",
      statutoryDaysLimit: 25,
      rtsaClause: "MoMA BHMNS Guidelines Clause 4.2"
    },
    cedarPolicyCode: `permit(principal, action == Action::"ApplyScheme", resource == Scheme::"BegumHazratMahal")
when {
    principal.gender == "Female" &&
    principal.isMinority == true &&
    principal.annualFamilyIncome <= 200000 &&
    principal.marksPercentage >= 50 &&
    (principal.educationLevel in ["Class 9", "Class 10", "11th", "12th"])
};`,
    officialGazetteRef: "MoMA Gazette Notification BHMNS-2023",
    faqs: [
      {
        q: "What are the notified minority communities?",
        a: "Muslims, Christians, Sikhs, Buddhists, Jains, and Parsis under Section 2(c) of the National Commission for Minorities Act, 1992."
      }
    ]
  },

  // 10. Essential Certificate: Caste / Tribe Certificate
  {
    id: "Caste_Certificate",
    title: "Caste / Tribe Certificate (SC / ST / OBC)",
    shortCode: "REV-CERT-CASTE",
    type: "certificate",
    ministry: "State Revenue Department & District Magistrate Office",
    sponsoringBody: "Statutory Certificate under State Public Services Delivery Act",
    level: "State",
    targetCategories: ["ST", "SC", "OBC"],
    maxIncome: 99999999,
    educationStages: ["All"],
    courseTypesAllowed: ["Regular Full-Time", "Diploma", "Distance", "Vocational"],
    managementQuotaAllowed: true,
    benefitAmount: "Statutory Prerequisite for all Quotas, Fee Waivers & Scholarships",
    benefitDescription: "Official statutory legal certificate establishing social category membership. Mandatory for claiming constitutional reservations and educational scholarships.",
    officialPortalUrl: "https://services.india.gov.in",
    portalName: "State e-District / MeeSeva / RTPS Portal",
    portalSchemeCode: "STATE-REV-CASTE-01",
    deadline: "Permanent Validity (Apply 30-45 days before scholarship closing)",
    daysRemaining: 365,
    prerequisites: [],
    mandatoryDocuments: [
      "Paternal Blood Relative Caste Certificate (Father, Paternal Grandfather, or Uncle)",
      "Land Record / Record of Rights (RoR / Khatian) establishing ancestral residence",
      "Applicant Aadhaar Card and School Leaving Certificate (SLC) citing community",
      "Self-Declaration Affidavit stamped by Notary / Magistrate"
    ],
    offlineSubmission: {
      centerName: "Tehsildar / Sub-Divisional Magistrate (SDM) Office or Local CSC Center",
      counterName: "RTPS / Revenue Citizen Counter",
      officialStatutoryFee: "₹15 – ₹30 (Depending on State Treasury Code)",
      maxAuthorizedFee: "₹30 total (including CSC scanning)",
      feeWarning: "Official fee is ₹25-30. If any cyber cafe charges ₹200-500, demand an official computerized receipt.",
      statutoryDaysLimit: 21,
      rtsaClause: "State Right to Public Services Act (RTSA) SLA Schedule 1"
    },
    cedarPolicyCode: `permit(principal, action == Action::"IssueCertificate", resource == Certificate::"Caste_Certificate")
when {
    (principal.category in ["ST", "SC", "OBC"]) &&
    principal.hasPaternalCasteRecord == true
};`,
    officialGazetteRef: "Ministry of Home Affairs Guidelines on SC/ST Certificates (Rev. 2017)",
    faqs: [
      {
        q: "Can a caste certificate be issued based on maternal records?",
        a: "Under Indian civil jurisprudence, social category status is inherited patrilineally from the biological father."
      }
    ]
  },

  // 11. Essential Certificate: Income & Asset Certificate
  {
    id: "Income_Certificate",
    title: "Annual Family Income & Asset Certificate",
    shortCode: "REV-CERT-INCOME",
    type: "certificate",
    ministry: "State Revenue Department & Taluk Administration",
    sponsoringBody: "Statutory Certificate under State Revenue Code",
    level: "State",
    targetCategories: ["ST", "SC", "OBC", "EWS", "General"],
    maxIncome: 99999999,
    educationStages: ["All"],
    courseTypesAllowed: ["Regular Full-Time", "Diploma", "Distance", "Vocational"],
    managementQuotaAllowed: true,
    benefitAmount: "Prerequisite for 95% of all Government Scholarships and Fee Waivers",
    benefitDescription: "Official determination of total gross annual income of the family from all sources (agriculture, salary, business). Valid for 1 Financial Year.",
    officialPortalUrl: "https://services.india.gov.in",
    portalName: "State e-District / Taluk Revenue Portal",
    portalSchemeCode: "STATE-REV-INCOME-02",
    deadline: "Valid for Current Fiscal Year (Must be issued after April 1, 2026)",
    daysRemaining: 180,
    prerequisites: [],
    mandatoryDocuments: [
      "Family Ration Card / Food Security Card",
      "Salary Slip / Form 16 / ITR or Gram Panchayat / Revenue Inspector Panchanama",
      "Electricity Bill or House Tax Receipt as proof of residence",
      "Notarized Self-Declaration Affidavit"
    ],
    offlineSubmission: {
      centerName: "Tehsildar Office / Revenue Inspector Desk or CSC Digital Seva Kendra",
      counterName: "Income Certificate Verification Desk",
      officialStatutoryFee: "₹15 – ₹35 (State Gazette Regulated)",
      maxAuthorizedFee: "₹35 total",
      feeWarning: "Valid for 1 financial year. Never pay bribes or unauthorized operator surcharges.",
      statutoryDaysLimit: 14,
      rtsaClause: "Right to Public Service Delivery Timeline: 14 to 21 Working Days"
    },
    cedarPolicyCode: `permit(principal, action == Action::"IssueCertificate", resource == Certificate::"Income_Certificate")
when {
    principal.hasValidAddressProof == true
};`,
    officialGazetteRef: "State Revenue Code & Citizen Charter Manual 2024",
    faqs: [
      {
        q: "How long is an income certificate valid for scholarships?",
        a: "Income certificates for scholarship academic year 2026-27 must be issued on or after April 1, 2026. Certificates from the previous financial year are expired."
      }
    ]
  },

  // 12. Essential Certificate: Economically Weaker Section (EWS) Certificate
  {
    id: "EWS_Certificate",
    title: "Economically Weaker Section (EWS) Income & Asset Certificate",
    shortCode: "REV-CERT-EWS",
    type: "certificate",
    ministry: "Department of Personnel & Training (DoPT) / State Revenue Dept",
    sponsoringBody: "Constitutional 103rd Amendment Statutory Entitlement",
    level: "Central",
    targetCategories: ["General"],
    maxIncome: 800000,
    educationStages: ["All"],
    courseTypesAllowed: ["Regular Full-Time", "Diploma", "Distance", "Vocational"],
    managementQuotaAllowed: true,
    benefitAmount: "10% Reservation in Higher Educational Admissions & Govt Jobs",
    benefitDescription: "Provides 10% statutory reservation in Central and State university admissions and fee concessions for General category citizens whose family income is below ₹8.00 Lakhs and who do not own disqualified property.",
    officialPortalUrl: "https://services.india.gov.in",
    portalName: "State e-District / Taluk Office",
    portalSchemeCode: "CENTRAL-EWS-01",
    deadline: "Valid for 1 Financial Year (Renew annually)",
    daysRemaining: 180,
    prerequisites: ["Income_Certificate", "Domicile_Certificate"],
    mandatoryDocuments: [
      "Aadhaar Card of Applicant and all family members",
      "Income tax returns / Form 16 or Revenue Inspector Panchanama (< ₹8.00 Lakh)",
      "Land Record / Property tax receipt proving agricultural land < 5 acres and residential flat < 1,000 sq ft",
      "Self-Declaration confirming candidate does not belong to SC, ST, or OBC lists"
    ],
    offlineSubmission: {
      centerName: "Sub-Divisional Officer (SDO) / Tehsildar / District Magistrate Office",
      counterName: "EWS Verification Branch",
      officialStatutoryFee: "₹30 – ₹50",
      maxAuthorizedFee: "₹50 total",
      feeWarning: "Administrative fee only. Field verification is conducted by Revenue Inspector.",
      statutoryDaysLimit: 21,
      rtsaClause: "Central EWS Notification No. 20013/01/2018-BC-II"
    },
    cedarPolicyCode: `permit(principal, action == Action::"IssueCertificate", resource == Certificate::"EWS_Certificate")
when {
    principal.category == "General" &&
    principal.annualFamilyIncome <= 800000 &&
    principal.agriculturalLandAcres <= 5.0 &&
    principal.residentialFlatSqFt <= 1000
};`,
    officialGazetteRef: "DoPT OM No. 36039/1/2019-Estt (Res) dated 31st January 2019",
    faqs: [
      {
        q: "What asset exclusions apply for EWS?",
        a: "Persons whose families own 5+ acres of agricultural land, or residential flat of 1000+ sq ft, or residential plot of 100+ sq yards in notified municipalities are excluded."
      }
    ]
  },

  // 13. Ayushman Bharat PM-JAY & Rashtriya Arogya Nidhi (RAN) Medical Expense Assistance
  {
    id: "Ayushman_PMJAY",
    title: "Ayushman Bharat PM-JAY & Rashtriya Arogya Nidhi (RAN) Medical Expense Assistance",
    shortCode: "AB-PMJAY-RAN",
    type: "healthcare",
    ministry: "National Health Authority (NHA) & Ministry of Health and Family Welfare (MoHFW)",
    sponsoringBody: "Centrally Sponsored Health Assurance Scheme (60:40 Central:State)",
    level: "Central",
    targetCategories: ["All", "ST", "SC", "OBC", "EWS", "General"],
    maxIncome: 250000,
    educationStages: ["All"],
    courseTypesAllowed: ["Regular Full-Time", "Diploma", "Distance", "Vocational"],
    managementQuotaAllowed: true,
    benefitAmount: "₹5,00,000 / Family / Year Cashless Hospitalization + Up to ₹15 Lakh for Critical Care under RAN",
    benefitDescription: "Cashless secondary and tertiary hospitalization across 27,000+ empaneled hospitals. Covers ICU, major surgeries, prosthetics, medical oncology, and 15 days post-discharge diagnostics and medicines.",
    officialPortalUrl: "https://beneficiary.nha.gov.in",
    portalName: "NHA BIS / TMS Beneficiary Portal",
    portalSchemeCode: "NHA-PMJAY-RAN-2026",
    deadline: "Open Year-Round (Continuous Enrollment & Emergency Admission)",
    daysRemaining: 365,
    prerequisites: ["Income_Certificate"],
    mandatoryDocuments: [
      "Aadhaar Card (Patient & Family Head)",
      "Ration Card (NFSA / BPL / Antyodaya)",
      "Government Hospital Referral / Treatment Cost Estimate Proforma",
      "Income Certificate (Current FY - for RAN / Discretionary Relief)",
      "Hospital Admission Slip or Doctor Prescription"
    ],
    offlineSubmission: {
      centerName: "District Government Hospital / AIIMS / Medical College",
      counterName: "Ayushman Mitra Helpdesk (Registration & Emergency Authorization)",
      officialStatutoryFee: "₹0 (Statutorily Free Card Generation & 100% Cashless Treatment)",
      maxAuthorizedFee: "₹0.00",
      feeWarning: "Ayushman card generation and empaneled hospital treatment are 100% FREE. Never pay any fee or tout at hospital counters.",
      statutoryDaysLimit: 0,
      rtsaClause: "Section 4, National Health Protection Mission Guidelines 2026"
    },
    cedarPolicyCode: `permit(
    principal,
    action == Action::"ApplyScheme",
    resource == Scheme::"Ayushman_PMJAY"
)
when {
    principal.annualFamilyIncome <= 250000 &&
    principal.heldDocuments.contains("Income_Certificate")
};`,
    officialGazetteRef: "MoHFW Notification S.O. 1134(E), National Health Protection Mission",
    faqs: [
      {
        q: "What medical expenses are covered under AB-PMJAY?",
        a: "It covers over 1,949 treatment procedures including cardiology, oncology, neurosurgery, orthopedics, ICU charges, room rent, and pre- and post-hospitalization expenses for 15 days."
      },
      {
        q: "How do I get treatment if I don't have the physical Ayushman card yet?",
        a: "Carry your Aadhaar card and Ration Card directly to the Ayushman Mitra desk at any empaneled government or private hospital. They will generate your e-card instantly on spot via e-KYC."
      }
    ]
  },

  // =========================================================================
  // TAMIL NADU TOP ACTIVE STATE WELFARE & SCHOLARSHIP SCHEMES
  // =========================================================================

  // 14. Moovalur Ramamirtham Ammaiyar Higher Education Assurance (Pudhumai Penn Scheme)
  {
    id: "TN_Pudhumai_Penn",
    title: "Moovalur Ramamirtham Ammaiyar Higher Education Assurance Scheme (Pudhumai Penn Scheme)",
    shortCode: "TN-PUDHUMAI-PENN",
    type: "scholarship",
    ministry: "Social Welfare and Women Empowerment Department, Government of Tamil Nadu",
    sponsoringBody: "100% State Government Funded Flagship Scheme (Tamil Nadu)",
    level: "State",
    applicableStates: ["Tamil Nadu"],
    targetCategories: ["All", "ST", "SC", "OBC", "EWS", "General"],
    maxIncome: 999999999, // No income ceiling!
    educationStages: ["UG", "Diploma", "Professional"],
    courseTypesAllowed: ["Regular Full-Time", "Diploma"],
    genderRestriction: "Female",
    requiresGovtSchool6To12: true,
    managementQuotaAllowed: true, // Applicable across regular colleges
    benefitAmount: "₹1,000 / Month Direct Bank Transfer (₹12,000 / Year until degree completion)",
    benefitDescription: "Empowers girl students from Tamil Nadu government schools to pursue higher education. ₹1,000 is credited directly into their bank account on the 7th of every month.",
    officialPortalUrl: "https://pudhumaipenn.tn.gov.in",
    portalName: "TN Pudhumai Penn Portal",
    portalSchemeCode: "TN-SWD-PP-2026",
    deadline: "October 31, 2026 (Annual Renewal)",
    daysRemaining: 44,
    prerequisites: ["Govt_School_Bonafide"],
    mandatoryDocuments: [
      "Aadhaar Card of Female Student",
      "EMIS Student ID Number (Tamil Nadu Education Management Information System)",
      "Class 6th to 12th Continuous Government School Study Bonafide (Signed by Headmaster / DEO)",
      "College Admission Bonafide & First Year Fee Receipt",
      "Student Solo Bank Account Passbook (Aadhaar Seeded)"
    ],
    offlineSubmission: {
      centerName: "College Scholarship Clerk / District Social Welfare Officer (DSWO) Desk",
      counterName: "Pudhumai Penn Nodal Desk",
      officialStatutoryFee: "₹0.00 (Free Scheme)",
      maxAuthorizedFee: "₹0.00",
      feeWarning: "Completely free. Application is endorsed directly by College Principal on the state portal.",
      statutoryDaysLimit: 14,
      rtsaClause: "G.O. (Ms) No. 42, Social Welfare and Women Empowerment (SW3) Dept"
    },
    cedarPolicyCode: `permit(principal, action == Action::"ApplyScheme", resource == Scheme::"TN_Pudhumai_Penn")
when {
    principal.state == "Tamil Nadu" &&
    principal.gender == "Female" &&
    principal.studiedInGovtSchool6To12 == true &&
    principal.educationLevel in ["UG", "Diploma", "Professional"]
};`,
    officialGazetteRef: "Tamil Nadu Government Gazette G.O. (Ms) No. 42 dated 28.06.2022",
    faqs: [
      {
        q: "Is there any family income limit for Pudhumai Penn?",
        a: "No! There is absolutely NO income limit. Any female student who studied from Class 6 to 12 in a Tamil Nadu Government School is 100% entitled to ₹1,000/month."
      },
      {
        q: "Can I receive this if I already have another scholarship?",
        a: "Yes! Pudhumai Penn is an educational incentive and can be availed concurrently alongside SC/ST/BC/MBC scholarships or First Graduate fee concessions."
      }
    ]
  },

  // 15. Tamil Pudhalvan Scheme (for Boys from Govt Schools)
  {
    id: "TN_Tamil_Pudhalvan",
    title: "Tamil Pudhalvan Scheme (Higher Education Financial Grant for Male Students)",
    shortCode: "TN-TAMIL-PUDHALVAN",
    type: "scholarship",
    ministry: "Higher Education Department, Government of Tamil Nadu",
    sponsoringBody: "100% State Government Funded Scheme (Tamil Nadu)",
    level: "State",
    applicableStates: ["Tamil Nadu"],
    targetCategories: ["All", "ST", "SC", "OBC", "EWS", "General"],
    maxIncome: 999999999,
    educationStages: ["UG", "Diploma", "Professional"],
    courseTypesAllowed: ["Regular Full-Time", "Diploma"],
    genderRestriction: "Male",
    requiresGovtSchool6To12: true,
    managementQuotaAllowed: true,
    benefitAmount: "₹1,000 / Month Direct Bank Transfer (₹12,000 / Year for books, study kits & expenses)",
    benefitDescription: "Male counterpart to Pudhumai Penn. Provides ₹1,000 monthly financial grant directly into bank accounts of boys from Tamil Nadu Government schools enrolled in degree or diploma programs.",
    officialPortalUrl: "https://tamilpudhalvan.tn.gov.in",
    portalName: "TN Tamil Pudhalvan Portal",
    portalSchemeCode: "TN-HED-TP-2026",
    deadline: "October 31, 2026",
    daysRemaining: 44,
    prerequisites: ["Govt_School_Bonafide"],
    mandatoryDocuments: [
      "Aadhaar Card of Student",
      "EMIS Student Number",
      "Class 6 to 12 Government School Study Certificate (Headmaster sealed)",
      "College Admission Bonafide Certificate",
      "Aadhaar Seeded Solo Bank Account Passbook"
    ],
    offlineSubmission: {
      centerName: "College Academic Desk / Directorate of Technical/Collegiate Education",
      counterName: "Tamil Pudhalvan Verification Desk",
      officialStatutoryFee: "₹0.00",
      maxAuthorizedFee: "₹0.00",
      feeWarning: "Zero fee. Enrollment happens directly via college portal with EMIS data.",
      statutoryDaysLimit: 14,
      rtsaClause: "Higher Education (G1) Department G.O. (Ms) No. 132"
    },
    cedarPolicyCode: `permit(principal, action == Action::"ApplyScheme", resource == Scheme::"TN_Tamil_Pudhalvan")
when {
    principal.state == "Tamil Nadu" &&
    principal.gender == "Male" &&
    principal.studiedInGovtSchool6To12 == true &&
    principal.educationLevel in ["UG", "Diploma", "Professional"]
};`,
    officialGazetteRef: "Tamil Nadu Government Gazette G.O. (Ms) No. 132 dated 18.07.2024",
    faqs: [
      {
        q: "Who is eligible for Tamil Pudhalvan?",
        a: "All boy students who studied continuously from Class 6 to 12 in Tamil Nadu Government Schools and joined undergraduate or diploma courses."
      }
    ]
  },

  // 16. 7.5% Preferential Quota Full Fee Exemption for Govt School Students
  {
    id: "TN_7_5_Govt_School_Quota",
    title: "7.5% Preferential Quota 100% Full Fee Exemption for Government School Students",
    shortCode: "TN-7.5-GOVT-QUOTA",
    type: "scholarship",
    ministry: "Higher Education & Health Department, Government of Tamil Nadu",
    sponsoringBody: "Government of Tamil Nadu Statutory Enactment",
    level: "State",
    applicableStates: ["Tamil Nadu"],
    targetCategories: ["All", "ST", "SC", "OBC", "EWS", "General"],
    maxIncome: 999999999,
    educationStages: ["UG", "Professional"],
    courseTypesAllowed: ["Regular Full-Time"],
    requiresGovtSchool6To12: true,
    managementQuotaAllowed: false, // Must be via 7.5% single window counseling
    benefitAmount: "100% Full Tuition, Hostel, and Examination Fee Exemption (Zero Out-of-Pocket Cost)",
    benefitDescription: "Under the historic 7.5% preferential reservation act, government school students admitted to Engineering (Anna Univ/Private), Medical (MBBS/BDS), Agriculture, Veterinary, and Law colleges have their ENTIRE education, hostel, and mess fees paid directly by the TN Government.",
    officialPortalUrl: "https://www.tneaonline.org",
    portalName: "TNEA / TN Medical Selection Committee",
    portalSchemeCode: "TN-7.5-QUOTA-2026",
    deadline: "During Counseling Seat Allotment",
    daysRemaining: 30,
    prerequisites: ["Govt_School_Bonafide"],
    mandatoryDocuments: [
      "Allotment Order under 7.5% Government School Quota (TNEA/DME)",
      "Class 6th to 12th Government School Bonafide Certificate with EMIS",
      "Class 10th & 12th Marksheets",
      "Community Certificate"
    ],
    offlineSubmission: {
      centerName: "Allotted College Accounts & Admission Counter",
      counterName: "7.5% Special Quota Admission Counter",
      officialStatutoryFee: "₹0.00 (Strictly ₹0 Fee Collection Permitted by Law)",
      maxAuthorizedFee: "₹0.00",
      feeWarning: "Colleges are strictly prohibited from demanding any tuition, hostel, or exam fees from 7.5% quota students.",
      statutoryDaysLimit: 0,
      rtsaClause: "Tamil Nadu Act No. 14 of 2021 & Act No. 20 of 2020"
    },
    cedarPolicyCode: `permit(principal, action == Action::"ApplyScheme", resource == Scheme::"TN_7_5_Govt_School_Quota")
when {
    principal.state == "Tamil Nadu" &&
    principal.studiedInGovtSchool6To12 == true &&
    principal.admissionQuota == "Merit/Govt Counseling"
};`,
    officialGazetteRef: "Tamil Nadu Government Gazette Extraordinary Act No. 14 of 2021",
    faqs: [
      {
        q: "Do I have to pay hostel or mess fees in private engineering colleges under 7.5% quota?",
        a: "No! The Tamil Nadu Government reimburses 100% of the tuition fee, hostel fee, and mess fee directly to the college."
      }
    ]
  },

  // 17. Tamil Nadu First Graduate Tuition Fee Concession (Mudhal Thalaimurai Pattadhari)
  {
    id: "TN_First_Graduate",
    title: "Tamil Nadu First Graduate Tuition Fee Concession (Mudhal Thalaimurai Pattadhari)",
    shortCode: "TN-FIRST-GRADUATE",
    type: "scholarship",
    ministry: "Directorate of Technical Education (DoTE) / Higher Education Dept, Govt of Tamil Nadu",
    sponsoringBody: "Government of Tamil Nadu State Budget Grant",
    level: "State",
    applicableStates: ["Tamil Nadu"],
    targetCategories: ["All", "ST", "SC", "OBC", "EWS", "General"],
    maxIncome: 999999999, // No income limit!
    educationStages: ["UG", "Professional"],
    courseTypesAllowed: ["Regular Full-Time"],
    requiresFirstGraduate: true,
    managementQuotaAllowed: false, // Single window counseling only (TNEA)
    benefitAmount: "₹25,000 to ₹30,000 / Year Tuition Fee Concession (Subtracted upfront on College Fee Receipt)",
    benefitDescription: "State tuition fee concession for candidates who are the first person in their entire family to enter an undergraduate degree (neither father, mother, nor elder siblings are graduates) admitted via single-window counseling.",
    officialPortalUrl: "https://www.tneaonline.org",
    portalName: "TNEA & Directorate of Technical Education (DoTE)",
    portalSchemeCode: "TN-DOTE-FG-2026",
    deadline: "At the time of College Admission Verification",
    daysRemaining: 30,
    prerequisites: ["TN_First_Graduate_Cert"],
    mandatoryDocuments: [
      "First Graduate Certificate issued by Tahsildar (e-Sevai portal signed)",
      "First Graduate Joint Declaration Form (Signed by Candidate and Parents)",
      "School Transfer Certificates (TC) of Parents & Siblings proving non-graduate status",
      "TNEA Allotment Order via Single Window Government Counseling",
      "Family Ration Card / Smart Card"
    ],
    offlineSubmission: {
      centerName: "e-Sevai Center / Tahsildar Office & Allotted College Desk",
      counterName: "First Graduate Verification Counter",
      officialStatutoryFee: "₹60 (e-Sevai Certificate Application Fee)",
      maxAuthorizedFee: "₹60.00",
      feeWarning: "Certificate is issued via e-Sevai for ₹60. College must immediately deduct ₹25,000 from admission bill.",
      statutoryDaysLimit: 15,
      rtsaClause: "Higher Education (J2) Department G.O. (Ms) No. 85"
    },
    cedarPolicyCode: `permit(principal, action == Action::"ApplyScheme", resource == Scheme::"TN_First_Graduate")
when {
    principal.state == "Tamil Nadu" &&
    principal.isFirstGraduateInFamily == true &&
    principal.admissionQuota == "Merit/Govt Counseling" &&
    principal.heldDocuments.contains("TN_First_Graduate_Cert")
};`,
    officialGazetteRef: "Tamil Nadu Government Gazette G.O. (Ms) No. 85 dated 16.04.2010",
    faqs: [
      {
        q: "What if my elder sibling is currently studying in college but hasn't graduated yet?",
        a: "If your elder sibling has availed the First Graduate concession, you cannot avail it. Only ONE child in the family can be the First Graduate beneficiary."
      }
    ]
  },

  // 18. Tamil Nadu Adi Dravidar & Tribal Welfare Post-Matric Scholarship
  {
    id: "TN_PostMatric_SC_ST",
    title: "Tamil Nadu Adi Dravidar and Tribal Welfare Post-Matric Scholarship",
    shortCode: "TN-ADW-PMS-SC-ST",
    type: "scholarship",
    ministry: "Adi Dravidar and Tribal Welfare Department, Government of Tamil Nadu",
    sponsoringBody: "Centrally Sponsored + Tamil Nadu State Share (60:40)",
    level: "State",
    applicableStates: ["Tamil Nadu"],
    targetCategories: ["SC", "ST"],
    maxIncome: 250000,
    educationStages: ["11th", "12th", "UG", "PG", "PhD", "Diploma", "Professional"],
    courseTypesAllowed: ["Regular Full-Time", "Diploma"],
    managementQuotaAllowed: false,
    benefitAmount: "100% Compulsory Non-Refundable Tuition Fee Waiver + Up to ₹1,200/mo Hosteller Living Allowance",
    benefitDescription: "Provides complete fee exemption for SC, SCA (Arunthathiyar), and ST students in Tamil Nadu government, aided, and self-financing professional colleges under government quota.",
    officialPortalUrl: "https://adwscholarship.tn.gov.in",
    portalName: "Tamil Nadu ADW Scholarship Portal",
    portalSchemeCode: "TN-ADW-2026",
    deadline: "November 30, 2026",
    daysRemaining: 74,
    prerequisites: ["Caste_Certificate", "Income_Certificate"],
    mandatoryDocuments: [
      "Community Certificate (SC / SCA / ST) issued by Competent Authority / Tahsildar",
      "Income Certificate (Current FY < ₹2,50,000)",
      "Aadhaar Card with NPCI Bank Seeding",
      "College Admission Allotment Order & Bonafide Certificate",
      "Hosteller Certificate (if claiming living stipend)"
    ],
    offlineSubmission: {
      centerName: "District Adi Dravidar and Tribal Welfare Office (DADWO) / College Desk",
      counterName: "ADW Scholarship Cell",
      officialStatutoryFee: "₹0.00",
      maxAuthorizedFee: "₹0.00",
      feeWarning: "Zero fee. Private colleges cannot force SC/ST students to pay non-refundable fees upfront.",
      statutoryDaysLimit: 30,
      rtsaClause: "G.O. (Ms) No. 6, Adi Dravidar and Tribal Welfare (ADW-3) Dept"
    },
    cedarPolicyCode: `permit(principal, action == Action::"ApplyScheme", resource == Scheme::"TN_PostMatric_SC_ST")
when {
    principal.state == "Tamil Nadu" &&
    principal.category in ["SC", "ST"] &&
    principal.annualFamilyIncome <= 250000 &&
    principal.heldDocuments.contains("Caste_Certificate") &&
    principal.heldDocuments.contains("Income_Certificate")
};`,
    officialGazetteRef: "Tamil Nadu ADW Operational Guidelines Notification 2026",
    faqs: [
      {
        q: "Are Arunthathiyar (SCA) students covered under this scheme?",
        a: "Yes, candidates from the Arunthathiyar community are covered under the SC category with internal reservation."
      }
    ]
  },

  // 19. Tamil Nadu BC, MBC & DNC Welfare Higher Education Post-Matric Scholarship
  {
    id: "TN_BC_MBC_DNC_Scholarship",
    title: "Tamil Nadu BC, MBC and Minorities Welfare Post-Matric Higher Education Scholarship",
    shortCode: "TN-BC-MBC-DNC",
    type: "scholarship",
    ministry: "Backward Classes, Most Backward Classes and Minorities Welfare Department, Govt of Tamil Nadu",
    sponsoringBody: "Government of Tamil Nadu State Budget",
    level: "State",
    applicableStates: ["Tamil Nadu"],
    targetCategories: ["OBC", "BC", "MBC", "DNC"],
    maxIncome: 250000,
    educationStages: ["UG", "PG", "Diploma", "Professional"],
    courseTypesAllowed: ["Regular Full-Time", "Diploma"],
    managementQuotaAllowed: false,
    benefitAmount: "100% Tuition Fee Exemption + Special Maintenance Stipend (Free Education for MBC/DNC in 3-yr Arts/Science)",
    benefitDescription: "Provides tuition fee exemption and maintenance allowance for Backward Classes (BC), BC Muslims (BCM), Most Backward Classes (MBC), and Denotified Communities (DNC). In 3-year Arts and Science degree courses, tuition is 100% FREE for MBC/DNC students with NO income limit!",
    officialPortalUrl: "https://bcmbcwelfare.tn.gov.in",
    portalName: "TN BC/MBC Welfare Portal",
    portalSchemeCode: "TN-BCMBC-2026",
    deadline: "November 30, 2026",
    daysRemaining: 74,
    prerequisites: ["Caste_Certificate", "Income_Certificate"],
    mandatoryDocuments: [
      "Community Certificate (BC / BCM / MBC / DNC) issued by Tahsildar",
      "Income Certificate (< ₹2,50,000; not required for MBC/DNC 3-yr degree courses)",
      "Aadhaar Card (NPCI Seeded Bank Account)",
      "College Bonafide & Fee Structure"
    ],
    offlineSubmission: {
      centerName: "District BC & Minorities Welfare Office (DBCMWO) / College Office",
      counterName: "BC/MBC Scholarship Counter",
      officialStatutoryFee: "₹0.00",
      maxAuthorizedFee: "₹0.00",
      feeWarning: "Free scheme. Colleges verify student eligibility directly with the department.",
      statutoryDaysLimit: 30,
      rtsaClause: "BC, MBC & Minorities Welfare Department Guidelines 2026"
    },
    cedarPolicyCode: `permit(principal, action == Action::"ApplyScheme", resource == Scheme::"TN_BC_MBC_DNC_Scholarship")
when {
    principal.state == "Tamil Nadu" &&
    principal.annualFamilyIncome <= 250000 &&
    principal.heldDocuments.contains("Caste_Certificate")
};`,
    officialGazetteRef: "BC, MBC and Minorities Welfare Department Notification No. 18",
    faqs: [
      {
        q: "Is there an income limit for MBC and DNC students in 3-year degree courses?",
        a: "Under Tamil Nadu Government rules, MBC and DNC students admitted to 3-year undergraduate Arts and Science degree courses receive free tuition regardless of parental income."
      }
    ]
  },

  // 20. Kalaignar Magalir Urimai Thittam (KMUT - Women's Basic Income Scheme)
  {
    id: "TN_Kalaignar_Magalir_Urimai",
    title: "Kalaignar Magalir Urimai Thittam (KMUT - Women's Rights & Basic Income Scheme)",
    shortCode: "TN-KMUT-WOMEN",
    type: "scholarship",
    ministry: "Special Programme Implementation Department, Government of Tamil Nadu",
    sponsoringBody: "Government of Tamil Nadu Universal Women Empowerment Programme",
    level: "State",
    applicableStates: ["Tamil Nadu"],
    targetCategories: ["All", "ST", "SC", "OBC", "EWS", "General"],
    maxIncome: 250000,
    educationStages: ["All"],
    courseTypesAllowed: ["Regular Full-Time", "Diploma", "Distance", "Vocational"],
    genderRestriction: "Female",
    managementQuotaAllowed: true,
    maxElectricityUnitsPerYear: 3600,
    benefitAmount: "₹1,000 / Month Direct DBT into Bank Account (₹12,000 / Year Universal Benefit)",
    benefitDescription: "Flagship basic income security scheme for women in Tamil Nadu. Provides ₹1,000 every month directly to eligible women (income < ₹2.5L, electricity < 3600 units/year, land < 5 acres wetland).",
    officialPortalUrl: "https://kmut.tn.gov.in",
    portalName: "KMUT Citizen Portal",
    portalSchemeCode: "TN-KMUT-2026",
    deadline: "Continuous Enrollment at e-Sevai Desks",
    daysRemaining: 365,
    prerequisites: ["Income_Certificate"],
    mandatoryDocuments: [
      "Aadhaar Card of Female Applicant",
      "Tamil Nadu Smart Ration Card",
      "TANGEDCO Electricity Consumer Number (showing consumption < 3600 units/year)",
      "Bank Account Passbook (Aadhaar Seeded)"
    ],
    offlineSubmission: {
      centerName: "Special Ward Camp / e-Sevai Center / Revenue Inspector Desk",
      counterName: "KMUT Biometric Helpdesk",
      officialStatutoryFee: "₹0.00 (Completely Free)",
      maxAuthorizedFee: "₹0.00",
      feeWarning: "Application and biometric enrollment are 100% free. Never pay any fee.",
      statutoryDaysLimit: 30,
      rtsaClause: "G.O. (Ms) No. 29, Special Programme Implementation Dept"
    },
    cedarPolicyCode: `permit(principal, action == Action::"ApplyScheme", resource == Scheme::"TN_Kalaignar_Magalir_Urimai")
when {
    principal.state == "Tamil Nadu" &&
    principal.gender == "Female" &&
    principal.annualFamilyIncome <= 250000 &&
    principal.agriculturalLandAcres <= 5.0
};`,
    officialGazetteRef: "Tamil Nadu Government Gazette G.O. (Ms) No. 29 dated 07.07.2023",
    faqs: [
      {
        q: "What electricity consumption limit applies for KMUT?",
        a: "The household's domestic electricity consumption must not exceed 3,600 units per year."
      }
    ]
  },

  // 21. Chief Minister's Comprehensive Health Insurance Scheme (CMCHIS / Amma Medical Scheme)
  {
    id: "TN_CMCHIS_Medical",
    title: "Chief Minister's Comprehensive Health Insurance Scheme (CMCHIS - Tamil Nadu)",
    shortCode: "TN-CMCHIS-HEALTH",
    type: "healthcare",
    ministry: "Health and Family Welfare Department, Government of Tamil Nadu & United India Insurance",
    sponsoringBody: "Government of Tamil Nadu + Ayushman Bharat Convergence",
    level: "State",
    applicableStates: ["Tamil Nadu"],
    targetCategories: ["All", "ST", "SC", "OBC", "EWS", "General"],
    maxIncome: 120000,
    educationStages: ["All"],
    courseTypesAllowed: ["Regular Full-Time", "Diploma", "Distance", "Vocational"],
    managementQuotaAllowed: true,
    benefitAmount: "₹5,00,000 / Family / Year Cashless Treatment across 1,600+ empaneled hospitals",
    benefitDescription: "Tamil Nadu's flagship universal healthcare program. Provides up to ₹5 Lakh per year for 1,513 medical procedures, ICU, cardiac surgery, renal transplants, and oncology across government and private empaneled hospitals.",
    officialPortalUrl: "https://www.cmchistn.com",
    portalName: "CMCHIS Citizen Portal",
    portalSchemeCode: "TN-CMCHIS-2026",
    deadline: "Open 24/7 (Emergency & Elective Inpatient)",
    daysRemaining: 365,
    prerequisites: ["Income_Certificate"],
    mandatoryDocuments: [
      "Tamil Nadu Smart Ration Card (Head & Family Members)",
      "Aadhaar Card of Patient",
      "Income Certificate (< ₹1,20,000 / Year; not required for Sri Lankan Tamil refugees or destitute orphans)",
      "Doctor Referral Slip from Government Hospital"
    ],
    offlineSubmission: {
      centerName: "District Collectorate CMCHIS Kiosk / Govt District Headquarter Hospital",
      counterName: "CMCHIS Smart Card Enrollment Counter",
      officialStatutoryFee: "₹0.00 (Free Biometric Smart Card)",
      maxAuthorizedFee: "₹0.00",
      feeWarning: "Treatment and smart card generation are 100% free under Tamil Nadu health guidelines.",
      statutoryDaysLimit: 0,
      rtsaClause: "G.O. (Ms) No. 411, Health and Family Welfare (EAP1-1) Dept"
    },
    cedarPolicyCode: `permit(principal, action == Action::"ApplyScheme", resource == Scheme::"TN_CMCHIS_Medical")
when {
    principal.state == "Tamil Nadu" &&
    principal.annualFamilyIncome <= 120000
};`,
    officialGazetteRef: "Health and Family Welfare Department Guidelines G.O. (Ms) No. 411",
    faqs: [
      {
        q: "What is the income cutoff for CMCHIS in Tamil Nadu?",
        a: "Family annual income must be below ₹1,20,000 as certified by the Tahsil revenue department."
      }
    ]
  },

  // 22. Welfare of Differently-Abled Persons Higher Education & Reader Allowance
  {
    id: "TN_DifferentlyAbled_Welfare",
    title: "Tamil Nadu Higher Education Stipend & Reader Allowance for Differently-Abled Students",
    shortCode: "TN-DA-WELFARE",
    type: "scholarship",
    ministry: "Welfare of Differently Abled Persons Department, Government of Tamil Nadu",
    sponsoringBody: "Government of Tamil Nadu State Welfare Fund",
    level: "State",
    applicableStates: ["Tamil Nadu"],
    targetCategories: ["All", "ST", "SC", "OBC", "EWS", "General"],
    maxIncome: 999999999, // No income bar for disability welfare
    educationStages: ["UG", "PG", "PhD", "Diploma", "Professional"],
    courseTypesAllowed: ["Regular Full-Time", "Diploma"],
    disabilityRequirement: true,
    minDisabilityPercentage: 40,
    managementQuotaAllowed: true,
    benefitAmount: "100% Full Tuition Fee Waiver + Up to ₹3,000 / Month Reader & Transport Allowance",
    benefitDescription: "Provides 100% tuition fee exemption in all government and aided institutions for students with 40%+ disability, plus monthly reader allowances for visually challenged scholars and motorized scooter subsidies.",
    officialPortalUrl: "https://www.scd.tn.gov.in",
    portalName: "TN Differently Abled Welfare Portal",
    portalSchemeCode: "TN-DA-2026",
    deadline: "October 31, 2026",
    daysRemaining: 44,
    prerequisites: ["Caste_Certificate"],
    mandatoryDocuments: [
      "Unique Disability ID (UDID Card) showing >= 40% Disability",
      "Disability Certificate issued by District Medical Board",
      "Aadhaar Card & Smart Ration Card",
      "College Bonafide Certificate",
      "Aadhaar Seeded Bank Account"
    ],
    offlineSubmission: {
      centerName: "District Differently Abled Welfare Office (DDAWO) at District Collectorate",
      counterName: "Scholarship & Reader Allowance Desk",
      officialStatutoryFee: "₹0.00",
      maxAuthorizedFee: "₹0.00",
      feeWarning: "Free scheme with priority single-window processing.",
      statutoryDaysLimit: 15,
      rtsaClause: "Welfare of Differently Abled Persons Department Guidelines 2026"
    },
    cedarPolicyCode: `permit(principal, action == Action::"ApplyScheme", resource == Scheme::"TN_DifferentlyAbled_Welfare")
when {
    principal.state == "Tamil Nadu" &&
    principal.isPersonWithDisability == true &&
    principal.disabilityPercentage >= 40
};`,
    officialGazetteRef: "Welfare of Differently Abled Persons (DAP-2) Dept G.O. (Ms) No. 12",
    faqs: [
      {
        q: "What is the minimum disability percentage required?",
        a: "Minimum 40% benchmark disability as certified by the District Medical Board under the RPwD Act 2016."
      }
    ]
  },

  // 23. Moovalur Ramamirtham Ammaiyar Memorial Marriage & Education Assistance Scheme
  {
    id: "TN_Moovalur_Marriage",
    title: "Moovalur Ramamirtham Ammaiyar Memorial Marriage & Education Assistance Scheme",
    shortCode: "TN-MOOVALUR-MARRIAGE",
    type: "scholarship",
    ministry: "Social Welfare and Women Empowerment Department, Government of Tamil Nadu",
    sponsoringBody: "Government of Tamil Nadu Social Welfare Fund",
    level: "State",
    applicableStates: ["Tamil Nadu"],
    targetCategories: ["All", "ST", "SC", "OBC", "EWS", "General"],
    maxIncome: 72000,
    educationStages: ["UG", "Diploma", "Professional"],
    courseTypesAllowed: ["Regular Full-Time", "Diploma", "Distance", "Vocational"],
    genderRestriction: "Female",
    managementQuotaAllowed: true,
    benefitAmount: "8 Grams (1 Sovereign) 22-Karat Gold Coin + ₹50,000 Cash Grant for Degree/Diploma Brides",
    benefitDescription: "Financial and gold assistance to encourage poor parents to educate their daughters up to degree level. Provides an 8g 22k gold coin for the Thirumangalyam plus ₹50,000 cash grant for degree/diploma holders (₹25,000 for 10th pass).",
    officialPortalUrl: "https://tnega.tn.gov.in",
    portalName: "Tamil Nadu e-Sevai / Social Welfare Portal",
    portalSchemeCode: "TN-MRM-2026",
    deadline: "40 Days prior to Marriage Date",
    daysRemaining: 40,
    prerequisites: ["Income_Certificate", "Caste_Certificate"],
    mandatoryDocuments: [
      "Degree / Diploma Passing Certificate and Final Year Marksheet",
      "Income Certificate (< ₹72,000 / Year)",
      "Age Proof (Bride >= 18 Years, Groom >= 21 Years)",
      "Marriage Invitation Card & Verification Letter from Village Administrative Officer (VAO)",
      "Aadhaar Card & Smart Ration Card"
    ],
    offlineSubmission: {
      centerName: "e-Sevai Center / Office of the Child Development Project Officer (CDPO)",
      counterName: "Social Welfare Marriage Assistance Desk",
      officialStatutoryFee: "₹60 (e-Sevai Service Charge)",
      maxAuthorizedFee: "₹60.00",
      feeWarning: "Official charge is ₹60 at e-Sevai. Field inquiry is conducted by the Social Welfare Extension Officer.",
      statutoryDaysLimit: 30,
      rtsaClause: "Social Welfare and Nutritious Meal Programme Dept Guidelines"
    },
    cedarPolicyCode: `permit(principal, action == Action::"ApplyScheme", resource == Scheme::"TN_Moovalur_Marriage")
when {
    principal.state == "Tamil Nadu" &&
    principal.gender == "Female" &&
    principal.annualFamilyIncome <= 72000 &&
    principal.educationLevel in ["UG", "Diploma", "Professional"]
};`,
    officialGazetteRef: "Social Welfare and Nutritious Meal Programme Department G.O. (Ms) No. 51",
    faqs: [
      {
        q: "When must the application be submitted?",
        a: "Application must be submitted at an e-Sevai center at least 40 days prior to the wedding date."
      }
    ]
  },

  // 24. Tamil Nadu First Graduate Certificate (Mudhal Pattadhari - e-Sevai Revenue Service)
  {
    id: "TN_First_Graduate_Cert",
    title: "Tamil Nadu First Graduate Certificate (Mudhal Thalaimurai Pattadhari - e-Sevai)",
    shortCode: "TNEGA-FG-CERT",
    type: "certificate",
    ministry: "Revenue and Disaster Management & Tamil Nadu e-Governance Agency (TNeGA)",
    sponsoringBody: "Government of Tamil Nadu e-Sevai Digital Service",
    level: "State",
    applicableStates: ["Tamil Nadu"],
    targetCategories: ["All", "ST", "SC", "OBC", "EWS", "General"],
    maxIncome: 999999999,
    educationStages: ["All"],
    courseTypesAllowed: ["Regular Full-Time", "Diploma", "Distance", "Vocational"],
    requiresFirstGraduate: true,
    managementQuotaAllowed: true,
    benefitAmount: "Official Legal Certificate to Claim ₹25,000–₹30,000 Annual Tuition Concession in Colleges",
    benefitDescription: "Statutory certificate issued by Tahsildar through e-Sevai verifying that no member of the applicant's family holds a degree.",
    officialPortalUrl: "https://www.tnesevai.tn.gov.in",
    portalName: "TNeGA e-Sevai Portal",
    portalSchemeCode: "REV-104-FG",
    deadline: "Apply before TNEA College Counseling Document Verification",
    daysRemaining: 20,
    prerequisites: ["Income_Certificate"],
    mandatoryDocuments: [
      "Applicant Class 10th & 12th Marksheets",
      "Father & Mother School Transfer Certificate (TC) or No-Education Declaration",
      "Elder Siblings School Transfer Certificates (proving they did not pursue degree)",
      "Joint Declaration on ₹20 Non-Judicial Stamp Paper",
      "Smart Family Card / Ration Card"
    ],
    offlineSubmission: {
      centerName: "e-Sevai Center / Tahsildar Revenue Office",
      counterName: "TNeGA Certificate Counter",
      officialStatutoryFee: "₹60 (Official TNeGA Service Charge)",
      maxAuthorizedFee: "₹60.00",
      feeWarning: "Official fee is ₹60. Never pay ₹300+ demanded by unauthorized computer centers.",
      statutoryDaysLimit: 15,
      rtsaClause: "Tamil Nadu Right to Public Services & G.O. (Ms) No. 85"
    },
    cedarPolicyCode: `permit(principal, action == Action::"IssueCertificate", resource == Certificate::"TN_First_Graduate_Cert")
when {
    principal.state == "Tamil Nadu" &&
    principal.isFirstGraduateInFamily == true
};`,
    officialGazetteRef: "TNeGA Service Delivery Standards Code REV-104",
    faqs: [
      {
        q: "What is the official fee for First Graduate certificate?",
        a: "The statutory government service fee is ₹60 at any authorized e-Sevai counter."
      }
    ]
  }
];
