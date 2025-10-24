import { useState } from 'react'
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import ChatWidget from "./components/ChatWidget";


export default function App() {
  const [count, setCount] = useState(0)

  return (
    
  <div className="min-h-screen w-screen  bg-black text-gray-100 relative flex flex-col items-center justify-start pt-12 overflow-x-hidden">
  {/* Navbar unchanged */}
  <nav className="fixed top-0 left-0 right-0 z-50
                  bg-black/40 backdrop-blur-md border-b border-blue-500/20
                  before:content-[''] before:absolute before:bottom-0 before:inset-x-0 before:h-[3px]
                  before:bg-gradient-to-r before:from-blue-400 before:via-cyan-300 before:to-blue-600 before:opacity-80">
    <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 py-3 overflow-x-clip">
      <h1 className="text-xl font-bold gradient-text animate-gradient">Rayner Swartz</h1>
      <div className="hidden sm:flex gap-6 text-gray-300">
        <Link to="#home" className="hover:text-blue-400 transition">Home</Link>
        <Link to="#projects" className="hover:text-blue-400 transition">Projects</Link>
        <a href="#about" className="hover:text-blue-400 transition">About</a>
        <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
      </div>
      <button className="sm:hidden text-gray-300">☰</button>
    </div>
  </nav>
<ChatWidget />

  {/* HERO SECTION (relative so the image can be absolute) */}
<section className="relative w-full px-4 pt-9">
  {/* centered title stays put */}
  <h1 className="mx-auto max-w-5xl text-center text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold leading-[1.2]">
    <span className="block gradient-text animate-gradient animate-dsGlow">
      Artificial Intelligence Engineer
    </span>
    {/* Typing / Prompt Animation */}
<TypeAnimation
  sequence={[
    "<Deep Learning / Machine Learning>",         1600,
    "<Computer Vision / NLP>",      1400,
    "<Python / Tensorflow / PyTorch>",     1600,
    "<Langflow>",    2000,
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

 
</section>

{/* ===== Featured Projects ===== */}
<section id="projects" className="w-full max-w-7xl mx-auto mt-32 px-6">
  <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center gradient-text animate-gradient">
    Featured Projects
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* Project 1 */}
    <div className="group bg-black/40 border border-blue-500/20 rounded-xl p-6 hover:border-blue-400/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition">
      <img src="/emotion.png" alt="AI Emotion Recognition" className="rounded-lg mb-4 w-full object-cover object-top h-40 opacity-80 group-hover:opacity-100 transition" />
      <h3 className="text-xl font-semibold mb-2 text-blue-400">AI Emotion Recognition</h3>
      <p className="text-gray-400 text-sm">
        A real-time emotion detection system trained on speech and facial expressions using Keras and OpenCV.
      </p>
      <Link to="/projects/emotion-recognition" className="inline-block mt-3 text-sm text-blue-400 hover:underline">View Project →</Link>
    </div>

    {/* Project 2 */}
    <div className="group bg-black/40 border border-blue-500/20 rounded-xl p-6 hover:border-blue-400/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition">
      <img src="/langflow.png" alt="Langflow Orchestration Agent" className="rounded-lg mb-4 w-full object-cover h-40 opacity-80 group-hover:opacity-100 transition" />
      <h3 className="text-xl font-semibold mb-2 text-blue-400">Langflow Orchestration Agent</h3>
      <p className="text-gray-400 text-sm">
        Built custom Langflow nodes to orchestrate multi-agent pipelines integrating Atlassian and Contentful APIs.
      </p>
      <a href="#project2" className="inline-block mt-3 text-sm text-blue-400 hover:underline">View Project →</a>
    </div>

    {/* Project 3 */}
    <div className="group bg-black/40 border border-blue-500/20 rounded-xl p-6 hover:border-blue-400/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition">
      <img src="/snowflake.png" alt="Snowflake Data App" className="rounded-lg mb-4 w-full object-cover h-40 opacity-80 group-hover:opacity-100 transition" />
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
