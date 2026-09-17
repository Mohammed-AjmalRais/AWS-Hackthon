// ==============================================================================
// AWS Cedar Policy: Essential Citizen Certificates
// Open Source Policy Definition for JanSetu AI
// ==============================================================================

// 1. Caste / Community Certificate (ST/SC/OBC)
permit(
    principal,
    action == Action::"IssueCertificate",
    resource == Certificate::"Caste_Certificate"
)
when {
    (principal.category in ["ST", "SC", "OBC"]) &&
    principal.hasPaternalCasteRecord == true
};

// 2. Income & Asset Certificate (Tahsil / Revenue Dept)
permit(
    principal,
    action == Action::"IssueCertificate",
    resource == Certificate::"Income_Certificate"
)
when {
    principal.hasValidAddressProof == true &&
    principal.hasSalarySlipOrITROrSelfDeclaration == true
};

// 3. Economically Weaker Section (EWS) Certificate
permit(
    principal,
    action == Action::"IssueCertificate",
    resource == Certificate::"EWS_Certificate"
)
when {
    principal.category == "General" &&
    principal.annualFamilyIncome <= 800000 &&
    principal.agriculturalLandAcres <= 5.0 &&
    principal.residentialFlatSqFt <= 1000
};

// 4. OBC Non-Creamy Layer (NCL) Certificate
permit(
    principal,
    action == Action::"IssueCertificate",
    resource == Certificate::"OBC_NCL_Certificate"
)
when {
    principal.category == "OBC" &&
    principal.annualFamilyIncome <= 800000
};

// 5. Domicile / Residence Certificate
permit(
    principal,
    action == Action::"IssueCertificate",
    resource == Certificate::"Domicile_Certificate"
)
when {
    principal.residenceYearsInState >= 5 ||
    principal.hasParentalLandRecordInState == true
};

// 6. National Disability Identity Card (UDID) / Disability Certificate
permit(
    principal,
    action == Action::"IssueCertificate",
    resource == Certificate::"UDID_Certificate"
)
when {
    principal.isPersonWithDisability == true &&
    principal.disabilityPercentage >= 40
};
