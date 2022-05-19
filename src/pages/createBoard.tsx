import { useState } from "react"
import Input from "../components/input";
import BoardButton, { themes } from "../components/main-route/boardButton";
import { createBoard, resetBoard } from "../store/boards/boardsSlice";
import { useAppDispatch } from "../store/store";

const CreateBoard = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const { title, description } = formData;
  const dispatch = useAppDispatch();
  const href = window.location.href;
  console.log(href);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
    
  };
  const boardData = {
    title,
    description,
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createBoard(boardData));
    close();
    dispatch(resetBoard(boardData))
    
  };
  const close = () => {
    const modal = document.querySelector('.createModal')
      modal?.classList.add('hidden')
      modal?.classList.remove('flex')
      setFormData({
        title: '',
        description: '',
      })
  }

  return (
    <section className="createModal max-w-sm flex-col hidden absolute rounded z-20 bg-slate-50 p-4 inset-y-80 inset-x-0 m-auto items-center ">
       <div className="logo__container w-full flex flex-col justify-center items-center gap-3">
        <p className="title text-center font-bold text-3xl text-gray-900 mb-6">
          Create new board
        </p>
      </div>
      <form
        onSubmit={onSubmit}
        className="form w-2/4 flex flex-col justify-center items-center gap-6"
      >
        <Input value={title} name='title' type='text' placeholder='Name of board' id='title' onChange={onChange} />
        <Input value={description} name='description' type='text' placeholder='Description of board' id='description' onChange={onChange} />
        <div className="flex w-full justify-around ">
          <BoardButton themes={themes.dark} type="submit" text="Create" />
          <BoardButton themes={themes.dark} text='Back' onClick={close} />
        </div>
      </form>
    </section>
  );
};

export default CreateBoard;