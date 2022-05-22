import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppState, useAppDispatch, useAppSelector } from '../store/store';

import { reset, logout } from '../store/auth/authSlice';
import { useCookies } from 'react-cookie';
import Logo from './logo';
import BoardButton, { themes } from './main-route/boardButton';
import jwt_decode from 'jwt-decode'
import BoardCreation from '../pages/createBoard';
import { openCreationWindow } from '../store/boards/boardsSlice';

type Props = {};

const Header = (props: Props) => {
  const { isCteationWindowOpen } = useAppSelector((state: AppState) => state.boards);
  const [sticky, setSticky] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [cookie, setCookie, removeCookie] = useCookies(['user']);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    removeCookie('user');
    navigate('/');
  };

  const open = () => {
    const modal = document.querySelector('.createModal');
    modal?.classList.remove('hidden');
    modal?.classList.add('flex');
  };

  useEffect(() => {
    const handleStickyHeader = () => {
      if (window.scrollY >= 85) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener('scroll', handleStickyHeader);
    return () => {
      window.removeEventListener('scroll', handleStickyHeader);
    };
  }, []);

  return (
    <header
      className={`${
        sticky ? 'header--sticky' : 'h-24'
      } bg-slate-800 w-full flex justify-between items-center px-6 py-6 border-b border-b-slate-600 text-gray-300`}
    >
      <div className="logo">
        <Link to="/main">
          <Logo />
        </Link>
      </div>
      <div className="nav__list flex justify-between items-center">
        <>
          <BoardButton themes={themes.light} text='Create new board' onClick={() => dispatch(openCreationWindow(true))} />
          <Link to="/edit-profile">
            <BoardButton themes={themes.light} text="Edit profile" />
          </Link>
          <BoardButton
            themes={themes.light}
            text="Sign&nbsp;out"
            onClick={onLogout}
          />
          <div className="switch">
            <input
              id="language-toggle"
              className="check-toggle check-toggle-round-flat"
              type="checkbox"
            />
            <label htmlFor="language-toggle"></label>
            <span className="on">RU</span>
            <span className="off">EN</span>
          </div>
          <div className="nav__user w-full flex flex-row justify-center items-center gap-2">
            <img
              src="../assets/images/sample-avatar.jpg"
              alt="user avatar"
              className="w-full h-6"
            />
            {/* <span>{user.login}</span> */}
            {/* <span>{decoded.login}</span> */}
          </div>
        </>
      </div>
      { isCteationWindowOpen && <BoardCreation />}
    </header>
  );
};

export default Header;
