import React, { useState } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const FLOW_ID = import.meta.env.VITE_LANGFLOW_FLOW_ID;
const HOST_URL = import.meta.env.VITE_LANGFLOW_HOST_URL; // e.g. http://localhost:7860
const API_KEY = import.meta.env.VITE_LANGFLOW_API_KEY;   // WARNING: do NOT expose this in real prod

async function callLangflow(message: string): Promise<string> {
  const res = await fetch(`${HOST_URL}/api/v1/run/${FLOW_ID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({
      output_type: "chat",
      input_type: "chat",
      input_value: message,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Langflow error ${res.status}: ${text}`);
  }

  const data = await res.json();
  console.log("Langflow response:", data); // Debug log

  // Try multiple paths to extract the actual text content
  let content: string;
  
  // Try common response paths
  if (data?.outputs?.[0]?.outputs?.[0]?.results?.message?.text) {
    content = data.outputs[0].outputs[0].results.message.text;
  } else if (data?.outputs?.[0]?.outputs?.[0]?.results?.message) {
    const msg = data.outputs[0].outputs[0].results.message;
    content = typeof msg === 'string' ? msg : msg.text || msg.content || JSON.stringify(msg);
  } else if (data?.outputs?.[0]?.outputs?.[0]?.artifacts?.message) {
    const msg = data.outputs[0].outputs[0].artifacts.message;
    content = typeof msg === 'string' ? msg : msg.text || msg.content || JSON.stringify(msg);
  } else if (data?.text) {
    content = data.text;
  } else if (data?.content) {
    content = data.content;
  } else if (data?.message) {
    const msg = data.message;
    content = typeof msg === 'string' ? msg : msg.text || msg.content || JSON.stringify(msg);
  } else {
    // Fallback: try to find any text field in the response
    content = extractTextFromObject(data) || JSON.stringify(data);
  }

  return content;
}

// Helper function to recursively search for text content
function extractTextFromObject(obj: any): string | null {
  if (typeof obj === 'string') return obj;
  if (!obj || typeof obj !== 'object') return null;
  
  // Check common text fields
  if (obj.text && typeof obj.text === 'string') return obj.text;
  if (obj.content && typeof obj.content === 'string') return obj.content;
  if (obj.message && typeof obj.message === 'string') return obj.message;
  
  // Recursively search in nested objects/arrays
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const result = extractTextFromObject(obj[key]);
      if (result) return result;
    }
  }
  
  return null;
}

// Helper function to format message text with proper line breaks and styling
function formatMessage(text: string): React.ReactNode {
  // Split by lines and process each line
  const lines = text.split('\n');
  
  return lines.map((line, index) => {
    const trimmedLine = line.trim();
    
    // Skip empty lines
    if (!trimmedLine) {
      return <br key={index} />;
    }
    
    // Handle headers (## or #)
    if (trimmedLine.startsWith('## ')) {
      return (
        <div key={index} className="font-semibold text-blue-300 mt-3 mb-2 text-base">
          {trimmedLine.substring(3)}
        </div>
      );
    }
    
    if (trimmedLine.startsWith('# ')) {
      return (
        <div key={index} className="font-bold text-blue-200 mt-4 mb-2 text-lg">
          {trimmedLine.substring(2)}
        </div>
      );
    }
    
    // Handle bullet points (- or *)
    if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
      return (
        <div key={index} className="ml-4 mb-1 flex items-start">
          <span className="text-blue-400 mr-2 mt-1">•</span>
          <span>{trimmedLine.substring(2)}</span>
        </div>
      );
    }
    
    // Handle numbered lists
    const numberedMatch = trimmedLine.match(/^(\d+)\.\s+(.+)$/);
    if (numberedMatch) {
      return (
        <div key={index} className="ml-4 mb-1 flex items-start">
          <span className="text-blue-400 mr-2 font-medium">{numberedMatch[1]}.</span>
          <span>{numberedMatch[2]}</span>
        </div>
      );
    }
    
    // Handle horizontal rules (---)
    if (trimmedLine === '---' || trimmedLine.startsWith('---')) {
      return <hr key={index} className="border-blue-500/30 my-3" />;
    }
    
    // Regular paragraph
    return (
      <div key={index} className="mb-2 leading-relaxed">
        {trimmedLine}
      </div>
    );
  });
}

export default function LangflowChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Don't render if environment variables are not set
  if (!HOST_URL || !FLOW_ID) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-400">
        <div className="text-center">
          <p className="mb-2">⚠️ Langflow configuration missing</p>
          <p className="text-sm">Please check your environment variables</p>
        </div>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const reply = await callLangflow(trimmed);
      const botMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: reply,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? "Unknown error talking to Langflow");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-full flex flex-col bg-transparent">
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm">
        {messages.length === 0 && (
          <div className="text-gray-500">
            Ask about any competitor's products, pricing, or positioning to get started.
          </div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={
              m.role === "user"
                ? "self-end max-w-[80%] bg-blue-600 text-white rounded-lg px-3 py-2 ml-auto"
                : "self-start max-w-[80%] bg-gray-800 text-gray-100 rounded-lg px-3 py-2 border border-blue-500/30"
            }
          >
            <div className="whitespace-pre-wrap">
              {formatMessage(typeof m.content === 'string' ? m.content : JSON.stringify(m.content))}
            </div>
          </div>
        ))}
        {loading && (
          <div className="self-start max-w-[80%] bg-gray-800 text-gray-100 rounded-lg px-3 py-2 border border-blue-500/30">
            <div className="flex items-center space-x-2">
              <div className="animate-pulse">🤔</div>
              <span>Analyzing competitor...</span>
            </div>
          </div>
        )}
        {error && (
          <div className="text-red-400 text-xs bg-red-900/20 border border-red-500/30 rounded-lg px-3 py-2">
            {error}
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="border-t border-blue-500/30 px-3 py-2 flex gap-2 items-center bg-black/60"
      >
        <input
          className="flex-1 bg-transparent border border-blue-500/40 rounded-md px-3 py-2 text-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          placeholder="Ask about a competitor..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white disabled:opacity-50 hover:bg-blue-700 transition-colors"
        >
          {loading ? "Thinking…" : "Send"}
        </button>
      </form>
    </div>
  );
}