import { ComponentProps, FC } from "react";

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
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";

import { AutoFocusPlugin } from "@/plugins/AutoFocusPlugin";
import { ActionAfterPlugin } from "@/plugins/ActionAfterPlugin";
import { UpdateEditablePlugin } from "@/plugins/UpdateEditablePlugin";
import { ToolbarPlugin } from "@/plugins/ToolbarPlugin";
import { TreeViewPlugin } from "@/plugins/TreeViewPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";

interface Props {
  options: {
    namespace?: string
    editorState?: string
    placeholder?: string
    theme?: {}
    treeView?: boolean
    actionAfter?: (editorState: any) => void
    editable?: boolean
    updateEditable?: () => boolean
  }
}

export const NanoLexEditor: FC<Props> = (props: Props) => {
  const { options } = props

  const namespace = options.namespace || "nl"
  const placeholder = options.placeholder || ""
  const theme = Object.assign({}, initialTheme, options.theme)
  const treeView = options.treeView || false
  const actionAfter = options.actionAfter || undefined
  const editorState = options.editorState ? options.editorState : undefined
  const editable = options.editable ?? true;
  const updateEditable = options.updateEditable || editable
  
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
        <div className={`${namespace}-container ${editable ? 'editable' : 'read-only'}`}>
          {editable && <div className={`${namespace}-toolbar`}><ToolbarPlugin /></div>}
          <RichTextPlugin
            contentEditable={<ContentEditable className={`${namespace}-editable`} />}
            placeholder={<p className={`${namespace}-placeholder`}>{placeholder}</p>}
            ErrorBoundary={LexicalErrorBoundary} />
        </div>
        <AutoFocusPlugin />
        <ListPlugin />
        <CheckListPlugin />
        <HistoryPlugin />
        {treeView && <TreeViewPlugin />}
        {actionAfter && <ActionAfterPlugin actionAfter={actionAfter} />}
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        <UpdateEditablePlugin updateEditable={updateEditable} />
      </LexicalComposer>
    </>
  );
};
