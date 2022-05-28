import { useState } from 'react';
import Input from '../components/input';
import {
  TaskCreationProps,
  TokenProps,
} from '../components/interfaces';
import BoardButton, {
  themes,
} from '../components/main-route/boardButton';
import { createTask } from '../store/task/taskSlice';
import { useAppDispatch } from '../store/store';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';

const TaskCreation = ({
  toggleWindow,
  colId,
  order,
}: TaskCreationProps) => {
  const [cookie] = useCookies(['user']);
  const decodedUser: TokenProps = jwt_decode(cookie.user);
  const userId = decodedUser.userId;
  const boardId = localStorage.getItem('boardId');

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

  const taskData = {
    task: { title, description, userId },
    colId,
    boardId,
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (boardId) {
      dispatch(createTask(taskData));
    }
    toggleWindow();
  };

  return (
    <section className="flex w-52 flex-col absolute rounded z-20 bg-sky-900 border border-sky-500 h-20 p-2 top-0 items-center">
      <form
        onSubmit={onSubmit}
        className="form w-full flex flex-col justify-start items-start gap-6"
      >
        <label htmlFor="title w-full">
          <input
            className="w-full bg-transparent"
            value={title}
            name="title"
            onChange={onChange}
            placeholder="Type task title here..."
            type="text"
            required
          />
        </label>
        {/* <Input
          value={title}
          name="title"
          type="text"
          placeholder="Name of task"
          id="title"
          onChange={onChange}
        />
        <Input
          value={description}
          name="description"
          type="text"
          placeholder="Description of task"
          id="description"
          onChange={onChange}
        />
        <div className="flex w-full justify-around ">
          <BoardButton
            themes={themes.dark}
            type="submit"
            text="Create"
          />
          <BoardButton
            themes={themes.dark}
            text="Back"
            onClick={toggleWindow}
          />
        </div> */}
      </form>
    </section>
  );
};

export default TaskCreation;
