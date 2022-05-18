import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout, reset } from '../store/auth/authSlice';
import { Rootstate, useAppDispatch } from '../store/store';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: Rootstate) => state.auth);
  const [cookie, setCookie] = useCookies(['user']);

  useEffect(() => {
    console.log('cookie.user', cookie.user);
    cookie.user === undefined && navigate('/');
  }, [cookie.user, navigate]);

  return (
    <main className="bg-slate-800 min-h-screen items-center text-gray-300 justify-center flex flex-col gap-5">
      <h1 className="text-3xl  ">Main Page In Da House!</h1>
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
