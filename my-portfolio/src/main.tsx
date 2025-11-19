import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import App from "./App";
import EmotionRecognition from "./pages/EmotionRecognition";
import LLMExperiment from "./pages/LLMExperiment";
import About from "./pages/About";
import ScrollToTop from "./components/ScrollToTop"; 
import "./tailwind.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop /> {/* 👈 ensures scroll resets on route change */}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/projects/emotion-recognition" element={<EmotionRecognition />} />
          <Route path="/projects/llm-experiment" element={<LLMExperiment />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
