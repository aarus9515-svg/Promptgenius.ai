import React from 'react';
import { Sparkles, ShieldCheck, Zap, Globe, Github } from 'lucide-react';

interface FooterProps {
  navigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/50 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-amber-500 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-900 rounded-[6px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white font-['Outfit']">
                Prompt<span className="text-indigo-600 dark:text-indigo-400">Genius</span> AI
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              "Turn Your Ideas Into Powerful AI Prompts" — An AI creator toolkit engineered to transform concepts into detailed, professional prompts for ChatGPT, Gemini, Midjourney, Sora, YouTube, coding, and business.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Server-side API protection
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" /> Gemini 3.8 Flash Engine
              </span>
            </div>
          </div>

          {/* Quick Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3 font-['Outfit']">
              Creator Tools
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => navigate('image-prompt')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  AI Image Generator
                </button>
              </li>
              <li>
                <button onClick={() => navigate('video-prompt')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  AI Video Generator
                </button>
              </li>
              <li>
                <button onClick={() => navigate('youtube')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  YouTube Creator Kit
                </button>
              </li>
              <li>
                <button onClick={() => navigate('social-media')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Social Media Copy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('coding')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Developer Code Prompts
                </button>
              </li>
            </ul>
          </div>

          {/* Resources & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3 font-['Outfit']">
              Knowledge & Info
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => navigate('library')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Master Prompt Library
                </button>
              </li>
              <li>
                <button onClick={() => navigate('faq')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => navigate('about')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  About & Netlify Guide
                </button>
              </li>
              <li>
                <button onClick={() => navigate('saved')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Local Saved Prompts
                </button>
              </li>
              <li>
                <button onClick={() => navigate('history')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Generation History
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} PromptGenius AI. Designed for full production deployment on Netlify & Cloud Run.</p>
          <div className="flex items-center gap-4">
            <span>Powered by Gemini API</span>
            <span>•</span>
            <span>Zero API Key Browser Exposure</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
