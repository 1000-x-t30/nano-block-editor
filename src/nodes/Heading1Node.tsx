import { FC, useCallback, useContext } from 'react'
import { TbH1 } from "react-icons/tb";
import { CheckButton } from '@/components/CheckButton'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode } from "@lexical/rich-text";
import { $wrapNodes } from '@lexical/selection'
import { $getSelection, $isRangeSelection } from "lexical";
import { BlockTypeContext } from '@/plugins/ToolbarPlugin';

interface Props {
  supportedBlockType: string
}

export const Heading1Node: FC<Props> = (props: Props) => {
  const { supportedBlockType } = props
  const { blockType, setBlockType } = useContext(BlockTypeContext)
  const [editor] = useLexicalComposerContext();

  const formatHeading1 = useCallback(() => {
      if (blockType !== "h1") {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $wrapNodes(selection, () => $createHeadingNode("h1"));
          }
        });
      }
      setBlockType("h1");
    }, [blockType, editor]);

  return (
    <CheckButton
    title={supportedBlockType}
    ariaLabel={supportedBlockType}
    ariaChecked={blockType === "h1"}
    onClick={() => formatHeading1()}>
      <TbH1 />
    </CheckButton>
  )
}