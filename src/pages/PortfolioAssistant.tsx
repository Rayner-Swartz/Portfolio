import { motion } from "framer-motion";
import { LangflowChat } from "../components/LangflowChat";


function SectionWithFade({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-blue-400 mb-2 gradient-text animate-gradient">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function PortfolioAssistant() {
  return (
    <div className="relative min-h-screen bg-black text-gray-200 px-6 py-5 overflow-x-hidden">
      {/* Right-side blue tint */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-[50%] right-0 bg-blue-400/5"
        style={{ top: '6rem', zIndex: 1 }}
      />

      {/* Main layout */}
      <div className="relative flex flex-col items-center" style={{ zIndex: 2 }}>
        {/* Title */}
        <motion.h1
          className="text-3xl sm:text-4xl font-bold mb-6 pb-1 bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent animate-gradient"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
        Competitor AI Analyser
        </motion.h1>

 

        <div className="flex flex-col lg:flex-row items-start justify-center gap-12 w-full max-w-6xl mt-10">
          {/* ---------- LEFT TEXT COLUMN ---------- */}
          <div
            className="flex-1 max-w-3xl text-left leading-relaxed text-gray-300 text-[0.95rem] space-y-12"
          >
            <SectionWithFade title="Project Overview">
              <p>
                This AI assistant is built using Langflow, a visual framework for building LLM applications. 
                It's designed as a competitor analysis agent, for businesses to benchmark their offerings against competitors.
              </p>
            </SectionWithFade>

            <SectionWithFade title="Technical Architecture">
              <ul className="list-disc list-inside pl-6 [text-indent:-1.5rem] space-y-2">
                <li>
                  <strong>Langflow:</strong> Visual flow builder for LLM applications with drag-and-drop components
                </li>
                <li>
                  <strong>LLM Integration:</strong> Powered by OpenAI GPT models for natural language understanding
                </li>
                <li>
                  <strong>Multi Agent Flow:</strong> Master agent calls sub-agents
                </li>
                <li>
                  <strong>Web Seach API:</strong> Tavily / Serp / New Search APIs
                </li>
                <li>
                  <strong>Real-time Communication:</strong> WebSocket connection for instant responses
                </li>
              </ul>
            </SectionWithFade>

           

            <SectionWithFade title="Langflow Architecture">
              <div className="mt-4">
                <img 
                  src="/langflow-diagram.png" 
                  alt="Langflow Visual Flow Diagram showing the multi-agent architecture with News Search, Agent components, and Chat Output connections"
                  className="w-full rounded-lg border border-blue-500/20 bg-black/40 p-4"
                />
                <p className="text-sm text-gray-400 mt-2 italic">
                  Visual representation of the Langflow agent architecture with multi-agent coordination, 
                  web search integration, and real-time chat output.
                </p>
              </div>
            </SectionWithFade>           

            
          </div>

          {/* ---------- RIGHT CHAT COLUMN ---------- */}
          <motion.div
            className="flex-1 flex justify-center self-stretch"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="w-full max-w-4xl h-[900px] rounded-xl border border-blue-500/20 bg-black/40 backdrop-blur overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-blue-500/20">
                <h3 className="text-lg font-semibold gradient-text animate-gradient">
                  Competitor Analysis AI agent
                </h3>
                
              </div>
              <div className="flex-1">
                <LangflowChat />
              </div>
            </div>
          </motion.div>
        </div>       
      </div>
    </div>
  );
}