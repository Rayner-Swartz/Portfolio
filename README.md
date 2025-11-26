import type { Handler } from "@netlify/functions";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MODEL = "gpt-4.1-mini"; // or whatever you want to use

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  if (!OPENAI_API_KEY) {
    console.error("Missing OPENAI_API_KEY");
    return { statusCode: 500, body: "Server misconfigured" };
  }

  try {
    const { topic, style, rounds } = JSON.parse(event.body || "{}");

    if (!topic || typeof topic !== "string") {
      return { statusCode: 400, body: "Missing topic" };
    }

    // Build whatever prompt you were using before
    const messages = [
      {
        role: "system",
        content: `You are running a debate experiment in style "${style}". Decide the next PRO and CON messages based on the previous rounds.`,
      },
      {
        role: "user",
        content: JSON.stringify({ topic, rounds }),
      },
    ];

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error("OpenAI error:", resp.status, text);
      return { statusCode: 500, body: "OpenAI request failed" };
    }

    const data = await resp.json();

    // Adjust this to whatever shape you want back in the frontend
    const assistantReply =
      data.choices?.[0]?.message?.content ?? "No response from model";

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply: assistantReply }),
    };
  } catch (err) {
    console.error("llm-experiment error:", err);
    return { statusCode: 500, body: "Internal server error" };
  }
};
