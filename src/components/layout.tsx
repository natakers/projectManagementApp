import { Outlet } from 'react-router-dom';
import { AppState, useAppSelector } from '../store/store';
import { ToastContainer } from 'react-toastify';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  const { user } = useAppSelector((state: AppState) => state.auth);

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
