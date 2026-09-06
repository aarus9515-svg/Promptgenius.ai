import { GoogleGenAI } from '@google/genai';
import { PromptGenerationRequest, PromptImproveRequest } from '../types';

let aiInstance: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'your_api_key_here') {
    throw new Error('GEMINI_API_KEY_MISSING');
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiInstance;
}

// In-memory rate limiter
const requestTracker = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(clientId: string, maxRequests = 25, windowMs = 60000): boolean {
  const now = Date.now();
  const clientData = requestTracker.get(clientId);

  if (!clientData || now > clientData.resetTime) {
    requestTracker.set(clientId, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (clientData.count >= maxRequests) {
    return false;
  }

  clientData.count += 1;
  return true;
}

// Input sanitizer & validator
export function validateAndSanitizeInput(text: string, maxLength = 3000): string {
  if (!text || typeof text !== 'string') {
    throw new Error('Please enter an idea first.');
  }
  const trimmed = text.trim();
  if (trimmed.length === 0) {
    throw new Error('Please enter an idea first.');
  }
  if (trimmed.length > maxLength) {
    throw new Error(`Input is too long. Please keep it under ${maxLength} characters.`);
  }
  // Remove null bytes
  return trimmed.replace(/\0/g, '');
}

async function callGeminiWithFallback(
  ai: GoogleGenAI,
  params: {
    contents: string;
    systemInstruction?: string;
    temperature?: number;
  }
): Promise<string> {
  const candidateModels = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];
  let lastError: any = null;

  for (const model of candidateModels) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: params.contents,
        config: {
          systemInstruction: params.systemInstruction,
          temperature: params.temperature ?? 0.7,
        },
      });
      const text = response.text?.trim();
      if (text) return text;
    } catch (err: any) {
      lastError = err;
      const errMsg = typeof err?.message === 'string' ? err.message : JSON.stringify(err);
      if (
        errMsg.includes('503') ||
        errMsg.includes('demand') ||
        errMsg.includes('UNAVAILABLE') ||
        errMsg.includes('RESOURCE_EXHAUSTED')
      ) {
        console.warn(`Model ${model} high demand/busy, attempting fallback...`);
        continue;
      }
      throw err;
    }
  }

  throw lastError || new Error('Failed to generate prompt from AI model.');
}

