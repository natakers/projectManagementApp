import { useState } from "react";
import DotsIcon from "../../assets/icons/dotsIcon";
import TrashIcon from "../../assets/icons/trash.icon";
import { AppState, useAppDispatch, useAppSelector } from "../../store/store";
import { chooseTaskId } from "../../store/task/taskSlice";
import { TaskProps } from "../interfaces"
import  { themes } from "../main-route/boardButton";

const Task = ({task, taskClick }: TaskProps) => {
  const dispatch = useAppDispatch();
  const [visibleAddTask, setVisibleAddTask] = useState(false);
  const tasks  = useAppSelector((state: AppState) => state.tasks);

  const toggleDelTask = (event: { stopPropagation: () => void; }) => {
    event.stopPropagation();
    setVisibleAddTask(!visibleAddTask)
  };
  const handleTaskDelete = () => {
  }

  const openTask = () => {
    if (taskClick) {
      taskClick();
      dispatch(chooseTaskId(task));
    }
  }
  return (
    <div className="bg-sky-500 m-2 p-2 hover:bg-slate-600" onClick={openTask}>
      <div className="flex justify-between ">
        <h2>Title: {task.title}</h2>
        <div className=" relative flex items-center cursor-pointer hover:bg-slate-500 " onClick={toggleDelTask}>
          { visibleAddTask && task.id !== undefined &&
          <div className='flex flex-col absolute top-full right-0 bg-sky-800'>
              <button className={themes.grey} onClick={handleTaskDelete}>
                <TrashIcon />
              </button>
          </div>}
        <DotsIcon />
        </div>
      </div>
      <div>Description: {task.description}</div>
      
    </div>
  )
}

export default Task
