import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function HeaderMain() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-gray-900">
        <h1 className="text-xl font-bold text-gray-900">
          Mentor<span className="text-blue-600">Pro</span>
        </h1>
        </Link>
        

        {/* Right side (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="text-gray-600 hover:text-black font-medium">      
            Login
          </Link>
          <Link to="/signup">
          <button className="cursor-pointer bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
            Get Started
          </button>
          </Link>
        </div>
        
        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-3">
          <Link to="/login" className="block">Login</Link>
          <Link to="/signup" className="block">
           <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
            Get Started
          </button>
          </Link>
        </div>
      )}
    </header>
  );
}