import React, { useState, useRef } from 'react';
import { Briefcase, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { generatePromptApi } from '../../services/api';
import { GeneratedPromptCard } from '../GeneratedPromptCard';

interface BusinessPromptGeneratorProps {
  onSavePrompt: (prompt: string, category: string, title?: string) => void;
  onAddToHistory: (prompt: string, category: string, idea?: string) => void;
}

const TEMPLATES = [
  'Business idea',
  'Marketing plan',
  'Business plan',
  'Customer research',
  'Brand name',
  'Advertisement',
  'Product description',
  'Sales copy',
  'Social media marketing',
];

export const BusinessPromptGenerator: React.FC<BusinessPromptGeneratorProps> = ({
  onSavePrompt,
  onAddToHistory,
}) => {
  const [templateType, setTemplateType] = useState('Business plan');
  const [idea, setIdea] = useState('');
  const [targetMarket, setTargetMarket] = useState('Early-stage startups and remote teams');
  const [tone, setTone] = useState('Professional');
  const [detailLevel, setDetailLevel] = useState('Expert');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!idea.trim()) {
      setError('Please provide details about your business concept or offer.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await generatePromptApi({
        idea: idea.trim(),
        tone,
        detailLevel,
        generatorType: 'business',
        customParams: {
          templateType,
          targetMarket,
        },
      });

      setGeneratedPrompt(response.prompt);
      onAddToHistory(response.prompt, `Business: ${templateType}`, idea.trim());

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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-semibold">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Strategic Executive & Commercial Suite</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
          Business Prompt Generator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Engineer high-leverage business prompts for startup business plans, go-to-market strategies, customer research, sales copy, and advertising campaigns.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            Select Business Framework / Template
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {TEMPLATES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTemplateType(t)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left truncate ${
                  templateType === t
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
            Describe your product, service, or business idea:
          </label>
          <textarea
            value={idea}
            onChange={(e) => {
              setIdea(e.target.value);
              if (error) setError(null);
            }}
            rows={3}
            placeholder="e.g. An AI-powered automated inventory forecasting tool for Shopify fashion merchants with under 50 employees..."
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Target Market / Demographic
            </label>
            <input
              type="text"
              value={targetMarket}
              onChange={(e) => setTargetMarket(e.target.value)}
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
              <option value="Professional">Professional & Strategic</option>
              <option value="Persuasive">High-Converting Sales</option>
              <option value="Direct">Concise & Action-Oriented</option>
              <option value="Analytical">Data & Metrics Driven</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Detail Level
            </label>
            <select
              value={detailLevel}
              onChange={(e) => setDetailLevel(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs sm:text-sm"
            >
              <option value="Basic">Executive Summary</option>
              <option value="Detailed">Comprehensive</option>
              <option value="Expert">Master Strategy (Extensive)</option>
            </select>
          </div>
        </div>

        <button
          id="btn-generate-business-prompt"
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-amber-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Architecting Business Prompt...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Generate Business Prompt</span>
            </>
          )}
        </button>
      </div>

      <div ref={resultRef}>
        {generatedPrompt && (
          <GeneratedPromptCard
            prompt={generatedPrompt}
            category={`Business (${templateType})`}
            originalIdea={idea}
            onRegenerate={handleGenerate}
            onSave={onSavePrompt}
          />
        )}
      </div>
    </div>
  );
};
