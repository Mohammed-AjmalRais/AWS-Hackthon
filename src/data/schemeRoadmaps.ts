import { SCHEMES_DATABASE, SchemeOrService } from "./schemes";

export interface RoadmapBaseDocument {
  name: string;
  requirement: string;
  mandatory: boolean;
}

export interface RoadmapStatutoryCertificate {
  certificateId: string;
  name: string;
  authority: string;
  turnaround: string;
  statutoryCost: string;
  validity: string;
  keyCondition: string;
}

export interface RoadmapInstitutionalItem {
  name: string;
  authority: string;
  action: string;
  category: "Academic" | "Healthcare" | "Banking" | "Civic";
}

export interface RoadmapStage {
  stageNumber: number;
  stageName: string;
  actor: string;
  timeline: string;
  description: string;
  actionItem: string;
  commonPitfall: string;
}

export interface SchemeRoadmap {
  schemeId: string;
  schemeTitle: string;
  shortCode: string;
  type: "scholarship" | "certificate" | "healthcare";
  categoryLabel: string;
  sponsoringBody: string;
  benefitHeadline: string;
  statutoryTimeLimit: string;
  officialFee: string;
  portalName: string;
  portalUrl: string;
  offlineCounter: string;
  tier1BaseIdentity: RoadmapBaseDocument[];
  tier2StatutoryCertificates: RoadmapStatutoryCertificate[];
  tier3Institutional: RoadmapInstitutionalItem[];
  bankingRequirement: string;
  stages: RoadmapStage[];
  rejectionChecklist: { check: string; resolution: string }[];
}

