// src/hooks/useLangflowChat.ts
import { useState, useRef } from "react";

type LangflowReply = string | null;

export function useLangflowChat() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reply, setReply] = useState<LangflowReply>(null);
  const sessionIdRef = useRef<string | null>(null);

  const sendMessage = async (message: string) => {
    const trimmed = message.trim();
    if (!trimmed) return;
    if (loading) return;

    setLoading(true);
    setError(null);
    // optional: keep previous reply instead of nuking it
    // setReply(null);

    try {
      const res = await fetch("/.netlify/functions/langflow-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          // keep session across turns if backend supports it
          session_id: sessionIdRef.current ?? undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          data?.error
            ? `${data.error}${data.details ? `: ${data.details}` : ""}`
            : "Request failed"
        );
        return;
      }

      // stash session id if backend returns one
      if (data.session_id && !sessionIdRef.current) {
        sessionIdRef.current = data.session_id;
      }

      // 🔑 Only take the final message string
      if (typeof data.message === "string") {
        setReply(data.message);
      } else {
        // ultra-fallback so you see *something* if backend changes
        setReply("[No message field returned from Langflow function]");
      }
    } catch (e: any) {
      setError(e?.message ?? "Network error");
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error, reply };
}
