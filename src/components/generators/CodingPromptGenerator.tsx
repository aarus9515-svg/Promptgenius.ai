import React, { useState, useRef } from 'react';
import { Code2, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { generatePromptApi } from '../../services/api';
import { GeneratedPromptCard } from '../GeneratedPromptCard';

interface CodingPromptGeneratorProps {
  onSavePrompt: (prompt: string, category: string, title?: string) => void;
  onAddToHistory: (prompt: string, category: string, idea?: string) => void;
}

const ACTIONS = [
  'Build project',
  'Debug',
  'Refactor',
  'Optimize',
  'Explain code',
  'Documentation',
];

const LANGUAGES = [
  'TypeScript / JavaScript',
  'Python',
  'Rust',
  'Go (Golang)',
  'Java / Spring Boot',
  'C++ / C#',
  'SQL / PostgreSQL',
  'HTML / Tailwind CSS',
];

const PROJECT_TYPES = [
  'Full-Stack Web App',
  'REST or GraphQL API Backend',
  'Mobile Application (React Native / Flutter)',
  'Microservice / Distributed System',
  'CLI Tool / Automation Script',
  'Database Schema & Migrations',
  'AI / Machine Learning Pipeline',
];

const SKILL_LEVELS = [
  'Junior Developer',
  'Mid-Level Engineer',
  'Senior Software Architect',
  'Principal / Staff Engineer',
];

export const CodingPromptGenerator: React.FC<CodingPromptGeneratorProps> = ({
  onSavePrompt,
  onAddToHistory,
}) => {
  const [actionType, setActionType] = useState('Build project');
  const [problem, setProblem] = useState('');
  const [language, setLanguage] = useState('TypeScript / JavaScript');
  const [projectType, setProjectType] = useState('Full-Stack Web App');
  const [skillLevel, setSkillLevel] = useState('Senior Software Architect');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!problem.trim()) {
      setError('Please describe your programming task or problem.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await generatePromptApi({
        idea: problem.trim(),
        generatorType: 'coding',
        customParams: {
          actionType,
          language,
          projectType,
          skillLevel,
        },
      });

      setGeneratedPrompt(response.prompt);
      onAddToHistory(response.prompt, `Coding: ${actionType}`, problem.trim());

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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300 text-xs font-semibold">
          <Code2 className="w-3.5 h-3.5" />
          <span>Claude 3.7 Sonnet, Gemini 3.1 Pro & GPT-4o Ready</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
          Coding Prompt Generator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Generate software engineering prompts with architectural guardrails, edge-case handling, type signatures, and performance constraints.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            Select Coding Action
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ACTIONS.map((act) => (
              <button
                key={act}
                type="button"
                onClick={() => setActionType(act)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left truncate ${
                  actionType === act
                    ? 'bg-cyan-600 text-white font-bold shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {act}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
            Describe the problem, feature, or code snippet to analyze:
          </label>
          <textarea
            value={problem}
            onChange={(e) => {
              setProblem(e.target.value);
              if (error) setError(null);
            }}
            rows={4}
            placeholder="e.g. Implement a thread-safe distributed rate limiter using Redis token-bucket with sliding window fallback in TypeScript..."
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-mono text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
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
              Programming Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs sm:text-sm"
            >
              {LANGUAGES.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Project Type
            </label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs sm:text-sm"
            >
              {PROJECT_TYPES.map((pt) => (
                <option key={pt} value={pt}>
                  {pt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Skill Level Context
            </label>
            <select
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs sm:text-sm"
            >
              {SKILL_LEVELS.map((sl) => (
                <option key={sl} value={sl}>
                  {sl}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          id="btn-generate-coding-prompt"
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3.5 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-cyan-600/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Engineering Senior Architect Prompt...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Generate Developer Prompt</span>
            </>
          )}
        </button>
      </div>

      <div ref={resultRef}>
        {generatedPrompt && (
          <GeneratedPromptCard
            prompt={generatedPrompt}
            category={`Coding (${actionType})`}
            originalIdea={problem}
            onRegenerate={handleGenerate}
            onSave={onSavePrompt}
          />
        )}
      </div>
    </div>
  );
};
