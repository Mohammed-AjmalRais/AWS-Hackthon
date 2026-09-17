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
    serviceId: "PostMatric_ST_Submission",
    serviceName: "National Scholarship Portal (NSP) Online Application & Document Upload",
    governingAct: "Ministry of Tribal Affairs Operational Guidelines Rev. 2024",
    govtTreasuryFee: 0,
    authorizedOperatorCharge: 30, // For scanning 5 pages + uploading
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
    serviceName: "Annual Household Income & Asset Certificate Issuance",
    governingAct: "State Revenue Department Citizen Charter",
    govtTreasuryFee: 15,
    authorizedOperatorCharge: 15,
    totalLegalFee: 30,
    cyberCafeExtortionRange: "₹150 to ₹300",
    guaranteedDeliveryDays: 14,
    officialReceiptMandatory: true,
    grievancePortalUrl: "https://services.india.gov.in",
    helpline: "1800-180-6127 (Citizen Service Portal Desk)"
  },
  {
    serviceId: "EWS_Certificate",
    serviceName: "Economically Weaker Section (EWS) Revenue Verification",
    governingAct: "DoPT Office Memorandum No. 36039/1/2019-Estt (Res)",
    govtTreasuryFee: 25,
    authorizedOperatorCharge: 25,
    totalLegalFee: 50,
    cyberCafeExtortionRange: "₹300 to ₹800",
    guaranteedDeliveryDays: 21,
    officialReceiptMandatory: true,
    grievancePortalUrl: "https://pgportal.gov.in",
    helpline: "1800-3000-3468"
  },
  {
    serviceId: "Domicile_Certificate",
    serviceName: "Permanent Resident Certificate (PRC) / Domicile Issuance",
    governingAct: "State Domicile & Citizenship Verification Rules",
    govtTreasuryFee: 20,
    authorizedOperatorCharge: 15,
    totalLegalFee: 35,
    cyberCafeExtortionRange: "₹200 to ₹400",
    guaranteedDeliveryDays: 15,
    officialReceiptMandatory: true,
    grievancePortalUrl: "https://services.india.gov.in",
    helpline: "1800-180-6127"
  }
];

export const REAL_OFFLINE_CENTERS: OfflineCenter[] = [
  // Odisha
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
  {
    id: "od-bhubaneswar-csc-1",
    name: "Jan Seva Kendra (Khandagiri CSC)",
    centerId: "CSC-OD-KHO-0922",
    type: "CSC",
    state: "Odisha",
    district: "Khurda",
    pincode: "751030",
    address: "Shop 12, Near Khandagiri Square, Bhubaneswar",
    timing: "09:00 AM – 07:00 PM",
    workingDays: "Monday to Saturday",
    contactPerson: "Prakash Mohanty (VLE)",
    contactNumber: "+91 98610 54192",
    servicesOffered: ["Odisha e-District Services", "Medhabruti Portal Submission", "Income Certificate Renewal"],
    distanceEstimate: "0.3 km from Khandagiri Caves Gate",
    mapsQuery: "Khandagiri Square Bhubaneswar Odisha"
  },

  // Jharkhand
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
  {
    id: "jh-ranchi-sdo-1",
    name: "Office of the Sub-Divisional Officer (SDO Revenue)",
    centerId: "REV-JH-RAN-SDO01",
    type: "TEHSILDAR",
    state: "Jharkhand",
    district: "Ranchi",
    pincode: "834008",
    address: "Collectorate Building, Morabadi, Ranchi",
    timing: "10:00 AM – 04:30 PM",
    workingDays: "Monday to Friday",
    contactPerson: "SDO Executive Magistrate Branch",
    contactNumber: "0651-2200123",
    servicesOffered: ["ST Tribe Certificate Final Counter-Signature", "Non-Creamy Layer Seal", "EWS Asset Verification"],
    distanceEstimate: "Near Morabadi Football Stadium",
    mapsQuery: "District Collectorate Morabadi Ranchi"
  },

  // Karnataka
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
  {
    id: "ka-blr-taluk-1",
    name: "Bangalore South Taluk Office (Tahsildar Desk)",
    centerId: "REV-KA-BLR-TALUK02",
    type: "TEHSILDAR",
    state: "Karnataka",
    district: "Bangalore Urban",
    pincode: "560029",
    address: "Mini Vidhana Soudha, Behind Sagar Hospital, Tilaknagar, Jayanagar, Bengaluru",
    timing: "10:00 AM – 05:00 PM",
    workingDays: "Monday to Friday, 1st & 3rd Saturdays",
    contactPerson: "Revenue Inspector (Caste & Mutation Section)",
    contactNumber: "080-26532211",
    servicesOffered: ["Caste Verification Inquiries", "Income Certificate Land Inspection", "Right to Information (RTI)"],
    distanceEstimate: "Behind Sagar Hospital Jayanagar",
    mapsQuery: "Mini Vidhana Soudha Jayanagar Bangalore"
  },

  // Telangana
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
  {
    id: "tg-hyd-mro-1",
    name: "Mandal Revenue Office (MRO / Tahsildar)",
    centerId: "REV-TG-HYD-MRO04",
    type: "TEHSILDAR",
    state: "Telangana",
    district: "Hyderabad",
    pincode: "500028",
    address: "Opposite Mahavir Hospital, Masab Tank, AC Guards, Hyderabad",
    timing: "10:30 AM – 05:00 PM",
    workingDays: "Monday to Friday",
    contactPerson: "Tahsildar (Revenue & Civil Supplies)",
    contactNumber: "040-23391200",
    servicesOffered: ["Mandal Revenue Inquiry", "Paternal Genealogy Record Verification", "EWS Certificate Attestation"],
    distanceEstimate: "Opposite Mahavir Hospital Masab Tank",
    mapsQuery: "Mandal Revenue Office Masab Tank Hyderabad"
  },

  // Maharashtra
  {
    id: "mh-pune-csc-1",
    name: "Aaple Sarkar Seva Kendra (Shivajinagar)",
    centerId: "AS-MH-PUN-0199",
    type: "CSC",
    state: "Maharashtra",
    district: "Pune",
    pincode: "411005",
    address: "Old Zilla Parishad Building, Near Pune Railway Station, Shivajinagar, Pune",
    timing: "09:00 AM – 06:00 PM",
    workingDays: "Monday to Saturday",
    contactPerson: "Rohan Deshmukh (VLE)",
    contactNumber: "+91 97654 22100",
    servicesOffered: ["MahaDBT Portal Scholarship Upload", "Caste Validity Dossier Submission", "Income Certificate"],
    distanceEstimate: "Near Pune Zilla Parishad",
    mapsQuery: "Zilla Parishad Pune Maharashtra"
  },

  // Assam / North East
  {
    id: "as-guwahati-csc-1",
    name: "Guwahati Common Service Center (Paltan Bazar)",
    centerId: "CSC-AS-KAM-0045",
    type: "CSC",
    state: "Assam",
    district: "Kamrup Metropolitan",
    pincode: "781008",
    address: "A.T. Road, Near Guwahati Central Railway Station, Paltan Bazar, Guwahati",
    timing: "09:00 AM – 05:30 PM",
    workingDays: "Monday to Saturday",
    contactPerson: "Bipul Kalita (VLE)",
    contactNumber: "+91 94350 91822",
    servicesOffered: ["Ishaan Uday Scholarship Upload", "Permanent Resident Certificate (PRC)", "Aadhaar Demographic Update"],
    distanceEstimate: "0.2 km from Paltan Bazar Police Outpost",
    mapsQuery: "Paltan Bazar Guwahati Assam"
  }
];
