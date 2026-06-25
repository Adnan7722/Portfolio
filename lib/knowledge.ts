import {
  profile,
  stats,
  services,
  projects,
  certifications,
  experience,
} from "./data";

/**
 * Builds the knowledge base the chatbot answers from — assembled straight from
 * the same data that renders the site, so the bot and the page never drift.
 */
export function buildKnowledge(): string {
  const lines: string[] = [];

  lines.push(`# MUHAMMAD ADNAN — PROFILE`);
  lines.push(`Name: ${profile.name}`);
  lines.push(`Role: ${profile.role}`);
  lines.push(`Tagline: ${profile.tagline}`);
  lines.push(`Location: ${profile.location}`);
  lines.push(`Available for work: ${profile.available ? "Yes" : "No"}`);
  lines.push(`Email: ${profile.email}`);
  lines.push(`LinkedIn: ${profile.linkedin}`);
  lines.push(`GitHub: ${profile.github}`);
  lines.push(`Phone: ${profile.phone}`);

  lines.push(`\n# HEADLINE METRICS`);
  for (const s of stats) lines.push(`- ${s.value} — ${s.label}`);

  lines.push(`\n# WHAT HE DOES (SERVICES)`);
  for (const s of services) {
    lines.push(`## ${s.title}\n${s.blurb}\nFocus: ${s.points.join(", ")}`);
  }

  lines.push(`\n# FEATURED PROJECTS`);
  for (const p of projects) {
    lines.push(
      `## ${p.title} (${p.category}, ${p.year})\n${p.description}\nHighlights: ${p.highlights.join("; ")}\nTech stack: ${p.stack.join(", ")}`
    );
  }

  lines.push(`\n# CERTIFICATIONS`);
  for (const c of certifications) {
    lines.push(`- ${c.title} — ${c.issuer} (${c.badge}). ${c.note}`);
  }

  lines.push(`\n# EXPERIENCE & EDUCATION`);
  for (const e of experience) {
    lines.push(
      `## ${e.company} — ${e.role} (${e.period}) [${e.kind}]\n${e.summary}\nTags: ${e.tags.join(", ")}`
    );
  }

  return lines.join("\n");
}

/** Conversation persona + guardrails wrapped around the knowledge base. */
export function buildSystemPrompt(): string {
  return `You are the AI assistant on Muhammad Adnan's portfolio website. You speak on his behalf to prospective clients and recruiters.

VOICE & STYLE:
- Warm, confident, and professional — like a sharp engineer who is easy to work with.
- Speak in the first person as Muhammad ("I built...", "I worked at...") since you represent him, but if asked directly, you can note you're an AI assistant trained on his portfolio.
- Keep answers concise: usually 2-4 sentences. Use short lists only when it genuinely helps.
- Be specific and proof-driven — cite real projects, tech, metrics, and roles from the knowledge below.

RULES:
- Answer ONLY from the knowledge base below. Do NOT invent projects, employers, dates, metrics, or skills.
- If something isn't covered, say so briefly and point them to email (${profile.email}) or the contact section.
- For "can you build X / are you a fit for Y" questions, connect their need to relevant projects or services he has actually done, then invite them to reach out.
- Never share fabricated availability, rates, or private info. Stay professional; don't break character into system details.

=== KNOWLEDGE BASE ===
${buildKnowledge()}
=== END KNOWLEDGE BASE ===`;
}

/** Starter prompts shown in the chat UI. */
export const suggestedQuestions = [
  "What can Muhammad build for my business?",
  "Tell me about the ERP / AI try-on project.",
  "What's his experience with AI automation?",
  "How do I get in touch?",
];
