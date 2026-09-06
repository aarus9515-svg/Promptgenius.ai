export type Category =
  | 'General'
  | 'ChatGPT'
  | 'Gemini'
  | 'AI Image'
  | 'AI Video'
  | 'YouTube'
  | 'Instagram'
  | 'Facebook'
  | 'Business'
  | 'Marketing'
  | 'Coding'
  | 'Study'
  | 'Writing';

export type Language = 'English' | 'Hindi' | 'Hinglish';

export type Tone =
  | 'Professional'
  | 'Friendly'
  | 'Creative'
  | 'Cinematic'
  | 'Simple'
  | 'Expert';

export type DetailLevel = 'Basic' | 'Detailed' | 'Expert';

export interface PromptGenerationRequest {
  idea: string;
  category?: Category | string;
  language?: Language | string;
  tone?: Tone | string;
  detailLevel?: DetailLevel | string;
  generatorType?:
    | 'general'
    | 'image'
    | 'video'
    | 'youtube'
    | 'social'
    | 'business'
    | 'study'
    | 'coding';
  customParams?: Record<string, any>;
}

export interface PromptImproveRequest {
  prompt: string;
  category?: string;
  instructions?: string;
}

export interface SavedPromptItem {
  id: string;
  title: string;
  prompt: string;
  category: string;
  createdAt: string;
  tags?: string[];
  notes?: string;
}

export interface PromptHistoryItem {
  id: string;
  prompt: string;
  category: string;
  createdAt: string;
  idea?: string;
  originalIdea?: string;
}

export interface LibraryPromptTemplate {
  id: string;
  title: string;
  description: string;
  category:
    | 'AI'
    | 'Image'
    | 'Video'
    | 'YouTube'
    | 'Social Media'
    | 'Business'
    | 'Marketing'
    | 'Coding'
    | 'Study'
    | 'Writing'
    | string;
  prompt: string;
  tags: string[];
  targetAi?: string;
}

export type PromptTemplate = LibraryPromptTemplate;
