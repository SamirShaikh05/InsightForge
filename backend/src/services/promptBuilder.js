export function buildUpdatePrompt({
  title,
  originalContent,
  referenceContents
}) {
  return `
You are an expert content writer and SEO specialist.

TASK:
Improve the given article using the reference material provided.

RULES:
- Do NOT copy sentences verbatim from references
- Do NOT mention reference sources explicitly
- Preserve the original topic and intent
- Improve clarity, structure, and depth
- Expand weak or shallow sections
- Keep the tone professional and informative
- Output only the improved article content

ORIGINAL ARTICLE:
Title: ${title}

Content:
${originalContent}

REFERENCE MATERIAL:
${referenceContents.join("\n\n---\n\n")}

OUTPUT:
Return only the improved article text.
`;
}
