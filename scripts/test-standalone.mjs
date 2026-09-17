// Standalone verification script testing Cedar policy logic and Document audit logic

console.log("=================================================");
console.log("RUNNING JANSETU AI DETERMINISTIC LOGIC AUDIT");
console.log("=================================================\n");

// 1. Cedar Policy Rule Mock
function evaluatePolicy(principal, scheme) {
  const passed = [];
  const failed = [];

  if (scheme.targetCategories.includes("All") || scheme.targetCategories.includes(principal.category)) {
    passed.push(`Category match: ${principal.category}`);
  } else {
    failed.push(`Category mismatch: ${principal.category} not in [${scheme.targetCategories.join(", ")}]`);
  }

  if (principal.annualFamilyIncome <= scheme.maxIncome) {
    passed.push(`Income match: ₹${principal.annualFamilyIncome} <= ₹${scheme.maxIncome}`);
  } else {
    failed.push(`Income ceiling exceeded: ₹${principal.annualFamilyIncome} > ₹${scheme.maxIncome}`);
  }

  return {
    decision: failed.length === 0 ? "ALLOW" : "DENY",
    passed,
    failed
  };
}

const postMatricST = {
  id: "PostMatric_ST",
  maxIncome: 250000,
  targetCategories: ["ST"]
};

// Case A: ST student with 1.8L income
const resA = evaluatePolicy({ category: "ST", annualFamilyIncome: 180000 }, postMatricST);
console.log("Case A (ST, ₹1.8L income):", resA.decision);
if (resA.decision === "ALLOW") console.log("✓ PASS: ST eligible student correctly ALLOWED");
else throw new Error("Case A failed");

// Case B: ST student with 2.8L income (over ceiling)
const resB = evaluatePolicy({ category: "ST", annualFamilyIncome: 280000 }, postMatricST);
console.log("Case B (ST, ₹2.8L income):", resB.decision);
if (resB.decision === "DENY") console.log("✓ PASS: Income ceiling strictly enforced (DENY)");
else throw new Error("Case B failed");

// 2. Name Discrepancy Levenshtein Algorithm
function calculateSimilarity(str1, str2) {
  const s1 = str1.trim().toLowerCase();
  const s2 = str2.trim().toLowerCase();
  if (s1 === s2) return 100;
  const m = s1.length, n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (s1[i - 1] === s2[j - 1] ? 0 : 1));
    }
  }
  return Math.round(((Math.max(m, n) - dp[m][n]) / Math.max(m, n)) * 100);
}

const sim1 = calculateSimilarity("Rajesh Kumar Munda", "Rajesh Kumar Munda");
const sim2 = calculateSimilarity("Rajesh Kumar Munda", "Rajesh K Munda");
console.log(`\nName Similarity exact: ${sim1}%`);
console.log(`Name Similarity abbreviated initial: ${sim2}%`);

if (sim1 === 100 && sim2 > 70 && sim2 < 100) {
  console.log("✓ PASS: Successfully differentiated exact match vs initial expansion mismatch");
} else {
  throw new Error("Similarity algorithm failed");
}

console.log("\n=================================================");
console.log("ALL LOGIC TESTS PASSED 100%!");
console.log("=================================================");