export async function generateOptimizedPrompt(req: PromptGenerationRequest): Promise<{ prompt: string; type: string }> {
  const ai = getGeminiClient();
  const sanitizedIdea = validateAndSanitizeInput(req.idea);
  const generatorType = req.generatorType || 'general';

  let systemInstruction = '';
  let userPrompt = '';

  if (generatorType === 'image') {
    const custom = req.customParams || {};
    systemInstruction = `You are a world-class prompt engineer specializing in state-of-the-art AI image generators (such as Midjourney v6, DALL-E 3, Flux, and Imagen 3).
Transform the user's idea and visual specifications into a comprehensive, vivid, and aesthetically stunning image-generation prompt.
Always include the following structured elements:
- Subject & focal action
- Environment, background & architecture
- Composition, framing & negative space
- Lighting conditions & color temperature
- Camera specs, sensor, focal length (lens), depth of field & angle
- Mood, atmosphere & emotional resonance
- Artistic style & medium (photorealistic, 3D, editorial, anime, etc.)
- Material textures & micro-details
- Quality enhancers & rendering details
- Target Aspect Ratio: ${custom.aspectRatio || '1:1'}

Return ONLY the master prompt text ready to copy-paste into an AI image generator, formatted clearly without conversational filler.`;

    userPrompt = `User Image Idea: "${sanitizedIdea}"
Selected Options:
- Style: ${custom.style || 'Photorealistic'}
- Aspect Ratio: ${custom.aspectRatio || '1:1'}
- Lighting: ${custom.lighting || 'Natural'}
- Camera Shot / Angle: ${custom.camera || 'Medium Shot'}`;

  } else if (generatorType === 'video') {
    const custom = req.customParams || {};
    systemInstruction = `You are an elite prompt engineer for AI video generation systems (like Sora, Runway Gen-3, Luma Dream Machine, Pika, Kling, and Veo).
Transform the user's video concept into an exact, professional, cinematic video prompt.
Your generated prompt MUST be clearly formatted with the following structured sections:
- Scene Setting & Opening Shot
- Characters & Key Subjects (attire, physical traits, expression)
- Action & Dynamic Movement (what happens second-by-second)
- Environment, Atmosphere & Background Elements
- Camera Movement (panning, tracking, drone, zoom)
- Camera Angle & Lens Characteristics
- Lighting, Shadow & Color Grading
- Mood, Sound/Audio Atmosphere Hints
- Visual Style & Render Medium
- Motion Speed & Physics Fidelity
- Duration: ${custom.duration || '6s'}
- Aspect Ratio: ${custom.aspectRatio || '16:9'}

Deliver a rich, coherent, director-grade prompt that produces consistent physics and cinematic continuity. Return only the prompt without conversational intro/outro.`;

    userPrompt = `User Video Concept: "${sanitizedIdea}"
Selected Parameters:
- Video Style: ${custom.style || 'Cinematic'}
- Duration: ${custom.duration || '6s'}
- Camera Movement: ${custom.cameraMovement || 'Smooth Tracking'}
- Lighting: ${custom.lighting || 'Dramatic'}
- Environment: ${custom.environment || 'Urban'}
- Character/Subject: ${custom.character || 'Solo traveler'}
- Mood: ${custom.mood || 'Intense and atmospheric'}
- Aspect Ratio: ${custom.aspectRatio || '16:9'}`;

  } else if (generatorType === 'youtube') {
    const custom = req.customParams || {};
    systemInstruction = `You are a YouTube growth strategist and script mastermind responsible for channels with tens of millions of views.
Analyze the user's topic and generate a comprehensive YouTube Creator Blueprint containing:
1. 10 HIGH-CTR TITLE IDEAS: Crafted with tension, curiosity gaps, and power words.
2. STRONG OPENING HOOK (0:00 - 0:30): Frame-by-frame script with voiceover, visual cues, and on-screen text.
3. VIDEO DESCRIPTION PROMPT: Optimized for SEO and viewer engagement.
4. COMPLETE VIDEO OUTLINE: Modular 5-act flow with timestamps and retention pattern interrupts.
5. THUMBNAIL CONCEPTS: 3 high-contrast visual ideas with text overlay suggestions.
6. PERSUASIVE CALL TO ACTION (CTA): Integrated into the climax.
7. 15 HIGH-VOLUME KEYWORD IDEAS.
8. 10 TARGETED HASHTAGS.

Format clearly with distinct markdown headers so creators can easily read, copy, and apply individual sections.`;

    userPrompt = `Video Topic: "${sanitizedIdea}"
Target Audience: ${custom.targetAudience || 'General Curious Audience'}
Language: ${req.language || 'English'}
Video Type: ${custom.videoType || 'Documentary / Video Essay'}
Desired Duration: ${custom.duration || '10-12 minutes'}`;

  } else if (generatorType === 'social') {
    const custom = req.customParams || {};
    systemInstruction = `You are a viral social media strategist who crafts high-converting copy across Instagram, Facebook, YouTube Shorts, LinkedIn, and X (Twitter).
Generate a platform-native, high-engagement social media package:
1. THE SCROLL-STOPPING HOOK: First 1-2 lines engineered for maximum retention.
2. ENGAGING CAPTION / POST BODY: Structured with generous negative space, punchy bullet points, and emotional resonance.
3. DESCRIPTION / CONTEXT (if applicable).
4. HIGH-CONVERTING CALL TO ACTION (CTA).
5. RELEVANT HASHTAGS: Mix of broad and niche tags.
6. BONUS CONTENT EXPANSION IDEA: Creative reel/carousel/thread visual pairing.

Ensure the tone and formatting match the specific nuances of the chosen social media platform.`;

    userPrompt = `Topic: "${sanitizedIdea}"
Platform: ${custom.platform || 'Instagram'}
Audience: ${custom.audience || 'Entrepreneurs and creators'}
Language: ${req.language || 'English'}
Tone: ${req.tone || 'Friendly & Engaging'}`;

  } else if (generatorType === 'business') {
    const custom = req.customParams || {};
    systemInstruction = `You are a veteran management consultant and startup advisor.
Generate an exhaustive, highly actionable business prompt template customized for the user's specific venture.
Ensure the prompt includes:
- Clear Executive Persona & Role
- Specific Core Objectives & Target Milestones
- Context & Industry Landscape
- Operational Requirements & Guardrails
- Critical Constraints & Risk Mitigations
- Quantitative Key Performance Indicators (KPIs)
- Output Formatting & Step-by-Step Deliverables.

Return only the optimized prompt ready for use in AI models.`;

    userPrompt = `Business Template Type: ${custom.templateType || 'Business Plan'}
Venture / Idea Details: "${sanitizedIdea}"
Target Market / Demographic: ${custom.targetMarket || 'SMBs and consumers'}
Tone: ${req.tone || 'Professional & Strategic'}
Detail Level: ${req.detailLevel || 'Expert'}`;

  } else if (generatorType === 'study') {
    const custom = req.customParams || {};
    systemInstruction = `You are a cognitive science learning specialist and academic coach.
Craft an interactive, pedagogically rigorous study prompt suited for students and lifelong learners.
Incorporate:
- Active recall methodologies
- Diagnostic checks and misconception unmasking
- Step-by-step intuitive breakdowns
- Real-world analogies
- Self-testing checkpoints and memory retention anchors.

Return only the optimized study prompt.`;

    userPrompt = `Study Tool: ${custom.toolType || 'Study Plan & Active Recall'}
Subject / Concept: "${sanitizedIdea}"
Grade / Skill Level: ${custom.level || 'University / Advanced'}
Tone: ${req.tone || 'Encouraging & Expert'}
Language: ${req.language || 'English'}`;

  } else if (generatorType === 'coding') {
    const custom = req.customParams || {};
    systemInstruction = `You are a Principal Software Engineer and System Architect.
Transform the user's programming task into an ultra-precise, senior-grade prompt for AI coding assistants.
The prompt must specify:
- Expert Developer Persona & Deep Context
- Programming Language, Framework & Runtime version
- Explicit Requirements & Architectural Patterns
- Strict Non-functional Constraints (time/space complexity, type safety, error boundaries, security standards)
- Edge Cases to guard against (null/undefined, concurrency, timeouts)
- Expected Output Structure (production-ready code, unit test cases, explanation of trade-offs).

Return only the optimized coding prompt.`;

    userPrompt = `Task / Problem: "${sanitizedIdea}"
Programming Language: ${custom.language || 'TypeScript / JavaScript'}
Project Type: ${custom.projectType || 'Full-Stack Web Application'}
Action: ${custom.actionType || 'Build Project / Feature'}
Skill Level: ${custom.skillLevel || 'Senior Engineer'}`;

  } else {
    // General Prompt Generator (Section 4 & 5)
    systemInstruction = `You are an expert prompt engineer. Transform the user's simple idea into a clear, detailed, structured and highly useful AI prompt.

Understand the user's intention.

Add appropriate:
- role
- objective
- context
- requirements
- constraints
- target audience
- tone
- output format
- quality instructions

Do not unnecessarily change the user's original intention.

Return only the optimized prompt unless additional explanation is specifically requested.`;

    userPrompt = `Idea: "${sanitizedIdea}"
Target Category: ${req.category || 'General'}
Language: ${req.language || 'English'}
Tone: ${req.tone || 'Professional'}
Detail Level: ${req.detailLevel || 'Detailed'}`;
  }

  const generatedText = await callGeminiWithFallback(ai, {
    contents: userPrompt,
    systemInstruction,
    temperature: 0.7,
  });

  return {
    prompt: generatedText,
    type: generatorType,
  };
}

export async function improvePrompt(req: PromptImproveRequest): Promise<{ prompt: string }> {
  const ai = getGeminiClient();
  const sanitizedPrompt = validateAndSanitizeInput(req.prompt, 6000);

  const systemInstruction = `You are an expert prompt engineer. Transform and improve the user's existing prompt for:
- clarity
- specificity
- structure
- usefulness
- output formatting
- reduction of ambiguity and elimination of vague placeholders

Do not change the original intention.
Return only the improved prompt.`;

  const userPrompt = `Existing Prompt to Improve:
"""
${sanitizedPrompt}
"""
${req.instructions ? `Special Instructions: ${req.instructions}` : ''}`;

  const improvedText = await callGeminiWithFallback(ai, {
    contents: userPrompt,
    systemInstruction,
    temperature: 0.6,
  });

  return { prompt: improvedText };
}
