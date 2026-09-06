import React, { useState, useRef } from 'react';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Loader2,
  AlertCircle,
  Lightbulb,
  Zap,
} from 'lucide-react';
import { Category, Language, Tone, DetailLevel } from '../../types';
import { generatePromptApi } from '../../services/api';
import { GeneratedPromptCard } from '../GeneratedPromptCard';

interface HomeGeneratorProps {
  onSavePrompt: (prompt: string, category: string, title?: string) => void;
  onAddToHistory: (prompt: string, category: string, idea?: string) => void;
  onNavigate: (route: string) => void;
}

const CATEGORIES: Category[] = [
  'General',
  'ChatGPT',
  'Gemini',
  'AI Image',
  'AI Video',
  'YouTube',
  'Instagram',
  'Facebook',
  'Business',
  'Marketing',
  'Coding',
  'Study',
  'Writing',
];

const LANGUAGES: Language[] = ['English', 'Hindi', 'Hinglish'];
const TONES: Tone[] = ['Professional', 'Friendly', 'Creative', 'Cinematic', 'Simple', 'Expert'];
const DETAIL_LEVELS: DetailLevel[] = ['Basic', 'Detailed', 'Expert'];

const SAMPLE_IDEAS = [
  'Create a cinematic YouTube video about a successful tech entrepreneur',
  'High-converting B2B SaaS cold email sequence for VP of Product',
  'Cyberpunk street scene with neon rain reflections in 8k',
  'Explain quantum entanglement using simple daily life analogies',
  'TypeScript backend architecture for real-time WebSocket messaging',
];

export const HomeGenerator: React.FC<HomeGeneratorProps> = ({
  onSavePrompt,
  onAddToHistory,
  onNavigate,
}) => {
  const [idea, setIdea] = useState('');
  const [category, setCategory] = useState<Category>('General');
  const [language, setLanguage] = useState<Language>('English');
  const [tone, setTone] = useState<Tone>('Professional');
  const [detailLevel, setDetailLevel] = useState<DetailLevel>('Detailed');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!idea.trim()) {
      setError('Please enter an idea first.');
      if (inputRef.current) inputRef.current.focus();
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await generatePromptApi({
        idea: idea.trim(),
        category,
        language,
        tone,
        detailLevel,
        generatorType: 'general',
      });

      setGeneratedPrompt(response.prompt);
      onAddToHistory(response.prompt, category, idea.trim());

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleApplySample = (sample: string) => {
    setIdea(sample);
    setError(null);
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section
        id="hero-section"
        className="relative pt-6 sm:pt-12 text-center max-w-4xl mx-auto px-4"
      >
        {/* Subtle background glow pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Next-Gen AI Prompt Engineering</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white font-['Outfit'] leading-tight mb-4">
          Create Better AI Prompts in Seconds
        </h1>

        <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
          Turn a simple idea into a professional, detailed and AI-ready prompt.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
          <button
            id="hero-cta-generate"
            onClick={() => {
              inputRef.current?.focus();
              inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm sm:text-base shadow-lg shadow-indigo-600/25 active:scale-98 transition-all flex items-center gap-2"
          >
            <span>Generate Prompt</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="hero-cta-library"
            onClick={() => onNavigate('library')}
            className="px-6 py-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-semibold text-sm sm:text-base shadow-xs transition-all flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span>Explore Prompt Library</span>
          </button>
        </div>
      </section>

      {/* Main Generator Box */}
      <section
        id="generator-box-container"
        className="max-w-4xl mx-auto px-4 sm:px-6"
      >
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 shadow-xl">
          {/* Quick Idea Starters */}
          <div className="mb-4 flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Try an idea:
            </span>
            {SAMPLE_IDEAS.slice(0, 3).map((sample, idx) => (
              <button
                key={idx}
                onClick={() => handleApplySample(sample)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/60 dark:hover:text-indigo-400 transition-colors truncate max-w-[240px]"
                title={sample}
              >
                {sample}
              </button>
            ))}
          </div>

          {/* Large Prompt Input Box */}
          <div className="relative mb-6">
            <textarea
              id="main-idea-input"
              ref={inputRef}
              value={idea}
              onChange={(e) => {
                setIdea(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Example: Create a cinematic YouTube video about a successful entrepreneur..."
              rows={4}
              maxLength={2500}
              className={`w-full p-4 sm:p-5 rounded-2xl border text-slate-900 dark:text-slate-100 bg-slate-50/50 dark:bg-slate-950/70 placeholder:text-slate-400 text-base leading-relaxed resize-y focus:outline-hidden transition-all ${
                error
                  ? 'border-rose-500 ring-2 ring-rose-500/20'
                  : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
              }`}
              aria-label="Enter your prompt idea"
            />
            <div className="absolute right-3 bottom-3 text-[11px] text-slate-400 font-mono">
              {idea.length}/2500
            </div>
          </div>

          {/* Error Notice */}
          {error && (
            <div
              id="generator-error-banner"
              className="mb-6 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-center justify-between gap-3 text-sm text-rose-700 dark:text-rose-300"
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
              <button
                onClick={handleGenerate}
                className="text-xs font-semibold px-2.5 py-1 rounded-md bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200 hover:bg-rose-300 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Selectors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Category Selector */}
            <div>
              <label
                htmlFor="category-select"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Category
              </label>
              <select
                id="category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Selector */}
            <div>
              <label
                htmlFor="language-select"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Language
              </label>
              <select
                id="language-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Tone Selector */}
            <div>
              <label
                htmlFor="tone-select"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Tone
              </label>
              <select
                id="tone-select"
                value={tone}
                onChange={(e) => setTone(e.target.value as Tone)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              >
                {TONES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Detail Level Selector */}
            <div>
              <label
                htmlFor="detail-level-select"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Detail Level
              </label>
              <select
                id="detail-level-select"
                value={detailLevel}
                onChange={(e) => setDetailLevel(e.target.value as DetailLevel)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              >
                {DETAIL_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Button */}
          <div>
            <button
              id="btn-generate-main-prompt"
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-base shadow-xl shadow-indigo-600/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Engineering Your Prompt with Gemini...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>✨ Generate Prompt</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Generated Result Card Area */}
      <div ref={resultRef} className="max-w-4xl mx-auto px-4 sm:px-6">
        {generatedPrompt && (
          <GeneratedPromptCard
            prompt={generatedPrompt}
            category={category}
            originalIdea={idea}
            onRegenerate={handleGenerate}
            onSave={(promptToSave, cat, title) => onSavePrompt(promptToSave, cat, title)}
          />
        )}
      </div>

      {/* Specialized Tools Promotion Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Outfit']">
            Specialized Creator Prompt Engines
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Dedicated multi-parameter builders for images, videos, YouTube, social media, coding, and business.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { id: 'image-prompt', title: 'AI Image', desc: 'Lens, lighting & style' },
            { id: 'video-prompt', title: 'AI Video', desc: 'Camera motion & physics' },
            { id: 'youtube', title: 'YouTube', desc: 'Titles, hooks & script' },
            { id: 'social-media', title: 'Social Media', desc: 'Hooks & viral copy' },
            { id: 'coding', title: 'Coding', desc: 'Architectural prompts' },
            { id: 'business', title: 'Business', desc: 'Plans, ads & sales copy' },
          ].map((tool) => (
            <div
              key={tool.id}
              onClick={() => onNavigate(tool.id)}
              className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 shadow-xs hover:shadow-md cursor-pointer transition-all group text-left"
            >
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {tool.title}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                {tool.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
