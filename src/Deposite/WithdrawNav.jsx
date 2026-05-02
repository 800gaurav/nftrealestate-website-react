import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; // hamburger icons

function WithdrawNav() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Withdraw", path: "/dashboard/funds/withdraw" },
    { name: "Withdraw History", path: "/dashboard/funds/withdraw-history" },

  ];

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        {/* <div className="text-yellow-400 font-bold text-lg">IncomeNav</div> */}

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded hover:bg-gray-800 transition ${
                  isActive ? "bg-gray-800 text-yellow-400 font-semibold" : "text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 px-4 pb-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2 rounded hover:bg-gray-800 transition ${
                  isActive ? "bg-gray-800 text-yellow-400 font-semibold" : "text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}

export default WithdrawNav;
