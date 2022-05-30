import { useEffect, useState } from 'react';
import Layout from './components/layout';
import WelcomePage from './pages/welcome-page';
import 'react-toastify/dist/ReactToastify.css';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import './styles/App.css';
import MainPage from './pages/main-page';
import BoardPage from './pages/board-page';
import EditProfile from './pages/editProfile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { LOCALES } from './i18n/locales';
import { messages } from './i18n/messages';
import { getCookie } from './helpers/cookie';
import { useCookies } from 'react-cookie';

const App = () => {
  // const fetchApiData = async () => {
  //   const headers = new Headers({
  //     Authorization:
  //       'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NGNmOTZkMi01OGZjLTRlMGMtOTZkOS05YWM0MjhkNGQ0OTUiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTIwMDMyMTF9.EUlvrrs0Hl7wq1o-vkW5eh710CeNmhTfivk8aYkO43I',
  //   });
  //   const options = {
  //     method: 'GET',
  //     headers,
  //     // mode: 'no-cors' as RequestMode,
  //   };

  //   const apiData = await fetch(
  //     'https://frozen-depths-66382.herokuapp.com/users',
  //     options
  //   );
  //   const parsedApiData = await apiData.json();
  //   console.log('users from API', parsedApiData);
  // };


  // useEffect(() => {
  //   fetchApiData();
  // });
  const locale = getCookie('lang') || LOCALES.ENGLISH
  const [cookie, setCookie] = useCookies(['lang']);
  const handleChange = (e: { target: { value: string; }}) => {    
  setCookie('lang', e.target.value)
  console.log(cookie);
  
}

  return (
    <IntlProvider messages={messages[cookie.lang]} locale={locale} defaultLocale={LOCALES.ENGLISH}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout handleChange={handleChange}  currentLocale={cookie.lang} />}>
          <Route index element={<WelcomePage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </IntlProvider>
    
  );
};

export default App;
