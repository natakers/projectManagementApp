import { useEffect } from 'react';
import BoardContainer from '../components/main-route/boardContainer';
import { getBoards } from '../store/boards/boardsSlice';
import { useAppDispatch } from '../store/store';

const MainPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getBoards())
  }, [dispatch]);

  return (
    <main className="bg-slate-800 min-h-screen items-center text-gray-300 justify-start flex flex-col gap-5 relative">
      <h1 className="text-3xl  ">Boards</h1>
      <BoardContainer />
    </main>
  );
};

export default MainPage;
