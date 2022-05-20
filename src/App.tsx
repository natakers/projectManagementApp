import { useEffect } from 'react';
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

const App = () => {
  const fetchApiData = async () => {
    const headers = new Headers({
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NGNmOTZkMi01OGZjLTRlMGMtOTZkOS05YWM0MjhkNGQ0OTUiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTIwMDMyMTF9.EUlvrrs0Hl7wq1o-vkW5eh710CeNmhTfivk8aYkO43I',
    });
    const options = {
      method: 'GET',
      headers,
      // mode: 'no-cors' as RequestMode,
    };

    const apiData = await fetch(
      'https://still-earth-24890.herokuapp.com/users',
      options
    );
    const parsedApiData = await apiData.json();
  };

  useEffect(() => {
    fetchApiData();
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
