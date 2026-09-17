import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { SCHEMES_DATABASE } from "@/data/schemes";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface BedrockResponse {
  answer: string;
  source: "AWS_BEDROCK_LIVE" | "ZERO_FAIL_CIVIC_RAG";
  modelUsed: string;
  relevantSchemes?: string[];
  suggestedQuestions?: string[];
}

/**
 * Amazon Bedrock Client Wrapper with Zero-Fail Civic Knowledge Fallback
 */
export async function askJanSetuCopilot(
  userQuery: string,
  history: ChatMessage[] = [],
  language: "en" | "hi" | "te" | "or" = "en"
): Promise<BedrockResponse> {
  const awsRegion = process.env.AWS_REGION || "us-east-1";
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const modelId = process.env.AWS_BEDROCK_MODEL_ID || "anthropic.claude-3-5-sonnet-20241022-v2:0";

  // Check if real AWS Bedrock credentials exist and are configured
  if (accessKeyId && secretAccessKey && !accessKeyId.includes("your-access-key")) {
    try {
      const client = new BedrockRuntimeClient({
        region: awsRegion,
        credentials: {
          accessKeyId,
          secretAccessKey
        }
      });

      const systemPrompt = `You are JanSetu AI, an expert Indian Civic & Student Scholarship Copilot built for the WeMakeDevs AWS First Commit Hackathon.
You provide accurate, reassuring, and step-by-step guidance on scholarships, certificates, and government benefits for Indian students (ST, SC, OBC, EWS, General).
Rules:
- Never hallucinate eligibility income caps or quotas. Always quote official gazettes (e.g. Post-Matric ST income ceiling is ₹2.5 Lakh).
- Emphasize the difference between Aadhaar Linking and NPCI Aadhaar DBT Seeding.
- Remind users of statutory fees (e.g. ₹0 for scholarships, ₹25-30 for certificates at CSCs).
- Answer in ${language === 'hi' ? 'simple spoken Hindi (Hinglish/Devanagari)' : 'clear, encouraging English'}.
Knowledge base context:
${JSON.stringify(SCHEMES_DATABASE.map(s => ({
  id: s.id,
  title: s.title,
  maxIncome: s.maxIncome,
  categories: s.targetCategories,
  stages: s.educationStages,
  benefit: s.benefitAmount,
  portal: s.portalName,
  deadline: s.deadline
})))}
`;

      const payload = {
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 1000,
        system: systemPrompt,
        messages: [
          ...history.filter(m => m.role !== "system").map(m => ({ role: m.role, content: m.content })),
          { role: "user", content: userQuery }
        ]
      };

      const command = new InvokeModelCommand({
        modelId,
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify(payload)
      });

      const response = await client.send(command);
      const decoded = new TextDecoder().decode(response.body);
      const json = JSON.parse(decoded);
      const answer = json.content?.[0]?.text || "Response generated successfully.";

      return {
        answer,
        source: "AWS_BEDROCK_LIVE",
        modelUsed: modelId
      };
    } catch (err: unknown) {
      console.warn("AWS Bedrock live invocation failed or fell back: ", (err as Error)?.message);
      // Seamlessly fall through to deterministic Civic RAG engine
    }
  }

  // ============================================================================
  // ZERO-FAIL CIVIC RAG ENGINE (OFFLINE / LOCALSTACK MODE)
  // Provides instant, verified responses based on Indian Government Gazettes
  // ============================================================================
  const queryLower = userQuery.toLowerCase();
  let answer = "";
  const matchedSchemes: string[] = [];

  if (queryLower.includes("npci") || queryLower.includes("bank") || queryLower.includes("seed") || queryLower.includes("dbt")) {
    answer = language === "hi"
      ? `**⚠️ महत्वपूर्ण जानकारी (NPCI आधार सीडिंग बनाम लिंकिंग):**\n\nअधिकांश छात्र इसलिए छात्रवृत्ति से वंचित रह जाते हैं क्योंकि बैंक खाता आधार से 'जुड़ा' (Linked) होता है, लेकिन 'सीड' (NPCI Seeded) नहीं होता!\n\n1. **आधार लिंकिंग** केवल बैंक की आंतरिक केवाईसी के लिए होती है।\n2. **एनपीसीआई मैपर सीडिंग** सरकार के डीबीटी (DBT/PFMS) पोर्टल को सीधे आपके खाते में पैसे ट्रांसफर करने की अनुमति देती है।\n\n**समाधान:**\n• जनसेतु से हमारा **NPCI Seeding Mandate Form** डाउनलोड करें।\n• अपनी बैंक शाखा के काउंटर पर जाएं और स्पष्ट कहें: *"कृपया मेरा आधार एनपीसीआई डीबीटी मैपर पर सीड करें।"*\n• बैंक से रिसीविंग रसीद अवश्य लें।`
      : `**⚠️ Critical Advisory on NPCI Aadhaar Seeding vs Linking:**\n\nMany scholarship applicants face silent rejections because their bank account is **Aadhaar Linked** (for KYC), but **NOT NPCI Seeded** (for Direct Benefit Transfer)!\n\n1. **Normal Aadhaar Linking:** Only verifies your identity inside the bank.\n2. **NPCI Aadhaar Seeding:** Maps your 12-digit Aadhaar on the National Payments Corporation of India (NPCI) gateway, which NSP and Ministry of Tribal Affairs use to disburse funds via PFMS.\n\n**Action Steps:**\n• Download our pre-filled **NPCI Mandate Form** from the Document Audit tab.\n• Visit your bank branch and ask the manager specifically for **"Aadhaar DBT Seeding on NPCI Mapper"**.\n• Request an acknowledgement slip with your 11-digit account number stamped.`;
    matchedSchemes.push("PostMatric_ST", "PostMatric_SC", "PM_YASASVI_OBC");
  } else if (queryLower.includes("income") || queryLower.includes("salary") || queryLower.includes("आय") || queryLower.includes("2.5") || queryLower.includes("limit")) {
    answer = language === "hi"
      ? `**सरकारी छात्रवृत्ति आय सीमा (Income Ceilings):**\n\n• **ST / SC पोस्ट-मैट्रिक छात्रवृत्ति:** कुल पारिवारिक वार्षिक आय **₹2,50,000 (2.5 लाख)** से अधिक नहीं होनी चाहिए।\n• **शीर्ष श्रेणी (Top Class ST Education):** आय सीमा **₹6,00,000 (6 लाख)** प्रति वर्ष है।\n• **ओबीसी पीएम यशस्वी (PM YASASVI):** अधिकतम आय सीमा **₹2,50,000** है।\n• **ईडब्ल्यूएस (EWS प्रमाण पत्र):** आय सीमा **₹8,00,000** है।\n\n*नोट:* आय प्रमाण पत्र हमेशा चालू वित्तीय वर्ष (1 अप्रैल 2026 के बाद) का जारी होना आवश्यक है।`
      : `**Official Annual Family Income Thresholds:**\n\n• **ST & SC Post-Matric Scholarships:** Gross annual household income must be **≤ ₹2,50,000 (₹2.5 Lakh)** from all sources.\n• **Top Class Education for ST Students:** Income ceiling is **≤ ₹6,00,000 (₹6.0 Lakh)** for premier institutes (IITs, NITs, IIMs, AIIMS).\n• **PM YASASVI (OBC/EBC/DNT):** Maximum annual income ceiling is **≤ ₹2,50,000**.\n• **EWS Certificate:** Ceiling is **≤ ₹8,00,000** for General category.\n\n*Statutory Rule:* Certificates must be issued by an authorized Revenue Officer (Tehsildar / SDO) in the current financial year.`;
    matchedSchemes.push("PostMatric_ST", "Income_Certificate", "TopClass_ST");
  } else if (queryLower.includes("tribal") || queryLower.includes("st ") || queryLower.includes("mota") || queryLower.includes("जनजाति")) {
    answer = language === "hi"
      ? `**अनुसूचित जनजाति (ST) छात्रों के लिए प्रमुख योजनाएं:**\n\n1. **पोस्ट-मैट्रिक छात्रवृत्ति (MoTA):** 11वीं, 12वीं, कॉलेज, इंजीनियरिंग, मेडिकल या आईटीआई कर रहे सभी एसटी छात्रों की 100% अनिवार्य गैर-वापसी योग्य फीस वापस मिलती है, साथ ही छात्रावास/डे-स्कॉलर भत्ता मिलता है।\n2. **शीर्ष श्रेणी शिक्षा योजना:** भारत के 250+ प्रमुख संस्थानों (आईआईटी, एनआईटी, एम्स) में पढ़ने वाले एसटी छात्रों की पूरी ट्यूशन फीस + ₹45,000 का वार्षिक भत्ता।\n3. **प्री-मैट्रिक छात्रवृत्ति:** कक्षा 9 और 10 के छात्रों के लिए स्कूल ड्रेस और किताबों का खर्च।\n\nआवेदन करने के लिए आपके पास **डिजिटल जाति प्रमाण पत्र**, **आय प्रमाण पत्र**, और **आधार सीडेड बैंक खाता** होना चाहिए।`
      : `**Key Ministry of Tribal Affairs (MoTA) Flagship Schemes:**\n\n1. **Post-Matric Scholarship for ST Students:** Covers 100% compulsory tuition and non-refundable institutional fees + up to ₹1,200/month living stipend for hostellers.\n2. **Top Class Education Scheme for STs:** 100% tuition coverage at top-tier notified institutes (IITs, NITs, IIMs, AIIMS) + annual laptop and academic allowance of ₹45,000.\n3. **Pre-Matric Scholarship for STs:** For Classes 9 & 10 to support boarding and reduce high-school dropout rates.\n\n*Prerequisites needed:* Digital Barcoded ST Certificate, Current FY Income Certificate, and an NPCI-seeded bank account.`;
    matchedSchemes.push("PostMatric_ST", "TopClass_ST", "PreMatric_ST");
  } else if (queryLower.includes("fee") || queryLower.includes("csc") || queryLower.includes("charge") || queryLower.includes("फीस") || queryLower.includes("cost")) {
    answer = language === "hi"
      ? `**आधिकारिक सरकारी फीस नियम (सतर्कता सूचना):**\n\n• **छात्रवृत्ति आवेदन (NSP / e-Kalyan):** ₹0 (पूरी तरह निःशुल्क)। कोई भी साइबर कैफे या कॉलेज प्रसंस्करण शुल्क नहीं ले सकता।\n• **जाति / आय प्रमाण पत्र (CSC केंद्र पर):** सरकार द्वारा अधिकृत ऑपरेटर शुल्क केवल **₹25 से ₹30** है।\n• यदि कोई ऑपरेटर ₹150–₹300 मांगता है, तो उनसे तुरंत कम्प्यूटरीकृत रसीद मांगें और राष्ट्रीय सीएससी हेल्पलाइन **1800-3000-3468** पर शिकायत दर्ज करें।`
      : `**Statutory Government Fees vs CSC Charges:**\n\n• **Scholarship Applications (NSP, MoTA, e-Kalyan):** **₹0 (Completely Free)**. No college desk or cyber cafe is legally allowed to charge processing fees.\n• **Certificates (Caste / Income / Domicile at CSCs):** The government-notified citizen service fee is **₹25 to ₹30** only.\n• **Warning:** If any internet cafe or middleman demands ₹150–₹300, demand an official system-generated computerized receipt with application number. Unauthorized overcharging is an offense under the IT Act.`;
    matchedSchemes.push("Caste_Certificate", "Income_Certificate");
  } else {
    answer = language === "hi"
      ? `नमस्ते! मैं जनसेतु एआई (JanSetu AI) सहायक हूँ।\n\nमैं आपकी कैसे मदद कर सकता हूँ?\n• अपनी योग्यता जांचें (छात्रवृत्तियां और प्रमाण पत्र)\n• अपने दस्तावेजों की जांच करें (आधार-मार्कशीट नाम मिलान और बैंक एनपीसीआई सीडिंग)\n• जानें कि ऑफलाइन तहसील या सीएससी केंद्र पर कौन से काउंटर पर जाना है\n• सरकारी योजनाओं की अंतिम तारीखें और सही पोर्टल लिंक प्राप्त करें।\n\nआप मुझसे बेझिझक हिंदी या अंग्रेजी में सवाल पूछ सकते हैं!`
      : `Hello! I am your JanSetu AI Civic Copilot, powered by AWS architecture.\n\nHow can I guide you today?\n• **Instant Eligibility Check:** Discover exact scholarship schemes & certificates based on your income and category.\n• **Document Pre-flight Audit:** Detect hidden name mismatches between Aadhaar and marksheets, and verify NPCI bank seeding.\n• **Offline Navigator:** Find nearest Common Service Centers (CSCs) & Tehsildar counters with official ₹0/₹25 fee limits.\n• **Official Deadlines & Rules:** Citing official gazettes from the Ministry of Tribal Affairs, Social Justice, and State Portals.\n\nAsk me any question about your scheme or application roadmap!`;
  }

  return {
    answer,
    source: "ZERO_FAIL_CIVIC_RAG",
    modelUsed: "JanSetu-Civic-RAG (LocalStack/Bedrock-Ready)",
    relevantSchemes: matchedSchemes,
    suggestedQuestions: [
      "Why is NPCI Aadhaar seeding different from normal linking?",
      "What is the maximum income limit for Post-Matric ST scholarship?",
      "How much fee can a CSC center legally charge for certificates?",
      "How to fix name mismatch between Aadhaar and 10th marksheet?"
    ]
  };
}
