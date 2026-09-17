# JanSetu AI (जनसेतु) — Complete Architectural Blueprint & Contributor Guide 🇮🇳

> **WeMakeDevs × AWS Bharat Builds Tour — "First Commit" Hackathon 2026**  
> *Track Eligibility:* Dual-Threat Compliance for **Ship It** (Cloud Deployed), **Build It** (Open Source AWS Stack), and **Best UI** (Accessible Citizen Experience).

---

## 1. Executive Project Overview & Problem Statement

### 1.1 The Ground Reality: The Scholarship & Certificate "Rejection Funnel"
Over **40% of tribal students and underserved citizens** across India fail to access government scholarships, welfare schemes, and statutory certificates. The barrier is not a lack of entitlement; it is a brutal **clerical and information asymmetry funnel**:

```
[100% Eligible Students]
       ↓ 40% drop: Information scattered across 50+ central & state portals
[60% Attempt to Apply]
       ↓ 30% drop: The "Prerequisite Trap" (Missing/expired Income, Caste, or Domicile certificates)
[30% Submit Forms]
       ↓ 15% rejected: Silent clerical mismatches (Aadhaar name mismatch, Unseeded Bank Account)
[15% Await Funds]
       ↓ 5% lost: Application stuck at College Nodal Officer (INO) level with zero visibility
[10% Actually Receive Scholarship via Direct Benefit Transfer]
```

### 1.2 The Real-World Pain Points Solved
1. **The Prerequisite Paradox:** To apply for a Post-Matric scholarship, a student needs an Income Certificate and Caste Validity. To get an Income Certificate, they need a Ration Card and Land Record (RoR). Citizens are never told this dependency chain upfront.
2. **The "NPCI Seeding" Trap:** Banks tell students *"your Aadhaar is linked to your account."* However, scholarship DBT strictly requires **Aadhaar Seeding on the NPCI Mapper**, an entirely separate banking protocol. Unseeded accounts silently fail at the treasury stage.
3. **Clerical Name Discrepancies:** National Scholarship Portal (NSP) e-KYC automatically rejects forms with minor character or initial divergences (e.g., *"Rajesh K Munda"* on 10th marksheet vs *"Rajesh Kumar Munda"* on Aadhaar).
4. **Middlemen & Cyber Cafe Extortion:** Rural citizens travel 30–50 km to private internet cafes that illegally charge ₹200–₹500 for government services that are statutorily **₹0 (Free)** or capped at **₹25**.

### 1.3 The JanSetu AI Solution
JanSetu AI serves as a **Pre-Flight Audit Flight Deck & Civic Copilot**:
* **Deterministic AWS Cedar Policies:** Evaluates eligibility with zero hallucination.
* **Pre-Flight Document & NPCI Seeding Scanner:** Detects clerical errors before submission and generates a downloadable **NPCI Bank Seeding Mandate Form (Annexure I)**.
* **Visual Prerequisite Dependency Tree:** Maps the step-by-step certificate path.
* **Offline Center & Fee Transparency Navigator:** Protects citizens with statutory fee limits and physical center guidance.
* **Amazon Bedrock Vernacular Copilot:** Speech-to-text and read-aloud guidance in English, Hindi, and regional languages.
* **1-Click Application Dossier:** Produces a verified, printable single-page submission card.

---

## 2. System Architecture & Component Design

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

### 2.1 The Architectural Principle: Decoupling Policy from AI Reasoning
A foundational flaw in naive AI civic tech is letting an LLM decide who gets a scholarship. If an LLM hallucinates an income cutoff, a poor student is denied education. 
* **AWS Cedar Policy Engine** handles 100% of the deterministic legal logic (income ceilings, caste quotas, age cutoffs).
* **Amazon Bedrock (Claude 3.5 Sonnet)** handles translation, empathy, dialogue, and plain-language explanation of complex gazettes.

---

## 3. Technology Stack & Directory Structure

### 3.1 Technology Stack
* **Frontend:** Next.js 16 (Turbopack, App Router), React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Canvas Confetti.
* **Deterministic Policy Engine:** AWS Cedar Open-Source Policy Language (`.cedar` definitions, strict JSON schemas, TypeScript/Wasm evaluator).
* **AI & Conversational RAG:** Amazon Bedrock Runtime (`@aws-sdk/client-bedrock-runtime`), Anthropic Claude 3.5 Sonnet / Amazon Titan, native Web Speech API (SpeechRecognition & SpeechSynthesis).
* **Serverless Backend:** AWS Lambda, AWS API Gateway, Node.js 20.x runtime microservices.
* **Data Storage:** Amazon DynamoDB (`@aws-sdk/client-dynamodb`), Amazon S3 for documents and official bank forms.
* **Local Development & Emulation:** AWS SAM CLI (`template.yaml`), LocalStack (free local serverless testing).
* **Cloud Deployment:** AWS Amplify Hosting (`amplify.yml`), AWS App Runner.

