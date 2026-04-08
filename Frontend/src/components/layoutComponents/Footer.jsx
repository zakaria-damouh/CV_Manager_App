import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t ">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8 text-gray-600">
        
        {/* Logo + Description */}
        <div className="md:col-span-4 text-center max-w-xl mx-auto">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            Mentor<span className="text-blue-600">Pro</span>
          </h2>
          <p className="text-sm mb-4">
            Améliorer la recherche de carrière des diplômés grâce à 
            l'intelligence artificielle et à la réflexion en design
            architectural.
          </p>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t text-center text-sm text-gray-500 py-4">
        © 2026 Mentor Pro. Mentorat de carrière en architecture.
      </div>
    </footer>
  );
}