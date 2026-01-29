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

  const chipBase = "px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer focus:outline-none";
  const chipVariant: Record<Variant, string> = {
    blue: "border border-blue-400/30 bg-blue-500/10 text-blue-200 hover:bg-blue-500/20 hover:border-blue-400/60 hover:text-blue-100 focus-visible:ring-2 focus-visible:ring-blue-300",
    violet: "border border-violet-400/30 bg-violet-500/10 text-violet-200 hover:bg-violet-500/20 hover:border-violet-400/60 hover:text-violet-100 focus-visible:ring-2 focus-visible:ring-violet-300",
    emerald: "border border-emerald-400/30 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20 hover:border-emerald-400/60 hover:text-emerald-100 focus-visible:ring-2 focus-visible:ring-emerald-300",
    amber: "border border-amber-400/30 bg-amber-500/10 text-amber-200 hover:bg-amber-500/20 hover:border-amber-400/60 hover:text-amber-100 focus-visible:ring-2 focus-visible:ring-amber-300",
    rose: "border border-rose-400/30 bg-rose-500/10 text-rose-200 hover:bg-rose-500/20 hover:border-rose-400/60 hover:text-rose-100 focus-visible:ring-2 focus-visible:ring-rose-300",
    cyan: "border border-cyan-400/30 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/20 hover:border-cyan-400/60 hover:text-cyan-100 focus-visible:ring-2 focus-visible:ring-cyan-300",
    indigo: "border border-indigo-400/30 bg-indigo-500/10 text-indigo-200 hover:bg-indigo-500/20 hover:border-indigo-400/60 hover:text-indigo-100 focus-visible:ring-2 focus-visible:ring-indigo-300",
    pink: "border border-pink-400/30 bg-pink-500/10 text-pink-200 hover:bg-pink-500/20 hover:border-pink-400/60 hover:text-pink-100 focus-visible:ring-2 focus-visible:ring-pink-300",
    slate: "border border-slate-400/30 bg-slate-500/10 text-slate-200 hover:bg-slate-500/20 hover:border-slate-400/60 hover:text-slate-100 focus-visible:ring-2 focus-visible:ring-slate-300",
    red: "border border-red-400/30 bg-red-500/10 text-red-200 hover:bg-red-500/20 hover:border-red-400/60 hover:text-red-100 focus-visible:ring-2 focus-visible:ring-red-300",
  };

  const Chip = ({ label, variant = "blue" }: { label: string; variant?: Variant }) => (
    <button 
      type="button" 
      className={`${chipBase} ${chipVariant[variant]}`}
      style={{
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 0 0 2px rgba(255,255,255,0.4), 0 0 20px rgba(255,255,255,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '';
      }}
    >{label}</button>
  );

  type CardVariant = "indigo" | "violet" | "emerald" | "cyan" | "pink" | "amber" | "slate" | "rose" | "red";
  const cardBase = "rounded-xl p-5 md:p-6 border backdrop-blur-sm shadow-[0_0_24px_rgba(0,0,0,0.25)] md:min-h-[160px] transition-all duration-300";
  const cardVariant: Record<CardVariant, string> = {
    indigo: "border-indigo-400/40 hover:border-indigo-300/70 hover:shadow-[0_0_36px_rgba(99,102,241,0.35)] hover:scale-[1.015] focus-visible:ring-2 focus-visible:ring-indigo-300",
    violet: "border-violet-400/40 hover:border-violet-300/70 hover:shadow-[0_0_36px_rgba(139,92,246,0.35)] hover:scale-[1.015] focus-visible:ring-2 focus-visible:ring-violet-300",
    emerald: "border-emerald-400/40 hover:border-emerald-300/70 hover:shadow-[0_0_36px_rgba(16,185,129,0.35)] hover:scale-[1.015] focus-visible:ring-2 focus-visible:ring-emerald-300",
    cyan: "border-cyan-400/40 hover:border-cyan-300/70 hover:shadow-[0_0_36px_rgba(6,182,212,0.35)] hover:scale-[1.015] focus-visible:ring-2 focus-visible:ring-cyan-300",
    pink: "border-pink-400/40 hover:border-pink-300/70 hover:shadow-[0_0_36px_rgba(236,72,153,0.35)] hover:scale-[1.015] focus-visible:ring-2 focus-visible:ring-pink-300",
    amber: "border-amber-400/40 hover:border-amber-300/70 hover:shadow-[0_0_36px_rgba(245,158,11,0.35)] hover:scale-[1.015] focus-visible:ring-2 focus-visible:ring-amber-300",
    slate: "border-slate-400/40 hover:border-slate-300/70 hover:shadow-[0_0_36px_rgba(100,116,139,0.35)] hover:scale-[1.015] focus-visible:ring-2 focus-visible:ring-slate-300",
    rose: "border-rose-400/40 hover:border-rose-300/70 hover:shadow-[0_0_36px_rgba(244,63,94,0.35)] hover:scale-[1.015] focus-visible:ring-2 focus-visible:ring-rose-300",
    red: "border-red-400/40 hover:border-red-300/70 hover:shadow-[0_0_36px_rgba(239,68,68,0.35)] hover:scale-[1.015] focus-visible:ring-2 focus-visible:ring-red-300",
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
    <div 
      tabIndex={0} 
      className={`${cardBase} ${cardVariant[variant]}`} 
      style={{ 
        backgroundImage: cardBg[variant],
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.boxShadow = '0 0 0 2px rgba(255,255,255,0.3), 0 0 40px rgba(255,255,255,0.15), 0 0 24px rgba(0,0,0,0.25)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 0 24px rgba(0,0,0,0.25)';
      }}
    >
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
              <h2 className="text-xl font-semibold text-blue-300 mb-4">What I’m About</h2>
              
              <ul className="list-disc ml-5 text-gray-300 space-y-2 text-sm leading-relaxed">
                <li>End‑to‑end focus: data pipelines, models, interfaces, deployment</li>
                <li>Speech & vision emotion recognition and multi‑modal models</li>
                <li>LLM experimentation, lightweight agents, automation workflows</li>
                <li>Fast iteration: clean UX, measurable outcomes, performance minded</li>
                <li>Strengths: machine & deep learning, data analytics, front‑end engineering</li>
                <li>Strong communicator</li>
              </ul>
            </section>

            {/* Experience */}
            <section
              className="relative rounded-xl border border-blue-500/20 p-5 md:p-6 md:pl-10 md:ml-4 shadow-[0_0_16px_rgba(2,6,23,0.35)]"
              style={{ backgroundImage: 'linear-gradient(135deg, rgba(25, 54, 122, 0.55), rgba(0, 0, 0, 0.35))' }}
            >
              <h3 className="text-lg uppercase tracking-wide gradient-text animate-gradient mb-2 text-center">Experience</h3>
              
              <div className="space-y-6 text-gray-300 text-sm">
                {/* X is Y Internship */}
                <div className="bg-black/20 rounded-lg p-6 border border-blue-500/10">
                  <h4 className="text-lg font-bold text-blue-200 mb-2">X is Y - Internship</h4>
                  <p className="text-xs text-gray-400 mb-4 font-medium">August 2025 - November 2025</p>
                  <p className="leading-relaxed text-gray-300">
                    Worked as an intern at X is Y data consultants on their AI team. Worked in an agile environment while developing agents and tools, automating workflows and prompt engineering with content offloading principles. 
                    Gained real-world AI development skills and the relevant knowledge to apply it efficiently.
                  </p>
                </div>
                
                {/* Media Design School Internship */}
                <div className="bg-black/20 rounded-lg p-6 border border-blue-500/10">
                  <h4 className="text-lg font-bold text-blue-200 mb-2">Media Design School - Summer Internship</h4>
                  <p className="text-xs text-gray-400 mb-4 font-medium">December 2024 - February 2025</p>
                  <p className="leading-relaxed text-gray-300">
                    Paid Summer Internship developing deep learning models, and an interface for a mental health monitoring programme, using Facial Expression and Speech recognition.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Skills/Comfort boxes (full width below) */}
        <section className="mt-0 rounded-xl border border-blue-500/20 bg-gradient-to-br from-slate-900/70 via-black/60 to-slate-900/70 p-6 shadow-[0_0_24px_rgba(2,6,23,0.45)] w-full">
          <h2 className="text-xl font-semibold gradient-text animate-gradient mb-4">Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Languages & Core */}
              <CategoryCard title="Languages & Core" variant="indigo">
                <Chip label="Python" variant="indigo" />
                <Chip label="TypeScript" variant="indigo" />
                <Chip label="Node" variant="indigo" />
                <Chip label="C++" variant="indigo" />
                <Chip label="Windows" variant="indigo" />
              </CategoryCard>

              <CategoryCard title="AI" variant="violet">
              <Chip label="Machine Learning" variant="indigo" />
              <Chip label="Deep Learning" variant="indigo" />
              <Chip label="Librosa / OpenCV" variant="violet" />
              <Chip label="NLP" variant="indigo" />
              <Chip label="Computer Vision" variant="indigo" />
              </CategoryCard>
              {/* AI / LLMs */}
              <CategoryCard title="LLMs" variant="violet">
                <Chip label="Agent Automation" variant="violet" />
                <Chip label="MCP Tools" variant="violet" />
                <Chip label="Prompt Engineering" variant="violet" />
                <Chip label="OpenAI / Anthropic APIs" variant="violet" />
                <Chip label="PyTorch / TensorFlow" variant="violet" />
                
                <Chip label="LangFlow" variant="violet" />
              </CategoryCard>
               {/* Data Analytics */}
              <CategoryCard title="Data Analytics" variant="amber">
                
                <Chip label="Data Cleaning" variant="amber" />
                <Chip label="Augmentation" variant="indigo" />
                <Chip label="Feature Engineering" variant="amber" />
                <Chip label="Feature Extraction" variant="amber" />
                <Chip label="Visualization" variant="amber" />
                <Chip label="PowerBI" variant="amber" />
              </CategoryCard>
                      

             

             

              

              {/* Databases */}
              <CategoryCard title="Databases" variant="slate">
                <Chip label="SQL" variant="slate" />
                <Chip label="PostgreSQL" variant="slate" />
                <Chip label="Snowflake" variant="slate" />
                
              </CategoryCard>
              {/* Dev & DX */}
              <CategoryCard title="Dev & DX" variant="emerald">
                <Chip label="Cursor" variant="emerald" />
                <Chip label="VS Code" variant="emerald" />
                <Chip label="Vite" variant="emerald" />
                <Chip label="React" variant="emerald" />
                <Chip label="Tailwind" variant="emerald" />
                
              </CategoryCard>  
              {/* Security */}
              <CategoryCard title="Security" variant="red">
                <Chip label="Ethical Hacking" variant="red" />
                <Chip label="OWASP" variant="red" />
                
              </CategoryCard>
            </div>
        </section>

      
      </div>
    </div>
  );
}
