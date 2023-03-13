import React, { useState } from 'react';
import {
  AiFillSetting,
  AiOutlineDownload,
  AiOutlineUpload,
} from 'react-icons/ai';
import { BsHeadset } from 'react-icons/bs';
import { FaExchangeAlt, FaQuestion } from 'react-icons/fa';
import { GiMining, GiWallet } from 'react-icons/gi';
import { HiOutlineLogout } from 'react-icons/hi';
import {
  MdOutlineDashboard,
  MdOutlineDescription,
  MdSend,
} from 'react-icons/md';
import { SiConvertio } from 'react-icons/si';
import { VscReferences } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout, reset } from '../../redux/auth/authSlice';
import UserOptions from '../Users/Profile/UserOptions';

const menuContent = [
  {
    id: 1,
    name: 'Dashboard',
    icon: <MdOutlineDashboard />,
    path: '/user/dashboard',
  },
  {
    id: 2,
    name: 'deposit',
    icon: <AiOutlineDownload />,
    path: '/deposit',
  },
  {
    id: 3,
    name: 'Withdraw',
    icon: <AiOutlineUpload />,
    path: '/withdraw',
  },
  {
    id: 4,
    name: 'Send',
    icon: <MdSend />,
    path: '/send/send-money',
  },
  {
    id: 5,
    name: 'Receive ',
    icon: <GiWallet />,
    path: '/wallet',
  },
  {
    id: 6,
    name: 'Exchange',
    icon: <FaExchangeAlt />,
    path: '/exchange',
  },
  {
    id: 7,
    name: 'Transactions',
    icon: <MdOutlineDescription />,
    path: '/transactions',
  },
  {
    id: 8,
    name: 'Settings',
    icon: <AiFillSetting />,
    path: '/settings',
  },
  {
    id: 9,
    name: 'Support',
    icon: <BsHeadset />,
    path: '/support',
  },
  {
    id: 10,
    name: 'FAQ',
    icon: <FaQuestion />,
    path: '/faq',
  },
  {
    id: 11,
    name: 'Referral',
    icon: <VscReferences />,
    path: '/referral',
  },
  {
    id: 12,
    name: 'Minings',
    icon: <GiMining />,
    path: '/minings',
  },
  {
    id: 13,
    name: 'Convert',
    icon: <SiConvertio />,
    path: '/convert',
  },
];

const UserNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };
  return (
    <div className=''>
      {/* Nav fro Mobile */}
      <div className='md:hidden'>
        <header className='relative'>
          <nav className='px-2 fixed w-full py-2 bg-[#0E75BB]   flex items-center justify-between '>
            <div className=''>
              <button className='toggler-menu' onClick={handleClick}>
                <div className={click ? 'active' : ''}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button>
            </div>
            <NavLink to='/'>
              <img src='/images/up.png' alt='Up' width={150} height={50} />
            </NavLink>
            <div className='space-x-3 text-lg font-medium uppercase '>
              <UserOptions />
            </div>
            <button onClick={onLogout}>
              <HiOutlineLogout className='text-2xl text-white' />
            </button>
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
                  <NavLink to={item.path}>
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </header>
      </div>
      {/*End Nav fro Mobile */}
      <div className=' pt-4 hidden md:block bg-sky-800 h-[1000px]'>
        <div className='px-2'>
          <NavLink to='/' className=' cursor-pointer'>
            <img src='/images/up.png' alt='Up' width={200} height={50} />
          </NavLink>

          <hr className='mt-2' />
        </div>
        <div>
          <ul className=' pt-6 text-white'>
            {menuContent.map((item) => {
              const { id, name, icon, path } = item;
              return (
                <NavLink
                  to={path}
                  className={(nav) =>
                    nav.isActive
                      ? 'bg-sky-900 px-2 flex items-center w-full  py-4 space-x-4 font-medium text-white uppercase transition-all duration-300 ease-in-out cursor-pointer hover:bg-active_gray hover:text-gray-900'
                      : 'px-2 flex items-center w-full  py-4 space-x-4 font-medium text-white uppercase transition-all duration-300 ease-in-out cursor-pointer hover:bg-active_gray hover:text-gray-900'
                  }
                  key={id}
                >
                  <i className='text-2xl'>{icon}</i>
                  <p className='text-lg'>{name}</p>
                </NavLink>
              );
            })}
          </ul>
        </div>
        <li
          className='text-lg  list-none px-2 flex items-center w-full  py-4 space-x-4 font-medium text-white uppercase transition-all duration-300 ease-in-out cursor-pointer hover:bg-active_gray hover:text-gray-900'
          onClick={onLogout}
        >
          {' '}
          <HiOutlineLogout className='text-2xl' /> <span>Logout</span>
        </li>
      </div>
    </div>
  );
};

export default UserNav;
