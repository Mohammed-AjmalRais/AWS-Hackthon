<<<<<<< HEAD
# JanSetu AI (जनसेतु) 🇮🇳
### Unified AI-Assisted Government Service & Scholarship Copilot for Bharat
**Built for the WeMakeDevs × AWS "First Commit" Hackathon (Bharat Builds Tour 2026)**

[![AWS Stack](https://img.shields.io/badge/AWS-Bedrock%20%7C%20Cedar%20%7C%20SAM%20%7C%20DynamoDB%20%7C%20Amplify-FF9900?logo=amazon-aws&logoColor=white)](https://aws.amazon.com)
[![Next.js](https://img.shields.io/badge/Next.js-16%20Turbopack-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)](https://www.typescriptlang.org)
[![Open Source](https://img.shields.io/badge/Policy%20Engine-AWS%20Cedar-indigo)](https://www.cedarpolicy.com)

---

## 🎯 The Problem
Over **40% of tribal students and underserved citizens** across India miss out on life-changing scholarships and essential government services because:
1. **Scattered Portals:** Information is fragmented across the National Scholarship Portal (NSP), Ministry of Tribal Affairs (MoTA), and 28 distinct state portals.
2. **The "Prerequisite Paradox":** To get a scholarship, a student needs an Income & Caste Certificate; to get those, they need revenue panchanamas. Nobody reveals this dependency tree upfront.
3. **The Silent Rejection Traps:**
   - **Aadhaar Name Discrepancies:** Subtle mismatches between Aadhaar ("Rajesh Kumar Munda") and matriculation marksheets ("Rajesh K Munda") trigger automated portal rejections.
   - **The NPCI Bank Seeding Trap:** Millions of accounts are *Aadhaar Linked* for KYC, but **NOT NPCI Seeded** for Direct Benefit Transfer (DBT/PFMS), causing funds to bounce silently.
4. **Middlemen & Extortion:** Rural citizens travel 30 km to private cyber cafes that charge ₹200–₹400 for free government services.

---

## 💡 The Solution: JanSetu AI
JanSetu AI is a **GPS and Pre-Flight Audit Flight Deck** for Indian civic services:
- **Instant Cedar Policy Eligibility:** Evaluates candidate profiles against official Ministry gazettes using **AWS Cedar** declarative policies—eliminating LLM hallucination on legal income/age thresholds.
- **Pre-Flight Document & NPCI Seeding Scanner:** Detects name/DOB mismatches before portal submission and generates a 1-click **NPCI Bank Seeding Mandate Form (Annexure I)** to take to the branch.
- **Visual Prerequisite Dependency Tree:** Maps the complete chain: `Identity Proof → Caste/Income Certificate → Bonafide → Scholarship → PFMS DBT Credit`.
- **Offline Navigator & Fee Transparency Guard:** Directory of verified CSC and Tehsildar counters, stating the statutory legal fee (₹0 for scholarships, ₹25 for certificates) to prevent cyber cafe extortion.
- **Vernacular Voice & Text Copilot:** Powered by **Amazon Bedrock (Claude 3.5 Sonnet)** with real-time speech-to-text and read-aloud in English and Hindi.
- **1-Click Application Dossier:** Generates a clean, printable single-page submission card for students and CSC operators.

---

## 🏗️ Technical Architecture & AWS Tech Stack

```
                                  +---------------------------------------+
                                  |            CLIENT BROWSER             |
                                  | Next.js 16 + Tailwind + Web Speech UI |
                                  | (English / Hindi Vernacular Support)  |
                                  +-------------------+-------------------+
                                                      |
                                                      v HTTPS
+---------------------------------------------------------------------------------------------------------+
|                                      AWS CLOUD / LOCALSTACK RUNTIME                                     |
|                                                                                                         |
|   +------------------------------------+               +--------------------------------------------+   |
|   |         API GATEWAY / REST         |               |              AWS AMPLIFY                   |   |
|   |   /evaluate  |  /chat  |  /audit   |               | Live Global CDN Hosting & SSR Deployment   |   |
|   +-----------------+------------------+               +--------------------------------------------+   |
|                     |                                                                                   |
|         +-----------+-----------+                                                                       |
|         v                       v                                                                       |
|   +--------------------+  +--------------------+  +-------------------------------------------------+   |
|   | AWS LAMBDA         |  | AWS LAMBDA         |  | AWS CEDAR POLICY ENGINE (Open Source)           |   |
|   | Document Auditor & |  | Bedrock Assistant  |  | Deterministic rule validation                   |   |
|   | NPCI Verifier      |  | & RAG Dispatcher   |  | cedar/policies/scholarships.cedar               |   |
|   +--------------------+  +---------+----------+  | cedar/policies/certificates.cedar               |   |
|                                     |             +-------------------------------------------------+   |
|                                     v                                                                   |
|   +--------------------------------------------+  +-------------------------------------------------+   |
|   | AMAZON BEDROCK (Foundation Models)         |  | AMAZON DYNAMODB (Serverless Single Table)       |   |
|   | Anthropic Claude 3.5 Sonnet / Titan        |  | JanSetuSchemes & JanSetuDossiers                |   |
|   | Vernacular RAG over Government Gazettes    |  | Scales to zero with zero idle cost              |   |
|   +--------------------------------------------+  +-------------------------------------------------+   |
+---------------------------------------------------------------------------------------------------------+
```

### Why this architecture qualifies for all 3 Hackathon Prizes:
1. **Ship It Track (1st Prize - ₹2,00,000):** Deployed live with AWS Amplify, Lambda, Bedrock, and DynamoDB.
2. **Build It Track (2nd Prize - ₹1,50,000):** Runs 100% locally with open-source **AWS Cedar** policies and **AWS SAM CLI / LocalStack** (`template.yaml`) without needing an AWS bill or credit card.
3. **Best UI Track (3rd Prize - ₹1,00,000):** High-contrast, mobile-first civic design system with live Cedar policy inspectors, visual dependency trees, speech synthesis, and 1-click test personas.

---

## ⚡ Quick Start (Local Development)

### Prerequisites
- Node.js 18+ (Tested on v24)
- npm 10+

### 1. Clone & Install
```bash
git clone https://github.com/your-repo/first_commit.git
cd first_commit
npm install
```

### 2. Environment Configuration (Optional)
The application includes a **Zero-Fail Fallback Engine**. It runs out of the box with zero external configuration! If you want to connect live to AWS Bedrock:
```bash
cp .env.example .env.local
# Add your AWS credentials:
# AWS_ACCESS_KEY_ID=xxx
# AWS_SECRET_ACCESS_KEY=xxx
# AWS_REGION=us-east-1
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🧪 Automated Testing
Run the logic verification suite:
```bash
node scripts/test-standalone.mjs
```

---

## 🎤 3-Minute Hackathon Demo Script (For Judges)

1. **Minute 0:00 - The Hook (40 seconds):**
   - *"Did you know that over 40% of tribal and rural students who apply for scholarships get rejected not because they aren't poor or meritorious, but because of silent clerical mismatches like an unseeded NPCI bank account or an initial difference on their marksheet? We built JanSetu AI to fix this."*
2. **Minute 0:40 - The Cedar Policy Engine (50 seconds):**
   - Click **'Quick Demo: Rajesh (ST)'**.
   - Show how the **AWS Cedar Engine** evaluates legal criteria deterministically: click *'Inspect Cedar Policy Code'* to show the exact `.cedar` file and passed clauses.
3. **Minute 1:30 - Document Pre-Flight Audit (40 seconds):**
   - Switch to **Document Audit & NPCI** tab.
   - Show the detected 78% name match and the critical NPCI unseeded warning.
   - Click **'Download Form'** to show the pre-filled official RBI/NPCI Mandate.
4. **Minute 2:10 - Offline Navigator & Bedrock Copilot (30 seconds):**
   - Switch to **Offline & Fee Guard** tab: show the statutory ₹0/₹25 fee alert to protect citizens from extortion.
   - Switch to **Bedrock AI Copilot**: ask via voice or click a quick prompt to demonstrate real-time vernacular guidance.
5. **Minute 2:40 - The 1-Click Dossier & Close (20 seconds):**
   - Click **Application Dossier**: click *'Print'* to show the verified single-page submission card.
   - Conclude: *"JanSetu AI bridges the last mile for Bharat's students using AWS Cedar and Amazon Bedrock."*

---

## 📜 License
Built with ❤️ for Bharat during the WeMakeDevs × AWS Bharat Builds Tour 2026.
Licensed under the Apache 2.0 License.
=======
# AWS-Hackthon
>>>>>>> ba47f05ce9909aa2a9af6085feba36a94a88186f
