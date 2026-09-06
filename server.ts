import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { generateOptimizedPrompt, improvePrompt, checkRateLimit } from './src/server/promptEngine';

dotenv.config();

function formatClientErrorMessage(error: any): string {
  if (error?.message === 'GEMINI_API_KEY_MISSING') {
    return 'Gemini API key is not configured on the server. Please check your environment variables (GEMINI_API_KEY).';
  }
  const rawMsg = typeof error?.message === 'string' ? error.message : '';
  if (rawMsg.includes('503') || rawMsg.includes('high demand') || rawMsg.includes('UNAVAILABLE')) {
    return 'The AI model is experiencing a temporary demand surge. Please wait a moment and try again.';
  }
  if (rawMsg.includes('RESOURCE_EXHAUSTED') || rawMsg.includes('429')) {
    return 'API rate limit reached. Please wait a few moments before submitting again.';
  }
  if (rawMsg && !rawMsg.includes('{') && !rawMsg.includes('API_KEY')) {
    return rawMsg;
  }
  return 'Something went wrong while generating the prompt. Please try again.';
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json({ limit: '1mb' }));

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'PromptGenius AI',
      timestamp: new Date().toISOString(),
      geminiConfigured: !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_api_key_here'),
    });
  });

  // Prompt Generation Route
  app.post('/api/generate-prompt', async (req: Request, res: Response) => {
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.ip || 'local-client';

    if (!checkRateLimit(clientIp)) {
      res.status(429).json({
        error: 'Too many requests. Please wait a moment before sending another prompt request.',
      });
      return;
    }

    try {
      const { idea, category, language, tone, detailLevel, generatorType, customParams } = req.body;

      if (!idea || typeof idea !== 'string' || idea.trim().length === 0) {
        res.status(400).json({ error: 'Please enter an idea first.' });
        return;
      }

      const result = await generateOptimizedPrompt({
        idea,
        category,
        language,
        tone,
        detailLevel,
        generatorType,
        customParams,
      });

      res.status(200).json(result);
    } catch (error: any) {
      console.error('Server error in /api/generate-prompt:', error?.message || error);
      const clientMessage = formatClientErrorMessage(error);
      const statusCode = error?.message === 'GEMINI_API_KEY_MISSING' ? 500 : 503;
      res.status(statusCode).json({ error: clientMessage });
    }
  });

  // Prompt Improvement Route
  app.post('/api/improve-prompt', async (req: Request, res: Response) => {
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.ip || 'local-client';

    if (!checkRateLimit(clientIp)) {
      res.status(429).json({
        error: 'Too many requests. Please wait a moment before sending another request.',
      });
      return;
    }

    try {
      const { prompt, category, instructions } = req.body;

      if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
        res.status(400).json({ error: 'Please provide a prompt to improve.' });
        return;
      }

      const result = await improvePrompt({
        prompt,
        category,
        instructions,
      });

      res.status(200).json(result);
    } catch (error: any) {
      console.error('Server error in /api/improve-prompt:', error?.message || error);
      const clientMessage = formatClientErrorMessage(error);
      const statusCode = error?.message === 'GEMINI_API_KEY_MISSING' ? 500 : 503;
      res.status(statusCode).json({ error: clientMessage });
    }
  });

  // Vite middleware in development vs static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PromptGenius AI server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
