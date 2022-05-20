import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import Logo from '../components/logo';

const WelcomePage = () => {
  const [cookie, setCookie] = useCookies(['userToken']);

  const handleSignIn = async () => {
    const headers = new Headers({
      'Content-type': 'application/json',
    });

    const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        login: 'user001',
        password: 'userpass@123',
      }),
      // mode: 'no-cors' as RequestMode,
    };

    const apiData = await fetch(
      'https://still-earth-24890.herokuapp.com/signin',
      options
    );
    const parsedApiData = await apiData.json();

    setCookie('userToken', parsedApiData.token, { sameSite: 'lax' });
  };

  return (
    <main className="relative bg-slate-800 min-h-screen items-center text-gray-300 justify-center flex flex-col gap-5 ">
      <nav className=" flex gap-5 absolute top-20 right-20 ">
        <button
          onClick={handleSignIn}
          className="border-2 border-sky-400 rounded p-1 bg-gradient-to-r from-sky-500 to-indigo-500 "
        >
          Sign In as user001 ---for test---
        </button>
        <Link
          to="/signin"
          className="border-2 border-sky-400 rounded p-1 bg-gradient-to-r from-sky-500 to-indigo-500 "
        >
          Sign In
        </Link>
        <Link
          to="/signup"
          className="border-2 border-sky-400 rounded p-1 bg-gradient-to-r from-sky-500 to-indigo-500 "
        >
          Sign Up
        </Link>
      </nav>
      <Logo />
      <p className="text-lg">Project Management App</p>
    </main>
  );
};

export default WelcomePage;
