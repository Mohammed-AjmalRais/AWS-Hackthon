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

// State-Aware Guide Generator
export function getCertificateGuide(
  certificateId: string,
  userState?: string
): CertificateResolutionGuide | undefined {
  if (!certificateId) return undefined;

  const isAP = userState === "Andhra Pradesh";
  const isTN = userState === "Tamil Nadu";
  const lower = certificateId.toLowerCase();

  // 1. Income Certificate
  if (lower.includes("income")) {
    if (isAP) {
      return {
        id: "Income_Certificate",
        title: "Andhra Pradesh Income Certificate (Mandal Revenue Officer - MeeSeva)",
        officialCode: "AP MeeSeva Code: REV-02 / Navasakam Standard",
        department: "Revenue Department, Government of Andhra Pradesh",
        issuingAuthority: "Tahsildar / Mandal Revenue Officer (MRO)",
        counterName: "Grama / Ward Sachivalayam & MeeSeva Citizen Center",
        portalName: "AP MeeSeva / Spandana Portal",
        portalUrl: "https://onlineap.meeseva.gov.in",
        statutoryFee: "₹45 (Statutory MeeSeva User Charge)",
        maxAuthorizedFee: "₹45",
        feeWarning: "Statutory fee is ₹45 at MeeSeva or ₹0 at Village/Ward Secretariat. Never pay bribes or surcharges.",
        slaDays: 15,
        validityPeriod: "1 Financial Year (Valid from April 1 to March 31)",
        purpose: "Official determination that annual family income is under statutory ceilings (< ₹2,50,000 for Jagananna Vidya Deevena).",
        whyNeeded: "Mandatory prerequisite for Jnanabhumi and Navasakam portal fee reimbursements.",
        precursorDocuments: [
          {
            name: "White Rice Card / BPL Household Card",
            requirement: "Valid civil supplies card reflecting student and earning family members",
            mandatory: true,
          },
          {
            name: "Aadhaar Card of Applicant & Mother",
            requirement: "Active mobile linked for MeeSeva biometric authentication",
            mandatory: true,
          },
          {
            name: "Village Revenue Officer (VRO) Livelihood Report",
            requirement: "VRO field assessment completed at Ward/Village Secretariat",
            mandatory: true,
          },
          {
            name: "Recent Domestic Electricity Bill",
            requirement: "Domestic consumption must be below 300 units/mo (3,600 units/yr)",
            mandatory: true,
          },
        ],
        stepsToObtain: [
          {
            stepNumber: 1,
            action: "Visit Ward / Grama Sachivalayam",
            description: "Meet the Welfare & Education Assistant (WEA) or VRO with your Rice Card and electricity bill.",
            timeline: "Day 1",
          },
          {
            stepNumber: 2,
            action: "Biometric e-KYC Submission",
            description: "Complete fingerprint/iris e-KYC at MeeSeva or Sachivalayam. Pay statutory charge of ₹45.",
            timeline: "Same Day",
          },
          {
            stepNumber: 3,
            action: "VRO & RI Field Inspection",
            description: "Revenue Inspector validates land, livelihood, and power records in Spandana.",
            timeline: "Days 3 to 7",
          },
          {
            stepNumber: 4,
            action: "MRO Digital Approval & Download",
            description: "Mandal Revenue Officer signs digitally. Download barcoded certificate from onlineap.meeseva.gov.in.",
            timeline: "Within 15 Days",
          },
        ],
        interactiveChecklist: [
          { id: "ap_inc1", label: "Confirmed Rice Card & Power Bill (<300 units/mo)", description: "Eligibility criteria verified" },
          { id: "ap_inc2", label: "Biometric e-KYC Submitted at MeeSeva", description: "Obtained AP MeeSeva transaction tracking number" },
          { id: "ap_inc3", label: "VRO Field Inspection Endorsed", description: "Local revenue inquiry completed" },
          { id: "ap_inc4", label: "Downloaded Digitally Signed Certificate", description: "Uploaded to Jnanabhumi portal" },
        ],
      };
    }

    // Default to Tamil Nadu if user is in TN, else National e-District
    return {
      id: "Income_Certificate",
      title: isTN ? "Tamil Nadu Income Certificate (e-Sevai REV-103)" : "Statutory Income Certificate (Revenue Department)",
      officialCode: isTN ? "TNeGA Code: REV-103" : "State e-District Income Form 16",
      department: isTN ? "Revenue Department, Government of Tamil Nadu" : "Revenue Department, State Government",
      issuingAuthority: "Tahsildar / Zonal Deputy Tahsildar",
      counterName: isTN ? "TNeGA e-Sevai Center / Taluk Office" : "Tehsil Office / Common Service Center (CSC)",
      portalName: isTN ? "Tamil Nadu e-Sevai Portal" : "National Government Services Portal",
      portalUrl: isTN ? "https://www.tnesevai.tn.gov.in" : "https://services.india.gov.in",
      statutoryFee: isTN ? "₹60 (e-Sevai Fee)" : "₹25 – ₹35",
      maxAuthorizedFee: isTN ? "₹60" : "₹35",
      feeWarning: "Official government fee is statutorily fixed. Avoid touts charging unauthorized fees.",
      slaDays: 15,
      validityPeriod: "1 Financial Year (Issued after April 1, 2026)",
      purpose: "Proves family annual earnings are below statutory eligibility limits.",
      whyNeeded: "Mandatory prerequisite for need-based scholarships and tuition fee waivers.",
      precursorDocuments: [
        { name: "Salary Slip / VAO Panchanama", requirement: "Form 16 or local revenue report", mandatory: true },
        { name: "Family Ration Card", requirement: "Listing all earning household members", mandatory: true },
        { name: "Aadhaar Card", requirement: "Address and identity proof", mandatory: true },
        { name: "Self-Declaration Affidavit", requirement: "Signed income affidavit on ₹20 stamp paper", mandatory: true },
      ],
      stepsToObtain: [
        { stepNumber: 1, action: "Obtain Village Officer Assessment", description: "Submit declaration to local revenue officer for inspection.", timeline: "1-2 Days" },
        { stepNumber: 2, action: "File Online Application", description: `Submit online at ${isTN ? "tnesevai.tn.gov.in" : "services.india.gov.in"}. Pay statutory fee.`, timeline: "Day 1" },
        { stepNumber: 3, action: "Revenue Inspector Verification", description: "RI checks land and civil registry records.", timeline: "Days 3 to 7" },
        { stepNumber: 4, action: "Tahsildar Digital Approval", description: "Download official QR-coded income certificate.", timeline: "Within 15 Days" },
      ],
      interactiveChecklist: [
        { id: "inc1", label: "Local Revenue Inspection Note Obtained", description: "Assessment completed by village revenue officer" },
        { id: "inc2", label: "Application Submitted Online", description: "Received official receipt with tracking code" },
        { id: "inc3", label: "Revenue Verification Completed", description: "Endorsed by Revenue Inspector" },
        { id: "inc4", label: "Downloaded Digitally Signed Certificate", description: "Ready for scholarship portal upload" },
      ],
    };
  }

  // 2. Community / Caste Certificate
  if (lower.includes("caste") || lower.includes("community") || lower.includes("integrated_cert")) {
    if (isAP) {
      return {
        id: "Caste_Certificate",
        title: "Andhra Pradesh Integrated Certificate: Caste, Nativity & Date of Birth",
        officialCode: "AP MeeSeva Service Code: REV-01",
        department: "Social Welfare / BC Welfare Dept, Government of Andhra Pradesh",
        issuingAuthority: "Tahsildar / Mandal Revenue Officer (MRO)",
        counterName: "Grama / Ward Sachivalayam & MeeSeva Center",
        portalName: "AP MeeSeva Portal",
        portalUrl: "https://onlineap.meeseva.gov.in",
        statutoryFee: "₹45 (AP MeeSeva User Fee)",
        maxAuthorizedFee: "₹45",
        feeWarning: "Official MeeSeva charge is ₹45. Completely free at Ward/Village Secretariat counters.",
        slaDays: 15,
        validityPeriod: "Permanent / Lifetime Validity",
        purpose: "3-in-1 statutory certificate validating Community, State Nativity, and Date of Birth for BC-A/B/C/D/E, SC, ST, Kapu, and EBC categories.",
        whyNeeded: "Mandatory prerequisite for Jagananna Vidya Deevena, Vasathi Deevena, and college convenor counseling.",
        precursorDocuments: [
          { name: "Father's / Mother's Caste Record", requirement: "Paternal MeeSeva certificate or land record proving caste", mandatory: true },
          { name: "Applicant's SSC Memo / 10th Marks Memo", requirement: "Verification of date of birth and spelling of name", mandatory: true },
          { name: "Aadhaar Card", requirement: "Biometric e-KYC identity proof", mandatory: true },
          { name: "Family Ration Card / Rice Card", requirement: "Proof of residence and household continuity", mandatory: true },
        ],
        stepsToObtain: [
          { stepNumber: 1, action: "Collect Lineage Proof & SSC Memo", description: "Compile parents' caste certificate and 10th marksheet.", timeline: "Day 1" },
          { stepNumber: 2, action: "Apply at MeeSeva / Sachivalayam (REV-01)", description: "Submit application with fingerprint biometric scan. Pay ₹45.", timeline: "Same Day" },
          { stepNumber: 3, action: "VRO & RI Inquiry", description: "Village Revenue Officer checks village lineage register.", timeline: "Days 3 to 8" },
          { stepNumber: 4, action: "MRO Digital Approval", description: "Download permanent QR-coded certificate from onlineap.meeseva.gov.in.", timeline: "Within 15 Days" },
        ],
        interactiveChecklist: [
          { id: "ap_caste1", label: "Father's Caste Document Located", description: "Paternal lineage verified" },
          { id: "ap_caste2", label: "Applied at MeeSeva under Code REV-01", description: "Received transaction tracking receipt" },
          { id: "ap_caste3", label: "VRO Lineage Inspection Completed", description: "Revenue inquiry finished" },
          { id: "ap_caste4", label: "Permanent 3-in-1 Certificate Downloaded", description: "Ready for Jnanabhumi portal upload" },
        ],
      };
    }

    return {
      id: "Caste_Certificate",
      title: isTN ? "Tamil Nadu Community Certificate (e-Sevai REV-101)" : "Permanent Community / Caste Certificate",
      officialCode: isTN ? "TNeGA Code: REV-101" : "State Revenue Portal Category Form",
      department: isTN ? "BC, MBC & Minorities Welfare / Adi Dravidar Welfare Department" : "Social Welfare Department",
      issuingAuthority: "Tahsildar / Sub-Divisional Magistrate (SDO)",
      counterName: isTN ? "TNeGA e-Sevai Center / Taluk Office" : "Common Service Center (CSC) / Taluk Office",
      portalName: isTN ? "Tamil Nadu e-Sevai Portal" : "National Government Services Portal",
      portalUrl: isTN ? "https://www.tnesevai.tn.gov.in" : "https://services.india.gov.in",
      statutoryFee: isTN ? "₹60" : "₹25",
      maxAuthorizedFee: isTN ? "₹60" : "₹35",
      feeWarning: "Official fee is statutorily fixed. No additional notary charge is legally authorized.",
      slaDays: 15,
      validityPeriod: "Permanent / Lifetime Validity",
      purpose: "Validates statutory community reservation for SC, ST, OBC, MBC, BC, and EWS quotas.",
      whyNeeded: "Required for quota college admissions and post-matric fee concessions.",
      precursorDocuments: [
        { name: "Parents' Community Certificate", requirement: "Barcode certificate or school TC of parent", mandatory: true },
        { name: "Applicant's School Transfer Certificate (TC)", requirement: "Record of caste in school register", mandatory: true },
        { name: "Family Ration Card", requirement: "Proof of residence and parentage", mandatory: true },
        { name: "Aadhaar Card", requirement: "Identity and biometric proof", mandatory: true },
      ],
      stepsToObtain: [
        { stepNumber: 1, action: "Gather Parent Community Proof", description: "Collate parents' certificate and applicant's school record.", timeline: "1 Day" },
        { stepNumber: 2, action: "Apply via e-Sevai / Revenue Counter", description: `Submit online at ${isTN ? "tnesevai.tn.gov.in" : "services.india.gov.in"}. Pay statutory fee.`, timeline: "Day 1" },
        { stepNumber: 3, action: "Field Inquiry by Revenue Officer", description: "Officers verify community records in the village register.", timeline: "Days 3 to 8" },
        { stepNumber: 4, action: "Tahsildar Approval & Issuance", description: "Download digitally signed barcode certificate.", timeline: "Within 15 Days" },
      ],
      interactiveChecklist: [
        { id: "caste1", label: "Parent's Caste Record Located", description: "Lineage confirmed" },
        { id: "caste2", label: "Submitted Online Application", description: "Received official tracking slip" },
        { id: "caste3", label: "Revenue Inquiry Verified", description: "Village register validated" },
        { id: "caste4", label: "Downloaded Permanent Digital Certificate", description: "Ready for portal submission" },
      ],
    };
  }

  // 3. Nativity / Domicile Certificate
  if (lower.includes("domicile") || lower.includes("nativity")) {
    if (isAP) {
      return {
        id: "Domicile_Certificate",
        title: "Andhra Pradesh Residence / Nativity Certificate (MeeSeva REV-03)",
        officialCode: "AP MeeSeva Code: REV-03",
        department: "Revenue Department, Government of Andhra Pradesh",
        issuingAuthority: "Tahsildar / Mandal Revenue Officer (MRO)",
        counterName: "Grama / Ward Sachivalayam & MeeSeva Center",
        portalName: "AP MeeSeva Portal",
        portalUrl: "https://onlineap.meeseva.gov.in",
        statutoryFee: "₹45",
        maxAuthorizedFee: "₹45",
        feeWarning: "Official fee is ₹45. Service is free at Ward/Grama Secretariats.",
        slaDays: 15,
        validityPeriod: "Permanent / Valid for 5 Years",
        purpose: "Proves continuous residence within Andhra Pradesh to claim local state counseling and welfare benefits.",
        whyNeeded: "Required for AP convenor admissions and local reservation eligibility.",
        precursorDocuments: [
          { name: "Continuous Study Certificates (4 to 7 Years)", requirement: "School bonafides proving study within the state", mandatory: true },
          { name: "Family Ration Card / Rice Card", requirement: "Proof of residence", mandatory: true },
          { name: "Aadhaar Card", requirement: "Biometric identity proof", mandatory: true },
        ],
        stepsToObtain: [
          { stepNumber: 1, action: "Collate Study Bonafides", description: "Collect study certificates from local schools.", timeline: "1 Day" },
          { stepNumber: 2, action: "Submit Application at MeeSeva", description: "Submit application under Code REV-03. Pay ₹45.", timeline: "Day 1" },
          { stepNumber: 3, action: "Tahsildar Verification & Download", description: "Download signed residence certificate.", timeline: "Within 15 Days" },
        ],
        interactiveChecklist: [
          { id: "ap_nat1", label: "Study Records Collected", description: "Continuous schooling proved" },
          { id: "ap_nat2", label: "Applied at MeeSeva", description: "Received tracking number" },
          { id: "ap_nat3", label: "Downloaded Residence Certificate", description: "Ready for counseling upload" },
        ],
      };
    }

    return {
      id: "Domicile_Certificate",
      title: isTN ? "Tamil Nadu Nativity / Domicile Certificate (e-Sevai REV-102)" : "State Nativity / Domicile Certificate",
      officialCode: isTN ? "TNeGA Code: REV-102" : "State Revenue Portal Domicile",
      department: isTN ? "Revenue Department, Government of Tamil Nadu" : "Revenue Department",
      issuingAuthority: "Tahsildar / Zonal Deputy Tahsildar",
      counterName: isTN ? "TNeGA e-Sevai Center / Taluk Office" : "Tehsil Revenue Office / CSC",
      portalName: isTN ? "Tamil Nadu e-Sevai Portal" : "National Government Services Portal",
      portalUrl: isTN ? "https://www.tnesevai.tn.gov.in" : "https://services.india.gov.in",
      statutoryFee: isTN ? "₹60" : "₹25",
      maxAuthorizedFee: isTN ? "₹60" : "₹35",
      feeWarning: "Official statutory charge is legally capped. Avoid touts.",
      slaDays: 15,
      validityPeriod: "Permanent / Valid for 5 Years",
      purpose: "Proves continuous state residence to establish state domicile quota reservation.",
      whyNeeded: "Required for single-window counseling and state welfare programs.",
      precursorDocuments: [
        { name: "Proof of Continuous Residence (5+ Years)", requirement: "Property tax, electricity bill, or voter card", mandatory: true },
        { name: "School Study Bonafides", requirement: "Proves continuous education within the state", mandatory: true },
        { name: "Family Ration Card", requirement: "Address proof", mandatory: true },
      ],
      stepsToObtain: [
        { stepNumber: 1, action: "Compile Residence Proof", description: "Collect bills or school bonafides proving 5+ years of residence.", timeline: "1 Day" },
        { stepNumber: 2, action: "Submit at e-Sevai / Revenue Counter", description: "Apply online and pay statutory fee.", timeline: "Day 1" },
        { stepNumber: 3, action: "Tahsildar Digital Sign & Download", description: "Download certified nativity document.", timeline: "Within 15 Days" },
      ],
      interactiveChecklist: [
        { id: "nat1", label: "Collected Residence Proofs", description: "5-year continuity confirmed" },
        { id: "nat2", label: "Applied Online", description: "Tracking ID generated" },
        { id: "nat3", label: "Downloaded Nativity Certificate", description: "Ready for counseling submission" },
      ],
    };
  }

  // 4. Tamil Nadu First Graduate Certificate
  if (lower.includes("first_graduate") || lower.includes("rev-104") || lower.includes("fg_cert")) {
    return {
      id: "TN_First_Graduate_Cert",
      title: "Tamil Nadu First Graduate Certificate (Mudhal Thalaimurai Pattadhari)",
      officialCode: "TNeGA e-Sevai Code: REV-104",
      department: "Revenue and Disaster Management Department, Government of Tamil Nadu",
      issuingAuthority: "Headquarters Tahsildar / Zonal Deputy Tahsildar",
      counterName: "TNeGA e-Sevai Common Service Center (CSC) / Arasu e-Seva Maiyam",
      portalName: "Tamil Nadu e-District / TNeGA Citizen Portal",
      portalUrl: "https://www.tnesevai.tn.gov.in",
      statutoryFee: "₹60 (Statutory e-Sevai Application Fee)",
      maxAuthorizedFee: "₹60",
      feeWarning: "Cyber cafes cannot charge more than ₹60. The fee is legally fixed under G.O. Ms No. 85.",
      slaDays: 15,
      validityPeriod: "Permanent (Valid for entire duration of collegiate education)",
      purpose: "Provides ₹25,000 to ₹30,000 annual tuition fee concession in professional courses for candidates with zero prior degree holders in family.",
      whyNeeded: "Required under TNEA single-window counseling to waive tuition fees in engineering/arts colleges.",
      precursorDocuments: [
        { name: "Applicant's 10th & 12th Transfer Certificate (TC)", requirement: "Specifies school and date of birth", mandatory: true },
        { name: "Father's School Leaving Certificate", requirement: "Proof of father's educational level", mandatory: true },
        { name: "Mother's School Leaving Certificate", requirement: "Proof of mother's educational level", mandatory: true },
        { name: "Siblings' Educational Proofs / TCs", requirement: "Proves no elder brother/sister holds a graduate degree", mandatory: true },
        { name: "Family Smart Ration Card", requirement: "Proves household composition", mandatory: true },
        { name: "Joint Notarized Self-Declaration", requirement: "Declaration on ₹20 stamp paper signed by parents & student", mandatory: true },
      ],
      stepsToObtain: [
        { stepNumber: 1, action: "Gather Precursor TCs & Ration Card", description: "Collect educational records of entire immediate family.", timeline: "1-2 Days" },
        { stepNumber: 2, action: "Prepare Notarized Joint Affidavit", description: "Notarize the statutory Tamil Nadu First Graduate declaration format.", timeline: "Same Day" },
        { stepNumber: 3, action: "Submit at e-Sevai Center (REV-104)", description: "Visit e-Sevai or apply online at tnesevai.tn.gov.in. Pay ₹60.", timeline: "Day 1" },
        { stepNumber: 4, action: "Tahsildar Approval & Download", description: "Download official QR-coded certificate.", timeline: "Within 15 Days" },
      ],
      interactiveChecklist: [
        { id: "fg_step1", label: "Collected Parents' & Siblings' School TCs", description: "Verified zero degree holders" },
        { id: "fg_step2", label: "Drafted & Notarized Joint Affidavit", description: "Notarized on ₹20 stamp paper" },
        { id: "fg_step3", label: "Application Submitted at e-Sevai (REV-104)", description: "Paid ₹60 statutory fee" },
        { id: "fg_step4", label: "Digitally Signed Certificate Downloaded", description: "Ready for TNEA college admission" },
      ],
    };
  }

  // 5. Continuous Government School Study Bonafide (Class 6 to 12)
  if (lower.includes("govt_school") || lower.includes("bonafide") || lower.includes("emis")) {
    return {
      id: "Govt_School_Study_Certificate",
      title: "Continuous Government School Study Bonafide (Class 6 to 12)",
      officialCode: "School Education Department Official Bonafide",
      department: "School Education Department",
      issuingAuthority: "Headmaster / Principal of Government High & Higher Secondary Schools",
      counterName: "School Principal Office & EMIS Cell",
      portalName: "Tamil Nadu EMIS Portal",
      portalUrl: "https://emis.tnschools.gov.in",
      statutoryFee: "₹0.00 (Completely Free)",
      maxAuthorizedFee: "₹0.00",
      feeWarning: "Government schools cannot charge any fee for issuing bonafide certificates.",
      slaDays: 3,
      validityPeriod: "Permanent",
      purpose: "Proves continuous education in Government Schools from Class 6 to 12 to unlock Pudhumai Penn (₹1,000/mo) and 7.5% preferential reservation.",
      whyNeeded: "Mandatory prerequisite for Pudhumai Penn, Tamil Pudhalvan, and 7.5% full tuition waiver quota.",
      precursorDocuments: [
        { name: "Class 6 to 10 School Marksheets & TCs", requirement: "Verifying government school enrollment", mandatory: true },
        { name: "Class 11 & 12 Higher Secondary School Bonafide", requirement: "Verifying continuous study in govt school", mandatory: true },
        { name: "Aadhaar Card of Student", requirement: "Identity proof", mandatory: true },
      ],
      stepsToObtain: [
        { stepNumber: 1, action: "Visit Former Government Schools", description: "Request EMIS bonafide certificate from Headmaster.", timeline: "1 Day" },
        { stepNumber: 2, action: "Headmaster Counter-Signature & Seal", description: "HM signs and stamps official declaration.", timeline: "Same Day" },
        { stepNumber: 3, action: "Upload to College Portal", description: "Submit during admission verification.", timeline: "Immediate" },
      ],
      interactiveChecklist: [
        { id: "gs_step1", label: "Collected Marksheets from Class 6 to 12", description: "Proof of continuous schooling" },
        { id: "gs_step2", label: "Headmaster Signed Official Bonafide", description: "School seal and registration number verified" },
        { id: "gs_step3", label: "Uploaded to College Admission Portal", description: "Ready for fee waiver" },
      ],
    };
  }

  // 6. Economically Weaker Section (EWS) Certificate
  if (lower.includes("ews")) {
    return {
      id: "EWS_Certificate",
      title: "Economically Weaker Section (EWS) Income & Asset Certificate",
      officialCode: "DoPT Central Standard Format (Annexure I)",
      department: "Revenue & Civil Supplies Department",
      issuingAuthority: "Sub-Divisional Magistrate (SDM) / Tehsildar",
      counterName: "Tehsil Office / District Revenue Complex",
      portalName: "National Government Services Portal",
      portalUrl: "https://services.india.gov.in",
      statutoryFee: "₹25 – ₹60",
      maxAuthorizedFee: "₹60",
      feeWarning: "Never pay unauthorized agents. Asset verification is conducted by revenue inspectors.",
      slaDays: 21,
      validityPeriod: "1 Financial Year (Valid for current academic session)",
      purpose: "Validates 10% constitutional reservation in central educational institutions and civil examinations for General category citizens.",
      whyNeeded: "Required for Central Sector Scheme (CSSS), AICTE Pragati General, and central admissions.",
      precursorDocuments: [
        { name: "Income Proof (ITR / Form 16 / VAO Assessment)", requirement: "Gross family income below ₹8,00,000", mandatory: true },
        { name: "Agricultural Land RoR (Patta)", requirement: "Holding must be under 5 acres", mandatory: true },
        { name: "Residential Flat / House Tax Slip", requirement: "Residential flat under 1,000 sq ft or plot under 100/200 sq yards", mandatory: true },
        { name: "Aadhaar & Family Ration Card", requirement: "Proof of identity and household", mandatory: true },
      ],
      stepsToObtain: [
        { stepNumber: 1, action: "Gather Land & Income Records", description: "Verify family meets income and asset criteria.", timeline: "1-2 Days" },
        { stepNumber: 2, action: "Submit Application at Revenue Office", description: "Submit application with property papers.", timeline: "Day 1" },
        { stepNumber: 3, action: "Field Physical Asset Inspection", description: "Patwari inspects land and house dimensions.", timeline: "Days 7 to 14" },
        { stepNumber: 4, action: "SDM / Tehsildar Counter-Signature", description: "Certificate issued with official seal.", timeline: "Within 21 Days" },
      ],
      interactiveChecklist: [
        { id: "ews_step1", label: "Income Verified Under ₹8,00,000", description: "ITR or revenue note checked" },
        { id: "ews_step2", label: "Asset Limits Verified (<5 acres, <1000 sq ft)", description: "Property papers compiled" },
        { id: "ews_step3", label: "Physical Revenue Inspection Completed", description: "Patwari endorsed asset note" },
        { id: "ews_step4", label: "EWS Certificate Issued", description: "Ready for NSP and central portal" },
      ],
    };
  }

  // 7. National Disability Certificate (UDID)
  if (lower.includes("disability") || lower.includes("udid")) {
    return {
      id: "Disability_Certificate",
      title: "Unique Disability ID (UDID) National Card",
      officialCode: "Department of Empowerment of Persons with Disabilities (DEPwD)",
      department: "Ministry of Social Justice and Empowerment, Government of India",
      issuingAuthority: "District Medical Board / Chief District Medical Officer (CDMO)",
      counterName: "District Civil Hospital / Swavlamban Portal Cell",
      portalName: "Swavlamban National Disability Portal",
      portalUrl: "https://www.swavlambancard.gov.in",
      statutoryFee: "₹0.00 (Completely Free by Central Law)",
      maxAuthorizedFee: "₹0.00",
      feeWarning: "Medical evaluation and UDID card issuance are 100% free nationwide. Report any fee demands.",
      slaDays: 30,
      validityPeriod: "Permanent (for permanent disabilities) or 5 Years (for temporary conditions)",
      purpose: "National single document providing benchmark disability recognition (≥40%) across all ministries, state governments, and transport corporations.",
      whyNeeded: "Mandatory prerequisite for Saksham scholarships, fee waivers, reader allowances, and maintenance grants.",
      precursorDocuments: [
        { name: "Aadhaar Card", requirement: "Biometric and identity proof", mandatory: true },
        { name: "Recent Color Passport Photographs", requirement: "Showing disability clearly if visible", mandatory: true },
        { name: "Clinical History & Hospital Diagnostic Reports", requirement: "Medical reports from treating doctors", mandatory: true },
      ],
      stepsToObtain: [
        { stepNumber: 1, action: "Register on Swavlamban Portal", description: "Create online profile on swavlambancard.gov.in.", timeline: "Day 1" },
        { stepNumber: 2, action: "Appear before District Medical Board", description: "Visit District Civil Hospital for physical clinical assessment.", timeline: "Within 14 Days" },
        { stepNumber: 3, action: "Medical Board Score Assessment", description: "Board issues percentage disability score (≥40% required).", timeline: "Within 21 Days" },
        { stepNumber: 4, action: "Digital UDID Card Download", description: "Download digital card instantly. Plastic smartcard dispatched by India Post.", timeline: "Within 30 Days" },
      ],
      interactiveChecklist: [
        { id: "udid_step1", label: "Registered on Swavlamban Portal", description: "Enrollment number obtained" },
        { id: "udid_step2", label: "Attended Medical Board Assessment", description: "Clinical evaluation completed" },
        { id: "udid_step3", label: "Obtained Benchmark Disability Score (≥40%)", description: "Certified as benchmark disabled" },
        { id: "udid_step4", label: "Downloaded Digital UDID Card", description: "Ready for scholarship uploads" },
      ],
    };
  }

  // Fallback Generic Guide
  return {
    id: certificateId,
    title: certificateId.replace(/_/g, " "),
    officialCode: "Official Statutory Document",
    department: "State Revenue / Civic Administration Department",
    issuingAuthority: "Tahsildar / Competent Local Authority",
    counterName: isAP ? "Grama / Ward Sachivalayam & MeeSeva Center" : isTN ? "e-Sevai Center / Taluk Office" : "Common Service Center (CSC)",
    portalName: isAP ? "AP MeeSeva Portal" : isTN ? "Tamil Nadu e-Sevai Portal" : "National Government Services Portal",
    portalUrl: isAP ? "https://onlineap.meeseva.gov.in" : isTN ? "https://www.tnesevai.tn.gov.in" : "https://services.india.gov.in",
    statutoryFee: "₹25 – ₹60",
    maxAuthorizedFee: "₹60",
    feeWarning: "Never pay unauthorized charges. Demand an official computer-generated receipt.",
    slaDays: 15,
    validityPeriod: "As per statutory state rules",
    purpose: `Official certificate required to satisfy statutory requirements for availing government entitlements.`,
    whyNeeded: "Mandatory precursor document for scheme application verification.",
    precursorDocuments: [
      { name: "Aadhaar Card", requirement: "Identity and address proof", mandatory: true },
      { name: "Family Ration Card", requirement: "Proof of household", mandatory: true },
    ],
    stepsToObtain: [
      { stepNumber: 1, action: "Assemble Identity Documents", description: "Gather Aadhaar, Ration Card, and address proofs.", timeline: "1 Day" },
      { stepNumber: 2, action: "Submit at Authorized Center", description: "Submit application at designated government counter or online.", timeline: "Day 1" },
      { stepNumber: 3, action: "Download Approved Certificate", description: "Download digitally signed certificate upon approval.", timeline: "Within 15 Days" },
    ],
    interactiveChecklist: [
      { id: "gen1", label: "Identity Documents Gathered", description: "Aadhaar and address verified" },
      { id: "gen2", label: "Application Submitted", description: "Received tracking receipt" },
      { id: "gen3", label: "Certificate Downloaded", description: "Verified with digital seal" },
    ],
  };
}
