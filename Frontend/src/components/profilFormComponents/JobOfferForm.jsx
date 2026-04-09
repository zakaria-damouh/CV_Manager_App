import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaBriefcase } from "react-icons/fa";
import axiosClient from "../../api/axios";

const offreSchema = z.object({
  title: z
    .string()
    .min(3, "Le titre du poste est requis"),

  company: z
    .string()
    .min(2, "Le nom de l'entreprise est requis"),

  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caractères")
    .max(2000, "La description est trop longue"),
});

function OffreForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(offreSchema),
    defaultValues: {
      title: "",
      company: "",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosClient.post("/offres", data);
      console.log("Offre saved:", res.data);
      reset();
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <section className="w-full bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Gestion des Offres d'emploi
          </h1>
          <p className="text-gray-600 text-lg">
            Ajoutez des offres d'emploi pour adapter vos candidatures.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <FaBriefcase className="text-blue-600 text-lg" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Nouvelle offre
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
                Titre du poste
              </label>
              <input
                type="text"
                placeholder="ex: Architecte Junior"
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
                Entreprise
              </label>
              <input
                type="text"
                placeholder="ex: Cabinet XYZ"
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                {...register("company")}
              />
              {errors.company && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.company.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
                Description de l'offre
              </label>
              <textarea
                rows={6}
                placeholder="Collez ou décrivez l'offre d'emploi ici..."
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none resize-none focus:border-blue-500"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default OffreForm;