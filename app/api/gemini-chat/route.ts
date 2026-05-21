import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/session";

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_MESSAGES = 20;
const MAX_HISTORY_TEXT_LENGTH = 4000;

const SYSTEM_PROMPT = `You are ArthSathi, a focused AI finance assistant built into FinanceFlow.

INTRODUCTION: When a user greets you or asks who you are, introduce yourself as:
"Hi! I'm ArthSathi 👋 — your personal finance assistant on FinanceFlow. I can help you with market trends, investments, mutual funds, crypto, tax planning, and all things money. What would you like to know?"

STRICT SCOPE — you ONLY answer questions about:
- Stock markets (NSE, BSE, global indices)
- Mutual funds, SIP, lump sum investing
- Cryptocurrency trends and analysis
- Personal finance: budgeting, savings, debt management
- Tax planning (80C, ELSS, capital gains, ITR)
- Retirement and goal-based investing
- Economic news and its impact on markets
- Loans, EMI planning, interest rates

OFF-TOPIC REFUSAL: If the user asks about anything unrelated to finance or money (e.g. coding, recipes, sports, general knowledge, history, relationships), respond ONLY with:
"I'm ArthSathi, your finance assistant. I can only help with finance-related questions like investments, markets, tax, or budgeting. What financial topic can I help you with?"

RESPONSE RULES:
- Maximum 100 words per response — be concise and direct
- No unnecessary filler phrases like "Great question!" or "Certainly!"
- Use bullet points for lists, avoid walls of text
- End with a one-line disclaimer: *For educational purposes only — not financial advice.*
- Never answer the same question with unrelated information
- Stay strictly on the topic asked`;

function sanitizeHistory(history: unknown) {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .slice(-MAX_HISTORY_MESSAGES)
    .filter(
      (item): item is { role: string; text: string } =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as { role?: unknown }).role === "string" &&
        typeof (item as { text?: unknown }).text === "string"
    )
    .map((item) => ({
      role: item.role === "assistant" ? "model" : "user",
      parts: [
        {
          text: item.text.slice(0, MAX_HISTORY_TEXT_LENGTH),
        },
      ],
    }));
}

export async function POST(req: NextRequest) {
  try {
    let session;
    try {
      session = await getServerSession();
    } catch (sessionError) {
      console.error("Session lookup failed:", sessionError);
      return NextResponse.json(
        { error: "Unable to validate session right now" },
        { status: 500 }
      );
    }

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Invalid request: message is required" },
        { status: 400 }
      );
    }

    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return NextResponse.json(
        { error: "Invalid request: message cannot be empty" },
        { status: 400 }
      );
    }

    if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Message must be at most ${MAX_MESSAGE_LENGTH} characters` },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      return NextResponse.json({
        content: [
          {
            type: "text",
            value:
              "The Gemini API key has not been configured yet. Please add your GEMINI_API_KEY to the .env.local file to enable AI-powered responses.",
          },
        ],
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const formattedHistory = sanitizeHistory(history);
    const chat = model.startChat({ history: formattedHistory });
    const result = await chat.sendMessage(trimmedMessage);
    const responseText = result.response.text();

    return NextResponse.json({
      content: [{ type: "text", value: responseText }],
    });
  } catch (error: unknown) {
    console.error("Gemini API error:", error);

    let errorMessage =
      "Something went wrong while connecting to the AI. Please try again in a moment.";

    if (error instanceof Error) {
      const msg = error.message.toLowerCase();
      if (msg.includes("api_key") || msg.includes("api key")) {
        errorMessage =
          "Invalid API key. Please check your GEMINI_API_KEY configuration.";
      } else if (
        msg.includes("429") ||
        msg.includes("quota") ||
        msg.includes("too many requests")
      ) {
        errorMessage =
          "The AI is receiving too many requests right now. Please wait a few seconds and try again.";
      } else if (msg.includes("404") || msg.includes("not found")) {
        errorMessage =
          "The AI model is currently unavailable. Please try again shortly.";
      }
    }

    return NextResponse.json({
      content: [{ type: "text", value: errorMessage }],
    });
  }
}
