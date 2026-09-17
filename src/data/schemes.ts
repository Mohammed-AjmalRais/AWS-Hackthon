export interface OfflineSubmissionDetail {
  centerName: string;
  counterName: string;
  officialStatutoryFee: string;
  feeWarning: string;
  statutoryDaysLimit: number;
  rtsaClause: string;
}

export interface SchemeOrService {
  id: string;
  title: string;
  hindiTitle: string;
  type: "scholarship" | "certificate" | "welfare";
  ministry: string;
  level: "Central" | "State";
  targetCategories: string[];
  maxIncome: number;
  educationStages: string[];
  benefitAmount: string;
  benefitDescription: string;
  officialPortalUrl: string;
  portalName: string;
  deadline: string;
  daysRemaining: number;
  prerequisites: string[];
  requiredDocuments: string[];
  offlineSubmission: OfflineSubmissionDetail;
  cedarPolicyId: string;
  cedarPolicyCode: string;
  officialGazetteRef: string;
  frequentlyAsked: { q: string; a: string }[];
}

export const SCHEMES_DATABASE: SchemeOrService[] = [
  {
    id: "PostMatric_ST",
    title: "Centrally Sponsored Post-Matric Scholarship for ST Students",
    hindiTitle: "अनुसूचित जनजाति (ST) छात्रों के लिए पोस्ट-मैट्रिक छात्रवृत्ति",
    type: "scholarship",
    ministry: "Ministry of Tribal Affairs (MoTA), Govt. of India",
    level: "Central",
    targetCategories: ["ST"],
    maxIncome: 250000,
    educationStages: ["11th", "12th", "UG", "PG", "PhD", "Diploma", "Professional"],
    benefitAmount: "Up to ₹1,20,000 / year",
    benefitDescription: "100% compulsory non-refundable fees reimbursed + up to ₹1,200/month maintenance allowance for hostellers.",
    officialPortalUrl: "https://scholarships.gov.in",
    portalName: "National Scholarship Portal (NSP)",
    deadline: "Nov 30, 2026",
    daysRemaining: 74,
    prerequisites: ["Caste_Certificate", "Income_Certificate", "Domicile_Certificate"],
    requiredDocuments: [
      "Valid ST Caste/Tribe Certificate (Digital Barcode preferred)",
      "Current Financial Year Income Certificate (< ₹2.5 Lakh)",
      "Aadhaar-NPCI Seeded Bank Account Passbook",
      "Bonafide Student Certificate from College / Institute",
      "Previous Year Marksheet (Passed)",
      "Fee Receipt from Current Institution"
    ],
    offlineSubmission: {
      centerName: "Institute Nodal Officer (INO) Desk & District Tribal Welfare Office",
      counterName: "Scholarship / Student Welfare Cell at College",
      officialStatutoryFee: "₹0 (Completely Free)",
      feeWarning: "Official government fee is ₹0. Never pay commission or fee to private agents.",
      statutoryDaysLimit: 30,
      rtsaClause: "MoTA Post-Matric Operational Guidelines Rev. 2024 Section 7.2"
    },
    cedarPolicyId: "scholarships.cedar#PostMatric_ST",
    cedarPolicyCode: `permit(principal, action == Action::"ApplyScheme", resource == Scheme::"PostMatric_ST")
when {
    principal.category == "ST" &&
    principal.annualFamilyIncome <= 250000 &&
    (principal.educationLevel in ["11th", "12th", "UG", "PG", "PhD", "Diploma", "Professional"])
};`,
    officialGazetteRef: "MoTA Notification No. 14013/01/2021-Scholarship, Gazetted Dec 2023",
    frequentlyAsked: [
      {
        q: "What if my college has not yet verified my application?",
        a: "Your College Institute Nodal Officer (INO) must verify your physical documents on the NSP portal before the deadline. Contact your college scholarship nodal desk immediately."
      },
      {
        q: "Does normal Aadhaar linking work for scholarship credit?",
        a: "No! Normal Aadhaar linking only links for KYC. You must request 'Aadhaar Seeding on NPCI Mapper' at your bank branch for DBT disbursals."
      }
    ]
  },
  {
    id: "PreMatric_ST",
    title: "Centrally Sponsored Pre-Matric Scholarship for ST Students (Class 9 & 10)",
    hindiTitle: "एसटी छात्रों के लिए प्री-मैट्रिक छात्रवृत्ति (कक्षा 9 और 10)",
    type: "scholarship",
    ministry: "Ministry of Tribal Affairs (MoTA), Govt. of India",
    level: "Central",
    targetCategories: ["ST"],
    maxIncome: 250000,
    educationStages: ["Class 9", "Class 10"],
    benefitAmount: "₹3,500 – ₹7,000 / year",
    benefitDescription: "Books, uniform allowance and monthly maintenance to minimize dropout rates before board exams.",
    officialPortalUrl: "https://scholarships.gov.in",
    portalName: "National Scholarship Portal (NSP)",
    deadline: "Oct 31, 2026",
    daysRemaining: 44,
    prerequisites: ["Caste_Certificate", "Income_Certificate"],
    requiredDocuments: [
      "ST Certificate of Student or Father",
      "Income Certificate (< ₹2.5 Lakh)",
      "Student Aadhaar or Parent Aadhaar Consent",
      "School Headmaster Bonafide Certificate"
    ],
    offlineSubmission: {
      centerName: "School Headmaster Desk / Block Education Office (BEO)",
      counterName: "Scholarship Coordinator Desk",
      officialStatutoryFee: "₹0 (Completely Free)",
      feeWarning: "Schools are strictly prohibited from charging form processing fees.",
      statutoryDaysLimit: 20,
      rtsaClause: "Samagra Shiksha & MoTA Joint Directive 2023"
    },
    cedarPolicyId: "scholarships.cedar#PreMatric_ST",
    cedarPolicyCode: `permit(principal, action == Action::"ApplyScheme", resource == Scheme::"PreMatric_ST")
when {
    principal.category == "ST" &&
    principal.annualFamilyIncome <= 250000 &&
    (principal.educationLevel in ["Class 9", "Class 10"])
};`,
    officialGazetteRef: "MoTA Scheme Code ST-PRE-2024",
    frequentlyAsked: [
      {
        q: "Can day scholars apply, or only hostellers?",
        a: "Both day scholars and hostellers are eligible; hostellers receive a higher maintenance grant."
      }
    ]
  },
  {
    id: "TopClass_ST",
    title: "National Scholarship for Higher Education / Top Class Education for ST Students",
    hindiTitle: "एसटी छात्रों के लिए राष्ट्रीय शीर्ष श्रेणी शिक्षा छात्रवृत्ति",
    type: "scholarship",
    ministry: "Ministry of Tribal Affairs (MoTA)",
    level: "Central",
    targetCategories: ["ST"],
    maxIncome: 600000,
    educationStages: ["UG", "PG"],
    benefitAmount: "Full Tuition Fee + ₹45,000 living/books allowance",
    benefitDescription: "Complete tuition coverage at notified top institutes (IITs, NITs, IIMs, AIIMS, National Law Universities, Central Universities).",
    officialPortalUrl: "https://scholarships.gov.in",
    portalName: "NSP Top Class ST Module",
    deadline: "Dec 15, 2026",
    daysRemaining: 89,
    prerequisites: ["Caste_Certificate", "Income_Certificate", "Domicile_Certificate"],
    requiredDocuments: [
      "Allotment letter from JEE/NEET/CAT/CLAT or entrance rank",
      "Caste Certificate issued by SDO / Sub-Collector",
      "Income Certificate up to ₹6.0 Lakh/year",
      "Institute Admission Fee Structure"
    ],
    offlineSubmission: {
      centerName: "Dean of Student Affairs / Financial Aid Cell at Notified Institute",
      counterName: "Nodal Officer Desk",
      officialStatutoryFee: "₹0 (Completely Free)",
      feeWarning: "Official MoTA Direct Scheme. No third-party fee applies.",
      statutoryDaysLimit: 45,
      rtsaClause: "MoTA Top Class Higher Education Manual Par. 4.1"
    },
    cedarPolicyId: "scholarships.cedar#TopClass_ST",
    cedarPolicyCode: `permit(principal, action == Action::"ApplyScheme", resource == Scheme::"TopClass_ST")
when {
    principal.category == "ST" &&
    principal.annualFamilyIncome <= 600000 &&
    (principal.educationLevel in ["UG", "PG"])
};`,
    officialGazetteRef: "MoTA Top Class Gazette S.O. 441(E)",
    frequentlyAsked: [
      {
        q: "Are private colleges covered under Top Class ST?",
        a: "Only MoTA-notified premier institutions are covered. Check if your institute is in the 256 notified list."
      }
    ]
  },
  {
    id: "PostMatric_SC",
    title: "Post-Matric Scholarship for Scheduled Caste (SC) Students",
    hindiTitle: "अनुसूचित जाति (SC) छात्रों के लिए पोस्ट-मैट्रिक छात्रवृत्ति",
    type: "scholarship",
    ministry: "Ministry of Social Justice & Empowerment (MoSJE)",
    level: "Central",
    targetCategories: ["SC"],
    maxIncome: 250000,
    educationStages: ["11th", "12th", "UG", "PG", "PhD", "Diploma", "Professional"],
    benefitAmount: "Up to ₹90,000 / year",
    benefitDescription: "Tuition waiver + annual academic allowance credited directly via DBT to Aadhaar seeded accounts.",
    officialPortalUrl: "https://scholarships.gov.in",
    portalName: "National Scholarship Portal & State Portals",
    deadline: "Nov 30, 2026",
    daysRemaining: 74,
    prerequisites: ["Caste_Certificate", "Income_Certificate", "Domicile_Certificate"],
    requiredDocuments: [
      "SC Caste Certificate issued by competent Revenue Authority",
      "Annual Income Certificate (< ₹2.5L)",
      "Bank Account with NPCI Active Seeding",
      "Previous Qualifying Exam Marksheet"
    ],
    offlineSubmission: {
      centerName: "District Social Welfare Office & College Nodal Cell",
      counterName: "SC Welfare Section",
      officialStatutoryFee: "₹0 (Completely Free)",
      feeWarning: "Centrally sponsored scheme. Zero application processing fee.",
      statutoryDaysLimit: 30,
      rtsaClause: "MoSJE Scheme Guidelines Revision 2022 Section 5"
    },
    cedarPolicyId: "scholarships.cedar#PostMatric_SC",
    cedarPolicyCode: `permit(principal, action == Action::"ApplyScheme", resource == Scheme::"PostMatric_SC")
when {
    principal.category == "SC" &&
    principal.annualFamilyIncome <= 250000 &&
    (principal.educationLevel in ["11th", "12th", "UG", "PG", "PhD", "Diploma", "Professional"])
};`,
    officialGazetteRef: "MoSJE Notification F.No. 11014/03/2020-SCD-V",
    frequentlyAsked: [
      {
        q: "What is the central:state funding share?",
        a: "60% central share and 40% state share (90:10 for NE states), deposited directly via DBT."
      }
    ]
  },
  {
    id: "PM_YASASVI_OBC",
    title: "PM YASASVI Post-Matric Scholarship for OBC, EBC & DNT Students",
    hindiTitle: "ओबीसी, ईबीसी और डीएनटी छात्रों के लिए पीएम यशस्वी पोस्ट-मैट्रिक छात्रवृत्ति",
    type: "scholarship",
    ministry: "Ministry of Social Justice & Empowerment",
    level: "Central",
    targetCategories: ["OBC", "EBC", "DNT"],
    maxIncome: 250000,
    educationStages: ["11th", "12th", "UG", "PG", "PhD", "Diploma"],
    benefitAmount: "Up to ₹50,000 / year",
    benefitDescription: "Financial assistance for post-matric or post-secondary stages for Other Backward Classes and Nomadic tribes.",
    officialPortalUrl: "https://scholarships.gov.in",
    portalName: "NSP PM YASASVI Section",
    deadline: "Oct 31, 2026",
    daysRemaining: 44,
    prerequisites: ["Caste_Certificate", "OBC_NCL_Certificate", "Income_Certificate"],
    requiredDocuments: [
      "OBC / Non-Creamy Layer (NCL) Certificate",
      "Family Income Certificate (< ₹2.5L)",
      "Aadhaar Card",
      "College Admission Proof"
    ],
    offlineSubmission: {
      centerName: "District Backward Classes Welfare Office",
      counterName: "OBC / EBC Development Desk",
      officialStatutoryFee: "₹0 (Free)",
      feeWarning: "No government fee for student registration.",
      statutoryDaysLimit: 30,
      rtsaClause: "PM YASASVI Umbrella Guidelines 2023"
    },
    cedarPolicyId: "scholarships.cedar#PM_YASASVI_OBC",
    cedarPolicyCode: `permit(principal, action == Action::"ApplyScheme", resource == Scheme::"PM_YASASVI_OBC")
when {
    (principal.category in ["OBC", "EBC", "DNT"]) &&
    principal.annualFamilyIncome <= 250000 &&
    (principal.educationLevel in ["11th", "12th", "UG", "PG", "PhD", "Diploma"])
};`,
    officialGazetteRef: "MoSJE PM-YASASVI Operational Manual 2023-24",
    frequentlyAsked: [
      {
        q: "Is Non-Creamy Layer (NCL) certificate mandatory for OBC?",
        a: "Yes. OBC quota benefits strictly require an active financial year NCL endorsement."
      }
    ]
  },
  {
    id: "BegumHazratMahal",
    title: "Begum Hazrat Mahal National Scholarship for Minority Girls",
    hindiTitle: "अल्पसंख्यक छात्राओं के लिए बेगम हज़रत महल राष्ट्रीय छात्रवृत्ति",
    type: "scholarship",
    ministry: "Ministry of Minority Affairs (MoMA)",
    level: "Central",
    targetCategories: ["Minority", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Parsi"],
    maxIncome: 200000,
    educationStages: ["Class 9", "Class 10", "11th", "12th"],
    benefitAmount: "₹5,000 to ₹6,000 / year",
    benefitDescription: "Direct stipend for meritorious girl students belonging to notified national minority communities.",
    officialPortalUrl: "https://scholarships.gov.in",
    portalName: "National Scholarship Portal",
    deadline: "Nov 15, 2026",
    daysRemaining: 59,
    prerequisites: ["Income_Certificate"],
    requiredDocuments: [
      "Self-declaration of Minority Community",
      "Income Certificate (< ₹2.0 Lakh)",
      "Marksheet of previous class with >= 50% marks",
      "School verification certificate signed by Principal"
    ],
    offlineSubmission: {
      centerName: "School Principal Office & District Minority Welfare Officer",
      counterName: "Minority Scholarship Counter",
      officialStatutoryFee: "₹0 (Free)",
      feeWarning: "Ministry of Minority Affairs explicitly forbids fee charges.",
      statutoryDaysLimit: 25,
      rtsaClause: "MoMA BHMNS Guidelines Clause 4.2"
    },
    cedarPolicyId: "scholarships.cedar#BegumHazratMahal",
    cedarPolicyCode: `permit(principal, action == Action::"ApplyScheme", resource == Scheme::"BegumHazratMahal")
when {
    principal.gender == "Female" &&
    principal.isMinority == true &&
    principal.annualFamilyIncome <= 200000 &&
    (principal.educationLevel in ["Class 9", "Class 10", "11th", "12th"])
};`,
    officialGazetteRef: "MoMA Gazette Notification BHMNS-2023",
    frequentlyAsked: [
      {
        q: "Is there a minimum marks requirement?",
        a: "Yes, candidates must secure at least 50% aggregate marks in the previous qualifying examination."
      }
    ]
  },
  {
    id: "AICTE_Pragati",
    title: "AICTE Pragati Scholarship for Female Students in Technical Degrees/Diplomas",
    hindiTitle: "तकनीकी शिक्षा में छात्राओं के लिए एआईसीटीई प्रगति छात्रवृत्ति",
    type: "scholarship",
    ministry: "All India Council for Technical Education (AICTE), Ministry of Education",
    level: "Central",
    targetCategories: ["ST", "SC", "OBC", "EWS", "General"],
    maxIncome: 800000,
    educationStages: ["UG", "Diploma"],
    benefitAmount: "₹50,000 / year (Fixed)",
    benefitDescription: "₹50,000 lump sum per annum towards college tuition, purchase of laptop, stationery and books.",
    officialPortalUrl: "https://scholarships.gov.in",
    portalName: "National Scholarship Portal AICTE Module",
    deadline: "Dec 31, 2026",
    daysRemaining: 105,
    prerequisites: ["Income_Certificate", "Domicile_Certificate"],
    requiredDocuments: [
      "AICTE approved institute admission receipt",
      "Family Income Certificate (up to ₹8 Lakh)",
      "Aadhaar Number",
      "Class 12 or 10th marksheet showing merit"
    ],
    offlineSubmission: {
      centerName: "College Academic Cell / AICTE Nodal Desk",
      counterName: "AICTE Portal Verification Counter",
      officialStatutoryFee: "₹0 (Free)",
      feeWarning: "Free government benefit. Up to 2 girls per family allowed.",
      statutoryDaysLimit: 30,
      rtsaClause: "AICTE Pragati Scheme Regulations Gazette"
    },
    cedarPolicyId: "scholarships.cedar#AICTE_Pragati",
    cedarPolicyCode: `permit(principal, action == Action::"ApplyScheme", resource == Scheme::"AICTE_Pragati")
when {
    principal.gender == "Female" &&
    principal.annualFamilyIncome <= 800000 &&
    (principal.educationLevel in ["UG", "Diploma"]) &&
    principal.isTechnicalCourse == true
};`,
    officialGazetteRef: "AICTE F.No. 1-104/AICTE/P&AP/Pragati-Saksham/2021",
    frequentlyAsked: [
      {
        q: "How many daughters in one family can receive this?",
        a: "A maximum of two girl children per family are eligible."
      }
    ]
  },
  // Essential Citizen Certificates (Prerequisite Enablers)
  {
    id: "Caste_Certificate",
    title: "Caste / Tribe Certificate (ST / SC / OBC)",
    hindiTitle: "जाति / जनजाति प्रमाण पत्र (एसटी / एससी / ओबीसी)",
    type: "certificate",
    ministry: "State Revenue & District Administration Dept",
    level: "State",
    targetCategories: ["ST", "SC", "OBC"],
    maxIncome: 99999999,
    educationStages: ["All"],
    benefitAmount: "Statutory Identity Document",
    benefitDescription: "Mandatory prerequisite required to claim educational reservations, fee waivers, and government welfare benefits.",
    officialPortalUrl: "https://edistrict.gov.in",
    portalName: "State e-District / MeeSeva / RTPS Portal",
    deadline: "Ongoing (Apply 45 days before scholarship closing)",
    daysRemaining: 365,
    prerequisites: [],
    requiredDocuments: [
      "Father or Paternal Blood Relative Caste Certificate / Land Record (ROR)",
      "Applicant Aadhaar Card",
      "School Leaving Certificate (indicating caste/tribe)",
      "Affidavit / Self-declaration"
    ],
    offlineSubmission: {
      centerName: "Tahsildar / Sub-Divisional Magistrate (SDM) / Taluk Office or CSC Center",
      counterName: "Revenue / RTPS Citizen Service Counter",
      officialStatutoryFee: "₹25 – ₹30 (Depending on State RTPS Act)",
      feeWarning: "Beware: Authorized fee is ₹25-30. If CSC charges ₹200+, ask for an official computerized receipt.",
      statutoryDaysLimit: 21,
      rtsaClause: "State Right to Public Services Act (RTSA) SLA Schedule"
    },
    cedarPolicyId: "certificates.cedar#Caste_Certificate",
    cedarPolicyCode: `permit(principal, action == Action::"IssueCertificate", resource == Certificate::"Caste_Certificate")
when {
    (principal.category in ["ST", "SC", "OBC"]) &&
    principal.hasPaternalCasteRecord == true
};`,
    officialGazetteRef: "Ministry of Home Affairs Guidelines on Scheduled Castes & Scheduled Tribes Certificates",
    frequentlyAsked: [
      {
        q: "Can I get a caste certificate based on maternal relatives?",
        a: "Under Indian law, caste status is inherited patrilineally from the father. Exceptional cases require special judicial affidavit."
      }
    ]
  },
  {
    id: "Income_Certificate",
    title: "Annual Family Income & Asset Certificate",
    hindiTitle: "आय प्रमाण पत्र (तहसील / राजस्व विभाग)",
    type: "certificate",
    ministry: "Revenue Department (State Governments)",
    level: "State",
    targetCategories: ["ST", "SC", "OBC", "EWS", "General"],
    maxIncome: 99999999,
    educationStages: ["All"],
    benefitAmount: "Prerequisite for 95% of all Government Scholarships",
    benefitDescription: "Official determination of household income, valid for 1 Financial Year. Crucial for EWS, OBC, and SC/ST fee waiver thresholds.",
    officialPortalUrl: "https://services.india.gov.in",
    portalName: "State Revenue / e-District Citizen Portal",
    deadline: "Renew annually in April - July",
    daysRemaining: 180,
    prerequisites: [],
    requiredDocuments: [
      "Ration Card / Family Member ID",
      "Salary Slip / Form 16 / ITR or Self-Employed Gram Panchayat Income Panchanama",
      "Electricity Bill or Address Proof",
      "Affidavit stamped by Notary / Tehsildar verification"
    ],
    offlineSubmission: {
      centerName: "Tehsildar Office / Taluk Revenue Inspector / CSC Digital Seva Kendra",
      counterName: "Income Certificate Desk",
      officialStatutoryFee: "₹20 – ₹35 (State Gazette regulated)",
      feeWarning: "Do not pay bribes or unofficial commissions. Always demand receipt with Application No.",
      statutoryDaysLimit: 14,
      rtsaClause: "Right to Public Service Delivery Timeline 14-21 Days"
    },
    cedarPolicyId: "certificates.cedar#Income_Certificate",
    cedarPolicyCode: `permit(principal, action == Action::"IssueCertificate", resource == Certificate::"Income_Certificate")
when {
    principal.hasValidAddressProof == true
};`,
    officialGazetteRef: "State Revenue Code & Citizen Charter Manual",
    frequentlyAsked: [
      {
        q: "What is the validity of an Income Certificate?",
        a: "Typically 1 Financial Year (April 1 to March 31). Scholarships for 2026-27 require certificates issued on or after April 1, 2026."
      }
    ]
  },
  {
    id: "EWS_Certificate",
    title: "Economically Weaker Section (EWS) Certificate",
    hindiTitle: "आर्थिक रूप से कमजोर वर्ग (EWS) प्रमाण पत्र",
    type: "certificate",
    ministry: "Ministry of Personnel, Public Grievances & Pensions / State Revenue",
    level: "Central",
    targetCategories: ["General"],
    maxIncome: 800000,
    educationStages: ["All"],
    benefitAmount: "10% Reservation in Admissions & Jobs + Fee Concessions",
    benefitDescription: "Available to General Category citizens whose family income is below ₹8 Lakhs and do not fall under SC/ST/OBC quotas.",
    officialPortalUrl: "https://services.india.gov.in",
    portalName: "State e-District / Taluk Office",
    deadline: "Valid for 1 Financial Year",
    daysRemaining: 180,
    prerequisites: ["Income_Certificate", "Domicile_Certificate"],
    requiredDocuments: [
      "Aadhaar Card of Applicant & Family",
      "Family Income & Asset Verification Documents (ITR / Bank Statements)",
      "Land Record / Property tax receipt (proving < 5 acres land & < 1000 sq ft flat)",
      "Self-Declaration of not availing SC/ST/OBC quotas"
    ],
    offlineSubmission: {
      centerName: "SDO / Tehsildar / District Magistrate Revenue Branch",
      counterName: "EWS Verification Counter",
      officialStatutoryFee: "₹30 – ₹50",
      feeWarning: "Official administrative fee only. Verification is conducted by Revenue Inspector (RI).",
      statutoryDaysLimit: 21,
      rtsaClause: "Central EWS Notification No. 20013/01/2018-BC-II"
    },
    cedarPolicyId: "certificates.cedar#EWS_Certificate",
    cedarPolicyCode: `permit(principal, action == Action::"IssueCertificate", resource == Certificate::"EWS_Certificate")
when {
    principal.category == "General" &&
    principal.annualFamilyIncome <= 800000 &&
    principal.agriculturalLandAcres <= 5.0
};`,
    officialGazetteRef: "DoPT OM No. 36039/1/2019-Estt (Res) dated 31st January 2019",
    frequentlyAsked: [
      {
        q: "Who qualifies as family under EWS criteria?",
        a: "Person seeking reservation, parents, siblings below 18 years, spouse, and children below 18 years."
      }
    ]
  },
  {
    id: "Domicile_Certificate",
    title: "Domicile / Permanent Resident Certificate (PRC)",
    hindiTitle: "मूल निवास / अधिवास प्रमाण पत्र (Domicile)",
    type: "certificate",
    ministry: "State Home & Revenue Administration",
    level: "State",
    targetCategories: ["ST", "SC", "OBC", "EWS", "General"],
    maxIncome: 99999999,
    educationStages: ["All"],
    benefitAmount: "Proof of State Residence for 85% State Quotas & State Scholarships",
    benefitDescription: "Establishes long-term residence in the home state (usually 5 to 15 years), enabling state quota counseling and state DBT schemes.",
    officialPortalUrl: "https://edistrict.gov.in",
    portalName: "State e-District Portal",
    deadline: "Valid for Lifetime in most states",
    daysRemaining: 999,
    prerequisites: [],
    requiredDocuments: [
      "Proof of continuous residence for required years (School records, Electricity bill, Voter ID)",
      "Land registration documents / House deed or Father's PRC",
      "Birth Certificate or 10th School Leaving Certificate",
      "Passport-sized photographs"
    ],
    offlineSubmission: {
      centerName: "Tehsildar / Taluk Office / District Administrative Complex",
      counterName: "Citizenship & Resident Records Counter",
      officialStatutoryFee: "₹25 – ₹40",
      feeWarning: "Lifetime validity document. Do not pay agents.",
      statutoryDaysLimit: 15,
      rtsaClause: "State Citizen Charter Service Delivery Code"
    },
    cedarPolicyId: "certificates.cedar#Domicile_Certificate",
    cedarPolicyCode: `permit(principal, action == Action::"IssueCertificate", resource == Certificate::"Domicile_Certificate")
when {
    principal.residenceYearsInState >= 5
};`,
    officialGazetteRef: "State Domicile Rules & Judicial Precedents",
    frequentlyAsked: [
      {
        q: "Does a Domicile Certificate expire?",
        a: "In most Indian states, once issued, a Domicile Certificate has lifetime validity unless proven fraudulent."
      }
    ]
  }
];
