import { NavLink } from "react-router-dom";
import BoardButton from "./boardButton";
import { deleteBoard } from "../../store/boards/boardsSlice";
import { useAppDispatch } from "../../store/store";

const Board: React.FC<IBoard> = ({ id, title, description} ) => {
  const dispatch = useAppDispatch();
  const openboard = () => {
  console.log('open' + id);
  }

  return (
    <div className="flex flex-row m-2 items-center border-slate-300 border-2 rounded p-2 cursor-pointer hover:bg-sky-900">
      <NavLink to='/board' onClick={openboard} className='flex flex-col m-2  '>
        <div className="text-xl font-bold">{title}</div>
        <div>{description}</div>
      </NavLink>
      <BoardButton text="Delete board" onClick={() => dispatch(deleteBoard(id))} />
    </div>
  )
}

export default Board;

export interface IBoard {
  id: string,
  title: string,
  description: string,
}