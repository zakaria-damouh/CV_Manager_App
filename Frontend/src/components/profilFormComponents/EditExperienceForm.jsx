import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaBriefcase } from "react-icons/fa";
import axiosClient from "../../api/axios";
import { RiLoader2Fill } from "react-icons/ri";

const experienceSchema = z.object({
  position: z.string().min(2, "Le poste doit contenir au moins 2 caractères"),
  company: z.string().min(2, "Le nom de l'entreprise est requis"),
  startDate: z.string().min(1, "La date de début est requise"),
  endDate: z.string().min(1, "La date de fin est requise"),
  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caractères")
    .max(1000, "La description est trop longue"),
  order: z.coerce.number().min(1, "L'ordre doit être ≥ 1"),
});

function EditExperienceForm({ experience, setExperiences, setOpen }) {
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

  // ✅ SAFER date formatter
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  // ✅ FIX: reset only when experience is ready
  useEffect(() => {
    if (!experience) return;

    reset({
      position: experience.position ?? "",
      company: experience.company ?? "",
      startDate: formatDate(experience.startDate),
      endDate: formatDate(experience.endDate),
      description: experience.description ?? "",
      order: experience.order ?? 1,
    });
  }, [experience, reset]);

  const onSubmit = async (data) => {
    if (!experience) return;

    setLoading(true);

    try {
      const formattedData = {
        ...data,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
      };

      const res = await axiosClient.put(
        `/experiences/${experience.id}`,
        formattedData
      );

      // ✅ update state
      setExperiences((prev) =>
        prev.map((exp) =>
          exp.id === experience.id ? res.data.experience : exp
        )
      );

      setOpen(false);
    } catch (error) {
      console.error("Erreur update:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!experience) return null; // ✅ safety

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
          <FaBriefcase className="text-yellow-600 text-lg" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Modifier l'expérience
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Poste */}
        <div>
          <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
            Poste
          </label>
          <input
            type="text"
            {...register("position")}
            className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 focus:border-yellow-500"
          />
          {errors.position && (
            <p className="text-red-500 text-sm">{errors.position.message}</p>
          )}
        </div>

        {/* Entreprise */}
        <div>
          <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
            Entreprise
          </label>
          <input
            type="text"
            {...register("company")}
            className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 focus:border-yellow-500"
          />
          {errors.company && (
            <p className="text-red-500 text-sm">{errors.company.message}</p>
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
              {...register("startDate")}
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3"
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
              Date de fin
            </label>
            <input
              type="date"
              {...register("endDate")}
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3"
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm">{errors.endDate.message}</p>
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
            {...register("description")}
            className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Order */}
        <div>
          <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
            Ordre
          </label>
          <input
            type="number"
            min="1"
            {...register("order")}
            className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3"
          />
          {errors.order && (
            <p className="text-red-500 text-sm">{errors.order.message}</p>
          )}
        </div>

        {/* Submit */}
        <div className="pt-2">
          {loading ? (
            <button
              disabled
              className="flex items-center gap-2 bg-yellow-600 text-white px-4 py-3 rounded-lg opacity-50"
            >
              Mise à jour
              <RiLoader2Fill className="animate-spin" size={18} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700"
            >
              Mettre à jour
            </button>
          )}
        </div>

      </form>
    </div>
  );
}

export default EditExperienceForm;