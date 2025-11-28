// src/hooks/useLangflowChat.ts
import { useState } from "react";

export function useLangflowChat() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reply, setReply] = useState<string | null>(null);

  const sendMessage = async (message: string) => {
    setLoading(true);
    setError(null);
    setReply(null);
    try {
      const res = await fetch("/.netlify/functions/langflow-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Request failed");
        return;
      }

      // adjust depending on how your flow formats output
      setReply(JSON.stringify(data, null, 2));
    } catch (e: any) {
      setError(e?.message ?? "Network error");
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error, reply };
}
