// netlify/functions/langflow-chat.ts
import type { Handler } from "@netlify/functions";

const FLOW_URL =
  "https://langflow-b2pn.sliplane.app/api/v1/run/bdb4b66d-00b1-4f98-8d31-c207b67b6ecf";

// Simple fallback session ID generator (no crypto)
function generateSessionId(): string {
  return (
    "sess_" +
    Date.now().toString(36) +
    "_" +
    Math.random().toString(36).slice(2)
  );
}

// Optional timeout wrapper
async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs = 20000
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const apiKey = process.env.LANGFLOW_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "Missing LANGFLOW_API_KEY in environment",
        }),
      };
    }

    const body = event.body ? JSON.parse(event.body) : {};
    const userMessage: string = body.message ?? "hello from Netlify";

    const sessionId: string =
      body.session_id ??
      (globalThis.crypto?.randomUUID
        ? globalThis.crypto.randomUUID()
        : generateSessionId());

    const payload = {
      input_type: "chat",
      output_type: "chat",
      input_value: userMessage,
      session_id: sessionId,
    };

    // Call Langflow (with timeout fallback)
    let lfResponse: Response;
    try {
      lfResponse = await fetchWithTimeout(
        FLOW_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
          },
          body: JSON.stringify(payload),
        },
        20000
      );
    } catch (err: any) {
      if (err?.name === "AbortError") {
        return {
          statusCode: 504,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ error: "Langflow request timed out" }),
        };
      }

      return {
        statusCode: 502,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "Error calling Langflow",
          details: err?.message ?? String(err),
        }),
      };
    }

    const text = await lfResponse.text();

    // JSON parse check
    let json: any;
    try {
      json = JSON.parse(text);
    } catch {
      return {
        statusCode: lfResponse.status || 502,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "Non-JSON response from Langflow",
          raw: text.slice(0, 400),
        }),
      };
    }

    if (!lfResponse.ok) {
      return {
        statusCode: lfResponse.status,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "Langflow error",
          details: json,
        }),
      };
    }

    // ---- FIXED: Extract EXACTLY ONE clean answer ----
    const rootOutput =
      json?.outputs?.[0]?.outputs?.[0] ??
      json?.outputs?.[0] ??
      null;

    let messageText: string | null = null;

    if (rootOutput) {
      // 1) Standard Langflow ChatOutput
      if (typeof rootOutput?.artifacts?.message === "string") {
        messageText = rootOutput.artifacts.message;
      }
      // 2) results.message array
      else if (
        Array.isArray(rootOutput?.results?.message) &&
        typeof rootOutput.results.message[0]?.message === "string"
      ) {
        messageText = rootOutput.results.message[0].message;
      }
      // 3) outputs.message.message
      else if (typeof rootOutput?.outputs?.message?.message === "string") {
        messageText = rootOutput.outputs.message.message;
      }
    }

    if (!messageText) {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error:
            "Could not extract ChatOutput message. Check Langflow wiring.",
        }),
      };
    }

    // ---- CLEAN FINAL OUTPUT (markdown-friendly) ----
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: json.session_id ?? sessionId,
        message: messageText, // ONLY ONE FINAL ANSWER
      }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Internal error in langflow-chat function",
        details: err?.message ?? String(err),
      }),
    };
  }
};
