export const config = {
  runtime: "nodejs18",
};

const LANGFLOW_URL =
  "https://langflow-b2pn.sliplane.app/api/v1/run/bdb4b66d-00b1-4f98-8d31-c207b67b6ecf";

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const message = body.message ?? body.input ?? "hello";
  const sessionId = body.sessionId ?? crypto.randomUUID();

  const langflowApiKey = process.env.LANGFLOW_API_KEY;
  if (!langflowApiKey) {
    return new Response(
      JSON.stringify({ error: "Missing LANGFLOW_API_KEY in Netlify env" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const payload = {
    input_type: "chat",
    output_type: "chat",
    input_value: message,
    session_id: sessionId,
    // If you tweaked anything in Langflow’s “Code → configuration” section,
    // mirror it here (tweaks, etc). Otherwise this basic shape is fine.
  };

  try {
    const res = await fetch(LANGFLOW_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": langflowApiKey,
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();

    if (!res.ok) {
      // Bubble Langflow error up so we can see it clearly in logs
      return new Response(
        JSON.stringify({
          error: "Langflow returned non-OK status",
          status: res.status,
          body: text,
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    // Try to parse JSON, otherwise return raw text
    try {
      const data = JSON.parse(text);
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch {
      return new Response(
        JSON.stringify({
          error: "Langflow response was not valid JSON",
          body: text,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        error: "Error calling Langflow",
        details: String(err?.message ?? err),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};