import React, { useState } from 'react';
import {
  Sparkles,
  Sun,
  Moon,
  Menu,
  X,
  Bookmark,
  History,
  Image as ImageIcon,
  Video as VideoIcon,
  Youtube,
  Share2,
  BookOpen,
  HelpCircle,
  Info,
  Wand2,
  Briefcase,
  GraduationCap,
  Code2,
} from 'lucide-react';

interface HeaderProps {
  currentRoute: string;
  navigate: (route: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
  savedCount: number;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  navigate,
  isDark,
  toggleTheme,
  savedCount,
  historyCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainNavItems = [
    { id: 'home', label: 'Home', icon: Wand2 },
    { id: 'generator', label: 'Prompt Generator', icon: Sparkles },
    { id: 'image-prompt', label: 'Image Prompt', icon: ImageIcon },
    { id: 'video-prompt', label: 'Video Prompt', icon: VideoIcon },
    { id: 'youtube', label: 'YouTube', icon: Youtube },
    { id: 'social-media', label: 'Social Media', icon: Share2 },
    { id: 'business', label: 'Business', icon: Briefcase },
    { id: 'study', label: 'Study', icon: GraduationCap },
    { id: 'coding', label: 'Coding', icon: Code2 },
    { id: 'library', label: 'Prompt Library', icon: BookOpen },
  ];

  const secondaryNavItems = [
    { id: 'about', label: 'About', icon: Info },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ];

  const handleNavClick = (route: string) => {
    navigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-navigation"
      className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <div
            id="app-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-amber-500 p-0.5 shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300 flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white font-['Outfit']">
                  Prompt<span className="text-indigo-600 dark:text-indigo-400">Genius</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  AI
                </span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 -mt-0.5 hidden sm:inline">
                Idea to AI Master Prompt
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Mobile Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Saved Prompts Button */}
            <button
              id="header-saved-btn"
              onClick={() => handleNavClick('saved')}
              className={`relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                currentRoute === 'saved' ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400' : ''
              }`}
              title="Saved Prompts"
              aria-label="View Saved Prompts"
            >
              <Bookmark className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-indigo-600 text-white shadow-xs">
                  {savedCount}
                </span>
              )}
            </button>

            {/* History Button */}
            <button
              id="header-history-btn"
              onClick={() => handleNavClick('history')}
              className={`relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                currentRoute === 'history' ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400' : ''
              }`}
              title="Prompt History"
              aria-label="View Prompt History"
            >
              <History className="w-5 h-5" />
              {historyCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-slate-700 text-white shadow-xs">
                  {historyCount}
                </span>
              )}
            </button>

            {/* Dark/Light Mode Switch */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle dark/light theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 xl:hidden transition-colors"
              aria-label="Open mobile navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg px-4 pt-3 pb-6 shadow-xl transition-all"
        >
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 mb-4">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {secondaryNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 px-2 py-1.5 rounded-lg"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="text-[11px] text-slate-400">
              PromptGenius AI v1.0
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
