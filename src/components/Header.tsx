// import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store/store';
import { reset, logout } from '../store/auth/authSlice';
import Logo from './logo';
import BoardButton from './main-route/boardButton';
import jwt_decode from "jwt-decode";

type Props = {};

const Header = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let decoded: {
    iat?: number,
    login?: string,
    userId?: string,
  }

  let user = localStorage.getItem('user')
  user ? decoded = jwt_decode(user) : decoded = {}
  console.log(decoded.userId);


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
      <div className="nav__list flex justify-between items-center">
        <>
        <Link to="/createBoard">
        <BoardButton text='Create new board' />
        </Link>
        <Link to="/editProfile">
          <BoardButton text='Edit profile' />
        </Link>
        <BoardButton text='Logout' onClick={onLogout} />
        <div className="switch">
	        <input id="language-toggle" className="check-toggle check-toggle-round-flat" type="checkbox" />
	        <label htmlFor="language-toggle"></label>
	        <span className="on">RU</span>
	        <span className="off">EN</span>
  	    </div>
          <div className="nav__user w-full flex flex-row justify-center items-center gap-2">
            <span>{decoded.login}</span>
          </div>
        </>
      </div>
    </header>
  );
};

export default Header;

