import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/store';
import { reset, logout } from '../store/auth/authSlice';
import Logo from './logo';
import BoardButton, { themes } from './main-route/boardButton';
import jwt_decode from 'jwt-decode'
import CreateBoard from '../pages/createBoard';

type Props = {};

const Header = (props: Props) => {
  const [sticky, setSticky] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let decoded: {
    iat?: number,
    login?: string,
    userId?: string,
  }

  let user = localStorage.getItem('user')
  user ? decoded = jwt_decode(user) : decoded = {}
  
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const open = () => {
    const modal = document.querySelector('.createModal')
      modal?.classList.remove('hidden')
      modal?.classList.add('flex')
  }
  
  useEffect(() => {
    const handleStickyHeader = () => {
      if (window.scrollY >= 85) {
        setSticky(true)
      } else {
        setSticky(false)
      }
    }
    window.addEventListener('scroll', handleStickyHeader)
    return () => {
      window.removeEventListener("scroll", handleStickyHeader);
    };
  }, [])
  

  return (
    <header className={`${sticky ? 'header--sticky' : ''} bg-slate-800 w-full flex justify-between items-center px-6 py-6 border-b border-b-slate-600 text-gray-300`}>
      <div className="logo">
        <Link to="/main">
          <Logo />
        </Link>
      </div>
      <div className="nav__list flex justify-between items-center">
        <>
          <BoardButton themes={themes.light} text='Create new board' onClick={open} />
          <Link to="/edit-profile">
            <BoardButton themes={themes.light} text='Edit profile' />
          </Link>
          <BoardButton themes={themes.light} text='Sign&nbsp;out' onClick={onLogout} />
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
      <CreateBoard />
    </header>
  );
};

export default Header;
