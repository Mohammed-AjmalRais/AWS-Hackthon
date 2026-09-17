import { NextRequest, NextResponse } from "next/server";
import { auditCitizenDocuments, DocumentAuditInput, generateNpciMandateForm } from "@/lib/audit/documentAuditor";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input: DocumentAuditInput = body.documentInput;

    if (!input || !input.nameOnAadhaar || !input.nameOnMarksheet) {
      return NextResponse.json({
        error: "nameOnAadhaar and nameOnMarksheet are required fields"
      }, { status: 400 });
    }

    const auditResult = auditCitizenDocuments(input);
    const mandateForm = generateNpciMandateForm(
      input.nameOnAadhaar,
      input.bankName || "State Bank of India",
      "XXXXXXXX1234",
      "XXXX-XXXX-9876"
    );

    return NextResponse.json({
      success: true,
      auditResult,
      mandateFormTemplate: mandateForm
    });
  } catch (error: unknown) {
    return NextResponse.json({
      success: false,
      error: (error as Error)?.message || "Failed to audit documents"
    }, { status: 500 });
  }
}
