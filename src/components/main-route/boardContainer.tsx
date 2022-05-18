import { useEffect } from "react";
import { toast } from "react-toastify";
import { getBoards } from "../../store/boards/boardsSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import Board from "./board";
import ModalWindow from "./modalWindow";

const BoardContainer: React.FC = () => {

  const { boards, currentId, error, message } = useAppSelector(state => state.boards);
  // const id = useAppSelector(state => state.boards.currentId);
  // const id = useAppSelector(state => state.boards.currentId);
  useEffect(() => {
    if (error) toast.error(message)
  })
  return (
    <div className="flex flex-row justify-around w-full flex-wrap">
      { (!error)? (boards.map((board) => (
        <Board id={board.id} key={board.id} title={board.title} description={board.description}  />
      ) 
      )) : (<><div className=" text-red-300 ">Oops! Something does wrong!</div></>)}
      
      
      <ModalWindow boardId={currentId} />
    </div>
  )
}

export default BoardContainer;

