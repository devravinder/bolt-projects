import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, LogOut } from 'lucide-react';
import { useStore } from '../store';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, logout, darkMode, toggleDarkMode } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <nav className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold">
                VehicleRent
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {currentUser && (
                <>
                  <Link
                    to={currentUser.role === 'admin' ? '/admin/dashboard' : '/vehicles'}
                    className="hover:text-gray-300"
                  >
                    {currentUser.role === 'admin' ? 'Dashboard' : 'Vehicles'}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 hover:text-gray-300"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </>
              )}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-700"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};