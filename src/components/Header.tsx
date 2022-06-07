import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState, useAppDispatch } from '../store/store';
import { reset } from '../store/auth/authSlice';
import { getUserById, resetUser } from '../store/user/userSlice';
import { useCookies } from 'react-cookie';
import Logo from './logo';
import BoardButton, { themes } from './main-route/boardButton';
import BoardCreation from '../pages/createBoard';
import jwt_decode from 'jwt-decode';
import { TokenProps } from './interfaces';
import userImg from '../assets/images/sample-avatar.jpg';
import { LOCALES } from '../i18n/locales';
import Menu from '../assets/icons/menu';

export type HeaderProps = {
  currentLocale: string;
  handleChange: ({
    target: { value },
  }: {
    target: { value: string };
  }) => void;
};

const Header = ({ currentLocale, handleChange }: HeaderProps) => {
  const [sticky, setSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [cookie, setCookie, removeCookie] = useCookies(['user']);
  const decodedUser: TokenProps = jwt_decode(cookie.user);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { userDetails } = useSelector(
    (state: AppState) => state.user
  );
  const inputEl = useRef(null);
  const onLogout = () => {
    dispatch(reset());
    dispatch(resetUser());
    removeCookie('user');
    navigate('/');
  };

  const toggleWindow = () => {
    setIsOpen(!isOpen);
    setIsNavOpen(false);
  };

  useEffect(() => {
    if (!userDetails.name || !userDetails.login) {
      dispatch(getUserById(decodedUser.userId));
    }
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
  }, [
    userDetails.name,
    userDetails.login,
    dispatch,
    decodedUser.userId,
    width,
  ]);

  const languages = [
    { name: 'EN', code: LOCALES.ENGLISH },
    { name: 'RU', code: LOCALES.RUSSIAN },
  ];

  const toggleMenu = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header
      className={`${
        sticky ? 'header--sticky' : 'h-24'
      } relative bg-slate-800 w-full flex justify-between items-center px-6 py-6 border-b border-b-slate-600 text-gray-300`}
    >
      <div ref={inputEl} className="logo">
        <Link to="/main">
          <Logo />
        </Link>
      </div>
      {/* {burger && ( */}
      <div
        className="visible order-3 md:invisible md:order-none z-50"
        onClick={toggleMenu}
      >
        <Menu />
      </div>
      {/* )} */}
      <div className="flex justify-between">
        {
          <div
            className={`${
              isNavOpen ? 'visible right-0' : 'invisible -right-full'
            } transition-all duration-500 delay-100 border-2 border-slate-900 nav__list z-20 top-24 absolute bg-slate-800 p-4 right-0 flex flex-col justify-between items-center gap-4 md:bg-slate-800 md:flex-row md:static md:border-none md:visible `}
          >
            <BoardButton
              themes={themes.light}
              text="boardCreationBtn"
              onClick={toggleWindow}
            />
            <Link to="/edit-profile">
              <BoardButton themes={themes.light} text="edit" />
            </Link>
            <BoardButton
              themes={themes.light}
              text="signOut"
              onClick={onLogout}
            />
            <div className="switch">
              <select
                className="text-white bg-slate-700 mr-4"
                onChange={handleChange}
                value={currentLocale}
              >
                {languages.map(({ name, code }) => (
                  <option
                    className="text-white bg-slate-800"
                    key={code}
                    value={code}
                  >
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        }
        <div className="nav__user w-full flex flex-row justify-center items-center gap-2">
          <img
            src={userImg}
            alt="user avatar"
            className="w-full h-6 rounded-full"
          />
          <span>{userDetails.login}</span>
        </div>
      </div>

      {/* {isOpen && ( */}
      <BoardCreation toggleWindow={toggleWindow} isOpen={isOpen} />
      {/* )} */}
    </header>
  );
};

export default Header;
