interface LexicalNode {
  type: string;
  text?: string;
  children?: LexicalNode[];
}

export const ExtractTextFromJson = (json: any): string[] => {
  const texts: string[] = [];

  const extractText = (node: LexicalNode) => {
    if (node.text) {
      texts.push(node.text);
    }
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => extractText(child));
    }
  };

  if (json && json.root) {
    json.root.children.forEach((node: LexicalNode) => extractText(node));
  }

  return texts;
};