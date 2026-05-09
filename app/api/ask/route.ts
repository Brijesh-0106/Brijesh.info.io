import { NextRequest } from "next/server";
import Groq from "groq-sdk";
import { PORTFOLIO_CONTEXT } from "@/lib/portfolio-context";

// Force Node.js runtime for Groq SDK compatibility
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!process.env.GROQ_API_KEY) {
    return new Response("API key configuration error", { status: 500 });
  }

  try {
    const { question } = await req.json();

    if (!question || typeof question !== "string") {
      return new Response("Missing question", { status: 400 });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    
    const stream = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: PORTFOLIO_CONTEXT },
        { role: "user", content: question },
      ],
      max_tokens: 300,
      temperature: 0.7,
      stream: true,
    });

  // Convert Groq async iterator to a Web ReadableStream
  const readableStream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }
      } finally {
        controller.close();
      }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Groq API Error:", error);
    return new Response("Error communicating with AI", { status: 500 });
  }
}
