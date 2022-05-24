import { NavLink } from "react-router-dom";
import BoardButton, { themes } from "./boardButton";
import { openboard, chooseBoardId } from "../../store/boards/boardsSlice";
import { useAppDispatch } from "../../store/store";
import { BoardProps } from "../interfaces";

const Board: React.FC<BoardProps> = ({ id, title, description, toggleWindow} ) => {
  const dispatch = useAppDispatch();
  const onOpen = () => {
    dispatch(chooseBoardId(id));
    if(toggleWindow) {
      toggleWindow()
    }
  }
  
  return (
    <div className="flex flex-row m-2 items-center border-slate-300 border-2 rounded p-2 cursor-pointer hover:bg-sky-900">
      <NavLink to='/board' onClick={() => dispatch(openboard(id))} className='flex flex-col m-2  '>
        <div className="text-xl font-bold">{title}</div>
        <div>{description}</div>
      </NavLink>
      <BoardButton themes={themes.light} text="Delete board" onClick={onOpen} />
    </div>
  )
}

export default Board;


