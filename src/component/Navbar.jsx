import React, { useState, useEffect } from 'react';
import { Menu, X, TrendingUp } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const navigate = useNavigate()
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const navItems = [
    { name: "HOME", path: "/" },
    { name: "Plans", path: "/incomePlans" },
    { name: "Stats", path: "/stats" },
    { name: "Terms & Conditions", path: "/termsConditions" },
    { name: "About Us", path: "/About" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-lg border-b border-gray-700' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/Images/logo1.png"
              alt="SecureTrade Logo"
              className="h-25 w-24  object-contain mt-1"
            />
          </div>

          <div className="hidden lg:flex items-center gap-8 font-semibold text-sm tracking-wide">
            {navItems.map(({ name, path }) => (
              <NavLink
                key={name}
                to={path}
                className={({ isActive }) =>
                  `relative group text-sm xl:text-base transition duration-200 ${isActive
                    ? "text-[#00E676] font-bold"
                    : "text-white hover:text-[#FF4D6D]"
                  }`
                }
              >
                {name}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-[#FF4D6D] to-[#00BFFF] transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `relative group text-sm xl:text-base transition duration-200 ${isActive
                  ? "text-[#00E676] font-bold"
                  : "text-white hover:text-blue-400"
                }`
              }
            >
              Login
            </NavLink>

            <NavLink
              to="/login"
              className={({ isActive }) =>
                `relative group text-sm xl:text-base px-6 py-2 rounded-lg transition-all duration-300 transform ${isActive
                  ? "bg-gradient-to-r from-blue-600 to-green-500 text-white scale-105"
                  : "bg-gradient-to-r from-blue-500 to-green-400 text-white hover:from-blue-600 hover:to-green-500 hover:scale-105"
                }`
              }
            >
              Register
            </NavLink>

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-b border-gray-700">
            <div className="px-4 py-4 space-y-4">
              {navItems.map(({ name, path }) => (
                <NavLink
                  key={name}
                  to = {path}
                  className="block text-gray-300 hover:text-white transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {name}
                </NavLink>
              ))}
              <div className="pt-4 border-t border-gray-700 space-y-4">
                {/* <button className="block w-full text-left text-white hover:text-blue-400 transition-colors duration-300">
                  Login
                </button> */}
                <button className="w-full bg-gradient-to-r from-blue-500 to-green-400 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-green-500 transition-all duration-300"
                onClick={()=> navigate('/login')}
                >
                  Login 
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;