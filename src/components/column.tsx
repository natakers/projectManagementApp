import { useState } from 'react';
import { ColumnTaskProps } from '../store/task/taskSlice'
import Task from './task/task';
import BoardButton, { themes } from './main-route/boardButton';
import DotsIcon from '../assets/icons/dotsIcon';
import TaskCreation from './creationTask';
export interface ColumnProps {
  colId: string,
  boardId: string,
}

const Column = ({title, id, order, tasks}: ColumnTaskProps) => {
  const [isOpenTaskWin, setIsOpenTaskWin] = useState(false);
  const [visibleAddTask, setVisibleAddTask] = useState(false);
  const toggeTaskWindow = () => {
    setIsOpenTaskWin(!isOpenTaskWin)
  };
  const toggleAddTask = () => {
    setVisibleAddTask(!visibleAddTask)
  };

  return (
  <article
    key={id}
    className="overflow-y-auto h-full bg-slate-700"
    >
      <div className='flex justify-center align-baseline'>
        <h4 className='m-3'>{title}</h4>
        <div className=" relative flex m-3 items-center cursor-pointer hover:bg-slate-500 " onClick={toggleAddTask}>
          { visibleAddTask &&<BoardButton onClick={toggeTaskWindow} text='+ Add task' themes={themes.absolute} />}
        <DotsIcon />
        </div>
      </div>
    <div className='flex flex-col'>
    {tasks.length > 0 &&
            tasks.map((task) => (
             <Task key={task.id} order={task.order} title={task.title} description={task.description} done={false}  />
          ))}
    </div>
    <div>
    </div>
    { isOpenTaskWin && <TaskCreation  order={order} colId={id} toggleWindow={toggeTaskWindow} />}
    </article>
  )
}

export default Column;