import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaBriefcase } from "react-icons/fa";
import axiosClient from "../../api/axios";

const offreSchema = z.object({
  title: z.string().min(3, "Le titre du poste est requis"),
  company: z.string().min(2, "Le nom de l'entreprise est requis"),
  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caractères")
    .max(2000, "La description est trop longue"),
});

function OffersForm({ onSuccess }) {
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

      if (onSuccess) {
        onSuccess(res.data);
      }

      reset();
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <div className="bg-white">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
          <FaBriefcase className="text-lg text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Nouvelle offre
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-semibold uppercase text-gray-700">
            Titre du poste
          </label>
          <input
            type="text"
            placeholder="ex: Architecte Junior"
            className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
            {...register("title")}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold uppercase text-gray-700">
            Entreprise
          </label>
          <input
            type="text"
            placeholder="ex: Cabinet XYZ"
            className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
            {...register("company")}
          />
          {errors.company && (
            <p className="mt-1 text-sm text-red-500">{errors.company.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold uppercase text-gray-700">
            Description de l'offre
          </label>
          <textarea
            rows={6}
            placeholder="Collez ou décrivez l'offre d'emploi ici..."
            className="w-full resize-none rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
            {...register("description")}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default OffersForm;