import { FC, useCallback, useContext } from 'react'
import { TbBlockquote } from "react-icons/tb";
import { CheckButton } from '@/components/CheckButton'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $wrapNodes } from '@lexical/selection'
import { $createQuoteNode } from "@lexical/rich-text";
import { $getSelection, $isRangeSelection } from "lexical";
import { BlockTypeContext } from '@/plugins/ToolbarPlugin';

interface Props {
  supportedBlockType: string
}

export const QuoteNode: FC<Props> = (props: Props) => {
  const { supportedBlockType } = props
  const { blockType, setBlockType } = useContext(BlockTypeContext)
  const [editor] = useLexicalComposerContext();

  const formatQuote = useCallback(() => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createQuoteNode());
        }
      });
      setBlockType("quote");
    }
  }, [blockType, editor]);

  return (
    <CheckButton
    title={supportedBlockType}
    ariaLabel={supportedBlockType}
    ariaChecked={blockType === "quote"}
    onClick={() => formatQuote()}>
      <TbBlockquote />
    </CheckButton>
  )
}