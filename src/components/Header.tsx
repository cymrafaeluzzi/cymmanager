import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-30 w-full">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          {/* Search bar - hidden on mobile */}
          <div className="hidden md:block ml-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar propiedades..."
                className="pl-10 pr-4 py-2 w-80 border border-gray-200 rounded-full focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-gray-50 focus:bg-white"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center">
            <img
              className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-100"
              src={user?.avatar || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'}
              alt={user?.name}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;