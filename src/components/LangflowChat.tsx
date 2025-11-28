// src/components/LangflowChat.tsx
import React, { useState } from "react";
import { useLangflowChat } from "../hooks/useLangflowChat";

export function LangflowChat() {
  const [input, setInput] = useState("");

  // Our custom hook gives us these:
  const { sendMessage, loading, error, reply } = useLangflowChat();

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput("");
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm">
        {!reply && !loading && (
          <p className="text-gray-500 text-center mt-4">
            Ask me anything about a competitor, product, or strategy.
          </p>
        )}

        {reply && (
          <div className="mr-auto max-w-[90%] rounded-lg px-3 py-2 bg-gray-800/70 border border-gray-700 whitespace-pre-wrap">
            {reply}
          </div>
        )}

        {loading && (
          <div className="mr-auto max-w-[60%] rounded-lg px-3 py-2 bg-gray-800/70 border border-gray-700 text-gray-400 text-xs">
            Thinking…
          </div>
        )}

        {error && (
          <div className="mt-2 text-xs text-red-400 whitespace-pre-wrap">
            {error}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-blue-500/20 px-4 py-3 bg-black/60">
        <div className="flex items-end gap-2">
          <textarea
            className="flex-1 bg-black/60 border border-blue-500/30 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
            rows={2}
            placeholder="e.g. Mountain Warehouse"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="h-10 px-4 rounded-lg border border-blue-500/50 bg-blue-500/20 
                       text-sm font-medium hover:bg-blue-500/30 
                       disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
