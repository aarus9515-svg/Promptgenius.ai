import React, { useState, useEffect, useCallback } from 'react';
import { ToastProvider, useToast } from './components/Toast';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeGenerator } from './components/generators/HomeGenerator';
import { ImagePromptGenerator } from './components/generators/ImagePromptGenerator';
import { VideoPromptGenerator } from './components/generators/VideoPromptGenerator';
import { YouTubePromptGenerator } from './components/generators/YouTubePromptGenerator';
import { SocialMediaPromptGenerator } from './components/generators/SocialMediaPromptGenerator';
import { BusinessPromptGenerator } from './components/generators/BusinessPromptGenerator';
import { StudyPromptGenerator } from './components/generators/StudyPromptGenerator';
import { CodingPromptGenerator } from './components/generators/CodingPromptGenerator';
import { LibraryView } from './components/LibraryView';
import { SavedPromptsView } from './components/SavedPromptsView';
import { HistoryView } from './components/HistoryView';
import { FaqView } from './components/FaqView';
import { AboutView } from './components/AboutView';
import {
  getSavedPrompts,
  savePromptToStorage,
  deleteSavedPrompt,
  clearAllSavedPrompts,
  getHistory,
  addToHistory,
  deleteHistoryItem,
  clearAllHistory,
  getStoredTheme,
  setStoredTheme,
} from './services/storage';
import { SavedPromptItem, PromptHistoryItem, PromptTemplate } from './types';

function MainApp() {
  const { showToast } = useToast();

  // Route State: support URL hash so back/forward and direct links work
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    return hash || 'home';
  });

  // Theme State
  const [theme, setTheme] = useState<'dark' | 'light'>(() => getStoredTheme());

  // Saved Prompts & History
  const [savedPrompts, setSavedPrompts] = useState<SavedPromptItem[]>([]);
  const [history, setHistory] = useState<PromptHistoryItem[]>([]);

  // Selected template from Library (to prefill in generator if requested)
  const [activeTemplate, setActiveTemplate] = useState<PromptTemplate | null>(null);

  // Initialize theme on mount
  useEffect(() => {
    setStoredTheme(theme);
  }, [theme]);

  // Load saved prompts and history on mount
  useEffect(() => {
    setSavedPrompts(getSavedPrompts());
    setHistory(getHistory());
  }, []);

  // Sync hash change with route
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (hash) {
        setCurrentRoute(hash);
      } else {
        setCurrentRoute('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = useCallback((route: string) => {
    window.location.hash = `#/${route}`;
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    setStoredTheme(nextTheme);
  };

  const handleSavePrompt = (prompt: string, category: string, title?: string) => {
    const saved = savePromptToStorage({
      prompt,
      category,
      title: title || `${category} Prompt`,
    });
    setSavedPrompts((prev) => [saved, ...prev]);
  };

  const handleDeleteSavedPrompt = (id: string) => {
    deleteSavedPrompt(id);
    setSavedPrompts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleClearAllSaved = () => {
    clearAllSavedPrompts();
    setSavedPrompts([]);
  };

  const handleAddToHistory = (prompt: string, category: string, idea?: string) => {
    const hist = addToHistory({
      prompt,
      category,
      originalIdea: idea,
    });
    setHistory((prev) => [hist, ...prev.slice(0, 49)]);
  };

  const handleDeleteHistoryItem = (id: string) => {
    deleteHistoryItem(id);
    setHistory((prev) => prev.filter((h) => h.id !== id));
  };

  const handleClearAllHistory = () => {
    clearAllHistory();
    setHistory([]);
  };

  const handleUseTemplate = (template: PromptTemplate) => {
    setActiveTemplate(template);
    // Route to appropriate tool or home generator
    const cat = template.category.toLowerCase();
    if (cat.includes('image')) {
      navigate('image-prompt');
    } else if (cat.includes('video')) {
      navigate('video-prompt');
    } else if (cat.includes('youtube')) {
      navigate('youtube');
    } else if (cat.includes('social')) {
      navigate('social-media');
    } else if (cat.includes('coding')) {
      navigate('coding');
    } else if (cat.includes('business') || cat.includes('marketing')) {
      navigate('business');
    } else if (cat.includes('study')) {
      navigate('study');
    } else {
      navigate('generator');
    }
    showToast(`Loaded template: "${template.title}"`, 'info');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <Header
        currentRoute={currentRoute}
        navigate={navigate}
        isDark={theme === 'dark'}
        toggleTheme={toggleTheme}
        savedCount={savedPrompts.length}
        historyCount={history.length}
      />

      {/* Main Content Area */}
      <main className="grow">
        {(currentRoute === 'home' || currentRoute === 'generator') && (
          <HomeGenerator
            onSavePrompt={handleSavePrompt}
            onAddToHistory={handleAddToHistory}
            onNavigate={navigate}
          />
        )}

        {currentRoute === 'image-prompt' && (
          <ImagePromptGenerator
            onSavePrompt={handleSavePrompt}
            onAddToHistory={handleAddToHistory}
          />
        )}

        {currentRoute === 'video-prompt' && (
          <VideoPromptGenerator
            onSavePrompt={handleSavePrompt}
            onAddToHistory={handleAddToHistory}
          />
        )}

        {currentRoute === 'youtube' && (
          <YouTubePromptGenerator
            onSavePrompt={handleSavePrompt}
            onAddToHistory={handleAddToHistory}
          />
        )}

        {currentRoute === 'social-media' && (
          <SocialMediaPromptGenerator
            onSavePrompt={handleSavePrompt}
            onAddToHistory={handleAddToHistory}
          />
        )}

        {currentRoute === 'business' && (
          <BusinessPromptGenerator
            onSavePrompt={handleSavePrompt}
            onAddToHistory={handleAddToHistory}
          />
        )}

        {currentRoute === 'study' && (
          <StudyPromptGenerator
            onSavePrompt={handleSavePrompt}
            onAddToHistory={handleAddToHistory}
          />
        )}

        {currentRoute === 'coding' && (
          <CodingPromptGenerator
            onSavePrompt={handleSavePrompt}
            onAddToHistory={handleAddToHistory}
          />
        )}

        {currentRoute === 'library' && (
          <LibraryView
            onUseTemplate={handleUseTemplate}
            onSavePrompt={handleSavePrompt}
          />
        )}

        {currentRoute === 'saved' && (
          <SavedPromptsView
            savedPrompts={savedPrompts}
            onDeletePrompt={handleDeleteSavedPrompt}
            onClearAll={handleClearAllSaved}
            onNavigate={navigate}
          />
        )}

        {currentRoute === 'history' && (
          <HistoryView
            history={history}
            onDeleteHistoryItem={handleDeleteHistoryItem}
            onClearHistory={handleClearAllHistory}
            onNavigate={navigate}
          />
        )}

        {currentRoute === 'faq' && <FaqView />}

        {currentRoute === 'about' && <AboutView />}
      </main>

      {/* Footer */}
      <Footer navigate={navigate} />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <MainApp />
    </ToastProvider>
  );
}
