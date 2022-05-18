import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './Header';

const Layout = () => {
  const [cookie] = useCookies(['user']);

  return (
    <div className="min-h-screen">
      {cookie.user && <Header />}
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default Layout;
