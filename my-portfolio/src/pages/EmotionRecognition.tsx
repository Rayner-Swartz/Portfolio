export default function EmotionRecognition() {
  return (
    <div className="min-h-screen bg-black text-gray-200 flex flex-col items-center px-6 py-20">
      <h1 className="text-3xl sm:text-4xl font-bold gradient-text animate-gradient mb-6">
        AI Emotion Recognition
      </h1>

      <p className="max-w-3xl text-center text-gray-400 mb-10">
        This project uses deep learning to detect emotions from both speech and
        facial expressions in real time. It combines a CNN-based facial
        recognition model with a Keras LSTM model trained on the RAVDESS and
        FER-2013 datasets.
      </p>

      <img
        src="/emotion.png"
        alt="AI Emotion Recognition Demo"
        className="rounded-xl border border-blue-500/20 mb-10 w-full max-w-xl object-cover object-center"
      />

      <div className="max-w-3xl text-left space-y-6 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-blue-400 mb-2">
            🧠 Model Architecture
          </h2>
          <p>
            The model pipeline includes feature extraction using MFCCs for audio,
            a CNN for facial expression analysis, and a dense fusion layer for
            final emotion classification across seven categories.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-blue-400 mb-2">
            ⚙️ Tech Stack
          </h2>
          <ul className="list-disc list-inside text-gray-400">
            <li>Python / TensorFlow / Keras</li>
            <li>OpenCV for real-time video frame processing</li>
            <li>Librosa for audio feature extraction</li>
            <li>Streamlit prototype interface</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-blue-400 mb-2">
            🎯 Results
          </h2>
          <p>
            Achieved ~83 % accuracy on validation data and runs in real time on
            CPU for short audio/video segments. Future work includes fusing
            contextual cues to improve multi-modal prediction accuracy.
          </p>
        </section>

        <a
          href="/#projects"
          className="inline-block mt-8 px-6 py-3 rounded-lg border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 transition"
        >
          ← Back to Portfolio
        </a>
      </div>
    </div>
  );
}
