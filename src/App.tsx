import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/layout';
import WelcomePage from './pages/welcome-page';

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

    console.log('apiData', apiData);
    const parsedApiData = await apiData.json();
    console.log('API users', parsedApiData);
  };

  useEffect(() => {
    fetchApiData();
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WelcomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
