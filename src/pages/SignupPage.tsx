import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/store';
import { signup, reset } from '../store/auth/authSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import Logo from '../components/logo';
import { useCookies } from 'react-cookie';
import { getCookie } from '../helpers/cookie';
import { useSelector } from 'react-redux';

type Props = {};

const SignupPage = (props: Props) => {
  const [formData, setFormData] = useState({
    name: '',
    login: '',
    password: '',
  });

  const { name, login, password } = formData;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isLoading, isSuccess, isError, message } = useSelector(
    (state: any) => state.auth
  );

  const [cookie, setCookie] = useCookies(['user']);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (cookie.user) {
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
      name,
      login,
      password,
    };
    const { payload } = await dispatch(signup(userData));
    console.log('signUp payload', payload);
    setCookie('user', payload.token, {
      maxAge: 200,
      sameSite: 'lax',
    });
    console.log('sign up cookie', getCookie('user'));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="signup-page w-full min-h-screen px-6 py-6 flex flex-col justify-center items-center gap-16">
      <div className="logo__container w-full flex flex-col justify-center items-center gap-3">
        <Logo />
        <p className="title text-center font-bold text-3xl text-gray-900">
          Join our community
        </p>
      </div>
      <form
        onSubmit={onSubmit}
        className="form w-1/4 flex flex-col justify-center items-center gap-6"
      >
        <div className="form__item w-full">
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={onChange}
            required
            className="form__control inline-flex w-full items-center px-4 py-3 border border-solid border-slate-400 rounded-lg"
          />
        </div>
        <div className="form__item w-full">
          <input
            type="text"
            id="login"
            name="login"
            value={login}
            placeholder="Enter your login"
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
            placeholder="Enter your password"
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
            Sign Up
          </button>
        </div>
      </form>
      <div className="have-account w-full flex justify-center items-center">
        <span>Already have an account?&nbsp;</span>
        <Link
          to="/signin"
          className="text-indigo-600 hover:text-indigo-700 transition-all duration-200"
        >
          Sign In
        </Link>
      </div>
    </section>
  );
};

export default SignupPage;
