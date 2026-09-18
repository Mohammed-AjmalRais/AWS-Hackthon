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
  {
    id: "tn-cbe-esevai-1",
    name: "Coimbatore Collectorate e-Sevai Center",
    centerId: "ES-TN-CBE-0052",
    type: "CSC",
    state: "Tamil Nadu",
    district: "Coimbatore",
    pincode: "641018",
    address: "District Collectorate Campus, State Bank Road, Coimbatore",
    timing: "09:00 AM – 06:00 PM",
    workingDays: "Monday to Saturday",
    contactPerson: "K. Selvam (e-Sevai Incharge)",
    contactNumber: "0422-2301114",
    servicesOffered: ["Community Certificate", "Income Certificate", "First Graduate Certificate", "Moovalur Ramamirtham Scheme"],
    distanceEstimate: "0.2 km from Coimbatore Junction",
    mapsQuery: "Collectorate Office Coimbatore Tamil Nadu"
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
    district: "Bengaluru Urban",
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
  // MAHARASHTRA
  // ==========================================
  {
    id: "mh-mum-setu-1",
    name: "Aaple Sarkar Seva Kendra (Setu Center Mumbai)",
    centerId: "AS-MH-MUM-0101",
    type: "CSC",
    state: "Maharashtra",
    district: "Mumbai City",
    pincode: "400001",
    address: "Old Custom House, Shahid Bhagat Singh Marg, Fort, Mumbai",
    timing: "09:30 AM – 06:00 PM",
    workingDays: "Monday to Saturday",
    contactPerson: "V. Deshmukh (Setu Coordinator)",
    contactNumber: "022-22661231",
    servicesOffered: ["MahaDBT Scholarship Verification", "Caste & Validity Certificate Registration", "Income Certificate"],
    distanceEstimate: "Near Fort Mumbai",
    mapsQuery: "Old Custom House Fort Mumbai Maharashtra"
  },
  {
    id: "mh-pune-setu-1",
    name: "Pune Collectorate Aaple Sarkar Seva Kendra",
    centerId: "AS-MH-PUN-0205",
    type: "CSC",
    state: "Maharashtra",
    district: "Pune",
    pincode: "411001",
    address: "District Collector Office, Station Road, Pune",
    timing: "09:00 AM – 06:00 PM",
    workingDays: "Monday to Saturday",
    contactPerson: "A. Kulkarni (Incharge)",
    contactNumber: "020-26122000",
    servicesOffered: ["Domicile Certificate", "MahaDBT Verification", "Non-Creamy Layer Certificate"],
    distanceEstimate: "0.5 km from Pune Railway Station",
    mapsQuery: "District Collector Office Pune Maharashtra"
  },

  // ==========================================
  // UTTAR PRADESH
  // ==========================================
  {
    id: "up-lko-janseva-1",
    name: "Jan Seva Kendra (e-District Lucknow)",
    centerId: "JS-UP-LKO-0019",
    type: "CSC",
    state: "Uttar Pradesh",
    district: "Lucknow",
    pincode: "226001",
    address: "Collectorate Compound, Qaiserbagh, Lucknow",
    timing: "09:30 AM – 05:30 PM",
    workingDays: "Monday to Saturday",
    contactPerson: "R. Tiwari (Jan Seva VLE)",
    contactNumber: "0522-2621000",
    servicesOffered: ["UP Scholarship Portal Verification", "Jati Praman Patra (Caste)", "Aay Praman Patra (Income)"],
    distanceEstimate: "Inside Qaiserbagh Collectorate",
    mapsQuery: "Collectorate Qaiserbagh Lucknow Uttar Pradesh"
  },

  // ==========================================
  // BIHAR
  // ==========================================
  {
    id: "br-pat-rtps-1",
    name: "RTPS Center (Right to Public Services Patna)",
    centerId: "RTPS-BR-PAT-0044",
    type: "CSC",
    state: "Bihar",
    district: "Patna",
    pincode: "800001",
    address: "Patna Sadar Block Office Campus, Near Gandhi Maidan, Patna",
    timing: "10:00 AM – 05:00 PM",
    workingDays: "Monday to Friday",
    contactPerson: "S. Kumar (RTPS Executive)",
    contactNumber: "0612-2201999",
    servicesOffered: ["Post Matric Scholarship Portal Verification", "Jati / Aawasiya / Aay Praman Patra", "EWS Certificate"],
    distanceEstimate: "Near Gandhi Maidan Patna",
    mapsQuery: "Gandhi Maidan Sadar Block Office Patna Bihar"
  },

  // ==========================================
  // WEST BENGAL
  // ==========================================
  {
    id: "wb-kol-bsk-1",
    name: "Bangla Sahayata Kendra (BSK Kolkata)",
    centerId: "BSK-WB-KOL-0112",
    type: "CSC",
    state: "West Bengal",
    district: "Kolkata",
    pincode: "700001",
    address: "Kolkata Municipal Corporation Building, 5 S.N. Banerjee Road, Kolkata",
    timing: "10:00 AM – 05:30 PM",
    workingDays: "Monday to Saturday",
    contactPerson: "D. Banerjee (BSK Operator)",
    contactNumber: "033-22861000",
    servicesOffered: ["Oasis Scholarship Verification", "Aikyashree Portal Support", "Caste Certificate (SC/ST/OBC)"],
    distanceEstimate: "Opposite Esplanade",
    mapsQuery: "KMC Building SN Banerjee Road Kolkata"
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
  // MADHYA PRADESH
  // ==========================================
  {
    id: "mp-bho-mpse-1",
    name: "MP e-Seva Kendra (Bhopal Collectorate)",
    centerId: "MP-BHO-0108",
    type: "CSC",
    state: "Madhya Pradesh",
    district: "Bhopal",
    pincode: "462001",
    address: "Collectorate Complex, Kohefiza, Bhopal",
    timing: "09:30 AM – 05:30 PM",
    workingDays: "Monday to Saturday",
    contactPerson: "R. S. Chouhan (Lok Seva Lead)",
    contactNumber: "0755-2540000",
    servicesOffered: ["MMPTASC Scholarship e-KYC", "Lok Seva Kendra Income & Caste", "Mukhya Mantri Medhavi Chhatra"],
    distanceEstimate: "Near VIP Road Kohefiza",
    mapsQuery: "Collectorate Office Kohefiza Bhopal Madhya Pradesh"
  },

  // ==========================================
  // KERALA
  // ==========================================
  {
    id: "kl-tvm-akshaya-1",
    name: "Akshaya e-Center (Thiruvananthapuram Main)",
    centerId: "AK-KL-TVM-008",
    type: "CSC",
    state: "Kerala",
    district: "Thiruvananthapuram",
    pincode: "695001",
    address: "Corporation Complex, Palayam, Thiruvananthapuram",
    timing: "09:00 AM – 06:00 PM",
    workingDays: "Monday to Saturday",
    contactPerson: "G. Nair (Akshaya Entrepreneur)",
    contactNumber: "0471-2321100",
    servicesOffered: ["e-District Kerala Certificates", "e-Grantz 3.0 Post Matric Verification", "Aadhaar e-KYC Update"],
    distanceEstimate: "Opposite Palayam Market",
    mapsQuery: "Palayam Corporation Complex Thiruvananthapuram Kerala"
  },

  // ==========================================
  // GUJARAT
  // ==========================================
  {
    id: "gj-ahm-janseva-1",
    name: "Jan Seva Kendra (Ahmedabad Collectorate)",
    centerId: "JS-GJ-AHM-022",
    type: "CSC",
    state: "Gujarat",
    district: "Ahmedabad",
    pincode: "380027",
    address: "District Collector Office, Near Subhash Bridge, RTO Circle, Ahmedabad",
    timing: "10:00 AM – 05:30 PM",
    workingDays: "Monday to Saturday",
    contactPerson: "P. Patel (Jan Seva Coordinator)",
    contactNumber: "079-27551000",
    servicesOffered: ["Digital Gujarat Scholarship Portal Verification", "Caste & Non-Creamy Layer Certificate", "Income Certificate"],
    distanceEstimate: "Near RTO Circle Ahmedabad",
    mapsQuery: "Collector Office Subhash Bridge Ahmedabad Gujarat"
  },

  // ==========================================
  // DELHI
  // ==========================================
  {
    id: "dl-del-eseva-1",
    name: "Delhi e-District Citizen Service Center (Central Delhi)",
    centerId: "ED-DL-CEN-001",
    type: "CSC",
    state: "Delhi",
    district: "Central Delhi",
    pincode: "110054",
    address: "DC Office Complex, 14 Daryaganj, New Delhi",
    timing: "09:30 AM – 05:30 PM",
    workingDays: "Monday to Friday",
    contactPerson: "Amit Verma (e-District Officer)",
    contactNumber: "011-23282000",
    servicesOffered: ["e-District Delhi SC/ST/OBC Certificate", "State Merit Scholarship Verification", "Income Certificate Verification"],
    distanceEstimate: "Near Daryaganj Fire Station",
    mapsQuery: "DC Office 14 Daryaganj Central Delhi"
  }
];
