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

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
          <a href="#" className="hover:text-black">Home</a>
          <a href="#" className="hover:text-black">A propos</a>
          <a href="#" className="hover:text-black">FAQ</a>
          
        </nav>

        {/* Right side (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <a href="#" className="text-gray-600 hover:text-black font-medium">
            Login
          </a>
          <Link to="/signup">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
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
          <a href="#" className="block">Home</a>
          <a href="#" className="block">A propos</a>
          <a href="#" className="block">FAQ</a>
          <hr />

          <a href="#" className="block">Log In</a>
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