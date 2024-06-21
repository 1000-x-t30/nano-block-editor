import { FC, useEffect, useState, createContext, useContext } from "react";
import { SupportedBlockType, BlockType } from "@/config/supportedBlockType";

import { ParagraphNode } from "@/nodes/ParagraphNode";
import { Heading1Node } from "@/nodes/Heading1Node";
import { Heading2Node } from "@/nodes/Heading2Node";
import { Heading3Node } from "@/nodes/Heading3Node";
import { BulletListNode } from "@/nodes/BulletListNode";
import { NumberListNode } from "@/nodes/NumberListNode";
// import { CheckListNode } from "@/nodes/CheckListNode";
import { QuoteNode } from "@/nodes/QuoteNode";
import { CodeNode } from "@/nodes/CodeNode";

export const BlockTypeContext = createContext({} as {
  blockType: BlockType
  setBlockType:React.Dispatch<React.SetStateAction<BlockType>>
});

export const ToolbarPlugin: FC = () => {
  const [blockType, setBlockType] = useState<BlockType>("paragraph");

  useEffect(() => {
    setBlockType(blockType)
    useContext
  }, [blockType])

  return (
    
      <BlockTypeContext.Provider value={{ blockType, setBlockType }}>
        <ul className="nano-toolbar-nodes">
        <li className="nano-toolbar-node"><ParagraphNode supportedBlockType={SupportedBlockType.paragraph} /></li>
        <li className="nano-toolbar-node"><Heading1Node supportedBlockType={SupportedBlockType.h1} /></li>
        <li className="nano-toolbar-node"><Heading2Node supportedBlockType={SupportedBlockType.h2} /></li>
        <li className="nano-toolbar-node"><Heading3Node supportedBlockType={SupportedBlockType.h3} /></li>
        <li className="nano-toolbar-node"><BulletListNode supportedBlockType={SupportedBlockType.ul} /></li>
        <li className="nano-toolbar-node"><NumberListNode supportedBlockType={SupportedBlockType.ol} /></li>
        {/* <li className="nano-toolbar-node"><CheckListNode supportedBlockType={SupportedBlockType.check} /></li> */}
        <li className="nano-toolbar-node"><QuoteNode supportedBlockType={SupportedBlockType.quote} /></li>
        <li className="nano-toolbar-node"><CodeNode supportedBlockType={SupportedBlockType.code} /></li>
        </ul>
      </BlockTypeContext.Provider>
  );
};
