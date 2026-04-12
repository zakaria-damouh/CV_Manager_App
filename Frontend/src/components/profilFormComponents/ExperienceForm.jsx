import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaBriefcase } from "react-icons/fa";
import axiosClient from "../../api/axios";
import { RiLoader2Fill } from "react-icons/ri";

const experienceSchema = z.object({
  position: z
    .string()
    .min(2, "Le poste doit contenir au moins 2 caractères"),

  company: z
    .string()
    .min(2, "Le nom de l'entreprise est requis"),

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

  order: z.coerce
    .number()
    .min(1, "L'ordre doit être supérieur ou égal à 1"),
});

function ExperienceForm({ setOpen ,setExperiences }) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      position: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      order: 1,
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
      const res = await axiosClient.post("/experiences", formattedData);
      setExperiences((prev) => [...prev, res.data.experience]);
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
              <FaBriefcase className="text-blue-600 text-lg" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Nouvelle expérience
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
                Poste
              </label>
              <input
                type="text"
                placeholder="ex: Architecte Junior"
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                {...register("position")}
              />
              {errors.position && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.position.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
                Entreprise
              </label>
              <input
                type="text"
                placeholder="ex: Atelier Vision"
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                {...register("company")}
              />
              {errors.company && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.company.message}
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
                placeholder="Décrivez vos missions, responsabilités et réalisations..."
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none resize-none focus:border-blue-500"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
                Ordre
              </label>
              <input
                type="number"
                min="1"
                placeholder="1"
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                {...register("order")}
              />
              {errors.order && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.order.message}
                </p>
              )}
            </div>

            <div className="pt-2">
              {loading ? (
                  <button
                    disabled
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg opacity-50 cursor-not-allowed"
                  >
                    Enregistrement
                    <RiLoader2Fill className="animate-spin mr-2" size={18} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "Enregistrement..." : "Enregistrer"}
              </button>
                )
              }
            </div>
          </form>
        </div>
  );
}

export default ExperienceForm;