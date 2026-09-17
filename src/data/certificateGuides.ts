export interface CertificateResolutionGuide {
  id: string;
  title: string;
  officialCode: string;
  department: string;
  issuingAuthority: string;
  counterName: string;
  portalName: string;
  portalUrl: string;
  statutoryFee: string;
  maxAuthorizedFee: string;
  feeWarning: string;
  slaDays: number;
  validityPeriod: string;
  purpose: string;
  whyNeeded: string;
  precursorDocuments: {
    name: string;
    requirement: string;
    mandatory: boolean;
  }[];
  stepsToObtain: {
    stepNumber: number;
    action: string;
    description: string;
    timeline: string;
  }[];
  interactiveChecklist: {
    id: string;
    label: string;
    description: string;
  }[];
}

export const CERTIFICATE_GUIDES: Record<string, CertificateResolutionGuide> = {
  TN_First_Graduate_Cert: {
    id: "TN_First_Graduate_Cert",
    title: "First Graduate Certificate (முதல் தலைமுறை பட்டதாரி சான்றிதழ்)",
    officialCode: "TNeGA e-Sevai Code: REV-104",
    department: "Revenue and Disaster Management Department, Government of Tamil Nadu",
    issuingAuthority: "Zonal Deputy Tahsildar / Headquarters Tahsildar",
    counterName: "TNeGA e-Sevai Common Service Center (CSC) / Arasu e-Seva Maiyam",
    portalName: "Tamil Nadu e-District / TNeGA Citizen Portal",
    portalUrl: "https://www.tnesevai.tn.gov.in",
    statutoryFee: "₹60 (Statutory e-Sevai Application & Scanning Charge)",
    maxAuthorizedFee: "₹60",
    feeWarning: "Cyber cafes cannot charge more than ₹60. The certificate application is legally fixed under G.O. Ms No. 85.",
    slaDays: 15,
    validityPeriod: "Permanent (Valid for entire duration of collegiate education)",
    purpose: "Provides ₹25,000 to ₹30,000 annual tuition fee concession in professional courses (Engineering, Medical, Agri, Law) for students whose family has zero prior graduates.",
    whyNeeded: "Required under TNEA counseling to waive tuition fees at government and self-financing engineering/arts colleges.",
    precursorDocuments: [
      {
        name: "Applicant's 10th & 12th Transfer Certificate (TC)",
        requirement: "Must specify school of study and date of birth clearly",
        mandatory: true,
      },
      {
        name: "Father's School Leaving / Transfer Certificate",
        requirement: "Proof of father's educational qualification (or self-declaration if non-literate)",
        mandatory: true,
      },
      {
        name: "Mother's School Leaving / Transfer Certificate",
        requirement: "Proof of mother's educational qualification (or self-declaration if non-literate)",
        mandatory: true,
      },
      {
        name: "Siblings' Educational Proofs / TCs",
        requirement: "Required for all brothers and sisters to prove none have completed a graduate degree",
        mandatory: true,
      },
      {
        name: "Family Smart Ration Card / NFSA Card",
        requirement: "Must show applicant's name and all family members with matching addresses",
        mandatory: true,
      },
      {
        name: "Joint Notarized Self-Declaration Affidavit",
        requirement: "Signed by parents and student declaring on ₹20 stamp paper that no family member holds a degree",
        mandatory: true,
      },
    ],
    stepsToObtain: [
      {
        stepNumber: 1,
        action: "Gather Precursor School TCs & Ration Card",
        description: "Collect school TCs of applicant, parents, and siblings proving no family member completed a degree.",
        timeline: "1-2 Days",
      },
      {
        stepNumber: 2,
        action: "Prepare Notarized Joint Self-Declaration",
        description: "Draft the statutory Tamil Nadu First Graduate No-Degree declaration format and notarize it.",
        timeline: "Same Day",
      },
      {
        stepNumber: 3,
        action: "Submit at TNeGA e-Sevai Center (CAN Registration)",
        description: "Visit nearest e-Sevai center or apply online at tnesevai.tn.gov.in using your Citizen Access Number (CAN). Pay statutory fee of ₹60.",
        timeline: "Day 1",
      },
      {
        stepNumber: 4,
        action: "Village Administrative Officer (VAO) Verification",
        description: "VAO conducts local field inquiry at residence and verifies ration card family tree.",
        timeline: "Days 2 to 5",
      },
      {
        stepNumber: 5,
        action: "Revenue Inspector (RI) Endorsement",
        description: "RI reviews VAO report and submits forward recommendation to the Taluk Tahsildar.",
        timeline: "Days 6 to 9",
      },
      {
        stepNumber: 6,
        action: "Tahsildar Digital Signature & Download",
        description: "Headquarters Tahsildar digitally signs the certificate with QR-code. Download PDF from e-Sevai portal.",
        timeline: "Days 10 to 15 (SLA 15 Days)",
      },
    ],
    interactiveChecklist: [
      { id: "fg_step1", label: "Collected Parents' & Siblings' School TCs", description: "Verified that no elder sibling is a degree holder" },
      { id: "fg_step2", label: "Drafted & Notarized Joint Affidavit", description: "Notarized on ₹20 stamp paper with parent signatures" },
      { id: "fg_step3", label: "CAN Registered on TNeGA Portal", description: "Obtained 13-digit Citizen Access Number at e-Sevai" },
      { id: "fg_step4", label: "Application Submitted at e-Sevai (Code REV-104)", description: "Paid ₹60 statutory fee and received application acknowledgment number" },
      { id: "fg_step5", label: "VAO Local Inquiry Verified", description: "VAO completed household verification" },
      { id: "fg_step6", label: "Digitally Signed Certificate Downloaded", description: "Downloaded official QR-coded PDF from tnesevai.tn.gov.in" },
    ],
  },

  Income_Certificate: {
    id: "Income_Certificate",
    title: "Income Certificate (வருமானச் சான்றிதழ் / आय प्रमाण पत्र)",
    officialCode: "TNeGA Code: REV-103 / NSP Prerequisite Form 16",
    department: "Revenue Department, State Government",
    issuingAuthority: "Tahsildar / Zonal Deputy Tahsildar",
    counterName: "Taluk e-Sevai / CSC Center / Tehsil Revenue Office",
    portalName: "State e-District / e-Sevai Portal",
    portalUrl: "https://www.tnesevai.tn.gov.in",
    statutoryFee: "₹60 (State e-Sevai) / ₹25 (CSC Digital Seva)",
    maxAuthorizedFee: "₹60",
    feeWarning: "Official government fee is strictly capped at ₹60. Avoid touts charging ₹200–₹500.",
    slaDays: 15,
    validityPeriod: "1 Financial Year (Valid from April 1 to March 31 of respective academic year)",
    purpose: "Proves family annual earnings are below the statutory eligibility ceiling (e.g., ₹2,50,000 for Post-Matric and CSSS scholarships).",
    whyNeeded: "Mandatory prerequisite for every central and state need-based scholarship to establish economic need.",
    precursorDocuments: [
      {
        name: "Salary Slip / Employer Certificate (for Salaried)",
        requirement: "Form 16 or monthly pay slip certified by employer",
        mandatory: false,
      },
      {
        name: "Village Administrative Officer (VAO) / Patwari Income Report",
        requirement: "For self-employed, agricultural, and daily-wage earners",
        mandatory: true,
      },
      {
        name: "Family Smart Ration Card / Food Security Card",
        requirement: "Must reflect all earning members in the household",
        mandatory: true,
      },
      {
        name: "Aadhaar Card of Applicant & Family Head",
        requirement: "Address must match present residence",
        mandatory: true,
      },
      {
        name: "Self-Declaration of Annual Income",
        requirement: "Signed affidavit stating gross total family income from all sources",
        mandatory: true,
      },
    ],
    stepsToObtain: [
      {
        stepNumber: 1,
        action: "Obtain VAO / Village Accountant Assessment",
        description: "Submit self-declaration to local VAO to inspect family livelihood and draft the field income note.",
        timeline: "1-2 Days",
      },
      {
        stepNumber: 2,
        action: "File Online Application at e-Sevai / e-District",
        description: "Upload Aadhaar, Ration card, and VAO report with applicant photo. Pay ₹60 fee.",
        timeline: "Day 1",
      },
      {
        stepNumber: 3,
        action: "Revenue Inspector (RI) Verification",
        description: "RI validates the VAO report against land and property records.",
        timeline: "Days 3 to 7",
      },
      {
        stepNumber: 4,
        action: "Tahsildar Digital Approval",
        description: "Tahsildar approves and generates QR-coded income certificate for download.",
        timeline: "Days 8 to 15 (SLA 15 Days)",
      },
    ],
    interactiveChecklist: [
      { id: "inc_step1", label: "VAO Income Inspection Completed", description: "Obtained local livelihood note from village officer" },
      { id: "inc_step2", label: "Uploaded Documents on e-District / e-Sevai", description: "Uploaded Ration Card, Aadhaar, and Self-Declaration" },
      { id: "inc_step3", label: "Paid Statutory Fee of ₹60", description: "Obtained official government payment receipt" },
      { id: "inc_step4", label: "Downloaded Digitally Signed Certificate", description: "Certificate with QR code downloaded for NSP / UMIS portal upload" },
    ],
  },

  Caste_Certificate: {
    id: "Caste_Certificate",
    title: "Community / Caste Certificate (சாதிச் சான்றிதழ் / जाति प्रमाण पत्र)",
    officialCode: "TNeGA Code: REV-101 / National Portal Category Cert",
    department: "Backward Classes, Most Backward Classes & Minorities Welfare / Adi Dravidar Welfare",
    issuingAuthority: "Tahsildar / Sub-Divisional Magistrate (SDO)",
    counterName: "e-Sevai / Common Service Center (CSC) / Taluk Office",
    portalName: "State e-District / Revenue Portal",
    portalUrl: "https://www.tnesevai.tn.gov.in",
    statutoryFee: "₹60 (e-Sevai) / ₹25 (Central CSC)",
    maxAuthorizedFee: "₹60",
    feeWarning: "Statutory fee is ₹60. No additional notary or processing fee is required.",
    slaDays: 15,
    validityPeriod: "Permanent (Lifetime validity for applicant)",
    purpose: "Validates community reservation under OC, BC, BCM, MBC, DNC, SC, SCA, or ST categories.",
    whyNeeded: "Required for community quota admissions, tuition fee waivers, and Post-Matric scholarships.",
    precursorDocuments: [
      {
        name: "Father's or Mother's Community Certificate",
        requirement: "Digital barcode or gazetted manual certificate of parents",
        mandatory: true,
      },
      {
        name: "Applicant's School Transfer Certificate (TC)",
        requirement: "Must record community and caste as per school register",
        mandatory: true,
      },
      {
        name: "Family Smart Ration Card",
        requirement: "Proof of residence and family lineage",
        mandatory: true,
      },
      {
        name: "Aadhaar Card",
        requirement: "Valid biometric or OTP identity proof",
        mandatory: true,
      },
    ],
    stepsToObtain: [
      {
        stepNumber: 1,
        action: "Gather Parent Community Proof & School TC",
        description: "Collate parents' community certificate and applicant's school record.",
        timeline: "1 Day",
      },
      {
        stepNumber: 2,
        action: "Apply via e-Sevai / Revenue Portal",
        description: "Submit application under Code REV-101 with photo and identity proofs. Pay ₹60.",
        timeline: "Day 1",
      },
      {
        stepNumber: 3,
        action: "VAO & RI In-Person Inquiry",
        description: "Officers verify community lineage and caste records in the village register.",
        timeline: "Days 3 to 8",
      },
      {
        stepNumber: 4,
        action: "Tahsildar Approval & Issuance",
        description: "Digital certificate issued with QR-code for instant verification.",
        timeline: "Days 9 to 15 (SLA 15 Days)",
      },
    ],
    interactiveChecklist: [
      { id: "caste_step1", label: "Retrieved Parent's Community Certificate", description: "Verified parent's caste registration matches applicant" },
      { id: "caste_step2", label: "Submitted Online at e-Sevai", description: "Received e-Sevai transaction acknowledgment slip" },
      { id: "caste_step3", label: "VAO Inquiry Verified", description: "Village administrative officer verified caste register" },
      { id: "caste_step4", label: "Downloaded Permanent Digital Certificate", description: "Retrieved barcode certificate valid for lifetime" },
    ],
  },

  Domicile_Certificate: {
    id: "Domicile_Certificate",
    title: "Nativity / Domicile Certificate (இருப்பிடச் சான்றிதழ் / निवास प्रमाण पत्र)",
    officialCode: "TNeGA Code: REV-102",
    department: "Revenue Department, Government of Tamil Nadu",
    issuingAuthority: "Tahsildar / Zonal Deputy Tahsildar",
    counterName: "e-Sevai Center / Taluk Revenue Office",
    portalName: "TNeGA Citizen Portal",
    portalUrl: "https://www.tnesevai.tn.gov.in",
    statutoryFee: "₹60",
    maxAuthorizedFee: "₹60",
    feeWarning: "Official fee is ₹60. Charging more is an offence under the Tamil Nadu Transparency in Public Procurement / Services Act.",
    slaDays: 15,
    validityPeriod: "Permanent / Valid for 5 years",
    purpose: "Proves continuous residence within the state to claim state quota reservations and state welfare schemes.",
    whyNeeded: "Required for TNEA single-window engineering counseling and state government welfare schemes.",
    precursorDocuments: [
      {
        name: "Proof of Continuous Residence (5+ Years)",
        requirement: "Property tax receipt, electricity bill, or voter ID card",
        mandatory: true,
      },
      {
        name: "School Study Certificates (Class 1 to 12)",
        requirement: "Proves continuous education within the state",
        mandatory: true,
      },
      {
        name: "Family Smart Ration Card",
        requirement: "Address verification proof",
        mandatory: true,
      },
    ],
    stepsToObtain: [
      {
        stepNumber: 1,
        action: "Compile 5-Year Residence Proof",
        description: "Collect electricity bills or school bonafides proving 5 years of state residence.",
        timeline: "1-2 Days",
      },
      {
        stepNumber: 2,
        action: "Submit Application at e-Sevai",
        description: "Submit CAN registration and pay ₹60 statutory charge.",
        timeline: "Day 1",
      },
      {
        stepNumber: 3,
        action: "Tahsildar Verification & Download",
        description: "Field report verified and digitally signed certificate generated.",
        timeline: "Days 5 to 15 (SLA 15 Days)",
      },
    ],
    interactiveChecklist: [
      { id: "nat_step1", label: "Collected 5-Year Residence Proof", description: "EB bills or school continuous study records gathered" },
      { id: "nat_step2", label: "Applied at e-Sevai / e-District", description: "Paid ₹60 and received tracking ID" },
      { id: "nat_step3", label: "Downloaded Digital Nativity Certificate", description: "Ready for state counseling & portal upload" },
    ],
  },

  Govt_School_Study_Certificate: {
    id: "Govt_School_Study_Certificate",
    title: "Continuous Government School Study Bonafide (Class 6 to 12) (அரசுப் பள்ளி பயின்ற சான்றிதழ்)",
    officialCode: "TN EMIS / Directorate of School Education Bonafide",
    department: "School Education Department, Government of Tamil Nadu",
    issuingAuthority: "Headmaster / Principal of Respective Government High/Higher Secondary Schools",
    counterName: "School Principal Office & Educational Management Information System (EMIS)",
    portalName: "Tamil Nadu EMIS Portal",
    portalUrl: "https://emis.tnschools.gov.in",
    statutoryFee: "₹0 (Completely Free under Department Guidelines)",
    maxAuthorizedFee: "₹0",
    feeWarning: "Government schools are legally prohibited from charging any fee for study bonafides or EMIS verification.",
    slaDays: 3,
    validityPeriod: "Permanent",
    purpose: "Certifies that the candidate studied continuously from Class 6 to Class 12 in Tamil Nadu Government Schools.",
    whyNeeded: "Mandatory qualification proof for Pudhumai Penn (₹1,000/mo), Tamil Pudhalvan (₹1,000/mo), and the 7.5% Preferential Quota.",
    precursorDocuments: [
      {
        name: "School Admission Register Number & EMIS ID",
        requirement: "16-digit student EMIS number assigned during schooling",
        mandatory: true,
      },
      {
        name: "Class 10 & 12 Passing Marksheets",
        requirement: "Original marksheets issued by Tamil Nadu State Board",
        mandatory: true,
      },
      {
        name: "School Transfer Certificate (TC)",
        requirement: "Showing continuous study in government school",
        mandatory: true,
      },
    ],
    stepsToObtain: [
      {
        stepNumber: 1,
        action: "Visit High School & Higher Secondary School",
        description: "Request Headmaster to issue the Class 6-12 continuous study certificate in prescribed Annexure format.",
        timeline: "Day 1",
      },
      {
        stepNumber: 2,
        action: "Headmaster EMIS Cross-Verification",
        description: "Headmaster verifies EMIS database records to confirm student was enrolled in government school continuously.",
        timeline: "Day 1 to 2",
      },
      {
        stepNumber: 3,
        action: "Attestation by Chief Educational Officer (CEO) / DEO",
        description: "Countersigned by District Educational Officer for engineering/medical 7.5% counseling admission.",
        timeline: "Day 3 (SLA 3 Days)",
      },
    ],
    interactiveChecklist: [
      { id: "gs_step1", label: "Obtained EMIS ID from School", description: "Retrieved 16-digit EMIS record from Class 12 school" },
      { id: "gs_step2", label: "Headmaster Signed Bonafide", description: "Received official signed & sealed Annexure certificate" },
      { id: "gs_step3", label: "DEO Countersigned (if required for 7.5% quota)", description: "Countersignature completed for professional counseling" },
    ],
  },

  EWS_Certificate: {
    id: "EWS_Certificate",
    title: "Economically Weaker Section (EWS) Certificate (ஆर्थिक रूप से कमजोर वर्ग प्रमाण पत्र)",
    officialCode: "DoPT OM No. 36039/1/2019-Estt (Res)",
    department: "Department of Personnel and Training (DoPT) / Revenue Department",
    issuingAuthority: "Tahsildar / Sub-Divisional Magistrate",
    counterName: "Tehsil Office / Revenue Sub-Division / CSC",
    portalName: "State e-District / National Portal",
    portalUrl: "https://services.india.gov.in",
    statutoryFee: "₹60 (e-District / CSC charges)",
    maxAuthorizedFee: "₹60",
    feeWarning: "Official government fee is ₹60. Charging more than authorized CSC rates is punishable.",
    slaDays: 21,
    validityPeriod: "1 Financial Year",
    purpose: "Claims 10% reservation in central/state admissions and government examinations for General category citizens with income < ₹8,00,000.",
    whyNeeded: "Required for central institute admissions and scholarships under General-EWS category.",
    precursorDocuments: [
      {
        name: "Family Income Tax Returns (ITR) / Salary Slips",
        requirement: "Gross family annual income must be under ₹8,00,000",
        mandatory: true,
      },
      {
        name: "Residential Flat / Agricultural Land Ownership Documents",
        requirement: "Land must be < 5 acres; residential flat must be < 1000 sq.ft",
        mandatory: true,
      },
      {
        name: "Aadhaar Card and Family Ration Card",
        requirement: "Identity and address proofs",
        mandatory: true,
      },
    ],
    stepsToObtain: [
      {
        stepNumber: 1,
        action: "Prepare Asset and Income Declaration",
        description: "Collate property tax receipts, ITR, and agricultural land records.",
        timeline: "2 Days",
      },
      {
        stepNumber: 2,
        action: "File Application with Revenue Patwari / VAO",
        description: "Patwari conducts property and land asset verification.",
        timeline: "Days 3 to 10",
      },
      {
        stepNumber: 3,
        action: "SDO / Tehsildar Approval",
        description: "Certificate issued certifying candidate meets income and asset limits.",
        timeline: "Days 11 to 21 (SLA 21 Days)",
      },
    ],
    interactiveChecklist: [
      { id: "ews_step1", label: "Asset & Income Documents Collated", description: "Verified family income < ₹8L and land < 5 acres" },
      { id: "ews_step2", label: "Filed Application at Tehsil / e-District", description: "Obtained application tracking number" },
      { id: "ews_step3", label: "Field Asset Verification Completed", description: "Patwari verified residential area and land" },
      { id: "ews_step4", label: "EWS Certificate Issued", description: "Valid for the current financial year" },
    ],
  },

  Disability_Certificate: {
    id: "Disability_Certificate",
    title: "UDID Unique Disability ID Card & Certificate (दिव्यांगता प्रमाण पत्र)",
    officialCode: "DEPwD Swavlamban Card / Rights of Persons with Disabilities Act 2016",
    department: "Department of Empowerment of Persons with Disabilities (DEPwD), Ministry of Social Justice",
    issuingAuthority: "District Medical Board / Chief Medical Officer (CMO)",
    counterName: "District Headquarters Hospital / Swavlamban Online Portal",
    portalName: "Unique Disability ID (UDID) Swavlamban Portal",
    portalUrl: "https://www.swavlambancard.gov.in",
    statutoryFee: "₹0 (100% Free under Central Government Order)",
    maxAuthorizedFee: "₹0",
    feeWarning: "The UDID card assessment and card issuance is completely free across all government medical colleges and civil hospitals.",
    slaDays: 30,
    validityPeriod: "Permanent (for permanent disability) or 5 Years (for temporary conditions)",
    purpose: "Proves 40%+ benchmark disability for specialized scholarships (e.g., AICTE Saksham, Differently Abled Welfare, and central reservations).",
    whyNeeded: "Mandatory prerequisite for any disability scholarship, tuition waiver, and conveyance allowance.",
    precursorDocuments: [
      {
        name: "Medical Records & Diagnostic Reports",
        requirement: "Clinical tests, audiometry, vision tests, or orthopedic assessment reports",
        mandatory: true,
      },
      {
        name: "Recent Color Passport Photographs",
        requirement: "Showing the disability clearly if visible",
        mandatory: true,
      },
      {
        name: "Aadhaar Card",
        requirement: "Identity and address proof",
        mandatory: true,
      },
    ],
    stepsToObtain: [
      {
        stepNumber: 1,
        action: "Register Online on Swavlamban Portal",
        description: "Submit personal details and upload medical history on swavlambancard.gov.in.",
        timeline: "Day 1",
      },
      {
        stepNumber: 2,
        action: "Appear before District Medical Board",
        description: "Visit designated District Civil Hospital for physical clinical assessment by specialists.",
        timeline: "Within 14 Days",
      },
      {
        stepNumber: 3,
        action: "Medical Board Percentage Assessment",
        description: "Board issues percentage disability score (must be ≥ 40% for benchmark welfare).",
        timeline: "Within 21 Days",
      },
      {
        stepNumber: 4,
        action: "Digital UDID Card Issuance & Delivery",
        description: "Download digital UDID card instantly. Physical plastic smartcard dispatched via India Post.",
        timeline: "Within 30 Days (SLA 30 Days)",
      },
    ],
    interactiveChecklist: [
      { id: "udid_step1", label: "Registered on Swavlamban Portal", description: "Created enrollment profile on swavlambancard.gov.in" },
      { id: "udid_step2", label: "Attended Medical Board Assessment", description: "Specialist doctors evaluated clinical reports" },
      { id: "udid_step3", label: "Obtained Benchmark Disability Score (≥40%)", description: "Certified as benchmark disabled" },
      { id: "udid_step4", label: "Downloaded Digital UDID Card", description: "Retrieved official national disability ID card" },
    ],
  },
};

