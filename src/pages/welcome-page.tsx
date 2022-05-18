import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/logo';

const DEVS = [
  { link: 'https://github.com/natakers', githubName: '@natakers' },
  {
    link: 'https://github.com/MaxTheGrandMagus',
    githubName: '@MaxTheGrandMagus',
  },
  { link: 'https://github.com/gonzjv', githubName: '@gonzjv' },
];

const WelcomePage = () => {
  const navigate = useNavigate();
  const [cookie] = useCookies(['user']);

  return (
    <main className="relative bg-slate-800 min-h-screen items-center text-gray-300 justify-center flex flex-col gap-5 ">
      <nav className=" flex gap-5 absolute top-20 right-20 ">
        {cookie.user === undefined && (
          <>
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
          </>
        )}
        {cookie.user && (
          <Link
            to="/main"
            className="border-2 border-sky-400 rounded p-1 bg-gradient-to-r from-sky-500 to-indigo-500 "
          >
            Go to Main Page
          </Link>
        )}
      </nav>
      <Logo />
      <p className="text-lg">Project Management App</p>
      <aside className="bottom-10 absolute mt-32 text-lg justify-center items-center flex flex-col gap-5">
        <p>React2022Q1 | Team75</p>
        <ul className="flex gap-5">
          {DEVS.map((dev) => (
            <li key={dev.link}>
              <a
                className="font-light underline text-sky-400"
                href={dev.link}
              >
                {dev.githubName}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </main>
  );
};

export default WelcomePage;
