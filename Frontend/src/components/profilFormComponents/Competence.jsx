import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaTools } from "react-icons/fa";
import axiosClient from "../../api/axios";

const competenceSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom de la compétence est requis"),

  category: z
    .string()
    .min(2, "La catégorie est requise"),
});

function CompetenceForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(competenceSchema),
    defaultValues: {
      name: "",
      category: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosClient.post("/competences", data);
      console.log("Competence saved:", res.data);
      reset();
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
   
        <div className=" flex items-center justify-center py-10">
          <div className="bg-white rounded-2xl p-6 md:p-8 ">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <FaTools className="text-blue-600 text-lg" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Nouvelle compétence
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
                  Nom de la compétence
                </label>
                <input
                  type="text"
                  placeholder="ex: AutoCAD"
                  className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
                  Catégorie
                </label>
                <input
                  type="text"
                  placeholder="ex: Logiciel / Technique / Soft Skill"
                  className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                  {...register("category")}
                />
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.category.message}
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
    
  );
}

export default CompetenceForm;