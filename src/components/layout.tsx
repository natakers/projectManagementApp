import { useCookies } from 'react-cookie';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  const [cookie] = useCookies(['user']);

  return (
    <div className="min-h-screen">
      {cookie.user && <Header />}
      <Outlet />
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Layout;
