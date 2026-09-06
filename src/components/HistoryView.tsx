import React, { useState } from 'react';
import {
  History,
  Copy,
  Trash2,
  Check,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { PromptHistoryItem } from '../types';
import { useToast } from './Toast';

interface HistoryViewProps {
  history: PromptHistoryItem[];
  onDeleteHistoryItem: (id: string) => void;
  onClearHistory: () => void;
  onNavigate: (route: string) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onDeleteHistoryItem,
  onClearHistory,
  onNavigate,
}) => {
  const { showToast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  const handleCopy = async (item: PromptHistoryItem) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(item.prompt);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = item.prompt;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedId(item.id);
      showToast('Prompt copied to clipboard!', 'success');
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      showToast('Failed to copy', 'error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-2">
            <History className="w-3.5 h-3.5" />
            <span>Session Logs</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
            Generation History
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Recently generated prompts stored temporarily in your local browser session
          </p>
        </div>

        {history.length > 0 && (
          <div>
            {confirmClear ? (
              <div className="flex items-center gap-1.5 bg-rose-50 dark:bg-rose-950/60 p-1.5 rounded-xl border border-rose-300 dark:border-rose-900">
                <span className="text-xs font-bold text-rose-700 dark:text-rose-300 px-1">
                  Clear log?
                </span>
                <button
                  onClick={() => {
                    onClearHistory();
                    setConfirmClear(false);
                    showToast('History cleared', 'info');
                  }}
                  className="px-2.5 py-1 text-xs font-bold bg-rose-600 text-white rounded-lg hover:bg-rose-700"
                >
                  Yes
                </button>
                <button
                  onClick={() => setConfirmClear(false)}
                  className="px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg"
                >
                  No
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmClear(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear History</span>
              </button>
            )}
          </div>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
          <History className="w-10 h-10 mx-auto text-slate-400 mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
            No generation history yet
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6">
            Whenever you engineer a prompt using any of our creator engines, it will appear here automatically.
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-md shadow-indigo-600/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate a Prompt</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => {
            const isCopied = copiedId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:shadow-md transition-all space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {item.category}
                    </span>
                    {item.originalIdea && (
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate max-w-sm">
                        Original idea: "{item.originalIdea}"
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {new Date(item.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                    •{' '}
                    {new Date(item.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 font-mono text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto">
                  {item.prompt}
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
                        onDeleteHistoryItem(item.id);
                        showToast('Item deleted from history', 'info');
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Delete from history"
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
