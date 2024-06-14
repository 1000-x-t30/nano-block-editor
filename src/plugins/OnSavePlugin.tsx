// When the editor changes, you can get notified via the
import { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export function OnSavePlugin({ onSave }: any) {
  const [editorState, setEditorState] = useState<string>('');
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({editorState}) => {
      const editorStateJSON = editorState.toJSON();
      setEditorState(JSON.stringify(editorStateJSON));
      onSave(editorState);
    });
  }, [editor, editorState, onSave]);
  
  return null;
}