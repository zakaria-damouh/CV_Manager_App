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
import {
  HiOutlinePencil,
  HiOutlineGlobe,
  HiOutlineTrash,
} from "react-icons/hi";
import axiosClient from "@/api/axios";
import LanguesEditForm from "@/components/profilFormComponents/editForms/LanguesEditForm";

function LanguageCard({ language, setLangues }) {
  if (!language) return null;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const getLevelColor = (level) => {
    switch (level) {
      case "Native":
        return "bg-blue-100 text-blue-700";
      case "Basic":
        return "bg-gray-100 text-gray-600";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700";
      case "Advanced":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axiosClient.delete(`/langues/${language.id}`);
      setLangues((prev) =>
        prev.filter((l) => l.id !== language.id)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-xl border bg-white hover:shadow-sm transition">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600">
          <HiOutlineGlobe size={20} />
        </div>

        <div>
          <p className="font-medium text-gray-900">
            {language.name}
          </p>
          <Badge className={`mt-1 ${getLevelColor(language.level)}`}>
            {language.level}
          </Badge>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-2">

        {/* ✏️ Edit */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <HiOutlinePencil size={18} />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <LanguesEditForm
              langue={language}
              setLangues={setLangues}
              setOpen={setOpen}
            />
          </DialogContent>
        </Dialog>

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
                Delete language?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete
                this language from your profile.
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

export default LanguageCard;