import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FaBriefcase,
  FaBuilding,
  FaFileAlt,
  FaTrash,
} from "react-icons/fa";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function OffreCard({ offre, onDelete }) {
  if (!offre) return null;

  return (
    <Card className="h-full rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <CardHeader className="space-y-4 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
            <FaBriefcase className="text-blue-600 text-lg" />
          </div>

          <Badge
            variant="secondary"
            className="rounded-full bg-blue-50 text-blue-700 hover:bg-blue-50"
          >
            Offre
          </Badge>
        </div>

        <div className="space-y-1">
          <CardTitle className="line-clamp-2 text-lg font-bold text-gray-900">
            {offre.title}
          </CardTitle>

          <CardDescription className="flex items-center gap-2 text-sm text-gray-600">
            <FaBuilding className="text-gray-500 shrink-0" />
            <span className="truncate">{offre.company}</span>
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex h-[calc(100%-140px)] flex-col justify-between space-y-4">
        <div className="rounded-xl bg-gray-50 p-4">
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <FaFileAlt className="text-blue-600" />
            Description
          </p>

          <p className="line-clamp-5 text-sm leading-6 text-gray-700">
            {offre.description}
          </p>
        </div>

        <div className="flex justify-end">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100"
              >
                <FaTrash className="text-sm" />
              </button>
            </AlertDialogTrigger>

            <AlertDialogContent className="rounded-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Supprimer cette offre ?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  Cette action est irréversible. Voulez-vous vraiment supprimer
                  <span className="font-semibold"> "{offre.title}" </span> ?
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(offre)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}