### 3.2 Directory Structure
```
first_commit/
├── amplify.yml                       # AWS Amplify CI/CD hosting build configuration
├── template.yaml                      # AWS SAM serverless infrastructure specification
├── package.json                       # Dependencies (AWS SDKs, Lucide, Tailwind)
├── tsconfig.json                      # Strict TypeScript compiler options
├── README.md                          # Hackathon pitch & quick start guide
├── content.md                         # Master technical documentation & agent guide (this file)
├── cedar/                             # AWS Cedar Policy Engine definitions
│   ├── policies/
│   │   ├── scholarships.cedar         # Cedar policies for Central & State scholarships
│   │   └── certificates.cedar         # Cedar policies for essential citizen certificates
│   └── schema.json                    # Cedar entity types & actions schema
├── scripts/
│   ├── test-standalone.mjs            # Automated logic verification test suite
│   └── test-engine.mjs                # Modular engine integration runner
└── src/
    ├── app/                           # Next.js App Router
    │   ├── layout.tsx                 # Root layout with Geist typography & metadata
    │   ├── page.tsx                   # Main orchestrator page with 6 interactive tabs
    │   ├── globals.css                # Tailwind CSS v4 design tokens
    │   └── api/                       # Serverless API routes
    │       ├── evaluate/route.ts      # Cedar policy evaluation endpoint
    │       ├── chat/route.ts          # Amazon Bedrock conversational endpoint
    │       └── audit/route.ts         # Pre-flight document & NPCI audit endpoint
    ├── components/                    # High-craft civic UI components
    │   ├── Header.tsx                 # Branding, quick demo pills, language toggle
    │   ├── AwsArchitectureModal.tsx   # Live AWS tech stack inspector for judges
    │   ├── EligibilityTab.tsx         # Live profile sliders & Cedar policy code viewer
    │   ├── DocumentAuditTab.tsx       # Name mismatch meter & NPCI mandate generator
    │   ├── PrerequisiteRoadmapTab.tsx # Visual dependency tree & 5-stage lifecycle
    │   ├── OfflineNavigatorTab.tsx    # CSC locator & statutory fee anti-fraud guard
    │   ├── AiCopilotTab.tsx           # Voice-enabled Bedrock conversational assistant
    │   └── ApplicationDossierTab.tsx  # Printable 1-click submission dossier & tracker
    ├── data/                          # Ground-truth datasets & demo personas
    │   ├── schemes.ts                 # 10+ verified schemes with official gazette refs
    │   ├── demoPersonas.ts            # Realistic 1-click test personas for pitches
    │   └── cscDirectory.ts            # Verified offline centers & statutory fee rules
    └── lib/                           # Core business logic & SDK integrations
        ├── cedar/
        │   └── evaluator.ts           # Deterministic Cedar policy evaluation engine
        ├── audit/
        │   └── documentAuditor.ts     # Levenshtein name matcher & NPCI form generator
        └── bedrock/
            └── bedrockClient.ts       # Amazon Bedrock client with resilient RAG fallback
```

---

## 4. Government Data Extraction & Ingestion Pipeline

To ensure the platform remains accurate, JanSetu AI employs an automated ingestion pipeline to extract, structure, and index data from official government portals:

```
[Government Portals & Gazettes]
(NSP, MoTA, e-District, State RTPS)
       │
       ▼
[Automated Scraping & PDF Parser]
(Python / Node script with PyPDF2 / pdfplumber)
       │
       ▼
[Information Extraction & Structuring]
(Rule boundaries: income limits, categories, fees, deadlines)
       │
       ├──────────────────────────────────┐
       ▼                                  ▼
[Cedar Policy Generator]          [Vector RAG Indexer]
(.cedar declarative policies)     (Bedrock Knowledge Base / OpenSearch)
```

### 4.1 Ingestion Sources
1. **National Scholarship Portal (NSP - scholarships.gov.in):**
   - Scheme eligibility criteria, operational guidelines, and state quota notifications.
   - Scheme opening and closing dates, INO verification cutoff calendars.
2. **Ministry of Tribal Affairs (MoTA - tribal.nic.in):**
   - Central Sector Scheme guidelines for Post-Matric ST, Pre-Matric ST, Top Class Education, and National Overseas Scholarship.
