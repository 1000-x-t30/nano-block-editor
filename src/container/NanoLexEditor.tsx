import { ComponentProps, FC } from "react";

// Lexical
import { Klass, LexicalNode } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { TRANSFORMERS } from "@lexical/markdown";

// Initial Config
import { initialNodes } from "@/config/nodes";
import { initialTheme } from "@/config/theme";

// Nodes
import { HeadingNode as LxHeadingNode, QuoteNode as LxQuoteNode } from "@lexical/rich-text";
import { ListItemNode as LxListItemNode, ListNode as LxListNode } from "@lexical/list";
import { CodeNode as LxCodeNode, CodeHighlightNode as LxCodeHighlightNode } from "@lexical/code";
import { HorizontalRuleNode as LxHorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { LinkNode as LxLinkNode } from '@lexical/link';

// Plugins
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
// import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";

import { AutoFocusPlugin } from "@/plugins/AutoFocusPlugin";
import { ActionAfterPlugin } from "@/plugins/ActionAfterPlugin";
import { UpdateEditablePlugin } from "@/plugins/UpdateEditablePlugin";
import { ToolbarPlugin } from "@/plugins/ToolbarPlugin";
import { TreeViewPlugin } from "@/plugins/TreeViewPlugin";
import { NodeLimitPlugin } from "@/plugins/NodeLimitPlugin "
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";

interface Props {
  options: {
    namespace?: string
    editorState?: string
    placeholder?: string
    theme?: {}
    nodes?: Klass<LexicalNode>[]
    maxNodes?: {
      max: number,
      callback: (arg0: boolean) => void
    }
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
  const nodes = options.nodes || initialNodes
  const maxNodes = options.maxNodes || false
  const treeView = options.treeView || false
  const actionAfter = options.actionAfter || false
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
          {editable && <ToolbarPlugin />}
          <RichTextPlugin
            contentEditable={<ContentEditable className={`${namespace}-editable`} />}
            placeholder={<p className={`${namespace}-placeholder`}>{placeholder}</p>}
            ErrorBoundary={LexicalErrorBoundary} />
        </div>
        <AutoFocusPlugin />
        <HistoryPlugin />

        {nodes === initialNodes && <MarkdownShortcutPlugin transformers={TRANSFORMERS} />}
        {nodes === initialNodes || nodes.includes(ListNode) && <ListPlugin />}
        {/* <CheckListPlugin /> */}
        
        {treeView && <TreeViewPlugin />}
        {actionAfter && <ActionAfterPlugin actionAfter={actionAfter} />}
        {maxNodes && <NodeLimitPlugin maxNodes={maxNodes} />}

        <UpdateEditablePlugin updateEditable={updateEditable} />
      </LexicalComposer>
    </>
  );
};

export const HeadingNode = LxHeadingNode
export const ListNode =  LxListNode
export const ListItemNode = LxListItemNode
export const QuoteNode = LxQuoteNode
export const CodeNode = LxCodeNode
export const LinkNode = LxLinkNode
export const CodeHighlightNode = LxCodeHighlightNode
export const HorizontalRuleNode = LxHorizontalRuleNode