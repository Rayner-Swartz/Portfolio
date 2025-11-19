import { motion } from "framer-motion";

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

export default function EmotionRecognition() {
  

  return (
    <div className="relative min-h-screen bg-black text-gray-200 px-6 py-5 overflow-x-hidden">
      {/* Right-side blue tint (unchanged) */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 bottom-0 left-[50%] right-0 bg-blue-400/5 z-0"
      />

      {/* Main layout */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Title */}
        <motion.h1
          className="text-3xl sm:text-4xl font-bold mb-6 pb-1 bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent animate-gradient"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          Emotion Recognition
        </motion.h1>

        <p className="max-w-3xl text-center text-gray-400 mb-10">
          This project uses deep learning to detect emotions from both speech and facial expressions
          in real time, using the PHQ-9 mental health questionnaire. It combines a 2D CNN-based
          facial recognition model with an ANN model.
        </p>

        <div className="flex flex-col lg:flex-row items-start justify-center gap-12 w-full max-w-6xl mt-10">
          {/* ---------- LEFT TEXT COLUMN ---------- */}
          <div
            className="flex-1 max-w-3xl text-left leading-relaxed text-gray-300 text-[0.95rem] space-y-12"
          >
            <SectionWithFade title="University Summer Internship 2024 – 2025">
              <p>
                I worked for Media Design School during a Summer Internship where I built a
                multi-modal mental health system that analyzes both speech audio and facial
                expressions to classify emotions. It integrates the Patient Health Questionnaire-9
                (PHQ-9) for assessment. Both models were trained using Keras/TensorFlow from scratch
                with combined datasets and augmentation techniques.
              </p>
            </SectionWithFade>

            <SectionWithFade title="Model Architecture">
              <ul className="list-disc list-inside pl-6 [text-indent:-1.5rem] space-y-2">
                <li>
                  <strong>Video:</strong> OpenCV DNN face detection → feature extraction →
                  <strong> 2D CNN</strong> → 7 emotions.
                </li>
                <li>
                  <strong>Audio:</strong> Microphone input → Librosa features (Mel, MFCC + Δ + ΔΔ,
                  ZCR, RMS, Chroma) + wavelet stats → MinMaxScaler →
                  <strong> Keras dense model</strong> → 6 emotions.
                </li>
                <li>
                  <strong>Fusion:</strong> Dense layer combines video/audio probabilities for final
                  classification.
                </li>
                <li>
                  <strong>Flow:</strong> Threaded capture → queues → live plots (matplotlib) →
                  per-modality counts + session summary.
                </li>
              </ul>
            </SectionWithFade>

            <SectionWithFade title="Tech Stack">
              <ul className="list-disc list-inside pl-6 [text-indent:-1.5rem] space-y-2">
                <li>Python / TensorFlow / Keras</li>
                <li>OpenCV for real-time video frame processing</li>
                <li>Librosa for audio feature extraction</li>
                <li>gTTS + VLC, SpeechRecognition, sounddevice</li>
                <li>Streamlit prototype interface</li>
              </ul>
            </SectionWithFade>

            <SectionWithFade title="Datasets Used">
              <h3 className="text-base font-semibold text-gray-300 mt-4 mb-2">
                Facial Emotion Recognition (FER)
              </h3>
              <ul className="list-disc list-inside pl-6 [text-indent:-1.5rem] space-y-2">
                <li>
                  <strong>FER2013</strong> — 35,887 grayscale 48×48 images labeled with seven
                  emotions (Goodfellow et al., 2013).
                </li>
                <li>
                  <strong>RAF-DB</strong> — 15,000 color 100×100 images labeled with seven emotions
                  and verified by 40 annotators (Li & Deng, 2017).
                </li>
                <li>
                  <em>Augmentation:</em> rotation ±20°, shift ±20%, shear 8%, zoom ±10%, horizontal
                  flip.
                </li>
              </ul>

              <h3 className="text-base font-semibold text-gray-300 mt-6 mb-2">
                Speech Emotion Recognition (SER)
              </h3>
              <ul className="list-disc list-inside pl-6 [text-indent:-1.5rem] space-y-2">
                <li>
                  <strong>CREMA-D</strong> — Crowd-sourced Emotional Multimodal Actors dataset (Cao
                  et al., 2014).
                </li>
                <li>
                  <strong>TESS</strong> — Toronto Emotional Speech Set, 2,800 utterances from female
                  speakers aged 26 and 64.
                </li>
                <li>
                  <strong>RAVDESS</strong> — 7,356 audio files of emotional speech and song by 24
                  actors.
                </li>
                <li>
                  <strong>EMO-DB</strong> — 535 German utterances of acted emotional speech
                  (Burkhardt et al., 2005).
                </li>
                <li>
                  <em>Augmentation:</em> pitch shift, time stretch, and background noise; total
                  30,333 samples.
                </li>
              </ul>
            </SectionWithFade>

            <SectionWithFade title="Results">
              <p>
                The FER model achieved an accuracy of <strong>82%</strong> on the test set,
                performing best on Happy, Disgust, and Surprise emotions.
              </p>
              <p className="mt-4">
                The SER model reached <strong>78%</strong> accuracy, showing strong precision for
                Angry, Neutral, and Sad emotions. Both models demonstrated balanced generalisation
                and ran in real time on CPU.
              </p>
            </SectionWithFade>
          </div>

          {/* ---------- RIGHT VIDEO COLUMN (no fade) ---------- */}
          <motion.div
            className="flex-1 flex justify-center sticky top-24 self-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <video
              src="/SummerAssignment.mp4"
              className="rounded-xl border border-blue-500/20 w-full max-w-xl h-[400px] object-contain object-center"
              autoPlay
              loop
              muted
              playsInline
              controls
            />
          </motion.div>
        </div>

        {/* Back button — no fade */}
        <div className="w-full flex justify-center mt-12">
          <a
            href="/#projects"
            className="inline-block px-6 py-3 rounded-lg border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 transition"
          >
            ← Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