// 1. DEDICATED ROADMAPS FOR EVERY SCHEME & SERVICE
export const SCHEME_ROADMAPS: Record<string, SchemeRoadmap> = {
  // --- MEDICAL & HEALTHCARE EXPENSES ---
  Ayushman_PMJAY: {
    schemeId: "Ayushman_PMJAY",
    schemeTitle: "Ayushman Bharat PM-JAY & Rashtriya Arogya Nidhi (RAN) Medical Expense Assistance",
    shortCode: "AB-PMJAY-RAN",
    type: "healthcare",
    categoryLabel: "National Health Assurance & Critical Illness Financial Relief",
    sponsoringBody: "National Health Authority (NHA) & Ministry of Health and Family Welfare (MoHFW)",
    benefitHeadline: "₹5,00,000 / Family / Year Cashless Treatment + Up to ₹15 Lakh Critical Care under RAN",
    statutoryTimeLimit: "Instant e-Card at Hospital Kiosk; Pre-Auth within 2 Hours",
    officialFee: "₹0 (100% Statutorily Free)",
    portalName: "NHA Beneficiary Portal (BIS / TMS)",
    portalUrl: "https://beneficiary.nha.gov.in",
    offlineCounter: "Ayushman Mitra Helpdesk at District Hospital / Empaneled Medical College",
    tier1BaseIdentity: [
      {
        name: "Aadhaar Card (Patient & Family Head)",
        requirement: "Biometric or OTP verification on NHA Beneficiary Identification System (BIS)",
        mandatory: true,
      },
      {
        name: "Ration Card (NFSA / BPL / Antyodaya / State Food Security)",
        requirement: "Family member list must match names on Aadhaar to establish household eligibility",
        mandatory: true,
      },
      {
        name: "Active Mobile Phone",
        requirement: "For receiving Aadhaar OTP and transaction OTP at hospital admission",
        mandatory: true,
      },
    ],
    tier2StatutoryCertificates: [
      {
        certificateId: "Income_Certificate",
        name: "Income Certificate (Current FY)",
        authority: "Tehsildar / Sub-Divisional Magistrate",
        turnaround: "15 Days",
        statutoryCost: "₹25",
        validity: "Current FY 2026-27 (Mandatory if applying for supplementary Rashtriya Arogya Nidhi relief)",
        keyCondition: "Annual family income must be under ₹2,50,000",
      },
      {
        certificateId: "Resident_Proof",
        name: "State Domicile / Residence Proof",
        authority: "Tahsil / Municipal Corporation",
        turnaround: "15 Days",
        statutoryCost: "₹25",
        validity: "Permanent",
        keyCondition: "Confirms state health agency coverage for specialized state top-ups",
      },
    ],
    tier3Institutional: [
      {
        name: "Government Hospital Specialist Doctor Referral",
        authority: "Civil Surgeon / Medical Superintendent / HOD",
        action: "Doctor referral or clinical admission requisition for specialized secondary/tertiary surgery",
        category: "Healthcare",
      },
      {
        name: "Treatment Cost Estimate Proforma (for RAN / Major Illnesses)",
        authority: "Government Hospital Medical Superintendent",
        action: "Official itemized quote for implants, chemotherapy, cardiac stents, or surgical packages",
        category: "Healthcare",
      },
      {
        name: "Ayushman Mitra Pre-Authorization Request",
        authority: "Empaneled Hospital Ayushman Desk",
        action: "Digital pre-auth raised on NHA Transaction Management System (TMS) before procedure",
        category: "Healthcare",
      },
    ],
    bankingRequirement: "Cashless direct hospital settlement via NHA TMS. No patient bank account needed for treatment; patient pays ₹0 out of pocket.",
    stages: [
      {
        stageNumber: 1,
        stageName: "Pre-Flight Eligibility & e-KYC Verification",
        actor: "Beneficiary / Ayushman Mitra",
        timeline: "Instant (15 mins)",
        description: "Verify household name in the SECC / NFSA database using Aadhaar or Ration Card at any empaneled hospital kiosk.",
        actionItem: "Generate Ayushman Bharat PVC Card on spot with zero fee.",
        commonPitfall: "Spelling variation between Ration card and Aadhaar. Carry both along with voter ID or passport.",
      },
      {
        stageNumber: 2,
        stageName: "Clinical Evaluation & Referral",
        actor: "Government Medical Officer / Empaneled Specialist",
        timeline: "Day 1",
        description: "Specialist diagnoses medical condition and prescribes an empaneled surgical or medical treatment package.",
        actionItem: "Obtain doctor prescription and clinical diagnostic reports (MRI, Biopsy, Blood tests).",
        commonPitfall: "Getting treatment at an un-empaneled private nursing home where Ayushman benefits cannot be claimed.",
      },
      {
        stageNumber: 3,
        stageName: "Hospital TMS Pre-Authorization",
        actor: "Hospital Ayushman Mitra & State Health Agency (SHA)",
        timeline: "Within 2 - 4 Hours",
        description: "Hospital uploads doctor recommendation and diagnostic scans to the NHA TMS portal to obtain government pre-auth.",
        actionItem: "Ensure hospital initiates TMS claim before surgery or ICU transfer.",
        commonPitfall: "Hospital asking for cash deposit as 'security'. Under NHA rules, taking cash for empaneled packages is strictly illegal.",
      },
      {
        stageNumber: 4,
        stageName: "100% Cashless Surgery / Inpatient Care",
        actor: "Empaneled Hospital Medical Team",
        timeline: "Duration of Admission",
        description: "Patient receives surgery, implants, nursing care, room rent, and ICU treatment without paying a single rupee.",
        actionItem: "Sign biometric discharge voucher only upon completion of full medical treatment.",
        commonPitfall: "Paying out-of-pocket for surgical consumables. All medicines, implants, and blood components are 100% covered.",
      },
      {
        stageNumber: 5,
        stageName: "Discharge & 15-Day Free Post-Care Medication",
        actor: "Hospital Pharmacy & Discharge Desk",
        timeline: "At Discharge",
        description: "Hospital provides discharge summary and dispenses 15 days of take-home medications at ₹0 cost.",
        actionItem: "Collect detailed discharge summary and follow-up appointment slip.",
        commonPitfall: "Leaving without collecting the mandatory 15-day post-discharge medication pack.",
      },
    ],
    rejectionChecklist: [
      {
        check: "Is the hospital actively empaneled under AB-PMJAY for your specific surgical specialty?",
        resolution: "Verify hospital empanelment status at beneficiary.nha.gov.in or call toll-free 14555 before admission.",
      },
      {
        check: "Are you being asked to pay cash advance for surgical consumables?",
        resolution: "Immediately quote Section 4 of NHA guidelines to the hospital Nodal Officer or dial 14555 to report extortion.",
      },
    ],
  },

  // --- SCHOLARSHIP: POST-MATRIC ST ---
  PostMatric_ST: {
    schemeId: "PostMatric_ST",
    schemeTitle: "Centrally Sponsored Post-Matric Scholarship for Scheduled Tribe (ST) Students",
    shortCode: "MoTA-PMS-ST",
    type: "scholarship",
    categoryLabel: "Centrally Sponsored Higher Education Scholarship",
    sponsoringBody: "Ministry of Tribal Affairs (MoTA), Government of India (75:25 Central:State)",
    benefitHeadline: "100% Compulsory Tuition Waiver + Up to ₹1,200/mo Hosteller Stipend",
    statutoryTimeLimit: "30 Days after College INO Verification",
    officialFee: "₹0.00 (Free Application)",
    portalName: "National Scholarship Portal (NSP) / State Tribal DBT",
    portalUrl: "https://scholarships.gov.in",
    offlineCounter: "District Welfare Officer (DWO) / College Scholarship Clerk Desk",
    tier1BaseIdentity: [
      {
        name: "Aadhaar Card of Student",
        requirement: "Must have exact full name matching Class 10th certificate and active mobile linked",
        mandatory: true,
      },
      {
        name: "Class 10th Secondary Board Marksheet & Certificate",
        requirement: "Sole authentic proof for date of birth and spelling of student & parents' names",
        mandatory: true,
      },
      {
        name: "Father's / Paternal Relative's 1950 Land Record (RoR)",
        requirement: "Required by Tehsildar to verify original tribal ancestry for Caste Validity",
        mandatory: true,
      },
      {
        name: "Family Ration Card / BPL Card",
        requirement: "Identifies family composition and basic address verification",
        mandatory: false,
      },
    ],
    tier2StatutoryCertificates: [
      {
        certificateId: "Caste_Certificate",
        name: "Scheduled Tribe (ST) Certificate & Validity",
        authority: "Sub-Divisional Officer (SDO) / Tehsildar / District Magistrate",
        turnaround: "30 Days",
        statutoryCost: "₹30",
        validity: "Permanent / Lifetime",
        keyCondition: "Must explicitly specify notified tribe under Presidential Order",
      },
      {
        certificateId: "Income_Certificate",
        name: "Statutory Family Income Certificate",
        authority: "Tehsildar / Competent Revenue Authority",
        turnaround: "15 Days",
        statutoryCost: "₹25",
        validity: "Issued in Current FY 2026-27 (Valid for 1 Year)",
        keyCondition: "Total annual family income from all sources must not exceed ₹2,50,000",
      },
    ],
    tier3Institutional: [
      {
        name: "College Bonafide Student Certificate",
        authority: "College Principal / Registrar Office",
        action: "Must confirm current academic year enrollment in regular full-time mode",
        category: "Academic",
      },
      {
        name: "College Non-Refundable Fee Structure Breakdown",
        authority: "College Accounts Section",
        action: "Itemizes tuition, examination, and laboratory fees for 100% reimbursement",
        category: "Academic",
      },
      {
        name: "Hosteller Certificate (if claiming hostel stipend)",
        authority: "Hostel Chief Warden",
        action: "Certifies resident status to unlock higher ₹1,200/mo stipend vs ₹550 day-scholar rate",
        category: "Academic",
      },
      {
        name: "Aadhaar NPCI DBT Bank Account Mandate",
        authority: "Designated Nationalized Bank Branch",
        action: "Bank manager submits Annexure I mandate into NPCI APBS Mapper",
        category: "Banking",
      },
    ],
    bankingRequirement: "Aadhaar MUST be seeded on the NPCI DBT Mapper. Simple core banking linking is INSUFFICIENT.",
    stages: [
      {
        stageNumber: 1,
        stageName: "Pre-Flight Audit & Prerequisite Assembly",
        actor: "Student (Self)",
        timeline: "Week 1 - 2",
        description: "Obtain Income Certificate (< ₹2.5L) from Tehsildar and check NPCI bank account seeding status.",
        actionItem: "Run JanSetu Document Audit to catch any initial spelling mismatch before portal entry.",
        commonPitfall: "Using previous year's expired income certificate or submitting unseeded bank account.",
      },
      {
        stageNumber: 2,
        stageName: "NSP / State Portal Online Submission",
        actor: "Student",
        timeline: "Before Portal Deadline",
        description: "Complete e-KYC on National Scholarship Portal with Aadhaar OTP, enter college admission details, and upload documents.",
        actionItem: "Save generated Application ID and print acknowledgment slip.",
        commonPitfall: "Selecting wrong course type (Distance instead of Regular) or incorrect admission category.",
      },
      {
        stageNumber: 3,
        stageName: "Institute Nodal Officer (INO) Physical Audit",
        actor: "College Principal / INO Clerk",
        timeline: "Within 10 Days of Submission",
        description: "College INO logs into NSP admin portal, cross-checks uploaded certificates against physical originals, and marks 'VERIFIED'.",
        actionItem: "Physically submit printed acknowledgment and attested photocopies to college scholarship clerk.",
        commonPitfall: "Application silently languishing on college clerk's pending desk until verification portal closes.",
      },
      {
        stageNumber: 4,
        stageName: "District Welfare Officer (DWO) Sanction",
        actor: "District Welfare Officer / State Tribal Dept",
        timeline: "15 - 20 Days post-INO",
        description: "DWO verifies district quota, income authenticity via revenue database, and generates merit sanction order.",
        actionItem: "Track application status weekly on NSP; respond promptly if marked 'Defective'.",
        commonPitfall: "If marked 'Defective' for unclear document scan, student must re-upload within 72 hours.",
      },
      {
        stageNumber: 5,
        stageName: "PFMS Treasury Direct Benefit Transfer (DBT)",
        actor: "Public Financial Management System (PFMS) & Ministry",
        timeline: "Direct Disbursal",
        description: "Ministry generates digital payment file. PFMS credits 100% tuition directly to college/student and monthly stipend to bank account.",
        actionItem: "Verify credit SMS from PFMS via Aadhaar Payment Bridge.",
        commonPitfall: "Inactive bank account causing payment bounce back to central treasury.",
      },
    ],
    rejectionChecklist: [
      {
        check: "Does your name on the Class 10 marksheet have initials while Aadhaar has full name?",
        resolution: "Execute JanSetu Name Affidavit and submit to college INO along with application.",
      },
      {
        check: "Is your bank account seeded on the NPCI Mapper?",
        resolution: "Download pre-filled JanSetu NPCI Annexure I Mandate and have bank branch manager seal it.",
      },
    ],
  },

  // --- SCHOLARSHIP: AICTE PRAGATI FOR GIRLS ---
  AICTE_Pragati: {
    schemeId: "AICTE_Pragati",
    schemeTitle: "AICTE Pragati Scholarship Scheme for Girl Students (Technical Degree & Diploma)",
    shortCode: "AICTE-PRAGATI",
    type: "scholarship",
    categoryLabel: "Central Merit Scholarship for Women in Technical Education",
    sponsoringBody: "All India Council for Technical Education (AICTE), Ministry of Education",
    benefitHeadline: "₹50,000 / Year Contingency & Tuition Grant",
    statutoryTimeLimit: "Annual Cycle (Disbursed in single lump sum)",
    officialFee: "₹0.00",
    portalName: "National Scholarship Portal (NSP)",
    portalUrl: "https://scholarships.gov.in",
    offlineCounter: "AICTE Institute Verification Cell / College Technical Desk",
    tier1BaseIdentity: [
      {
        name: "Aadhaar Card of Female Student",
        requirement: "Must show student as Female with mobile number linked",
        mandatory: true,
      },
      {
        name: "Class 10th & 12th Qualifying Exam Marksheets",
        requirement: "Proof of qualifying eligibility for admission into degree/diploma program",
        mandatory: true,
      },
      {
        name: "Centralized Admission Counseling (CAP) Allotment Letter",
        requirement: "Proof that admission was obtained via merit counseling (JEE / State CET)",
        mandatory: true,
      },
    ],
    tier2StatutoryCertificates: [
      {
        certificateId: "Income_Certificate",
        name: "Annual Family Income Certificate",
        authority: "Tehsildar / Sub-Divisional Officer",
        turnaround: "15 Days",
        statutoryCost: "₹25",
        validity: "Current FY 2026-27",
        keyCondition: "Annual family income must be under ₹8,00,000",
      },
      {
        certificateId: "Sibling_Affidavit",
        name: "Notarized Sibling Affidavit (Parental Declaration)",
        authority: "Executive Magistrate / Notary Public",
        turnaround: "Same Day",
        statutoryCost: "₹50 Stamp Paper",
        validity: "Academic Year",
        keyCondition: "Affirms candidate is one of maximum TWO daughters availing Pragati benefits",
      },
    ],
    tier3Institutional: [
      {
        name: "AICTE Approved Institution Bonafide Certificate",
        authority: "College Principal / Dean",
        action: "Certifies that the specific technical course and institution have active AICTE approval",
        category: "Academic",
      },
      {
        name: "First Year Tuition Fee Receipt",
        authority: "College Accounts Section",
        action: "Verifies regular admission and paid academic tuition",
        category: "Academic",
      },
      {
        name: "Aadhaar Seeded Bank Account in Student's Solo Name",
        authority: "Nationalized Bank Branch",
        action: "Must be in student's sole name (joint accounts with parents are strictly rejected)",
        category: "Banking",
      },
    ],
    bankingRequirement: "Solo bank account seeded with Aadhaar on NPCI. Joint accounts with father/mother lead to immediate PFMS rejection.",
    stages: [
      {
        stageNumber: 1,
        stageName: "Central Counseling Admission & Notary Affidavit",
        actor: "Student & Parents",
        timeline: "Post-Admission (Month 1)",
        description: "Secure admission through government counseling and execute the mandatory sibling declaration on ₹50 non-judicial stamp paper.",
        actionItem: "Verify your college has active AICTE code for your specific engineering branch.",
        commonPitfall: "Management quota admissions are ineligible. Must have government counseling rank allotment letter.",
      },
      {
        stageNumber: 2,
        stageName: "NSP Pragati Portal Online Application",
        actor: "Student",
        timeline: "September - October",
        description: "Register on scholarships.gov.in under AICTE Scheme section. Enter AICTE institute code and upload certificates.",
        actionItem: "Select 'AICTE - Pragati Scholarship Scheme for Girl Students'.",
        commonPitfall: "Entering wrong AICTE permanent institute ID resulting in mismatch.",
      },
      {
        stageNumber: 3,
        stageName: "Institute Verification Officer Sign-off",
        actor: "College AICTE Nodal Officer",
        timeline: "Within 14 Days",
        description: "College checks student's regular attendance, AICTE approval code, and merit admission status.",
        actionItem: "Submit physical copies of counseling letter and sibling affidavit to college office.",
        commonPitfall: "Not checking with college clerk before deadline to ensure verification is clicked.",
      },
      {
        stageNumber: 4,
        stageName: "AICTE Central Screening & Sanction Order",
        actor: "AICTE HQ, New Delhi",
        timeline: "November - December",
        description: "AICTE scrutinizes all applications nationwide and releases official merit list of selected girl candidates.",
        actionItem: "Check AICTE website and NSP portal for name in provisional merit list.",
        commonPitfall: "Income certificate issued by unauthorized local leader instead of Tehsildar.",
      },
      {
        stageNumber: 5,
        stageName: "Direct Disbursal of ₹50,000 Grant via PFMS",
        actor: "PFMS Treasury",
        timeline: "January - February",
        description: "Entire ₹50,000 lump sum is credited directly into student's Aadhaar-seeded solo bank account.",
        actionItem: "Withdraw or transfer funds for tuition, laptop purchase, books, or living expenses.",
        commonPitfall: "Account marked dormant due to zero transactions in preceding 6 months.",
      },
    ],
    rejectionChecklist: [
      {
        check: "Are you admitted through Management or NRI quota?",
        resolution: "Only candidates admitted through centralized state/national merit counseling are eligible.",
      },
      {
        check: "Are more than 2 daughters from your family availing Pragati?",
        resolution: "Scheme is strictly capped at maximum two daughters per household.",
      },
    ],
  },

  // --- SCHOLARSHIP: UGC ISHAAN UDAY (NER) ---
  Ishaan_Uday_NER: {
    schemeId: "Ishaan_Uday_NER",
    schemeTitle: "UGC Ishaan Uday Special Scholarship Scheme for North Eastern Region (NER)",
    shortCode: "UGC-ISHAAN-UDAY",
    type: "scholarship",
    categoryLabel: "Special Regional Higher Education Scholarship",
    sponsoringBody: "University Grants Commission (UGC), Ministry of Education (10,000 fresh awards/year)",
    benefitHeadline: "Up to ₹7,800 / month (Technical/Medical) or ₹5,400 / month (General Degree)",
    statutoryTimeLimit: "Monthly DBT Disbursement for entire duration of degree",
    officialFee: "₹0.00",
    portalName: "National Scholarship Portal (NSP)",
    portalUrl: "https://scholarships.gov.in",
    offlineCounter: "UGC Desk / University Registrar Office",
    tier1BaseIdentity: [
      {
        name: "Aadhaar Card with NER Address",
        requirement: "Identifies permanent domicile within one of the 8 North Eastern States",
        mandatory: true,
      },
      {
        name: "Class 12th Board Marksheet & Passing Certificate",
        requirement: "Proof of passing Class 12 from a recognized school in the North East region",
        mandatory: true,
      },
    ],
    tier2StatutoryCertificates: [
      {
        certificateId: "Domicile_Certificate",
        name: "Permanent Resident Certificate (PRC) / Domicile of NER State",
        authority: "Deputy Commissioner (DC) / Sub-Divisional Officer (Civil)",
        turnaround: "21 Days",
        statutoryCost: "₹30",
        validity: "Permanent",
        keyCondition: "Must be issued by Assam, Arunachal, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, or Tripura",
      },
      {
        certificateId: "Income_Certificate",
        name: "Family Income Certificate",
        authority: "Tehsildar / SDO / Circle Officer",
        turnaround: "15 Days",
        statutoryCost: "₹25",
        validity: "Current FY 2026-27",
        keyCondition: "Annual family income must be under ₹4,50,000",
      },
    ],
    tier3Institutional: [
      {
        name: "UGC Recognized University / College Bonafide",
        authority: "College Registrar / Principal",
        action: "Confirms regular full-time enrollment in general degree, engineering, medical, or paramedical course",
        category: "Academic",
      },
      {
        name: "Aadhaar NPCI DBT Bank Account",
        authority: "Canara Bank / Public Sector Bank",
        action: "Canara Bank manages the UGC DBT scholarship portal on behalf of UGC",
        category: "Banking",
      },
    ],
    bankingRequirement: "Aadhaar seeded bank account. Canara Bank manages UGC DBT portal.",
    stages: [
      {
        stageNumber: 1,
        stageName: "Obtain North East PRC & Income Proof",
        actor: "Student & Circle Officer",
        timeline: "Week 1 - 3",
        description: "Obtain your state Permanent Resident Certificate from the DC/SDO office and current income certificate from Circle Officer.",
        actionItem: "Verify domicile matches your permanent home state address.",
        commonPitfall: "Submitting temporary resident proof instead of statutory Permanent Resident Certificate.",
      },
      {
        stageNumber: 2,
        stageName: "NSP Online Application (Ishaan Uday)",
        actor: "Student",
        timeline: "October - November",
        description: "Select UGC Ishaan Uday on NSP. Fill 12th board marks, college enrollment details, and upload PRC and Income docs.",
        actionItem: "Save application submission PDF and upload legible high-resolution scans.",
        commonPitfall: "Applying under general state scholarship instead of the dedicated UGC Ishaan Uday quota.",
      },
      {
        stageNumber: 3,
        stageName: "College Verification by University Nodal Officer",
        actor: "University Nodal Officer",
        timeline: "Within 15 Days",
        description: "College verifies that the student passed Class 12 from a school within NER and is enrolled full-time.",
        actionItem: "Submit photocopies of Class 12 marksheet and PRC to college scholarship desk.",
        commonPitfall: "Enrolled in distance/open university courses (IGNOU) which are ineligible for Ishaan Uday.",
      },
      {
        stageNumber: 4,
        stageName: "UGC Merit List Compilation (10,000 Slots)",
        actor: "UGC North Eastern Bureau",
        timeline: "December - January",
        description: "UGC prepares state-wise quota list based on Class 12 percentage and releases award letters.",
        actionItem: "Track provisional merit list notification on UGC and NSP portals.",
        commonPitfall: "Not renewing annually before cutoff date in 2nd and 3rd year.",
      },
      {
        stageNumber: 5,
        stageName: "Monthly Disbursal into Bank Account",
        actor: "Canara Bank / PFMS DBT Gateway",
        timeline: "Monthly Disbursal",
        description: "Stipend of ₹7,800/month (technical) or ₹5,400/month (general) is disbursed monthly via Direct Benefit Transfer.",
        actionItem: "Maintain regular attendance in college to ensure semester continuity mark.",
        commonPitfall: "Bank account reaching dormant status due to lack of debits/credits.",
      },
    ],
    rejectionChecklist: [
      {
        check: "Are you enrolled in an Open University (IGNOU / Distance mode)?",
        resolution: "Ishaan Uday strictly requires regular, full-time on-campus enrollment.",
      },
      {
        check: "Is your permanent residence outside the 8 North Eastern States?",
        resolution: "Scheme is exclusively reserved for candidates with permanent domicile in the 8 NE States.",
      },
    ],
  },

  // --- STATUTORY CERTIFICATE: INCOME & ASSET CERTIFICATE ---
  Income_Certificate: {
    schemeId: "Income_Certificate",
    schemeTitle: "Statutory Family Income & Asset Certificate (Tahsil / Revenue Administration)",
    shortCode: "REVENUE-INC-CERT",
    type: "certificate",
    categoryLabel: "Mandatory Civic Prerequisite for All Welfare & Scholarship Schemes",
    sponsoringBody: "State Revenue & Disaster Management Department (Right to Public Services Act)",
    benefitHeadline: "Unlocks 100% of Government Scholarships, Subsidized Housing & Fee Waivers",
    statutoryTimeLimit: "15 Working Days (State RTSA Legal Guarantee)",
    officialFee: "₹25 – ₹30 (Statutory Service Charge)",
    portalName: "State e-District / JharSewa / Odisha e-District / MeeSeva",
    portalUrl: "https://serviceonline.gov.in",
    offlineCounter: "Tahsil Office / Common Service Center (CSC) / RTPS Counter",
    tier1BaseIdentity: [
      {
        name: "Aadhaar Card of Family Head & Applicant",
        requirement: "Address must match revenue village or urban municipal ward",
        mandatory: true,
      },
      {
        name: "Ration Card (NFSA / State Food Security Card)",
        requirement: "Identifies total count of family members and earning status",
        mandatory: true,
      },
      {
        name: "Salary Slip / Form 16 (Salaried) OR Self-Declaration Affidavit (Agriculture/Daily Wage)",
        requirement: "Itemized source-of-income breakdown from agriculture, labor, business, or employment",
        mandatory: true,
      },
      {
        name: "Electricity Bill / Property Tax Receipt",
        requirement: "Establishes local residence and consumer tariff category",
        mandatory: false,
      },
    ],
    tier2StatutoryCertificates: [
      {
        certificateId: "Self_Affidavit",
        name: "Self-Declaration Income Affidavit",
        authority: "Notary Public / Executive Magistrate",
        turnaround: "Same Day",
        statutoryCost: "₹20 Stamp",
        validity: "One-Time for application",
        keyCondition: "Declares all family sources of income under oath",
      },
    ],
    tier3Institutional: [
      {
        name: "Revenue Inspector (RI) / Lekhpal Field Panchanama",
        authority: "Local Revenue Inspector (Halka / Circle)",
        action: "Officer conducts spot inquiry with neighbors and verifies agricultural land or daily wage",
        category: "Civic",
      },
      {
        name: "Tehsildar / Sub-Divisional Magistrate Digital Sign-off",
        authority: "Office of the Tahsildar",
        action: "Verifies RI recommendation and attaches digital cryptographic signature to certificate",
        category: "Civic",
      },
    ],
    bankingRequirement: "No bank account required. Fee paid at CSC counter or online portal payment gateway (₹25).",
    stages: [
      {
        stageNumber: 1,
        stageName: "Application Lodgment at CSC / e-District",
        actor: "Citizen / CSC Operator",
        timeline: "Day 1",
        description: "Submit online form on State e-District portal or at village CSC counter. Pay official fee of ₹25.",
        actionItem: "Collect computerized acknowledgment slip with unique Application Tracking Number.",
        commonPitfall: "Paying ₹200+ extortion fee to unauthorized cyber cafe operators. Demand official receipt.",
      },
      {
        stageNumber: 2,
        stageName: "File Routing to Revenue Inspector (RI)",
        actor: "Tahsil Record Clerk",
        timeline: "Day 2 - 4",
        description: "System automatically routes application to local Revenue Inspector (RI) / Patwari of the village/ward.",
        actionItem: "Keep phone active; RI may contact applicant for land/occupation verification.",
        commonPitfall: "Application stalled if applicant provides an incomplete or uncontactable telephone number.",
      },
      {
        stageNumber: 3,
        stageName: "Neighborhood Spot Inquiry & Panchanama",
        actor: "Revenue Inspector / Lekhpal",
        timeline: "Day 5 - 9",
        description: "RI inspects agricultural landholding or verifies informal daily wage with village head/neighbors and submits digital report.",
        actionItem: "Present ration card and land deed (if any) during inquiry.",
        commonPitfall: "Failure to produce land record (RoR) if family owns agricultural parcel.",
      },
      {
        stageNumber: 4,
        stageName: "Tehsildar Scrutiny & Sanction",
        actor: "Tahsildar / Additional Tahsildar",
        timeline: "Day 10 - 14",
        description: "Tehsildar reviews RI recommendation, approves statutory income figure, and applies digital signature token.",
        actionItem: "Track progress using the e-District Application Number via SMS or portal.",
        commonPitfall: "Ignoring deficiency query on portal; respond within 7 days if clarification is requested.",
      },
      {
        stageNumber: 5,
        stageName: "Issuance of Digitally Signed Certificate",
        actor: "e-District Portal / Citizen",
        timeline: "Day 15 (RTSA Mandate)",
        description: "QR-coded, digitally signed Income Certificate is issued. Download directly from home or collect from CSC.",
        actionItem: "Verify QR code using mobile phone scanner to ensure validity before applying for scholarships.",
        commonPitfall: "Downloading fake certificate from unverified agents without official government QR code.",
      },
    ],
    rejectionChecklist: [
      {
        check: "Are you being charged more than ₹30 by an offline counter?",
        resolution: "Quote your state Right to Public Services Act (RTSA) schedule. Central cap is ₹25–₹30.",
      },
      {
        check: "Did the Tahsil office delay your certificate past 15 working days?",
        resolution: "File an instant online First Appeal under the Right to Public Services Act against the Tehsildar.",
      },
    ],
  },

  // --- TAMIL NADU: PUDHUMAI PENN SCHEME ---
  TN_Pudhumai_Penn: {
    schemeId: "TN_Pudhumai_Penn",
    schemeTitle: "Moovalur Ramamirtham Ammaiyar Higher Education Assurance (Pudhumai Penn Scheme)",
    shortCode: "TN-PUDHUMAI-PENN",
    type: "scholarship",
    categoryLabel: "Tamil Nadu Flagship Higher Education Scheme for Women",
    sponsoringBody: "Social Welfare and Women Empowerment Department, Government of Tamil Nadu",
    benefitHeadline: "₹1,000 / Month Direct DBT into Bank Account (₹12,000 / Year)",
    statutoryTimeLimit: "Monthly DBT on the 7th of every month",
    officialFee: "₹0.00 (100% Free Scheme)",
    portalName: "Tamil Nadu Pudhumai Penn Portal",
    portalUrl: "https://pudhumaipenn.tn.gov.in",
    offlineCounter: "College Scholarship Clerk / District Social Welfare Officer (DSWO) Desk",
    tier1BaseIdentity: [
      {
        name: "Aadhaar Card of Female Student",
        requirement: "Active mobile linked for e-KYC and SMS transaction alerts",
        mandatory: true,
      },
      {
        name: "EMIS Student ID (Education Management Info System)",
        requirement: "14-digit state EMIS tracking code from school education records",
        mandatory: true,
      },
      {
        name: "Class 6th to 12th Continuous Government School Study Bonafide",
        requirement: "Must certify continuous schooling in Tamil Nadu Government Schools (Corporation, Municipality, Tribal, Adi Dravidar schools included)",
        mandatory: true,
      },
    ],
    tier2StatutoryCertificates: [
      {
        certificateId: "Govt_School_Bonafide",
        name: "Class 6-12 Govt School Study Bonafide Certificate",
        authority: "Headmaster of Government Higher Secondary School / DEO",
        turnaround: "1 - 3 Days",
        statutoryCost: "₹0.00",
        validity: "Permanent",
        keyCondition: "Mandatory statutory proof. No parental income limit applies for Pudhumai Penn!",
      },
    ],
    tier3Institutional: [
      {
        name: "College UMIS Portal Bonafide Endorsement",
        authority: "College Principal / UMIS Nodal Officer",
        action: "Principal verifies regular college attendance on state University Management Information System",
        category: "Academic",
      },
      {
        name: "Aadhaar Seeded Solo Bank Account in Student's Name",
        authority: "Nationalized / Scheduled Commercial Bank",
        action: "Direct Benefit Transfer credited via Indian Overseas Bank / Canara Bank treasury gateway",
        category: "Banking",
      },
    ],
    bankingRequirement: "Solo bank account in student's name seeded with Aadhaar on the NPCI mapper. ₹1,000 credited on the 7th of every month.",
    stages: [
      {
        stageNumber: 1,
        stageName: "School EMIS & Bonafide Generation",
        actor: "Student & School Headmaster",
        timeline: "Post-Admission (Month 1)",
        description: "Obtain the official 6th-12th Government School Study Certificate with EMIS validation from your high school headmaster.",
        actionItem: "Collect sealed certificate from school and upload to college scholarship coordinator.",
        commonPitfall: "Break in government schooling (e.g. studied Class 9 in a private school disqualifies candidate).",
      },
      {
        stageNumber: 2,
        stageName: "UMIS College Online Registration",
        actor: "College Nodal Officer & Student",
        timeline: "August - October",
        description: "College enters student's EMIS number into the Tamil Nadu UMIS (pudhumaipenn.tn.gov.in) portal.",
        actionItem: "Verify bank account number and Aadhaar linking on the portal confirmation screen.",
        commonPitfall: "Submitting parent's joint bank account instead of student's individual savings account.",
      },
      {
        stageNumber: 3,
        stageName: "College Principal Digital Sign-off",
        actor: "College Principal",
        timeline: "Within 7 Days",
        description: "Principal verifies college enrollment in recognized UG degree or diploma program and forwards batch file.",
        actionItem: "Check with college scholarship section that student profile is marked 'FORWARDED'.",
        commonPitfall: "Profile remaining in 'DRAFT' status on college dashboard before state portal closing date.",
      },
      {
        stageNumber: 4,
        stageName: "District Social Welfare Officer (DSWO) Sanction",
        actor: "DSWO (District Collectorate)",
        timeline: "Within 14 Days",
        description: "DSWO conducts automated EMIS database matching with School Education Department to verify continuous government schooling.",
        actionItem: "Track sanction notification via SMS.",
        commonPitfall: "Aadhaar demographic mismatch with school marksheets.",
      },
      {
        stageNumber: 5,
        stageName: "Monthly Direct Benefit Transfer (DBT)",
        actor: "Tamil Nadu State Treasury",
        timeline: "Every Month (7th)",
        description: "₹1,000 is directly credited into the student's bank account every month until completion of degree.",
        actionItem: "Check bank SMS notification on the 7th of every month.",
        commonPitfall: "Dormant bank account blocking treasury transfer.",
      },
    ],
    rejectionChecklist: [
      {
        check: "Did you study in a private-aided or matriculation school for even 1 year between Class 6 and 12?",
        resolution: "Pudhumai Penn legally requires all 7 years (Class 6 to 12) to be in Government Schools.",
      },
      {
        check: "Are you availing another state/central scholarship?",
        resolution: "Pudhumai Penn is an educational incentive and can be legally received alongside ANY other scholarship!",
      },
    ],
  },

  // --- TAMIL NADU: FIRST GRADUATE SCHEME ---
  TN_First_Graduate: {
    schemeId: "TN_First_Graduate",
    schemeTitle: "Tamil Nadu First Graduate Tuition Fee Concession (Mudhal Thalaimurai Pattadhari)",
    shortCode: "TN-FIRST-GRADUATE",
    type: "scholarship",
    categoryLabel: "Tamil Nadu Professional Education Fee Concession",
    sponsoringBody: "Directorate of Technical Education (DoTE) / Higher Education Dept, Govt of Tamil Nadu",
    benefitHeadline: "₹25,000 to ₹30,000 / Year Tuition Fee Concession (Deducted upfront on College Fee Bill)",
    statutoryTimeLimit: "Deducted at the time of College Admission Verification",
    officialFee: "₹60 (e-Sevai Certificate Application Fee)",
    portalName: "TNEA & TNeGA e-Sevai Portal",
    portalUrl: "https://www.tneaonline.org",
    offlineCounter: "e-Sevai Center / Tahsildar Office & Allotted Engineering College Desk",
    tier1BaseIdentity: [
      {
        name: "Candidate Class 10th & 12th Board Marksheets",
        requirement: "Proof of passing qualifying examination for professional degree entry",
        mandatory: true,
      },
      {
        name: "Father & Mother School Transfer Certificates (TC)",
        requirement: "Must show parents have not completed any college degree or diploma",
        mandatory: true,
      },
      {
        name: "Elder Siblings School Transfer Certificates (if applicable)",
        requirement: "Proves that elder brothers or sisters have not pursued undergraduate degrees",
        mandatory: true,
      },
      {
        name: "Tamil Nadu Smart Family Card / Ration Card",
        requirement: "Establishes entire household composition",
        mandatory: true,
      },
    ],
    tier2StatutoryCertificates: [
      {
        certificateId: "TN_First_Graduate_Cert",
        name: "First Graduate Certificate (Mudhal Pattadhari)",
        authority: "Tahsildar / Sub-Divisional Magistrate (via e-Sevai REV-104)",
        turnaround: "15 Days",
        statutoryCost: "₹60",
        validity: "Permanent / Lifetime",
        keyCondition: "Issued through e-Sevai portal. No member in immediate family holds an undergraduate degree!",
      },
      {
        certificateId: "Joint_Declaration",
        name: "First Graduate Joint Declaration Form",
        authority: "Signed jointly by Applicant and Parents on ₹20 Stamp Paper",
        turnaround: "Same Day",
        statutoryCost: "₹20 Stamp",
        validity: "Academic Degree Tenure",
        keyCondition: "Affirms that neither parents nor siblings hold or are availing first graduate concessions",
      },
    ],
    tier3Institutional: [
      {
        name: "TNEA Single Window Merit Counseling Allotment Order",
        authority: "Tamil Nadu Engineering Admissions (Anna University / DoTE)",
        action: "Must be admitted through government single window counseling quota (not management quota)",
        category: "Academic",
      },
      {
        name: "College Admission Fee Concession Adjustment Voucher",
        authority: "Allotted Engineering / Medical College Accounts Desk",
        action: "College immediately subtracts ₹25,000–₹30,000 from the student's tuition fee demand note",
        category: "Academic",
      },
    ],
    bankingRequirement: "No student bank account needed for tuition concession. College accounts section adjusts ₹25,000 upfront.",
    stages: [
      {
        stageNumber: 1,
        stageName: "e-Sevai First Graduate Certificate Application",
        actor: "Applicant & e-Sevai Center",
        timeline: "Prior to TNEA Counseling",
        description: "Submit parent TCs, sibling TCs, and joint declaration at your nearest e-Sevai center (Code REV-104). Pay ₹60 official fee.",
        actionItem: "Download digitally signed First Graduate Certificate from e-Sevai portal within 15 days.",
        commonPitfall: "Missing Transfer Certificate of elder sibling resulting in rejection by Tahsildar.",
      },
      {
        stageNumber: 2,
        stageName: "TNEA Single Window Counseling Selection",
        actor: "Candidate",
        timeline: "July - August",
        description: "During TNEA online registration, mark 'YES' for First Graduate Tuition Concession and upload the e-Sevai certificate.",
        actionItem: "Ensure TNEA provisional seat allotment order explicitly displays 'FIRST GRADUATE: YES'.",
        commonPitfall: "Forgetting to tick the First Graduate checkbox during counseling form submission.",
      },
      {
        stageNumber: 3,
        stageName: "Physical Document Audit at College",
        actor: "College Admission Officer",
        timeline: "Day of College Admission",
        description: "Present the original e-Sevai First Graduate Certificate and signed joint declaration to college accounts.",
        actionItem: "Verify college deducts ₹25,000 from the tuition fee receipt before making payment.",
        commonPitfall: "Allowing college clerks to charge full tuition with promise of refund later. Under DoTE rules, fee MUST be deducted upfront.",
      },
      {
        stageNumber: 4,
        stageName: "DoTE State Reimbursement Claim",
        actor: "College & Directorate of Technical Education",
        timeline: "Semester 1",
        description: "College submits the first graduate batch claim to DoTE for reimbursement of the waived tuition fee.",
        actionItem: "Ensure your name appears in the college First Graduate verified list.",
        commonPitfall: "Transferring to management quota in 2nd year cancels future fee concessions.",
      },
      {
        stageNumber: 5,
        stageName: "4-Year Continuous Tuition Exemption",
        actor: "State Higher Education Dept",
        timeline: "Every Academic Year",
        description: "Student pays ₹25,000 less tuition fee every single year for all 4 years of their degree program.",
        actionItem: "Maintain regular academic enrollment; no annual re-application to Tahsildar needed.",
        commonPitfall: "Discontinuing course or getting rusticated.",
      },
    ],
    rejectionChecklist: [
      {
        check: "Does your father, mother, elder brother, or elder sister hold an undergraduate degree?",
        resolution: "The scheme strictly requires that NO person in the family has completed a college degree.",
      },
      {
        check: "Are you admitted through Management or NRI quota?",
        resolution: "First Graduate fee concession is strictly restricted to government single-window counseling seats.",
      },
    ],
  },

  // --- TAMIL NADU: 7.5% GOVT SCHOOL QUOTA ---
  TN_7_5_Govt_School_Quota: {
    schemeId: "TN_7_5_Govt_School_Quota",
    schemeTitle: "7.5% Preferential Quota 100% Full Fee Exemption for Government School Students",
    shortCode: "TN-7.5-GOVT-QUOTA",
    type: "scholarship",
    categoryLabel: "Tamil Nadu Statutory 7.5% Preferential Reservation Act",
    sponsoringBody: "Government of Tamil Nadu Statutory Enactment",
    benefitHeadline: "100% Full Tuition, Hostel, and Mess Fee Exemption (Zero Out-of-Pocket Expense)",
    statutoryTimeLimit: "Immediate 100% Fee Exemption upon seat allotment",
    officialFee: "₹0.00 (Statutorily Free)",
    portalName: "TNEA / TN Medical Selection Committee",
    portalUrl: "https://www.tneaonline.org",
    offlineCounter: "Allotted College Admission Desk",
    tier1BaseIdentity: [
      {
        name: "Allotment Order under 7.5% Preferential Quota",
        requirement: "Issued by TNEA (Engineering) or DME (Medical) under 7.5% quota",
        mandatory: true,
      },
      {
        name: "Class 6th to 12th Continuous Government School Study Certificate",
        requirement: "Sealed and verified by Government School Headmaster and District Educational Officer (DEO)",
        mandatory: true,
      },
    ],
    tier2StatutoryCertificates: [
      {
        certificateId: "Govt_School_Bonafide",
        name: "Govt School Study Bonafide with EMIS",
        authority: "DEO / Chief Educational Officer (CEO)",
        turnaround: "1 - 3 Days",
        statutoryCost: "₹0.00",
        validity: "Permanent",
        keyCondition: "Mandatory statutory verification of 7-year government schooling",
      },
    ],
    tier3Institutional: [
      {
        name: "College 100% Zero-Fee Admission Receipt",
        authority: "Allotted College Principal / Accounts Office",
        action: "Issues official receipt showing ₹0 payable for tuition, hostel, and mess charges",
        category: "Academic",
      },
    ],
    bankingRequirement: "100% cashless fee exemption. State Government reimburses entire cost directly to college.",
    stages: [
      {
        stageNumber: 1,
        stageName: "7.5% Quota Merit Counseling Seat Allotment",
        actor: "Selection Committee (TNEA / DME)",
        timeline: "Counseling Day",
        description: "Candidate secures admission under the 7.5% preferential reservation quota for government school students.",
        actionItem: "Download provisional allotment letter clearly stating 'Allotted under 7.5% Govt School Quota'.",
        commonPitfall: "Failing to produce the DEO-signed 6th-12th study certificate during counseling verification.",
      },
      {
        stageNumber: 2,
        stageName: "College Zero-Fee Admission Enrollment",
        actor: "College Principal",
        timeline: "Within Allotment Reporting Date",
        description: "Report to allotted government or self-financing college. College enrolls student without charging ANY fee.",
        actionItem: "Collect ₹0 fee receipt and free hostel room allotment slip.",
        commonPitfall: "College demanding 'caution deposit' or 'building fund'. Demanding any fee is punishable by law.",
      },
      {
        stageNumber: 3,
        stageName: "State Treasury Reimbursement to College",
        actor: "TN State Higher Education Department",
        timeline: "Annual Settlement",
        description: "Tamil Nadu Government releases tuition, hostel, and examination fee reimbursement directly to the college.",
        actionItem: "Focus 100% on academic studies.",
        commonPitfall: "None.",
      },
    ],
    rejectionChecklist: [
      {
        check: "Did you join the college through management quota?",
        resolution: "The 7.5% fee exemption is strictly for students admitted through the government 7.5% counseling quota.",
      },
    ],
  },

  // --- TAMIL NADU: CMCHIS HEALTH INSURANCE ---
  TN_CMCHIS_Medical: {
    schemeId: "TN_CMCHIS_Medical",
    schemeTitle: "Chief Minister's Comprehensive Health Insurance Scheme (CMCHIS - Tamil Nadu)",
    shortCode: "TN-CMCHIS-HEALTH",
    type: "healthcare",
    categoryLabel: "Tamil Nadu State Universal Health Assurance & Inpatient Care",
    sponsoringBody: "Health and Family Welfare Department, Government of Tamil Nadu & United India Insurance",
    benefitHeadline: "₹5,00,000 / Family / Year Cashless Treatment across 1,600+ hospitals",
    statutoryTimeLimit: "Instant Smart Card at District Collectorate; Pre-Auth within 2 Hours",
    officialFee: "₹0.00 (Statutorily Free)",
    portalName: "CMCHIS Portal",
    portalUrl: "https://www.cmchistn.com",
    offlineCounter: "CMCHIS Kiosk at District Collectorate / Govt District Headquarter Hospital",
    tier1BaseIdentity: [
      {
        name: "Tamil Nadu Smart Family Card (Ration Card)",
        requirement: "Must show family composition and local address in Tamil Nadu",
        mandatory: true,
      },
      {
        name: "Aadhaar Card of Patient & Family Members",
        requirement: "For biometric fingerprint / OTP authentication on CMCHIS portal",
        mandatory: true,
      },
    ],
    tier2StatutoryCertificates: [
      {
        certificateId: "Income_Certificate",
        name: "Income Certificate (< ₹1,20,000)",
        authority: "Tahsildar (via e-Sevai / Revenue Desk)",
        turnaround: "15 Days",
        statutoryCost: "₹60 (e-Sevai)",
        validity: "Current FY 2026-27",
        keyCondition: "Annual family income must be under ₹1,20,000 (waived for specific vulnerable groups)",
      },
    ],
    tier3Institutional: [
      {
        name: "Government Hospital Specialist Referral / Emergency Slip",
        authority: "Civil Surgeon / Government Medical Officer",
        action: "Clinical diagnosis and requisition for specialized treatment/surgery",
        category: "Healthcare",
      },
      {
        name: "Empaneled Hospital CMCHIS Pre-Authorization Approval",
        authority: "Third Party Administrator (TPA) / United India Insurance",
        action: "Digital cashless pre-auth sanctioned on CMCHIS portal before surgery",
        category: "Healthcare",
      },
    ],
    bankingRequirement: "100% cashless hospital settlement. No cash out of pocket for inpatient treatment.",
    stages: [
      {
        stageNumber: 1,
        stageName: "CMCHIS Biometric Smart Card Enrollment",
        actor: "Beneficiary & Kiosk Operator",
        timeline: "Instant (at Collectorate Kiosk)",
        description: "Carry Smart Ration card and Aadhaar to District Collectorate CMCHIS kiosk. Enroll biometrics and get laminated smart card.",
        actionItem: "Collect your URN (Unique Registration Number) smart card.",
        commonPitfall: "Name mismatch between Smart Ration card and Aadhaar.",
      },
      {
        stageNumber: 2,
        stageName: "Clinical Requisition & Hospital Pre-Auth",
        actor: "Specialist Doctor & Hospital CMCHIS Cell",
        timeline: "Within 2 Hours",
        description: "Hospital CMCHIS desk scans your card, matches diagnosis with 1,513 approved packages, and obtains insurance pre-auth.",
        actionItem: "Confirm cashless pre-authorization is approved before elective surgery.",
        commonPitfall: "Hospital asking for cash deposit for consumables. Strictly prohibited under CMCHIS guidelines.",
      },
      {
        stageNumber: 3,
        stageName: "100% Cashless Medical Treatment & Surgery",
        actor: "Empaneled Hospital",
        timeline: "Duration of Inpatient Care",
        description: "Patient undergoes surgery, ICU care, diagnostics, and nursing without paying a single rupee.",
        actionItem: "Sign biometric discharge voucher only upon complete treatment.",
        commonPitfall: "Paying out of pocket for post-op medicines. 15-day discharge medicines are free.",
      },
    ],
    rejectionChecklist: [
      {
        check: "Is the hospital empaneled under CMCHIS for your specific specialty?",
        resolution: "Check empaneled list on cmchistn.com or call toll-free helpline 1800-425-3993.",
      },
    ],
  },
};

