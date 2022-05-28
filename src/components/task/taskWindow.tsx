import BoardArrowBack from '../../assets/icons/arrowBack';
import ArrowBack from '../../assets/icons/board-arrow-back.icon';
import { AppState, useAppSelector } from '../../store/store';

const TaskWindow = ({ taskClick, isOpenTask }: TaskWindowProps) => {
  const { currentTask } = useAppSelector(
    (state: AppState) => state.tasks
  );

  return (
    <div
      className={`flex flex-col p-3 taskWindow absolute top-0 h-full bg-slate-500 z-50 ${
        isOpenTask ? 'activeTaskWidow' : ''
      }`}
    >
      <div className="flex items-center ">
        <h3 className="pr-3">Title</h3>
        <h3>{currentTask.title}</h3>
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
