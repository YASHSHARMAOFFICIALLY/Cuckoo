import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are FinanceFlow AI, a professional financial assistant powered by Google Gemini. You specialize in:
- Latest financial market trends and analysis
- Stock market insights (Indian markets: NSE/BSE, and global markets)
- Mutual funds, SIP strategies, and portfolio management
- Cryptocurrency trends and analysis
- Personal finance: budgeting, savings, emergency funds
- Economic news and their financial implications
- Tax planning, ELSS, and tax-saving instruments
- Retirement planning and long-term wealth creation
- Loan, EMI, and debt management strategies

Guidelines:
- Be concise, accurate, and educational
- Use plain language; avoid unnecessary jargon
- Always add a brief disclaimer that responses are for educational purposes only
- Structure your answers clearly with key points when appropriate
- If asked about real-time prices, clarify you don't have live data but can discuss trends and strategies
- Be conversational but professional`;

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
