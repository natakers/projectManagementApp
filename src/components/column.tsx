import { useState } from 'react';
import { ColumnTaskProps } from '../store/task/taskSlice';
import Task from './task/task';
import { themes } from './main-route/boardButton';
import DotsIcon from '../assets/icons/dotsIcon';
import TaskCreation from './creationTask';
import TrashIcon from '../assets/icons/trash.icon';
import { deleteColumn } from '../store/columns/colSlice';
import { useAppDispatch } from '../store/store';
import { FormattedMessage } from 'react-intl';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DragStart,
  DropResult,
} from 'react-beautiful-dnd';
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
  const boardId = localStorage.getItem('boardId');
  const handleColumnDelete = (id: string) => {
    if (boardId) {
      dispatch(deleteColumn({ boardId: boardId, id: id }));
    }
  };

  return (
    <Draggable key={id} draggableId={id} index={order}>
      {(provided, snapshot) => {
        return (
          <article
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
            }}
            key={id}
            className=" h-[90%] bg-slate-800 border border-slate-800 hover:border hover:border-slate-600 rounded-md relative w-56 overflow-x-hidden overflow-y-auto"
          >
            <div className="flex justify-between align-baseline">
              <h4 className="m-3">{title}</h4>
              <div
                className=" relative flex m-3 items-center cursor-pointer hover:bg-slate-500 "
                onClick={toggleAddTask}
              >
                {visibleAddTask && (
                  <div className="flex flex-col absolute top-full right-0 bg-sky-800">
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
            <div className="flex flex-col relative overflow-x-hidden overflow-y-auto ">
              {tasks &&
                tasks.map((task) => (
                  <Task
                    taskClick={taskClick}
                    key={task.id}
                    task={task}
                    columnId={id}
                  />
                ))}
              <aside className="relative flex flex-col items-center">
                <button
                  onClick={toggeTaskWindow}
                  className="text-gray-400 relative"
                >
                  <FormattedMessage id="addTask" />
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
      }}
    </Draggable>
  );
};

export default Column;
