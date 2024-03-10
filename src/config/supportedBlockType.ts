export const SupportedBlockType = {
  paragraph: "Paragraph",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  ul: "ul",
  ol: "ol",
  check: "cl",
  quote: "quate",
  code: "code"
} as const;

export type BlockType = keyof typeof SupportedBlockType;