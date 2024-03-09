import { ComponentProps, FC } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { nodes } from "@/nodes";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@/plugins/AutoFocusPlugin";
import { ToolbarPlugin } from "@/plugins/ToolbarPlugin";
import { TreeViewPlugin } from "@/plugins/TreeViewPlugin"; 

import styles from './css/NanoBlockEditor.module.css'

function onError(error: any): void {
  console.error(error)
}

const initialConfig: ComponentProps<typeof LexicalComposer>["initialConfig"] = {
  namespace: "NanoBlockEditor",
  onError,
  nodes
};

export const NanoBlockEditor: FC = () => {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ToolbarPlugin />
      <div className={styles.editorContainer}>
        <RichTextPlugin
          contentEditable={<ContentEditable className={styles.contentEditable} />}
          placeholder={<p className={styles.placeholder}>いまなにしてる？</p>}
          ErrorBoundary={LexicalErrorBoundary} />
      </div>
      <AutoFocusPlugin />
      <HistoryPlugin />
      <TreeViewPlugin />
    </LexicalComposer>
  );
};