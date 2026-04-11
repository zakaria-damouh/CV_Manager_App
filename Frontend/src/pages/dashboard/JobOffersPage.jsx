import React, { useEffect, useState } from "react";
import axiosClient from "@/api/axios";
import OffreCard from "@/components/clientComponents/Offres/OffreCard";
import OffersForm from "@/components/profilFormComponents/JobOfferForm";

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
      setOffres(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Erreur lors du chargement des offres :", err);
      setError("Impossible de charger les offres");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(offre) {
    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer l'offre "${offre.title}" ?`
    );

    if (!confirmed) return;

    try {
      await axiosClient.delete(`/offres/${offre.id}`);
      setOffres((prev) => prev.filter((item) => item.id !== offre.id));
    } catch (error) {
      console.error("Erreur suppression:", error);
    }
  }

  return (
    <section className="w-full bg-gray-100 py-12">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="mb-2 text-4xl font-bold text-gray-900">
              Gestion des Offres d'emploi
            </h1>
            <p className="text-lg text-gray-600">
              Consultez et ajoutez vos offres d'emploi.
            </p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-lg">
                Add Offer +
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

        {loading && (
          <p className="text-sm text-gray-600">Chargement des offres...</p>
        )}

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {!loading && !error && offres.length === 0 && (
          <div className="rounded-2xl border bg-white p-8 text-center text-gray-600 shadow-sm">
            Aucune offre trouvée.
          </div>
        )}

        {!loading && !error && offres.length > 0 && (
          <div className="space-y-4">
            {offres.map((offre) => (
              <OffreCard
                key={offre._id}
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