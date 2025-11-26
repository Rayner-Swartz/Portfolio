import { useState } from "react";

type Msg = { role: "system" | "user" | "assistant"; content: string };
type Round = { debator: string; refuter: string };

export default function LLMExperiment() {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("baseline");
  const [rounds, setRounds] = useState<Round[]>([]);
  const [loading, setLoading] = useState(false);
  const [judging, setJudging] = useState(false);
  const [error, setError] = useState("");
  const [verdict, setVerdict] = useState<string>("");

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const MODEL = "gpt-4.1-nano";
  const MAX_ROUNDS = 5;

  const styles: Record<string, { debator: string; refuter: string; label: string }> = {
    baseline: {
      debator:
        "You are the DEBATOR (PRO). Argue FOR the topic exactly as written. Be persuasive and clear. 4–6 sentences. Add at least ONE NEW point each turn. Do NOT repeat previously stated claims unless you briefly acknowledge them as already addressed.",
      refuter:
        "You are the REFUTER (CON). Argue AGAINST the topic exactly as written. Be calm, logical, and precise. 5–8 sentences. Directly rebut the Debator’s points. Add at least ONE NEW counterpoint each turn. Avoid repeating earlier material.",
      label: "Baseline",
    },
    philosophical: {
      debator:
        "You are the DEBATOR (PRO). Use philosophy/ethics/abstract reasoning. 4–6 sentences. Include at least ONE NEW idea per turn; avoid repetition except brief acknowledgements.",
      refuter:
        "You are the REFUTER (CON). Use rationalist or existential critique. 5–8 sentences. Rebut point-by-point. Include at least ONE NEW angle per turn; avoid repetition.",
      label: "Philosophical",
    },
    showman: {
      debator:
        "You are the DEBATOR (PRO). Grand stage, witty, energetic. 4–6 sentences. Add a new compelling angle each turn; no repetitive beats. One punchy closer.",
      refuter:
        "You are the REFUTER (CON). Sharp-tongued, humorous, cutting logic. 5–8 sentences. Rebut point-by-point, introduce something NEW each turn; don’t rehash.",
      label: "Showman",
    },
  };

  async function callChat(messages: Msg[], maxTokens: number) {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        max_completion_tokens: maxTokens,
        response_format: { type: "text" },
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error?.message || `HTTP ${res.status}`);
    return data?.choices?.[0]?.message?.content?.trim?.() ?? "";
  }

  function FormattedText({ text }: { text: string }) {
    const blocks = text.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
    return (
      <div className="text-gray-200 leading-relaxed space-y-3">
        {blocks.map((block, i) => {
          const lines = block.split(/\n/);
          const bulletLines = lines.filter((l) => /^\s*[-•*]\s+/.test(l)).length;
          if (bulletLines >= Math.ceil(lines.length / 2)) {
            const items = lines
              .map((l) => l.replace(/^\s*[-•*]\s+/, "").trim())
              .filter(Boolean);
            return (
              <ul key={i} className="list-disc list-inside space-y-1">
                {items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            );
          }
          const sentences = block
            .split(/(?<=[.!?])\s+/)
            .map((s) => s.trim())
            .filter(Boolean);
        return (
            <div key={i} className="space-y-2">
              {sentences.map((s, k) => (
                <p key={k}>{s}</p>
              ))}
            </div>
          );
        })}
      </div>
    );
  }

  // Verdict renderer: section-aware, bullet grouping, color tags
  function VerdictText({ text }: { text: string }) {
    // Normalize: remove stray "•" lines, collapse excess blank lines
    const cleaned = text
      .split("\n")
      .map((ln) => (ln.trim() === "•" ? "" : ln)) // drop lone dots
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    // Parse into sections: Summary / Strengths / Weaknesses / Winner / Score
    const lines = cleaned.split("\n").map((l) => l.trim());
    type Section = { title: string; items: string[] };
    const sections: Section[] = [];
    let current: Section | null = null;

    const isHeading = (l: string) =>
      /^(Summary|Strengths|Weaknesses|Winner:|Score:)\b/i.test(l);

    for (const l of lines) {
      if (!l) continue;
      if (isHeading(l)) {
        current = { title: l.replace(/\s+$/, ""), items: [] };
        sections.push(current);
        continue;
      }
      if (!current) {
        // If model forgot heading, place under "Summary"
        current = { title: "Summary", items: [] };
        sections.push(current);
      }
      // treat hyphen bullets and plain lines; ignore stand-alone bullet symbols
      current.items.push(l.replace(/^\s*[-•*]\s?/, "").trim());
    }

    // inline tag renderer for <DEB>…</DEB> and <REF>…</REF> and label colorization
    const renderInline = (content: string, key: string) => {
      // Color Debator/Refuter label prefix if present: "Debator — "
      const labelMatch = content.match(/^(Debator|Refuter)\s*—\s*/i);
      let body = content;
      let labelNode: React.ReactNode | null = null;
      if (labelMatch) {
        const label = labelMatch[1];
        body = content.slice(labelMatch[0].length);
        labelNode = (
          <span className={`font-semibold ${label.toLowerCase() === "debator" ? "text-blue-400" : "text-pink-400"}`}>
            {labelMatch[0]}
          </span>
        );
      }

      // Replace <DEB>…</DEB> and <REF>…</REF> with colored spans
      const parts: React.ReactNode[] = [];
      let rest = body;
      let idx = 0;
      const tagRe = /<(DEB|REF)>(.*?)<\/\1>/gi;
      while (true) {
        const m = tagRe.exec(rest);
        if (!m) {
          if (rest) {
            // Auto-colorize standalone "Debator" and "Refuter" words if not already wrapped
            const autoColorized = rest.replace(
              /\b(Debator|Refuter)\b/g, 
              (_match, word) => {
                const color = word.toLowerCase() === "debator" ? "text-blue-400" : "text-pink-400";
                return `<span class="${color}">${word}</span>`;
              }
            );
            
            if (autoColorized !== rest) {
              // If we made changes, parse the HTML-like spans
              const htmlParts = autoColorized.split(/(<span class="[^"]*">[^<]*<\/span>)/);
              htmlParts.forEach((part, _i) => {
                const spanMatch = part.match(/<span class="([^"]*)">(.*?)<\/span>/);
                if (spanMatch) {
                  parts.push(
                    <span key={`${key}-auto-${idx++}`} className={spanMatch[1]}>
                      {spanMatch[2]}
                    </span>
                  );
                } else if (part) {
                  parts.push(<span key={`${key}-text-${idx++}`}>{part}</span>);
                }
              });
            } else {
              parts.push(<span key={`${key}-tail-${idx++}`}>{rest}</span>);
            }
          }
          break;
        }
        const [full, tag, inner] = m;
        const before = rest.slice(0, m.index ?? 0);
        if (before) parts.push(<span key={`${key}-b-${idx++}`}>{before}</span>);
        parts.push(
          <span
            key={`${key}-tag-${idx++}`}
            className={tag.toUpperCase() === "DEB" ? "text-blue-400" : "text-pink-400"}
          >
            {inner}
          </span>
        );
        rest = rest.slice((m.index ?? 0) + full.length);
        tagRe.lastIndex = 0; // Reset for next iteration
      }

      return (
        <div key={key}>
          {labelNode}
          <span>{parts}</span>
        </div>
      );
    };

    return (
      <div className="text-gray-200 leading-relaxed space-y-4">
        {sections.map((sec, i) => {
          const title = sec.title.replace(/:$/, "");
          const isWinner = /^Winner\b/i.test(sec.title);
          const isScore = /^Score\b/i.test(sec.title);
          const isSummary = /^Summary\b/i.test(sec.title);
          const isStrengthsOrWeaknesses = /^(Strengths|Weaknesses)\b/i.test(sec.title);

          if (isWinner || isScore || isSummary) {
            // Single-line conclusion sections and summary - no bullets, combine all items into paragraphs
            return (
              <div key={`sec-${i}`} className="space-y-2">
                <h4 className="text-gray-100 font-bold">{title}</h4>
                <div className="space-y-1">
                  {sec.items.map((it, j) => (
                    <div key={`p-${i}-${j}`}>{renderInline(it, `p-${i}-${j}`)}</div>
                  ))}
                </div>
              </div>
            );
          }

          if (isStrengthsOrWeaknesses) {
            // For Strengths/Weaknesses, only create bullets for lines that start with "Debator —" or "Refuter —"
            const bulletItems = sec.items.filter(item => /^(Debator|Refuter)\s*—/i.test(item));
            const nonBulletItems = sec.items.filter(item => !/^(Debator|Refuter)\s*—/i.test(item));
            
            return (
              <div key={`sec-${i}`} className="space-y-2">
                <h4 className="text-gray-100 font-bold">{title}</h4>
                {nonBulletItems.length > 0 && (
                  <div className="space-y-1">
                    {nonBulletItems.map((it, j) => (
                      <div key={`p-${i}-${j}`}>{renderInline(it, `p-${i}-${j}`)}</div>
                    ))}
                  </div>
                )}
                {bulletItems.length > 0 && (
                  <ul className="list-disc list-inside space-y-1">
                    {bulletItems.map((it, j) => (
                      <li key={`li-${i}-${j}`}>{renderInline(it, `li-${i}-${j}`)}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          }

          // Default case - other sections
          return (
            <div key={`sec-${i}`} className="space-y-2">
              <h4 className="text-gray-100 font-bold">{title}</h4>
              <div className="space-y-1">
                {sec.items.map((it, j) => (
                  <div key={`p-${i}-${j}`}>{renderInline(it, `p-${i}-${j}`)}</div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  const HISTORY_WINDOW = 2;

  function buildDebatorMessages(topic: string, history: Round[]): Msg[] {
    const msgs: Msg[] = [{ role: "system", content: styles[style].debator }];
    msgs.push({
      role: "user",
      content:
        `Topic: ${topic}\nYou are PRO. Quote 3–12 words from the Refuter once, then rebut that quote directly.\n` +
        `Add at least ONE NEW point not previously stated.`,
    });
    const recent = history.slice(-HISTORY_WINDOW);
    for (const r of recent) {
      msgs.push({ role: "assistant", content: r.debator });
      msgs.push({ role: "user", content: r.refuter });
    }
    return msgs;
  }

  function buildRefuterMessages(topic: string, history: Round[]): Msg[] {
    const msgs: Msg[] = [{ role: "system", content: styles[style].refuter }];
    msgs.push({
      role: "user",
      content:
        `Topic: ${topic}\nYou are CON. Quote 3–12 words from the Debator once, then rebut that quote directly.\n` +
        `Add at least ONE NEW counterpoint not previously stated.`,
    });
    const recent = history.slice(-HISTORY_WINDOW);
    for (const r of recent) {
      msgs.push({ role: "assistant", content: r.refuter });
      msgs.push({ role: "user", content: r.debator });
    }
    return msgs;
  }

  async function getDebatorReply(t: string, history: Round[], latestRefuter?: string) {
    const msgs = buildDebatorMessages(t, history);
    if (latestRefuter) {
      msgs.push({
        role: "user",
        content:
          `Reply specifically to the Refuter’s latest message:\n${latestRefuter}\n\n` +
          `Rules: Do NOT restate your earlier points unless acknowledging them as already addressed. ` +
          `Introduce at least ONE NEW supporting argument.`,
      });
    } else {
      msgs.push({
        role: "user",
        content: `Start the debate FOR the topic. Provide 4–6 sentences. Avoid generic platitudes.`,
      });
    }
    return await callChat(msgs, 260);
  }

  async function getRefuterReply(t: string, history: Round[], latestDebator: string) {
    const msgs = buildRefuterMessages(t, history);
    msgs.push({
      role: "user",
      content:
        `The Debator just said:\n${latestDebator}\n\n` +
        `Rebut point-by-point. Do NOT repeat earlier counters unless briefly referenced as already addressed. ` +
        `Introduce at least ONE NEW counterpoint.`,
    });
    return await callChat(msgs, 320);
  }

  // Judge with stricter, bullet-only format
  async function getJudgeVerdict(t: string, history: Round[]) {
    const sys =
      "You are an impartial debate judge. Judge only on the transcript. " +
      "Criteria: Clarity, Evidence/Specificity, Responsiveness, Novelty.\n" +
      "Formatting rules (MANDATORY):\n" +
      "- Use EXACT headings: Summary / Strengths / Weaknesses / Winner: / Score:\n" +
      "- No standalone bullet markers, no decorative dots, no empty bullets.\n" +
      "- When you mention the Debator inline in ANY section, wrap text in <DEB>…</DEB>; for Refuter, <REF>…</REF>.\n" +
      "- Strengths/Weaknesses should start with `Debator —` or `Refuter —` when referring to a side.\n" +
      "- In Summary, also use <DEB>Debator</DEB> and <REF>Refuter</REF> tags for color coding.\n" +
      "- Keep it concise and scannable.";

    const transcript = history
      .map((r, i) => `Round ${i + 1}\nDEBATOR:\n${r.debator}\n\nREFUTER:\n${r.refuter}`)
      .join("\n\n---\n\n");

    const messages: Msg[] = [
      { role: "system", content: sys },
      {
        role: "user",
        content:
          `Topic: ${t}\n\nTranscript:\n${transcript}\n\n` +
          "Provide the verdict using the exact headings and hyphen bullets.",
      },
    ];

    return await callChat(messages, 420);
  }

  async function startDebate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setRounds([]);
    setVerdict("");
    setError("");

    const prop = topic.trim();
    if (!prop) {
      setError("Please enter a topic.");
      setLoading(false);
      return;
    }
    try {
      const debator = await getDebatorReply(prop, [], undefined);
      const refuter = await getRefuterReply(prop, [], debator);
      setRounds([{ debator, refuter }]);
    } catch (err: any) {
      setError(err.message || "Error during debate.");
    } finally {
      setLoading(false);
    }
  }

  async function continueRound() {
    if (!topic || rounds.length === 0) return;
    if (rounds.length >= MAX_ROUNDS) return;

    setLoading(true);
    setError("");

    try {
      const prop = topic.trim();
      const history = rounds;
      const latestRefuter = history[history.length - 1].refuter;
      const debator = await getDebatorReply(prop, history, latestRefuter);
      const refuter = await getRefuterReply(prop, history, debator);
      setRounds((r) => [...r, { debator, refuter }]);
    } catch (err: any) {
      setError(err.message || "Error continuing debate.");
    } finally {
      setLoading(false);
    }
  }

  async function judgeNow() {
    if (rounds.length === 0 || !topic) return;
    setJudging(true);
    setError("");
    setVerdict("");
    try {
      const v = await getJudgeVerdict(topic.trim(), rounds);
      setVerdict(v);
    } catch (err: any) {
      setError(err.message || "Error generating verdict.");
    } finally {
      setJudging(false);
    }
  }

  function resetDebate() {
    setTopic("");
    setRounds([]);
    setVerdict("");
    setError("");
  }

  const canContinue = rounds.length > 0 && rounds.length < MAX_ROUNDS;

  return (
    <div className="relative z-10 flex flex-col items-center min-h-screen bg-black text-gray-100 px-6 pt-0">
      <h1 className="text-3xl sm:text-4xl font-bold gradient-text animate-gradient mb-2 pb-1">
        LLM Debater
      </h1>

      <form onSubmit={startDebate} className="w-full max-w-xl flex flex-col items-center gap-4 mb-8">
        <input
          type="text"
          className="w-full px-4 py-2 rounded bg-gray-800 text-gray-100 border border-blue-500/30 focus:outline-none focus:border-blue-400"
          placeholder='Enter a topic, e.g. "Everyone should be given electric cars"'
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />

        <h2 className="text-2xl font-bold gradient-text animate-gradient m-0">Pick a personality</h2>
        <select
          className="w-full px-4 py-1 rounded bg-gray-800 text-gray-100 border border-blue-500/30 focus:outline-none focus:border-blue-400"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        >
          {Object.entries(styles).map(([key, v]) => (
            <option key={key} value={key}>
              {v.label}
            </option>
          ))}
        </select>

        <div className="flex gap-3">
          <button
            type="submit"
            className="px-6 py-2 rounded border border-blue-400 text-white font-semibold gradient-text animate-gradient bg-transparent hover:bg-blue-600/20 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Working..." : "Start Debate"}
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded border border-gray-400 text-white font-semibold gradient-text animate-gradient bg-transparent hover:bg-gray-700/30 transition disabled:opacity-50"
            onClick={resetDebate}
            disabled={loading || judging}
          >
            Reset
          </button>
        </div>
      </form>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      {rounds.length > 0 && (
        <div className="w-full max-w-3xl space-y-6">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Rounds: {rounds.length} / {MAX_ROUNDS}</span>
            {!canContinue && <span className="text-amber-400">Max rounds reached</span>}
          </div>

          {rounds.map((r, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-all">
              <div className="bg-gray-900 rounded-lg p-5 border border-blue-500/30 shadow-sm">
                <h2 className="text-xl font-bold text-blue-400 mb-2">Debator (Round {i + 1})</h2>
                <FormattedText text={r.debator} />
              </div>
              <div className="bg-gray-900 rounded-lg p-5 border border-pink-500/30 shadow-sm">
                <h2 className="text-xl font-bold text-pink-400 mb-2">Refuter (Round {i + 1})</h2>
                <FormattedText text={r.refuter} />
              </div>
            </div>
          ))}

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              className="px-6 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition disabled:opacity-50"
              onClick={continueRound}
              disabled={loading || !canContinue}
              title={!canContinue ? "Maximum rounds reached" : "Add another round"}
            >
              {loading ? "Working..." : "Continue Debate"}
            </button>

            <button
              type="button"
              className="px-6 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition disabled:opacity-50"
              onClick={judgeNow}
              disabled={judging || loading}
              title="Summarise and declare a winner"
            >
              {judging ? "Judging..." : "Judge Verdict"}
            </button>
          </div>

          {verdict && (
            <div className="bg-gray-900 rounded-lg p-5 border border-purple-500/30 shadow-sm">
              <h3 className="text-lg font-bold text-purple-300 mb-2">Judge Verdict</h3>
              <VerdictText text={verdict} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
