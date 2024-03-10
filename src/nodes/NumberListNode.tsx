import { FC, useCallback, useContext } from 'react'
import { CheckButton } from '@/components/CheckButton'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection } from "lexical";
import { BlockTypeContext } from '@/plugins/ToolbarPlugin';
import { INSERT_ORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND } from "@lexical/list";
import { TbListNumbers } from 'react-icons/tb';

interface Props {
  supportedBlockType: string
}

export const NumberListNode: FC<Props> = (props: Props) => {
  const { supportedBlockType } = props
  const { blockType, setBlockType } = useContext(BlockTypeContext)
  const [editor] = useLexicalComposerContext();

  const formatNumberedList = useCallback(() => {
    if (blockType !== "ol") {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        }
      });
      setBlockType("ol");
    }
    else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  }, [blockType, editor]);

  return (
    <CheckButton
    title={supportedBlockType}
    ariaLabel={supportedBlockType}
    ariaChecked={blockType === "ol"}
    onClick={() => formatNumberedList()}>
      <TbListNumbers />
    </CheckButton>
  )
}