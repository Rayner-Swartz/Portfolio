// src/components/LangflowChat.tsx
import { useState } from "react";
import { useLangflowChat } from "../hooks/useLangflowChat";

export function LangflowChat() {
  const [input, setInput] = useState("");
  const { sendMessage, loading, error, reply } = useLangflowChat();

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
  };

  return (
    <div className="max-w-xl mx-auto p-4 border rounded-xl space-y-3">
      <textarea
        className="w-full border rounded p-2"
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask the Langflow agent something..."
      />
      <button
        onClick={handleSend}
        disabled={loading}
        className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Send"}
      </button>

      {error && (
        <div className="text-red-500 text-sm whitespace-pre-wrap">
          {error}
        </div>
      )}

      {reply && (
        <pre className="text-sm bg-black/5 p-3 rounded whitespace-pre-wrap">
          {reply}
        </pre>
      )}
    </div>
  );
}
