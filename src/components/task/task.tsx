import { useState } from "react";
import DotsIcon from "../../assets/icons/dotsIcon";
import TrashIcon from "../../assets/icons/trash.icon";
import { AppState, useAppDispatch, useAppSelector } from "../../store/store";
import { chooseTaskId, deleteTask } from "../../store/task/taskSlice";
import { TaskDelProps, TaskProps } from "../interfaces"
import  { themes } from "../main-route/boardButton";

const Task = ({task, taskClick, columnId }: TaskProps) => {
  const dispatch = useAppDispatch();
  const [visibleAddTask, setVisibleAddTask] = useState(false);
  const {colTasks}  = useAppSelector((state: AppState) => state.tasks);

  const toggleDelTask = (event: { stopPropagation: () => void; }) => {
    event.stopPropagation();
    setVisibleAddTask(!visibleAddTask)
  };
  const boardId = localStorage.getItem('boardId')
  let treeId: TaskDelProps;
  if (boardId) {
    treeId = {
      boardId: boardId,
      colId: columnId,
      taskId: task.id
    }
  }

  const handleTaskDelete = () => {
    dispatch(deleteTask(treeId));
    console.log(colTasks.columns);
    
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
