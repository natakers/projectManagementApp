import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { AppState, useAppSelector } from '../../store/store';
import Board, { IBoard } from './board';
import ModalWindow from './modalWindow';

const BoardContainer: React.FC = () => {
  const { boards, currentId, error, message } = useAppSelector(
    (state: AppState) => state.boards
  );
  useEffect(() => {
    if (error) toast.error(message);
  });

  return (
    <div className="flex flex-row justify-around w-full flex-wrap">
      <>
        {console.log('boards', boards)}
        {!error ? (
          boards.map((board: IBoard) => (
            <Board
              id={board.id}
              key={board.id}
              title={board.title}
              description={board.description}
            />
          ))
        ) : (
          <>
            <div className=" text-red-300 ">
              Oops! Something does wrong!
            </div>
          </>
        )}

        <ModalWindow boardId={currentId} />
      </>
    </div>
  );
};

export default BoardContainer;
