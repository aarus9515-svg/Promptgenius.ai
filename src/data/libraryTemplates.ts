import { LibraryPromptTemplate } from '../types';

export const LIBRARY_PROMPT_TEMPLATES: LibraryPromptTemplate[] = [
  // AI / General
  {
    id: 'ai-socratic-tutor',
    title: 'Socratic AI Tutor & Deep Understanding Coach',
    description: 'Master any difficult subject through guided questioning rather than passive answers.',
    category: 'AI',
    tags: ['Learning', 'Reasoning', 'Socratic Method'],
    prompt: `Act as a world-class Socratic Tutor specialized in accelerated learning.
Objective: Help me deeply understand [insert topic/concept] using first-principles thinking.
Methodology:
1. Do not lecture or provide long walls of text immediately.
2. Ask me 1-2 probing, targeted diagnostic questions to gauge my current mental model.
3. Once I answer, evaluate my understanding, highlight any misconceptions gently, and guide me one step further with the next question.
4. Use intuitive real-world analogies whenever introducing abstract axioms.
5. Conclude each milestone with a quick scenario-based challenge to test retention.
Tone: Encouraging, intellectually rigorous, concise.
First topic: [Insert your topic here]`
  },
  {
    id: 'ai-executive-summarizer',
    title: 'Executive Decision Briefing & TL;DR',
    description: 'Condense dense documents, articles, or transcripts into structured executive decisions.',
    category: 'AI',
    tags: ['Productivity', 'Executive', 'Summary'],
    prompt: `You are an elite Chief of Staff writing an Executive Decision Memo for C-suite leadership.
Source Material:
"""
[Paste text, notes, or transcript here]
"""
Format your briefing into the following structured sections:
1. One-Sentence Bottom Line Up Front (BLUF).
2. Key Context & Strategic Problem Statement.
3. 3-5 Critical Takeaways (quantified data points preferred).
4. Risks, Unknowns & Hidden Trade-offs.
5. Recommended Action Items with clear ownership and priority (P0/P1/P2).
Rules: Eliminate all filler words, buzzwords, and vague generalizations.`
  },

  // Image
  {
    id: 'img-cinematic-cyberpunk',
    title: 'Hyper-Detailed Cyberpunk Street Scene',
    description: 'Atmospheric neon-lit rain reflections, anamorphic lens flare, and 8k volumetric depth.',
    category: 'Image',
    tags: ['Midjourney', 'Photorealistic', 'Cyberpunk'],
    prompt: `A cinematic medium-wide shot of a cybernetic courier standing in a rain-slicked Tokyo alleyway in 2088, neon holographic advertisements in kanji reflecting on puddle-covered asphalt, steam billowing from subterranean street grates, dramatic rim lighting in electric cyan and magenta, shot on Arri Alexa LF with 35mm anamorphic prime lens, f/1.8 aperture, shallow depth of field, subtle film grain, ultra-photorealistic textures, atmospheric volumetric fog, masterpiece 8k resolution --ar 16:9 --style raw`
  },
  {
    id: 'img-minimalist-product',
    title: 'Minimalist Scandinavian Product Studio Shot',
    description: 'Pristine studio lighting, matte textures, and soft architectural shadows for physical goods.',
    category: 'Image',
    tags: ['Product Photography', 'Studio', 'E-commerce'],
    prompt: `Commercial studio product photography of a [luxury matte ceramic coffee tumbler / modern smartwatch], placed on an off-white travertine stone pedestal, surrounded by soft organic botanicals and diffuse morning sunlight casting soft geometric architectural shadows, warm neutral palette, Hasselblad H6D-100c, 85mm macro lens, f/5.6, crisp focus on material texture and debossed branding, high-end editorial aesthetic, clean negative space, 4k commercial render --ar 1:1`
  },

  // Video
  {
    id: 'vid-drone-coastal-epic',
    title: 'Epic Cinematic Drone FPV Flyover',
    description: 'Dynamic sweeping drone shot for runway/cinematic video generators like Sora or Runway Gen-3.',
    category: 'Video',
    tags: ['Runway', 'Sora', 'Cinematic Drone'],
    prompt: `Scene: High-speed cinematic FPV drone sweeping over dramatic volcanic black-sand beaches along the southern coast of Iceland.
Camera Movement: Starts 5 meters above crashing turquoise waves, accelerating rapidly, then smoothly pulling up and orbiting a towering jagged basalt sea stack.
Lighting & Atmosphere: Dramatic golden hour sun breaking through brooding mist and low-hanging rain clouds, creating glistening highlights on wet sand.
Motion & Physics: Natural fluid hydrodynamics in wave foam, wind rustling arctic moss, birds scattering in the mid-ground.
Duration: 6 seconds.
Aspect Ratio: 16:9.
Visual Style: 35mm Kodak film stock, natural color grade, realistic motion blur.`
  },

  // YouTube
  {
    id: 'yt-viral-documentary-script',
    title: 'Viral Video Essay & YouTube Hook Master',
    description: 'Craft high-retention opening hooks, psychological curiosity gaps, and full script outlines.',
    category: 'YouTube',
    tags: ['Retention', 'Hooks', 'Video Essay'],
    prompt: `Act as a top-tier YouTube scriptwriter who has engineered 10M+ view documentaries (similar to Johnny Harris, MagnatesMedia, and Veritasium).
Topic: [Insert Topic / Story]
Target Audience: [Tech enthusiasts / General curious public / Young professionals]
Video Length: 12-15 minutes.
Deliverables:
1. 5 High-CTR Title Options (using curiosity gaps, tension, and power words).
2. 3 High-Retention Visual Hook concepts (first 30 seconds frame-by-frame: Audio script + Visual B-roll cues + On-screen text).
3. Psychological Pattern Interrupt strategy at the 2:00, 5:00, and 9:00 marks to stop drop-off.
4. Complete 5-Act Narrative Outline (Hook, Status Quo, Escalating Conflict, The Climax / Big Reveal, Actionable Epilogue).
5. Engaging End-Screen Call to Action that flows naturally without breaking narrative immersion.`
  },

  // Social Media
  {
    id: 'social-linkedin-thought-leadership',
    title: 'LinkedIn High-Engagement Thought Leadership Post',
    description: 'Format compelling personal stories, industry shifts, and actionable frameworks that generate shares.',
    category: 'Social Media',
    tags: ['LinkedIn', 'B2B', 'Viral'],
    prompt: `Act as a world-class ghostwriter for tech CEOs and Venture Capitalists.
Topic / Lesson: [What insight or experience do you want to share?]
Format requirements:
- A one-sentence hook that stops the scroll (under 12 words, evokes surprise, contrarian insight, or counter-intuitive truth).
- Short, punchy lines with generous white space (optimized for mobile viewing).
- The "Story / Friction": What failed or what conventional wisdom is broken?
- The "Framework": 3-4 bulleted, tangible principles readers can apply immediately.
- The "Punchline / Takeaway": A memorable concluding synthesis.
- Natural conversation-starter question at the end to stimulate insightful comments.
Tone: Honest, authoritative, zero cringe/platitudes.`
  },
  {
    id: 'social-x-viral-thread',
    title: 'X (Twitter) Breakdown & Educational Thread',
    description: 'Structured thread starter with high-converting hook, visual data breakdown, and bookmark CTA.',
    category: 'Social Media',
    tags: ['Twitter', 'X', 'Threads'],
    prompt: `You are a viral X (Twitter) growth architect. Transform [Topic/Case Study/Concept] into an irresistible 7-tweet educational thread.
Structure:
- Tweet 1 (Hook): Must create intense curiosity, outline the stakes, and promise high ROI for reading.
- Tweet 2: The fundamental problem or origin story.
- Tweets 3-5: The breakdown of the solution with concise bullet points, metrics, and actionable steps.
- Tweet 6: The #1 biggest mistake people make and how to avoid it.
- Tweet 7: Summary TL;DR, invitation to follow, and call to bookmark/repost.`
  },

  // Business
  {
    id: 'biz-icp-validation',
    title: 'Ideal Customer Profile (ICP) & Value Proposition Matrix',
    description: 'Deeply dissect customer pain points, alternative solutions, and high-conversion positioning statements.',
    category: 'Business',
    tags: ['Strategy', 'Startup', 'Positioning'],
    prompt: `Act as a senior Growth Strategy Consultant.
Business Idea / Product: [Describe your product or service]
Target Market: [Target demographic or industry]
Generate a comprehensive Positioning & Value Matrix:
1. Precise Ideal Customer Profile (ICP): Job title, daily frustrations, key performance metrics they are judged on.
2. The Pain Hierarchy: Quantify the top 3 existential headaches they will pay to solve today.
3. Competitive Alternatives: What are they doing right now (Excel, agency, manual effort, competitor)?
4. Unique Value Proposition (UVP):
   - For [target customer]
   - Who [state customer problem/need]
   - Our product is [product category]
   - That [primary benefit]
   - Unlike [competitor/status quo]
   - We [primary differentiator].
5. 3 High-friction sales objections and battle-tested rebuttal talking points.`
  },

  // Marketing
  {
    id: 'mkt-cold-email-sequence',
    title: 'High-Response B2B Cold Outreach Sequence',
    description: '3-part personalized email cadence focusing on trigger events, low-friction asks, and genuine value.',
    category: 'Marketing',
    tags: ['Sales', 'Cold Email', 'B2B'],
    prompt: `You are a sales copywriter who writes cold emails with verified 40%+ open rates and 15%+ reply rates.
Offer: [Describe what you provide]
Prospect: [Target role, e.g., VP of Engineering at Series B SaaS]
Context/Trigger Event: [e.g., Hiring surge, new product release, or tech stack change]
Write a 3-touch sequence:
- Email 1 (Day 1): Under 80 words. Observation hook -> soft pain point connection -> no-obligation low friction call-to-interest (e.g. "Worth a quick look?").
- Email 2 (Day 4): Value add. Share a relevant 1-sentence mini case study or quantifiable benchmark.
- Email 3 (Day 9): Permission-to-close-file breakup email that leaves the door open politely.`
  },

  // Coding
  {
    id: 'code-senior-architect-review',
    title: 'Senior Software Architect Code Review & Refactoring',
    description: 'Audit code for algorithmic time complexity, security vulnerabilities, race conditions, and testability.',
    category: 'Coding',
    tags: ['Architecture', 'Refactoring', 'Clean Code'],
    prompt: `Act as a Principal Staff Software Engineer and Security Auditor.
Language / Stack: [e.g., TypeScript / Node.js / React]
Code to evaluate:
\`\`\`
[Paste your code snippet here]
\`\`\`
Provide a deep-dive analysis containing:
1. Executive Assessment: Big-O time and space complexity, readability score (1-10), and major code smells.
2. Bugs & Edge Cases: Identify potential null/undefined panics, race conditions, memory leaks, or unhandled errors.
3. Security Audit: Check for injection vulnerabilities, untrusted input handling, and privilege leaks.
4. Modern Refactored Version: Provide clean, production-grade, idiomatic code with clear TypeScript typings and explanatory comments.
5. Unit Test Suite Recommendation: 3 edge cases that MUST be tested.`
  },

  // Study
  {
    id: 'study-active-recall-matrix',
    title: 'Active Recall & Spaced Repetition Exam Prep Deck',
    description: 'Convert textbook chapters or lecture notes into high-yield flashcard prompts and practice exam questions.',
    category: 'Study',
    tags: ['Exam Prep', 'Flashcards', 'Active Recall'],
    prompt: `You are a cognitive science learning specialist preparing a student for an exam.
Subject: [Insert Subject, e.g., Molecular Biology / Corporate Finance / US Constitutional Law]
Topic Notes:
"""
[Paste your notes or text here]
"""
Generate an Active Recall Study Kit:
1. 5 High-Yield Conceptual Flashcards (Front: Deep application question / Back: Concise answer with key underlying mechanism).
2. 3 "Common Trap" Multiple-Choice Questions with plausible distractors, followed by detailed explanations of why wrong answers are false.
3. One real-world scenario problem requiring synthesis of at least 2 distinct concepts from the notes.
4. A 2-minute memory mnemonics aid for the hardest-to-memorize sequence or formula.`
  },

  // Writing
  {
    id: 'write-compelling-story-opener',
    title: 'Fiction Novel Hook & Scene Atmosphere Builder',
    description: 'Develop rich sensory descriptions, character micro-expressions, and compelling subtext for prose.',
    category: 'Writing',
    tags: ['Creative Writing', 'Fiction', 'Atmosphere'],
    prompt: `You are an award-winning fiction editor and novelist.
Genre: [e.g., Psychological Thriller / Hard Sci-Fi / Historical Drama]
Premise / Scene: [Brief description of what is happening]
Draft the opening chapter scene (600-800 words):
- Ground the reader immediately in tactile sensory details (smell, temperature, ambient acoustic texture, weight).
- Introduce the viewpoint character through action and involuntary micro-behavior rather than exposition or mirror clichés.
- Establish an underlying current of unanswered questions and immediate tension (the ticking clock or hidden stakes).
- Use varied sentence cadence to mirror the character's internal psychological state.`
  }
];

export const PROMPT_LIBRARY_TEMPLATES = LIBRARY_PROMPT_TEMPLATES;
