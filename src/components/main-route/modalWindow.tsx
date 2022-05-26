import { resetBoardId, deleteBoard } from "../../store/boards/boardsSlice";
import { useAppDispatch } from "../../store/store";
import { ModalProps } from "../interfaces";
import BoardButton, { themes } from "./boardButton";

const ModalWindow = (props: ModalProps) => {

  const dispatch = useAppDispatch();
  const onCloseHandler = () => {
    dispatch(deleteBoard(props.boardId))
    dispatch(resetBoardId(props.boardId))
    props.toggleWindow()
  }
  const onCancelHandler = () => {
    // dispatch(resetBoardId(props.boardId))
    props.toggleWindow()
  }
  
  return (
    <div className={`flex boardsModal max-w-md max-h-20 absolute rounded z-30 bg-sky-900 inset-x-auto inset-y-80 m-4 p-4 items-center  `}>
      <div className="mr-4 ">Do you really want to delete this board?</div>
      <div className="flex">
        <BoardButton themes={themes.light} text="Yes" onClick={onCloseHandler} />
        <BoardButton themes={themes.light} text="No" onClick={onCancelHandler} />
      </div>
    </div>
  )
}

export default ModalWindow;

