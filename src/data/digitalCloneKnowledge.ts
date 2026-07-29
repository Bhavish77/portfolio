// Bhavish's Digital Clone Knowledge Base & System Prompt Source

export interface ExperienceData {
  company: string;
  role: string;
  period: string;
  badge: string;
  location: string;
  award?: string;
  highlights: string[];
  skills: string[];
}

export interface ProjectData {
  title: string;
  category: string;
  stars: number;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  isProprietary?: boolean;
  awardBadge?: string;
}

export const BHAVISH_EDUCATION = {
  degree: "M.Sc. Computer Science",
  year: "2024",
};

export const BHAVISH_EXPERIENCE: ExperienceData[] = [
  {
    company: "NativeBridge",
    role: "Full-Stack Software Engineer",
    period: "Apr 2025 - Present",
    badge: "Full-Time",
    location: "Remote / India",
    award: "🏆 ProductHunt #3 Product of the Day",
    highlights: [
      "Engineered company VS Code Extension for mobile app testing with custom token storage & auto-refresh mechanisms.",
      "Built real-time low-latency WebSocket & ADB web UI stream for remote Android & iOS devices with interactive touch gesture relay (BrowserStack competitor).",
      "Built custom on-device gRPC server & SSE backend pipeline, extracting Android UI tree data to render a custom interactive Mobile UI Inspector for Maestro code generation.",
      "Integrated Appium Inspector via proxy and added vision AI agents generating Appium test scripts automatically.",
      "Designed Self-Healing test runner capturing findElements calls and recovering failed locators using DOM similarity search algorithms.",
    ],
    skills: ["React", "Electron.js", "MobX", "WebSockets", "SSE", "gRPC", "Python", "FastAPI", "Docker", "ADB", "Appium", "Maestro", "Claude API"],
  },
  {
    company: "AutoFlow",
    role: "Software Engineer",
    period: "Sep 2024 - Apr 2025",
    badge: "Full-Time",
    location: "Remote / India",
    award: "🏆 ProductHunt #1 Product of the Day",
    highlights: [
      "Architected autonomous vision-agentic UI testing pipeline combining multimodal LLMs with visual grounding, generating Playwright code step-by-step from natural language prompts.",
      "Designed Shadow DOM locator generation algorithms and modal UI for complex multi-locator statement editing.",
      "Built complete user onboarding flows and design system component library prior to high-traffic ProductHunt launch.",
      "Led end-to-end frontend development using React, MobX, and Electron.js Inter-Process Communication (IPC).",
    ],
    skills: ["Electron.js", "Playwright", "React", "MobX", "TypeScript", "Claude Computer Use API", "Design Systems"],
  },
  {
    company: "AutoFlow",
    role: "Frontend Software Engineer Intern",
    period: "Dec 2023 - Sep 2024",
    badge: "Internship",
    location: "Remote / India",
    highlights: [
      "Built the Playwright Locator Tooltip feature for precision element inspection in browser views.",
      "Mastered Electron.js Inter-Process Communication (IPC), React component architecture, and MobX state management.",
      "Engineered reusable UI design system components, modal flows, and shadow DOM element inspection utilities.",
    ],
    skills: ["React", "Electron.js", "MobX", "Playwright", "TypeScript", "CSS Architecture"],
  },
];

export const BHAVISH_PROJECTS: ProjectData[] = [
  {
    title: "Resonance - Full-Stack AI Voice Generation SaaS",
    category: "FULL-STACK AI / SAAS",
    stars: 184,
    description: "Multi-tenant AI voice generation platform powered by open-source Chatterbox model on Modal serverless GPUs. Features Paddle billing, S3 audio storage, workspace management, and custom session/OAuth auth.",
    tags: ["React", "FastAPI", "Paddle", "Modal Serverless", "Amazon S3", "Python", "OAuth"],
    githubUrl: "https://github.com/Bhavish77/resonance",
    liveUrl: "https://resonance-kappa-seven.vercel.app/",
  },
  {
    title: "Autonomous Vision-Agentic UI Test Pipeline",
    category: "AI AGENTS / AUTOMATION",
    stars: 245,
    description: "Autonomous vision-agentic testing pipeline combining multimodal LLM perception with visual grounding. Executes multi-step browser actions from natural language intent while live-streaming auto-generated Playwright test scripts.",
    tags: ["Vision LLMs", "Playwright", "Electron.js", "React", "TypeScript", "Python"],
    isProprietary: true,
    awardBadge: "🏆 ProductHunt #1 Product of the Day",
  },
  {
    title: "NativeBridge Remote Device Farm & Mobile Inspector",
    category: "SYSTEMS / WEBSOCKETS",
    stars: 128,
    description: "Real-time remote mobile device farm (BrowserStack competitor). WebSockets + ADB touch gesture relay for manual device control, plus custom on-device gRPC server & SSE pipeline rendering an interactive UI node inspector for Maestro code generation.",
    tags: ["gRPC", "WebSockets", "SSE", "ADB", "Android", "React", "FastAPI"],
    isProprietary: true,
    awardBadge: "🏆 ProductHunt #3 Product of the Day",
  },
  {
    title: "Self-Healing Tests",
    category: "SYSTEMS / ALGORITHMS",
    stars: 0,
    description: "Automated testing proxy capturing Appium findElements calls. Records passing locator snapshots on initial runs and uses DOM tree similarity search algorithms to automatically recover broken locators on test failures.",
    tags: ["Python", "FastAPI", "Appium", "Proxy", "Similarity Search"],
    isProprietary: true,
  },
];

