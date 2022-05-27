import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import BoardIcon from '../assets/icons/board.icon';
import AddColumnForm from '../components/board-route/add-column-form';
import Column from '../components/column';
import TaskWindow from '../components/task/taskWindow';
import {
  AppState,
  useAppDispatch,
  useAppSelector,
} from '../store/store';
import { getAllAboutBoard } from '../store/task/taskSlice';

const BoardPage = () => {
  const [cookie] = useCookies(['user']);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isPopupDisplay, setIsPopupDisplay] = useState(false);
  const [isOpenTask, setIsOpenTask] = useState(false);
  

  const { boards } = useAppSelector(
    (state: AppState) => state.boards
  );
  const { colTasks } = useAppSelector(
    (state: AppState) => state.tasks
  );
  const { columns } = useAppSelector(
    (state: AppState) => state.columns
  );
  console.log(columns);
  

  const boardId = localStorage.getItem('boardId')
  const board = boards.find((el) => el.id === boardId);
  console.log(board);

  const handlerClick = () => {
    console.log('taskClick');
    setIsOpenTask(!isOpenTask);
  }
  

  useEffect(() => {
    cookie.user === undefined && navigate('/');
    if (cookie.user && boardId) {
      dispatch(getAllAboutBoard(boardId));
    }
  }, [cookie.user, navigate, dispatch, boardId]);
 
  return (
    <main className=" overflow-hidden bg-slate-800 h-full text-gray-300 items-start px-5 flex flex-col gap-5 relative">
      {!boardId?  <Link
            to="/main"
            className="border-2 border-sky-400 rounded p-1 bg-gradient-to-r from-sky-500 to-indigo-500 "
          >
            Go to Main Page
          </Link>
      :
      <><section className="flex gap-3 justify-center items-center">
          <BoardIcon />
          <h1 className="text-3xl">{board?.title}</h1>
        </section>
        <section className="flex gap-5 w-full h-full flex-wrap items-start">
            {colTasks.columns.length > 0 &&
              colTasks.columns.map((col) => (
                <Column key={col.id} id={col.id} order={col.order} title={col.title} tasks={col.tasks} taskClick={handlerClick} />
              ))}
              <div className="relative">
              <>
                <button
                  onClick={() => setIsPopupDisplay(true)}
                  className="text-gray-400 relative"
                >
                  + Add Column
                </button>
                {isPopupDisplay && (
                  <AddColumnForm
                    setIsPopupDisplay={setIsPopupDisplay}
                  />
                )}
              </>
            </div>
          </section>
          <TaskWindow isOpenTask={isOpenTask} taskClick={handlerClick} />
          </>
      }
    </main>
  );
};

export default BoardPage;
