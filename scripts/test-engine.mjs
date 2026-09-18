import { evaluateCedarPolicies } from "../src/lib/cedar/evaluator.ts";
import { auditCitizenDocuments } from "../src/lib/audit/documentAuditor.ts";
import { DEMO_PERSONAS } from "../src/data/demoPersonas.ts";

console.log("=================================================");
console.log("RUNNING JANSETU AI AUTOMATED VERIFICATION SUITE");
console.log("=================================================\n");

// Test 1: Cedar Policy Evaluation for Rajesh (ST Student, ₹1.8L income)
console.log("--- TEST 1: Cedar Policy Evaluator (Rajesh Kumar Munda - ST) ---");
const rajeshProfile = DEMO_PERSONAS[0].profile;
const evalResults = evaluateCedarPolicies(rajeshProfile);
const eligibleSchemes = evalResults.filter(r => r.decision === "ALLOW");

console.log(`Evaluated ${evalResults.length} schemes.`);
console.log(`Eligible Schemes for Rajesh: ${eligibleSchemes.length}`);
const postMatricST = evalResults.find(r => r.scheme.id === "PostMatric_ST");
if (postMatricST && postMatricST.decision === "ALLOW") {
  console.log("✓ PASS: PostMatric_ST correctly ALLOWED for ST student with ₹1.8L income.");
} else {
  console.error("✗ FAIL: PostMatric_ST was not allowed.");
  process.exit(1);
}

// Test 2: Income Ceiling Rejection for ST student with > ₹2.5L income
console.log("\n--- TEST 2: Cedar Income Ceiling Enforcement ---");
const richSTProfile = { ...rajeshProfile, annualFamilyIncome: 300000 };
const richEval = evaluateCedarPolicies(richSTProfile);
const richPostMatric = richEval.find(r => r.scheme.id === "PostMatric_ST");
if (richPostMatric && richPostMatric.decision === "DENY") {
  console.log("✓ PASS: PostMatric_ST correctly DENIED when income exceeds ₹2.5L ceiling.");
  console.log(`  Failed Clause: ${richPostMatric.failedClauses[0]}`);
} else {
  console.error("✗ FAIL: Over-income ST student was allowed.");
  process.exit(1);
}

// Test 3: Document Auditor Name Mismatch & NPCI Trap Detection
console.log("\n--- TEST 3: Document Auditor (Name Mismatch & NPCI Seeding) ---");
const rajeshAuditInput = DEMO_PERSONAS[0].auditInput;
const auditResult = auditCitizenDocuments(rajeshAuditInput);
console.log(`Readiness Score: ${auditResult.overallReadinessScore}%`);
console.log(`Name Match: ${auditResult.nameMatchPercentage}%`);
console.log(`NPCI Status: ${auditResult.npciStatus}`);

const hasNameWarning = auditResult.issues.some(i => i.title.includes("Name Mismatch"));
const hasNpciWarning = auditResult.issues.some(i => i.title.includes("NPCI"));

if (hasNameWarning && hasNpciWarning) {
  console.log("✓ PASS: Successfully detected subtle name mismatch ('Rajesh Kumar' vs 'Rajesh K').");
  console.log("✓ PASS: Successfully caught unseeded NPCI bank account.");
} else {
  console.error("✗ FAIL: Document auditor missed name mismatch or NPCI trap.");
  process.exit(1);
}

console.log("\n=================================================");
console.log("ALL AUTOMATED TESTS PASSED SUCCESSFULLY! (100%)");
console.log("=================================================");
