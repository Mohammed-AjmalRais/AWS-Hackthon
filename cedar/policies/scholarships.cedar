// ==============================================================================
// AWS Cedar Policy: Indian Government Scholarships
// Open Source Policy Definition for JanSetu AI
// ==============================================================================

// 1. Post-Matric Scholarship for ST Students (Ministry of Tribal Affairs)
permit(
    principal,
    action == Action::"ApplyScheme",
    resource == Scheme::"PostMatric_ST"
)
when {
    principal.category == "ST" &&
    principal.annualFamilyIncome <= 250000 &&
    (principal.educationLevel in ["11th", "12th", "UG", "PG", "PhD", "Diploma", "Professional"])
};

// 2. Pre-Matric Scholarship for ST Students (Classes IX & X)
permit(
    principal,
    action == Action::"ApplyScheme",
    resource == Scheme::"PreMatric_ST"
)
when {
    principal.category == "ST" &&
    principal.annualFamilyIncome <= 250000 &&
    (principal.educationLevel in ["Class 9", "Class 10"])
};

// 3. National Fellowship and Scholarship for Higher Education of ST Students
permit(
    principal,
    action == Action::"ApplyScheme",
    resource == Scheme::"NationalFellowship_ST"
)
when {
    principal.category == "ST" &&
    principal.annualFamilyIncome <= 600000 &&
    (principal.educationLevel in ["MPhil", "PhD"])
};

// 4. Top Class Education Scheme for ST Students
permit(
    principal,
    action == Action::"ApplyScheme",
    resource == Scheme::"TopClass_ST"
)
when {
    principal.category == "ST" &&
    principal.annualFamilyIncome <= 600000 &&
    (principal.educationLevel in ["UG", "PG"])
};

// 5. Post-Matric Scholarship for SC Students (Ministry of Social Justice)
permit(
    principal,
    action == Action::"ApplyScheme",
    resource == Scheme::"PostMatric_SC"
)
when {
    principal.category == "SC" &&
    principal.annualFamilyIncome <= 250000 &&
    (principal.educationLevel in ["11th", "12th", "UG", "PG", "PhD", "Diploma", "Professional"])
};

// 6. PM YASASVI Post-Matric Scholarship for OBC, EBC & DNT Students
permit(
    principal,
    action == Action::"ApplyScheme",
    resource == Scheme::"PM_YASASVI_OBC"
)
when {
    (principal.category in ["OBC", "EBC", "DNT"]) &&
    principal.annualFamilyIncome <= 250000 &&
    (principal.educationLevel in ["11th", "12th", "UG", "PG", "PhD", "Diploma"])
};

// 7. Begum Hazrat Mahal National Scholarship (Minority Girls)
permit(
    principal,
    action == Action::"ApplyScheme",
    resource == Scheme::"BegumHazratMahal"
)
when {
    principal.gender == "Female" &&
    principal.isMinority == true &&
    principal.annualFamilyIncome <= 200000 &&
    (principal.educationLevel in ["Class 9", "Class 10", "11th", "12th"])
};

// 8. AICTE Pragati Scholarship for Girls in Technical Education
permit(
    principal,
    action == Action::"ApplyScheme",
    resource == Scheme::"AICTE_Pragati"
)
when {
    principal.gender == "Female" &&
    principal.annualFamilyIncome <= 800000 &&
    (principal.educationLevel in ["UG", "Diploma"]) &&
    principal.isTechnicalCourse == true
};

// 9. Central Sector Scheme of Scholarships for College and University Students (Merit-cum-Means)
permit(
    principal,
    action == Action::"ApplyScheme",
    resource == Scheme::"CentralSector_College"
)
when {
    principal.annualFamilyIncome <= 450000 &&
    (principal.educationLevel in ["UG", "PG"]) &&
    principal.marksPercentage >= 80
};
