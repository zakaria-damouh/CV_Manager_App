import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  HiOutlineAcademicCap,
  HiOutlineCalendar,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";
import axiosClient from "@/api/axios";
import FormationForm from "@/components/profilFormComponents/FormationForm";
import FormationEditForm from "@/components/profilFormComponents/editForms/FormationEditForm";

function FormationCard({ formation, setFormations }) {
  if (!formation) return null;

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
    });

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axiosClient.delete(`/formations/${formation.id}`);
      setFormations((prev) =>
        prev.filter((f) => f.id !== formation.id)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    } finally {
      setLoading(false);
    }
  };

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

          {/* ✏️ Edit + 🗑️ Delete */}
          <div className="flex items-center gap-2">

            {/* Edit */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HiOutlinePencil size={18} />
                </Button>
              </DialogTrigger>

              <DialogContent className="!max-w-4xl">
                <FormationEditForm
                  formation={formation}
                  setFormations={setFormations}
                  setOpen={setOpen}
                />
              </DialogContent>
            </Dialog>

            {/* Delete */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-red-100"
                >
                  <HiOutlineTrash size={18} className="text-red-600" />
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Delete formation?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this formation from your profile.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel disabled={loading}>
                    Cancel
                  </AlertDialogCancel>

                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {loading ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </div>
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