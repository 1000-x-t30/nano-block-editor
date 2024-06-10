import { ComponentProps, FC, useRef } from "react";
import { type EditorState } from 'lexical';

// Lexical
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { TRANSFORMERS } from "@lexical/markdown";

// Initial Config
import { nodes } from "@/config/nodes";
import { initialTheme } from "@/config/theme";

// Plugins
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@/plugins/AutoFocusPlugin";
import { OnSavePlugin } from "@/plugins/OnSavePlugin";
import { ToolbarPlugin } from "@/plugins/ToolbarPlugin";
import { TreeViewPlugin } from "@/plugins/TreeViewPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";

interface Props {
  options: {
    namespace?: string
    initEditor?: string
    placeholder?: string
    theme?: {}
    treeView?: boolean
    onSave?: (error: any, response: any) => void
    editable?: boolean
  }
}

export const NanoBlockEditor: FC<Props> = (props: Props) => {
  const { options } = props

  const namespace = options.namespace || "NanoBlockEditor"
  const placeholder = options.placeholder || ""
  const theme = Object.assign({}, initialTheme, options.theme)
  const treeView = options.treeView || false
  const onSave = options.onSave || undefined
  const editable = options.editable || false
  const editorState = options.initEditor || undefined
  
  const editorStateRef = useRef<EditorState>();

  function onChange(editorState: EditorState) {
    editorStateRef.current = editorState
  }

  function onError(error: any): void {
    console.error(error)
  }

  const initialConfig: ComponentProps<typeof LexicalComposer>["initialConfig"] = {
    namespace,
    onError,
    theme,
    nodes,
    editorState,
    editable
  };

  return (
    <>
      <LexicalComposer initialConfig={initialConfig}>
        <div className="nbe-container">
          {editable && <div className="nbe-toolbar"><ToolbarPlugin /></div>}
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
        {onSave && <OnSavePlugin onSave={onSave} />}
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      </LexicalComposer>
    </>
  );
};
