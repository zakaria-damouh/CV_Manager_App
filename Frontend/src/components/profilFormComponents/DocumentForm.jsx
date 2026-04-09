import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaFileAlt } from "react-icons/fa";
import axiosClient from "../../api/axios";

const documentSchema = z.object({
  type: z.string().min(1, "Le type de document est requis"),

  content: z
    .string()
    .min(10, "Le contenu doit contenir au moins 10 caractères")
    .max(5000, "Le contenu est trop long"),

  aiModelUsed: z
    .string()
    .min(2, "Le modèle IA utilisé est requis"),
});

const documentTypes = [
  "CV",
  "Lettre de motivation",
  "Résumé de profil",
  "Email de candidature",
];

const aiModels = [
  "GPT-4",
  "GPT-4 Turbo",
  "GPT-3.5",
  "Claude",
  "Gemini",
  "Autre",
];

function DocumentForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      type: "",
      content: "",
      aiModelUsed: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosClient.post("/documents", data);
      console.log("Document saved:", res.data);
      reset();
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <section className="w-full bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Gestion des Documents
          </h1>
          <p className="text-gray-600 text-lg">
            Générez et enregistrez vos documents professionnels assistés par l&apos;IA.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <FaFileAlt className="text-blue-600 text-lg" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Nouveau document
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
                Type de document
              </label>
              <select
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                {...register("type")}
              >
                <option value="">-- Sélectionnez un type --</option>
                {documentTypes.map((docType) => (
                  <option key={docType} value={docType}>
                    {docType}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.type.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
                Modèle IA utilisé
              </label>
              <select
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                {...register("aiModelUsed")}
              >
                <option value="">-- Sélectionnez un modèle IA --</option>
                {aiModels.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
              {errors.aiModelUsed && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.aiModelUsed.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
                Contenu
              </label>
              <textarea
                rows={8}
                placeholder="Écrivez ou collez ici le contenu du document..."
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none resize-none focus:border-blue-500"
                {...register("content")}
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.content.message}
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
    </section>
  );
}

export default DocumentForm;