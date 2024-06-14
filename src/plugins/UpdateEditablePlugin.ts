import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

interface Props {
  updateEditable: boolean | (() => boolean)
}

export function UpdateEditablePlugin(props: Props) {
  const { updateEditable } = props
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(() => {
      const newEditable = typeof updateEditable === 'boolean' ?updateEditable : updateEditable()
      editor.setEditable(newEditable);
    })
  }, [updateEditable]);

  return null;
};