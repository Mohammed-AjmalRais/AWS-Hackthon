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
  type: "scholarship" | "certificate";
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
  }
];
