export interface DocumentAuditInput {
  nameOnAadhaar: string;
  nameOnMarksheet: string;
  nameOnCasteCertificate?: string;
  dobOnAadhaar?: string;
  dobOnMarksheet?: string;
  incomeCertificateIssueDate?: string;
  isAadhaarLinkedToBank: boolean;
  isNpciSeeded: boolean;
  bankName?: string;
}

export interface DocumentAuditIssue {
  severity: "CRITICAL" | "WARNING" | "RESOLVED";
  title: string;
  description: string;
  solution: string;
  statutoryReference: string;
}

export interface DocumentAuditResult {
  overallReadinessScore: number; // 0 to 100
  canSubmitNow: boolean;
  nameMatchPercentage: number;
  dobMatched: boolean;
  npciStatus: "SEEDED" | "ONLY_LINKED" | "NOT_LINKED";
  issues: DocumentAuditIssue[];
  resolutionChecklist: string[];
}

/**
 * Calculates Levenshtein similarity between two strings
 */
function calculateSimilarity(str1: string, str2: string): number {
  const s1 = str1.trim().toLowerCase().replace(/\s+/g, ' ');
  const s2 = str2.trim().toLowerCase().replace(/\s+/g, ' ');

  if (s1 === s2) return 100;
  if (!s1 || !s2) return 0;

  // Check if one is an initial of another (e.g. "Ramesh K" vs "Ramesh Kumar")
  const tokens1 = s1.split(' ');
  const tokens2 = s2.split(' ');

  if (tokens1.length === tokens2.length) {
    let matches = 0;
    for (let i = 0; i < tokens1.length; i++) {
      if (tokens1[i] === tokens2[i]) {
        matches++;
      } else if (
        (tokens1[i].length === 1 && tokens2[i].startsWith(tokens1[i])) ||
        (tokens2[i].length === 1 && tokens1[i].startsWith(tokens2[i]))
      ) {
        matches += 0.75;
      }
    }
    return Math.round((matches / tokens1.length) * 100);
  }

  const m = s1.length;
  const n = s2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  const distance = dp[m][n];
  const maxLen = Math.max(m, n);
  return Math.round(((maxLen - distance) / maxLen) * 100);
}

/**
 * Audits student documents before government portal submission
 */
