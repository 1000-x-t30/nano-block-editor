import { FC, useEffect, useState, createContext, useContext } from "react"
import { SupportedBlockType, BlockType } from "@/config/supportedBlockType"

import { ParagraphNode } from "@/nodes/ParagraphNode"
import { Heading1Node } from "@/nodes/Heading1Node"
import { Heading2Node } from "@/nodes/Heading2Node"
import { Heading3Node } from "@/nodes/Heading3Node"
import { BulletListNode } from "@/nodes/BulletListNode"
import { NumberListNode } from "@/nodes/NumberListNode"
// import { CheckListNode } from "@/nodes/CheckListNode"
import { QuoteNode } from "@/nodes/QuoteNode"
import { CodeNode } from "@/nodes/CodeNode"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_EDITOR, KEY_DOWN_COMMAND } from "lexical"

export const BlockTypeContext = createContext({} as {
  blockType: BlockType
  setBlockType:React.Dispatch<React.SetStateAction<BlockType>>
})

export const ToolbarPlugin: FC = () => {
  const [editor] = useLexicalComposerContext()
  const [showToolbar, setShowToolbar] = useState(false)
  const [varCommand, setVarCommand] = useState('')
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      setVarCommand(event.key)
      if (event.key === '/') {
        setShowToolbar(true)
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          const domSelection = window.getSelection()
          if (domSelection && domSelection.rangeCount > 0) {
            const range = domSelection.getRangeAt(0)
            const rects = range.getClientRects()
            if (rects.length > 0) {
              const rect = rects[0];
              const editorElement = document.querySelector('.nl-container');
              if (editorElement) {
                const editorRect = editorElement.getBoundingClientRect();
                setToolbarPosition({
                  top: rect.bottom - editorRect.top + editorElement.scrollTop,
                  left: rect.left - editorRect.left + editorElement.scrollLeft,
                });
              }
            }
          }
        }
        return true
      }
      if (event.key === 'Enter') {
        setShowToolbar(false)
      }
      if (varCommand != '/') {
        setShowToolbar(false)
      }
      return false
    }

    const removeKeyDownListener = editor.registerCommand(
      KEY_DOWN_COMMAND,
      handleKeyDown,
      COMMAND_PRIORITY_EDITOR
    )

    return () => {
      removeKeyDownListener();
    };

  }, [editor])

  const [blockType, setBlockType] = useState<BlockType>("paragraph")
  useEffect(() => {
    setBlockType(blockType)
    useContext
  }, [blockType])

  return (
    <>
    {showToolbar && (
      <BlockTypeContext.Provider value={{ blockType, setBlockType }}>
        <div
          className="nl-toolbar"
          style={{
            position: 'absolute',
            top: `${toolbarPosition.top}px`,
            left: `${toolbarPosition.left}px`,
            backgroundColor: 'white',
            border: '1px solid black',
            padding: '8px',
            zIndex: 1000,
          }}>
          <ul className="nl-toolbar-nodes">
            <li className="nl-toolbar-node"><ParagraphNode supportedBlockType={SupportedBlockType.paragraph} /></li>
            <li className="nl-toolbar-node"><Heading1Node supportedBlockType={SupportedBlockType.h1} /></li>
            <li className="nl-toolbar-node"><Heading2Node supportedBlockType={SupportedBlockType.h2} /></li>
            <li className="nl-toolbar-node"><Heading3Node supportedBlockType={SupportedBlockType.h3} /></li>
            <li className="nl-toolbar-node"><BulletListNode supportedBlockType={SupportedBlockType.ul} /></li>
            <li className="nl-toolbar-node"><NumberListNode supportedBlockType={SupportedBlockType.ol} /></li>
            {/* <li className="nl-toolbar-node"><CheckListNode supportedBlockType={SupportedBlockType.check} /></li> */}
            <li className="nl-toolbar-node"><QuoteNode supportedBlockType={SupportedBlockType.quote} /></li>
            <li className="nl-toolbar-node"><CodeNode supportedBlockType={SupportedBlockType.code} /></li>
          </ul>
        </div>
      </BlockTypeContext.Provider>
    )}
    </>
  );
};
