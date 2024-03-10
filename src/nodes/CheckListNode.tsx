import { FC, useCallback, useContext } from 'react'
import { CheckButton } from '@/components/CheckButton'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection } from "lexical";
import { BlockTypeContext } from '@/plugins/ToolbarPlugin';
import { INSERT_CHECK_LIST_COMMAND, REMOVE_LIST_COMMAND } from "@lexical/list";
import { TbListCheck } from 'react-icons/tb';

interface Props {
  supportedBlockType: string
}

export const CheckListNode: FC<Props> = (props: Props) => {
  const { supportedBlockType } = props
  const { blockType, setBlockType } = useContext(BlockTypeContext)
  const [editor] = useLexicalComposerContext();

  const formatCheckList = useCallback(() => {
    if (blockType !== "check") {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
        }
      });
      setBlockType("check")
    }
    else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  }, [blockType, editor]);

  return (
    <CheckButton
    title={supportedBlockType}
    ariaLabel={supportedBlockType}
    ariaChecked={blockType === "ul"}
    onClick={() => formatCheckList()}>
      <TbListCheck />
    </CheckButton>
  )
}