// 2. HELPER: Get Dedicated Roadmap for Any Scheme
export function getSchemeRoadmap(schemeOrId: string | SchemeOrService): SchemeRoadmap {
  const schemeId = typeof schemeOrId === "string" ? schemeOrId : schemeOrId.id;

  if (SCHEME_ROADMAPS[schemeId]) {
    return SCHEME_ROADMAPS[schemeId];
  }

  // Fallback builder for any other scheme in SCHEMES_DATABASE
  const scheme = SCHEMES_DATABASE.find((s) => s.id === schemeId);
  const title = scheme ? scheme.title : schemeId;
  const type = scheme ? scheme.type : "scholarship";
  const portalName = scheme ? scheme.portalName : "National Scholarship Portal";
  const portalUrl = scheme ? scheme.officialPortalUrl : "https://scholarships.gov.in";

  return {
    schemeId,
    schemeTitle: title,
    shortCode: scheme?.shortCode || schemeId,
    type,
    categoryLabel: type === "healthcare" ? "Health Assurance Scheme" : type === "certificate" ? "Statutory Revenue Service" : "Central Welfare Scholarship",
    sponsoringBody: scheme?.sponsoringBody || scheme?.ministry || "Government of India",
    benefitHeadline: scheme?.benefitAmount || "Financial Assistance / Fee Exemption",
    statutoryTimeLimit: scheme?.offlineSubmission.statutoryDaysLimit ? `${scheme.offlineSubmission.statutoryDaysLimit} Days SLA` : "30 Days standard processing",
    officialFee: scheme?.offlineSubmission.officialStatutoryFee || "₹0.00",
    portalName,
    portalUrl,
    offlineCounter: scheme?.offlineSubmission.centerName || "Common Service Center (CSC)",
    tier1BaseIdentity: [
      {
        name: "Aadhaar Card of Applicant",
        requirement: "Active mobile linked for OTP e-KYC authentication",
        mandatory: true,
      },
      {
        name: "Class 10th / 12th Certificate or Birth Certificate",
        requirement: "Official verification of date of birth and legal name spelling",
        mandatory: true,
      },
      {
        name: "Active Mobile & Email",
        requirement: "For OTP verification and portal tracking notifications",
        mandatory: true,
      },
    ],
    tier2StatutoryCertificates: (scheme?.prerequisites || []).map((prereqId) => {
      const prereq = SCHEMES_DATABASE.find((s) => s.id === prereqId);
      return {
        certificateId: prereqId,
        name: prereq?.title || prereqId.replace("_", " "),
        authority: "Tehsildar / Sub-Divisional Officer",
        turnaround: prereq?.offlineSubmission.statutoryDaysLimit ? `${prereq.offlineSubmission.statutoryDaysLimit} Days` : "15 Days",
        statutoryCost: prereq?.offlineSubmission.officialStatutoryFee || "₹25",
        validity: prereqId.includes("Income") ? "Current FY (1 Year)" : "Permanent / Lifetime",
        keyCondition: `Mandatory prerequisite to unlock ${scheme?.shortCode || "this scheme"}`,
      };
    }),
    tier3Institutional: [
      {
        name: type === "healthcare" ? "Hospital Doctor Referral & Estimate" : "College Bonafide Student Certificate",
        authority: type === "healthcare" ? "Government Medical Superintendent" : "College Principal / Registrar",
        action: "Official verification on institutional letterhead",
        category: type === "healthcare" ? "Healthcare" : "Academic",
      },
      {
        name: "Aadhaar NPCI DBT Bank Account",
        authority: "Nationalized Bank Branch",
        action: "Account must be seeded on NPCI DBT Mapper for electronic fund transfer",
        category: "Banking",
      },
    ],
    bankingRequirement: "Aadhaar seeded bank account on NPCI mapper for Direct Benefit Transfer.",
    stages: [
      {
        stageNumber: 1,
        stageName: "Pre-Flight Document Gathering & Audit",
        actor: "Applicant (Self)",
        timeline: "Week 1",
        description: "Assemble foundational identity documents and verify prerequisite certificate validity.",
        actionItem: "Run JanSetu Pre-Flight Audit to detect clerical mismatches before portal entry.",
        commonPitfall: "Proceeding with expired certificates or unseeded bank accounts.",
      },
      {
        stageNumber: 2,
        stageName: "Official Portal Registration & Submission",
        actor: "Applicant",
        timeline: "Before Portal Deadline",
        description: `Submit online application on ${portalName} with Aadhaar OTP authentication.`,
        actionItem: "Download and print application submission acknowledgment.",
        commonPitfall: "Uploading blurry or unreadable scanned copies.",
      },
      {
        stageNumber: 3,
        stageName: "First-Tier Institutional Verification",
        actor: type === "healthcare" ? "Hospital Nodal Officer" : "Institute Nodal Officer (INO)",
        timeline: "Within 10 Days",
        description: "Local institutional officer cross-verifies credentials against original records.",
        actionItem: "Submit physical copies to verification clerk immediately after online entry.",
        commonPitfall: "Delaying physical document submission past the institute closing date.",
      },
      {
        stageNumber: 4,
        stageName: "District & State Authority Sanction",
        actor: "District Welfare / State Nodal Officer",
        timeline: "15 - 20 Days",
        description: "Competent authority verifies quotas and approves disbursement sanction order.",
        actionItem: "Monitor online status weekly; address any defective notice promptly.",
        commonPitfall: "Failing to rectify defective notices within the 72-hour window.",
      },
      {
        stageNumber: 5,
        stageName: "Electronic Disbursal via PFMS / TMS",
        actor: "Central Treasury / Bank Gateway",
        timeline: "Direct Disbursal",
        description: "Funds or cashless service are delivered directly via Aadhaar Payment Bridge.",
        actionItem: "Verify credit via bank SMS or download official voucher.",
        commonPitfall: "Dormant bank account preventing electronic credit.",
      },
    ],
    rejectionChecklist: [
      {
        check: "Are all required certificates issued in the current financial year?",
        resolution: "Renew Income Certificate if issued before April 1, 2026.",
      },
      {
        check: "Is your bank account seeded on the NPCI mapper?",
        resolution: "Submit JanSetu Annexure I mandate form to your bank branch.",
      },
    ],
  };
}

