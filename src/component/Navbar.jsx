import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "HOME", path: "/#home" },
    { name: "About Us", path: "/#about" },
    { name: "Services", path: "/#services" },
    { name: "Packages", path: "/#packages" },
    { name: "Income Plan", path: "/#incomes" },
    { name: "Rewards", path: "/#rewards" },
    // { name: "Terms & Conditions", path: "/termsConditions" }
  ];

  const handleNavClick = (e, path) => {
    setIsMobileMenuOpen(false);
    if (path.startsWith("/#")) {
      const id = path.split("#")[1];
      if (location.pathname === "/") {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", path);
        }
      }
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#070b13]/90 backdrop-blur-lg border-b border-yellow-500/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <img
              src="/Images/logo1.png"
              alt="NFT RealEstate Logo"
              className="h-50 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 font-semibold text-sm tracking-wide">
            {navItems.map(({ name, path }) => (
              <NavLink
                key={name}
                to={path}
                onClick={(e) => handleNavClick(e, path)}
                className={({ isActive }) =>
                  `relative group py-2 transition duration-200 ${
                    (path.startsWith("/#") && location.pathname === "/" && location.hash === path.substring(1)) || 
                    (!path.startsWith("/#") && location.pathname === path)
                      ? "text-yellow-400 font-bold"
                      : "text-gray-300 hover:text-white"
                  }`
                }
              >
                {name}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink
              to="/login"
              className="text-base font-semibold text-gray-300 hover:text-white transition duration-200"
            >
              Login
            </NavLink>

            <NavLink
              to="/signup"
              className="relative bg-gradient-to-r from-yellow-500 to-amber-600 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm hover:from-yellow-600 hover:to-amber-700 hover:scale-105 transition-all duration-300 shadow-md shadow-yellow-500/5 hover:shadow-yellow-500/15"
            >
              Register
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-[#070b13]/95 backdrop-blur-lg border-b border-yellow-500/10">
            <div className="px-4 py-6 space-y-4">
              {navItems.map(({ name, path }) => (
                <NavLink
                  key={name}
                  to={path}
                  onClick={(e) => handleNavClick(e, path)}
                  className="block text-gray-300 hover:text-white transition-colors duration-300 font-semibold text-sm"
                >
                  {name}
                </NavLink>
              ))}
              <div className="pt-4 border-t border-gray-800 space-y-4">
                <button
                  className="w-full bg-slate-900 border border-gray-800 text-white px-6 py-2.5 rounded-xl text-xs hover:bg-slate-950 transition-all duration-300 font-bold"
                  onClick={() => { setIsMobileMenuOpen(false); navigate('/login'); }}
                >
                  Login
                </button>
                <button
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-slate-950 px-6 py-2.5 rounded-xl text-xs hover:from-yellow-600 hover:to-amber-700 transition-all duration-300 font-bold"
                  onClick={() => { setIsMobileMenuOpen(false); navigate('/signup'); }}
                >
                  Register
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