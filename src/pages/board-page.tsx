import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import BoardIcon from '../assets/icons/board.icon';
import { addColumn, getColumns } from '../store/columns/colSlice';
import {
  AppState,
  useAppDispatch,
  useAppSelector,
} from '../store/store';

const BoardPage = () => {
  const [cookie] = useCookies(['user']);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const handleAddColumn = () => {
    dispatch(
      addColumn({
        title: `Lineage ${Math.random()}`,
        order: columns.length,
        boardId: currentId,
      })
    );
  };

  return (
    <main className=" bg-slate-800 h-full text-gray-300 items-start px-5 flex flex-col gap-5">
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
            </article>
          ))}
        <button onClick={handleAddColumn} className="text-gray-400">
          + Add Column
        </button>
      </section>
    </main>
  );
};

export default BoardPage;
