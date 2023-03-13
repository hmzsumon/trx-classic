import React from 'react';
import { FaLaptopCode } from 'react-icons/fa';
import { MdOutlineAppRegistration } from 'react-icons/md';

import { FcBusiness } from 'react-icons/fc';
import { NavLink } from 'react-router-dom';

const Overview = () => {
  return (
    <div
      className='flex flex-col items-center pb-10 space-y-10 overview '
      id='overview'
    >
      <div className=' items-center pt-[350px] md:pt-0 justify-center md:mt-[360px] '>
        <h1 className='text-4xl font-semibold text-white'>
          Get a quick overview for
        </h1>
      </div>
      <div className='space-y-6 md:flex md:space-y-0 md:space-x-6'>
        <NavLink
          to='/register'
          className='w-[258px] space-y-6  h-[200px] flex flex-col items-center justify-center bg-[#2e2d2d]'
        >
          <MdOutlineAppRegistration className='text-[#FF7E00] text-3xl' />
          <h1 className='text-xl font-semibold text-white'>Registration</h1>
        </NavLink>
        <NavLink
          to='/mer-register'
          className='w-[258px] space-y-6 h-[200px] bg-[#2e2d2d] flex flex-col items-center justify-center'
        >
          <FcBusiness className='text-[#FF7E00] text-3xl' />
          <h1 className='text-xl font-semibold text-white '>Business</h1>
        </NavLink>
        <NavLink
          to='/developers'
          className='w-[258px] space-y-6  h-[200px] flex flex-col items-center justify-center bg-[#2e2d2d]'
        >
          <FaLaptopCode className='text-[#FF7E00] text-3xl' />
          <h1 className='text-xl font-semibold text-white'>Developers</h1>
        </NavLink>
      </div>
    </div>
  );
};

export default Overview;
