import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import BoardContainer from '../components/main-route/boardContainer';
import Spinner from '../components/Spinner';
import { getBoards } from '../store/boards/boardsSlice';
import {
  AppState,
  useAppDispatch,
  useAppSelector,
} from '../store/store';

const MainPage = () => {
  const { loading } = useAppSelector(
    (state: AppState) => state.boards
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const { user } = useSelector((state: AppState) => state.auth);
  const [cookie] = useCookies(['user']);

  useEffect(() => {
    // console.log('cookie.user', cookie.user);
    // console.log('document.cookie', document.cookie);
    cookie.user === undefined && navigate('/');
    if (cookie.user) {
      dispatch(getBoards());
    }
  }, [cookie.user, navigate, dispatch]);

  useEffect(() => {});

  return (
    <main className="bg-slate-800 min-h-screen items-center text-gray-300 justify-start flex flex-col gap-5 relative">
      <h1 className="text-3xl  ">Boards</h1>
      {loading ? <Spinner /> : <BoardContainer />}
    </main>
  );
};

export default MainPage;
