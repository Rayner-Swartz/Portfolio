import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "ai"; text: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "ai", text: "Hi! Ask me about Rayner’s projects." },
  ]);
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  async function handleSend() {
    const q = input.trim();
    if (!q) return;
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setInput("");
    // mock “LLM” reply (replace with real fetch later)
    setTyping(true);
    setTimeout(() => {
      const canned = [
        "I can summarize any project—try “Summarize the GAN project.”",
        "Want to see image segmentation demos?",
        "I can link you to the Projects section below.",
        "Ask me about tech used: PyTorch, Keras, LangChain, etc.",
      ];
      const reply = canned[Math.floor(Math.random() * canned.length)];
      setMsgs((m) => [...m, { role: "ai", text: reply }]);
      setTyping(false);
    }, 900);
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSend();
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 px-4 py-2 rounded-xl
                     bg-black/60 border border-blue-500/40 backdrop-blur
                     gradient-text animate-gradient shadow-lg"
          aria-label="Open AI assistant"
        >
          Ask the AI
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[320px] sm:w-[360px]
                        rounded-2xl border border-blue-500/30 bg-black/70 backdrop-blur
                        shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3 border-b border-blue-500/20">
            <div className="text-sm font-semibold gradient-text animate-gradient">Portfolio Assistant</div>
            <button onClick={() => setOpen(false)} className="text-gray-300 hover:text-blue-400">✕</button>
          </div>

          <div ref={listRef} className="h-[280px] overflow-y-auto px-3 py-3 space-y-2">
            {msgs.map((m, i) => (
              <div key={i}
                   className={m.role === "user"
                     ? "ml-auto max-w-[80%] bg-blue-600/20 border border-blue-500/40 rounded-lg px-3 py-2 text-sm"
                     : "mr-auto max-w-[85%] bg-white/5 border border-blue-500/20 rounded-lg px-3 py-2 text-sm text-gray-200"}>
                {m.text}
              </div>
            ))}
            {typing && (
              <div className="mr-auto max-w-[85%] bg-white/5 border border-blue-500/20 rounded-lg px-3 py-2 text-sm text-gray-200">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-400/80 animate-pulse"></span>
                <span className="inline-block w-2 h-2 rounded-full bg-blue-400/60 animate-pulse ml-1"></span>
                <span className="inline-block w-2 h-2 rounded-full bg-blue-400/40 animate-pulse ml-1"></span>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-blue-500/20">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder="Ask about projects, tech, etc."
                className="flex-1 bg-transparent outline-none text-sm
                           border border-blue-500/30 rounded-lg px-3 py-2
                           focus:border-blue-400"
              />
              <button
                onClick={handleSend}
                className="px-3 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
