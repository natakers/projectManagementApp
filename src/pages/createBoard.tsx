import { useState } from 'react';
import BoardArrowBack from '../assets/icons/board-arrow-back.icon';
import { BoardCreationProps } from '../components/interfaces';
import BoardButton, {
  themes,
} from '../components/main-route/boardButton';
import { createBoard, resetBoard } from '../store/boards/boardsSlice';
import { useAppDispatch } from '../store/store';
import { FormattedMessage } from 'react-intl';

const BoardCreation = ({
  toggleWindow,
  isOpen,
}: BoardCreationProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const { title, description } = formData;
  const dispatch = useAppDispatch();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const boardData = {
    title,
    description,
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createBoard(boardData));
    dispatch(resetBoard(boardData));
    toggleWindow();
  };

  return (
    <section
      className={`${
        isOpen ? 'visible left-0' : 'invisible -left-full'
      } transition-all duration-500 delay-100 nav__list flex max-w-sm absolute rounded z-50 bg-gray-900 border-r border-b border-slate-600  top-0 left-0 `}
    >
      <div
        onClick={toggleWindow}
        className=" hover:bg-gray-600 flex items-center justify-center w-20"
      >
        <button>
          <BoardArrowBack />
        </button>
      </div>
      <div className="flex flex-col p-4 items-center">
        <div className="logo__container w-full flex flex-col justify-center items-center gap-3">
          <p className="title text-center font-bold text-2xl text-gray-300 mb-6">
            <FormattedMessage id="titleBoardCreation" />
          </p>
        </div>
        <form
          onSubmit={onSubmit}
          className="form w-2/4 flex flex-col justify-center items-center gap-6"
        >
          <label className="text-sm" htmlFor="title">
            <FormattedMessage id="titleNewBoard" />
            <input
              value={title}
              name="title"
              onChange={onChange}
              className="bg-gray-600 border-b border-b-slate-300 h-8"
              type="text"
              required
            />
          </label>
          <label className="text-sm" htmlFor="description">
            <FormattedMessage id="decsriptionNewBoard" />
            <input
              value={description}
              name="description"
              onChange={onChange}
              className="bg-gray-600 border-b border-b-slate-300 h-8"
              type="text"
              required
            />
          </label>
          <div className="flex w-full justify-around ">
            <BoardButton
              themes={themes.light}
              type="submit"
              text="create"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default BoardCreation;
