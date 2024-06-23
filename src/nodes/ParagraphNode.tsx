import { FC, useCallback, useContext } from 'react'
import { PiParagraphBold } from "react-icons/pi";
import { CheckButton } from '@/components/CheckButton'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $wrapNodes } from '@lexical/selection'
import { $createParagraphNode, $getSelection, $isRangeSelection } from "lexical";
import { BlockTypeContext } from '@/plugins/ToolbarPlugin';

interface Props {
  supportedBlockType: string
}

export const ParagraphNode: FC<Props> = (props: Props) => {
  const { supportedBlockType } = props
  const { blockType, setBlockType } = useContext(BlockTypeContext)
  const [editor] = useLexicalComposerContext();

  const formatParagraph = useCallback(() => {
    if (blockType !== "paragraph") {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createParagraphNode());
        }
      });
      setBlockType("paragraph");
    }
  }, [blockType, editor]);

  return (
    <CheckButton
    title={supportedBlockType}
    ariaLabel={supportedBlockType}
    ariaChecked={blockType === "paragraph"}
    onClick={() => formatParagraph()}>
      <PiParagraphBold />
    </CheckButton>
  )
}