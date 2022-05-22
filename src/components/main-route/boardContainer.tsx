import { useEffect } from "react";
import { toast } from "react-toastify";
import { AppState, useAppSelector } from "../../store/store";
import { BoardProps } from "../interfaces";
import Board from "./board";
import ModalWindow from "./modalWindow";

const BoardContainer: React.FC = () => {
  const { boards, currentId, error, message, isOpen } = useAppSelector((state: AppState) => state.boards);
  
  useEffect(() => {
    if (error) toast.error(message);
  });

  return (
    <div className="flex flex-row justify-around w-full flex-wrap">
      { 
        (!error) 
          ? (boards.map((board: BoardProps) => (
            <Board id={board.id} key={board.id} title={board.title} description={board.description} />
          ))) 
          : (<div className="text-red-300">Oops! Something does wrong!</div>)
      }
      {isOpen && <ModalWindow boardId={currentId} />}
    </div>
  );
};

export default BoardContainer;
