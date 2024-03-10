import { FC, useCallback, useContext } from 'react'
import { TbH3 } from "react-icons/tb";
import { CheckButton } from '@/components/CheckButton'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode } from "@lexical/rich-text";
import { $wrapNodes } from '@lexical/selection'
import { $getSelection, $isRangeSelection } from "lexical";
import { BlockTypeContext } from '@/plugins/ToolbarPlugin';

interface Props {
  supportedBlockType: string
}

export const Heading3Node: FC<Props> = (props: Props) => {
  const { supportedBlockType } = props
  const { blockType, setBlockType } = useContext(BlockTypeContext)
  const [editor] = useLexicalComposerContext();

  const formatHeading3 = useCallback(() => {
      if (blockType !== "h3") {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $wrapNodes(selection, () => $createHeadingNode("h3"));
          }
        });
      }
      setBlockType("h3");
    }, [blockType, editor]);

  return (
    <CheckButton
    title={supportedBlockType}
    ariaLabel={supportedBlockType}
    ariaChecked={blockType === "h3"}
    onClick={() => formatHeading3()}>
      <TbH3 />
    </CheckButton>
  )
}