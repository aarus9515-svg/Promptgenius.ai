import React, { useState, useMemo } from 'react';
import {
  Bookmark,
  Search,
  Copy,
  Trash2,
  Download,
  Check,
  Sparkles,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';
import { SavedPromptItem } from '../types';
import { useToast } from './Toast';

interface SavedPromptsViewProps {
  savedPrompts: SavedPromptItem[];
  onDeletePrompt: (id: string) => void;
  onClearAll: () => void;
  onNavigate: (route: string) => void;
}

export const SavedPromptsView: React.FC<SavedPromptsViewProps> = ({
  savedPrompts,
  onDeletePrompt,
  onClearAll,
  onNavigate,
}) => {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return savedPrompts;
    const q = searchQuery.toLowerCase();
    return savedPrompts.filter(
      (p) =>
        (p.title && p.title.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q) ||
        p.prompt.toLowerCase().includes(q)
    );
  }, [savedPrompts, searchQuery]);

  const handleCopy = async (prompt: SavedPromptItem) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(prompt.prompt);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = prompt.prompt;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedId(prompt.id);
      showToast('Prompt copied!', 'success');
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      showToast('Failed to copy to clipboard', 'error');
    }
  };

  const handleExportJson = () => {
    if (savedPrompts.length === 0) {
      showToast('No saved prompts to export', 'error');
      return;
    }
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(savedPrompts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `promptgenius_saved_prompts_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Saved prompts exported as JSON!', 'success');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-2">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Local Browser Storage</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
            Saved Prompts
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {savedPrompts.length} prompt{savedPrompts.length === 1 ? '' : 's'} saved securely on your device
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedPrompts.length > 0 && (
            <>
              <button
                id="btn-export-saved"
                onClick={handleExportJson}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-xs transition-colors"
                title="Download all saved prompts as JSON file"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>

              {confirmClear ? (
                <div className="flex items-center gap-1 bg-rose-50 dark:bg-rose-950/60 p-1 rounded-xl border border-rose-300 dark:border-rose-900">
                  <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300 px-1">
                    Clear all?
                  </span>
                  <button
                    onClick={() => {
                      onClearAll();
                      setConfirmClear(false);
                      showToast('All saved prompts cleared', 'info');
                    }}
                    className="px-2 py-1 text-[11px] font-bold bg-rose-600 text-white rounded-lg hover:bg-rose-700"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setConfirmClear(false)}
                    className="px-2 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg"
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  id="btn-clear-saved"
                  onClick={() => setConfirmClear(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                  title="Remove all saved prompts"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Search Input */}
      {savedPrompts.length > 0 && (
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved prompts..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      )}

      {/* Saved Prompts List */}
      {savedPrompts.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
          <Bookmark className="w-10 h-10 mx-auto text-slate-400 mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
            No saved prompts yet
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6">
            Whenever you generate an optimized prompt or browse the prompt library, click the "Save" button to store it here for future use.
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-md shadow-indigo-600/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Your First Prompt</span>
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No saved prompts matched "{searchQuery}"
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => {
            const isCopied = copiedId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        {item.category}
                      </span>
                      {item.title && (
                        <span className="text-sm font-bold text-slate-900 dark:text-white font-['Outfit']">
                          {item.title}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {new Date(item.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 font-mono text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                    {item.prompt}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <span className="text-[11px] text-slate-400">
                    {item.prompt.trim().split(/\s+/).filter(Boolean).length} words
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(item)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button
                      onClick={() => {
                        onDeletePrompt(item.id);
                        showToast('Prompt removed from saved collection', 'info');
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Delete saved prompt"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
