import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGraduationCap } from "react-icons/fa";
import { RiLoader2Fill } from "react-icons/ri";
import axiosClient from "@/api/axios";

const formationSchema = z.object({
  institution: z.string().min(2, "L'établissement est requis"),
  degree: z.string().min(2, "Le diplôme est requis"),
  specialty: z.string().min(2, "La spécialité est requise"),
  startDate: z.string().min(1, "Date de début requise"),
  endDate: z.string().min(1, "Date de fin requise"),
  description: z
    .string()
    .min(10, "Minimum 10 caractères")
    .max(1000, "Max 1000 caractères"),
});

function FormationEditForm({ formation, setFormations, setOpen }) {
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

  // ✅ Prefill
  useEffect(() => {
    if (formation) {
      reset({
        institution: formation.institution || "",
        degree: formation.degree || "",
        specialty: formation.specialty || "",
        startDate: formation.startDate?.split("T")[0] || "",
        endDate: formation.endDate?.split("T")[0] || "",
        description: formation.description || "",
      });
    }
  }, [formation, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formattedData = {
        ...data,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
      };

      const res = await axiosClient.put(
        `/formations/${formation.id}`,
        formattedData
      );

      setFormations((prev) =>
        prev.map((f) =>
          f.id === formation.id ? res.data.formation : f
        )
      );

      setOpen(false);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!formation) return null;

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
          <FaGraduationCap className="text-blue-600 text-lg" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Modifier formation
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Institution */}
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

        {/* Degree */}
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

        {/* Specialty */}
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

        {/* Dates */}
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

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
            Description
          </label>
          <textarea
            rows={5}
            placeholder="Décrivez votre parcours..."
            className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none resize-none focus:border-blue-500"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="pt-2">
          {loading ? (
            <button
              type="button"
              disabled
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
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

export default FormationEditForm;