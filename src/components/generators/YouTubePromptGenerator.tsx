import React, { useState, useRef } from 'react';
import { Youtube, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { generatePromptApi } from '../../services/api';
import { GeneratedPromptCard } from '../GeneratedPromptCard';

interface YouTubePromptGeneratorProps {
  onSavePrompt: (prompt: string, category: string, title?: string) => void;
  onAddToHistory: (prompt: string, category: string, idea?: string) => void;
}

const VIDEO_TYPES = [
  'Documentary / Video Essay',
  'Step-by-Step Tutorial',
  'Deep Dive Analysis',
  'Listicle / Top 10 Countdown',
  'Storytelling / Case Study',
  'Product Review / Comparison',
  'Podcast Highlights',
  'YouTube Short / Reel Script',
];

const DURATIONS = [
  'Under 60s (Shorts)',
  '5-8 Minutes',
  '10-15 Minutes',
  '20-30 Minutes',
  '45+ Minutes (Podcast / Longform)',
];

const AUDIENCES = [
  'Tech Enthusiasts & Developers',
  'Entrepreneurs & Freelancers',
  'Students & Lifelong Learners',
  'Fitness & Wellness Seekers',
  'General Curious Public',
  'Finance & Investors',
];

export const YouTubePromptGenerator: React.FC<YouTubePromptGeneratorProps> = ({
  onSavePrompt,
  onAddToHistory,
}) => {
  const [topic, setTopic] = useState('');
  const [targetAudience, setTargetAudience] = useState('General Curious Public');
  const [language, setLanguage] = useState('English');
  const [videoType, setVideoType] = useState('Documentary / Video Essay');
  const [duration, setDuration] = useState('10-15 Minutes');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a video topic first.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await generatePromptApi({
        idea: topic.trim(),
        language,
        generatorType: 'youtube',
        customParams: {
          targetAudience,
          videoType,
          duration,
        },
      });

      setGeneratedPrompt(response.prompt);
      onAddToHistory(response.prompt, 'YouTube', topic.trim());

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
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-semibold">
          <Youtube className="w-3.5 h-3.5" />
          <span>Algorithm & Retention Optimized</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
          YouTube Prompt Generator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Generate complete YouTube creator kits: 10 viral title ideas, high-retention opening hooks, descriptions, 5-act outlines, thumbnail ideas, and SEO keywords.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
            What is your video topic or core thesis?
          </label>
          <textarea
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              if (error) setError(null);
            }}
            rows={3}
            placeholder="e.g. How Nvidia quietly built the world's most valuable monopoly before anyone noticed..."
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Video Type
            </label>
            <select
              value={videoType}
              onChange={(e) => setVideoType(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs sm:text-sm"
            >
              {VIDEO_TYPES.map((vt) => (
                <option key={vt} value={vt}>
                  {vt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Target Audience
            </label>
            <select
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs sm:text-sm"
            >
              {AUDIENCES.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Desired Duration
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
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs sm:text-sm"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Hinglish">Hinglish</option>
            </select>
          </div>
        </div>

        <button
          id="btn-generate-youtube-prompt"
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-red-600/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Generating YouTube Growth Package...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Generate Full YouTube Kit</span>
            </>
          )}
        </button>
      </div>

      <div ref={resultRef}>
        {generatedPrompt && (
          <GeneratedPromptCard
            prompt={generatedPrompt}
            category="YouTube"
            originalIdea={topic}
            onRegenerate={handleGenerate}
            onSave={onSavePrompt}
          />
        )}
      </div>
    </div>
  );
};
