import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlinePencil,
} from "react-icons/hi";
import ExperienceForm from "@/components/profilFormComponents/ExperienceForm";

function ExperienceCard({ experience, onSubmit, loading }) {
  if (!experience) return null;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
    });

  return (
  <Card className="h-full flex flex-col rounded-2xl shadow-sm border border-gray-100">
  <CardContent className="p-6 flex flex-col h-full">

    {/* 🔝 HEADER */}
    <div className="flex items-start justify-between">

      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
          <HiOutlineBriefcase size={22} />
        </div>

        {/* Position + Company */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {experience.position}
          </h2>
          <p className="text-sm text-gray-500">
            {experience.company}
          </p>
        </div>
      </div>

      {/* Edit */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <HiOutlinePencil size={18} className="text-gray-600" />
          </Button>
        </DialogTrigger>

        <DialogContent className="!max-w-4xl">
          <ExperienceForm
            initialData={experience}
            onSubmit={onSubmit}
            loading={loading}
          />
        </DialogContent>
      </Dialog>
    </div>

    {/* 🪪 META */}
    <div className="mt-4 flex items-center justify-between flex-wrap gap-2">

      {/* Order badge */}
      <Badge variant="secondary">
        #{experience.order}
      </Badge>

      {/* Dates */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <HiOutlineCalendar size={16} />
        <span>
          {formatDate(experience.startDate)} —{" "}
          {experience.endDate
            ? formatDate(experience.endDate)
            : "Present"}
        </span>
      </div>
    </div>

    {/* 🧠 CONTENT */}
    <div className="mt-5 flex-1 space-y-4">

      {/* Description */}
      {experience.description && (
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase mb-1">
            Description
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
            {experience.description}
          </p>
        </div>
      )}

      {/* Competences */}
      {experience.experienceCompetences?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {experience.experienceCompetences.map((comp) => (
            <Badge key={comp.id} variant="outline">
              {comp.name}
            </Badge>
          ))}
        </div>
      )}
    </div>

    {/* 📅 FOOTER */}
    <div className="mt-6 pt-4 border-t text-xs text-gray-500 space-y-1">
      <div>
        Created:{" "}
        {new Date(experience.createdAt).toLocaleDateString()}
      </div>
      <div>
        Updated:{" "}
        {new Date(experience.updatedAt).toLocaleDateString()}
      </div>
    </div>

  </CardContent>
</Card>
  );
}

export default ExperienceCard;