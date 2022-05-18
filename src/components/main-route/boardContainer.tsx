import { useAppSelector } from "../../store/store";
import Board from "./board";
import ModalWindow from "./modalWindow";

const BoardContainer: React.FC = () => {
  const boards = useAppSelector(state => state.boards.boards);
  const id = useAppSelector(state => state.boards.currentId);
  return (
    <div className="flex flex-row justify-around w-full flex-wrap">
      {(boards.map((board) => (
        <Board id={board.id} key={board.id} title={board.title} description={board.description}  />
      ) 
      ))}
      <ModalWindow boardId={id} />
    </div>
  )
}

export default BoardContainer;

