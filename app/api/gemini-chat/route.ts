import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

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
- Maximum 200 words per response — be concise and direct
- No unnecessary filler phrases like "Great question!" or "Certainly!"
- Use bullet points for lists, avoid walls of text
- End with a one-line disclaimer: *For educational purposes only — not financial advice.*
- Never answer the same question with unrelated information
- Stay strictly on the topic asked`;


export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Invalid request: message is required" },
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
      model: "gemini-2.0-flash-lite",
      systemInstruction: SYSTEM_PROMPT,
    });

    // Build conversation history for multi-turn context
    const formattedHistory = Array.isArray(history)
      ? history.map((item: { role: string; text: string }) => ({
          role: item.role === "assistant" ? "model" : "user",
          parts: [{ text: item.text }],
        }))
      : [];

    const chat = model.startChat({ history: formattedHistory });
    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    return NextResponse.json({
      content: [{ type: "text", value: responseText }],
    });
  } catch (error: unknown) {
    console.error("Gemini API error:", error);

    let errorMessage = "Something went wrong while connecting to the AI. Please try again in a moment.";

    if (error instanceof Error) {
      if (error.message.includes("API_KEY") || error.message.includes("API key")) {
        errorMessage = "Invalid API key. Please check your GEMINI_API_KEY configuration.";
      } else if (error.message.includes("429") || error.message.includes("quota") || error.message.includes("Too Many Requests")) {
        errorMessage = "The AI is receiving too many requests right now. Please wait a few seconds and try again.";
      } else if (error.message.includes("404") || error.message.includes("not found")) {
        errorMessage = "The AI model is currently unavailable. Please try again shortly.";
      }
    }

    return NextResponse.json({
      content: [{ type: "text", value: errorMessage }],
    });
  }
}
