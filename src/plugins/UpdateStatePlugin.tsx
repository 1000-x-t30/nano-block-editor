import { $getRoot, $getSelection } from 'lexical';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TemplateString } from 'next/dist/lib/metadata/types/metadata-types';

export const UpdatePlugin = (state: TemplateString) => {
  const [editor] = useLexicalComposerContext();
  editor.update(() => {
    const root = $getRoot();
    const selection = $getSelection();
    root.append(selection.state);
  });
};
