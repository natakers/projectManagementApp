import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import './styles/App.css';

const App = () => {
  const fetchApiData = async () => {
    const headers = new Headers({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NGNmOTZkMi01OGZjLTRlMGMtOTZkOS05YWM0MjhkNGQ0OTUiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTIwMDMyMTF9.EUlvrrs0Hl7wq1o-vkW5eh710CeNmhTfivk8aYkO43I', 
    })
    const options = {
      method: 'GET',
      headers,
      // mode: 'no-cors' as RequestMode,
    }

    const apiData = await fetch('https://still-earth-24890.herokuapp.com/users', options);

    console.log('apiData', apiData);
    const parsedApiData = await apiData.json();
    console.log('API users', parsedApiData);
  };

  useEffect(() => {
    fetchApiData();
  });
  
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup"element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
