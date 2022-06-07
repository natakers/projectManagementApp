import { useCookies } from 'react-cookie';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header, { HeaderProps } from './Header';
import Footer from './Footer';

const Layout = ({ handleChange, currentLocale }: HeaderProps) => {
  const [cookie] = useCookies(['user']);
  // const locale = LOCALES.ENGLIS/H

  return (
    <div className="min-h-screen flex flex-col gap-4 bg-slate-800 overflow-hidden">
      {cookie.user && (
        <Header
          handleChange={handleChange}
          currentLocale={currentLocale}
        />
      )}
      <Outlet />
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Layout;
