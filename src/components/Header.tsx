import React, { useState, useEffect, FormEventHandler } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState, useAppDispatch } from '../store/store';
import { reset } from '../store/auth/authSlice';
import { getUserById, resetUser } from '../store/user/userSlice';
import { useCookies } from 'react-cookie';
import Logo from './logo';
import BoardButton, { themes } from './main-route/boardButton';
import BoardCreation from '../pages/createBoard';
import jwt_decode from 'jwt-decode'
import { TokenProps } from './interfaces';
import userImg from '../assets/images/sample-avatar.jpg';
// import { FormattedMessage } from 'react-intl'
import { LOCALES } from '../i18n/locales';

export type HeaderProps = {
  currentLocale: string,
  handleChange: ({ target: { value } }: {target: {value: string }}) => void,
};


const Header = ({currentLocale, handleChange }: HeaderProps) => {
  const [sticky, setSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [cookie, setCookie, removeCookie] = useCookies(['user']);
  const decodedUser: TokenProps = jwt_decode(cookie.user)

  const { userDetails } = useSelector(
    (state: AppState) => state.user
  );

  const onLogout = () => {
    dispatch(reset());
    dispatch(resetUser());
    removeCookie('user');
    navigate('/');
  };

  const toggleWindow = () => {
    setIsOpen(!isOpen)
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
  }, [userDetails.name, userDetails.login, dispatch, decodedUser.userId]);

  const languages = [
    { name: 'English', code: LOCALES.ENGLISH },
    { name: 'Русский', code: LOCALES.RUSSIAN },
  ]

  return (
    <header className={`${sticky ? 'header--sticky' : 'h-24'} bg-slate-800 w-full flex justify-between items-center px-6 py-6 border-b border-b-slate-600 text-gray-300`}>
      <div className="logo">
        <Link to="/main">
          <Logo />
        </Link>
      </div>
      <div className="nav__list flex justify-between items-center gap-4">
        <>
          <BoardButton themes={themes.light} text="boardCreationBtn" onClick={toggleWindow} />
          <Link to="/edit-profile">
            <BoardButton themes={themes.light} text="edit" />
          </Link>
          <BoardButton
            themes={themes.light}
            text="signOut"
            onClick={onLogout}
          />
          <div className="switch">
          <select onChange={handleChange}  value={currentLocale}>
            {languages.map(({ name, code }) => (
              <option key={code}  value={code}>
                {name}
              </option>
            ))}
          </select>
            {/* <input
              id="language-toggle"
              className="check-toggle check-toggle-round-flat"
              type="checkbox"
            />
            <label htmlFor="language-toggle"></label>
            <span className="on">{languages.na}</span>
            <span className="off">EN</span> */}
          </div>
          <div className="nav__user w-full flex flex-row justify-center items-center gap-2">
            <img
              src={userImg}
              alt="user avatar"
              className="w-full h-6 rounded-full"
            />
            <span>{userDetails.login}</span>
          </div>
        </>
      </div>
      { isOpen && <BoardCreation toggleWindow={toggleWindow} />}
    </header>
  );
};

export default Header;
