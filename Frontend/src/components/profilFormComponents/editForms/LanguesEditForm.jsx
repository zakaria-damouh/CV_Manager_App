import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaLanguage } from "react-icons/fa";
import { RiLoader2Fill } from "react-icons/ri";
import axiosClient from "@/api/axios";

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

function LanguesEditForm({ langue, setLangues, setOpen }) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(langueSchema),
    defaultValues: {
      name: langue?.name || "",
      level: langue?.level || "",
    },
  });

  // ✅ Ensure reset when langue changes
  useEffect(() => {
    if (langue) {
      reset({
        name: langue.name ?? "",
        level: langue.level ?? "",
      });
    }
  }, [langue, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axiosClient.put(
        `/langues/${langue.id}`,
        data
      );

      setLangues((prev) =>
        prev.map((l) =>
          l.id === langue.id ? res.data : l
        )
      );

      setOpen(false);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!langue) return null;

  return (
    <div className="bg-white rounded-2xl py-10 px-2">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
          <FaLanguage className="text-blue-600 text-lg" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Modifier langue
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Language */}
        <div>
          <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
            Langue
          </label>
          <select
            {...register("name")}
            className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="">-- Sélectionnez une langue --</option>
            {languagesList.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Level */}
        <div>
          <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
            Niveau
          </label>
          <select
            {...register("level")}
            className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
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

        {/* Submit */}
        <div className="pt-2">
          {loading ? (
            <button
              type="button"
              disabled
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg opacity-50"
            >
              Mise à jour
              <RiLoader2Fill className="animate-spin ml-2" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              Mettre à jour
            </button>
          )}
        </div>

      </form>
    </div>
  );
}

export default LanguesEditForm;