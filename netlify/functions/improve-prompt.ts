import { improvePrompt, checkRateLimit } from '../../src/server/promptEngine';
import { PromptImproveRequest } from '../../src/types';

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const clientIp = req.headers.get('x-forwarded-for') || 'netlify-client';
  if (!checkRateLimit(clientIp)) {
    return new Response(
      JSON.stringify({
        error: 'Too many requests. Please wait a moment before sending another request.',
      }),
      {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const body = (await req.json()) as PromptImproveRequest;
    if (!body || !body.prompt || typeof body.prompt !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Please provide a prompt to improve.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const result = await improvePrompt(body);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Netlify function improve-prompt error:', error?.message || error);

    if (error?.message === 'GEMINI_API_KEY_MISSING') {
      return new Response(
        JSON.stringify({
          error:
            'Gemini API key is not configured in Netlify environment variables. Please add GEMINI_API_KEY to your Netlify site settings.',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const rawMsg = typeof error?.message === 'string' ? error.message : '';
    let clientMessage = 'Something went wrong. Please try again.';
    if (rawMsg.includes('503') || rawMsg.includes('demand') || rawMsg.includes('UNAVAILABLE')) {
      clientMessage = 'The AI model is experiencing a temporary demand surge. Please wait a moment and try again.';
    } else if (rawMsg.includes('RESOURCE_EXHAUSTED') || rawMsg.includes('429')) {
      clientMessage = 'API rate limit reached. Please wait a few moments before submitting again.';
    } else if (rawMsg && !rawMsg.includes('{') && !rawMsg.includes('API_KEY')) {
      clientMessage = rawMsg;
    }

    return new Response(JSON.stringify({ error: clientMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
