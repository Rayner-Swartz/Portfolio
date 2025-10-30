export default function EmotionRecognition() {
  return (
     <div className="relative min-h-screen bg-black text-gray-200 px-6 py-5">
      {/* decorative line + tint, behind everything */}
      
      <div aria-hidden className="pointer-events-none absolute top-42 bottom-0 left-[50%] right-0 bg-blue-400/5 z-0" />

      
      {/* All visible content */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl font-bold gradient-text animate-gradient mb-6 pb-1">
          Emotion Recognition
        </h1>

        <p className="max-w-3xl text-center text-gray-400 mb-10">
          This project uses deep learning to detect emotions from both speech and
          facial expressions in real time, using the PHQ-9 mental health questionnaire.
          It combines a 2D CNN-based facial recognition model with an ANN model.
        </p>

        <div className="flex flex-col lg:flex-row items-start justify-center gap-12 w-full max-w-6xl mt-10">
          {/* Left: Text Content */}
          <div className="flex-1 max-w-3xl text-left space-y-6 space-x-30 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-blue-400 mb-2 gradient-text animate-gradient">
                University Summer Internship 2024 – 2025
              </h2>
              <p>
                I worked for Media Design School for a Summer Internship, I built a multi-modal mental health system.
                The system analyzes both speech audio and facial expressions to classify emotions.
                It uses the Patient Health Questionnaire – 9 to conduct the assessment. Both models
                were trained using Keras Tensorflow from scratch, using multiple combined datasets and augmentation techniques.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-400 mb-2 gradient-text animate-gradient">
                Model Architecture
              </h2>
              <ul className="max-w-3xl text-left text-gray-700 mb-10 list-disc list-inside pl-6 [text-indent:-1.5rem] text-sm">
                <li><strong>Video:</strong> OpenCV DNN face detection → Feature Extraction → <strong>2D CNN</strong> → 7 emotions.</li>
                <li><strong>Audio:</strong> Microphone Recorded → Librosa feature extraction (Mel, MFCC + Δ + ΔΔ, ZCR, RMS, Chroma) + wavelet stats → MinMaxScaler → <strong>Keras dense model</strong> → 6 emotions.</li>
                <li><strong>Fusion:</strong> Dense layer combines video/audio probabilities for final classification.</li>
                <li><strong>Flow:</strong> Threaded capture → queues → live plots (matplotlib) → per-modality counts + session summary.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-400 mb-2 gradient-text animate-gradient">
                Tech Stack
              </h2>
              <ul className="max-w-3xl text-left text-gray-700 mb-10 list-disc list-inside pl-6 [text-indent:-1.5rem] text-sm">
                <li>Python / TensorFlow / Keras</li>
                <li>OpenCV for real-time video frame processing</li>
                <li>Librosa for audio feature extraction</li>
                <li>gTTS + VLC, SpeechRecognition, sounddevice</li>
                <li>Streamlit prototype interface</li>
              </ul>
            </section>
            <section>
  <h2 className="text-xl font-semibold text-blue-400 mb-2 gradient-text animate-gradient">
    Datasets Used
  </h2>

  {/* Facial Emotion Recognition */}
  <h3 className="text-base font-semibold text-gray-700 mt-4 mb-2">Facial Emotion Recognition (FER)</h3>
  <ul className="max-w-3xl text-left text-gray-700 mb-6 list-disc list-inside pl-6 [text-indent:-1.5rem] text-sm">
    <li>
      <strong>FER2013</strong> — 35,887 grayscale 48×48 images labelled with seven emotions
      (Anger, Happy, Surprise, Neutral, Sad, Disgust, Fear). 
      (Goodfellow et al., 2013). 
    </li>
    <li>
      <strong>Real-World Affective Database (RAF-DB)</strong> — 15,000 colour 100×100 images
      labelled with the same seven emotions and verified by 40 annotators (Li & Deng, 2017).
      These were resized and normalised to align with FER2013.
    </li>
    <li>
      <em>Data Augmentation:</em> rotation (±20°), width/height shifts (±20%), shear (8%), zoom (±10%),
      horizontal flip, and nearest fill mode. These ensured balance and improved generalisation.
    </li>
  </ul>

  {/* Speech Emotion Recognition */}
  <h3 className="text-base font-semibold text-gray-700 mt-2 mb-2">Speech Emotion Recognition (SER)</h3>
  <ul className="max-w-3xl text-left text-gray-700 mb-6 list-disc list-inside pl-6 [text-indent:-1.5rem] text-sm">
    <li>
      <strong>CREMA-D</strong> — Crowd-sourced Emotional Multimodal Actors dataset (Cao et al., 2014),
      providing diverse speakers and recording conditions.
    </li>
    <li>
      <strong>TESS</strong> (Toronto Emotional Speech Set) — 2,800 English utterances from female speakers
      aged 26 and 64 (Pichora-Fuller & Dupuis, 2020).
    </li>
    <li>
      <strong>RAVDESS</strong> — 7,356 audio files of emotional speech and song by 24 actors
      (Livingstone & Russo, 2018).
    </li>
    <li>
      <strong>EMO-DB</strong> — 535 German utterances of acted emotional speech
      (Burkhardt et al., 2005), improving generalisation across languages and tone.
    </li>
    <li>
      
      <em>Augmentation:</em> pitch shifting, time stretching, and background noise addition.
      Final merged dataset: <strong>30,333 samples</strong>.
    </li>
  </ul>

  
</section>

            
            <section>
  <h2 className="text-xl font-semibold text-blue-400 mb-2 gradient-text animate-gradient">
    Results
  </h2>
  <p className="text-gray-700 text-sm">
    The FER model achieved an accuracy of <strong>82%</strong> on the test set,
    performing best on Happy, Disgust, and Surprise emotions.<br /><br /> The SER model
    reached <strong>78%</strong> accuracy, showing strong precision for Angry, Neutral, and Sad emotions.
    Both models demonstrated balanced generalisation across classes and operated in real time on CPU.
  </p>
</section>

            <a
              href="/#projects"
              className="inline-block mt-8 px-6 py-3 rounded-lg border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 transition"
            >
              ← Back to Portfolio
            </a>
          </div>

          {/* Right: Video */}
          <div className="flex-1 flex justify-center">
            <video
              src="/SummerAssignment.mp4"
              className="rounded-xl border border-blue-500/20 w-full max-w-xl h-[400px] object-contain object-center"
              autoPlay
              loop
              muted
              playsInline
              controls
            />
          </div>
        </div>
      </div>
    </div>
  );
}