3. **State Revenue & e-District Portals (e.g., e-District UP, MahaDBT, SSP Karnataka, JharSewa, Odisha e-District):**
   - Statutory fee schedules under State Right to Public Services Acts (RTSA).
   - Document requirements for Caste, Income, and Domicile certificates.
4. **Reserve Bank of India (RBI) & NPCI Circulars:**
   - Operational guidelines on Aadhaar Payment Bridge System (APBS) and Direct Benefit Transfer (DBT) bank account mandate procedures.

### 4.2 Pipeline Workflow
1. **PDF Gazette Ingestion:** Download official operational notifications published by ministries.
2. **Deterministic Extraction:** Extract numerical income ceilings (e.g., ₹2,50,000 for MoTA Post-Matric), target categories (`ST`, `SC`, `OBC`, `EWS`), and required documents.
3. **Cedar Policy Compilation:** Automatically format criteria into AWS Cedar syntax:
   ```cedar
   permit(principal, action == Action::"ApplyScheme", resource == Scheme::"PostMatric_ST")
   when {
       principal.category == "ST" &&
       principal.annualFamilyIncome <= 250000 &&
       principal.educationLevel in ["11th", "12th", "UG", "PG", "PhD", "Diploma", "Professional"]
   };
   ```
4. **RAG Vectorization:** Chunk FAQ and procedural text into embeddings stored in Amazon OpenSearch or Bedrock Knowledge Bases to support multilingual conversational inquiries.

---

## 5. Detailed Module-by-Module Walkthrough

### 5.1 Deterministic Cedar Policy Engine (`cedar/`, `src/lib/cedar/evaluator.ts`)
* **Purpose:** Evaluates whether a student meets official statutory criteria.
* **Mechanism:** 
  - Takes a `UserProfile` (category, income, education stage, state, gender, held certificates).
  - Evaluates each scheme's Cedar policy conditions.
  - Generates an array of `passedClauses`, `failedClauses`, and calculates an exact `fitScore` (0–100%).
  - Identifies **missing prerequisite documents** (e.g., if a student qualifies for PostMatric_ST but lacks an Income Certificate, it flags the missing certificate as a blocker).
  - Exposes the raw Cedar policy code directly in the UI so judges and technical reviewers can verify the rule logic.

### 5.2 Pre-Flight Document Audit & NPCI Seeding Scanner (`src/lib/audit/documentAuditor.ts`)
* **Purpose:** Eliminates the two primary causes of automated portal rejection.
* **Mechanism:**
  1. **Name Matching Algorithm:** Calculates token-level Levenshtein similarity between the name on Aadhaar and the name on academic marksheets. If an abbreviation or spelling variation is found (e.g., 78% similarity), it generates an advisory and instructs the user to carry a notarized Name Affidavit.
  2. **NPCI Seeding Diagnostic:** Differentiates between *Aadhaar Linking* (standard bank KYC) and *NPCI Seeding* (mapping on the national DBT bridge).
  3. **Mandate Generator:** Dynamically creates the official, pre-filled **NPCI Aadhaar DBT Seeding Mandate Form (Annexure I)** ready for print/download.

### 5.3 Document Prerequisite Tree & 5-Stage Roadmap (`src/components/PrerequisiteRoadmapTab.tsx`)
* **Purpose:** Visualizes the sequential journey of government service access.
* **Mechanism:**
  - Displays a 4-tier visual dependency tree: `Base Identity -> Statutory Certificates -> Institutional Enablers -> Benefit Disbursal`.
  - Breaks down the 5-stage lifecycle:
    1. Pre-Flight Preparation (Self)
    2. Online Portal Submission (NSP / State DBT)
    3. Institute Nodal Officer (INO) Physical Sign-off (College Clerk)
    4. District/State Nodal Officer (DNO/SNO) Sanction
    5. PFMS Treasury Disbursal (Direct into bank account)

### 5.4 Offline Navigator & Fee Transparency Guard (`src/components/OfflineNavigatorTab.tsx`)
* **Purpose:** Bridges the digital divide and protects rural citizens from cyber cafe extortion.
* **Mechanism:**
  - Directory of Common Service Centers (CSCs), Tehsildar offices, MeeSeva, and Bangalore One desks searchable by state and district.
  - Publishes official statutory fees (e.g., ₹0 for scholarships, ₹25–₹30 for certificates).
  - Highlights statutory grievance hotlines (CSC Helpline 1800-3000-3468, NSP Helpdesk 0120-6619540).

