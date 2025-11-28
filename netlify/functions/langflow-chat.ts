// netlify/functions/langflow-chat.ts
import type { Handler } from "@netlify/functions";

const FLOW_URL =
  "https://langflow-b2pn.sliplane.app/api/v1/run/bdb4b66d-00b1-4f98-8d31-c207b67b6ecf";

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
        : require("crypto").randomUUID());

    // This payload is the same as your PowerShell payload
    const payload = {
      input_type: "chat",
      output_type: "chat",
      input_value: userMessage,
      session_id: sessionId,
    };

    const lfResponse = await fetch(FLOW_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    const text = await lfResponse.text();

    // Try to parse JSON from Langflow, but don’t explode if it’s HTML error
    let json: any;
    try {
      json = JSON.parse(text);
    } catch {
      return {
        statusCode: lfResponse.status || 502,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "Non-JSON response from Langflow",
          status: lfResponse.status,
          raw: text.slice(0, 500),
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

    // Extract the actual assistant text from the Langflow structure you pasted
    const lfOutput =
      json?.outputs?.[0]?.outputs?.[0] ??
      json?.outputs?.[0] ??
      null;

    const messageText =
      lfOutput?.artifacts?.message ??
      lfOutput?.results?.message?.text ??
      null;

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: json.session_id ?? sessionId,
        message: messageText,
        raw: json, // keep for debugging, drop later if you want
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
