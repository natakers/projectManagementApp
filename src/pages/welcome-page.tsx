import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

const DEVS = [
  { link: 'https://github.com/natakers', githubName: '@natakers' },
  {
    link: 'https://github.com/MaxTheGrandMagus',
    githubName: '@MaxTheGrandMagus',
  },
  { link: 'https://github.com/gonzjv', githubName: '@gonzjv' },
];

const WelcomePage = () => {
  const [cookie, setCookie] = useCookies(['userToken']);

  useEffect(() => {
    console.log('userToken', cookie.userToken);
  });

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
    console.log('api token', parsedApiData);

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
        <button className="border-2 border-sky-400 rounded p-1 bg-gradient-to-r from-sky-500 to-indigo-500 ">
          Sign Up
        </button>
      </nav>
      <h1 className="text-3xl text-white bg-gradient-to-r from-sky-500 to-indigo-500 text-transparent bg-clip-text ">
        effetto
      </h1>
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
