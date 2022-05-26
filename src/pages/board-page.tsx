import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import BoardIcon from '../assets/icons/board.icon';
import Column from '../components/column';
import { addColumn } from '../store/columns/colSlice';
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

  const { boards, currentId } = useAppSelector(
    (state: AppState) => state.boards
  );
  const { colTasks } = useAppSelector(
    (state: AppState) => state.tasks
  );
  const { columns } = useAppSelector(
    (state: AppState) => state.columns
  );

  const boardId = localStorage.getItem('boardId')
  const board = boards.find((el) => el.id === currentId);

  useEffect(() => {
    cookie.user === undefined && navigate('/');
    if (cookie.user && boardId) {
      dispatch(getAllAboutBoard(boardId));
    }
  }, [cookie.user, navigate, dispatch, boardId]);

  const handleAddColumn = () => {
    dispatch(
      addColumn({
        title: `Lineage ${Math.floor(Math.random() * (10 - 1)) + 1}`,
        order: columns.length,
        boardId: currentId,
      })
    );
  };
  
  return (
    <main className=" bg-slate-800 h-full text-gray-300 items-start px-5 flex flex-col gap-5">
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
        </section><section className="flex gap-5 w-full h-full flex-wrap items-start">
            {colTasks.columns.length > 0 &&
              colTasks.columns.map((col) => (
                <Column key={col.id} id={col.id} order={col.order} title={col.title} tasks={col.tasks} />
              ))}
            <button onClick={handleAddColumn} className="text-gray-400">
              + Add Column
            </button>
          </section></>
      }
    </main>
  );
};

export default BoardPage;
