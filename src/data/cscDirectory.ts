export interface OfflineCenter {
  id: string;
  name: string;
  centerId: string; // Official VLE ID or Government Office Code
  type: "CSC" | "TEHSILDAR" | "DISTRICT_WELFARE" | "COLLEGE_NODAL";
  state: string;
  district: string;
  pincode: string;
  address: string;
  timing: string;
  workingDays: string;
  contactPerson: string;
  contactNumber: string;
  servicesOffered: string[];
  distanceEstimate?: string;
  mapsQuery: string;
}

export interface ServiceFeeDetail {
  serviceId: string;
  serviceName: string;
  governingAct: string;
  govtTreasuryFee: number;
  authorizedOperatorCharge: number;
  totalLegalFee: number;
  cyberCafeExtortionRange: string;
  guaranteedDeliveryDays: number;
  officialReceiptMandatory: boolean;
  grievancePortalUrl: string;
  helpline: string;
}

export const REAL_SERVICE_FEE_SCHEDULE: ServiceFeeDetail[] = [
  {
    serviceId: "AP_MeeSeva_REV01",
    serviceName: "AP MeeSeva Integrated Certificate (Caste, Nativity & Date of Birth - REV-01)",
    governingAct: "Andhra Pradesh Right to Public Services Act & MeeSeva Citizen Charter",
    govtTreasuryFee: 35,
    authorizedOperatorCharge: 10,
    totalLegalFee: 45,
    cyberCafeExtortionRange: "₹150 to ₹350",
    guaranteedDeliveryDays: 15,
    officialReceiptMandatory: true,
    grievancePortalUrl: "https://spandana.ap.gov.in",
    helpline: "1902 (AP Spandana Toll Free) / 1100"
  },
  {
    serviceId: "AP_Jnanabhumi_Upload",
    serviceName: "AP Jnanabhumi Vidya Deevena & Vasathi Deevena Verification",
    governingAct: "AP Social Welfare Dept Guidelines & Navasakam Manual",
    govtTreasuryFee: 0,
    authorizedOperatorCharge: 0,
    totalLegalFee: 0,
    cyberCafeExtortionRange: "₹100 to ₹250",
    guaranteedDeliveryDays: 7,
    officialReceiptMandatory: true,
    grievancePortalUrl: "https://jnanabhumi.ap.gov.in",
    helpline: "08645-274025 / 1902 (AP Navasakam Desk)"
  },
  {
    serviceId: "TN_eSevai_REV104",
    serviceName: "Tamil Nadu First Graduate Certificate (Mudhal Thalaimurai - REV-104)",
    governingAct: "Tamil Nadu Right to Public Services Act & TNeGA Citizen Charter (G.O. Ms No. 85)",
    govtTreasuryFee: 60,
    authorizedOperatorCharge: 0,
    totalLegalFee: 60,
    cyberCafeExtortionRange: "₹250 to ₹500",
    guaranteedDeliveryDays: 15,
    officialReceiptMandatory: true,
    grievancePortalUrl: "https://cmhelpline.tnega.org",
    helpline: "1100 (CM Helpline) / 1800-425-1333"
  },
  {
    serviceId: "PostMatric_ST_Submission",
    serviceName: "National Scholarship Portal (NSP) Online Application & Document Upload",
    governingAct: "Ministry of Tribal Affairs Operational Guidelines Rev. 2024",
    govtTreasuryFee: 0,
    authorizedOperatorCharge: 30,
    totalLegalFee: 30,
    cyberCafeExtortionRange: "₹200 to ₹500",
    guaranteedDeliveryDays: 1,
    officialReceiptMandatory: true,
    grievancePortalUrl: "https://pgportal.gov.in",
    helpline: "0120-6619540 (NSP National Helpdesk)"
  },
  {
    serviceId: "Caste_Certificate",
    serviceName: "Caste / Tribe Certificate Application & Biometric Verification",
    governingAct: "State Right to Public Services Act (RTSA) Schedule 1",
    govtTreasuryFee: 15,
    authorizedOperatorCharge: 15,
    totalLegalFee: 30,
    cyberCafeExtortionRange: "₹150 to ₹350",
    guaranteedDeliveryDays: 21,
    officialReceiptMandatory: true,
    grievancePortalUrl: "https://pgportal.gov.in",
    helpline: "1800-3000-3468 (National CSC Grievance Helpline)"
  },
  {
    serviceId: "Income_Certificate",
    serviceName: "Statutory Income Certificate Verification & Seal",
    governingAct: "State Revenue Department Citizen Charter",
    govtTreasuryFee: 20,
    authorizedOperatorCharge: 15,
    totalLegalFee: 35,
    cyberCafeExtortionRange: "₹200 to ₹600",
    guaranteedDeliveryDays: 14,
    officialReceiptMandatory: true,
    grievancePortalUrl: "https://pgportal.gov.in",
    helpline: "1800-180-6127"
  }
];

