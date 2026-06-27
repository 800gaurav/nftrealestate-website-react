import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

function TeamNav() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Direct Team", path: "/dashboard/teams/direct-team" },
    { name: "Binary Tree", path: "/dashboard/teams/tree" },
  ];

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
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

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

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

export default TeamNav;
