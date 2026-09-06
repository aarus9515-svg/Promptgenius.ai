import React, { useState, useRef } from 'react';
import { GraduationCap, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { generatePromptApi } from '../../services/api';
import { GeneratedPromptCard } from '../GeneratedPromptCard';

interface StudyPromptGeneratorProps {
  onSavePrompt: (prompt: string, category: string, title?: string) => void;
  onAddToHistory: (prompt: string, category: string, idea?: string) => void;
}

const STUDY_TOOLS = [
  'Study plan',
  'Topic explanation',
  'Quiz generator',
  'Flashcards',
  'Revision plan',
  'Homework helper',
  'Exam preparation',
];

const LEVELS = [
  'Middle / High School',
  'Undergraduate / College',
  'Graduate / Master level',
  'Medical / Law / Professional Boards',
  'Curious Beginner / Self-Taught',
];

export const StudyPromptGenerator: React.FC<StudyPromptGeneratorProps> = ({
  onSavePrompt,
  onAddToHistory,
}) => {
  const [toolType, setToolType] = useState('Topic explanation');
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('Undergraduate / College');
  const [tone, setTone] = useState('Expert');
  const [language, setLanguage] = useState('English');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please specify the academic subject or concept.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await generatePromptApi({
        idea: topic.trim(),
        language,
        tone,
        generatorType: 'study',
        customParams: {
          toolType,
          level,
        },
      });

      setGeneratedPrompt(response.prompt);
      onAddToHistory(response.prompt, `Study: ${toolType}`, topic.trim());

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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-semibold">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Cognitive Science & Active Recall</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
          Study & Academic Prompt Generator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Engineer pedagogical prompts designed for students and educators: Socratic explanations, active recall flashcards, practice quizzes, revision schedules, and exam simulators.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            Select Study Tool
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {STUDY_TOOLS.map((tool) => (
              <button
                key={tool}
                type="button"
                onClick={() => setToolType(tool)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left truncate ${
                  toolType === tool
                    ? 'bg-teal-600 text-white font-bold shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {tool}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
            What subject, topic or chapter are you studying?
          </label>
          <textarea
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              if (error) setError(null);
            }}
            rows={3}
            placeholder="e.g. Cellular Respiration and the Krebs Cycle, or Discounted Cash Flow (DCF) Valuation models..."
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
              Grade / Difficulty Level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs sm:text-sm"
            >
              {LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
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
              <option value="Encouraging & Patient">Encouraging & Patient</option>
              <option value="Socratic & Challenging">Socratic & Challenging</option>
              <option value="Simple (ELI5)">Simple & Analogous (ELI5)</option>
              <option value="Academic & Rigorous">Academic & Rigorous</option>
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
          id="btn-generate-study-prompt"
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-teal-600/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Constructing Student-Friendly Prompt...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Generate Academic Prompt</span>
            </>
          )}
        </button>
      </div>

      <div ref={resultRef}>
        {generatedPrompt && (
          <GeneratedPromptCard
            prompt={generatedPrompt}
            category={`Study (${toolType})`}
            originalIdea={topic}
            onRegenerate={handleGenerate}
            onSave={onSavePrompt}
          />
        )}
      </div>
    </div>
  );
};
