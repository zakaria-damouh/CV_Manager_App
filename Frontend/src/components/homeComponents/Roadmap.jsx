import React from "react";

 function Roadmap() {
  return (
    <section className="w-full bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16">
          Votre parcours vers l’emploi.
        </h2>

        {/* Timeline */}
        <div className="relative">
          
          {/* Line */}
          <div className="hidden md:block absolute top-6 left-0 w-full h-[2px] bg-gray-200"></div>

          <div className="grid md:grid-cols-3 gap-10">

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-white shadow-md w-14 h-14 flex items-center justify-center rounded-xl mb-6 z-10">
                <span className="text-blue-600 font-bold">01</span>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2">
                Complétez votre profil
              </h3>

              <p className="text-sm text-gray-600 max-w-xs">
                Ajoutez vos informations une seule fois. Notre IA organise votre profil pour un impact maximal.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-white shadow-md w-14 h-14 flex items-center justify-center rounded-xl mb-6 z-10">
                <span className="text-blue-600 font-bold">02</span>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2">
                Ajoutez une offre d’emploi
              </h3>

              <p className="text-sm text-gray-600 max-w-xs">
                Collez le lien ou la description d’une offre. L’IA analyse les exigences automatiquement.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-600 text-white shadow-md w-14 h-14 flex items-center justify-center rounded-xl mb-6 z-10">
                <span className="font-bold">03</span>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2">
                Générez et exportez
              </h3>

              <p className="text-sm text-gray-600 max-w-xs">
                Téléchargez un CV optimisé en PDF prêt à être envoyé en un clic.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
export default Roadmap;