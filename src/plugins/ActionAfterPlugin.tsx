// When the editor changes, you can get notified via the
import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export function ActionAfterPlugin({ actionAfter }: any) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerUpdateListener(() => {
      const editorState = editor.getEditorState()
      actionAfter(editorState)
    });
  }, [editor, actionAfter]);
  
  return null;
}