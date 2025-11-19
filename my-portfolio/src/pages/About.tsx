export default function About() {
  type Variant =
    | "blue"
    | "violet"
    | "emerald"
    | "amber"
    | "rose"
    | "cyan"
    | "indigo"
    | "pink"
    | "slate"
    | "red";

  const chipBase = "px-3 py-1 rounded-full text-xs md:text-sm font-medium";
  const chipVariant: Record<Variant, string> = {
    blue: "border border-blue-400/30 bg-blue-500/10 text-blue-200",
    violet: "border border-violet-400/30 bg-violet-500/10 text-violet-200",
    emerald: "border border-emerald-400/30 bg-emerald-500/10 text-emerald-200",
    amber: "border border-amber-400/30 bg-amber-500/10 text-amber-200",
    rose: "border border-rose-400/30 bg-rose-500/10 text-rose-200",
    cyan: "border border-cyan-400/30 bg-cyan-500/10 text-cyan-200",
    indigo: "border border-indigo-400/30 bg-indigo-500/10 text-indigo-200",
    pink: "border border-pink-400/30 bg-pink-500/10 text-pink-200",
    slate: "border border-slate-400/30 bg-slate-500/10 text-slate-200",
    red: "border border-red-400/30 bg-red-500/10 text-red-200",
  };

  const Chip = ({ label, variant = "blue" }: { label: string; variant?: Variant }) => (
    <span className={`${chipBase} ${chipVariant[variant]}`}>{label}</span>
  );

  type CardVariant = "indigo" | "violet" | "emerald" | "cyan" | "pink" | "amber" | "slate" | "rose" | "red";
  const cardBase = "rounded-xl p-5 md:p-6 border backdrop-blur-sm shadow-[0_0_24px_rgba(0,0,0,0.25)] md:min-h-[160px]";
  const cardVariant: Record<CardVariant, string> = {
    indigo: "border-indigo-400/40",
    violet: "border-violet-400/40",
    emerald: "border-emerald-400/40",
    cyan: "border-cyan-400/40",
    pink: "border-pink-400/40",
    amber: "border-amber-400/40",
    slate: "border-slate-400/40",
    rose: "border-rose-400/40",
    red: "border-red-400/40",
  };

  const cardBg: Record<CardVariant, string> = {
    indigo: "linear-gradient(135deg, rgba(99,102,241,0.28), rgba(99,102,241,0.10))",
    violet: "linear-gradient(135deg, rgba(139,92,246,0.28), rgba(139,92,246,0.10))",
    emerald: "linear-gradient(135deg, rgba(16,185,129,0.28), rgba(16,185,129,0.10))",
    cyan: "linear-gradient(135deg, rgba(6,182,212,0.28), rgba(6,182,212,0.10))",
    pink: "linear-gradient(135deg, rgba(236,72,153,0.28), rgba(236,72,153,0.10))",
    amber: "linear-gradient(135deg, rgba(245,158,11,0.28), rgba(245,158,11,0.10))",
    slate: "linear-gradient(135deg, rgba(100,116,139,0.28), rgba(100,116,139,0.10))",
    rose: "linear-gradient(135deg, rgba(244,63,94,0.28), rgba(244,63,94,0.10))",
    red: "linear-gradient(135deg, rgba(239,68,68,0.28), rgba(239,68,68,0.10))",
  };

  const CategoryCard = ({
    title,
    variant,
    children,
  }: {
    title: string;
    variant: CardVariant;
    children: React.ReactNode;
  }) => (
    <div className={`${cardBase} ${cardVariant[variant]}`} style={{ backgroundImage: cardBg[variant] }}>
      <h4 className="text-base md:text-lg font-semibold gradient-text animate-gradient mb-2 text-center">{title}</h4>
      <div className="flex flex-wrap gap-3">{children}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-gray-100 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Header + Intro (narrow width) */}
        <div className="mx-auto max-w-4xl">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold gradient-text animate-gradient mb-3">About Me</h1>
            
          </header>

          {/* Top grid: About + Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bio */}
            <section className="p-0">
              <h2 className="text-xl font-semibold text-blue-300 mb-3">What I’m About</h2>
              <p className="text-gray-300 leading-relaxed">
                I build AI systems end‑to‑end: data, models, and the interface that puts
                results in people’s hands. Recent work includes speech + vision emotion
                recognition, LLM experimentation, and lightweight agent automation. I enjoy
                fast iteration, clean UX, and measurable outcomes. I am confident in the realms of machine / deep learning, data analytics,
                and front-end development.
              </p>
            </section>

            {/* Quick stats */}
            <section
              className="relative rounded-xl border border-blue-500/20 p-5 md:p-6 md:pl-10 md:ml-4 shadow-[0_0_16px_rgba(2,6,23,0.35)]"
              style={{ backgroundImage: 'linear-gradient(135deg, rgba(25, 54, 122, 0.55), rgba(0, 0, 0, 0.35))' }}
            >
              <h3 className="text-sm uppercase tracking-wide gradient-text animate-gradient mb-4">Quick Stats</h3>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>AI integrations</li>
                <li>Realtime prototypes and demos</li>
                <li>Operator of MCP tools & agents</li>
                <li>Python-first, JS for UI</li>
                <li>Computer Vision, NLP, Data Analytics</li>
              </ul>
            </section>
          </div>
        </div>

        {/* Skills/Comfort boxes (full width below) */}
        <section className="mt-10 rounded-xl border border-blue-500/20 bg-gradient-to-br from-slate-900/70 via-black/60 to-slate-900/70 p-6 shadow-[0_0_24px_rgba(2,6,23,0.45)] w-full">
          <h2 className="text-xl font-semibold gradient-text animate-gradient mb-4">Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Languages & Core */}
              <CategoryCard title="Languages & Core" variant="indigo">
                <Chip label="Python" variant="indigo" />
                <Chip label="TypeScript" variant="indigo" />
                <Chip label="Node" variant="indigo" />
                <Chip label="Bash / PowerShell" variant="indigo" />
              </CategoryCard>

              {/* AI / LLMs */}
              <CategoryCard title="AI, LLMs & Tooling" variant="violet">
                <Chip label="Agent Automation" variant="violet" />
                <Chip label="MCP Tools" variant="violet" />
                <Chip label="Prompt Engineering" variant="violet" />
                <Chip label="OpenAI / Anthropic APIs" variant="violet" />
                <Chip label="PyTorch / TensorFlow" variant="violet" />
                <Chip label="Librosa / OpenCV" variant="violet" />
                <Chip label="LangFlow" variant="violet" />
              </CategoryCard>

              {/* Dev & DX */}
              <CategoryCard title="Dev & DX" variant="emerald">
                <Chip label="Cursor" variant="emerald" />
                <Chip label="VS Code" variant="emerald" />
                <Chip label="Vite" variant="emerald" />
                <Chip label="React" variant="emerald" />
                <Chip label="Tailwind" variant="emerald" />
                <Chip label="Vitest / Jest" variant="emerald" />
              </CategoryCard>

              {/* Data & Ops */}
              <CategoryCard title="Data & Ops" variant="cyan">
                <Chip label="NumPy / Pandas" variant="cyan" />
                <Chip label="scikit-learn" variant="cyan" />
                <Chip label="Docker" variant="cyan" />
                <Chip label="GitHub Actions" variant="cyan" />
              </CategoryCard>

             

              {/* Data Analytics */}
              <CategoryCard title="Data Analytics" variant="amber">
                <Chip label="EDA" variant="amber" />
                <Chip label="Data Cleaning" variant="amber" />
                <Chip label="Feature Engineering" variant="amber" />
                <Chip label="Feature Extraction" variant="amber" />
                <Chip label="Visualization" variant="amber" />
                <Chip label="LangFlow" variant="amber" />
              </CategoryCard>

              {/* Computer Vision */}
              <CategoryCard title="Computer Vision" variant="violet">
                <Chip label="OpenCV" variant="violet" />
                <Chip label="MediaPipe" variant="violet" />
                <Chip label="Torchvision" variant="violet" />
                <Chip label="Detection / Tracking" variant="violet" />
              </CategoryCard>

              {/* NLP */}
              <CategoryCard title="NLP" variant="rose">
                <Chip label="Transformers" variant="rose" />
                <Chip label="spaCy" variant="rose" />
                <Chip label="RAG" variant="rose" />
                <Chip label="Prompting" variant="rose" />
              </CategoryCard>

              {/* Databases */}
              <CategoryCard title="Databases" variant="slate">
                <Chip label="SQL" variant="slate" />
                <Chip label="PostgreSQL" variant="slate" />
                <Chip label="SQLite" variant="slate" />
                <Chip label="Vector DB" variant="slate" />
              </CategoryCard>

              {/* Security */}
              <CategoryCard title="Security" variant="red">
                <Chip label="Ethical Hacking" variant="red" />
                <Chip label="OWASP" variant="red" />
                <Chip label="AppSec Basics" variant="red" />
              </CategoryCard>
            </div>
        </section>

      
      </div>
    </div>
  );
}