### 5.5 Vernacular Voice & Bedrock Copilot (`src/components/AiCopilotTab.tsx`, `src/lib/bedrock/bedrockClient.ts`)
* **Purpose:** Provides voice-first, multilingual civic guidance for citizens with low digital literacy.
* **Mechanism:**
  - Connects to **Amazon Bedrock (Claude 3.5 Sonnet)** with a prompt grounded in official gazettes.
  - Implements a **Zero-Fail Local RAG Fallback**: If AWS credentials are absent or network drops, it immediately falls back to built-in deterministic civic knowledge, ensuring demos never fail.
  - Integrates Web Speech Recognition (Microphone) and Web Speech Synthesis (Read Aloud) in English and Hindi.

### 5.6 1-Click Application Dossier & Tracker (`src/components/ApplicationDossierTab.tsx`)
* **Purpose:** Consolidates all verified data into an actionable, printable summary card.
* **Mechanism:**
  - Generates a clean A4-optimized printable dossier containing verified demographics, eligible scheme codes, document checklists, and submission counter details.
  - Provides a visual application tracker where citizens can monitor their application progress across government tiers.

---

## 6. How Open Source Tools & AWS Infrastructure Contribute

### 6.1 Open Source Contribution (Build It Track)
* **AWS Cedar Policy Language:** Provides an open-source, mathematically provable declarative language for modeling government rules. Removes hardcoded spaghetti code and replaces it with human-readable `.cedar` policy specifications.
* **AWS SAM CLI:** Allows running the entire serverless backend locally on developer machines without cloud accounts or fees (`sam local start-api`).
* **LocalStack:** Simulates AWS DynamoDB, S3, and Lambda locally for zero-cost integration testing.
* **Web Speech API:** Provides native, client-side speech recognition and synthesis without external paid API subscriptions.

### 6.2 AWS Cloud Infrastructure Contribution (Ship It Track)
* **AWS Amplify Hosting:** Manages automated builds, global edge CDN distribution, and continuous deployment directly from Git.
* **Amazon Bedrock:** Provides enterprise-grade access to Anthropic Claude 3.5 Sonnet foundation models, handling complex vernacular nuance, contextual synthesis, and legal gazette summarization.
* **AWS Lambda & API Gateway:** Serverless microservice execution that automatically scales to zero when idle, minimizing costs while handling traffic spikes during scholarship deadline periods.
* **Amazon DynamoDB:** Fully managed NoSQL key-value store maintaining scheme catalogs, CSC directories, and user application dossiers with single-digit millisecond latency.
* **Amazon S3:** Highly durable object storage storing official bank mandate form templates, gazette PDFs, and ephemeral pre-flight document uploads with client-side privacy masking.

---

## 7. Step-by-Step Deployment & Publication Guide

### 7.1 Local Execution (Build It Track - 100% Free)
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run automated logic test suite:**
   ```bash
   node scripts/test-standalone.mjs
   ```
3. **Start local development server:**
   ```bash
   npm run dev
   ```
4. **Access UI:** Open `http://localhost:3000` in Google Chrome or Microsoft Edge.

