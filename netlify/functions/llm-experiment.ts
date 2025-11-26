// netlify/functions/llm-experiment.ts
import type { Handler } from "@netlify/functions";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MODEL = "gpt-4.1-mini"; 

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  if (!OPENAI_API_KEY) {
    console.error("Missing OPENAI_API_KEY");
    return { statusCode: 500, body: "Server misconfigured" };
  }

  try {
    const body = JSON.parse(event.body || "{}") as {
      messages?: { role: string; content: string }[];
      maxTokens?: number;
    };

    if (!body.messages || !Array.isArray(body.messages)) {
      return { statusCode: 400, body: "Missing messages array" };
    }

    const maxTokens = body.maxTokens ?? 300;

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: body.messages,
        max_tokens: maxTokens,
      }),
    });

    const data = await resp.json();

    if (!resp.ok) {
      console.error("OpenAI error:", resp.status, data);
      return {
        statusCode: 500,
        body: data?.error?.message || "OpenAI request failed",
      };
    }

    const content =
      data?.choices?.[0]?.message?.content?.trim?.() ?? "No response";

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    };
  } catch (err) {
    console.error("llm-experiment error:", err);
    return { statusCode: 500, body: "Internal server error" };
  }
};
