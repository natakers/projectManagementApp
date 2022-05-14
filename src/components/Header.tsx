import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store/store';
import { reset, logout } from '../store/auth/authSlice';
import Logo from './logo';

type Props = {};

const Header = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useSelector((state: any) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className="bg-slate-800 w-full flex justify-between items-center px-6 py-6 border-b border-b-slate-600 text-gray-300">
      <div className="logo">
        <Link to="/main">
          <Logo />
        </Link>
      </div>
      <div className="nav__list flex justify-between gap-x-6">
        <>
          <button
            onClick={onLogout}
            className="nav__item border-2 border-sky-400 rounded p-1 bg-gradient-to-r from-sky-500 to-indigo-500 "
          >
            Logout
          </button>
          <div className="nav__user w-full flex flex-row justify-center items-center gap-2">
            <img
              src="../assets/images/sample-avatar.jpg"
              alt="user avatar"
              className="w-full h-6"
            />
            <span>{user.login}</span>
          </div>
        </>
      </div>
    </header>
  );
};

export default Header;
