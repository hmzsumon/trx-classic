import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout, reset } from '../../redux/auth/authSlice';

const menuContent = [
  {
    id: 1,
    title: 'Home',
    NavLink: '/',
  },
  {
    id: 2,
    title: 'About',
    NavLink: '/about',
  },
  {
    id: 3,
    title: 'Contact',
    NavLink: '/contact',
  },
  {
    id: 4,
    title: 'Lottery',
    NavLink: '/lottery',
  },
  {
    id: 5,
    title: 'Coin',
    NavLink: '/coin',
  },
  {
    id: 6,
    title: 'Task',
    NavLink: '/task',
  },
];

const MainNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <header className='relative'>
      <nav className='px-4 fixed w-full py-2 bg-[#0E75BB]  flex items-center justify-between '>
        <img src='images/up.png' alt='Up' width={200} height={50} />
        <ul className='hidden space-x-4 text-lg font-medium text-white uppercase md:flex'>
          {menuContent.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.NavLink}
                className={(nav) => (nav.isActive ? 'text-green-400' : null)}
              >
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className='space-x-3 text-lg font-medium uppercase '>
          {user ? (
            <NavLink to='/dashboard'>
              <span className='bg-[#62A642] hidden md:inline-block text-white px-4 py-1 rounded'>
                Dashboard
              </span>
            </NavLink>
          ) : (
            <NavLink to='/register'>
              <span className='bg-[#62A642] hidden md:inline-block text-white px-4 py-1 rounded'>
                Join
              </span>
            </NavLink>
          )}

          {user ? (
            <button
              className='bg-white px-4 py-1 text-sky-700 font-semibold rounded'
              onClick={onLogout}
            >
              Logout
            </button>
          ) : (
            <NavLink
              to='/login'
              className={(nav) =>
                nav.isActive ? 'text-blue-700' : 'text-gray-800'
              }
            >
              <span className='px-4 py-1  bg-white rounded'>Login</span>
            </NavLink>
          )}
        </div>
        <div className='md:hidden'>
          <button className='toggler-menu' onClick={handleClick}>
            <div className={click ? 'active' : ''}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </nav>
      {/* Mobile Menu */}

      <div
        className={`bg-[#043a5e]  h-[1000px] w-full absolute  mobile-menu ${
          click ? 'is-active' : null
        }`}
      >
        <ul className='px-4 pt-6 text-white'>
          {menuContent.map((item) => (
            <li key={item.id} className='py-2 text-xl font-bold'>
              <NavLink to={item.NavLink}>
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default MainNav;
