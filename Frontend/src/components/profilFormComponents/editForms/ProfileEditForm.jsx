import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaBriefcase } from "react-icons/fa";
import { RiLoader2Fill } from "react-icons/ri";
import axiosClient from "@/api/axios";

const profileSchema = z.object({
  professionalTitle: z.string().min(3, "Le titre professionnel est requis"),
  contact: z.string().min(5, "Le contact est requis"),
  summary: z
    .string()
    .min(10, "La bio professionnelle doit contenir au moins 10 caractères")
    .max(500, "Max 500 caractères"),
  externalLinks: z.string().optional().or(z.literal("")),
});

function ProfileEditForm({ profile , setUserData, setOpen }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      professionalTitle: "",
      contact: "",
      summary: "",
      externalLinks: "",
    },
  });
  const [loading, setLoading] = useState(false);

  // ✅ Fill form when profile is loaded
  useEffect(() => {
    if (profile) {
      reset({
        professionalTitle: profile.professionalTitle || "",
        contact: profile.contact || "",
        summary: profile.summary || "",
        externalLinks: profile.externalLinks || "",
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axiosClient.put(`/profile`, data);
      setUserData((prev) => ({ ...prev, profile: res.data.profile }));
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
              Informations de base
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
                Titre professionnel
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                {...register("professionalTitle")}
              />
              {errors.professionalTitle && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.professionalTitle.message}
                </p>
              )}
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
                Contact
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                {...register("contact")}
              />
              {errors.contact && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contact.message}
                </p>
              )}
            </div>

            {/* Summary */}
            <div>
              <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
                Bio professionnelle
              </label>
              <textarea
                rows={5}
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none resize-none focus:border-blue-500"
                {...register("summary")}
              />
              {errors.summary && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.summary.message}
                </p>
              )}
            </div>

            {/* Links */}
            <div>
              <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
                Liens externes
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                {...register("externalLinks")}
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
                {loading ? 
                <button
                    type="button"
                    disabled
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg transition disabled:opacity-50"
                >
                    Mise à jour
                    <RiLoader2Fill className="animate-spin" />
                </button>

                :
                
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                    Mettre à jour
                </button>
                }
            </div>
          </form>
        </div>

  );
}

export default ProfileEditForm;