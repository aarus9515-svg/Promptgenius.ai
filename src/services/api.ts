import { PromptGenerationRequest, PromptImproveRequest } from '../types';

export async function generatePromptApi(request: PromptGenerationRequest): Promise<{ prompt: string; type?: string }> {
  const response = await fetch('/api/generate-prompt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong. Please try again.');
  }

  if (!data.prompt) {
    throw new Error('No prompt generated. Please try again.');
  }

  return data;
}

export async function improvePromptApi(request: PromptImproveRequest): Promise<{ prompt: string }> {
  const response = await fetch('/api/improve-prompt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong. Please try again.');
  }

  if (!data.prompt) {
    throw new Error('Could not improve prompt. Please try again.');
  }

  return data;
}

export async function checkServerHealth(): Promise<{ status: string; geminiConfigured: boolean }> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) return { status: 'error', geminiConfigured: false };
    return await res.json();
  } catch {
    return { status: 'offline', geminiConfigured: false };
  }
}
