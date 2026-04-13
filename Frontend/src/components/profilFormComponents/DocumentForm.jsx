import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaFileAlt } from "react-icons/fa";
import axiosClient from "../../api/axios";
import { RiLoader2Fill } from "react-icons/ri";

// ✅ ENUM validation (strict values for backend)
const documentSchema = z.object({
  type: z.enum(
    ["CV", "cover_letter", "profile_summary", "application_email"],
    {
      errorMap: () => ({ message: "Type de document invalide" }),
    }
  ),
  offreId: z.string().optional(),
});

// ✅ Label (UI) ↔ Value (backend)
const documentTypes = [
  { label: "CV", value: "CV" },
  { label: "Lettre de motivation", value: "cover_letter" },
  { label: "Résumé de profil", value: "profile_summary" },
  { label: "Email de candidature", value: "application_email" },
];

function DocumentForm({ setDocuments, setOpen }) {
  const [offres, setOffres] = useState([]);
  const [loading , setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      type: "",
      offreId: "",
    },
  });

  // ✅ Fetch offres
  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const res = await axiosClient.get("/offres");
        setOffres(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des offres", err);
      }
    };

    fetchOffres();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        type: data.type, // already correct enum value
        ...(data.offreId && { offreId: Number(data.offreId) }),
      };

      const res = await axiosClient.post("/documents/generate", payload);
      setDocuments((prev) => [...prev, res.data]);

      reset();
      setOpen(false);
    } catch (error) {
      console.error("Erreur:", error);
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
          <FaFileAlt className="text-blue-600 text-lg" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Nouveau document
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Type */}
        <div>
          <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
            Type de document
          </label>

          <select
            className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
            {...register("type")}
          >
            <option value="">-- Sélectionnez un type --</option>

            {documentTypes.map((doc) => (
              <option key={doc.value} value={doc.value}>
                {doc.label}
              </option>
            ))}
          </select>

          {errors.type && (
            <p className="text-red-500 text-sm mt-1">
              {errors.type.message}
            </p>
          )}
        </div>

        {/* Offres */}
        <div>
          <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
            Offre (optionnel)
          </label>

          <select
            className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
            {...register("offreId")}
          >
            <option value="">-- Aucune offre --</option>

            {offres.map((offre) => (
              <option key={offre.id} value={offre.id}>
                {offre.title || `Offre #${offre.id}`}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <div className="pt-2">
          {
            loading ? (
               <button
                type="submit"
                disabled
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                Enregistrement
                <RiLoader2Fill className="animate-spin " />
              </button>
             
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
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

export default DocumentForm;