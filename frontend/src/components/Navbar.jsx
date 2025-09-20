import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getUser, logout } from '../utils/auth';
import { LogOut, Shield, Store, User as UserIcon, KeyRound } from 'lucide-react';

/**
 * Renders the main navigation bar for the application.
 * It displays role-specific links and handles user logout.
 * Uses NavLink to highlight the currently active route.
 */
export default function Navbar() {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Style definitions for active and default navigation links
  const activeLinkClass = "flex items-center gap-2 text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-1";
  const defaultLinkClass = "flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors pb-1 border-b-2 border-transparent";

  return (
    <nav className="bg-white shadow-sm px-8 py-3 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        Roxiler
      </Link>
      <div className="flex gap-8 items-center">
        {/* Role-Based Navigation Links */}
        {user?.role === 'admin' && (
          <NavLink to="/admin" className={({isActive}) => isActive ? activeLinkClass : defaultLinkClass}>
            <Shield size={18}/> Admin
          </NavLink>
        )}
        {user?.role === 'owner' && (
          <NavLink to="/owner" className={({isActive}) => isActive ? activeLinkClass : defaultLinkClass}>
            <UserIcon size={18}/> Owner
          </NavLink>
        )}
        {user && (
          <NavLink to="/stores" className={({isActive}) => isActive ? activeLinkClass : defaultLinkClass}>
            <Store size={18}/> Stores
          </NavLink>
        )}
        {user && (
           <NavLink to="/change-password" className={({isActive}) => isActive ? activeLinkClass : defaultLinkClass}>
            <KeyRound size={18}/> Change Password
           </NavLink>
        )}

        {/* Auth Button */}
        {user ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center gap-2"
          >
            <LogOut size={16}/> Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}