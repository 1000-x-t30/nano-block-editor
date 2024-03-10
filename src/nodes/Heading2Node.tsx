import { FC, useCallback, useContext } from 'react'
import { TbH2 } from "react-icons/tb";
import { CheckButton } from '@/components/CheckButton'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode } from "@lexical/rich-text";
import { $wrapNodes } from '@lexical/selection'
import { $getSelection, $isRangeSelection } from "lexical";
import { BlockTypeContext } from '@/plugins/ToolbarPlugin';

interface Props {
  supportedBlockType: string
}

export const Heading2Node: FC<Props> = (props: Props) => {
  const { supportedBlockType } = props
  const { blockType, setBlockType } = useContext(BlockTypeContext)
  const [editor] = useLexicalComposerContext();

  const formatHeading2 = useCallback(() => {
      if (blockType !== "h2") {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $wrapNodes(selection, () => $createHeadingNode("h2"));
          }
        });
      }
      setBlockType("h2");
    }, [blockType, editor]);

  return (
    <CheckButton
    title={supportedBlockType}
    ariaLabel={supportedBlockType}
    ariaChecked={blockType === "h2"}
    onClick={() => formatHeading2()}>
      <TbH2 />
    </CheckButton>
  )
}