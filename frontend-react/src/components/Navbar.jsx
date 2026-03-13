import React from 'react';
import { NavLink } from 'react-router-dom';
import { Leaf, Scan, MessageSquare } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Leaf className="h-8 w-8 text-emerald-600" />
            <span className="font-bold text-xl text-emerald-800 hidden sm:block">Agri Bot System</span>
          </div>
          <div className="flex space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors duration-200 ${
                  isActive
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                }`
              }
            >
              <Leaf className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </NavLink>
            <NavLink
              to="/detect"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors duration-200 ${
                  isActive
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                }`
              }
            >
              <Scan className="h-4 w-4" />
              <span className="hidden sm:inline">Detect</span>
            </NavLink>
            <NavLink
              to="/chat"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors duration-200 ${
                  isActive
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                }`
              }
            >
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Chat</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
