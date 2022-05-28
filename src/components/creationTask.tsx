import { useEffect, useRef, useState } from 'react';
import {
  TaskCreationProps,
  TokenProps,
} from '../components/interfaces';
import { createTask } from '../store/task/taskSlice';
import {
  AppState,
  useAppDispatch,
  useAppSelector,
} from '../store/store';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';
import CloseIcon from '../assets/icons/close.icon';

const TaskCreation = ({
  toggleWindow,
  colId,
  order,
}: TaskCreationProps) => {
  const [cookie] = useCookies(['user']);
  const decodedUser: TokenProps = jwt_decode(cookie.user);
  const userId = decodedUser.userId;
  const { currentId: boardId } = useAppSelector(
    (state: AppState) => state.boards
  );

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const titleInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (titleInput && titleInput.current) {
      titleInput.current.focus();
    }
  }, []);

  const { title, description } = formData;
  const dispatch = useAppDispatch();
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const taskData = {
    task: { title, description, userId },
    colId,
    boardId,
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (boardId) {
      console.log('taskData', taskData);
      dispatch(createTask(taskData));
    }
    toggleWindow();
  };

  return (

    <section className="flex w-52 flex-col absolute rounded z-20 bg-sky-900 border border-sky-500 h-20 p-2 top-0 items-center">

    {/* <section className={`flex createModal max-w-sm flex-col absolute rounded z-20 bg-slate-50 p-4 inset-x-0 m-auto items-center`}>
      <div className="logo__container w-full flex flex-col justify-center items-center gap-3">
        <p className="title text-center font-bold text-3xl text-gray-900 mb-6">
          Create new task
        </p>
      </div> */}
      <form
        onSubmit={onSubmit}
        className="form w-full flex flex-col justify-start items-start gap-1 relative"
      >
        <label htmlFor="title">
          <input
            ref={titleInput}
            className="w-full bg-transparent focus:outline-none"
            value={title}
            id="title"
            name="title"
            onChange={onChange}
            placeholder="Type task title here..."
            type="text"
            required
          />
        </label>
        <label htmlFor="description">
          <input
            className="w-full bg-transparent focus:outline-none"
            value={description}
            name="description"
            id="description"
            onChange={onChange}
            placeholder="Some description..."
            type="text"
            required
          />
        </label>
        <input type="submit" className="hidden" />
      </form>
      <button
        onClick={toggleWindow}
        className="absolute top-1 right-1"
      >
        <CloseIcon />
      </button>
    </section>
  );
};

export default TaskCreation;
