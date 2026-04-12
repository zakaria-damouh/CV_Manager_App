import React, { useEffect, useState } from "react";
import axiosClient from "@/api/axios";
import OffreCard from "@/components/clientComponents/Offres/OffreCard";
import OffersForm from "@/components/profilFormComponents/JobOfferForm";
import { FaBriefcase, FaPlusCircle } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function OffrePage() {
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchOffres();
  }, []);

  async function fetchOffres() {
    try {
      setLoading(true);
      setError("");

      const res = await axiosClient.get("/offres");
      setOffres(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des offres :", err);
      setError("Impossible de charger les offres");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(offre) {
    try {
      await axiosClient.delete(`/offres/${offre.id}`);

      setOffres((prev) =>
        prev.filter((item) => item.id !== offre.id)
      );
    } catch (error) {
      console.error("Erreur suppression:", error);
    }
  }

  return (
    <section className="w-full bg-gray-100 ">
      <div className="mx-auto max-w-full px-4">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="mb-2 text-4xl font-bold text-gray-900">
              Gestion des Offres d'emploi
            </h1>
            <p className="text-lg text-gray-600">
              Consultez et ajoutez vos offres d'emploi.
            </p>
          </div>

          {offres.length > 0 && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-[0.98]">
                  <FaPlusCircle className="text-base" />
                  Ajouter une offre
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-2xl">
            
                <OffersForm
                  onSuccess={(newOffre) => {
                    setOffres((prev) => [newOffre, ...prev]);
                    setOpen(false);
                  }}
                />
              </DialogContent>
            </Dialog>
          )}
        </div>

        {!loading && !error && offres.length === 0 && (
          <div className="rounded-3xl border border-gray-200 bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto flex max-w-md flex-col items-center">
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                <FaBriefcase className="text-3xl text-blue-600" />
              </div>

              <h3 className="mb-2 text-2xl font-bold text-gray-900">
                Aucune offre trouvée
              </h3>

              <p className="mb-6 text-sm leading-6 text-gray-500">
                Vous n'avez pas encore ajouté d'offre d'emploi. Cliquez sur le bouton
                ci-dessous pour créer votre première offre et commencer à organiser
                vos candidatures.
              </p>

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-[0.98]">
                    <FaPlusCircle className="text-base" />
                    Ajouter une offre
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-2xl">

                  <OffersForm
                    onSuccess={(newOffre) => {
                      setOffres((prev) => [newOffre, ...prev]);
                      setOpen(false);
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}

        {!loading && !error && offres.length > 0 && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {offres.map((offre, index) => (
                <OffreCard
                  key={offre.id || offre._id || index}
                  offre={offre}
                  onDelete={handleDelete}
                />
              ))}
</div>
        )}
      </div>
    </section>
  );
}

export default OffrePage;