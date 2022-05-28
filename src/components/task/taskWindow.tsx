
import { useState } from "react";
import ArrowBack from "../../assets/icons/arrowBack";
import DotsIcon from "../../assets/icons/dotsIcon";
import { AppState, useAppDispatch, useAppSelector } from "../../store/store";
import { updateTask } from "../../store/task/taskSlice";
import BoardButton, { themes } from "../main-route/boardButton";

const TaskWindow = ({taskClick, isOpenTask }: TaskWindowProps) => {
  const dispatch = useAppDispatch();
  const { currentTask, colId, colTasks }  = useAppSelector((state: AppState) => state.tasks);
  const [taskTitleValue, setTaskTitleValue ] = useState(currentTask.title)
  const [visibleEditTask, setVisibleEditTask] = useState(false);
  const toggeEditTask = () => {
    setVisibleEditTask(!visibleEditTask)
  };
  // if (isOpenTask) {
  // setTaskTitleValue(currentTask.title)
  // }
  console.log(currentTask);
  
  const boardId = localStorage.getItem('boardId');
  const handlerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // setTaskTitleValue(currentTask.title)
    const taskData = {
      body: {
        title: currentTask.title,
        order: currentTask.order,
        description: currentTask.description,
        userId: currentTask.userId,
        boardId: boardId,
        columnId: colId
      },
      id: currentTask.id
    };
    taskData.body.title = event.target.value
    setTaskTitleValue(event.target.value);
    dispatch(updateTask(taskData));
    console.log(currentTask);   
     console.log(colTasks.columns);
    
    // (document.querySelector('textarea') as HTMLElement).style.opacity ='0'
  }
  const onClickArea = () => {
    (document.querySelector('textarea') as HTMLElement).style.opacity ='1'
  }
  
   
  return (
    <div className={`flex flex-col w-2/5 p-3 taskWindow absolute top-0 h-full bg-slate-500 z-50 ${isOpenTask? 'activeTaskWidow' : ''}`}  >
      <div className=" absolute top-2 right-5 bg-slate-500 flex items-center cursor-pointer hover:bg-slate-700 " onClick={toggeEditTask}>
          { visibleEditTask &&
          <div className='flex flex-col absolute top-full right-0 bg-sky-800'>
              <BoardButton text='Edit title' themes={themes.grey} />
              <BoardButton text='Edit description' themes={themes.grey} />
              <BoardButton text='Delete task' themes={themes.grey} />
          </div>}
        <DotsIcon />
        </div>
      <div className="flex items-center ">
        {/* <h3 className="pr-3">Title</h3> */}
        <div className="relative"> {currentTask.title}
        <textarea onBlur={() => (document.querySelector('textarea') as HTMLElement).style.opacity ='0'} className=" z-20 absolute opacity-0 top-0 left-0 bg-slate-500 font-bold  border-none focus: outline-slate-400 " name="title" id="" onClick={onClickArea} onInput={handlerChange} value={currentTask.title} ></textarea>
        </div>
        
        {/* <h3>{currentTask.title}</h3> */}
      </div>
      <div className="flex items-center">
        <h3 className="pr-3">Description</h3>
        <p>{currentTask.description}</p>
      </div>
      <div className="flex items-center">
        <h3 className="pr-3">Done</h3>
        <input type="checkbox" name="done" id="done" />
      </div>
      <button className="p-3" onClick={taskClick}>
        <ArrowBack />
      </button>
    </div>
  );
};

export default TaskWindow;

interface TaskWindowProps {
  taskClick: () => void;
  isOpenTask: boolean;
}
