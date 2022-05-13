import React from 'react';
import { Link } from 'react-router-dom';

type Props = {}

const Header = (props: Props) => {
  return (
    <header className='header w-full flex justify-between items-center px-6 py-6 border-b-2 border-b-slate-100'>
      <div className="logo">
        <Link to='/' className='text-2xl font-semibold'>Dashboard</Link>
      </div>
      <div className='nav__list flex justify-between gap-x-6'>
        <Link to='/login' className="nav__item px-4 py-2 whitespace-nowrap flex items-center justify-center text-lg">
          Login
        </Link>
        <Link to='/signup' className="nav__item px-4 py-2 whitespace-nowrap inline-flex items-center justify-center text-lg border-transparent rounded-md shadow-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200">
          Sign Up
        </Link>
      </div>
    </header>
  )
}

export default Header;