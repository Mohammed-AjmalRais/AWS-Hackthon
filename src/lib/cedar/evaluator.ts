import { SCHEMES_DATABASE, SchemeOrService } from "@/data/schemes";

export interface UserProfile {
  name?: string;
  category: "ST" | "SC" | "OBC" | "EWS" | "General";
  annualFamilyIncome: number;
  educationLevel: "Class 9" | "Class 10" | "11th" | "12th" | "UG" | "PG" | "PhD" | "Diploma" | "Other";
  state: string;
  district?: string;
  gender: "Male" | "Female" | "Other";
  isMinority?: boolean;
  isTechnicalCourse?: boolean;
  marksPercentage?: number;
  hasPaternalCasteRecord?: boolean;
  hasValidAddressProof?: boolean;
  residenceYearsInState?: number;
  heldDocuments?: string[]; // Array of document IDs already held, e.g. ["Income_Certificate"]
}

export interface CedarEvaluationResult {
  scheme: SchemeOrService;
  decision: "ALLOW" | "DENY";
  fitScore: number; // 0 to 100
  passedClauses: string[];
  failedClauses: string[];
  missingPrerequisites: SchemeOrService[];
  actionRecommendation: string;
  cedarPolicySnippet: string;
}

/**
 * Deterministic Cedar-style Policy Evaluator
 * Evaluates Indian Civic Service & Scholarship criteria against declarative policy rules.
 */
export function evaluateCedarPolicies(profile: UserProfile): CedarEvaluationResult[] {
  const results: CedarEvaluationResult[] = [];
  const heldDocs = new Set(profile.heldDocuments || []);

  for (const scheme of SCHEMES_DATABASE) {
    const passedClauses: string[] = [];
    const failedClauses: string[] = [];
    let fitScore = 100;

    // 1. Category Matching
    if (scheme.targetCategories.includes("All") || scheme.targetCategories.includes(profile.category)) {
      passedClauses.push(`Category match: ${profile.category} in [${scheme.targetCategories.join(", ")}]`);
    } else {
      failedClauses.push(`Category mismatch: Candidate is ${profile.category}, but scheme requires [${scheme.targetCategories.join(", ")}]`);
      fitScore -= 45;
    }

    // 2. Income Threshold
    if (profile.annualFamilyIncome <= scheme.maxIncome) {
      const incomeDiff = scheme.maxIncome - profile.annualFamilyIncome;
      passedClauses.push(`Income eligibility: ₹${profile.annualFamilyIncome.toLocaleString('en-IN')} <= Ceiling ₹${scheme.maxIncome.toLocaleString('en-IN')} (Eligible by ₹${incomeDiff.toLocaleString('en-IN')})`);
    } else {
      failedClauses.push(`Income ceiling exceeded: ₹${profile.annualFamilyIncome.toLocaleString('en-IN')} > Max allowed ₹${scheme.maxIncome.toLocaleString('en-IN')}`);
      fitScore -= 45;
    }

    // 3. Education Stage
    if (scheme.educationStages.includes("All") || scheme.educationStages.includes(profile.educationLevel)) {
      passedClauses.push(`Education level match: ${profile.educationLevel}`);
    } else {
      failedClauses.push(`Education stage mismatch: Candidate is in ${profile.educationLevel}, scheme is for [${scheme.educationStages.join(", ")}]`);
      fitScore -= 30;
    }

    // 4. Special Criteria (Gender, Minority, Technical)
    if (scheme.id === "BegumHazratMahal") {
      if (profile.gender === "Female") passedClauses.push("Gender requirement met: Female");
      else { failedClauses.push("Scheme reserved for female students"); fitScore -= 40; }

      if (profile.isMinority) passedClauses.push("Minority community status verified");
      else { failedClauses.push("Minority declaration required"); fitScore -= 30; }
    }

    if (scheme.id === "AICTE_Pragati") {
      if (profile.gender === "Female") passedClauses.push("Gender requirement met: Female");
      else { failedClauses.push("Pragati scholarship is for female students only"); fitScore -= 40; }

      if (profile.isTechnicalCourse) passedClauses.push("Technical course requirement met");
      else { failedClauses.push("Requires enrollment in AICTE-approved technical diploma or degree"); fitScore -= 25; }
    }

    // 5. Check Prerequisite Documents
    const missingPrereqs: SchemeOrService[] = [];
    for (const prereqId of scheme.prerequisites) {
      if (!heldDocs.has(prereqId)) {
        const prereqScheme = SCHEMES_DATABASE.find(s => s.id === prereqId);
        if (prereqScheme) missingPrereqs.push(prereqScheme);
      }
    }

    const decision: "ALLOW" | "DENY" = failedClauses.length === 0 ? "ALLOW" : "DENY";
    const clampedScore = Math.max(0, Math.min(100, fitScore));

    let actionRecommendation = "";
    if (decision === "ALLOW") {
      if (missingPrereqs.length > 0) {
        actionRecommendation = `Eligible! But prerequisite chain incomplete: obtain ${missingPrereqs.map(p => p.title).join(", ")} first.`;
      } else {
        actionRecommendation = `Ready to apply immediately on ${scheme.portalName}. All prerequisites satisfied.`;
      }
    } else {
      actionRecommendation = `Not currently eligible: ${failedClauses[0]}`;
    }

    results.push({
      scheme,
      decision,
      fitScore: clampedScore,
      passedClauses,
      failedClauses,
      missingPrerequisites: missingPrereqs,
      actionRecommendation,
      cedarPolicySnippet: scheme.cedarPolicyCode
    });
  }

  // Sort: Allowed first, then higher fit score, then certificates (enablers)
  return results.sort((a, b) => {
    if (a.decision === "ALLOW" && b.decision !== "ALLOW") return -1;
    if (a.decision !== "ALLOW" && b.decision === "ALLOW") return 1;
    return b.fitScore - a.fitScore;
  });
}
