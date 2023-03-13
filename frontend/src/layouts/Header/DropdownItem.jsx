import React, { useState } from 'react';
import { IoIosArrowDropdown } from 'react-icons/io';
import { NavLink } from 'react-router-dom';

const DropdownItem = ({ name, items }) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  return (
    <>
      <div
        className='flex items-center justify-between px-2 py-4 cursor-pointer'
        onClick={() => setIsOpenDropdown(!isOpenDropdown)}
      >
        {name}
        <IoIosArrowDropdown
          className={`text-2xl ${isOpenDropdown ? '  rotate-180' : null}`}
        />
      </div>
      {isOpenDropdown &&
        items.map((item) => (
          <li className='px-2 py-2' key={item.id}>
            <NavLink to={item.link}>{item.name}</NavLink>
          </li>
        ))}
    </>
  );
};

export default DropdownItem;
