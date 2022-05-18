import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../components/input";
import BoardButton, { themes } from "../components/main-route/boardButton";
import { createBoard, resetNewBoard } from "../store/boards/boardsSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

const CreateBoard = () => {
  const {  error, message, isCreated } = useAppSelector(state => state.boards);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const { title, description } = formData;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const href = window.location.href;
  console.log(href);
  

  useEffect(() => {
    if (error) {
      toast.error(message);
    }
    if (isCreated) {
      navigate('/main');
    }
    dispatch(resetNewBoard());
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
    
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const boardData = {
      title,
      description,
    };
    dispatch(createBoard(boardData));
  };

  return (
    <section className="min-h-screen signin-page w-full px-6 py-6 flex flex-col justify-center items-center gap-16">
       <div className="logo__container w-full flex flex-col justify-center items-center gap-3">
        <p className="title text-center font-bold text-3xl text-gray-900">
          Create new board
        </p>
      </div>
      <form
        onSubmit={onSubmit}
        className="form w-1/4 flex flex-col justify-center items-center gap-6"
      >
        <Input value={title} name='title' type='text' placeholder='Name of board' id='title' onChange={onChange} />
        <Input value={description} name='description' type='text' placeholder='Description of board' id='description' onChange={onChange} />
        <div className="flex w-full justify-around ">
      <BoardButton themes={themes.dark} type="submit" text="Create" />
      <Link
          to="/main"
          // className="border-2 border-sky-400 rounded p-1 bg-gradient-to-r from-sky-500 to-indigo-500 "
        >
          <BoardButton themes={themes.dark} text='Back' onClick={() => navigate(`${href}`)} />
        </Link>
      </div>
      </form>
    </section>
  );
};

export default CreateBoard;