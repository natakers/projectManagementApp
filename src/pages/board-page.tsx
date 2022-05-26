import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import BoardIcon from '../assets/icons/board.icon';
import TrashIcon from '../assets/icons/trash.icon';
import AddColumnForm from '../components/board-route/add-column-form';
import {
  addColumn,
  deleteColumn,
  getColumns,
} from '../store/columns/colSlice';
import {
  AppState,
  useAppDispatch,
  useAppSelector,
} from '../store/store';

const BoardPage = () => {
  const [cookie] = useCookies(['user']);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isPopupDisplay, setIsPopupDisplay] = useState(false);

  const { boards, currentId } = useAppSelector(
    (state: AppState) => state.boards
  );
  const { columns } = useAppSelector(
    (state: AppState) => state.columns
  );
  const board = boards.find((el) => el.id === currentId);

  useEffect(() => {
    cookie.user === undefined && navigate('/');
    if (cookie.user) {
      dispatch(getColumns(currentId));
    }
  }, [cookie.user, navigate, dispatch, currentId]);

  const handleColumnDelete = (id: string) => {
    dispatch(deleteColumn({ boardId: currentId, id: id }));
  };

  return (
    <main className=" bg-slate-800 h-full text-gray-300 items-start px-5 flex flex-col gap-5">
      <>
        {console.log('columns', columns)}
        <section className="flex gap-3 justify-center items-center">
          <BoardIcon />
          <h1 className="text-3xl">{board?.title}</h1>
        </section>
        <section className="flex gap-5 w-full h-full flex-wrap items-start">
          {columns.length > 0 &&
            columns.map((col) => (
              <article
                key={col.id}
                className="overflow-auto w-[10%] h-full bg-slate-700"
              >
                {col.title}
                <button onClick={() => handleColumnDelete(col.id)}>
                  <TrashIcon />
                </button>
              </article>
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
      </>
    </main>
  );
};

export default BoardPage;
