import { closeWindow, deleteBoard } from "../../store/boards/boardsSlice";
import { useAppDispatch } from "../../store/store";
import BoardButton, { themes } from "./boardButton";

const ModalWindow = (props: IModal) => {
  const dispatch = useAppDispatch();
  const close = () => {
    dispatch(deleteBoard(props.boardId))
    dispatch(closeWindow(props.boardId))
  }
  
  return (
    <div className="boardsModal max-w-md max-h-20 hidden absolute rounded z-30 bg-sky-900 inset-x-auto inset-y-80 m-4 p-4 items-center  ">
      <div className="mr-4 ">Do you really want to delete this board?</div>
      <div className="flex">
        <BoardButton themes={themes.light} text="Yes" onClick={close} />
        <BoardButton themes={themes.light} text="No" onClick={() => dispatch(closeWindow(props.boardId))} />
      </div>
    </div>
  )
}

export default ModalWindow;

interface IModal {
  boardId: string, 
  onClick?: React.MouseEventHandler<HTMLButtonElement> |  undefined
}