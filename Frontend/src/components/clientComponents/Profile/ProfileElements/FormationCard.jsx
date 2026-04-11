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
  HiOutlineAcademicCap,
  HiOutlineCalendar,
  HiOutlinePencil,
} from "react-icons/hi";
import FormationForm from "@/components/profilFormComponents/FormationForm";

function FormationCard({ formation, onSubmit, loading }) {
  if (!formation) return null;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
    });

  return (
    <Card className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">

      <CardContent className="p-6 flex flex-col h-full">

        {/* HEADER */}
        <div className="flex items-start justify-between">

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
              <HiOutlineAcademicCap size={22} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {formation.degree} — {formation.specialty}
              </h2>

              <p className="text-sm text-gray-500">
                {formation.institution}
              </p>
            </div>
          </div>

          {/* Edit */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <HiOutlinePencil size={18} />
              </Button>
            </DialogTrigger>

            <DialogContent className="!max-w-4xl">
              <FormationForm
                initialData={formation}
                onSubmit={onSubmit}
                loading={loading}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* DATES */}
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
          <HiOutlineCalendar size={16} />
          <span>
            {formatDate(formation.startDate)} —{" "}
            {formation.endDate
              ? formatDate(formation.endDate)
              : "Present"}
          </span>
        </div>

        {/* DESCRIPTION */}
        {formation.description && (
          <div className="mt-4 flex-1">
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
              {formation.description}
            </p>
          </div>
        )}

        {/* FOOTER */}
        <div className="mt-5 pt-3 border-t text-xs text-gray-400">
          Updated:{" "}
          {new Date(formation.updatedAt).toLocaleDateString()}
        </div>

      </CardContent>
    </Card>
  );
}

export default FormationCard;