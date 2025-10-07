import { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { LucideBuilding2, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50 w-screen">
      <div className=" mx-auto px-4 sm:px-6 lg:px-42">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="logo" className='h-10 w-10' />
              <div>
                <h1 className="text-xl font-bold text-gray-800">InfoKanMas</h1>
                <p className="text-xs text-gray-500">Terbuka dan Terpercaya</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
            >
              Courses
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
            >
              Contact
            </Link>

            {/* Authentication Section */}
            <div className="flex items-center space-x-4">
              <Link to="/auth/login">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-200">
                  Sign In
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/courses"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Courses
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              {/* Mobile Authentication */}
              <div className="pt-4 pb-3 border-t border-gray-200">
                <Link to="/auth/login">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-200">
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}