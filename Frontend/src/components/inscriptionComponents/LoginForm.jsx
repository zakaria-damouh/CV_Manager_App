import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

// Zod schema for validation
const schema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe minimum 6 caractères"),
});

export default function LoginSection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Login data:", data);
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Bon retour</h2>
          <p className="text-gray-500 text-sm">
            Connectez-vous à votre espace Mentor Pro
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-700">Adresse e-mail</label>
            <input
              type="email"
              placeholder="nom@example.com"
              className="w-full border mt-1 p-2 rounded"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between text-sm">
              <label className="text-gray-700">Mot de passe</label>
              <span className="text-blue-600 cursor-pointer">
                Mot de passe oublié ?
              </span>
            </div>

            <input
              type="password"
              placeholder="********"
              className="w-full border mt-1 p-2 rounded"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Se connecter
          </button>
        </form>
        
        {/* Register */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Nouveau sur Mentor Pro ?{" "}
          <Link to="/signup">
            <span className="text-blue-600 cursor-pointer">
              Créer un compte
            </span>
          </Link>
        </p>

      </div>
    </section>
  );
}