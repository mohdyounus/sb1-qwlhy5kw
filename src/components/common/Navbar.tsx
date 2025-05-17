import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Menu, X, LogIn, Bell, HelpCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  // Check if current route is a dashboard route
  const isDashboardRoute = location.pathname.includes('/dashboard');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setShowNotifications(false);
  }, [location]);

  // Determine text color based on route and scroll state
  const getTextColor = () => {
    if (isDashboardRoute || isScrolled) {
      return 'text-gray-800';
    }
    return 'text-white';
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isDashboardRoute || isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-green-700 flex items-center justify-center text-white">
                <Globe size={24} />
              </div>
              <div className="ml-2">
                <div className={`text-xl font-bold ${getTextColor()}`}>
                  Dream Scopes
                </div>
                <div className={`text-xs ${isDashboardRoute || isScrolled ? 'text-gray-600' : 'text-white/90'}`}>
                  Educational & Immigration Consultancy
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className={`${getTextColor()} hover:text-green-600 transition-colors`}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/course-finder" className={`${getTextColor()} hover:text-green-600 transition-colors`}>
                  Course Finder
                </Link>
              </li>
              <li>
                <Link to="/universities" className={`${getTextColor()} hover:text-green-600 transition-colors`}>
                  Universities
                </Link>
              </li>
              <li>
                <Link to="/exams-required" className={`${getTextColor()} hover:text-green-600 transition-colors`}>
                  Exams Required
                </Link>
              </li>
              <li>
                <Link to="/scholarships" className={`${getTextColor()} hover:text-green-600 transition-colors`}>
                  Scholarships
                </Link>
              </li>
              <li>
                <Link to="/contact" className={`${getTextColor()} hover:text-green-600 transition-colors`}>
                  Contact
                </Link>
              </li>
            </ul>

            {/* Login/Dashboard Links */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className={`flex items-center ${getTextColor()} hover:text-green-600 transition-colors`}
                  >
                    <Bell size={20} />
                    {notificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {notificationCount}
                      </span>
                    )}
                  </button>
                  
                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                          <p className="text-sm text-gray-800">New application status update</p>
                          <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                        <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                          <p className="text-sm text-gray-800">Document verification required</p>
                          <p className="text-xs text-gray-500">1 day ago</p>
                        </div>
                        <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                          <p className="text-sm text-gray-800">New university deadline approaching</p>
                          <p className="text-xs text-gray-500">2 days ago</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Help/Support */}
                <Link
                  to="/contact"
                  className={`flex items-center ${getTextColor()} hover:text-green-600 transition-colors`}
                >
                  <HelpCircle size={20} />
                </Link>

                <Link
                  to={`/${user?.role}/dashboard`}
                  className={`flex items-center ${getTextColor()} hover:text-green-600 transition-colors`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className={`flex items-center ${getTextColor()} hover:text-green-600 transition-colors`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={`flex items-center ${getTextColor()} hover:text-green-600 transition-colors`}
              >
                <LogIn size={18} className="mr-1" />
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden focus:outline-none" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X size={24} className={getTextColor()} />
            ) : (
              <Menu size={24} className={getTextColor()} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 bg-white shadow-md rounded-lg mt-2">
            <nav>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="block px-4 py-2 text-gray-800 hover:bg-green-50 hover:text-green-600 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/course-finder" className="block px-4 py-2 text-gray-800 hover:bg-green-50 hover:text-green-600 transition-colors">
                    Course Finder
                  </Link>
                </li>
                <li>
                  <Link to="/universities" className="block px-4 py-2 text-gray-800 hover:bg-green-50 hover:text-green-600 transition-colors">
                    Universities
                  </Link>
                </li>
                <li>
                  <Link to="/exams-required" className="block px-4 py-2 text-gray-800 hover:bg-green-50 hover:text-green-600 transition-colors">
                    Exams Required
                  </Link>
                </li>
                <li>
                  <Link to="/scholarships" className="block px-4 py-2 text-gray-800 hover:bg-green-50 hover:text-green-600 transition-colors">
                    Scholarships
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="block px-4 py-2 text-gray-800 hover:bg-green-50 hover:text-green-600 transition-colors">
                    Contact
                  </Link>
                </li>
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link
                        to={`/${user?.role}/dashboard`}
                        className="block px-4 py-2 text-gray-800 hover:bg-green-50 hover:text-green-600 transition-colors"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-green-50 hover:text-green-600 transition-colors"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-gray-800 hover:bg-green-50 hover:text-green-600 transition-colors"
                    >
                      <div className="flex items-center">
                        <LogIn size={18} className="mr-2" />
                        Login
                      </div>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;