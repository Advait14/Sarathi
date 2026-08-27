import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getSession,
  findUserById,
  getApplicationsByUserId,
  getDatabase,
} from "@/server/db";
import { generateAssistantResponse } from "@/data/aiAssistant";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("sarathi_session")?.value;

    let user;
    if (token) {
      const session = getSession(token);
      if (session) user = findUserById(session.userId);
    }
    if (!user) {
      const db = getDatabase();
      user = db.users[0];
    }

    const applications = getApplicationsByUserId(user.id);
    const app = applications[0];

    const body = await request.json();
    const { query, activeStateKey } = body;

    if (!query) {
      return NextResponse.json({ error: "Query is required." }, { status: 400 });
    }

    // Determine state key from active state or server application state
    const effectiveStateKey =
      activeStateKey || (app ? app.status : "waiting_state");

    let answer: string;

    // 1. If live OpenAI API Key is provided in .env.local
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "your_openai_api_key_here") {
      try {
        const systemPrompt = `You are the Sarathi Journey Citizen AI Guide for the Indian Ministry of Road Transport and Highways (MoRTH) driving licence portal.
Your role is to explain official terms, steps, and procedures (grounded in Central Motor Vehicles Rules, 1989) in clear, calm, accessible English.
Active Citizen Context:
- Name: ${user.name}
- DL Number: ${user.dlNumber}
- Current Stage: ${effectiveStateKey}
- Application Ref: ${app?.applicationNumber ?? "SJ-MCWG-2048"}
Rules:
- Do not invent government policies or fake SLAs.
- Do not claim to perform real-time transactions or make official legal determinations.
- Keep responses concise, well-formatted, and helpful.`;

        const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: process.env.OPENAI_MODEL || "gpt-4o-mini",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: query },
            ],
            temperature: 0.3,
          }),
        });

        if (openaiRes.ok) {
          const aiData = await openaiRes.json();
          answer = aiData.choices?.[0]?.message?.content || generateAssistantResponse(query, effectiveStateKey);
        } else {
          console.warn("OpenAI API call returned error, using fallback engine.");
          answer = generateAssistantResponse(query, effectiveStateKey);
        }
      } catch (err) {
        console.warn("OpenAI fetch failed, falling back to statutory engine:", err);
        answer = generateAssistantResponse(query, effectiveStateKey);
      }
    } else {
      // 2. Built-in Offline CMVR Knowledge Engine
      answer = generateAssistantResponse(query, effectiveStateKey);
    }


    return NextResponse.json({
      success: true,
      query,
      answer,
      context: {
        citizenName: user.name,
        dlNumber: user.dlNumber,
        stateKey: effectiveStateKey,
        applicationRef: app?.applicationNumber ?? "SJ-MCWG-2048",
      },
    });
  } catch (error) {
    console.error("AI Chat API Error:", error);
    return NextResponse.json(
      { error: "Internal server error processing AI response." },
      { status: 500 }
    );
  }
}
