import React, { useState, useRef } from 'react';
import { Share2, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { generatePromptApi } from '../../services/api';
import { GeneratedPromptCard } from '../GeneratedPromptCard';

interface SocialMediaPromptGeneratorProps {
  onSavePrompt: (prompt: string, category: string, title?: string) => void;
  onAddToHistory: (prompt: string, category: string, idea?: string) => void;
}

const PLATFORMS = ['Instagram', 'Facebook', 'YouTube Shorts', 'LinkedIn', 'X (Twitter)'];

const TONES = [
  'Contrarian & Bold',
  'Conversational & Authentic',
  'Professional Thought Leader',
  'Humorous & Witty',
  'Educational & Analytical',
  'Inspirational & Motivating',
];

export const SocialMediaPromptGenerator: React.FC<SocialMediaPromptGeneratorProps> = ({
  onSavePrompt,
  onAddToHistory,
}) => {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('LinkedIn');
  const [audience, setAudience] = useState('Founders, engineers and tech leaders');
  const [language, setLanguage] = useState('English');
  const [tone, setTone] = useState('Conversational & Authentic');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter your topic or post concept.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await generatePromptApi({
        idea: topic.trim(),
        language,
        tone,
        generatorType: 'social',
        customParams: {
          platform,
          audience,
        },
      });

      setGeneratedPrompt(response.prompt);
      onAddToHistory(response.prompt, `Social (${platform})`, topic.trim());

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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold">
          <Share2 className="w-3.5 h-3.5" />
          <span>High-Conversion Social Copy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
          Social Media Prompt Generator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Generate platform-native social media packages: scroll-stopping hooks, punchy captions, high-converting CTAs, and viral hashtags for Instagram, X, and LinkedIn.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
            What is your post topic or insight?
          </label>
          <textarea
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              if (error) setError(null);
            }}
            rows={3}
            placeholder="e.g. Why most software engineers struggle with system design interviews and the 3 mental models that solve it..."
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
              Platform
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs sm:text-sm"
            >
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Target Audience
            </label>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="Demographic or niche"
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Tone
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs sm:text-sm"
            >
              {TONES.map((t) => (
                <option key={t} value={t}>
                  {t}
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
          id="btn-generate-social-prompt"
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Crafting Platform-Native Prompt...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Generate Social Media Blueprint</span>
            </>
          )}
        </button>
      </div>

      <div ref={resultRef}>
        {generatedPrompt && (
          <GeneratedPromptCard
            prompt={generatedPrompt}
            category={`Social (${platform})`}
            originalIdea={topic}
            onRegenerate={handleGenerate}
            onSave={onSavePrompt}
          />
        )}
      </div>
    </div>
  );
};
