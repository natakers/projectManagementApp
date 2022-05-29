import { useState } from 'react';
import { ColumnTaskProps } from '../store/task/taskSlice';
import Task from './task/task';
import BoardButton, { themes } from './main-route/boardButton';
import DotsIcon from '../assets/icons/dotsIcon';
import TaskCreation from './creationTask';
import TrashIcon from '../assets/icons/trash.icon';
import { deleteColumn } from '../store/columns/colSlice';
import {
  AppState,
  useAppDispatch,
  useAppSelector,
} from '../store/store';
export interface ColumnProps {
  colId: string;
  boardId: string;
}

const Column = ({
  title,
  id,
  order,
  tasks,
  taskClick,
}: ColumnTaskProps) => {
  const dispatch = useAppDispatch();
  const [isOpenTaskWin, setIsOpenTaskWin] = useState(false);
  const [visibleAddTask, setVisibleAddTask] = useState(false);
  const toggeTaskWindow = () => {
    setIsOpenTaskWin(!isOpenTaskWin);
  };
  const toggleAddTask = () => {
    setVisibleAddTask(!visibleAddTask);
  };
  const { colTasks } = useAppSelector(
    (state: AppState) => state.tasks
  );
  const boardId = localStorage.getItem('boardId');
  const handleColumnDelete = (id: string) => {
    if (boardId) {
      dispatch(deleteColumn({ boardId: boardId, id: id }));
      console.log(colTasks.columns);
    }
  };

  // const col = colTasks.columns.find((el) => el.id === d);

  return (
    <article
      key={id}
      className="overflow-y-auto h-full bg-slate-700 relative overflow-visible w-56"
    >
      <div className="flex justify-center align-baseline">
        <h4 className="m-3">{title}</h4>
        <div
          className=" relative flex m-3 items-center cursor-pointer hover:bg-slate-500 "
          onClick={toggleAddTask}
        >
          {visibleAddTask && (
            <div className="flex flex-col absolute top-full right-0 bg-sky-800">
              <BoardButton
                onClick={toggeTaskWindow}
                text="+ Add task"
                themes={themes.grey}
              />
              <button
                className={themes.grey}
                onClick={() => handleColumnDelete(id)}
              >
                <TrashIcon />
              </button>
            </div>
          )}
          <DotsIcon />
        </div>
      </div>
      <div className="flex flex-col relative ">
        {tasks &&
          tasks.map((task) => (
            <Task taskClick={taskClick} key={task.id} task={task} />
          ))}
        <aside className="relative flex flex-col items-center">
          <button
            onClick={toggeTaskWindow}
            className="text-gray-400 relative"
          >
            + Add Task
          </button>
          {isOpenTaskWin && (
            <TaskCreation
              order={order}
              colId={id}
              toggleWindow={toggeTaskWindow}
            />
          )}
        </aside>
      </div>
    </article>
  );
};

export default Column;
