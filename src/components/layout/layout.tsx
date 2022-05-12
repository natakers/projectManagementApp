import { Outlet } from 'react-router-dom';
import './layout.css';

const Layout = () => {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
};

export default Layout;
