import React from "react";


function HeroSection() {
  return (
     <section className="w-full bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        
        <div>
          <span className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full">
            Succès de carrière avec l'IA
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 leading-tight">
            Trouvez votre <span className="text-blue-600">emploi de rêve</span> avec précision
          </h1>

          <p className="text-gray-600 mt-4">
            Une plateforme intelligente pour créer un CV performant,
            optimiser pour les systèmes ATS et améliorer votre parcours professionnel.
          </p>

          <div className="mt-6 flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Commencer gratuitement
            </button>

            <button className="bg-gray-200 px-6 py-3 rounded-lg">
              Voir la démo
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
        <img
          src={"/images/img1Home.png"}
          alt="Accueil"
          className="w-full rounded-2xl shadow-lg"
        />
      </div>

      </div>
    </section>
  );
}
export default HeroSection;