### 7.2 AWS Cloud Deployment (Ship It Track)
#### Option A: 1-Click AWS Amplify Hosting (Recommended)
1. Push your repository to GitHub.
2. In the [AWS Management Console](https://console.aws.amazon.com/amplify), navigate to **AWS Amplify**.
3. Click **Host web app** and connect your GitHub repository.
4. Amplify will automatically detect the `amplify.yml` file in the root directory.
5. In **Environment Variables**, optionally add:
   - `AWS_REGION`: `us-east-1`
   - `AWS_ACCESS_KEY_ID`: *(Your AWS Access Key)*
   - `AWS_SECRET_ACCESS_KEY`: *(Your AWS Secret Key)*
   - `AWS_BEDROCK_MODEL_ID`: `anthropic.claude-3-5-sonnet-20241022-v2:0`
6. Click **Save and Deploy**. Your live public HTTPS URL will be available in ~3 minutes.

#### Option B: AWS SAM CLI Serverless Deployment
1. Build serverless artifacts:
   ```bash
   sam build
   ```
2. Deploy to AWS Cloud:
   ```bash
   sam deploy --guided
   ```
   Follow the prompts to create the CloudFormation stack, API Gateway, DynamoDB tables, and Lambda functions.

---

## 8. Guide for AI Agents (Antigravity) & Human Contributors

This project is architected for collaborative expansion by autonomous AI agents (such as Antigravity) and human developers.

### 8.1 Guidelines for AI Coding Agents
1. **Maintain Policy Determinism:** Never replace the Cedar evaluation engine with LLM-generated eligibility decisions. Legal thresholds must remain in `cedar/policies/` and `src/lib/cedar/evaluator.ts`.
2. **Preserve Dual-Mode Architecture:** All external AWS cloud service calls (Bedrock, DynamoDB) must maintain zero-fail local fallbacks so offline demos and local testing never throw unhandled runtime exceptions.
3. **Strict Type Safety:** All new schemes, certificate types, and audit inputs must adhere to TypeScript interfaces in `src/data/schemes.ts` and `src/lib/audit/documentAuditor.ts`.

### 8.2 Roadmap for Future Contributors
* **OCR Camera Integration (Amazon Textract):** Build a direct mobile camera upload component that uses Amazon Textract to automatically scan physical Aadhaar cards and marksheets, auto-filling the name mismatch validator.
* **Expanded State Schemes:** Add dedicated Cedar policies for southern and north-eastern state scholarship portals (e.g., SSP Karnataka, Medhabruti Odisha, ePASS Telangana, e-Kalyan Jharkhand).
* **Automated WhatsApp / SMS Notification Gateway:** Integrate Amazon SNS or AWS Pinpoint to dispatch deadline reminders and INO physical verification countdown alerts directly to students' basic mobile phones.
* **Vernacular Audio Prompts:** Expand the text-to-speech audio voice synthesis to support Santali (Ol Chiki), Gondi, and regional dialects for tribal communities.

---

## 9. Hackathon Judging Matrix Alignment & Demo Pitch Script

### 9.1 Judging Rubric Alignment

| Criterion | Hackathon Requirement | How JanSetu AI Delivers |
| :--- | :--- | :--- |
| **01. Idea & Impact** | Real problem solved well. | Targets the 40%+ drop in scholarship disbursals across 250M+ Indian students, eliminating clerical traps and middleman extortion. |
| **02. Built on AWS** | Mandatory usage of AWS stack. | Powered by **AWS Cedar**, **Amazon Bedrock**, **AWS SAM**, **LocalStack**, **DynamoDB**, **S3**, and **Amplify**. |
| **03. Learning** | Show engineering growth. | Demonstrates clean separation of deterministic policy validation (Cedar) from generative natural language reasoning (Bedrock RAG). |
| **04. Execution** | Working software > five broken features. | 100% working prototype, zero build errors, pre-loaded demo personas, automated test verification suite. |
| **05. Best UI** | High craft, accessible, delightful. | Mobile-first civic design system, live Cedar policy code inspector, real-time name similarity meter, voice interaction, 1-click test personas. |

### 9.2 3-Minute Hackathon Demo Script
* **0:00 – 0:40 (The Problem Hook):**  
  *"Over 40% of tribal and rural students who qualify for scholarships get rejected not because they lack merit, but due to silent clerical traps—like an unseeded NPCI bank account or an initial difference on their marksheet. Middlemen charge them ₹300 for free services. We built JanSetu AI to solve this."*
* **0:40 – 1:30 (Cedar Deterministic Engine):**  
  *Click 'Quick Demo: Rajesh (ST)'.*  
  *"Notice how our engine instantly evaluates his eligibility using open-source AWS Cedar policies. Click 'Inspect Cedar Policy Code'—judges can see the exact declarative `.cedar` policy and passed clauses. 0% LLM hallucination."*
* **1:30 – 2:10 (Pre-Flight Document Audit):**  
  *Switch to 'Document Audit & NPCI' tab.*  
  *"Here we catch what government portals don't tell students. It flags the 78% name match and detects that his bank account is KYC-linked but NOT NPCI-seeded. We even provide a 1-click downloadable official bank mandate form for his branch."*
* **2:10 – 2:40 (Offline Navigator & Bedrock Copilot):**  
  *Switch to 'Offline & Fee Guard' tab and 'Bedrock AI Copilot' tab.*  
  *"We protect rural students with our Anti-Extortion Fee Guard (statutory ₹0 fee alert) and provide a vernacular voice assistant powered by Amazon Bedrock Claude 3.5."*
* **2:40 – 3:00 (1-Click Application Dossier):**  
  *Switch to 'Application Dossier' tab and click Print.*  
  *"Finally, the student exports a verified 1-page dossier to carry to their college clerk. JanSetu AI bridges the last mile for Bharat's students using AWS Cedar and Amazon Bedrock."*

---
*Built with ❤️ for Bharat during the WeMakeDevs × AWS Bharat Builds Tour 2026.*
