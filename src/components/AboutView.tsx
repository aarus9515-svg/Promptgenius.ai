import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Server,
  Cloud,
  Terminal,
  Cpu,
  Layers,
  CheckCircle2,
} from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-12">
      {/* Intro */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>About PromptGenius AI</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
          Turning Raw Concepts Into Master Prompts
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          AI models are only as good as the instructions you give them. PromptGenius AI eliminates the friction of prompt engineering by utilizing Gemini 3.8 Flash to transform basic ideas into hyper-structured, high-context prompts.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Outfit']">
            Gemini AI Engine
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Uses Google’s official <code className="text-indigo-500 font-mono text-[11px]">@google/genai</code> SDK with specialized domain system instructions for code, video, images, and marketing.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Outfit']">
            Zero Client-Key Exposure
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Your <code className="text-emerald-500 font-mono text-[11px]">GEMINI_API_KEY</code> is never exposed to browser bundles. All requests go through secure backend endpoints or Netlify functions.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
            <Cloud className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Outfit']">
            Netlify Production Ready
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Includes <code className="text-cyan-500 font-mono text-[11px]">netlify.toml</code> and serverless functions in <code className="text-cyan-500 font-mono text-[11px]">/netlify/functions</code> ready for one-click Git deployment.
          </p>
        </div>
      </div>

      {/* Netlify Deployment Step-by-Step Guide */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit']">
              Deploying PromptGenius AI to Netlify
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Follow these simple steps to deploy your live app on Netlify
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <div className="flex gap-3 items-start">
            <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center shrink-0 text-xs">
              1
            </span>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Push to GitHub</p>
              <p className="text-slate-500 dark:text-slate-400">
                Push this project repository to your GitHub, GitLab, or Bitbucket account.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center shrink-0 text-xs">
              2
            </span>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Import Site in Netlify</p>
              <p className="text-slate-500 dark:text-slate-400">
                Log into <span className="font-semibold text-slate-700 dark:text-slate-200">app.netlify.com</span>, select <span className="font-semibold">Add new site</span> &gt; <span className="font-semibold">Import an existing project</span>, and pick your repository.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center shrink-0 text-xs">
              3
            </span>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Verify Build Settings</p>
              <div className="mt-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1 text-slate-700 dark:text-slate-300">
                <div>Build command: <span className="text-indigo-600 dark:text-indigo-400 font-bold">npm run build</span></div>
                <div>Publish directory: <span className="text-indigo-600 dark:text-indigo-400 font-bold">dist</span></div>
                <div>Functions directory: <span className="text-indigo-600 dark:text-indigo-400 font-bold">netlify/functions</span></div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center shrink-0 text-xs">
              4
            </span>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Set GEMINI_API_KEY Environment Variable</p>
              <p className="text-slate-500 dark:text-slate-400 mb-2">
                In Netlify site settings: <span className="font-semibold text-slate-700 dark:text-slate-200">Site Configuration</span> &gt; <span className="font-semibold text-slate-700 dark:text-slate-200">Environment variables</span> &gt; <span className="font-semibold text-slate-700 dark:text-slate-200">Add a variable</span>.
              </p>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs">
                Key: <span className="text-emerald-600 dark:text-emerald-400 font-bold">GEMINI_API_KEY</span>
                <br />
                Value: <span className="text-slate-400">[Your API Key from Google AI Studio]</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center shrink-0 text-xs">
              5
            </span>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Deploy & Test</p>
              <p className="text-slate-500 dark:text-slate-400">
                Trigger deploy. Netlify compiles your React frontend into <code className="text-indigo-500 font-mono text-[11px]">dist/</code> and bundles the serverless functions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
