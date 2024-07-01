import { useEffect } from 'react';
import { $getRoot } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

interface Props {
  maxNodes: {
    max: number,
    callback: (arg0: boolean) => void
  }
}

export const NodeLimitPlugin = (props: Props) => {
  const { maxNodes } = props
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {

      editorState.read(() => {
        const root = $getRoot();
        const childCount = root.getChildren().length;

        if (childCount > maxNodes.max) {
          editor.update(() => {
            const children = root.getChildren();
            for (let i = maxNodes.max; i < children.length; i++) {
              children[i].remove();
            }
            maxNodes.callback(true)
          });
        }
        else {
          maxNodes.callback(false)
        }
        
      });
    });
  }, [editor, maxNodes]);

  return null;
};

export default NodeLimitPlugin;
