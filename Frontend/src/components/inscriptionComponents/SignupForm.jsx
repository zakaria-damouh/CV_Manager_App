import axiosClient from "@/api/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const schema = z
  .object({
    firstName: z.string().min(2, "Prénom doit contenir au moins 2 caractères"),
    lastName: z.string().min(2, "Nom doit contenir au moins 2 caractères"),
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Mot de passe min 6 caractères"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),  
  });

  const onSubmit = async (data) => {
  try {
    const res = await axiosClient.post("/auth/register", data);
    console.log("Signup success:", res.data);
  } catch (err) {
    console.log("Error:", err.response?.data);
  }
};

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold">Mentor Pro</h2>
          <h3 className="text-2xl font-semibold mt-2">Créez votre compte</h3>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div className="flex gap-3">
            <input
              {...register("firstName")}
              placeholder="Prénom"
              className="w-1/2 border p-2 rounded"
            />
            <input
              {...register("lastName")}
              placeholder="Nom"
              className="w-1/2 border p-2 rounded"
            />
          </div>
          <p className="text-red-500 text-sm">
            {errors.firstName?.message || errors.lastName?.message}
          </p>

          <input
            {...register("email")}
            placeholder="Email"
            className="w-full border p-2 rounded"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>

          <input
            type="password"
            {...register("password")}
            placeholder="Mot de passe"
            className="w-full border p-2 rounded"
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>

          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirmer mot de passe"
            className="w-full border p-2 rounded"
          />
          <p className="text-red-500 text-sm">
            {errors.confirmPassword?.message}
          </p>

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            S'inscrire
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Utilisateur sur Mentor Pro ?{" "}
          <Link to="/login">
            <span className="text-blue-600 cursor-pointer">
              Se connecter
            </span>
          </Link>
        </p>
      </div>
    </section>
  );
}
export default SignupForm;