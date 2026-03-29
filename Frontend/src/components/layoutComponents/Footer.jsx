import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8 text-gray-600">
        
        {/* Logo + Description */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            Mentor<span className="text-blue-600">Pro</span>
          </h2>
          <p className="text-sm mb-4">
            Améliorer la recherche de carrière des diplômés grâce à
            l'intelligence artificielle et à la réflexion en design
            architectural.
          </p>

          {/* Icons (simple) */}
          <div className="flex gap-4 text-gray-500 text-lg">
            <span>🌐</span>
            <span>✉️</span>
            <span>🔗</span>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Entreprise</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Politique de confidentialité</a></li>
            <li><a href="#">Conditions d'utilisation</a></li>
            <li><a href="#">Contactez-nous</a></li>
            <li><a href="#">Carrières</a></li>
          </ul>
        </div>

        {/* Product */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Produit</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Générateur de CV</a></li>
            <li><a href="#">Optimiseur ATS</a></li>
            <li><a href="#">Revue de profil</a></li>
            <li><a href="#">Tarification</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Newsletter</h3>
          <p className="text-sm mb-3">
            Recevez des conseils de carrière chaque semaine.
          </p>

          <input
            type="email"
            placeholder="Adresse e-mail"
            className="w-full mb-3 px-3 py-2 border rounded-md focus:outline-none"
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            S'abonner
          </button>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t text-center text-sm text-gray-500 py-4">
        © 2026 Mentor Pro. Mentorat de carrière en architecture.
      </div>
    </footer>
  );
}