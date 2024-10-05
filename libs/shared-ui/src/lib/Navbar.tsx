import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X, MapPin, ChevronDown, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-screen-2xl mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link className="flex-shrink-0 flex items-center" to='/'>
            <span className="text-2xl font-bold text-white hover:text-yellow-400 transition-colors duration-200">ShoppingCart</span>
          </Link>

          {/* Deliver To */}
          <div className="hidden lg:flex items-center text-sm cursor-pointer group">
            <MapPin className="h-5 w-5 mr-1 text-gray-300 group-hover:text-yellow-400 transition-colors duration-200" />
            <div>
              <div className="text-gray-300 group-hover:text-white transition-colors duration-200">Deliver to</div>
              <div className="font-bold group-hover:text-yellow-400 transition-colors duration-200">Select your address</div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-grow mx-4 hidden sm:block">
            <div className="flex">
              <select className="h-10 px-2 rounded-l-md bg-gray-100 border-r border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                <option>All</option>
                {/* Add more departments here */}
              </select>
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-10 px-3 py-2 text-gray-900 rounded-r-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button className="h-10 w-10 text-gray-700 bg-yellow-400 rounded-r-md hover:bg-yellow-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-600">
                <Search className="h-5 w-5 mx-auto" />
              </button>
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Language selector */}
            <div className="hidden lg:flex items-center cursor-pointer group">
              <img src="/api/placeholder/24/16" alt="Flag" className="mr-1" />
              <span className="text-sm font-bold group-hover:text-yellow-400 transition-colors duration-200">EN</span>
              <ChevronDown className="h-4 w-4 ml-1 group-hover:text-yellow-400 transition-colors duration-200" />
            </div>

            {/* Account & Lists */}
            <div className="hidden lg:flex flex-col cursor-pointer group">
              <span className="text-xs group-hover:text-yellow-400 transition-colors duration-200">Hello, sign in</span>
              <span className="text-sm font-bold group-hover:text-yellow-400 transition-colors duration-200">
                Account & Lists <ChevronDown className="inline h-4 w-4" />
              </span>
            </div>

            {/* Returns & Orders */}
            <div className="hidden lg:flex flex-col cursor-pointer group">
              <span className="text-xs group-hover:text-yellow-400 transition-colors duration-200">Returns</span>
              <span className="text-sm font-bold group-hover:text-yellow-400 transition-colors duration-200">& Orders</span>
            </div>

            {/* Cart */}
            <Link className="flex items-center cursor-pointer group" to='/cart'>
            <ShoppingCart className="h-8 w-8 group-hover:text-yellow-400 transition-colors duration-200" />
              <span className="text-yellow-400 font-bold group-hover:text-white transition-colors duration-200">0</span>
            </Link>
            <div >
              
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
              >
                {isMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Home', 'Shop by Category', 'Today\'s Deals', 'Customer Service', 'Registry', 'Gift Cards', 'Sell'].map((item) => (
                <a key={item} href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-yellow-400 hover:bg-gray-700 transition-colors duration-200">{item}</a>
              ))}
            </div>
            <div className="border-t border-gray-700 pt-4 pb-3">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <User className="h-10 w-10 rounded-full bg-gray-700 p-2" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">Sign In</div>
                  <div className="text-sm font-medium text-gray-400">Manage your account</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Secondary navigation */}
      <div className="bg-gray-800 py-2 px-4 hidden sm:block">
        <div className="flex items-center text-sm">
          <button className="flex items-center text-white mr-4 hover:text-yellow-400 transition-colors duration-200">
            <Menu className="h-5 w-5 mr-1" /> All
          </button>
          {['Today\'s Deals', 'Customer Service', 'Registry', 'Gift Cards', 'Sell'].map((item) => (
            <a key={item} href="#" className="text-white mr-4 hover:text-yellow-400 hover:underline transition-colors duration-200">{item}</a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;