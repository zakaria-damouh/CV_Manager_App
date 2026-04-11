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

export default function OffreCard({ offre, onDelete }) {
  if (!offre) return null;

  return (
    <Card className="w-full rounded-2xl border bg-white shadow-sm">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
              <FaBriefcase className="text-lg text-blue-600" />
            </div>

            <div>
              <CardTitle className="text-xl font-bold text-gray-900">
                {offre.title}
              </CardTitle>

              <CardDescription className="flex items-center gap-2 pt-1 text-sm text-gray-600">
                <FaBuilding className="text-gray-500" />
                {offre.company}
              </CardDescription>
            </div>
          </div>

          <Badge variant="secondary" className="rounded-md px-3 py-1 text-xs">
            Offre
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="rounded-xl bg-gray-50 p-4">
          <p className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <FaFileAlt className="text-blue-600" />
            Description de l'offre
          </p>

          <p className="whitespace-pre-line text-sm leading-6 text-gray-800">
            {offre.description}
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => onDelete(offre)}
            className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
          >
            <FaTrash />
            Supprimer
          </button>
        </div>
      </CardContent>
    </Card>
  );
}