import { NextRequest, NextResponse } from "next/server";
import { askJanSetuCopilot, ChatMessage } from "@/lib/bedrock/bedrockClient";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query: string = body.query;
    const history: ChatMessage[] = body.history || [];
    const language: "en" | "hi" | "te" | "or" = body.language || "en";

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const response = await askJanSetuCopilot(query, history, language);

    return NextResponse.json({
      success: true,
      ...response
    });
  } catch (error: unknown) {
    return NextResponse.json({
      success: false,
      error: (error as Error)?.message || "Failed to process chat query"
    }, { status: 500 });
  }
}
