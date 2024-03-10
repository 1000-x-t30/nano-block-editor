import { FC, useEffect, useState, createContext, useContext } from "react";

import styles from "@/css/ToolbarPlugin.module.css";
import { SupportedBlockType, BlockType } from "@/config/supportedBlockType";

import { ParagraphNode } from "@/nodes/ParagraphNode";
import { Heading1Node } from "@/nodes/Heading1Node";
import { Heading2Node } from "@/nodes/Heading2Node";
import { Heading3Node } from "@/nodes/Heading3Node";
import { BulletListNode } from "@/nodes/BulletListNode";
import { NumberListNode } from "@/nodes/NumberListNode";
import { CheckListNode } from "@/nodes/CheckListNode";
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
    <div className={styles.toolbar}>
      <BlockTypeContext.Provider value={{ blockType, setBlockType }}>
        <ParagraphNode supportedBlockType={SupportedBlockType.paragraph} />
        <Heading1Node supportedBlockType={SupportedBlockType.h1} />
        <Heading2Node supportedBlockType={SupportedBlockType.h2} />
        <Heading3Node supportedBlockType={SupportedBlockType.h3} />
        <BulletListNode supportedBlockType={SupportedBlockType.ul} />
        <NumberListNode supportedBlockType={SupportedBlockType.ol} />
        <CheckListNode supportedBlockType={SupportedBlockType.check} />
        <QuoteNode supportedBlockType={SupportedBlockType.quote} />
        <CodeNode supportedBlockType={SupportedBlockType.code} />
      </BlockTypeContext.Provider>
    </div>
  );
};
