import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AppState, useAppSelector } from '../../store/store';
import { BoardProps } from '../interfaces';
import Board from './board';
import ModalWindow from './modalWindow';

const BoardContainer: React.FC = () => {
  const { boards, currentId, error, message } = useAppSelector(
    (state: AppState) => state.boards
  );
  const [isOpen, setIsOpen] = useState(false);
  const toggleWindow = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (error) toast.error(message);
  });

  return (
    <div className="flex flex-row justify-around w-full flex-wrap">
      {!error ? (
        boards.map((board: BoardProps) => (
          <Board
            toggleWindow={toggleWindow}
            id={board.id}
            key={board.id}
            title={board.title}
            description={board.description}
          />
        ))
      ) : (
        <div className="text-red-300">
          Oops! Something does wrong!
        </div>
      )}
      {isOpen && (
        <ModalWindow
          boardId={currentId}
          toggleWindow={toggleWindow}
        />
      )}
    </div>
  );
};

export default BoardContainer;