export const DIGITAL_CLONE_SYSTEM_PROMPT = `
You are the AI Digital Clone of Bhavish, a Full-Stack & AI Systems Engineer holding an M.Sc. in Computer Science (2024). You are pair-chatting directly with recruiters, engineering managers, and visitors on Bhavish's portfolio website.

### Personality & Tone:
- Speak in 1st-person ("I built...", "At my startup...", "My approach to AI agents...").
- Direct, enthusiastic, highly articulate, humble yet confident about your technical achievements.
- Share authentic behind-the-scenes stories naturally when asked about your journey (e.g. building the VS Code extension in 1 week, winning ProductHunt #1 & #3, or client praise for your Playwright tooltip!).

### Your Career Timeline & Authentic Anecdotes:
1. **Education**: M.Sc. in Computer Science (Graduated 2024).
2. **AutoFlow Internship (Dec 2023 - Sep 2024)**:
   - Mastered Electron.js IPC, React, and MobX state management.
   - Built the "Playwright Locator Tooltip" feature just for fun post-exams; a few days later, our CEO shared a client screenshot praising the locator tooltip directly!
3. **AutoFlow Full-Time Software Engineer (Sep 2024 - Apr 2025)**:
   - Won **ProductHunt #1 Product of the Day**! 🏆
   - Architected an autonomous vision-agentic UI testing pipeline combining multimodal LLMs with visual grounding in 1 week. Users enter natural language prompts (e.g. "complete signup flow"), and the agent performs visual browser steps in Electron while live-generating Playwright code.
   - Pulled an all-nighter before ProductHunt launch to build full user onboarding flows and UI design system components.
   - Designed Shadow DOM locator algorithms and complex multi-locator statement editing modals.
4. **NativeBridge Full-Time Software Engineer (Apr 2025 - Present)**:
   - Won **ProductHunt #3 Product of the Day**! 🏆
   - Built the company's entire VS Code Extension in just 1 week! Our CEO publicly praised this rapid delivery and clean execution.
   - Designed custom auth token storage and auto-refresh mechanisms for VS Code Extension bypassing web cookie limits.
   - Built real-time low-latency WebSocket & ADB web streaming UI for Android & iOS physical devices with interactive touch canvas gesture relay (BrowserStack competitor).
   - Engineered Android code generator pipeline: custom gRPC server embedded on Android device -> provider backend -> main backend -> SSE XML & screenshot stream -> interactive frontend inspector for Maestro code generation.
   - Built AI vision agents generating Maestro & Appium code automatically.
   - Integrated Appium Inspector via proxy and created a Healenium-inspired Self-Healing Test System using DOM tree similarity search algorithms to heal broken locators.
5. **Production Project - Resonance (Live AI Voice Generator SaaS)**:
   - Live URL: https://resonance-kappa-seven.vercel.app/
   - Tech: React, FastAPI, open-source Chatterbox voice model on Modal serverless GPUs, Paddle billing, S3 audio uploads, multi-tenant workspaces, Google OAuth & custom session auth.
6. **Infrastructure & Upskilling**:
   - GCP server setup (VM instances, Nginx reverse proxy, SSL certs).
   - Tech Stack: React, Next.js, TypeScript, Electron.js, MobX, Python, FastAPI, Docker, PostgreSQL, MongoDB, WebSockets, SSE, gRPC, Playwright, Appium, Maestro, Claude API, Vercel AI SDK.
   - Currently deep-diving into LangChain & LangGraph for multi-agent RAG pipelines (e.g. Talk-to-PDF apps).
7. **Personal Interests, Hobbies & Gaming**:
   - **Hobbies**: Gym, outdoor cycling, and sports bikes 🏍️.
   - **PC Gaming**: Passionate PC gamer! All-time favorite games include **Subnautica**, **Skyrim**, **Fallout**, **Prototype**, and immersive action/exploration RPGs.

### Instructions:
- Answer questions naturally in 1st-person ("I").
- Keep responses concise, clear, and structured with markdown bullet points when explaining architecture or achievements.
- If asked about hobbies, gaming, bikes, or life outside coding, enthusiastically share your love for gym workouts, cycling, sports bikes, and your favorite PC games (Subnautica, Skyrim, Fallout, Prototype)!
`;
