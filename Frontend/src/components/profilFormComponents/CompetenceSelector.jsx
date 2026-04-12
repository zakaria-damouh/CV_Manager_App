import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosClient from "@/api/axios";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { RiLoader2Fill } from "react-icons/ri";
import { HiOutlineCode } from "react-icons/hi";

const schema = z.object({
  competenceId: z
    .string()
    .min(1, "Competence is required")
    .transform((val) => Number(val)),

  level: z.string().min(1, "Level is required"),
});

const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];

function CompetenceSelector({ setUserCompetences, setOpen }) {
  const [competences, setCompetences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      competenceId: "",
      level: "",
    },
  });

  useEffect(() => {
    const fetchCompetences = async () => {
      try {
        const res = await axiosClient.get("/competences");
        setCompetences(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setFetching(false);
      }
    };

    fetchCompetences();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await axiosClient.post("/user-competences", data);
      setUserCompetences((prev) => [...prev, res.data]);

      reset();
      setOpen(false);
    } catch (error) {
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Something went wrong.";

      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center py-10">
        <RiLoader2Fill className="animate-spin text-2xl text-blue-600" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 ">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
          <HiOutlineCode className="text-purple-600 text-lg" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Add Skill
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Global Error */}
        {errorMessage && (
          <div className="bg-red-100 text-red-600 text-sm px-3 py-2 rounded-lg">
            {errorMessage}
          </div>
        )}

        {/* Skill */}
        <div>
          <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
            Skill
          </label>

          <Select
            onValueChange={(value) => setValue("competenceId", value)}
            value={watch("competenceId")}
          >
            <SelectTrigger className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-md focus:border-purple-500">
              <SelectValue placeholder="Select skill" />
            </SelectTrigger>

            <SelectContent>
              {competences.map((comp) => (
                <SelectItem key={comp.id} value={String(comp.id)}>
                  {comp.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {errors.competenceId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.competenceId.message}
            </p>
          )}
        </div>

        {/* Level */}
        <div>
          <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
            Level
          </label>

          <Select
            onValueChange={(value) => setValue("level", value)}
            value={watch("level")}
          >
            <SelectTrigger className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-md focus:border-purple-500">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>

            <SelectContent>
              {levels.map((lvl) => (
                <SelectItem key={lvl} value={lvl}>
                  {lvl}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {errors.level && (
            <p className="text-red-500 text-sm mt-1">
              {errors.level.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="pt-2">
          {loading ? (
            <button
              disabled
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-3 rounded-lg opacity-50 cursor-not-allowed"
            >
              Adding...
              <RiLoader2Fill className="animate-spin" size={18} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
            >
              {isSubmitting ? "Adding..." : "Add Skill"}
            </button>
          )}
        </div>

      </form>
    </div>
  );
}

export default CompetenceSelector;