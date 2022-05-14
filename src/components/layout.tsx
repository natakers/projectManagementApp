import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './Header';

const Layout = () => {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className="min-h-screen">
      {user && <Header />}
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default Layout;
