// When the editor changes, you can get notified via the
import { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export function OnSavePlugin({ onSave }: any) {
  const [editorState, setEditorState] = useState<string>('');
  // Access the editor through the LexicalComposerContext
  const [editor] = useLexicalComposerContext();
  // Wrap our listener in useEffect to handle the teardown and avoid stale references.
  useEffect(() => {
    // most listeners return a teardown function that can be called to clean them up.
    return editor.registerUpdateListener(({editorState}) => {
      // call onChange here to pass the latest state up to the parent.
      const editorStateJSON = editorState.toJSON();
      setEditorState(JSON.stringify(editorStateJSON));
      onSave(editorState);
    });
  }, [editor, editorState, onSave]);
  return null;
}