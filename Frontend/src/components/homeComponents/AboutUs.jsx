import React from "react";
import { FaFileAlt ,FaUser, FaChartBar } from "react-icons/fa";

export default function AboutUs() {
  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Des outils précis pour le candidat moderne.
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl">
            Tout ce dont vous avez besoin pour surpasser la concurrence et décrocher votre premier emploi.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="bg-blue-100 w-10 h-10 flex items-center justify-center rounded-md mb-4">
              <FaFileAlt   className="text-blue-600 text-lg" />
            </div>

            <h3 className="font-semibold text-gray-900 mb-2">
              Génération de documents IA
            </h3>

            <p className="text-sm text-gray-600">
              Créez des CV et lettres de motivation adaptés à des offres spécifiques en quelques secondes.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="bg-blue-100 w-10 h-10 flex items-center justify-center rounded-md mb-4">
              <FaUser className="text-blue-600 text-lg" />
            </div>

            <h3 className="font-semibold text-gray-900 mb-2">
              Créateur de profil intelligent
            </h3>

            <p className="text-sm text-gray-600">
              Centralisez vos expériences, stages et compétences dans un espace optimisé par l’IA.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="bg-blue-100 w-10 h-10 flex items-center justify-center rounded-md mb-4">
              <FaChartBar className="text-blue-600 text-lg" />
            </div>

            <h3 className="font-semibold text-gray-900 mb-2">
              Optimisation ATS
            </h3>

            <p className="text-sm text-gray-600">
              Assurez-vous que vos documents sont parfaitement lisibles par les systèmes de recrutement automatisés.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}