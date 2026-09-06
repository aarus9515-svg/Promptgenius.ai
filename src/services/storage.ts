import { SavedPromptItem, PromptHistoryItem } from '../types';

const SAVED_STORAGE_KEY = 'promptgenius_saved_prompts';
const HISTORY_STORAGE_KEY = 'promptgenius_history';
const THEME_STORAGE_KEY = 'promptgenius_theme';

export function getSavedPrompts(): SavedPromptItem[] {
  try {
    const raw = localStorage.getItem(SAVED_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to read saved prompts from localStorage:', e);
    return [];
  }
}

export function savePromptToStorage(item: Omit<SavedPromptItem, 'id' | 'createdAt'>): SavedPromptItem {
  const list = getSavedPrompts();
  const newItem: SavedPromptItem = {
    ...item,
    id: `saved-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
  };
  const updated = [newItem, ...list];
  localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(updated));
  return newItem;
}

export function deleteSavedPrompt(id: string): void {
  const list = getSavedPrompts();
  const filtered = list.filter((p) => p.id !== id);
  localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(filtered));
}

export function clearAllSavedPrompts(): void {
  localStorage.removeItem(SAVED_STORAGE_KEY);
}

export function getHistory(): PromptHistoryItem[] {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to read prompt history from localStorage:', e);
    return [];
  }
}

export function addToHistory(item: Omit<PromptHistoryItem, 'id' | 'createdAt'>): PromptHistoryItem {
  const list = getHistory();
  const newItem: PromptHistoryItem = {
    ...item,
    id: `hist-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
  };
  // Cap history at 50 entries
  const updated = [newItem, ...list.slice(0, 49)];
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  return newItem;
}

export function deleteHistoryItem(id: string): void {
  const list = getHistory();
  const filtered = list.filter((h) => h.id !== id);
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(filtered));
}

export function clearAllHistory(): void {
  localStorage.removeItem(HISTORY_STORAGE_KEY);
}

export function getStoredTheme(): 'dark' | 'light' {
  try {
    const theme = localStorage.getItem(THEME_STORAGE_KEY);
    if (theme === 'dark' || theme === 'light') {
      return theme;
    }
    // Default to dark mode for modern AI feel or system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  } catch {
    return 'light';
  }
}

export function setStoredTheme(theme: 'dark' | 'light'): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {
    console.error('Failed to store theme preference:', e);
  }
}