// 3. MULTI-SCHEME MERGER ENGINE
export interface MergedRoadmapResult {
  selectedSchemes: SchemeRoadmap[];
  totalCombinedBenefit: string;
  totalStatutoryFees: string;
  sharedBaseDocuments: {
    docName: string;
    requirement: string;
    sharedCount: number;
    usedInSchemes: string[];
  }[];
  sharedStatutoryCertificates: {
    certificateId: string;
    name: string;
    authority: string;
    turnaround: string;
    statutoryCost: string;
    sharedCount: number;
    usedInSchemes: string[];
    isOverlapping: boolean;
  }[];
  institutionalRequirementsGrouped: {
    category: "Academic" | "Healthcare" | "Banking" | "Civic";
    items: {
      name: string;
      authority: string;
      action: string;
      usedInScheme: string;
    }[];
  }[];
  consolidatedVisitPlan: {
    location: string;
    purpose: string;
    documentsToCarry: string[];
    servicesAddressed: string[];
    statutoryFee: string;
    timeEfficiencyNote: string;
  }[];
}

export function getMergedRoadmap(schemeIds: string[]): MergedRoadmapResult {
  const validIds = schemeIds.filter((id) => SCHEME_ROADMAPS[id] || SCHEMES_DATABASE.some((s) => s.id === id));
  const roadmaps = validIds.map((id) => getSchemeRoadmap(id));

  // 1. Combine & Deduplicate Base Documents
  const baseDocsMap = new Map<string, { requirement: string; schemes: string[] }>();
  for (const r of roadmaps) {
    for (const doc of r.tier1BaseIdentity) {
      const existing = baseDocsMap.get(doc.name);
      if (existing) {
        existing.schemes.push(r.shortCode);
      } else {
        baseDocsMap.set(doc.name, {
          requirement: doc.requirement,
          schemes: [r.shortCode],
        });
      }
    }
  }

  const sharedBaseDocuments = Array.from(baseDocsMap.entries()).map(([docName, data]) => ({
    docName,
    requirement: data.requirement,
    sharedCount: data.schemes.length,
    usedInSchemes: data.schemes,
  }));

  // 2. Combine & Deduplicate Statutory Certificates
  const certsMap = new Map<string, { cert: RoadmapStatutoryCertificate; schemes: string[] }>();
  for (const r of roadmaps) {
    for (const c of r.tier2StatutoryCertificates) {
      const existing = certsMap.get(c.certificateId);
      if (existing) {
        existing.schemes.push(r.shortCode);
      } else {
        certsMap.set(c.certificateId, {
          cert: c,
          schemes: [r.shortCode],
        });
      }
    }
  }

  const sharedStatutoryCertificates = Array.from(certsMap.entries()).map(([, data]) => ({
    certificateId: data.cert.certificateId,
    name: data.cert.name,
    authority: data.cert.authority,
    turnaround: data.cert.turnaround,
    statutoryCost: data.cert.statutoryCost,
    sharedCount: data.schemes.length,
    usedInSchemes: data.schemes,
    isOverlapping: data.schemes.length > 1,
  }));

  // 3. Group Institutional Requirements
  const instMap = new Map<string, { name: string; authority: string; action: string; usedInScheme: string }[]>();
  for (const r of roadmaps) {
    for (const item of r.tier3Institutional) {
      const list = instMap.get(item.category) || [];
      list.push({
        name: item.name,
        authority: item.authority,
        action: item.action,
        usedInScheme: r.shortCode,
      });
      instMap.set(item.category, list);
    }
  }

  const institutionalRequirementsGrouped = Array.from(instMap.entries()).map(([category, items]) => ({
    category: category as "Academic" | "Healthcare" | "Banking" | "Civic",
    items,
  }));

  // 4. Build Consolidated Physical Visit Plan
  const consolidatedVisitPlan = [
    {
      location: "Tahsil / Revenue Office (or Village CSC Center)",
      purpose: "Apply for foundational statutory certificates in a single administrative transaction",
      documentsToCarry: [
        "Aadhaar Card (Original + 2 photocopies)",
        "Ration Card / BPL Card",
        "Father's / Ancestor's Land Record (RoR) / 1950 Proof",
        "Self-declaration Income & Asset Affidavit",
      ],
      servicesAddressed: sharedStatutoryCertificates.map((c) => c.name),
      statutoryFee: "₹25 – ₹60 total (Official RTSA Service Charge)",
      timeEfficiencyNote: "Applying for Income & Caste certificates in one visit saves 15 days of redundant travel.",
    },
    {
      location: "Nationalized Bank Branch (Customer Service Desk)",
      purpose: "Aadhaar NPCI DBT Mapper Seeding (Annexure I)",
      documentsToCarry: [
        "Pre-filled JanSetu NPCI Seeding Mandate Form (Annexure I)",
        "Bank Passbook (Account in student's sole name)",
        "Aadhaar Card (Physical copy)",
      ],
      servicesAddressed: ["Aadhaar Payment Bridge System (APBS) activation for all central DBT grants"],
      statutoryFee: "₹0.00 (Free banking service mandated by RBI)",
      timeEfficiencyNote: "Mandatory for all scholarship schemes and cash transfers. Do this before portal submission.",
    },
  ];

  // Add College or Hospital visit if applicable
  const hasAcademic = roadmaps.some((r) => r.type === "scholarship");
  const hasHealthcare = roadmaps.some((r) => r.type === "healthcare");

  if (hasAcademic) {
    consolidatedVisitPlan.push({
      location: "College / Institute Scholarship & Academic Office",
      purpose: "Obtain Bonafide Certificate, Fee Receipt, and INO verification",
      documentsToCarry: [
        "Printed Online Scholarship Application Form",
        "Attested Photocopies of 10th/12th Marksheet & Caste/Income Certificates",
        "Counseling Allotment Letter",
      ],
      servicesAddressed: roadmaps.filter((r) => r.type === "scholarship").map((r) => r.shortCode),
      statutoryFee: "₹0.00",
      timeEfficiencyNote: "Submit physical file directly to the College INO clerk within 7 days of portal submission.",
    });
  }

  if (hasHealthcare) {
    consolidatedVisitPlan.push({
      location: "District Hospital / Empaneled Medical College (Ayushman Kiosk)",
      purpose: "Ayushman Bharat PVC Card generation & Inpatient Pre-Authorization",
      documentsToCarry: [
        "Patient & Family Head Aadhaar Cards",
        "Ration Card / NFSA ID",
        "Doctor's Clinical Referral or Treatment Estimate Slip",
      ],
      servicesAddressed: ["Cashless Medical Treatment & Surgery Pre-Auth"],
      statutoryFee: "₹0.00 (Statutorily 100% Free)",
      timeEfficiencyNote: "Ayushman Mitra desk generates e-card instantly with biometric KYC. Never pay any fee.",
    });
  }

  // Combined benefits calculation
  const totalCombinedBenefit = roadmaps.map((r) => r.benefitHeadline).join(" + ");
  const totalStatutoryFees = "₹25 – ₹60 (Statutory government charges only; ₹0 for cyber cafes)";

  return {
    selectedSchemes: roadmaps,
    totalCombinedBenefit,
    totalStatutoryFees,
    sharedBaseDocuments,
    sharedStatutoryCertificates,
    institutionalRequirementsGrouped,
    consolidatedVisitPlan,
  };
}
