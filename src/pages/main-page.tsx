import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, reset } from '../store/auth/authSlice';
import { useAppDispatch } from '../store/store';

const MainPage = () => {
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const dispatch = useAppDispatch(); 
  useEffect(() => {
    dispatch(getBoards())
  }, [dispatch]);

  return (
    <main className="bg-slate-800 min-h-screen items-center text-gray-300 justify-center flex flex-col gap-5">
      <h1 className="text-3xl  ">Main Page In Da House!</h1>
      <BoardContainer />
      <Link
        to="/board"
        className="border-2 border-sky-400 rounded p-1 bg-gradient-to-r from-sky-500 to-indigo-500 "
      >
        Jump on board and catch the wave!
      </Link>
    </main>
  );
};

export default MainPage;

// const MainRoute = () => {
//   const dispatch = useAppDispatch(); 
//   useEffect(() => {
//     dispatch(getBoards())
//   }, [dispatch]);
//   return (
//   <>
//   <BoardContainer />
//   </>
//   )
// }

// export default MainRoute;