export function getCertificateGuide(certificateId: string): CertificateResolutionGuide | undefined {
  if (!certificateId) return undefined;
  if (CERTIFICATE_GUIDES[certificateId]) {
    return CERTIFICATE_GUIDES[certificateId];
  }
  const lower = certificateId.toLowerCase();
  if (lower.includes("first_graduate") || lower.includes("rev-104") || lower.includes("fg_cert")) {
    return CERTIFICATE_GUIDES["TN_First_Graduate_Cert"];
  }
  if (lower.includes("income")) {
    return CERTIFICATE_GUIDES["Income_Certificate"];
  }
  if (lower.includes("caste") || lower.includes("community")) {
    return CERTIFICATE_GUIDES["Caste_Certificate"];
  }
  if (lower.includes("domicile") || lower.includes("nativity")) {
    return CERTIFICATE_GUIDES["Domicile_Certificate"];
  }
  if (lower.includes("govt_school") || lower.includes("bonafide") || lower.includes("emis")) {
    return CERTIFICATE_GUIDES["Govt_School_Study_Certificate"];
  }
  if (lower.includes("ews")) {
    return CERTIFICATE_GUIDES["EWS_Certificate"];
  }
  if (lower.includes("disability") || lower.includes("udid")) {
    return CERTIFICATE_GUIDES["Disability_Certificate"];
  }
  return undefined;
}
