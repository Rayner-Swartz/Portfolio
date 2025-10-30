import { useState } from 'react'
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import ChatWidget from "./components/ChatWidget";


export default function App() {
  const [count, setCount] = useState(0)

  return (
    
  <div className="min-h-screen w-screen bg-black text-gray-100 relative flex flex-col items-center justify-start pt-6 overflow-x-hidden">
  {/* Navbar unchanged */}
  
<ChatWidget />

  {/* HERO SECTION (relative so the image can be absolute) */}
<section className="relative w-full px-4 pt-0 pb-0">
  <h1 className="mx-auto max-w-5xl text-center text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold overflow-visible">
    <span className="block gradient-text animate-gradient animate-dsGlow pb-[0.35em]">
      
      Artificial Intelligence Engineer
      
    </span>
     
    <TypeAnimation
      sequence={[
        "<Deep Learning / Machine Learning>", 1600,
        "<Computer Vision / NLP>", 1400,
        "<Python / Tensorflow / PyTorch>", 1600,
        "<Langflow>", 2000,
        "<Frontend + AI Integration 'React, Vite, Tailwind'>", 1800,
        "<Speech Emotion Recognition>", 1800,
        "<Custom MCP Tools>", 2000,
      ]}
      speed={42}
      repeat={Infinity}
      wrapper="div"
      className="mt-4 text-sm sm:text-base md:text-lg text-gray-300/90 gradient-text animate-gradient"
    />
  </h1>
  <span className="block h-[25.0em]" aria-hidden />
</section>

{/* ===== Featured Projects ===== */}
<section id="projects" className="w-full max-w-7xl mx-auto mt-32 px-6">
  <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center gradient-text animate-gradient">
    Featured Projects
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

    {/* Project 1 */}
    <div className="group bg-black/40 border border-blue-500/20 rounded-xl p-6 hover:border-blue-400/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition">
      {/* Fixed 4:3 box */}
     <div className="relative w-full mb-4 rounded-lg overflow-hidden bg-black/30">
  <div className="pb-[66.666%]" />
  <img
    src="/emotion.png"
    alt="AI Emotion Recognition"
    className="absolute inset-0 block w-full h-full object-contain opacity-80 group-hover:opacity-100 transition"
  />
</div>

      <h3 className="text-xl font-semibold mb-2 text-blue-400">AI Emotion Recognition</h3>
      <p className="text-gray-400 text-sm">
        A real-time emotion detection system trained on speech and facial expressions using Keras and OpenCV.
      </p>
      <Link to="/projects/emotion-recognition" className="inline-block mt-3 text-sm text-blue-400 hover:underline">
        View Project →
      </Link>
    </div>

    {/* Project 2 */}
    <div className="group bg-black/40 border border-blue-500/20 rounded-xl p-6 hover:border-blue-400/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition">
      {/* Fixed 4:3 box */}
      <div className="relative w-full mb-4 rounded-lg overflow-hidden bg-black/30">
        <div className="pb-[66.666%]" />
        <img
          src="/LLMDebate.png"
          alt="LLM Experimentation"
          className="absolute inset-0 block w-full h-full object-contain opacity-80 group-hover:opacity-100 transition"
        />
      </div>

      <h3 className="text-xl font-semibold mb-2 text-blue-400">LLM Experimentation</h3>
      <p className="text-gray-400 text-sm">A variety of experiments with LLMs</p>
      <Link to="/projects/llm-experiment" className="inline-block mt-3 text-sm text-blue-400 hover:underline">
        View Project →
      </Link>
    </div>

    {/* Project 3 */}
    <div className="group bg-black/40 border border-blue-500/20 rounded-xl p-6 hover:border-blue-400/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition">
      {/* Fixed 4:3 box */}
      <div className="relative w-full mb-4 rounded-lg overflow-hidden bg-black/30">
        <div className="pb-[66.666%]" />
        <img
          src="/snowflake.png"
          alt="Snowflake Data App"
          className="absolute inset-0 block w-full h-full object-contain opacity-80 group-hover:opacity-100 transition"
        />
      </div>

      <h3 className="text-xl font-semibold mb-2 text-blue-400">Snowflake Data App</h3>
      <p className="text-gray-400 text-sm">
        A native Snowflake app with Streamlit dashboard for visualizing marketplace analytics and data products.
      </p>
      <a href="#project3" className="inline-block mt-3 text-sm text-blue-400 hover:underline">View Project →</a>
    </div>

  </div>
</section>

    </div>
  )
}
