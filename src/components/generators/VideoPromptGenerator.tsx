import React, { useState, useRef } from 'react';
import { Video as VideoIcon, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { generatePromptApi } from '../../services/api';
import { GeneratedPromptCard } from '../GeneratedPromptCard';

interface VideoPromptGeneratorProps {
  onSavePrompt: (prompt: string, category: string, title?: string) => void;
  onAddToHistory: (prompt: string, category: string, idea?: string) => void;
}

const VIDEO_STYLES = [
  'Cinematic 35mm',
  'Photorealistic 8K',
  'Drone Aerial FPV',
  'Hyperlapse / Timetable',
  'Anime / 2D Studio Ghibli',
  '3D Pixar Animation',
  'Vintage 16mm Film',
  'Documentary Style',
];

const DURATIONS = ['4s', '6s', '10s', '15s'];

const CAMERA_MOVEMENTS = [
  'Smooth Tracking Shot',
  'Dynamic FPV Drone Push-In',
  'Orbiting 360 Degree',
  'Slow Crane Boom Up',
  'Handheld Shaky-Cam Documentary',
  'Static Tripod Lockdown',
  'Dolly Zoom (Vertigo Effect)',
];

const LIGHTINGS = [
  'Dramatic Chiaroscuro',
  'Golden Hour Sunlight',
  'Moody Cyberpunk Neon',
  'Diffused Overcast Daylight',
  'Studio Softbox Key Light',
  'Ethereal Volumetric Moonlight',
];

const ENVIRONMENTS = [
  'Futuristic Cybernetic Metropolis',
  'Pristine Nordic Fjords & Glaciers',
  'Desert Sand Dunes at Sunset',
  'Cozy Coffee Shop with Rain on Glass',
  'Deep Space Orbital Station',
  'Lush Bioluminescent Rainforest',
];

const MOODS = [
  'Tense & Suspenseful',
  'Inspiring & Uplifting',
  'Contemplative & Serene',
  'Energetic & Fast-Paced',
  'Mysterious & Dreamlike',
  'Epic & Majestic',
];

export const VideoPromptGenerator: React.FC<VideoPromptGeneratorProps> = ({
  onSavePrompt,
  onAddToHistory,
}) => {
  const [idea, setIdea] = useState('');
  const [style, setStyle] = useState('Cinematic 35mm');
  const [duration, setDuration] = useState('6s');
  const [cameraMovement, setCameraMovement] = useState('Smooth Tracking Shot');
  const [lighting, setLighting] = useState('Golden Hour Sunlight');
  const [environment, setEnvironment] = useState('Pristine Nordic Fjords & Glaciers');
  const [character, setCharacter] = useState('A lone explorer in weathered arctic gear');
  const [mood, setMood] = useState('Epic & Majestic');
  const [aspectRatio, setAspectRatio] = useState('16:9');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!idea.trim()) {
      setError('Please enter your video concept first.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await generatePromptApi({
        idea: idea.trim(),
        generatorType: 'video',
        customParams: {
          style,
          duration,
          cameraMovement,
          lighting,
          environment,
          character,
          mood,
          aspectRatio,
        },
      });

      setGeneratedPrompt(response.prompt);
      onAddToHistory(response.prompt, 'AI Video', idea.trim());

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-xs font-semibold">
          <VideoIcon className="w-3.5 h-3.5" />
          <span>Sora, Runway Gen-3, Kling & Luma Optimized</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
          AI Video Prompt Generator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Generate structured cinematic video prompts specifying physical motion, camera kinetics, scene pacing, and atmosphere.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
            What video do you want to create?
          </label>
          <textarea
            value={idea}
            onChange={(e) => {
              setIdea(e.target.value);
              if (error) setError(null);
            }}
            rows={3}
            placeholder="e.g. A vintage train speeding across a snow-covered viaduct in the Swiss Alps as fireworks illuminate the mountain peaks..."
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Character / Subject Input */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Key Character / Focal Subject
          </label>
          <input
            type="text"
            value={character}
            onChange={(e) => setCharacter(e.target.value)}
            placeholder="Describe attire, facial expression, action"
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Selectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Video Style
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs sm:text-sm"
            >
              {VIDEO_STYLES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Camera Movement
            </label>
            <select
              value={cameraMovement}
              onChange={(e) => setCameraMovement(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs sm:text-sm"
            >
              {CAMERA_MOVEMENTS.map((cm) => (
                <option key={cm} value={cm}>
                  {cm}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Lighting
            </label>
            <select
              value={lighting}
              onChange={(e) => setLighting(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs sm:text-sm"
            >
              {LIGHTINGS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Environment
            </label>
            <select
              value={environment}
              onChange={(e) => setEnvironment(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs sm:text-sm"
            >
              {ENVIRONMENTS.map((env) => (
                <option key={env} value={env}>
                  {env}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Mood
            </label>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs sm:text-sm"
            >
              {MOODS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs sm:text-sm"
            >
              {DURATIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Aspect Ratio
            </label>
            <select
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs sm:text-sm"
            >
              <option value="16:9">16:9 (Landscape / YouTube)</option>
              <option value="9:16">9:16 (Vertical / Reels / TikTok)</option>
              <option value="1:1">1:1 (Square)</option>
            </select>
          </div>
        </div>

        <button
          id="btn-generate-video-prompt"
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3.5 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-violet-600/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Generating Director-Grade Video Prompt...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Generate Structured Video Prompt</span>
            </>
          )}
        </button>
      </div>

      <div ref={resultRef}>
        {generatedPrompt && (
          <GeneratedPromptCard
            prompt={generatedPrompt}
            category="AI Video"
            originalIdea={idea}
            onRegenerate={handleGenerate}
            onSave={onSavePrompt}
          />
        )}
      </div>
    </div>
  );
};
