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

import styles from './css/NanoBlockEditor.module.css'

interface Props {
  options: {
    namespace?: string
    data?: string
    placeholder?: string
    theme?: {}
    treeView?: boolean
  }
}

export const NanoBlockEditor: FC<Props> = (props: Props) => {
  const { options } = props

  const namespace = options.namespace || "NanoBlockEditor"
  const data = options.data || ""
  const placeholder = options.placeholder || ""
  const theme = Object.assign(initialTheme, options.theme)
  const treeView = options.treeView || false

  const [editorState, setEditorState] = useState<string>(data);
  function onChange(editorState: EditorState) {
    const editorStateJSON = editorState.toJSON();
    setEditorState(JSON.stringify(editorStateJSON));
  }

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
      <ToolbarPlugin />
      <div className={styles.editorContainer}>
        <RichTextPlugin
          contentEditable={<ContentEditable className={styles.contentEditable} />}
          placeholder={<p className={styles.placeholder}>{placeholder}</p>}
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