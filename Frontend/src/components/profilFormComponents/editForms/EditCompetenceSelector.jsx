import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosClient from "@/api/axios";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { RiLoader2Fill } from "react-icons/ri";

const schema = z.object({
  competenceId: z
    .string()
    .min(1, "Competence is required")
    .transform((val) => Number(val)),

  level: z.string().min(1, "Level is required"),
});

const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];

function EditCompetenceSelector({
  competence, // 👈 existing user competence
  setUserCompetences,
  setOpen,
}) {
  const [competences, setCompetences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      competenceId: "",
      level: "",
    },
  });

  // ✅ Fetch competences
  useEffect(() => {
    const fetchCompetences = async () => {
      try {
        const res = await axiosClient.get("/competences");
        setCompetences(res.data);
      } catch (error) {
        console.error("Error fetching competences:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchCompetences();
  }, []);

  // ✅ Prefill data when competence changes
  useEffect(() => {
    if (competence) {
      setValue("competenceId", String(competence.competenceId));
      setValue("level", competence.level);
    }
  }, [competence, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await axiosClient.put(
        `/user-competences/${competence.id}`,
        data
      );

      // ✅ Update in state
      setUserCompetences((prev) =>
        prev.map((item) =>
          item.id === competence.id ? res.data : item
        )
      );

      reset();
      setOpen(false);
    } catch (error) {
      console.error(error);

      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";

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
    <div className="bg-white rounded-2xl p-6 md:p-8">
      <h2 className="text-xl font-bold mb-6">Edit Skill</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Error */}
        {errorMessage && (
          <div className="bg-red-100 text-red-600 text-sm px-3 py-2 rounded-lg">
            {errorMessage}
          </div>
        )}

        {/* Competence */}
        <div>
          <label className="block text-sm font-semibold uppercase text-gray-700 mb-2">
            Skill
          </label>

          <Select
            onValueChange={(value) => setValue("competenceId", value)}
            value={watch("competenceId")}
          >
            <SelectTrigger className="w-full">
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
            <SelectTrigger className="w-full">
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
        <div>
          {loading ? (
            <Button disabled className="w-full flex items-center justify-center">
              Updating...
              <RiLoader2Fill className="animate-spin ml-2" />
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              Update Skill
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default EditCompetenceSelector;