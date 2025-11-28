import type { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  console.log("langflow-chat invoked with body:", event.body);

  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ok: true,
      echo: event.body ? JSON.parse(event.body) : null,
    }),
  };
};
