import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
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
import { HiOutlinePencil, HiOutlineCode, HiOutlineTrash } from "react-icons/hi";

import axiosClient from "@/api/axios";
import EditCompetenceSelector from "@/components/profilFormComponents/editForms/EditCompetenceSelector";

function CompetenceCard({ item, setUserCompetences }) {
  if (!item) return null;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { competence, level } = item;

  const levelColor = {
    Beginner: "bg-gray-100 text-gray-600",
    Intermediate: "bg-yellow-100 text-yellow-700",
    Advanced: "bg-green-100 text-green-700",
    Expert: "bg-purple-100 text-purple-700",
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axiosClient.delete(`/user-competences/${item.competenceId}`);

      setUserCompetences((prev) =>
        prev.filter((c) => c.competenceId !== item.competenceId)
      );
    } catch (error) {
      console.error("Error deleting competence:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-xl border bg-white hover:shadow-sm transition">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-100 text-purple-600">
          <HiOutlineCode size={20} />
        </div>

        <div>
          <p className="font-medium text-gray-900">
            {competence.name}
          </p>

          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{competence.category}</Badge>
            <Badge className={levelColor[level]}>
              {level}
            </Badge>
          </div>
        </div>
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-2">

       

        {/* 🗑️ Delete */}
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
                Delete skill?
              </AlertDialogTitle>

              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                skill from your profile.
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
  );
}

export default CompetenceCard;