export function auditCitizenDocuments(input: DocumentAuditInput): DocumentAuditResult {
  const issues: DocumentAuditIssue[] = [];
  const resolutionChecklist: string[] = [];
  let readiness = 100;

  // 1. Name Discrepancy Check
  const nameSim = calculateSimilarity(input.nameOnAadhaar, input.nameOnMarksheet);
  if (nameSim < 100) {
    if (nameSim >= 75) {
      readiness -= 25;
      issues.push({
        severity: "WARNING",
        title: `Name Mismatch Detected (${nameSim}% match)`,
        description: `Aadhaar card says "${input.nameOnAadhaar}" while 10th Marksheet says "${input.nameOnMarksheet}". National Scholarship Portal (NSP) uses automated e-KYC matching; slight initial expansions or spacing differences frequently cause automated portal rejections.`,
        solution: "Carry a 1-page Notarized Name Discrepancy Affidavit or update Aadhaar at your nearest Aadhaar Seva Kendra before applying.",
        statutoryReference: "NSP Operational Guidelines 2024 Clause 3.1 on Demographics e-KYC"
      });
      resolutionChecklist.push(`Generate & carry a Name Affidavit clarifying "${input.nameOnAadhaar}" and "${input.nameOnMarksheet}" refer to the same individual.`);
    } else {
      readiness -= 45;
      issues.push({
        severity: "CRITICAL",
        title: `Major Name Difference (${nameSim}% match)`,
        description: `High divergence between Aadhaar ("${input.nameOnAadhaar}") and academic marksheets ("${input.nameOnMarksheet}"). Portal validation will fail e-KYC screening.`,
        solution: "Get your Aadhaar updated to match your matriculation marksheet at a post office/bank Aadhaar Kendra.",
        statutoryReference: "UIDAI Aadhaar Regulations Sec. 28 & NSP Rulebook"
      });
      resolutionChecklist.push("Update Aadhaar name at Aadhaar Seva Kendra with 10th certificate as proof.");
    }
  } else {
    issues.push({
      severity: "RESOLVED",
      title: "Name Verification Passed (100% Match)",
      description: `Exact match found between Aadhaar and academic marksheets ("${input.nameOnAadhaar}").`,
      solution: "No action required.",
      statutoryReference: "Compliant with NSP e-KYC"
    });
  }

  // 2. Date of Birth Check
  let dobMatched = true;
  if (input.dobOnAadhaar && input.dobOnMarksheet) {
    if (input.dobOnAadhaar !== input.dobOnMarksheet) {
      dobMatched = false;
      readiness -= 35;
      issues.push({
        severity: "CRITICAL",
        title: "Date of Birth Mismatch",
        description: `Aadhaar DOB (${input.dobOnAadhaar}) does not match Marksheet DOB (${input.dobOnMarksheet}). Automatic rejection threshold on DBT portals.`,
        solution: "Apply for Aadhaar DOB correction using your Class 10th Admit Card / Marksheet as valid Proof of Date of Birth (DoB).",
        statutoryReference: "UIDAI Circular No. 13 of 2020 on Date of Birth Updation"
      });
      resolutionChecklist.push("Correct Aadhaar DOB to match Matriculation record.");
    } else {
      issues.push({
        severity: "RESOLVED",
        title: "Date of Birth Verified",
        description: "DOB matches across Aadhaar and institutional records.",
        solution: "No action required.",
        statutoryReference: "UIDAI Validated"
      });
    }
  }

  // 3. The NPCI Bank Seeding Check (The #1 Silent Rejection Cause!)
  let npciStatus: "SEEDED" | "ONLY_LINKED" | "NOT_LINKED" = "NOT_LINKED";

  if (input.isNpciSeeded) {
    npciStatus = "SEEDED";
    issues.push({
      severity: "RESOLVED",
      title: "Aadhaar NPCI Mapper Seeding: Active",
      description: `Account is mapped on NPCI central database. DBT scholarship funds will disburse without rejection.`,
      solution: "Active.",
      statutoryReference: "PFMS / NPCI DBT Gateway Compliant"
    });
  } else if (input.isAadhaarLinkedToBank) {
    npciStatus = "ONLY_LINKED";
    readiness -= 40;
    issues.push({
      severity: "CRITICAL",
      title: "Aadhaar Linked but NOT NPCI Seeded! (Danger)",
      description: "Your bank has linked your Aadhaar for KYC, but has NOT enabled Aadhaar DBT Seeding on the NPCI mapper. 90% of scholarship disbursement failures happen here because the government portal cannot push funds via PFMS.",
      solution: "Download our pre-filled NPCI Mandate Form, visit your bank branch counter, and ask the manager specifically for 'NPCI Aadhaar DBT Seeding'.",
      statutoryReference: "Reserve Bank of India (RBI) Circular on DBT / NPCI Mapper Integration"
    });
    resolutionChecklist.push("Submit NPCI Seeding Mandate Form to your bank branch (Not just standard KYC).");
  } else {
    npciStatus = "NOT_LINKED";
    readiness -= 60;
    issues.push({
      severity: "CRITICAL",
      title: "Bank Account Not Linked to Aadhaar",
      description: "Direct Benefit Transfer (DBT) is legally prohibited to unlinked accounts under Section 7 of the Aadhaar Act.",
      solution: "Open an India Post Payments Bank (IPPB) DBT account or visit your existing bank to link & seed Aadhaar.",
      statutoryReference: "Aadhaar Act 2016 Section 7"
    });
    resolutionChecklist.push("Link bank account with Aadhaar and enable DBT mandate.");
  }

  // 4. Income Certificate Expiry / Date Check
  if (input.incomeCertificateIssueDate) {
    const issueDate = new Date(input.incomeCertificateIssueDate);
    const currentFiscalYearStart = new Date("2026-04-01");
    if (issueDate < currentFiscalYearStart) {
      readiness -= 25;
      issues.push({
        severity: "WARNING",
        title: "Income Certificate May Be Expired",
        description: `Your certificate was issued on ${input.incomeCertificateIssueDate}. Most scholarships require an income certificate issued in the current financial year (after April 1, 2026).`,
        solution: "Apply for a renewal at your local Tehsildar office or CSC center (takes ~14 days).",
        statutoryReference: "State Revenue Department Citizen Charter"
      });
      resolutionChecklist.push("Renew Income Certificate at Tehsildar / MeeSeva center.");
    }
  }

  const canSubmitNow = readiness >= 80 && npciStatus === "SEEDED" && dobMatched && nameSim >= 75;

  return {
    overallReadinessScore: Math.max(10, readiness),
    canSubmitNow,
    nameMatchPercentage: nameSim,
    dobMatched,
    npciStatus,
    issues,
    resolutionChecklist
  };
}

/**
 * Pre-filled NPCI Aadhaar Seeding Mandate Template (Downloadable/Printable)
 */
export function generateNpciMandateForm(studentName: string, bankName: string, accountNumber: string, aadhaarNumber: string): string {
  return `
APPLICATION FOR LINKING / SEEDING AADHAAR NUMBER AND RECEIVING DBT BENEFITS INTO BANK ACCOUNT (NPCI MAPPING)

To,
The Branch Manager,
${bankName || "[Bank Name]"}
Branch: ________________________

Date: ${new Date().toLocaleDateString('en-IN')}

Dear Sir/Madam,

Subject: Consent for Linking/Seeding of Aadhaar with Bank Account No: ${accountNumber || "____________________"} for DBT

I, ${studentName || "[Applicant Name]"}, holder of Account No. ${accountNumber || "____________________"}, hereby authorize ${bankName || "your bank"} to link my Aadhaar Number ${aadhaarNumber || "XXXX-XXXX-XXXX"} with my bank account.

Tick (✔) the appropriate option:
[✔] I wish to seed my account with NPCI mapper to receive Direct Benefit Transfer (DBT) of all government welfare schemes and scholarships (including NSP / MoTA Post-Matric Scholarship).
[ ] I do not wish to seed my account with NPCI mapper.

I declare that the information provided is true and correct.

Yours faithfully,


Signature / Thumb Impression of Account Holder
Name: ${studentName || "________________________"}
Mobile No: ________________________
Enclosures: Copy of Aadhaar Card & Bank Passbook
----------------------------------------------------------------------------------------------------
ACKNOWLEDGEMENT SLIP (For Bank Use Only)
Received application for NPCI Aadhaar DBT Seeding for Account No: ${accountNumber || "________________"}
Date: _______________  Bank Official Seal & Signature: ____________________
  `.trim();
}
