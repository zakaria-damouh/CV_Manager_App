import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaLanguage } from "react-icons/fa";
import axiosClient from "../../api/axios";
import { RiLoader2Fill } from "react-icons/ri";

const langueSchema = z.object({
  name: z.string().min(1, "La langue est requise"),
  level: z.string().min(1, "Le niveau est requis"),
});

const languagesList = [
  "Français",
  "Anglais",
  "Arabe",
  "Espagnol",
  "Allemand",
  "Italien",
  "Portugais",
  "Chinois",
  "Japonais",
  "Coréen",
];

const levels = [
  "Débutant (A1-A2)",
  "Intermédiaire (B1-B2)",
  "Avancé (C1)",
  "Courant (C2)",
  "Bilingue",
  "Langue maternelle",
];

function LangueForm({ setLangues, setOpen }) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(langueSchema),
    defaultValues: {
      name: "",
      level: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axiosClient.post("/langues", data);
      setLangues((prev) => [...prev, res.data]);
      reset();
      setOpen(false);
    } catch (error) {
      console.error("Erreur:", error);
    }finally {
      setLoading(false);
    }
  };

  return (

        <div className="bg-white rounded-2xl py-10 px-2 ">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <FaLanguage className="text-blue-600 text-lg" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Nouvelle langue
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
                Langue
              </label>
              <select
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                {...register("name")}
              >
                <option value="">-- Sélectionnez une langue --</option>
                {languagesList.map((langue) => (
                  <option key={langue} value={langue}>
                    {langue}
                  </option>
                ))}
              </select>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
                Niveau
              </label>
              <select
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                {...register("level")}
              >
                <option value="">-- Sélectionnez un niveau --</option>
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
              {errors.level && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.level.message}
                </p>
              )}
            </div>

            <div className="pt-2">
              {loading 
                ? (<button
                    type="button"
                    disabled
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg transition opacity-50 cursor-not-allowed"
                  >
                    Enregistrement
                    <RiLoader2Fill className="animate-spin ml-2" />
                  </button>
                  ) : (

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    Enregistrer
                  </button>
                  )
                  }
            </div>
          </form>
        </div>

  );
}

export default LangueForm;