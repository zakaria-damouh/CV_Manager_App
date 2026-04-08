import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaBriefcase } from "react-icons/fa";

const profileSchema = z.object({
  firstName: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères"),

  lastName: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères"),

  professionalTitle: z
    .string()
    .min(3, "Le titre professionnel est requis"),

  contact: z
    .string()
    .min(5, "Le contact est requis"),

  summary: z
    .string()
    .min(10, "La bio professionnelle doit contenir au moins 10 caractères")
    .max(500, "La bio professionnelle ne doit pas dépasser 500 caractères"),

  externalLinks: z.string().optional().or(z.literal("")),
});

function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      professionalTitle: "",
      contact: "",
      summary: "",
      externalLinks: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Profile data:", data);
  };

  return (
    <section className="w-full bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Éditeur de Profil
          </h1>
          <p className="text-gray-600 text-lg">
            Affinez votre identité professionnelle pour maximiser l&apos;impact
            de vos candidatures.
          </p>
        </div>

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
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
                  Prénom
                </label>
                <input
                  type="text"
                  placeholder="ex: Alexandre"
                  className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  placeholder="ex: Martin"
                  className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
                Titre professionnel
              </label>
              <input
                type="text"
                placeholder="ex: Architecte Senior spécialisé en BIM"
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                {...register("professionalTitle")}
              />
              {errors.professionalTitle && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.professionalTitle.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
                Contact
              </label>
              <input
                type="text"
                placeholder="ex: alexandre@email.com | +212 6 12 34 56 78"
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                {...register("contact")}
              />
              {errors.contact && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contact.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
                Bio professionnelle
              </label>
              <textarea
                rows={5}
                placeholder="Décrivez votre vision et vos points forts..."
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none resize-none focus:border-blue-500"
                {...register("summary")}
              />
              {errors.summary && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.summary.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
                Liens externes
              </label>
              <input
                type="text"
                placeholder="ex: LinkedIn, Portfolio, GitHub..."
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                {...register("externalLinks")}
              />
              {errors.externalLinks && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.externalLinks.message}
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ProfileForm;