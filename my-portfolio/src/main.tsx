import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import EmotionRecognition from "./pages/EmotionRecognition.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects/emotion-recognition" element={<EmotionRecognition />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
