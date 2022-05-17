import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className="min-h-screen">
      {user && <Header />}
      <Outlet />
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Layout;
