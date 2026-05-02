
import React from "react";
import { NavLink } from "react-router-dom";

const Tabs = ({ tabs }) => {
  return (
    <div className="flex justify-center space-x-6 mb-8">
      {tabs.map((tab, index) => (
        <NavLink
          key={index}
          to={tab.link}
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg font-medium transition ${
              isActive
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white/10 text-blue-200 hover:bg-blue-600/20 hover:text-white"
            }`
          }
        >
          {tab.name}
        </NavLink>
      ))}
    </div>
  );
};

export default Tabs;
