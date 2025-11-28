import type { Handler } from "@netlify/functions";

const LANGFLOW_URL =
  "https://langflow-b2pn.sliplane.app/api/v1/run/bdb4b66d-00b1-4f98-8d31-c207b67b6ecf";

const LANGFLOW_API_KEY = process.env.LANGFLOW_API_KEY || "";

export const handler: Handler = async (event) => {
  console.log("langflow-chat invoked with body:", event.body);

  if (!LANGFLOW_API_KEY) {
    console.error("Missing LANGFLOW_API_KEY env var");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server misconfigured: no LANGFLOW_API_KEY" }),
    };
  }

  let message = "";

  try {
    if (event.body) {
      const parsed = JSON.parse(event.body);
      message = parsed.message ?? "";
    }
  } catch (err) {
    console.error("Failed to parse request body", err);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON body" }),
    };
  }

  try {
    // Timeout after 8 seconds
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(LANGFLOW_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": LANGFLOW_API_KEY,
      },
      body: JSON.stringify({
        input_type: "chat",
        output_type: "chat",
        input_value: message,
        session_id: crypto.randomUUID(),
      }),
      signal: controller.signal,
    }).catch((err) => {
      console.error("Fetch error calling Langflow:", err);
      throw err;
    });

    clearTimeout(timeout);

    const text = await res.text();
    const contentType = res.headers.get("content-type") || "";

    console.log("Langflow status:", res.status);
    console.log("Langflow raw response (first 300):", text.slice(0, 300));

    if (!res.ok) {
      return {
        statusCode: res.status,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          error: "Langflow error",
          status: res.status,
          response: text,
        }),
      };
    }

    // If Langflow gives JSON, pass it through; otherwise wrap as text
    if (contentType.includes("application/json")) {
      return {
        statusCode: 200,
        headers: { "content-type": "application/json" },
        body: text,
      };
    }

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ raw: text }),
    };
  } catch (err: any) {
    console.error("langflow-chat handler error:", err);
    const isAbort =
      err && typeof err === "object" && err.name === "AbortError";

    return {
      statusCode: 504,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        error: isAbort ? "Langflow request timed out" : "Internal error",
      }),
    };
  }
};
