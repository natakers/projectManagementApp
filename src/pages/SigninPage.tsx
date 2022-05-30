import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState, useAppDispatch } from '../store/store';
import { toast } from 'react-toastify';
import { signin, reset } from '../store/auth/authSlice';
import Spinner from '../components/Spinner';
import { useCookies } from 'react-cookie';
import Logo from '../components/logo';
import { getCookie } from '../helpers/cookie';
import { FormattedMessage, useIntl } from 'react-intl';

type Props = {};

const SigninPage = (props: Props) => {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });

  const { login, password } = formData;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isLoading, isSuccess, isError, message } = useSelector(
    (state: AppState) => state.auth
  );

  const [cookie, setCookie] = useCookies(['user']);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (cookie.user) {
      // console.log('sign in cookie', cookie.user);
      navigate('/main');
    }
    dispatch(reset());
  }, [
    cookie.user,
    isLoading,
    isSuccess,
    isError,
    message,
    navigate,
    dispatch,
  ]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const userData = {
      login,
      password,
    };
    const { payload } = await dispatch(signin(userData));
    payload.token &&
      setCookie('user', payload.token, {
        maxAge: 36000,
        sameSite: 'lax',
      });
  };
  const intl = useIntl();
  const placeholderLog = intl.formatMessage({id: 'placeholderSignInLog'});
  const placeholderPas = intl.formatMessage({id: 'placeholderSignInPas'});

  if (isLoading) {
    return <Spinner />;
  }



  return (
    <section className="signin-page min-h-screen w-full px-6 py-6 flex flex-col justify-center items-center gap-16 bg-white">
      <div className="logo__container w-full flex flex-col justify-center items-center gap-3">
        <Logo />
        <p className="title text-center font-bold text-3xl text-gray-900">
        <FormattedMessage id='enterAccount' />
        </p>
      </div>
      <form
        onSubmit={onSubmit}
        className="form w-1/4 flex flex-col justify-center items-center gap-6"
      >
        <div className="form__item w-full">
          <input
            type="text"
            id="login"
            name="login"
            value={login}
            placeholder={placeholderLog}
            onChange={onChange}
            required
            className="form__control inline-flex w-full items-center px-4 py-3 border border-solid border-slate-400 rounded-lg"
          />
        </div>
        <div className="form__item w-full">
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder={placeholderPas}
            onChange={onChange}
            required
            className="form__control inline-flex w-full items-center px-4 py-3 border border-solid border-slate-400 rounded-lg"
          />
        </div>
        <div className="form__item w-full flex justify-center">
          <button
            type="submit"
            className="form__button w-full px-4 py-2 text-lg border-transparent rounded-md shadow-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200"
          >
            <FormattedMessage id='signIn' />
          </button>
        </div>
      </form>
      <div className="have-account w-full flex justify-center items-center">
        <span><FormattedMessage id='dontHaveAccount' />&nbsp;</span>
        <Link
          to="/signup"
          className="text-indigo-600 hover:text-indigo-700 transition-all duration-200"
        >
          <FormattedMessage id='signUp' />
        </Link>
      </div>
    </section>
  );
};

export default SigninPage;
