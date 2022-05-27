import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import BoardIcon from '../assets/icons/board.icon';
import TrashIcon from '../assets/icons/trash.icon';
import AddColumnForm from '../components/board-route/add-column-form';
import {
  addColumn,
  deleteColumn,
  getColumns,
} from '../store/columns/colSlice';
import Column from '../components/column';
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

  const handleColumnDelete = (id: string) => {
    dispatch(deleteColumn({ boardId: currentId, id: id })); 

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
          </section></>
      }
    </main>
  );
};

export default BoardPage;
