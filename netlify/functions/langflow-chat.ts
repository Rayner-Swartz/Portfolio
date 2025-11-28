// netlify/functions/langflow-chat.ts
import type { Handler } from "@netlify/functions";

const FLOW_URL =
  "https://langflow-b2pn.sliplane.app/api/v1/run/bdb4b66d-00b1-4f98-8d31-c207b67b6ecf";

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: "Method Not Allowed",
      };
    }

    const body = event.body ? JSON.parse(event.body) : {};
    const userMessage: string = body.message ?? "hello world";

    const payload = {
      output_type: "chat",
      input_type: "chat",
      input_value: userMessage,
      session_id: crypto.randomUUID(),
    };

    const resp = await fetch(FLOW_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.LANGFLOW_API_KEY as string,
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return {
        statusCode: resp.status,
        body: JSON.stringify({ error: text }),
      };
    }

    const data = await resp.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err?.message ?? "Unknown error" }),
    };
  }
};
