import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Activity, User, Info, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const NavLink = ({ to, icon: Icon, children }) => (
    <Link
      to={to}
      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-green-600 dark:text-gray-200 dark:hover:text-green-400 rounded-lg transition-colors duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700 lg:px-3"
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm font-medium">{children}</span>
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="flex items-center gap-2"
            >
              <Activity className="h-8 w-8 text-green-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
                TypeTest
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            <NavLink to="/" icon={Home}>Home</NavLink>
            <NavLink to="/test" icon={Activity}>Test</NavLink>
            <NavLink to="/profile" icon={User}>Profile</NavLink>
            <NavLink to="/about" icon={Info}>About</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } lg:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg border-t dark:border-gray-700 py-2 px-4`}
        >
          <div className="flex flex-col gap-2">
            <NavLink to="/" icon={Home}>Home</NavLink>
            <NavLink to="/test" icon={Activity}>Test</NavLink>
            <NavLink to="/profile" icon={User}>Profile</NavLink>
            <NavLink to="/about" icon={Info}>About</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;