import React, { useState } from 'react';
import {
  Copy,
  Sparkles,
  RefreshCw,
  Edit3,
  Check,
  Bookmark,
  Share2,
  BookmarkCheck,
  Zap,
} from 'lucide-react';
import { useToast } from './Toast';
import { improvePromptApi } from '../services/api';

interface GeneratedPromptCardProps {
  prompt: string;
  category: string;
  originalIdea?: string;
  onRegenerate: () => void;
  onSave: (promptToSave: string, category: string, title?: string) => void;
  isSaved?: boolean;
}

export const GeneratedPromptCard: React.FC<GeneratedPromptCardProps> = ({
  prompt,
  category,
  originalIdea,
  onRegenerate,
  onSave,
  isSaved = false,
}) => {
  const { showToast } = useToast();
  const [currentPrompt, setCurrentPrompt] = useState(prompt);
  const [isEditing, setIsEditing] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sync if new prompt arrives from parent
  React.useEffect(() => {
    setCurrentPrompt(prompt);
    setIsEditing(false);
  }, [prompt]);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(currentPrompt);
      } else {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = currentPrompt;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      showToast('Prompt copied!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Failed to copy to clipboard', 'error');
    }
  };

  const handleImprove = async () => {
    if (isImproving) return;
    setIsImproving(true);
    try {
      const res = await improvePromptApi({
        prompt: currentPrompt,
        category,
      });
      setCurrentPrompt(res.prompt);
      showToast('Prompt improved successfully!', 'success');
    } catch (err: any) {
      showToast(err?.message || 'Something went wrong. Please try again.', 'error');
    } finally {
      setIsImproving(false);
    }
  };

  const handleSave = () => {
    onSave(currentPrompt, category, originalIdea ? `${originalIdea.slice(0, 45)}...` : undefined);
    showToast('Prompt saved to your collection!', 'success');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'PromptGenius AI Generated Prompt',
          text: currentPrompt,
        });
        showToast('Shared successfully!', 'success');
        return;
      } catch (err: any) {
        if (err.name === 'AbortError') return;
      }
    }
    // Fallback: Copy to clipboard
    handleCopy();
    showToast('Prompt copied to clipboard for sharing!', 'info');
  };

  const wordCount = currentPrompt.trim().split(/\s+/).filter(Boolean).length;
  const charCount = currentPrompt.length;

  return (
    <div
      id="generated-prompt-card"
      className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-all"
    >
      {/* Card Header */}
      <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/10 dark:bg-indigo-400/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Outfit'] flex items-center gap-2">
              Your Optimized Prompt
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                {category || 'General'}
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ready for ChatGPT, Gemini, Claude, and specialized creator tools
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{charCount} chars</span>
        </div>
      </div>

      {/* Card Body / Text Area */}
      <div className="p-5">
        {isEditing ? (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Edit Your Prompt:
            </label>
            <textarea
              id="prompt-editor-textarea"
              value={currentPrompt}
              onChange={(e) => setCurrentPrompt(e.target.value)}
              rows={12}
              className="w-full p-4 rounded-xl border border-indigo-300 dark:border-indigo-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-mono text-sm leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              aria-label="Edit generated prompt"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setCurrentPrompt(prompt);
                  setIsEditing(false);
                }}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                Reset
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3.5 py-1.5 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Done Editing
              </button>
            </div>
          </div>
        ) : (
          <div
            id="prompt-content-view"
            className="relative p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed select-text overflow-x-auto max-h-[500px] overflow-y-auto"
          >
            {currentPrompt}
          </div>
        )}
      </div>

      {/* Action Buttons Bar */}
      <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2">
          {/* Copy Prompt */}
          <button
            id="btn-copy-prompt"
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs ${
              copied
                ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20 active:scale-98'
            }`}
            title="Copy prompt to clipboard"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Prompt'}</span>
          </button>

          {/* Improve Prompt */}
          <button
            id="btn-improve-prompt"
            onClick={handleImprove}
            disabled={isImproving}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700 transition-all disabled:opacity-50"
            title="Use Gemini to enhance clarity, structure and details"
          >
            <Zap className={`w-4 h-4 ${isImproving ? 'animate-spin text-amber-500' : 'text-amber-500'}`} />
            <span>{isImproving ? 'Improving...' : 'Improve Prompt'}</span>
          </button>

          {/* Regenerate */}
          <button
            id="btn-regenerate-prompt"
            onClick={onRegenerate}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
            title="Regenerate prompt with new variation"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Regenerate</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Edit */}
          <button
            id="btn-edit-prompt"
            onClick={() => setIsEditing(!isEditing)}
            className={`p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-colors ${
              isEditing
                ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
            title="Edit prompt text manually"
          >
            <Edit3 className="w-4 h-4" />
            <span className="hidden sm:inline">{isEditing ? 'Close Edit' : 'Edit'}</span>
          </button>

          {/* Save */}
          <button
            id="btn-save-prompt"
            onClick={handleSave}
            className={`p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-colors ${
              isSaved
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
            title="Save prompt locally in browser storage"
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 text-emerald-600" /> : <Bookmark className="w-4 h-4" />}
            <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
          </button>

          {/* Share */}
          <button
            id="btn-share-prompt"
            onClick={handleShare}
            className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            title="Share this prompt"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};
