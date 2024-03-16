import { ComponentProps, FC, useState } from "react";
import { type EditorState } from 'lexical';

// lexical
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { TRANSFORMERS } from "@lexical/markdown";

// initial config
import { nodes } from "@/config/nodes";
import { initialTheme } from "@/config/theme";

// plugins
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@/plugins/AutoFocusPlugin";
import { ToolbarPlugin } from "@/plugins/ToolbarPlugin";
import { TreeViewPlugin } from "@/plugins/TreeViewPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";

interface Props {
  options: {
    namespace?: string
    data?: string
    placeholder?: string
    theme?: {}
    treeView?: boolean
    saveCallback?: (error: any, response: any) => void
  }
}

export const NanoBlockEditor: FC<Props> = (props: Props) => {
  const { options } = props

  const namespace = options.namespace || "NanoBlockEditor"
  const data = options.data || ""
  const placeholder = options.placeholder || ""
  const theme = Object.assign(initialTheme, options.theme)
  const treeView = options.treeView || false
  const saveCallback = options.saveCallback || function() {}

  const [editorState, setEditorState] = useState<string>(data);
  function onChange(editorState: EditorState) {
    const editorStateJSON = editorState.toJSON();
    setEditorState(JSON.stringify(editorStateJSON));
  }

  const nbeSaveButton = document.querySelector('[data-nbe-save]')
  nbeSaveButton?.addEventListener('click', () => {
    saveCallback(null, { json: editorState })
  })

  function onError(error: any): void {
    console.error(error)
  }

  const initialConfig: ComponentProps<typeof LexicalComposer>["initialConfig"] = {
    namespace,
    onError,
    theme,
    nodes,
    editorState
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="nbe-container">
        <div className="nbe-toolbar"><ToolbarPlugin /></div>
        <RichTextPlugin
          contentEditable={<ContentEditable className="nbe-editable" />}
          placeholder={<p className="nbe-placeholder">{placeholder}</p>}
          ErrorBoundary={LexicalErrorBoundary} />
      </div>
      <AutoFocusPlugin />
      <ListPlugin />
      <CheckListPlugin />
      <HistoryPlugin />
      {treeView && <TreeViewPlugin />}
      <OnChangePlugin onChange={onChange} />
      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
    </LexicalComposer>
  );
};