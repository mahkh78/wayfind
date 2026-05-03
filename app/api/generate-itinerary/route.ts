import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { ITINERARY_SYSTEM_PROMPT } from "@/lib/prompts/itinerary-system";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 1. Validate input
    const { destination, startDate, endDate, duration, restDays, budget, style, mustDo, inspiration } = body;
    if (!destination || !startDate || !endDate || !duration || budget === undefined || !style) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 2. Initialize Gemini client
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Server misconfiguration: missing API key" }, { status: 500 });
    }
    const ai = new GoogleGenAI({ apiKey });

    // Format user input
    const userMessage = `
Destination: ${destination}
Dates: ${startDate} to ${endDate} (${duration} days)
Budget: €${budget} total
Style: ${style}
Rest Days desired: ${restDays}
${mustDo ? `Must Do: ${mustDo}` : ""}
${inspiration ? `Inspiration: ${inspiration}` : ""}
`;

    // 3. Call model
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userMessage,
      config: {
        systemInstruction: ITINERARY_SYSTEM_PROMPT,
        tools: [{ googleSearch: {} }],
        // We do not use responseMimeType here to ensure the model focuses on grounding.
        // We will robustly parse the JSON from the markdown output.
        temperature: 0.7,
      }
    });

    const text = response.text || "";

    // 4. Robust JSON parsing & Validation
    let parsedJson = null;
    try {
      // Find first { and last }
      const startIdx = text.indexOf('{');
      const endIdx = text.lastIndexOf('}');
      if (startIdx === -1 || endIdx === -1) throw new Error("No JSON object found in response");
      
      const jsonStr = text.substring(startIdx, endIdx + 1);
      parsedJson = JSON.parse(jsonStr);
      
      // Strict schema validation (as requested by user rule 4)
      if (
        !parsedJson.destination || 
        !parsedJson.summary || 
        typeof parsedJson.totalEstimatedCost !== "number" ||
        !Array.isArray(parsedJson.days)
      ) {
         throw new Error("Invalid schema: missing top-level required fields");
      }
      for (const day of parsedJson.days) {
        if (!day.date || !day.label || !Array.isArray(day.entries)) {
          throw new Error("Invalid schema: day object is missing fields");
        }
        for (const entry of day.entries) {
          if (!entry.time || !entry.name || !entry.type || !entry.description || typeof entry.estimatedCost !== "number" || typeof entry.durationMinutes !== "number" || !entry.address || !entry.googleMapsUrl) {
            throw new Error("Invalid schema: entry object is missing fields");
          }
        }
      }
    } catch (e) {
      console.error("Failed to parse or validate Gemini output:", text);
      // Return 500 with the raw text per User Request 4
      return new NextResponse(text, { status: 500, headers: { "Content-Type": "text/plain" } });
    }

    // 5. Extract grounding sources
    let sources: string[] = [];
    try {
      const searchChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      sources = searchChunks
        .map((chunk: any) => chunk.web?.uri)
        .filter((uri: any) => typeof uri === "string");
      sources = [...new Set(sources)]; // deduplicate
    } catch (err) {
      console.error("Failed to extract sources:", err);
    }

    // 6. Return response
    return NextResponse.json({
      itinerary: parsedJson,
      sources,
      model: "gemini-2.5-flash",
      generatedAt: new Date().toISOString()
    });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