export const REAL_OFFLINE_CENTERS: OfflineCenter[] = [
  // ==========================================
  // ANDHRA PRADESH (AP)
  // ==========================================
  {
    id: "ap-vja-meeseva-1",
    name: "Governorpet MeeSeva Citizen Service Center",
    centerId: "MS-AP-NTR-0412",
    type: "CSC",
    state: "Andhra Pradesh",
    district: "NTR / Krishna",
    pincode: "520002",
    address: "Municipal Complex, Near Alankar Theater, Governorpet, Vijayawada",
    timing: "08:30 AM – 07:00 PM",
    workingDays: "Monday to Saturday",
    contactPerson: "K. Satyanarayana (MeeSeva Operator)",
    contactNumber: "0866-2574182",
    servicesOffered: [
      "Integrated Community, Nativity & DOB Certificate (REV-01)",
      "Income Certificate (REV-02)",
      "Jnanabhumi Post-Matric Biometric e-KYC",
      "YSR Aarogyasri Card Enrollment"
    ],
    distanceEstimate: "0.5 km from Vijayawada Old Bus Stand",
    mapsQuery: "Governorpet Vijayawada Andhra Pradesh"
  },
  {
    id: "ap-vja-sachivalayam-1",
    name: "Grama / Ward Sachivalayam (Ward 14 Secretariat)",
    centerId: "SEC-AP-NTR-W14",
    type: "TEHSILDAR",
    state: "Andhra Pradesh",
    district: "NTR / Krishna",
    pincode: "520003",
    address: "Ward Secretariat Office, Beside Rythu Bazar, Satyanarayanapuram, Vijayawada",
    timing: "10:00 AM – 05:00 PM",
    workingDays: "Monday to Friday (Govt Working Days)",
    contactPerson: "Welfare and Education Assistant (WEA Desk)",
    contactNumber: "0866-2431900",
    servicesOffered: [
      "Jagananna Vidya Deevena Physical Verification",
      "Jagananna Vasathi Deevena Hostel Endorsement",
      "White Rice Card / BPL Household Verification",
      "Doorstep Pension Inquiry"
    ],
    distanceEstimate: "Beside Satyanarayanapuram Rythu Bazar",
    mapsQuery: "Ward Secretariat Satyanarayanapuram Vijayawada"
  },
  {
    id: "ap-gnt-meeseva-1",
    name: "Arundelpet MeeSeva Center (Guntur)",
    centerId: "MS-AP-GNT-0188",
    type: "CSC",
    state: "Andhra Pradesh",
    district: "Guntur",
    pincode: "522002",
    address: "Shop 4, Main Road, 6/1 Arundelpet, Guntur",
    timing: "08:30 AM – 06:30 PM",
    workingDays: "Monday to Saturday",
    contactPerson: "M. Ramakrishna (Certified VLE)",
    contactNumber: "+91 98480 12941",
    servicesOffered: [
      "MeeSeva Integrated Certificate (REV-01)",
      "YSR Vahana Mitra Auto Registration Upload",
      "Aadhaar NPCI Bank Linking Advisory",
      "Spandana Grievance Filing"
    ],
    distanceEstimate: "1.0 km from Guntur Railway Station",
    mapsQuery: "Arundelpet Guntur Andhra Pradesh"
  },
  {
    id: "ap-vizag-meeseva-1",
    name: "Dwaraka Nagar MeeSeva Integrated Center",
    centerId: "MS-AP-VSP-0322",
    type: "CSC",
    state: "Andhra Pradesh",
    district: "Visakhapatnam",
    pincode: "530016",
    address: "Opposite RTC Complex, 2nd Lane, Dwaraka Nagar, Visakhapatnam",
    timing: "09:00 AM – 07:00 PM",
    workingDays: "Monday to Saturday",
    contactPerson: "P. Srinivasa Rao (MeeSeva Desk)",
    contactNumber: "0891-2748190",
    servicesOffered: [
      "Jnanabhumi RTF Tuition Verification",
      "YSR Aarogyasri Trust Hospital Pre-Auth",
      "Income & Asset Certificate for Scholarships",
      "Mandal Revenue Inquiry"
    ],
    distanceEstimate: "Opposite RTC Central Complex",
    mapsQuery: "Dwaraka Nagar Visakhapatnam Andhra Pradesh"
  },
  {
    id: "ap-kurnool-tahsil-1",
    name: "Tahsildar & Mandal Revenue Office (MRO Kurnool Urban)",
    centerId: "REV-AP-KRN-MRO01",
    type: "TEHSILDAR",
    state: "Andhra Pradesh",
    district: "Kurnool",
    pincode: "518002",
    address: "Collectorate Compound, Near Zilla Parishad, Kurnool",
    timing: "10:00 AM – 05:00 PM",
    workingDays: "Monday to Friday",
    contactPerson: "Tahsildar (Revenue Section)",
    contactNumber: "08518-220412",
    servicesOffered: [
      "BC-E Minority Category Inquiries",
      "Land Record & Revenue RoR Attestation",
      "RTSA Appeals for Delayed Certificates"
    ],
    distanceEstimate: "Inside Kurnool Collectorate Campus",
    mapsQuery: "Collectorate Office Kurnool Andhra Pradesh"
  },

  // ==========================================
  // TAMIL NADU (TN)
  // ==========================================
  {
    id: "tn-chn-esevai-1",
    name: "TNeGA Arasu e-Sevai Center (Chennai Collectorate)",
    centerId: "ES-TN-CHN-0012",
    type: "CSC",
    state: "Tamil Nadu",
    district: "Chennai",
    pincode: "600001",
    address: "Chennai District Collectorate Campus, Singaravelar Maaligai, Rajaji Salai, Chennai",
    timing: "09:00 AM – 06:00 PM",
    workingDays: "Monday to Saturday",
    contactPerson: "S. Murugan (TNeGA Certified Incharge)",
    contactNumber: "044-25268301",
    servicesOffered: [
      "First Graduate Certificate (REV-104)",
      "Income Certificate (REV-103)",
      "Community Certificate (REV-101)",
      "Pudhumai Penn / Tamil Pudhalvan Verification"
    ],
    distanceEstimate: "Near Chennai Beach Railway Station",
    mapsQuery: "Singaravelar Maaligai Rajaji Salai Chennai"
  },
  {
    id: "tn-chn-annanagar-1",
    name: "Anna Nagar e-Sevai Common Service Center",
    centerId: "ES-TN-CHN-0381",
    type: "CSC",
    state: "Tamil Nadu",
    district: "Chennai",
    pincode: "600040",
    address: "Zone 8 Zonal Office Complex, 2nd Avenue, Anna Nagar, Chennai",
    timing: "08:30 AM – 06:30 PM",
    workingDays: "Monday to Saturday",
    contactPerson: "R. Kavitha (Center Lead)",
    contactNumber: "044-26214190",
    servicesOffered: [
      "e-District Revenue Services",
      "CAN Number Registration & Aadhaar Linking",
      "TNEA Single Window Certificate Attestation",
      "7.5% Govt School Quota Verification"
    ],
    distanceEstimate: "0.4 km from Anna Nagar Tower Metro Station",
    mapsQuery: "Anna Nagar Zonal Office Chennai Tamil Nadu"
  },
  {
    id: "tn-mdu-esevai-1",
    name: "Madurai Simmakkal e-Sevai Maiyam",
    centerId: "ES-TN-MDU-0194",
    type: "CSC",
    state: "Tamil Nadu",
    district: "Madurai",
    pincode: "625001",
    address: "Opposite Vaigai River Bridge, Simmakkal Main Road, Madurai",
    timing: "09:00 AM – 06:00 PM",
    workingDays: "Monday to Saturday",
    contactPerson: "M. Sundaram (VLE)",
    contactNumber: "+91 94432 19820",
    servicesOffered: [
      "Community & Nativity Certificates",
      "Differently Abled Maintenance Allowance Filing",
      "Adi Dravidar Post-Matric Verification",
      "Smart Ration Card Updates"
    ],
    distanceEstimate: "Near Simmakkal Periyar Statue",
    mapsQuery: "Simmakkal Madurai Tamil Nadu"
  },

  // ==========================================
  // ODISHA
  // ==========================================
  {
    id: "od-baripada-csc-1",
    name: "Baripada Digital Seva Kendra (CSC)",
    centerId: "CSC-OD-MAY-0481",
    type: "CSC",
    state: "Odisha",
    district: "Mayurbhanj",
    pincode: "757001",
    address: "Plot 142, Beside Head Post Office, Ward No. 4, Baripada",
    timing: "08:30 AM – 06:30 PM",
    workingDays: "Monday to Saturday",
    contactPerson: "Santosh Kumar Giri (Certified VLE)",
    contactNumber: "+91 94371 88201",
    servicesOffered: ["Caste Certificate", "Income Certificate", "NSP Scholarship Upload", "Aadhaar e-KYC Update"],
    distanceEstimate: "0.8 km from District Bus Stand",
    mapsQuery: "Head Post Office Baripada Mayurbhanj Odisha"
  },
  {
    id: "od-baripada-teh-1",
    name: "Tahsil & Revenue Inspector Office",
    centerId: "REV-OD-MAY-TEH01",
    type: "TEHSILDAR",
    state: "Odisha",
    district: "Mayurbhanj",
    pincode: "757001",
    address: "Sub-Collectorate Complex, Kacheri Road, Baripada",
    timing: "10:00 AM – 05:00 PM",
    workingDays: "Monday to Friday (Govt. Working Days)",
    contactPerson: "Office of the Tehsildar (Revenue Branch)",
    contactNumber: "06792-252204",
    servicesOffered: ["Caste Certificate Inquiries", "Revenue Panchanama Verification", "Land Record (RoR) Attestation"],
    distanceEstimate: "1.2 km from Court Chhak",
    mapsQuery: "Sub Collectorate Office Baripada Odisha"
  },

  // ==========================================
  // JHARKHAND
  // ==========================================
  {
    id: "jh-ranchi-csc-1",
    name: "Ranchi Sadar Pragya Kendra (CSC)",
    centerId: "CSC-JH-RAN-0104",
    type: "CSC",
    state: "Jharkhand",
    district: "Ranchi",
    pincode: "834001",
    address: "Block Development Office Campus, Kutchery Chowk, Ranchi",
    timing: "09:30 AM – 05:30 PM",
    workingDays: "Monday to Saturday",
    contactPerson: "Anil Toppo (Pragya VLE)",
    contactNumber: "+91 98350 44122",
    servicesOffered: ["e-Kalyan Portal Upload", "JharSewa Caste/Income Certificates", "Aadhaar Seeding Mandate Desk"],
    distanceEstimate: "Inside Ranchi Sadar BDO Campus",
    mapsQuery: "Block Development Office Kutchery Chowk Ranchi"
  },

  // ==========================================
  // KARNATAKA
  // ==========================================
  {
    id: "ka-blr-b1-1",
    name: "Bangalore One Integrated Citizen Center (Koramangala)",
    centerId: "B1-KA-BLR-0512",
    type: "CSC",
    state: "Karnataka",
    district: "Bangalore Urban",
    pincode: "560095",
    address: "Mini BDA Complex, 3rd Block, 80 Feet Road, Koramangala, Bengaluru",
    timing: "08:00 AM – 07:00 PM",
    workingDays: "Monday to Sunday (All 7 Days)",
    contactPerson: "Center Supervisor (e-Governance Dept)",
    contactNumber: "080-22955400",
    servicesOffered: ["Nadakacheri Caste & Income (RD Number)", "SSP Post-Matric e-Attestation", "Aadhaar Demographic Update"],
    distanceEstimate: "Near Koramangala Post Office",
    mapsQuery: "Bangalore One Koramangala 3rd Block Bengaluru"
  },

  // ==========================================
  // TELANGANA
  // ==========================================
  {
    id: "tg-hyd-meeseva-1",
    name: "MeeSeva Citizen Service Center (Secunderabad)",
    centerId: "MS-TG-HYD-0301",
    type: "CSC",
    state: "Telangana",
    district: "Hyderabad",
    pincode: "500003",
    address: "GHMC Municipal Complex, Near Clock Tower, Sardar Patel Road, Secunderabad",
    timing: "08:30 AM – 07:00 PM",
    workingDays: "Monday to Saturday",
    contactPerson: "K. Venkatesh (MeeSeva Franchisee)",
    contactNumber: "040-23454321",
    servicesOffered: ["Integrated Certificate (Caste, Nativity, DoB)", "ePASS Telangana Scholarship Upload", "Income Certificate Renewal"],
    distanceEstimate: "Beside Secunderabad Clock Tower",
    mapsQuery: "GHMC Office Clock Tower Secunderabad"
  }
];
