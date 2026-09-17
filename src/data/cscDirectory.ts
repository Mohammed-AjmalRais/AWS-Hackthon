export interface OfflineCenter {
  id: string;
  name: string;
  type: "CSC" | "TEHSILDAR" | "MEESEVA" | "BANGALORE_ONE" | "TRIBAL_OFFICE";
  state: string;
  district: string;
  address: string;
  timing: string;
  contactNumber: string;
  servicesOffered: string[];
}

export interface StatutoryFeeRule {
  serviceName: string;
  officialGovtFee: string;
  cscServiceChargeLimit: string;
  maximumLegalCharge: string;
  warningNotice: string;
  grievanceHelpline: string;
}

export const STATUTORY_FEE_RULES: Record<string, StatutoryFeeRule> = {
  "Caste_Certificate": {
    serviceName: "Caste / Tribe Certificate Issuance",
    officialGovtFee: "₹0 (Govt Fee Free for SC/ST)",
    cscServiceChargeLimit: "₹25 (Authorized CSC operator scanning/upload fee)",
    maximumLegalCharge: "₹25 total",
    warningNotice: "If any operator demands ₹150–₹300, note down their CSC VLE ID and call the grievance portal. Overcharging is punishable under the IT Act.",
    grievanceHelpline: "1800-3000-3468 (National CSC Grievance Helpline)"
  },
  "Income_Certificate": {
    serviceName: "Annual Income Certificate Renewal",
    officialGovtFee: "₹15 (Statutory Treasury Challan in most states)",
    cscServiceChargeLimit: "₹15 (Operator fee)",
    maximumLegalCharge: "₹30 total",
    warningNotice: "Always ask for the system-generated receipt showing the exact transaction amount and government application number.",
    grievanceHelpline: "1800-180-6127 / State RTPS Helpline"
  },
  "PostMatric_ST": {
    serviceName: "NSP / MoTA Scholarship Form Submission",
    officialGovtFee: "₹0 (100% Free under MoTA guidelines)",
    cscServiceChargeLimit: "₹30 (Nominal printing & document scanning fee)",
    maximumLegalCharge: "₹30 total",
    warningNotice: "Colleges and cyber cafes cannot charge processing fee for government scholarships. Registration on scholarships.gov.in is free.",
    grievanceHelpline: "0120-6619540 (NSP Helpdesk)"
  }
};

export const SAMPLE_OFFLINE_CENTERS: OfflineCenter[] = [
  {
    id: "csc-1",
    name: "Baripada Digital Seva Kendra (CSC)",
    type: "CSC",
    state: "Odisha",
    district: "Mayurbhanj",
    address: "Near Head Post Office, Ward No. 4, Baripada, Mayurbhanj - 757001",
    timing: "Mon - Sat: 9:00 AM - 6:00 PM",
    contactNumber: "+91 94371 88201",
    servicesOffered: ["Caste Certificate", "Income Certificate", "Aadhaar e-KYC", "NSP Scholarship Scanning"]
  },
  {
    id: "teh-1",
    name: "Tahsil & Revenue Inspector Office",
    type: "TEHSILDAR",
    state: "Odisha",
    district: "Mayurbhanj",
    address: "Sub-Collectorate Complex, Court Road, Baripada",
    timing: "Mon - Fri: 10:00 AM - 5:00 PM",
    contactNumber: "06792-252204",
    servicesOffered: ["Caste Validity Inquiry", "Revenue Panchanama", "Land Record (RoR) Attestation"]
  },
  {
    id: "csc-2",
    name: "Ranchi Sadar Pragya Kendra (CSC)",
    type: "CSC",
    state: "Jharkhand",
    district: "Ranchi",
    address: "Block Development Office Campus, Kutchery Chowk, Ranchi - 834001",
    timing: "Mon - Sat: 9:30 AM - 5:30 PM",
    contactNumber: "+91 98350 44122",
    servicesOffered: ["e-Kalyan Portal Upload", "JharSewa Certificates", "Aadhaar Seeding Form"]
  },
  {
    id: "teh-2",
    name: "Office of the Sub-Divisional Officer (SDO)",
    type: "TEHSILDAR",
    state: "Jharkhand",
    district: "Ranchi",
    address: "Collectorate Building, Morabadi, Ranchi",
    timing: "Mon - Fri: 10:00 AM - 4:30 PM",
    contactNumber: "0651-2200123",
    servicesOffered: ["Tribe Certificate Final Counter-Signature", "Non-Creamy Layer Seal"]
  },
  {
    id: "meeseva-1",
    name: "MeeSeva Citizen Center (Secunderabad)",
    type: "MEESEVA",
    state: "Telangana",
    district: "Hyderabad",
    address: "GHMC Complex, Sardar Patel Road, Secunderabad - 500003",
    timing: "Mon - Sat: 8:00 AM - 8:00 PM",
    contactNumber: "040-23454321",
    servicesOffered: ["Integrated Certificate (Caste, Nativity, DoB)", "Income Certificate", "ePASS Application"]
  },
  {
    id: "b1-1",
    name: "Bangalore One Integrated Service Center",
    type: "BANGALORE_ONE",
    state: "Karnataka",
    district: "Bangalore",
    address: "Mini BDA Complex, 5th Block, Koramangala, Bengaluru - 560095",
    timing: "Mon - Sun: 8:00 AM - 7:00 PM",
    contactNumber: "080-22955400",
    servicesOffered: ["Nadakacheri Caste & Income", "SSP Post-Matric Verification", "Aadhaar Update"]
  }
];
