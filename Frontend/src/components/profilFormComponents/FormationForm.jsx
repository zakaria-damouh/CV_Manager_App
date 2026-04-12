import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGraduationCap } from "react-icons/fa";
import axiosClient from "../../api/axios";
import { RiLoader2Fill } from "react-icons/ri";

const formationSchema = z.object({
  institution: z
    .string()
    .min(2, "L'établissement doit contenir au moins 2 caractères"),

  degree: z
    .string()
    .min(2, "Le diplôme est requis"),

  specialty: z
    .string()
    .min(2, "La spécialité est requise"),

  startDate: z
    .string()
    .min(1, "La date de début est requise"),

  endDate: z
    .string()
    .min(1, "La date de fin est requise"),

  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caractères")
    .max(1000, "La description est trop longue"),
});

function FormationForm({ setOpen, setFormations}) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formationSchema),
    defaultValues: {
      institution: "",
      degree: "",
      specialty: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formattedData = {
        ...data,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
      };

      const res = await axiosClient.post("/formations", formattedData);
      setFormations((prev) => [...prev, res.data.formation]);
      reset();
      setOpen(false);
    } catch (error) {
      console.error("Erreur:", error);
    }finally {
      setLoading(false);
    }
  };

  return (


        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <FaGraduationCap className="text-blue-600 text-lg" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Nouvelle formation
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
                Établissement
              </label>
              <input
                type="text"
                placeholder="ex: ENSA Safi"
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                {...register("institution")}
              />
              {errors.institution && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.institution.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
                Diplôme
              </label>
              <input
                type="text"
                placeholder="ex: Master"
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                {...register("degree")}
              />
              {errors.degree && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.degree.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
                Spécialité
              </label>
              <input
                type="text"
                placeholder="ex: Architecture et BIM"
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                {...register("specialty")}
              />
              {errors.specialty && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.specialty.message}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
                  Date de début
                </label>
                <input
                  type="date"
                  className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                  {...register("startDate")}
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.startDate.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
                  Date de fin
                </label>
                <input
                  type="date"
                  className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                  {...register("endDate")}
                />
                {errors.endDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
                Description
              </label>
              <textarea
                rows={5}
                placeholder="Décrivez votre parcours, vos projets ou réalisations académiques..."
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
              {loading ? (
                <button
                  type="button"
                  disabled={true}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
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
              )}
            </div>
          </form>
        </div>

  );
}

export default FormationForm;