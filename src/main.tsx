import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import App from "./App";
import EmotionRecognition from "./pages/EmotionRecognition";
import LLMExperiment from "./pages/LLMExperiment";
import PortfolioAssistant from "./pages/PortfolioAssistant";
import About from "./pages/About";
import "./tailwind.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/projects/emotion-recognition" element={<EmotionRecognition />} />
          <Route path="/projects/llm-experiment" element={<LLMExperiment />} />
          <Route path="/projects/portfolio-assistant" element={<PortfolioAssistant />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
