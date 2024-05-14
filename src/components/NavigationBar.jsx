import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/logo.png';

const NavigationBar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-darkerrose text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
      : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';

  return (
    <nav className="bg-lightrose border-b border-rose">
      <div className=" sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center ">
            <NavLink className="" to="/">
              <img className="h-20 w-auto" src={Logo} alt="Dessert Book" />
              {/* <span className="hidden md:block text-white text-2xl font-bold ml-2">
                Dessert Book
              </span> */}
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink to="/" className={linkClass}>
                  Home
                </NavLink>
                <NavLink to="/recipes" className={linkClass}>
                  Desserts
                </NavLink>
                <NavLink to="/addrecipe" className={linkClass}>
                  Add Recipe
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
